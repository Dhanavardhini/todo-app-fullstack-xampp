<?php
// Set headers for JSON response
// Allow cross-origin requests
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allowed HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allowed headers

// For OPTIONS requests (preflight), return early to prevent further processing
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


// Database connection details
$host = 'localhost';
$dbname = 'todo';
$username = 'root'; // change this to your MySQL username
$password = ''; // change this to your MySQL password

try {
    // Create a PDO instance
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch the counts
    $totalTasksStmt = $pdo->query("SELECT COUNT(*) FROM taskform");
    $completedTasksStmt = $pdo->query("SELECT COUNT(*) FROM taskform WHERE status = 'Completed'");
    $pendingTasksStmt = $pdo->query("SELECT COUNT(*) FROM taskform WHERE status = 'Pending'");

    $totalTasks = $totalTasksStmt->fetchColumn();
    $completedTasks = $completedTasksStmt->fetchColumn();
    $pendingTasks = $pendingTasksStmt->fetchColumn();

    // Prepare the response
    $response = [
        'totalTasks' => $totalTasks,
        'completedTasks' => $completedTasks,
        'pendingTasks' => $pendingTasks,
    ];

    // Return JSON response
    echo json_encode($response);
} catch (PDOException $e) {
    // Handle database connection errors
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
