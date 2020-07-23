

var tbltop=`<table class="dbTable">
				<tr><th>Item</th><th>Date</th><th>Title</th><th>Amount</th><th class="chk"></th></tr>`;
var tbl;

// var host="http://localhost:8080";
// var host="https://192.168.0.14:8443";
// var host="https://52.91.249.153:8443";
var host="http://52.91.249.153:8080";


//1.
function createTable(){

			var myCreatetable=document.querySelector("#myTableId").value.toUpperCase();
			var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
			if (myCreatetable == "") {alert ("Please enter Table name");return false;}
	
			var xmlhttp_create= new XMLHttpRequest();
			var createTableUrl= host+'/create_table';
			var param="tableName="+myCreatetable+"";
			
			xmlhttp_create.onreadystatechange = function() {
			if(xmlhttp_create.readyState===4 & xmlhttp_create.status===200){
				var response = xmlhttp_create.responseText;	
				alert(response);
				if (response === "TABLE IS SUCCESSFULLY CREATED"){
					inserIntoProfileBasedTable(myProfName,myCreatetable);
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
	 				alert ("Please enter Table name");return false;}
			var xmlhttp_find= new XMLHttpRequest();
			var findTableUrl= host+'/find_table';
			var param="tableName="+myQuerytable+"";
			xmlhttp_find.onreadystatechange = function() {
			var tableDiv= document.querySelector("div").innerHTML;
			if(xmlhttp_find.readyState===4 & xmlhttp_find.status===200){
				var response=xmlhttp_find.responseText;
				//test purpose uncomment
				alert(response);
				if (response === "TABLE FOUND IN DATABASE"){
					showRecords();
					getupdatedDate(myQuerytable);
				}else { 
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
	hideEditOptions();
	document.querySelector("#dbTableViewerblockId").innerHTML = '';
	document.querySelector("#dbTabletotalBottomId").innerHTML ='';
	document.querySelector("#dbTableTitleId").innerHTML ='';
	document.querySelector("#dashboardTextTotal").innerHTML='';
	document.querySelector("#dashboardBodylastUpdate").innerHTML ='';
	document.querySelector("#dashboardBodyTableName").innerHTML ='';
	}


	// 4.

	function addRecord(){
	 	var myTable= document.querySelector("#myTableId").value.toUpperCase();
		var myDate=document.querySelector("#dateId").value;
	 	var myItemTitle= document.querySelector("#titleId").value;
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
				// alert(xmlhttp1.responseText);
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
		// findTable();
		validateTableFromProfileBasedTable();

	}

//=======


var trId;
// 6.
function showRecords() {

			var myTable=document.querySelector("#myTableId").value.toUpperCase();
			if (myTable == "") {
	 			alert ("Please enter Table name");return false;}
		
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
						var j=i+1;
				 trId=records[i].id;
				 var chkButton="<input type='checkbox' id='"+trId+"' class='chk' >";
				main += "<tr id="+"row-"+trId+"><td>"+j+"</td><td id='date_col_row"+trId+"'>"+records[i].date+"</td><td id='title_col_row"+trId+"'>"+records[i].title+"</td><td id='amount_col_row"+trId+"'>"+records[i].amount+"</td><td>"
				+chkButton+"</td></tr>";
				fetch_sum+=records[i].amount;}
				var sum=Number(fetch_sum).toFixed(2);

				var tblbottom= "</table>";
				tbl=tbltop + main + tblbottom;
				document.querySelector("#dashboardBodyTableName").innerHTML = "TABLE: "+myTable;
				document.querySelector("#dbTableViewerblockId").innerHTML =tbl
				document.querySelector("#dbTabletotalBottomId").innerHTML ="Total:"+sum;
				document.querySelector("#dbTableTitleId").innerHTML = "<strong>TABLE</strong>: "+"<strong>"+myTable+"</strong>"
				document.querySelector("#dashboardTextTotal").innerHTML="Total Amount: "+ sum;
				displayEditOptions();
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
	var myTable= document.querySelector("#myTableId").value.toUpperCase();
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
			  	// document.querySelector("#dashboardBodyTableName").innerHTML = "TABLE: "+myTable;
				document.querySelector("#dashboardBodylastUpdate").innerHTML = "Last Updated: "+updatedDateresponse;
			}}; xmlhttp_getUpdatedDate.send();
}



//DEV TOOL
// 12.
function showTables() {
	var dbtbl=`<table class="dbTable">
				<tr><th>Tables</th></tr>`;
		var showTablesUrl= host+'/show_tables';
		var xmlhttp_showTables= new XMLHttpRequest();
		xmlhttp_showTables.open("GET",showTablesUrl,true);

		xmlhttp_showTables.onreadystatechange = function() {
			if(xmlhttp_showTables.readyState===4 & xmlhttp_showTables.status===200){

				var records = JSON.parse(xmlhttp_showTables.responseText);	
				var main;

				// test purpose
				// console.log("ALL TABLES IN THE DB: "+records);
				for (i=0;i<records.length;i++){

	
				 main += "<tr><td>"+records[i]+"</td></tr>";
				var tblbottom= "</table>";
				tbl=dbtbl + main + tblbottom;
				document.querySelector("#dbTablesZone").innerHTML =tbl
		}
}};xmlhttp_showTables.send();
}



//EDIT OPTIONS

//13.
function editRow(id){
	document.getElementById("editId").style.display="none";
 	document.getElementById("saveId").style.display="inline-block";
 	document.getElementById("deleteId").style.display="inline-block";
 	document.getElementById("cancelId").style.display="inline-block";


	var date=document.getElementById("date_col_row"+id+"");
	var date_new=date.innerHTML;

	var title=document.getElementById("title_col_row"+id+"");
	var title_new=title.innerHTML;

	var amount=document.getElementById("amount_col_row"+id+"");
	var amount_new=amount.innerHTML;


	date.innerHTML="<input type='text' class='newInput' id='new_date_col_row"+id+"' value='"+date_new+"'>";
	title.innerHTML="<input type='text' class='newInput' id='new_title_col_row"+id+"' value='"+title_new+"'>";
	amount.innerHTML="<input type='text' class='newInput' id='new_amount_col_row"+id+"' value='"+amount_new+"'>";
}


//14.
function getSelectedCheckboxId() {
    const checkboxes = document.querySelectorAll('input[class="chk"]:checked');
    let ids = [];
    checkboxes.forEach((checkbox) => {
        ids.push(checkbox.getAttribute("id"));
    });
return ids;
    }

// 15.
function getSelectedCheckboxIdLength() {
    const checkboxes = document.querySelectorAll('input[class="chk"]:checked');
    let ids = [];
    checkboxes.forEach((checkbox) => {
        ids.push(checkbox.getAttribute("id"));
    });
    	return ids.length;

   
    
    }

//16.
function editRecord(){
var id=getSelectedCheckboxId();
if(getSelectedCheckboxIdLength()===1){
	editRow(id);}
else{alert("SELECT SPECIFIC ITEM CHECKBOX AND THEN CLICK EDIT TO UPDATE");}}




// 17.
function updateRecord(){
	var id=getSelectedCheckboxId();
		var myTable= document.querySelector("#myTableId").value.toUpperCase();
		var new_date=document.getElementById("new_date_col_row"+id).value;
 		var new_title=document.getElementById("new_title_col_row"+id).value;
 		var new_amount=document.getElementById("new_amount_col_row"+id).value;
 		


 		document.getElementById("date_col_row"+id).innerHTML=new_date;
 		document.getElementById("title_col_row"+id).innerHTML=new_title;
 		document.getElementById("amount_col_row"+id).innerHTML=new_amount;

	 			if (myTable == "") {
	 			alert ("Please enter Table name");
        		return false;}

	 
	 	 		if (new_title == "") {
	 			alert ("Please enter a title of the item");
        		return false;}
        		
        		if ( new_amount == ""){
        		alert("Please enter a amount of the item");
        		return false;}

        		if (isNaN(new_amount)){
        		alert("Amount must be numbers!");
        		return false;}
        		

        if (!(myTable == "") && !(new_title == "") && (Number(new_amount)) ) {
        	var xmlhttp_updateRecord= new XMLHttpRequest();
			var updateRecordUrl= host+'/update_record';
			var param="tableName="+myTable+"&date="+new_date+"&title="+new_title+"&amount="+new_amount+"&id="+id+"";

			xmlhttp_updateRecord.onreadystatechange = function() {
				if(xmlhttp_updateRecord.readyState===4 & xmlhttp_updateRecord.status===200){
				// test purpose use
				alert(xmlhttp_updateRecord.responseText);
			}}

	 		xmlhttp_updateRecord.open("POST",updateRecordUrl+"?"+param,true);
			xmlhttp_updateRecord.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_updateRecord.send(null);

// 			findTable();
			validateTableFromProfileBasedTable();


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
	 		document.getElementById("editId").style.display="block";
 			document.getElementById("saveId").style.display="none";
 			document.getElementById("deleteId").style.display="none";
 			document.getElementById("cancelId").style.display="none";
	 		}
	 	else{alert("Failed to Update Item,please enter all required value")}
	}

// 18.
function deleteRow(){
		var id=getSelectedCheckboxId();
		var myTable= document.querySelector("#myTableId").value.toUpperCase();
		

        	var xmlhttp_deleteRecord= new XMLHttpRequest();
			var deleteRecordUrl= host+'/delete_record';
			var param="tableName="+myTable+"&id="+id+"";

			xmlhttp_deleteRecord.onreadystatechange = function() {
				if(xmlhttp_deleteRecord.readyState===4 & xmlhttp_deleteRecord.status===200){
				// test purpose use
				alert(xmlhttp_deleteRecord.responseText);
			}}

	 		xmlhttp_deleteRecord.open("POST",deleteRecordUrl+"?"+param,true);
			xmlhttp_deleteRecord.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_deleteRecord.send(null);
			findTable();


			//CURRENT DATE TO UPDATE DATE
	 		var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			var today = mm + '/' + dd + '/' + yyyy;
	 		// ====
	 		updateDateOn(myTable,today);
	 		getupdatedDate(myTable);
	 		// ==
	 		document.getElementById("editId").style.display="block";
 			document.getElementById("saveId").style.display="none";
 			document.getElementById("deleteId").style.display="none";
 			document.getElementById("cancelId").style.display="none";
	 	}


// 19.
function deleteRecord(){
	 		if(getSelectedCheckboxIdLength()===1){
			deleteRow();}
			else{alert("SELECT SPECIFIC ITEM CHECKBOX AND THEN CLICK EDIT TO DELETE");}
	 	}

	function cancelEdit(){
		document.getElementById("editId").style.display="block";
 			document.getElementById("saveId").style.display="none";
 			document.getElementById("deleteId").style.display="none";
 			document.getElementById("cancelId").style.display="none";
		showRecords();
	 	}


// 20.
function displayEditOptions(){
	 		document.getElementById("editId").style.display="block";
	 	}
function hideEditOptions(){
	 		document.getElementById("editId").style.display="none";
	 	}



// 13.
function createProfile(){
	var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
	var myPass=document.querySelector("#myPassId").value;
					if (myProfName == "") {
	 					alert ("Please enter Profile name");return false; }
        		 	if (myPass == "") {
	 					alert ("Please enter Password");return false;}
			var xmlhttp_createProf= new XMLHttpRequest();
			var createProfileTableUrl= host+'/create_profile';
			var param="profileName="+myProfName+"&pass="+myPass+"";
			xmlhttp_createProf.onreadystatechange = function() {
			if(xmlhttp_createProf.readyState===4 & xmlhttp_createProf.status===200){
				var response = xmlhttp_createProf.responseText;	
				alert(response);
				if(response==="PROFILE IS SUCCESSFULLY CREATED"){
					createProfileBasedTable(myProfName)
				}
			}}
			xmlhttp_createProf.open("POST",createProfileTableUrl+"?"+param,true);
			xmlhttp_createProf.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_createProf.send(null);
}


//14.
function authenticateProfile(){
	var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
	var myPass=document.querySelector("#myPassId").value;
					if (myProfName == "") {
	 					alert ("Please enter Profile name");return false; }
        		 	if (myPass == "") {
	 					alert ("Please enter Password");return false;}	
     	
        	var xmlhttp_authenticateProfile= new XMLHttpRequest();
			var authenticateProfileUrl= host+'/authenticate_profile';
			var param="profileName="+myProfName+"&pass="+myPass+"";
			xmlhttp_authenticateProfile.onreadystatechange = function() {
				if(xmlhttp_authenticateProfile.readyState===4 & xmlhttp_authenticateProfile.status===200){
				var response=xmlhttp_authenticateProfile.responseText;
				// test purpose
				// alert(response);
				if(response==="PROFILE FOUND"){
				var logInValue=document.querySelector("#myProfileId").value.toUpperCase();
				document.querySelector("#logInZone").style.display="none";
				document.querySelector("#logInHeaderZone").style.display="none";
				document.querySelector("#hideId").style.display="block";
				document.querySelector("#userId").innerHTML= logInValue;
				}else{alert("User Not found ,Please Register First to Log in");}
			}}
	 		xmlhttp_authenticateProfile.open("GET",authenticateProfileUrl+"?"+param,true);
			xmlhttp_authenticateProfile.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_authenticateProfile.send(null);
		}


// 15.
function createProfileBasedTable(myProfName){
	
			var xmlhttp_createProfileBasedTable= new XMLHttpRequest();
			var createProfileBasedTableUrl= host+'/create_profile_based_table';
			var param="profileName="+myProfName+"";
			xmlhttp_createProfileBasedTable.onreadystatechange = function() {
			if(xmlhttp_createProfileBasedTable.readyState===4 & xmlhttp_createProfileBasedTable.status===200){
				var response = xmlhttp_createProfileBasedTable.responseText;	
				//test purpose
				// alert(response);
			}}
			xmlhttp_createProfileBasedTable.open("POST",createProfileBasedTableUrl+"?"+param,true);
			xmlhttp_createProfileBasedTable.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_createProfileBasedTable.send(null);
}


// 16.
function inserIntoProfileBasedTable(myProfName,myCreatetable){
	
			var xmlhttp_insertIntoProfileBasedTable= new XMLHttpRequest();
			var insertIntoProfileBasedTableUrl= host+'/insert_into_profile_based_table';
			var param="profileName="+myProfName+"_TABLE&tableName="+myCreatetable+"";
			xmlhttp_insertIntoProfileBasedTable.onreadystatechange = function() {
			if(xmlhttp_insertIntoProfileBasedTable.readyState===4 & xmlhttp_insertIntoProfileBasedTable.status===200){
				var response = xmlhttp_insertIntoProfileBasedTable.responseText;
				//test purpose	
				// alert(response);
			}}
			xmlhttp_insertIntoProfileBasedTable.open("POST",insertIntoProfileBasedTableUrl+"?"+param,true);
			xmlhttp_insertIntoProfileBasedTable.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_insertIntoProfileBasedTable.send(null);
}



//17.
function showTablesFromProfileBasedTable() {
	document.querySelector("#showprofTableId").style.display='none';


		var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
		var getTablesFromProfileBasedTableurl= host+'/get_tables_from_profile_based_table';
		var xmlhttp_getTablesFromProfileBasedTable= new XMLHttpRequest();
		var param="profileName="+myProfName+"";
		xmlhttp_getTablesFromProfileBasedTable.open("GET",getTablesFromProfileBasedTableurl+"?"+param,true);
		xmlhttp_getTablesFromProfileBasedTable.onreadystatechange = function() {
			if(xmlhttp_getTablesFromProfileBasedTable.readyState===4 & xmlhttp_getTablesFromProfileBasedTable.status===200){
				var records = JSON.parse(xmlhttp_getTablesFromProfileBasedTable.responseText);	
				console.log(records);
			var top=`<table class="profBasedTable">
				<tr><th class="profBasedTh"></th><th class="profBasedTh">Tables</th></tr>`;
			var body= "";
			for (i=0;i<records.length;i++){ var j=i+1;
			var profileTrId=records[i].id;
				body += "<tr id="+"row-"+profileTrId+"><td>"+j+"</td><td>"+records[i].tableName+"</td></tr>";}
			var bottom= "</table>";
			var profiletbl=top + body + bottom;
				document.querySelector("#profileTableTitleId").innerHTML = "<strong>PROFILE</strong>: "+"<strong>"+myProfName+"</strong>";
				document.querySelector("#profileTableViewerblockId").innerHTML =profiletbl;
				//Future implementation
				// displayEditOptions();
}}; xmlhttp_getTablesFromProfileBasedTable.send();
document.querySelector("#closeprofTableId").style.display='inline-block';
document.querySelector("#tableViewerZone").style.display='inline-block';
}

//17.
function closeTablesFromProfileBasedTable() {
	document.querySelector("#showprofTableId").style.display='inline-block';
	document.querySelector("#closeprofTableId").style.display='none';
	document.querySelector("#tableViewerZone").style.display='none';
}



//18. VALIDATE QUERIED TABLE NAME IN PROFILE BASED TABLE AND SHOW RECORD IF FOUND OTHERWISE DONT SHOW
function validateTableFromProfileBasedTable() {
		var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
		var myQuerytable= document.querySelector("#myTableId").value.toUpperCase();
		var validateTablesFromProfileBasedTableurl= host+'/validate_table_from_profile_based_table';
		var xmlhttp_validareTablesFromProfileBasedTable= new XMLHttpRequest();
		var param="profileName="+myProfName+"&tableName="+myQuerytable+"";
		xmlhttp_validareTablesFromProfileBasedTable.open("GET",validateTablesFromProfileBasedTableurl+"?"+param,true);
		xmlhttp_validareTablesFromProfileBasedTable.onreadystatechange = function() {
			if(xmlhttp_validareTablesFromProfileBasedTable.readyState===4 & xmlhttp_validareTablesFromProfileBasedTable.status===200){
				var response = xmlhttp_validareTablesFromProfileBasedTable.responseText;	
				//test purpose
				// alert(response);
			if(response === "TABLE NAME FOUND IN PROFILE BASED TABLE"){
				// alert("YOUR TABLE FOUND");
				showRecords();
				getupdatedDate(myQuerytable);}
			else{
				// MODIFIED FIND BLOCK

			var xmlhttp_find= new XMLHttpRequest();
			var findTableUrl= host+'/find_table';
			var param="tableName="+myQuerytable+"";
			xmlhttp_find.onreadystatechange = function() {
			if(xmlhttp_find.readyState===4 & xmlhttp_find.status===200){
				var response=xmlhttp_find.responseText;
				//test purpose uncomment
				// alert(response);
				if (response === "TABLE FOUND IN DATABASE"){
// 					hideEditOptions();
					clearTable();
					alert("YOU DONT HAVE ACCESS TO THE TABLE")
				}else { 
// 					hideEditOptions();
					clearTable();
					alert("TABLE DOES NOT EXIST.PLEASE CRAETE NEW TABLE;")};
				}}
			xmlhttp_find.open("GET",findTableUrl+"?"+param,true);
			xmlhttp_find.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_find.send(null);
				// MODIFIED FIND BLOCK





				// alert("TABLE NOT FOUND IN PROFILE BASED TABLE");
				// clearTable();
			}
	}}; xmlhttp_validareTablesFromProfileBasedTable.send();}















