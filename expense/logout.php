<?php
header('Access-Control-Allow-Origin: *');
session_start();
session_destroy();
header("Location: index.html");
exit;
?>