<?php
// Array of allowed origins
$allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// Check the origin of the incoming request
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // If the origin is not allowed, do not send CORS headers
    header("HTTP/1.1 403 Forbidden");
    echo json_encode(["error" => "Origin not allowed"]);
    exit();
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true"); // Allow cookies and sessions
header("Content-Type: application/json");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Respond with HTTP 200 for preflight requests
    exit();
}

// Your existing PHP logic here


// Start session for managing logged-in state
session_start();

// Database connection parameters
$host = "localhost";
$username = "root";
$password = "";
$dbname = "todo";
$conn = new mysqli($host, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Handle the POST request for login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode the JSON payload
    $input = json_decode(file_get_contents("php://input"), true);

    $email = $input['Email'] ?? null;
    $password = $input['Password'] ?? null;

    // Validate input
    if ($email && $password) {
        // Check for a matching user in the database
        $query = "SELECT * FROM signup WHERE Email = ? AND Password = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ss", $email, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Login successful, fetch user data
            $row = $result->fetch_assoc();
            $firstname = $row['Firstname']; // Fetch Firstname

            // Set session variables
            $_SESSION['Firstname'] = $firstname;

            http_response_code(200);
            echo json_encode([
                "message" => "Login successful",
                "Firstname" => $firstname
            ]);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(["error" => "Invalid email or password"]);
        }

        $stmt->close();
    } else {
        http_response_code(400); // Bad request
        echo json_encode(["error" => "Email and Password are required"]);
    }
} else {
    http_response_code(405); // Method not allowed
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
