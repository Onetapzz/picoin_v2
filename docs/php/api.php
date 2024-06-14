<?php
header('Content-Type: application/json');
$servername = "62.109.1.101";
$username = "picoin";
$password = "alqpzmxn";
$dbname = "picoin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Determine request method
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($conn);
        break;
    case 'POST':
        handlePost($conn);
        break;
    case 'PUT':
        handlePut($conn);
        break;
    case 'DELETE':
        handleDelete($conn);
        break;
    default:
        echo json_encode(["error" => "Unsupported request method"]);
        break;
}

$conn->close();

// Handler for GET requests
function handleGet($conn) {
    if (isset($_GET['telegram_id'])) {
        $telegram_id = $conn->real_escape_string($_GET['telegram_id']);
        $sql = "SELECT * FROM users WHERE telegram_id = '$telegram_id'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_assoc());
        } else {
            echo json_encode(["error" => "No record found"]);
        }
    } else {
        echo json_encode(["error" => "Invalid telegram_id"]);
    }
}

// Handler for POST requests
function handlePost($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data && isset($data['telegram_id']) && isset($data['telegram_username'])) {
        $telegram_id = $conn->real_escape_string($data['telegram_id']);
        $telegram_username = $conn->real_escape_string($data['telegram_username']);
        $sql = "INSERT INTO users (telegram_id, telegram_username) VALUES ('$telegram_id', '$telegram_username')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "New record created successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid input"]);
    }
}

// Handler for PUT requests
function handlePut($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    if ($data && isset($data['id']) && isset($data['telegram_id']) && isset($data['telegram_username'])) {
        $id = intval($data['id']);
        $telegram_id = $conn->real_escape_string($data['telegram_id']);
        $telegram_username = $conn->real_escape_string($data['telegram_username']);
        $sql = "UPDATE users SET telegram_id = '$telegram_id', telegram_username = '$telegram_username' WHERE id = $id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Record updated successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid input"]);
    }
}

// Handler for DELETE requests
function handleDelete($conn) {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $sql = "DELETE FROM users WHERE id = $id";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Record deleted successfully"]);
        } else {
            echo json_encode(["error" => "Error: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Invalid ID"]);
    }
}
?>
