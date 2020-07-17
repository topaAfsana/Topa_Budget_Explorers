var Cost;
var Income=0;
var Saving;
var Allocation=0;
var CurrentResidue;



	 	function calculateIncome() {
	 var IncomeSource=document.querySelector("#incomeSourceId").value;
	 var salary= document.querySelector("#salaryId").value;

 	 if (IncomeSource == "") {
	 	alert ("Please enter Balance source");
        return false;
    }


	 	 if (salary == "") {
	 	alert ("Please enter Credit amount");
        return false;
    }

      if (isNaN(salary)) 
    {
        alert("Credit amount must be numbers");
        return false;
    }


	 var table=document.getElementsByTagName('table')[0];
	 var newCostRow=table.insertRow(1);
	 var newCell1=newCostRow.insertCell(0);
	 var newCell2=newCostRow.insertCell(1);

	 newCell1.innerHTML= IncomeSource.toUpperCase();
	 newCell2.innerHTML= salary;

	 var incomeArray=[salary];

	 document.getElementById('incomeSourceId').value= '';
	 document.getElementById('salaryId').value= '';


	 for (var i = 0; i<incomeArray.length; i++) {
	 	console.log(`My Current item values are ${incomeArray.toString()}`);

	 	var calcSalaryCell=document.getElementById("incomeTable"), sumSalaryValue=0; afterNewIncome=CurrentResidue;

	 	for (var i = 1; i <calcSalaryCell.rows.length; i++) {
	 		sumSalaryValue=sumSalaryValue+ parseInt(calcSalaryCell.rows[i].cells[1].innerHTML);
 

	 	document.querySelector("#displayIncomeResultId1").innerHTML= `Total Assets: ${sumSalaryValue}`;
	 	    document.querySelector("#displayIncomeResultId2").innerHTML= `Total Assets: ${sumSalaryValue}`;
	 	

	 	console.log(`Total is ${sumSalaryValue}`)
	 	 Income = sumSalaryValue;
	 	  console.log(`Total income is ${Income}`)
	 	}}}



