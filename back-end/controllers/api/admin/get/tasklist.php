<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database configuration
$host = "localhost";
$db_name = "todo"; // Replace with your database name
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Get the request method and input data
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        // Fetch all tasks
        $stmt = $conn->prepare("SELECT * FROM taskform");
        $stmt->execute();
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($tasks);
        break;

    case 'POST':
        // Add a new task
        $tasktitle = $input['tasktitle'] ?? '';
        $Assignedto = $input['Assignedto'] ?? '';
        $Priority = $input['Priority'] ?? 'Low';
        $status = $input['status'] ?? 'In Progress';

        if (empty($tasktitle) || empty($Assignedto)) {
            echo json_encode(["status" => "error", "message" => "Title and Assigned To fields are required."]);
            exit();
        }

        try {
            $stmt = $conn->prepare("INSERT INTO taskform (tasktitle, Assignedto, priority, status) VALUES (:tasktitle, :Assignedto, :Priority, :status)");
            $stmt->bindParam(':tasktitle', $tasktitle);
            $stmt->bindParam(':Assignedto', $Assignedto);
            $stmt->bindParam(':Priority', $Priority);
            $stmt->bindParam(':status', $status);
            $stmt->execute();

            echo json_encode(["status" => "success", "message" => "Task added successfully."]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        // Update an existing task
        $id = $input['id'] ?? null;
        $tasktitle = $input['tasktitle'] ?? '';
        $Assignedto = $input['Assignedto'] ?? '';
        $priority = $input['Priority'] ?? 'Low';
        $status = $input['status'] ?? 'In Progress';

        if (empty($id) || empty($tasktitle) || empty($Assignedto)) {
            echo json_encode(["status" => "error", "message" => "ID, Title, and Assigned To fields are required."]);
            exit();
        }

        try {
            $stmt = $conn->prepare("UPDATE taskform SET tasktitle = :tasktitle, Assignedto = :Assignedto, priority = :Priority, status = :status WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':tasktitle', $tasktitle);
            $stmt->bindParam(':Assignedto', $Assignedto);
            $stmt->bindParam(':Priority', $priority);
            $stmt->bindParam(':status', $status);
            $stmt->execute();

            echo json_encode(["status" => "success", "message" => "Task updated successfully."]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        // Delete a task
        $id = $input['id'] ?? null;

        if (empty($id)) {
            echo json_encode(["status" => "error", "message" => "ID is required."]);
            exit();
        }

        try {
            $stmt = $conn->prepare("DELETE FROM taskform WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            echo json_encode(["status" => "success", "message" => "Task deleted successfully."]);
        } catch (PDOException $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid request method."]);
        break;
}

// Close the connection
$conn = null;
?>
