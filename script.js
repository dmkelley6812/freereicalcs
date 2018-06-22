
// ///////////////////////////////////////////////////////////////////////////////////         Mortgage Calc Declarations
let purchasePrice;
let downPayment;
let apr;
let term;
let mortgageAmount;
let monthlyPayment;
const submitMortgage = document.querySelector("#submitMortgage");
const resetMortgage = document.querySelector("#resetMortgage");

////////////////////////////////////////////////////////////////////////////////////             Calculator Declarations
let rent;
let rentAmount;
let income;
let taxes;
let insurance;
let utilities;
let maintenance;
let vacancy;
let management;
let grossIncome;
let expenses;
let cashFlow;
let cashFlowLabel;
let totalIncome;
let noi;
let coc;
let capRate;
let numberOfUnits;

///////////////////////////////////////////////////////////////////////////////////                      /Buttons
// const submitCalc = document.querySelector("#submitCalc");
// const resetCalc = document.querySelector("#resetCalc");




// Start addUnit function  (JQuery) ///////////////////////////////////////////////////////////////////////////////// 
$(document).ready(function() {
 
$("#rentDiv").focusout(function(){
 	calcRent();
 	updateRentUI();


 })
	
 	$("#addUnit").click(function(){ 	
          let duplicate = $(".copy-fields").html();
           $(duplicate).removeClass("hide");
		  $(".list").append(duplicate);

			$(".list > li").find(".hide").removeClass("hide");
			$(".list").focus();
		//prevents page from reloading after addUnit is clicked
		  event.preventDefault();

	  $("body").on("click",".remove",function(){ 
		$(this).parents(".control-group").remove();		
	  });
	});
});	

 //////////////////////////////////////////////////////////////////////////////////// end addUnit function ////////////////////////


// Start deleteUnit function  (JQuery) ///////////////////////////////////////////////////////////////////////////////// 


$('#rentDiv').on('click', '.closeButton', function(){
	// rentAmount = rentAmount - parseInt($('.closeButton').parents().eq(1).find(".unique").val(), 10);
	// console.log(rentAmount);
  $(this).closest('li').remove()
  calcRent();
  updateRentUI();
});

 //////////////////////////////////////////////////////////////////////////////////// end deleteUnit function ////////////////////////
 

 // Start rentAmount function    //////////////////////////////////////////////////////////////////////////////////// 





let calcRent = function() {
	rentAmount = 0;
	$("input.unique").map(function(index) {
		if ($(this).val() === "") {
			$(this).addClass("is-invalid")
			$("#addUnit").addClass("disabled");
			document.querySelector("#addUnit").disabled = true;
		} else if ($(this).val() != ""){
			$(this).removeClass("is-invalid");
			$("#addUnit").removeClass("disabled");
			document.querySelector("#addUnit").disabled = false;
		rentAmount += parseInt($(this).val(), 10);
		numberOfUnits = index+1;
		}
	});
 };

let updateRentUI = function() {
$("#totalRent").html("$" + rentAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
}
 ////////////////////////////////////////////////////////////////////////////////////                   end rentAmount function


 ////////////////////////////////////////////////////////////////////////////////////                 Mortgage Calculator Function
monthlyPayment = document.querySelector("#monthlyPayment");
mortgageAmount = document.querySelector("#mortgageAmount");

window.onload = function()
{
  
  document.querySelector("#submitMortgage").onclick = getValues;
  document.querySelector("#resetMortgage").onclick = clearValues;
  document.querySelector("#submitCalculator").onclick = calculateCashFlow;
  document.querySelector("#resetCalculator").onclick = resetCalculator;
};


// function resetCalculator() {
// 	income = 0;
// 	taxes = 0;
// 	taxes.value = 0;
// 	insurance = 0;
// 	insurance.value = 0;
// 	utilities = 0;
// 	utilities.value = 0;
// 	vacancy = 0;
// 	vacancy.value = 0;
// 	maintenance = 0;
// 	maintenance.value = 0;
// 	management = 0;
// 	management.value = 0;
// 	expenses = 0;
// 	cashFlow = 0;
// 	updateUI();
// 	updateRentUI();
// }	
//use toFixed(2) to set the precision of the mPayment. Use it on an int.
function getValues()
{
  purchasePrice = document.querySelector("#purchasePrice").value;
  downPayment = document.querySelector("#downPayment").value/100;
  downPaymentAmount = downPayment*purchasePrice;
  term = document.querySelector("#term").value;
  apr = document.querySelector("#apr").value;
  mortgageAmount = purchasePrice -(purchasePrice*downPayment);
  apr /= 1200;
  term *= 12;
  monthlyPayment = calculatePayment();
  document.querySelector("#monthlyPayment").innerHTML = "$" + monthlyPayment.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  document.querySelector("#mortgageAmount").innerHTML = "$" + mortgageAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
};

function calculatePayment()
{
	 monthlyPayment = mortgageAmount*(apr * Math.pow((1 + apr), term))/(Math.pow((1 + apr), term) - 1);
	return monthlyPayment;
}

function clearValues() {
	monthlyPayment = 0;
	mortgageAmount = 0;
	document.querySelector("#monthlyPayment").innerHTML = "";
	document.querySelector("#mortgageAmount").innerHTML = "";

}


////////////////////////////////////////////////////////////////////////////////////                       END mortgage Calculator



////////////////////////////////////////////////////////////////////////////////////                       START CashFlow Calculator

function calculateCashFlow()	{
	income = rentAmount;
	taxes = parseInt(document.querySelector("#taxes").value, 10)/12;
	insurance = parseInt(document.querySelector("#insurance").value, 10)/12;
	utilities = parseInt(document.querySelector("#utilities").value, 10)/12;
	vacancy = parseInt((document.querySelector("#vacancy").value/100)*income, 10)
	maintenance = parseInt((document.querySelector("#maintenance").value/100)*income, 10);
	management = parseInt((document.querySelector("#management").value/100)*income, 10)
	expenses = taxes+insurance+utilities+vacancy+maintenance+management+monthlyPayment;
	cashFlow = income-expenses;
	updateUI();
	document.querySelector("#output").classList.remove("hide");
	window.location.hash = '#output';

};

function updateUI()
{
	noi = rentAmount-vacancy-utilities-insurance-taxes-maintenance-management;
	coc = ((cashFlow*12)/downPaymentAmount)*100;
	capRate = ((noi*12)/purchasePrice)*100;

	document.querySelector("#monthly-cashflow").innerHTML = "  " + "$" + cashFlow.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	document.querySelector("#yearly-cashflow").innerHTML = "  " + " $" + (cashFlow*12).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	document.querySelector("#gross-monthly-income").innerHTML = "  " + " $" + (rentAmount).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	document.querySelector("#gross-yearly-income").innerHTML = "  " + " $" + (rentAmount*12).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	document.querySelector("#net-operating-income").innerHTML = "  " + " $" + (noi).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	document.querySelector("#net-yearly-operating-income").innerHTML = "  " + " $" + (noi*12).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});

	document.querySelector("#total-monthly-expenses").innerHTML = "  " + " $" + (expenses).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	document.querySelector("#total-yearly-expenses").innerHTML = "  " + " $" + (expenses*12).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	document.querySelector("#cash-on-cash").innerHTML = "  " + (coc).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " %";
	document.querySelector("#capitalization").innerHTML = "  " + (capRate).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + " %";

}





////////////////////////////////////////////////////////////////////////////////////                       END CashFlow Calculator