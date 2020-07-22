<!DOCTYPE html>
<html>
<head>
</head>

<title>BUDGET EXPLORER-HOME PAGE</title>
	<link rel="styleSheet" href="index.css">
<script src="jquery.js"></script>
</head>
<body>

<div class="header">
  <h1 id="tittleheader">BUDGET EXPLORER</h1>

</div>

<div id="navigation">
	
 <ul><h1>OPTIONS:</h1>
  <li><a id="expense" href="expense/expense_mode.html">EXPENSE CHECK MODE</a></li>
  <li><a id="balance" href="balance/balance_check.html">BALANCE CHECK MODE</a></li>
  <li><a id="savings" href="savings/savings.html">ASSET CHECK MODE</a></li>
</ul>


</div>


<div id="aboutZone">
	<h2>ABOUT THIS APPLICATION</h2>
	<p> <strong>EXPENSE MODE</strong> ALLOWS YOU TO SORT THE EXPENSE ITEMS, FIND THE TOTAL AMOUNT EXPENSED IN A MONTH AND STORE DATA PERMANENTLY TO USE LATER.THIS FEATRURE IS EFFICIENT AND RECOMENDED TO USE.</p>
	<p> <strong>BALANCE MODE</strong> ALLOWS YOU TO SORT AND COMPARE THE MONTHLY INCOME WITH MONTHLY EXPENSE.IT PROVIDES THE TOTAL AMOUNT ON BOTH LIST AND DISPLAY THE TOTAL RESIDUE. NOTE:IT DOES NOT STORE ANY DATA, ITS VIEW ONLY FEATURE. </p>
	<p> <strong>ASSET MODE</strong> ALLOWS YOU TO SORT THE ASSET ITEMS AND PROVIDE THE AMOUNT OF TOTAL ASSET. NOTE:IT DOES NOT STORE ANY DATA, ITS VIEW ONLY FEATURE.</p>
</div>

<!-- <div id=logInZone>deletable
	<h4>Please Log in</h4>
	<form>
  <label>Profile Name: </label> <input type="text" placeholder="Ex: Enter your Profile "id="myProfileId"></input>
 <br></br>
  <label> Password: </label> <input type="text" placeholder="Enter your password"id="myPassId"></input>
  <button type="button"  onclick="validateProfile()"><label class='formButtons'>LOGIN</label></button>

   <button type="button" onclick="createProfile()"><label class='formButtons'>Register</label></button>
</form>
</div>
 -->


 <div id=logInZone>
	<h4>Please Log in</h4>
	<form>
  <label>Profile Name: </label> <input type="text" placeholder="Ex: Enter your Profile "id="myProfileId"></input>
 <br></br>
  <label> Password: </label> <input type="text" placeholder="Enter your password"id="myPassId"></input>
    <button type="button" id="logInBtnId"><label class='formButtons' >LOGIN</label></button>

<!--   <button type="button" id="logInBtnId"><label class='formButtons' onclick="logIn()">LOGIN</label></button>
 -->  <div id="logInloadId"><span> </span></div>

   <button type="button" ><label class='formButtons'>Register</label></button>
</form>
</div>






</body>


<script src="balance/phone_js.js"></script>
<script src="expense/db_microservice.js"></script>



</html>
