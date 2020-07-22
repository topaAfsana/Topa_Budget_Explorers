var tbltop=`<table class="dbTable">
				<tr><th>Item#</th><th>Date</th><th>Title</th><th>Amount</th></tr>`;
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
				main += "<tr><td>"+records[i].id+"</td><td>"+records[i].date+"</td><td>"+records[i].title+"</td><td>"+records[i].amount+"</td></tr>";
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




// 12.
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

// 13.DONE
function createProfile(){
	var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
	var myPass=document.querySelector("#myPassId").value;

					if (myProfName == "") {
	 					alert ("Please enter Profile name");
        				return false; }
        		 	if (myPass == "") {
	 					alert ("Please enter Password");
        				return false;
    							}	
	 

			var xmlhttp_createProf= new XMLHttpRequest();

			var createProfileTableUrl= host+'/create_profile';

			var param="profileName="+myProfName+"&pass="+myPass+"";
			
			xmlhttp_createProf.onreadystatechange = function() {
			if(xmlhttp_createProf.readyState===4 & xmlhttp_createProf.status===200){
				var response = xmlhttp_createProf.responseText;	
				alert(response);
			}}
			xmlhttp_createProf.open("POST",createProfileTableUrl+"?"+param,true);
			xmlhttp_createProf.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_createProf.send(null);
}


//14.//VALIDATE WAY 1
function validateProfile(){
	var myProfName=document.querySelector("#myProfileId").value.toUpperCase();
	var myPass=document.querySelector("#myPassId").value;
	
var globalHoldProf=myProfName;


					if (myProfName == "") {
	 					alert ("Please enter Profile name");
        				return false; }
        		 	if (myPass == "") {
	 					alert ("Please enter Password");
        				return false;
    							}	    				
        		
        	var xmlhttp_validateProfile= new XMLHttpRequest();
			var validateProfileUrl= host+'/authenticate_profile';

			var param="profileName="+myProfName+"&pass="+myPass+"";

			xmlhttp_validateProfile.onreadystatechange = function() {
				if(xmlhttp_validateProfile.readyState===4 & xmlhttp_validateProfile.status===200){
				
				var response=xmlhttp_validateProfile.responseText;

				alert(response);
				// ====
			var xmlhttp_holdProfile= new XMLHttpRequest();
			var holdProfileUrl= host+'/hold_profile';

			var param="profileName="+myProfName+"";

			xmlhttp_holdProfile.onreadystatechange = function() {
				if(xmlhttp_holdProfile.readyState===4 & xmlhttp_holdProfile.status===200){
				
				var Hresponse=xmlhttp_holdProfile.responseText;
				globalHoldProf=Hresponse;

				alert("HRESPONSE "+Hresponse);
				// return Hresponse;
				

							}}

	 		xmlhttp_holdProfile.open("GET",holdProfileUrl+"?"+param,true);
			xmlhttp_holdProfile.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_holdProfile.send(null);

					// ====
				if(response==="PROFILE FOUND"){
				document.getElementById("expense").click();
				alert("WELCOME TO EXPENSE PAGE");

				alert("GLOBAL RESPONSE PROF "+globalHoldProf);

				alert("BUTTON VAL"+document.querySelector("#userId").value);

				

				// document.querySelector("#userId").innerHTML=myProfName;
				// // document.querySelector("#userId").value="TESTER ME";
				// document.querySelector("#userId").innerHTML=globalHoldProf;


					// alert(holdprofile(myProfName));

					


			}
				else{alert("Unable to Log in,Please Register First to Log in");}
			}}

	 		xmlhttp_validateProfile.open("GET",validateProfileUrl+"?"+param,true);
			xmlhttp_validateProfile.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_validateProfile.send(null);
			
				document.querySelector("#userId").innerHTML=myProfName;
				document.querySelector("#userId").innerHTML=globalHoldProf;


}



function checkProfile(prof){
	prof=localStorage.getItem("storageProf");
	console.log(prof);
	alert(prof);

	console.log("MY PROFILE"+prof);
	document.querySelector("#userId").innerHTML="MY PROFILE "+ prof;
}

function holdprofile(myProfName){
	// var myProfName=document.querySelector("#myProfileId").value.toUpperCase();

				
        		
        	var xmlhttp_holdProfile= new XMLHttpRequest();
			var holdProfileUrl= host+'/hold_profile';

			var param="profileName="+myProfName+"";

			xmlhttp_holdProfile.onreadystatechange = function() {
				if(xmlhttp_holdProfile.readyState===4 & xmlhttp_holdProfile.status===200){
				
				var response=xmlhttp_holdProfile.responseText;

				// alert(response);
				return response;
							}}

	 		xmlhttp_holdProfile.open("GET",holdProfileUrl+"?"+param,true);
			xmlhttp_holdProfile.setRequestHeader('Content-Type', 'application/json');
			xmlhttp_holdProfile.send(null);
}

































// VALIDATE ====WAY 2


//A.

// $(function(){

// 	$("#logInBtnId").click(function(){
// 		$("#logInBtnId").hide();
// 		$("#logInloadId").innerHTML("LOADING");

// 		var profilename= $("#myProfileId").val();
// 		var password= $("#myPassId").val();

// 		$.post("login.php",{profilename: profilename,password:password})
// 		.done(function( data ) {
// 			window.location= "expense/expense_mode.html";}
// 			else {
// 				$("#logInBtnId").text("LOG IN FAILED");
// 				$("#logInBtnId").show();}

// 		)});
	
// });



//B.

// //1
// $(document).ready(function(){


// //2
// 	$("#logInBtnId").click(function(){
// 		// $("#logInBtnId").hide();
// 		// $("#logInloadId").innerHTML("LOADING");
// 		var profilename= $("#myProfileId").val();
// 		var password= $("#myPassId").val();
// $.post("login.php",{profilename: profilename,password:password})
// // 3
// .done(function( data ) {
// 	window.location= "expense/expense_mode.html";

// 	// 3
// });
// // 3

// // else{$("#logInBtnId").text("LOG IN FAILED");
// // 				$("#logInBtnId").show();}



// //2
// 	});
// 	//2
// //1	
// });
// //1



//C.
// function logIn(){

// 	var profilename= document.getElementById("myProfileId").value;
// 	var profilename= document.getElementById("myPassId").value;
		
// $.post("../login.php",{profilename: profilename,password:password})
// // 3
// .done(function( data ) {
// 	window.location= "expense_mode.html";});


// }







