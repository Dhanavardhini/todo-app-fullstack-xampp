<?php

// Allow specific origins for CORS
$allowedOrigins = ["http://localhost:5173"];  // Add other allowed origins as necessary
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

// Rest of your code goes here


// Database connection details
$host = "localhost";
$username = "root";
$password = "";
$dbname = "todo";

// Create database connection
try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $e->getMessage()
    ]);
    exit();
}

// Get the task ID from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if taskId is provided
if (isset($data->taskId)) {
    $taskId = $data->taskId;

    // SQL query to update the task status to "Finished"
    $query = "UPDATE taskform SET status = :status WHERE id = :taskId";

    // Prepare the query
    $stmt = $db->prepare($query);

    // Bind the parameters
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':taskId', $taskId);

    // Set the status to "Finished"
    $status = "Finished";

    // Execute the query and check if it was successful
    if ($stmt->execute()) {
        // Fetch the updated task details
        $updatedTaskQuery = "SELECT * FROM taskform WHERE id = :taskId";
        $stmt = $db->prepare($updatedTaskQuery);
        $stmt->bindParam(':taskId', $taskId);
        $stmt->execute();

        $updatedTask = $stmt->fetch(PDO::FETCH_ASSOC);

        // Respond with the updated task data
        echo json_encode([
            "success" => true,
            "task" => $updatedTask
        ]);
    } else {
        // Respond with an error if the query fails
        echo json_encode([
            "success" => false,
            "message" => "Failed to update task status."
        ]);
    }
} else {
    // Respond with an error if taskId is not provided
    echo json_encode([
        "success" => false,
        "message" => "Task ID is required."
    ]);
}
?>
