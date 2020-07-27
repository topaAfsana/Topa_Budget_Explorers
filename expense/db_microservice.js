
window.onload = function() {
  getCurrentDay();
};
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

		 	for(var i=0;i<myCreatetable.length;i++){
					var currentChar=myCreatetable[i];
		 			if (currentChar==" "){
		 			alert ("Please Remove space between Words. Enter Word like : YourTableName  OR Your_Table");
		 			alert("TABLE NOT CREATED!Please Try again!");
		 			return false;
		 		}
		 		if(currentChar=="-"){
		 			alert ("Please Remove dash between Words. Enter Word like : YourTableName  OR Your_Table" );
		 			alert("TABLE NOT CREATED! Please Try again!");
		 			return false;}}

		 	if(!(currentChar == " ") && !(currentChar == "-")){
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
					if(document.querySelector("#tableViewerZone").style.display=="inline-block"){
					showTablesFromProfileBasedTable();
					}
				}
			}}
			xmlhttp_create.open("POST",createTableUrl+"?"+param,true);
			xmlhttp_create.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_create.send(null);

		 		}
		 	else{aler("TABLE NOT CREATED!TRY AGAIN! Please Enter Table Name with no space or Dash.");}
	}

//=======


// 2.//find table from total db
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
				if (response === "TABLE FOUND IN DATABASE"){
					if(document.querySelector("#tableViewerZone").style.display=="inline-block"){
						closeTablesFromProfileBasedTable();
					}
					showRecords();
					getupdatedDate(myQuerytable);
				}else { 
					clearTable();
					alert("TABLE DOES NOT EXIST.PLEASE CRAETE THE TABLE;")
					showTablesFromProfileBasedTable();};
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



//TABLE RECORDS EDIT OPTIONS-START

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
return ids; }

// 15.
function getSelectedCheckboxIdLength() {
    const checkboxes = document.querySelectorAll('input[class="chk"]:checked');
    let ids = [];
    checkboxes.forEach((checkbox) => {
        ids.push(checkbox.getAttribute("id"));
    });
    	return ids.length;}

//16.
function editRecord(){
var id=getSelectedCheckboxId();
if (getSelectedCheckboxIdLength()>1){
	alert("Select one checkbox at a time");
}
else{
	if(getSelectedCheckboxIdLength()===1){
	editRow(id);}
else{alert("Select specific checkbox and click Edit");}
}
}




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
	 		// ==
	 		document.getElementById("editId").style.display="block";
 			document.getElementById("saveId").style.display="none";
 			document.getElementById("deleteId").style.display="none";
 			document.getElementById("cancelId").style.display="none";
	 	}


// 19.
function deleteRecord(){
	 		if(getSelectedCheckboxIdLength()===1){
var x = confirm("Are you sure you want to delete this table?");
      if (x== true){deleteRow();}
      else{			validateTableFromProfileBasedTable();
}}
			else{alert("Select specific checkbox and click Delete");}
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

//TABLE RECORDS EDIT OPTIONS-END



// PROFILE BASED FEATURE-START

// 13.
function createProfile(){
	var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
	var myPass=document.querySelector("#myPassId").value;
					if (myProfName == "") {
	 					alert ("Please enter Profile name");return false; }
        		 	if (myPass == "") {
	 					alert ("Please enter Password");return false;}



for(var i=0;i<myProfName.length;i++){
		 		var currentChar=myProfName[i];
		 		// alert(myCreatetable[i]);

		 		if (currentChar==" "){
		 			alert ("Please Remove space between Name");
		 			alert("Please enter Profile name without any space or dash. Due to this issue PROFILE NOT CREATED!Please Try again!");
		 			alert("Enter Profile like : FirstnameLastName  OR oneName. Ex.AfsanaTopa OR Topa" );

		 			return false;
		 		}
		 		if(currentChar=="-"){
		 			alert ("Please Remove dash between Name");
		 			alert("Please enter Profile name without any space or dash. Due to this issue PROFILE NOT CREATED!Please Try again!");
		 			alert("Enter Profile like : FirstnameLastName  OR oneName. Ex.AfsanaTopa OR Topa" );
		 				 			return false;}}


		 	if(!(currentChar == " ") && !(currentChar == "-")){




		 		//VALIDATE
        	var xmlhttp_authenticateProfile= new XMLHttpRequest();
			var authenticateProfileUrl= host+'/authenticate_profile';
			var param="profileName="+myProfName+"&pass="+myPass+"";
			xmlhttp_authenticateProfile.onreadystatechange = function() {
				if(xmlhttp_authenticateProfile.readyState===4 & xmlhttp_authenticateProfile.status===200){
				var response=xmlhttp_authenticateProfile.responseText;
				// test purpose
				// alert(response);
				if(response== "PROFILE FOUND"){
				alert("PROFILE NAME ALREADY CREATED")
				}

              if(response==="PROFILE NOT FOUND"){
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

			}}
	 		xmlhttp_authenticateProfile.open("GET",authenticateProfileUrl+"?"+param,true);
			xmlhttp_authenticateProfile.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_authenticateProfile.send(null);
			//VALIDATE

		}
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
				document.querySelector("#bodyHideId").style.display="block";
				document.querySelector("#userId").innerHTML= logInValue;
				document.querySelector("#myProfileId").value='';
				document.querySelector("#myPassId").value='';
				document.querySelector("#myTableId").value='';


				}else{alert("User Not found,Please Register to Log in");}
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
			var param="profileName="+myProfName+"_PROFILE&tableName="+myCreatetable+"";
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


		// var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
				var myProfName=document.querySelector("#userId").innerHTML;

		// alert(myProfName);
		var getTablesFromProfileBasedTableurl= host+'/get_tables_from_profile_based_table';
		var xmlhttp_getTablesFromProfileBasedTable= new XMLHttpRequest();
		var param="profileName="+myProfName+"";
		xmlhttp_getTablesFromProfileBasedTable.open("GET",getTablesFromProfileBasedTableurl+"?"+param,true);
		xmlhttp_getTablesFromProfileBasedTable.onreadystatechange = function() {
			if(xmlhttp_getTablesFromProfileBasedTable.readyState===4 & xmlhttp_getTablesFromProfileBasedTable.status===200){
				var records = JSON.parse(xmlhttp_getTablesFromProfileBasedTable.responseText);	
				console.log(records);
			var top=`<table class="profBasedTable">
				<tr><th class="profBasedTh">No</th><th class="profBasedTh">Tables</th><th></th></tr>`;
			var body= "";
			for (i=0;i<records.length;i++){ var j=i+1;
			var profileTrId=records[i].id;
			var chkButtonP="<input type='checkbox' id='"+profileTrId+"' class='chkProf' >";

				body += "<tr id="+"row-"+profileTrId+"><td>"+j+"</td><td id='table"+profileTrId+"'>"+records[i].tableName+"</td><td>"+chkButtonP+"</td></tr>";}
			var bottom= "</table>";
			var profiletbl=top + body + bottom;
				document.querySelector("#profileTableTitleId").innerHTML = "<strong>TABLES OF</strong> "+"<strong>"+myProfName+"</strong>";
				document.querySelector("#profileTableViewerblockId").innerHTML =profiletbl;
				//Future implementation
				// displayEditOptions();
}}; xmlhttp_getTablesFromProfileBasedTable.send();
document.querySelector("#closeprofTableId").style.display='inline-block';
document.querySelector("#editIdProf").style.display='inline-block';
document.querySelector("#deleteIdProf").style.display='inline-block';
document.querySelector("#showSelectedTableId").style.display='inline-block';
document.querySelector("#tableViewerZone").style.display='inline-block';


}

//18.
function closeTablesFromProfileBasedTable() {
	document.querySelector("#showprofTableId").style.display='inline-block';
	document.querySelector("#editIdProf").style.display='none';
	document.querySelector("#closeprofTableId").style.display='none';
	document.querySelector("#tableViewerZone").style.display='none';
	document.querySelector("#deleteIdProf").style.display='none';
	document.querySelector("#showSelectedTableId").style.display='none';

}



//19. VALIDATE QUERIED TABLE NAME IN PROFILE BASED TABLE AND SHOW RECORD IF FOUND OTHERWISE DONT SHOW
// //find table from profile table
function validateTableFromProfileBasedTable() {
		// var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
		var myProfName=document.querySelector("#userId").innerHTML;
		// alert(myProfName);

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
				if(document.querySelector("#tableViewerZone").style.display=="inline-block"){
						closeTablesFromProfileBasedTable();
					}
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
					clearTable();
					alert("YOU DONT HAVE ACCESS TO THE TABLE")
				}else { 
					clearTable();
					alert("TABLE DOES NOT EXIST.PLEASE CRAETE NEW TABLE;")};
				}}
			xmlhttp_find.open("GET",findTableUrl+"?"+param,true);
			xmlhttp_find.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_find.send(null);
			}
	}}; xmlhttp_validareTablesFromProfileBasedTable.send();}


	// PROFILE BASED VALIDATION FEATURE-END



// EDIT OPTIONS FOR PROFILE TABLE-START

//20.
function getSelectedCheckboxIdForProfTables() {
    const checkboxes = document.querySelectorAll('input[class="chkProf"]:checked');
    let ids = [];
    checkboxes.forEach((checkbox) => {
        ids.push(checkbox.getAttribute("id"));
    });
return ids; }

//21.
function getSelectedCheckboxIdLengthOfProfTables() {
    const checkboxes = document.querySelectorAll('input[class="chkProf"]:checked');
    let ids = [];
    checkboxes.forEach((checkbox) => {
        ids.push(checkbox.getAttribute("id"));
    });
    	return ids.length;}



//22.
function editTableOfProfile(){
var id=getSelectedCheckboxIdForProfTables();
if(getSelectedCheckboxIdLengthOfProfTables()>1){
	alert("Please select one checkbox at a time");
}else{if(getSelectedCheckboxIdLengthOfProfTables()===1){
	editTable(id);}
else{alert("Select specific checkbox and click Edit");}}
}

//23.
function editTable(id){
	document.getElementById("editIdProf").style.display="none";
	document.getElementById("showSelectedTableId").style.display="none";
	document.getElementById("deleteIdProf").style.display="none";
 	document.getElementById("saveIdProf").style.display="inline-block";
 	document.getElementById("cancelIdProf").style.display="inline-block";
	var old_tableName=document.getElementById("table"+id);
	var new_tableName=old_tableName.innerHTML;
	old_tableName.innerHTML="<input type='text' class='"+new_tableName+"' id='new_table"+id+"' value='"+new_tableName+"'>";
}


//24.
function renameTable(){

		var id=getSelectedCheckboxIdForProfTables();
		var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
		var old_tableName=document.getElementById("new_table"+id).getAttribute("class");	
		var new_tableName=document.getElementById("new_table"+id).value.toUpperCase();
 		document.getElementById("table"+id).innerHTML=new_tableName;

	 			if (new_tableName == "") {
	 			alert ("Please enter Table name");
        		return false;}

        		for(var i=0;i<new_tableName.length;i++){
		 		var currentChar=new_tableName[i];
		 		// alert(myCreatetable[i]);

		 		if (currentChar==" "){
		 			alert ("Please Remove space between Words.Enter Word like : YourTableName  OR Your_Table");
		 			alert("TABLE NOT UPDATED! Please Try again!");
		 			cancelEditProf();
		 			return false;
		 		}
		 		if(currentChar=="-"){
		 			alert ("Please Remove space between Words.Enter Word like : YourTableName  OR Your_Table");
		 			alert("TABLE NOT UPDATED! Please Try again!");
					cancelEditProf();
		 			return false;}
		 		}

		if(!(currentChar == " ") && !(currentChar == "-")){
		 			var xmlhttp_renameTable= new XMLHttpRequest();
			var renameTableUrl= host+'/rename_table';
			var param="profileName="+myProfName+"&newTableName="+new_tableName+"&oldTableName="+old_tableName+"";

			xmlhttp_renameTable.onreadystatechange = function() {
				if(xmlhttp_renameTable.readyState===4 & xmlhttp_renameTable.status===200){
					var response=xmlhttp_renameTable.responseText;
				// test purpose use
				// alert(response);
				if (response=="TABLE RENAMED ON THE DB,UPDATED_ON AND PROFILE TABLE"){
					alert("SUCCESSFULLY UPDATED THE TABLE");
					showTablesFromProfileBasedTable();}
				else{alert("FAILED EXCEPTION OCCURED")
			 		showTablesFromProfileBasedTable();}
			}}

	 		xmlhttp_renameTable.open("POST",renameTableUrl+"?"+param,true);
			xmlhttp_renameTable.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_renameTable.send(null);

			//CURRENT DATE TO UPDATE DATE
	 		var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();

			var today = mm + '/' + dd + '/' + yyyy;
	 		// ====
	 		var myTable=document.getElementById("table"+id).innerText;
	 		updateDateOn(myTable,today);
	 		getupdatedDate(myTable);
	 		// ===
	 		document.getElementById("saveIdProf").style.display="none";
 			document.getElementById("cancelIdProf").style.display="none";
	 		document.getElementById("editIdProf").style.display="block";
 			document.getElementById("showSelectedTableId").style.display="inline-block";
			document.getElementById("deleteIdProf").style.display="inline-block";
 			showTablesFromProfileBasedTable();
}
else{ showTablesFromProfileBasedTable();}
}

//25.
function viewSelectedTableItem(){
	if(getSelectedCheckboxIdLengthOfProfTables()>1){
	alert("Please select one checkbox at a time");
} 
else{if(getSelectedCheckboxIdLengthOfProfTables()===1){
	var id=getSelectedCheckboxIdForProfTables();
	var selectedTableName=document.getElementById("table"+id).innerText;
	document.querySelector("#myTableId").value=selectedTableName;
	findTable();}
else{alert("Select specific checkbox and click View");}}
	}


//26.
function deleteSelectedTable(){
	if(getSelectedCheckboxIdLengthOfProfTables()>1){
	alert("Please select one checkbox at a time");
} else{if(getSelectedCheckboxIdLengthOfProfTables()===1){


var x = confirm("Are you sure you want to delete this table?");
      if (x== true){
      	var id=getSelectedCheckboxIdForProfTables();
	var selectedTableName=document.getElementById("table"+id).innerText;
	var tableName=selectedTableName.toUpperCase();
	var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
	var xmlhttp_deleteTable= new XMLHttpRequest();
			var deleteTableUrl= host+'/delete_table';
			var param="profileName="+myProfName+"&tableName="+tableName+"";
			xmlhttp_deleteTable.onreadystatechange = function() {
			if(xmlhttp_deleteTable.readyState===4 & xmlhttp_deleteTable.status===200){
				var response = xmlhttp_deleteTable.responseText;
				//test purpose	
				// alert(response);
				if(response==="TABLE DELETED FROM THE DB,UPDATED_ON AND PROFILE TABLE"){
					showTablesFromProfileBasedTable();
					alert("TABLE DELETED");
				}
				else{alert("FAILED:EXCEPTION OCCURED");}
			}}
			xmlhttp_deleteTable.open("POST",deleteTableUrl+"?"+param,true);
			xmlhttp_deleteTable.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_deleteTable.send(null);
			showTablesFromProfileBasedTable();
		}
		else{showTablesFromProfileBasedTable();
}
			
      }
      else{alert("Select specific checkbox and click Delete");}
         

			
		};
	
	}



//27.
function cancelEditProf(){
			document.getElementById("editIdProf").style.display="block";
 			document.getElementById("saveIdProf").style.display="none";
 			document.getElementById("cancelIdProf").style.display="none";
			document.getElementById("showSelectedTableId").style.display="inline-block";
			document.getElementById("deleteIdProf").style.display="inline-block"; 	
			showTablesFromProfileBasedTable();	
}

// EDIT OPTIONS FOR PROFILE TABLE-END


function clearTableField(){
	document.querySelector("#myTableId").value='';
}



function goProfileSettings(){
	document.querySelector("#profileSettingsZone").style.display="block";
	document.querySelector("#bodyHideId").style.display="none";
	document.querySelector("#logInZone").style.display="none";
	document.querySelector("#logInHeaderZone").style.display="none";

}

function cancelProfSettings(){
	document.querySelector("#profileSettingsZone").style.display="none";
	document.querySelector("#bodyHideId").style.display="block";
	document.querySelector("#logInZone").style.display="none";
	document.querySelector("#logInHeaderZone").style.display="none";
	document.querySelector("#myTableId").value='';

}



function updateProfPass(){

	var xmlhttp_updatePass= new XMLHttpRequest();
			var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
			var newPass=document.querySelector("#myNewPassId").value;
			var updatePassdUrl= host+'/update_pass';
			var param="profileName="+myProfName+"&newPass="+newPass+"";
			xmlhttp_updatePass.onreadystatechange = function() {
				if(xmlhttp_updatePass.readyState===4 & xmlhttp_updatePass.status===200){
				// test purpose use
				alert(xmlhttp_updatePass.responseText);
			}}

	 		xmlhttp_updatePass.open("POST",updatePassdUrl+"?"+param,true);
			xmlhttp_updatePass.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_updatePass.send(null);
			document.querySelector("#myNewPassId").value='';
			cancelProfSettings();


}

function logout(){
	document.querySelector("#bodyHideId").style.display="none";
	document.querySelector("#logInZone").style.display="block";
	document.querySelector("#logInHeaderZone").style.display="block";

}



	function getCurrentDay(){
		const today = new Date()
		var date = String(today.getDate()).padStart(2, '0');
		var year = today.getFullYear();
		var monthName=today.toLocaleString('default', { month: 'long' });
		var DayName=today.toLocaleDateString('default', { weekday: 'long' });

		var dateIs= DayName+', '+date+' '+monthName+','+year;
		// alert(dateIs);
		document.querySelector("#currentDayId").innerHTML=dateIs;
}

















