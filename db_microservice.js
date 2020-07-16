var tbltop=`<table class="ExpenseTable">
				<tr><th>ID</th><th>DATE</th><th>TITLE</th><th>AMOUNT</th></tr>`;
var tbl;

var host="http://localhost:8080";
// var host="https://192.168.0.14:8443";
// var host="https://52.91.249.153:8443";
// var host="http://52.91.249.153:8080";


//DONE
function createTable(){

			var myCreatetable=document.querySelector("#myTableId").value.toUpperCase();
					if (myCreatetable == "") {
	 	alert ("Please enter Table name");
        return false;
    }
	 

			var xmlhttp_create= new XMLHttpRequest();

			//ADD RECORD
			var createTableUrl= host+'/create_table';
			console.log(createTableUrl);
			var param="tableName="+myCreatetable+"";
			
			xmlhttp_create.onreadystatechange = function() {
			if(xmlhttp_create.readyState===4 & xmlhttp_create.status===200){
				var response = xmlhttp_create.responseText;	
				alert(response);
				if (response === "TABLE IS SUCCESSFULLY CREATED"){
					showRecords();
				}

				// console.log("RESPONSE IS"+resp);
			}}
			xmlhttp_create.open("POST",createTableUrl+"?"+param,true);
			xmlhttp_create.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_create.send(null);
			// var myCreatetable=document.querySelector("#createTableId").value= '';
	 
		}

//=======

function findTable(){
	var myQuerytable=document.querySelector("#myTableId").value.toUpperCase();
			 if (myQuerytable == "") {
	 				alert ("Please enter Table name");
        			return false;}
	
			var xmlhttp_find= new XMLHttpRequest();
			var findTableUrl= host+'/find_table';
			var param="tableName="+myQuerytable+"";
			xmlhttp_find.onreadystatechange = function() {
			var tableDiv= document.querySelector("div").innerHTML;
			if(xmlhttp_find.readyState===4 & xmlhttp_find.status===200){
				var response=xmlhttp_find.responseText;
				alert(response);
				if (response === "TABLE FOUND"){
					showRecords();}
					else { 
					clearTable();
					alert("YOUR EXPENSE LIST DOES NOT EXIST;PLEASE CRAETE ONE;")};
				}}
			xmlhttp_find.open("GET",findTableUrl+"?"+param,true);
			xmlhttp_find.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_find.send(null);
		}

		// ===
function clearTable(){
	
	document.querySelector("div").innerHTML = tbltop;
}



		function addRecord(){
	 	 	var myTable= document.querySelector("#myTableId").value.toUpperCase();
			var myDate=document.querySelector("#dateId").value;
	 		var myItemTitle= document.querySelector("#titleId").value;
	 		var myamount= document.querySelector("#amountId").value;

	 		if (myTable == "") {
	 			alert ("Please enter Table name");
        		return false;}

	 		if (myDate == "") {
	 			alert ("Please enter a date");
        		return false;}
	 	 	if (myItemTitle == "") {
	 			alert ("Please enter a title of the item");
        		return false;}
        		if (isNaN(myamount)){
        		alert("Amount must be numbers!");
        		return false;}

	
			var xmlhttp1= new XMLHttpRequest();
			var addRecordUrl= host+'/add_record';
			var param="tableName="+myTable+"&date="+myDate+"&title="+myItemTitle+"&amount="+myamount+"";

			xmlhttp1.onreadystatechange = function() {
			if(xmlhttp1.readyState===4 & xmlhttp1.status===200){
				alert(xmlhttp1.responseText);
			}}
			xmlhttp1.open("POST",addRecordUrl+"?"+param,true);
			xmlhttp1.setRequestHeader('Content-Type', 'application/json');
			xmlhttp1.send(null);
			// var myDate=document.querySelector("#dateId").value='';
	 		var myItemTitle= document.querySelector("#titleId").value='';
	 		var myamount= document.querySelector("#amountId").value='';
		}
// =======


//=======
		// 2.
		
	//=======
	function addAndLoad(){
		addRecord();
		showRecords();

	}



	

//=======
function showRecords() {

			var myTable=document.querySelector("#myTableId").value.toUpperCase();
			if (myTable == "") {
	 			alert ("Please enter Table name");
        		return false;}
			
		var baseurl= host+'/show_records';
		var xmlhttp= new XMLHttpRequest();
		var param="tableName="+myTable+"";
		xmlhttp.open("GET",baseurl+"?"+param,true);

		xmlhttp.onreadystatechange = function() {
			if(xmlhttp.readyState===4 & xmlhttp.status===200){
				var records = JSON.parse(xmlhttp.responseText);	
			
				var main= "";
				var sum=0;

				for (i=0;i<records.length;i++){
				main += "<tr><td>"+records[i].id+"</td><td>"+records[i].date+"</td><td>"+records[i].title+"</td><td>"+records[i].amount+"</td></tr>";
				sum+=records[i].amount;}

				var tblbottom= "</table>";
				tbl=tbltop + main + tblbottom;
				document.querySelector("#expense_block").innerHTML = "TABLE NAME: "+myTable+tbl+"TOTAL:"+sum;
		}}; xmlhttp.send();
	}


	function clear(){
			var myTable= document.querySelector("#myTableId").value='';
			var myDate=document.querySelector("#dateId").value='';
	 		var myItemTitle= document.querySelector("#titleId").value='';
	 		var myamount= document.querySelector("#amountId").value='';

	}

	function getCurrentDate(){
		var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var today = mm + '/' + dd + '/' + yyyy;
document.querySelector("#dateId").value=today;
return today;}
