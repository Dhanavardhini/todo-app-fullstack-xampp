<?php

header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: GET"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers

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

// Handle the incoming GET request
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    // Query to fetch all users
    $query = "SELECT Firstname, Lastname, Email FROM signup";
    $result = $conn->query($query);

    // Check if users exist
    if ($result->num_rows > 0) {
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users);
    } else {
        echo json_encode([]);
    }
}

$conn->close();
?>
