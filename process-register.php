<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid request.");
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$gender = trim($_POST["gender"] ?? "");
$job = trim($_POST["job"] ?? "");
$password = $_POST["password"] ?? "";
$confirm_password = $_POST["confirm_password"] ?? "";


// Check required fields

if (
    empty($name) ||
    empty($email) ||
    empty($phone) ||
    empty($gender) ||
    empty($job) ||
    empty($password)
) {
    die("Please fill in all required fields.");
}


// Check email

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email address.");
}


// Check password length

if (strlen($password) < 8) {
    die("Password must be at least 8 characters.");
}


// Check passwords

if ($password !== $confirm_password) {
    die("Passwords do not match.");
}


// Check if email already exists

$check = $conn->prepare(
    "SELECT customer_id FROM customers WHERE email = ?"
);

$check->bind_param("s", $email);

$check->execute();

$result = $check->get_result();

if ($result->num_rows > 0) {
    die("An account with this email already exists.");
}


// Securely hash the password

$hashed_password = password_hash(
    $password,
    PASSWORD_DEFAULT
);


// Insert customer

$stmt = $conn->prepare(
    "INSERT INTO customers
    (name, email, phone, gender, job, password)
    VALUES (?, ?, ?, ?, ?, ?)"
);

$stmt->bind_param(
    "ssssss",
    $name,
    $email,
    $phone,
    $gender,
    $job,
    $hashed_password
);


// Save to database

if ($stmt->execute()) {

   echo '
<!DOCTYPE html>
<html>
<head>
<title>Success</title>

<style>

body{
    margin:0;
    font-family:Arial,sans-serif;
    background:#f4f6f9;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
}

.box{
    background:white;
    padding:40px;
    border-radius:20px;
    box-shadow:0 10px 30px rgba(0,0,0,0.1);
    text-align:center;
    width:400px;
}

.icon{
    font-size:60px;
}

h1{
    color:#1e293b;
}

p{
    color:#555;
}

a{
    display:inline-block;
    margin-top:20px;
    padding:12px 25px;
    background:#000;
    color:white;
    text-decoration:none;
    border-radius:8px;
}

a:hover{
    opacity:0.9;
}

</style>

</head>

<body>

<div class="box">

<div class="icon">✅</div>

<h1>Account Created!</h1>

<p>Your account has been registered successfully.</p>

<a href="login.html">
Go to Login
</a>

</div>

</body>
</html>
';
} else {

    echo "Registration failed: " . $stmt->error;

}


$stmt->close();
$check->close();
$conn->close();

?>