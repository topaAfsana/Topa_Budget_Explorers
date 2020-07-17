var tbltop=`<table class="dbTable">
				<tr><th>Item#</th><th>Date</th><th>Title</th><th>Amount</th></tr>`;
var tbl;

// var host="http://localhost:8080";
// var host="https://192.168.0.14:8443";
// var host="https://52.91.249.153:8443";
var host="http://52.91.249.153:8080";


//DONE
function createTable(){

			var myCreatetable=document.querySelector("#myTableId").value.toUpperCase();
					if (myCreatetable == "") {
	 	alert ("Please enter Table name");
        return false;
    }
	 

			var xmlhttp_create= new XMLHttpRequest();

			var createTableUrl= host+'/create_table';
			var param="tableName="+myCreatetable+"";
			
			xmlhttp_create.onreadystatechange = function() {
			if(xmlhttp_create.readyState===4 & xmlhttp_create.status===200){
				var response = xmlhttp_create.responseText;	
				alert(response);
				if (response === "TABLE IS SUCCESSFULLY CREATED"){
					showRecords();
				}
			}}
			xmlhttp_create.open("POST",createTableUrl+"?"+param,true);
			xmlhttp_create.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_create.send(null);
	 
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
				//test purpose uncomment
				// alert(response);
				if (response === "TABLE FOUND"){
					showRecords();}
					else { 
					clearTable();
					alert("YOUR TABLE DOES NOT EXIST;PLEASE CRAETE A NEW ONE;")};
				}}
			xmlhttp_find.open("GET",findTableUrl+"?"+param,true);
			xmlhttp_find.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_find.send(null);
	 		getupdatedDate(myQuerytable);
		}

		// ===
function clearTable(){
	
	document.querySelector("#dbTableViewerblockId").innerHTML = '';
}



		function addRecord(){
	 	 	var myTable= document.querySelector("#myTableId").value.toUpperCase();
			var myDate=document.querySelector("#dateId").value.toUpperCase();
	 		var myItemTitle= document.querySelector("#titleId").value.toUpperCase();
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
				//test purpose use
				// alert(xmlhttp1.responseText);
			}}
			xmlhttp1.open("POST",addRecordUrl+"?"+param,true);
			xmlhttp1.setRequestHeader('Content-Type', 'application/json');
			xmlhttp1.send(null);
			// var myDate=document.querySelector("#dateId").value='';
	 		var myItemTitle= document.querySelector("#titleId").value='';
	 		var myamount= document.querySelector("#amountId").value='';
	 		// ====
	 		//CURRENT DATE
	 		var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			var today = mm + '/' + dd + '/' + yyyy;
	 		// ====
	 		updateDateOn(myTable,today);
	 		getupdatedDate(myTable);
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
				document.querySelector("#dbTableViewerblockId").innerHTML =tbl
				document.querySelector("#dbTabletotalBottomId").innerHTML ="TOTAL:"+sum;
				document.querySelector("#dbTableTitleId").innerHTML = "TABLE NAME: "+myTable
				document.querySelector("#dashboardText").innerHTML="Total Expense: "+ sum

		}}; xmlhttp.send();
		// ====

	
			

			

// ====
	}


	function clear(){
			var myTable= document.querySelector("#myTableId").value='';
			var myDate=document.querySelector("#dateId").value='';
	 		var myItemTitle= document.querySelector("#titleId").value='';
	 		var myamount= document.querySelector("#amountId").value='';

	}

	function setCurrentDate(){
		var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var today = mm + '/' + dd + '/' + yyyy;
document.querySelector("#dateId").value=today;}

	function getCurrentDate(){
		var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var today = mm + '/' + dd + '/' + yyyy;
return today;}


function updateDateOn(myTable,myUpdatedDate){
var xmlhttp_updateDate= new XMLHttpRequest();
			var updateDateUrl= host+'/update_on';
			var param="tableName="+myTable+"&newdate="+myUpdatedDate+"";

			xmlhttp_updateDate.onreadystatechange = function() {
			if(xmlhttp_updateDate.readyState===4 & xmlhttp_updateDate.status===200){
				//test purpose uncomment
				// alert(xmlhttp_updateDate.responseText);
			}}
			xmlhttp_updateDate.open("POST",updateDateUrl+"?"+param,true);
			xmlhttp_updateDate.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_updateDate.send(null);

}

function getupdatedDate(myTable){
	var getUpdatedDateUrl= host+'/get_updated_date';
	var xmlhttp_getUpdatedDate= new XMLHttpRequest();
	var param="tableName="+myTable+"";
	xmlhttp_getUpdatedDate.open("GET",getUpdatedDateUrl+"?"+param,true);
	var updatedDateresponse1;
		xmlhttp_getUpdatedDate.onreadystatechange = function() {
			if(xmlhttp_getUpdatedDate.readyState===4 & xmlhttp_getUpdatedDate.status===200){
			  var updatedDateresponse=xmlhttp_getUpdatedDate.responseText;
			  //test purpose uncomment
				// alert(updatedDateresponse);
				// document.querySelector("#updatedOnblockId").innerHTML = "LAST UPDATED: "+updatedDateresponse;
				document.querySelector("#dashboardBody2").innerHTML = "LAST UPDATED: "+updatedDateresponse;
			}}; xmlhttp_getUpdatedDate.send();
		
		}

