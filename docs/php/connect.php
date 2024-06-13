<?php
// Отключаем вывод ошибок
error_reporting(0);

// Параметры подключения к базе данных
$db_host = '62.109.1.101';
$db_user = 'picoin';
$db_password = 'alqpzmxn';
$db_name = 'picoin';

// Подключение к базе данных
$link = mysqli_connect($db_host, $db_user, $db_password, $db_name);

// Проверка соединения
if (!$link) {
    die('<p style="color:red">'.mysqli_connect_errno().' - '.mysqli_connect_error().'</p>');
}
?>
