<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type: text/javascript; charset=utf-8");

session_start();

if(isset($SESSION['user_id'])){
	$user_id=$SESSION['user_id'];
	$connection = mysqli_connect('localhost','root','Tishan@2016');
	$data= mysqli_query($connection, SELECET * FROM `TOPADB`.`USERS_TABLE` where `id` = '{$user_id}' );
	$row_cnt= mysql_num_rows($data);
	if($row_cnt == 1){
		$row = mysql_fetch_array($data);
		$profileName=$row['profileName'];
		$password=$row['pass'];

	}
	else{
		header("Location: index.html");
		exit;
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<body>
		Welcome, <?php echo $profileName; ?> Welcome, <?php echo $password; ?>! <a href="logout.php">Logout</a>
	</body>
</head>
</html>