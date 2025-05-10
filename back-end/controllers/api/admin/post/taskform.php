<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$host = "localhost";
$db_name = "todo";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tasktitle = $input['tasktitle'] ?? '';
    $Assignedto = $input['Assignedto'] ?? '';
    $Priority = $input['Priority'] ?? 'Low';
    $status = $input['status'] ?? 'In Progress';

    if (empty($tasktitle) || empty($Assignedto)) {
        echo json_encode(["status" => "error", "message" => "Title and Assigned To fields are required!"]);
        exit();
    }

    try {
        if (isset($input['id'])) {
            $taskId = $input['id'];
            $stmt = $conn->prepare("UPDATE taskform SET tasktitle = :tasktitle, Assignedto = :Assignedto, Priority = :Priority, status = :status WHERE id = :id");
            $stmt->bindParam(':id', $taskId);
        } else {
            $stmt = $conn->prepare("INSERT INTO taskform (tasktitle, Assignedto, Priority, status) VALUES (:tasktitle, :Assignedto, :Priority, :status)");
        }

        $stmt->bindParam(':tasktitle', $tasktitle);
        $stmt->bindParam(':Assignedto', $Assignedto);
        $stmt->bindParam(':Priority', $Priority);
        $stmt->bindParam(':status', $status);
        $stmt->execute();

        if (!isset($input['id'])) {
            $taskId = $conn->lastInsertId();
        }

        echo json_encode([
            "status" => "success",
            "message" => isset($input['id']) ? "Task updated successfully." : "Task created successfully.",
            "task" => [
                "id" => $taskId,
                "tasktitle" => $tasktitle,
                "Assignedto" => $Assignedto,
                "Priority" => $Priority,
                "status" => $status
            ]
        ]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Database operation failed: " . $e->getMessage()]);
    }
}

$conn = null;
?>
