<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "todo"; // Replace with your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Get the JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if all required fields are present
if (isset($data['Firstname']) && isset($data['Lastname']) && isset($data['Email']) && isset($data['Password'])) {
    $firstname = $conn->real_escape_string($data['Firstname']);
    $lastname = $conn->real_escape_string($data['Lastname']);
    $email = $conn->real_escape_string($data['Email']);
    $password = $conn->real_escape_string($data['Password']); // Hash the password for security

    // Insert into the database
    $sql = "INSERT INTO signup (firstname, lastname, email, password) VALUES ('$firstname', '$lastname', '$email', '$password')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "New user created successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Invalid input data"]);
}

// Close the connection
$conn->close();
?>
