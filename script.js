////////////////////////////////////////////////////////////////////// VUE SCRIPTS ////////////////////////////////////////////////////////









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


///////////////////////////////////////////////////////////////////////////////////                      /Buttons
const submitCalc = document.querySelector("#submitCalc");
const resetCalc = document.querySelector("#resetCalc");




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


let rentAmount = 0;


let calcRent = function() {
	rentAmount = 0;
	$("input.unique").map(function() {
		if ($(this).val() === "") {
			alert("Please complete all rent fields")
		} else {
		rentAmount += parseInt($(this).val(), 10);
		}
	});
 };
let updateRentUI = function() {
$("#totalRent").html(rentAmount);
}
 ////////////////////////////////////////////////////////////////////////////////////                   end rentAmount function


// Start focusout function    //////////////////////////////////////////////////////////////////////////////////// 



 ////////////////////////////////////////////////////////////////////////////////////                   end focusout function



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

//use toFixed(2) to set the precision of the mPayment. Use it on an int.
function getValues()
{
  purchasePrice = document.querySelector("#purchasePrice").value;
  downPayment = document.querySelector("#downPayment").value/100;
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

};

function updateUI()
{
	document.querySelector("#cashFlowLabel").innerHTML = "$" + cashFlow.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
	//document.querySelector("#totalIncome").innerHTML = "$" + income;
}





////////////////////////////////////////////////////////////////////////////////////                       END CashFlow Calculator