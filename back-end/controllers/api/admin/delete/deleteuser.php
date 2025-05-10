<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todo"; // Replace with your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle the incoming DELETE request
if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    // Retrieve email from the request
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? null;

    if (empty($email)) {
        http_response_code(400);
        echo json_encode(["error" => "Email is required."]);
        exit;
    }

    // Delete the user from the database
    $deleteQuery = "DELETE FROM signup WHERE Email = ?";
    $stmt = $conn->prepare($deleteQuery);
    $stmt->bind_param("s", $email);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["message" => "User deleted successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to delete user."]);
    }

    $stmt->close();
}

$conn->close();
?>
