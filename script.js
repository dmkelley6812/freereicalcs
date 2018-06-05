document.getElementById("rent").focus();
//vars

	var addUnit = document.getElementById("addUnit");
	//var rent = document.getElementsByClassName("rent")[0];
	var taxes = document.getElementById("taxes");
	var insurance = document.getElementById("insurance");
	var utilities = document.getElementById("utilities");
	var maintenance = document.getElementById("maintenance");
	var vacancy = document.getElementById("vacancy");
	var mortgage = mPmt;
	var cashflowLabel = document.getElementById("cashflowLabel");
//Stores cashflow dollar amount
	var cashflow = income-expense;
//Calculate cashflow button
	var button = document.getElementById("calculate");
	var reset = document.getElementById("reset");
	var income = 0;
	var expense = taxes + insurance + utilities + vacancy + maintenance + mortgage;
  	var addUnit = document.getElementById("addUnit");

//Function used to calculate cashflow//
	
	 	var calculateCashflow = function() {

		
			rent = document.getElementsByClassName("rent");
			for(var i=0; i < rent.length; i++){
				income += parseInt(rent[i].value);
				}
				
				console.log(income);
			
	 	

	 //expense = ((parseInt(taxes.value, 10)+parseInt(insurance.value, 10)+parseInt(utilities.value, 10)+parseInt(vacancy.value, 10)+parseInt(maintenance.value, 10))/12);
	 rent = document.getElementsByClassName("rent");
	 taxes = parseInt(document.getElementById("taxes").value, 10)/12;
	 insurance = parseInt(document.getElementById("insurance").value, 10)/12;
	 utilities = parseInt(document.getElementById("utilities").value, 10)/12;
	 maintenance = (parseInt(document.getElementById("maintenance").value, 10)/100)*income;
	 vacancy = (parseInt(document.getElementById("vacancy").value, 10)/100)*income;
	 mortgage = mPmt;
	 expense = vacancy+maintenance+utilities+insurance+taxes+mortgage;
	 cashflow = (income-expense).toFixed(2);
	cashflowLabel.focus();
}

//Calculates cashflow using all inputs//
	button.onclick = function() {
	calculateCashflow();
		cashflowLabel.innerHTML = "$" + cashflow;
	console.log("income is " + income);
	console.log("expense is " + expense);
	console.log("utilities are " + utilities)
	console.log("taxes are " + taxes);
	console.log("insurance is " + insurance);
	console.log("maintenance is " + maintenance);
	console.log("vacancy is " + vacancy);
	console.log("mortgage is " + mortgage);
	console.log("cashflow is " + cashflow);
	cashflowLabel.focus();
}

	

	reset.onclick = function() {
		console.log("reset clicked");
		document.getElementById("taxes").value = "";
		document.getElementById("insurance").value = "";
		document.getElementById("utilities").value = "";
		document.getElementById("maintenance").value = "";
		document.getElementById("vacancy").value = "";
		document.getElementsByClassName("rent").value = "";
		resetLoanAmount();

	}

	
  
	var rentForm = document.getElementById("rentForm");
	

  addUnit.onclick = function() {
    console.log("Add unit clicked");
  	var newDiv = document.getElementById('newDiv');
    console.log("New Blank Div created");
	var newInput = document.createElement('div');
    console.log("newInput created");
  
	// Get template data
	newInput.innerHTML = rentForm.innerHTML; 
  	newDiv.appendChild(newInput);
    console.log("newDiv innerhtml created");
    console.log("newDiv appended to newLink");
    console.log(newDiv.innerHTML);


 
  }


	

// MORTGAGE CALCULATOR

var term;
var apr;
var amt;
var mPmt;
var pp;
var down;


window.onload = function()
{
  
  document.getElementById("sbt").onclick = getValues;
};

//use toFixed(2) to set the precision of the mPayment. Use it on an int.
function getValues()
{
  pp = document.getElementById("pp").value;
  	console.log("purchase price: " + pp);
  down = document.getElementById("down").value/100;
  	console.log("down payment " + down);
  term = document.getElementById("trm").value;
  apr = document.getElementById("apr").value;
  amt = pp -(pp*down);
   console.log("amount " + amt);
  apr /= 1200;
  term *= 12;
  mPmt = calculatePayment();
  document.getElementById("pmt").innerHTML = "$" + mPmt.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.getElementById("loan").innerHTML = "$" + amt.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
};

function calculatePayment()
{
	var payment = amt*(apr * Math.pow((1 + apr), term))/(Math.pow((1 + apr), term) - 1);
	return payment;
}

var resetLoanAmount = function() {
	document.getElementById("pmt").innerHTML = "";
  document.getElementById("loan").innerHTML = "";
  rent = document.getElementsByClassName("rent");
  income = 0;
			for(var i=0; i < rent.length; i++){
				income += parseInt(rent[i].value);
				}
				console.log(income);


}


	document.getElementById("rst").onclick = resetLoanAmount;
// END MORTGAGE CALCULATOR






