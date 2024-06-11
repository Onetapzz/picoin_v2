<?php
// Подключение к базе данных
require_once 'connect.php';

// Установка заголовка для ответа в формате JSON
header('Content-Type: application/json');

// Функция для отправки ответа
function response($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

// Получение метода запроса
$method = $_SERVER['REQUEST_METHOD'];

// Обработка различных методов запроса
switch ($method) {
    case 'GET':
        handleGetRequest();
        break;
    case 'POST':
        handlePostRequest();
        break;
    case 'PUT':
        handlePutRequest();
        break;
    default:
        response(['message' => 'Method not allowed'], 405);
}

// Обработка GET-запросов
function handleGetRequest() {
    global $link;
    $request = explode('/', trim($_SERVER['PATH_INFO'], '/'));

    if (count($request) == 2 && $request[0] == 'user') {
        $telegram_id = $request[1];
        $query = "SELECT * FROM users WHERE telegram_id='$telegram_id'";
        $result = mysqli_query($link, $query);

        if ($result) {
            $user = mysqli_fetch_assoc($result);
            if ($user) {
                response($user);
            } else {
                response(['message' => 'User not found'], 404);
            }
        } else {
            response(['message' => 'Database error: ' . mysqli_error($link)], 500);
        }
    } else {
        response(['message' => 'Bad request'], 400);
    }
}

// Обработка POST-запросов
function handlePostRequest() {
    global $link;
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['telegram_id']) && isset($input['telegram_username'])) {
        $telegram_id = $input['telegram_id'];
        $telegram_username = $input['telegram_username'];
        $query = "INSERT INTO users (telegram_id, telegram_username) VALUES ('$telegram_id', '$telegram_username')";

        if (mysqli_query($link, $query)) {
            response(['message' => 'User added successfully']);
        } else {
            response(['message' => 'Database error: ' . mysqli_error($link)], 500);
        }
    } else {
        response(['message' => 'Bad request'], 400);
    }
}

// Обработка PUT-запросов
function handlePutRequest() {
    global $link;
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['telegram_id']) && isset($input['data'])) {
        $telegram_id = $input['telegram_id'];
        $data = $input['data'];
        $set = [];

        foreach ($data as $key => $value) {
            $set[] = "$key='$value'";
        }
        $set = implode(',', $set);
        $query = "UPDATE users SET $set WHERE telegram_id='$telegram_id'";

        if (mysqli_query($link, $query)) {
            response(['message' => 'User updated successfully']);
        } else {
            response(['message' => 'Database error: ' . mysqli_error($link)], 500);
        }
    } else {
        response(['message' => 'Bad request'], 400);
    }
}
?>
