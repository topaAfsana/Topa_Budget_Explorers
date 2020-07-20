var tbltop=`<table class="dbTable">
				<tr><th>Item#</th><th>Date</th><th>Title</th><th>Amount</th><th>Options</th></tr>`;
var tbl;

var host="http://localhost:8080";
// var host="https://192.168.0.14:8443";
// var host="https://52.91.249.153:8443";
// var host="http://52.91.249.153:8080";


//1.
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


// 2.
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
					showRecords();
					getupdatedDate(myQuerytable);
				}
					else { 
					clearTable();
					alert("TABLE DOES NOT EXIST.PLEASE CRAETE THE TABLE;")};
				}}
			xmlhttp_find.open("GET",findTableUrl+"?"+param,true);
			xmlhttp_find.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_find.send(null);
			
	 		
		}

		// ===

	// 3.
	function clearTable(){
	
	document.querySelector("#dbTableViewerblockId").innerHTML = '';
	document.querySelector("#dbTabletotalBottomId").innerHTML ='';
	document.querySelector("#dbTableTitleId").innerHTML ='';
	document.querySelector("#dashboardTextTotal").innerHTML='';
	document.querySelector("#dashboardBodylastUpdate").innerHTML ='';
	}


	// 4.

	function addRecord(){
	 	var myTable= document.querySelector("#myTableId").value.toUpperCase();
		var myDate=document.querySelector("#dateId").value.toUpperCase();
	 	var myItemTitle= document.querySelector("#titleId").value.toUpperCase();
	 	var myamount= document.querySelector("#amountId").value;

	 			if (myTable == "") {
	 			alert ("Please enter Table name");
        		return false;}

	 
	 	 		if (myItemTitle == "") {
	 			alert ("Please enter a title of the item");
        		return false;}
        		
        		if ( myamount == ""){
        		alert("Please enter a amount of the item");
        		return false;}

        		if (isNaN(myamount)){
        		alert("Amount must be numbers!");
        		return false;}
        		

        if (!(myTable == "") && !(myItemTitle == "") && (Number(myamount)) ) {
        			var xmlhttp1= new XMLHttpRequest();
			var addRecordUrl= host+'/add_record';
			var param="tableName="+myTable+"&date="+myDate+"&title="+myItemTitle+"&amount="+myamount+"";

			xmlhttp1.onreadystatechange = function() {
				if(xmlhttp1.readyState===4 & xmlhttp1.status===200){
				// test purpose use
				alert(xmlhttp1.responseText);
			}}

	 		xmlhttp1.open("POST",addRecordUrl+"?"+param,true);
			xmlhttp1.setRequestHeader('Content-Type', 'application/json');
			xmlhttp1.send(null);


			//CURRENT DATE TO UPDATE DATE
	 		var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			var today = mm + '/' + dd + '/' + yyyy;
	 		// ====
	 		updateDateOn(myTable,today);
	 		getupdatedDate(myTable);
	 		// ===
	 		
	 		
	 		
	 	}
	 	else{alert("Failed to add Item,please enter all required value")}

			var myItemTitle= document.querySelector("#titleId").value='';
	 		var myamount= document.querySelector("#amountId").value='';
	 	}
// =======


//=======
	
	// 5.
		function addAndLoad(){
		addRecord();
		findTable();

	}

//=======


var trId;
// 6.
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
				var fetch_sum=0;
				

				for (i=0;i<records.length;i++){

				 trId=records[i].id;
				 alert("MY ALLERT"+trId);
				 var editButton="<input type='button' id='edit-"+trId+"' value='Edit' class='edit' onclick="+edit_row(""+trId+"")+">";

				main += "<tr id="+"row-"+trId+"><td>"+records[i].id+"</td><td>"+records[i].date+"</td><td>"+records[i].title+"</td><td id='amount_col_row"+trId+"'>"+records[i].amount+"</td><td>"
				+editButton+"</td></tr>";
				fetch_sum+=records[i].amount;}
				var sum=Number(fetch_sum).toFixed(2);

				var tblbottom= "</table>";
				tbl=tbltop + main + tblbottom;
				document.querySelector("#dbTableViewerblockId").innerHTML =tbl
				document.querySelector("#dbTabletotalBottomId").innerHTML ="TOTAL:"+sum;
				document.querySelector("#dbTableTitleId").innerHTML = "TABLE: "+myTable
				document.querySelector("#dashboardTextTotal").innerHTML="Total Amount: "+ sum

		}}; xmlhttp.send();}

		// 7.
	function clear(){
			var myTable= document.querySelector("#myTableId").value='';
			var myDate=document.querySelector("#dateId").value='';
	 		var myItemTitle= document.querySelector("#titleId").value='';
	 		var myamount= document.querySelector("#amountId").value='';

	}
	// 8.
	function setCurrentDate(){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		var today = mm + '/' + dd + '/' + yyyy;
		document.querySelector("#dateId").value=today;}

	// 9.
	function getCurrentDate(){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		var today = mm + '/' + dd + '/' + yyyy;
			return today;}


// 10.
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


// 11.
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
				document.querySelector("#dashboardBodylastUpdate").innerHTML = "Table Last Updated: "+updatedDateresponse;
			}}; xmlhttp_getUpdatedDate.send();
}




// 
function showTables() {
		var showTablesUrl= host+'/show_tables';
		var xmlhttp_showTables= new XMLHttpRequest();
		xmlhttp_showTables.open("GET",showTablesUrl,true);

		xmlhttp_showTables.onreadystatechange = function() {
			if(xmlhttp_showTables.readyState===4 & xmlhttp_showTables.status===200){

				var records = xmlhttp_showTables.responseText;	
		
				console.log("TOPA TEST IS "+records);
		
				document.querySelector("#dbTablesZone").innerHTML=records;
}};xmlhttp_showTables.send();
}


function edit_row(no){
	var amount=document.getElementById("amount_col_row"+no+"").value;
	var amount_new=amount.innerHTML;
	amount.innerHTML="<input type='text' id='amount_col_row"+no+"' value='"+amount_new+"'>";
}




