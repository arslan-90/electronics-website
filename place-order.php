<?php

require_once "db.php";

/*
|--------------------------------------------------------------------------
| Only allow POST requests
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: checkout.html");
    exit;
}


/*
|--------------------------------------------------------------------------
| Get checkout information
|--------------------------------------------------------------------------
*/

$name = trim($_POST["customerName"] ?? "");
$email = trim($_POST["customerEmail"] ?? "");
$phone = trim($_POST["customerPhone"] ?? "");
$address = trim($_POST["deliveryAddress"] ?? "");
$cartJson = $_POST["cart"] ?? "";


/*
|--------------------------------------------------------------------------
| Basic validation
|--------------------------------------------------------------------------
*/

if (
    $name === "" ||
    $email === "" ||
    $phone === "" ||
    $address === "" ||
    $cartJson === ""
) {
    die("Please complete all checkout fields.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Please enter a valid email address.");
}


/*
|--------------------------------------------------------------------------
| Decode cart
|--------------------------------------------------------------------------
*/

$cart = json_decode($cartJson, true);

if (!is_array($cart) || count($cart) === 0) {
    die("Your cart is empty.");
}


/*
|--------------------------------------------------------------------------
| Find customer
|--------------------------------------------------------------------------
*/

$customerStmt = $conn->prepare(
    "SELECT customer_id
     FROM customers
     WHERE email = ?
     LIMIT 1"
);

$customerStmt->bind_param("s", $email);
$customerStmt->execute();

$customerResult = $customerStmt->get_result();

if ($customerResult->num_rows === 0) {
    die("
        <h2>Customer Account Not Found</h2>
        <p>
            Please register an account using this email address
            before placing an order.
        </p>
        <p>
            <a href='register.html'>Go to Registration</a>
        </p>
    ");
}

$customer = $customerResult->fetch_assoc();

$customerId = $customer["customer_id"];

$customerStmt->close();


/*
|--------------------------------------------------------------------------
| Start database transaction
|--------------------------------------------------------------------------
*/

$conn->begin_transaction();

try {

    /*
    |--------------------------------------------------------------------------
    | Calculate total from the DATABASE prices
    |--------------------------------------------------------------------------
    */

    $totalAmount = 0;

    $products = [];

    $productStmt = $conn->prepare(
        "SELECT product_id, product_name, price, stock
         FROM products
         WHERE product_name = ?
         LIMIT 1"
    );

    foreach ($cart as $item) {

        $productName = trim($item["name"] ?? "");
        $quantity = (int)($item["quantity"] ?? 0);

        if ($productName === "" || $quantity <= 0) {
            throw new Exception("Invalid product information.");
        }

        /*
        | Find the real product in MySQL
        */

        $productStmt->bind_param("s", $productName);
        $productStmt->execute();

        $productResult = $productStmt->get_result();

        if ($productResult->num_rows === 0) {
            throw new Exception(
                "Product not found: " . htmlspecialchars($productName)
            );
        }

        $product = $productResult->fetch_assoc();

        /*
        | Check stock
        */

        if ($quantity > (int)$product["stock"]) {
            throw new Exception(
                "Not enough stock available for: " .
                htmlspecialchars($product["product_name"])
            );
        }

        /*
        | Use database price, not browser price
        */

        $price = (float)$product["price"];

        $subtotal = $price * $quantity;

        $totalAmount += $subtotal;

        $products[] = [
            "product_id" => (int)$product["product_id"],
            "product_name" => $product["product_name"],
            "price" => $price,
            "quantity" => $quantity,
            "stock" => (int)$product["stock"]
        ];
    }

    $productStmt->close();


    /*
    |--------------------------------------------------------------------------
    | Create the order
    |--------------------------------------------------------------------------
    */

    $orderStmt = $conn->prepare(
        "INSERT INTO orders
        (
            customer_id,
            delivery_address,
            total_amount,
            status
        )
        VALUES (?, ?, ?, 'Pending')"
    );

    $orderStmt->bind_param(
        "isd",
        $customerId,
        $address,
        $totalAmount
    );

    if (!$orderStmt->execute()) {
        throw new Exception("Could not create the order.");
    }

    $orderId = $conn->insert_id;

    $orderStmt->close();


    /*
    |--------------------------------------------------------------------------
    | Add products to order_details
    |--------------------------------------------------------------------------
    */

    $detailStmt = $conn->prepare(
        "INSERT INTO order_details
        (
            order_id,
            product_id,
            quantity,
            price
        )
        VALUES (?, ?, ?, ?)"
    );


    /*
    |--------------------------------------------------------------------------
    | Reduce product stock
    |--------------------------------------------------------------------------
    */

    $stockStmt = $conn->prepare(
        "UPDATE products
         SET stock = stock - ?
         WHERE product_id = ?"
    );


    foreach ($products as $product) {

        $productId = $product["product_id"];
        $quantity = $product["quantity"];
        $price = $product["price"];

        /*
        | Add order detail
        */

        $detailStmt->bind_param(
            "iiid",
            $orderId,
            $productId,
            $quantity,
            $price
        );

        if (!$detailStmt->execute()) {
            throw new Exception("Could not save order details.");
        }


        /*
        | Update stock
        */

        $stockStmt->bind_param(
            "ii",
            $quantity,
            $productId
        );

        if (!$stockStmt->execute()) {
            throw new Exception("Could not update product stock.");
        }
    }

    $detailStmt->close();
    $stockStmt->close();


    /*
    |--------------------------------------------------------------------------
    | Everything succeeded
    |--------------------------------------------------------------------------
    */

    $conn->commit();


} catch (Exception $e) {

    /*
    |--------------------------------------------------------------------------
    | Something went wrong — undo everything
    |--------------------------------------------------------------------------
    */

    $conn->rollback();

    die(
        "Order could not be completed: " .
        htmlspecialchars($e->getMessage())
    );
}

?>


<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Order Confirmed | ZA Electronics</title>


    <style>

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }


        body {

            min-height: 100vh;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            background:
                radial-gradient(
                    circle at top,
                    rgba(0, 217, 255, 0.12),
                    transparent 40%
                ),
                #05070d;

            color: white;

            display: flex;

            justify-content: center;

            align-items: center;

            padding: 30px;
        }


        .confirmation {

            width: 100%;

            max-width: 650px;

            padding: 45px 35px;

            text-align: center;

            background:
                rgba(255, 255, 255, 0.04);

            border:
                1px solid
                rgba(0, 217, 255, 0.25);

            border-radius: 20px;

            backdrop-filter: blur(14px);

            box-shadow:
                0 0 40px
                rgba(0, 217, 255, 0.08);
        }


        .check {

            width: 75px;

            height: 75px;

            margin: 0 auto 25px;

            border-radius: 50%;

            display: flex;

            align-items: center;

            justify-content: center;

            background:
                rgba(0, 217, 255, 0.12);

            border:
                2px solid
                #00d9ff;

            color: #00d9ff;

            font-size: 38px;
        }


        .brand {

            color: #00d9ff;

            font-size: 15px;

            font-weight: bold;

            letter-spacing: 2px;

            margin-bottom: 12px;

            text-transform: uppercase;
        }


        h1 {

            font-size: 34px;

            margin-bottom: 15px;
        }


        .message {

            color: #b8c4d0;

            line-height: 1.7;

            margin-bottom: 28px;
        }


        .order-box {

            padding: 20px;

            margin: 25px 0;

            border-radius: 14px;

            background:
                rgba(0, 217, 255, 0.06);

            border:
                1px solid
                rgba(0, 217, 255, 0.18);
        }


        .order-number {

            color: #00d9ff;

            font-size: 24px;

            font-weight: bold;

            margin-top: 8px;
        }


        .total {

            margin-top: 12px;

            color: #dce5ed;
        }


        .total strong {

            color: #00d9ff;

            font-size: 20px;
        }


        .buttons {

            display: flex;

            gap: 12px;

            justify-content: center;

            flex-wrap: wrap;

            margin-top: 30px;
        }


        .button {

            display: inline-block;

            padding: 13px 22px;

            border-radius: 10px;

            text-decoration: none;

            font-weight: bold;

            transition: 0.25s ease;
        }


        .primary {

            background: #00d9ff;

            color: #05070d;
        }


        .primary:hover {

            box-shadow:
                0 0 25px
                rgba(0, 217, 255, 0.35);

            transform: translateY(-2px);
        }


        .secondary {

            border:
                1px solid
                rgba(0, 217, 255, 0.35);

            color: #00d9ff;

            background:
                rgba(0, 217, 255, 0.05);
        }


        .secondary:hover {

            background:
                rgba(0, 217, 255, 0.12);

            transform: translateY(-2px);
        }


        @media (max-width: 600px) {

            .confirmation {

                padding: 35px 22px;
            }

            h1 {

                font-size: 28px;
            }
        }

    </style>

</head>


<body>


    <main class="confirmation">

        <div class="check">
            ✓
        </div>


        <div class="brand">
            ZA Electronics
        </div>


        <h1>
            Order Confirmed!
        </h1>


        <p class="message">

            Thank you,
            <?php echo htmlspecialchars($name); ?>.

            Your order has been successfully
            placed and is now being processed.

        </p>


        <div class="order-box">

            <div>
                Your Order Number
            </div>

            <div class="order-number">
                #<?php echo $orderId; ?>
            </div>


            <div class="total">

                Order Total:

                <strong>
                    Rs
                    <?php
                    echo number_format(
                        $totalAmount,
                        2
                    );
                    ?>
                </strong>

            </div>

        </div>


        <p class="message">

            Your order status is currently
            <strong>Pending</strong>.

        </p>


        <div class="buttons">

            <a
                href="products.html"
                class="button primary"
            >
                Continue Shopping
            </a>


            <a
                href="index.html"
                class="button secondary"
            >
                Back to Home
            </a>

        </div>

    </main>


</body>

</html>