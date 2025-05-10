<?php
// Allowed origins for CORS
$allowedOrigins = ["http://localhost:5173"]; // Add other allowed origins as necessary

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    header("Access-Control-Allow-Origin: *");  // Use "*" if you want to allow any origin
}

// Allow CORS methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  // Added PUT
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration (update with your credentials)
$host = "localhost"; // Database host
$dbname = "todo"; // Database name
$username = "root"; // Database username
$password = ""; // Database password

try {
    // Establish database connection
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}

// Handle the PUT request to update task status
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get the raw PUT data
    $data = json_decode(file_get_contents("php://input"));

    // Check if data is valid
    if (isset($data->id) && isset($data->status)) {
        $taskId = $data->id;
        $status = $data->status;

        // Prepare the update query
        $query = "UPDATE taskform SET status = :status WHERE id = :id";

        // Prepare the statement
        $stmt = $db->prepare($query);

        // Bind parameters
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $taskId);

        // Execute the query
        if ($stmt->execute()) {
            // Respond with success
            echo json_encode(['message' => 'Task status updated successfully']);
        } else {
            // Respond with error
            echo json_encode(['message' => 'Failed to update task status']);
        }
    } else {
        // Respond with missing data error
        echo json_encode(['message' => 'Invalid data']);
    }
}
?>
