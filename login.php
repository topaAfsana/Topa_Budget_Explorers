<?phpheader('Access-Control-Allow-Origin: *');
if(isset($_POST['myProfileId']) && isset($_POST['myPassId'])) {

$profilename= $_POST['myProfileId'];
$password= $_POST['myPassId'];

$connection = mysql_connect('localhost','root','Tishan@2016');

$data= mysql_query($connection, SELECET * FROM `TOPADB`.`USERS_TABLE` where `profileName` = '{$profilename}' AND `pass` = '{$password}');

$row_cnt= mysql_inum_rows($data);
if($row_cnt == 1){
	$row=mysql_fetch_array($data);
	$id= $row['id'];
	session_start();
	$_SESSION['user_id'] = $id;
	echo "success";
}
else{echo "failed";}


}

?>