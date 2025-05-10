<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database configuration
$host = "localhost";
$username = "root";
$password = "";
$database = "todo"; // Replace with your database name

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $Email = $conn->real_escape_string($input['Email'] ?? '');
    $Password = $input['Password'] ?? '';

    // Validate input
    if (empty($Email) || empty($Password)) {
        echo json_encode(["status" => "error", "message" => "Email and password are required."]);
        exit;
    }

    // Query to check if user exists
    $query = "SELECT * FROM signup WHERE Email = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $Email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Compare password directly (no hashing)
        if ($Password === $user['Password']) {
            echo json_encode(["status" => "success", "message" => "Login successful.", "user" => [
                "id" => $user['id'],
                "Email" => $user['Email'],
            ]]);
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect password."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User does not exist. Please sign up."]);
    }

    $stmt->close();
}

$conn->close();
?>
