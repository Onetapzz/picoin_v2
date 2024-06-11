<?php
// Отключаем вывод ошибок
error_reporting(0);

// Параметры подключения к базе данных
$db_host = '141.8.192.6';
$db_user = 'a0990876_picoin';
$db_password = 'alqpzmxn';
$db_name = 'a0990876_picoin';

// Подключение к базе данных
$link = mysqli_connect($db_host, $db_user, $db_password, $db_name);

// Проверка соединения
if (!$link) {
    die('<p style="color:red">'.mysqli_connect_errno().' - '.mysqli_connect_error().'</p>');
}
?>
