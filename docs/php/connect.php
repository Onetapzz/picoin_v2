<?php
error_reporting(0);
$db_host = 'localhost';
$db_user = 'picoin';
$db_password = '123qwe';
$db_name = 'picoin';

$link = mysqli_connect($db_host, $db_user, $db_password, $db_name);
if (!$link) {
    die('<p style="color:red">'.mysqli_connect_errno().' - '.mysqli_connect_error().'</p>');
}
?>
