<?php
// Start the session
session_start();

// Allow specific origins for CORS
$allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: *");  // Use "*" if you want to allow any origin
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Debugging: Check session variables
// if (!isset($_SESSION['Email']) || !isset($_SESSION['Firstname'])) {
//     error_log("Session variables missing. Email: " . $_SESSION['Email'] . " Firstname: " . $_SESSION['Firstname']);
//     http_response_code(401);
//     echo json_encode(["error" => "Unauthorized access. Please log in."]);
//     exit();
// }

// Database connection details
$host = "localhost";
$username = "root";
$password = "";
$dbname = "todo";

// Establish the database connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check for database connection errors
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// $Email = $_SESSION['Email'];
$assignedTo = $_SESSION['Firstname'];
$query = "SELECT id, tasktitle, Priority, status FROM taskform WHERE Assignedto = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $assignedTo);
$stmt->execute();
$result = $stmt->get_result();

// Store tasks in an array
$tasks = [];
while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

// Send tasks as JSON or return a 404 if no tasks found
if (count($tasks) > 0) {
    echo json_encode(["data" => $tasks]);
} else {
    http_response_code(404);
    echo json_encode(["message" => "No tasks assigned to you."]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
