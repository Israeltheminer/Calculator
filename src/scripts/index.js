const $ = require('jquery');


// Function to either display either the exponential or the local string of the argument
function displayResult(value){
   var floatValue = parseFloat(value)
   let stringValue =`${floatValue}`
   let arrayValue = stringValue.split("")
   
   if(arrayValue.length >= 11){
      let exponentialResult = floatValue.toExponential(6)
      $(".result-paragraph").text(`${exponentialResult}`)
   }
   else{
      let localeResult = floatValue.toLocaleString()
      if(localeResult==="NaN"){
         $(".result-paragraph").text(``)
      }
      else{
         $(".result-paragraph").text(`${localeResult}`)
      }
   }
}


// Function to either display either the exponential or the local string of the argument
function displayResultAfterDecimal(value){
   var floatValue = parseFloat(value)
   var intergerValue = parseInt(value)
   let arrayValue = value.split("")
   let decimalArray = value.split(".")
   var decimal =  decimalArray[1]
   console.log(decimal)

   if(arrayValue.length >= 11){
      let exponentialResult = floatValue.toExponential(6)
      $(".result-paragraph").text(`${exponentialResult}`)
   }
   else{
      let localeResult = intergerValue.toLocaleString()
      $(".result-paragraph").text(`${localeResult}.${decimal}`)
   }
}


// Function to fetch a result when the answer the equal function is called
function fetchResult(num, previousValue){

   if(isNaN(num)){
      displayResult(previousValue)
   }
   else{
      displayResult(num)
   }
}


function pushValue(value){
   let previousStringNumber = $(".result-paragraph").text()
   let arrayValue = previousStringNumber.split("")
   arrayValue.push(value)
   let filteredValue = arrayValue.filter(items => items != ",");
   let stringValue = filteredValue.join("")
   let isDecimal = arrayValue.includes(".")
   
   if(filteredValue.length <= 11){
      if(isDecimal){
         displayResultAfterDecimal(stringValue)
      }
      else{
         displayResult(stringValue)
      }
   }
}

function pushDecimal(){
   let number = $(".result-paragraph").text()
   let arrayValue = number.split("")
   let pushDeterminant = arrayValue.includes(".")
   if(pushDeterminant){
      let stringValue = arrayValue.join("")
      $(".result-paragraph").text(stringValue)
   }
   else{
      arrayValue.push(".")
      let stringValue = arrayValue.join("")
      $(".result-paragraph").text(stringValue)
   }
}

function popValue(){
   let number = $(".result-paragraph").text()
   let arrayValue = number.split("")
   let filteredValue = arrayValue.filter(items => items != ",");
   filteredValue.pop()
   let stringValue = filteredValue.join("")

   displayResult(stringValue)

   if(arrayValue[0] === undefined){
      localStorage.clear()
   }
}

function addOperation(operation){
   let currentOperation = operation
   let displayValue = $(".result-paragraph").text();
   let arrayValue = displayValue.split("")
   let filteredValue = arrayValue.filter(words => words != ",");
   let currentOperand = filteredValue.join("")
   let previousOperation = localStorage.getItem("previousOperation")
   let previousOperand = localStorage.getItem("previousOperand")

   if(currentOperand!="" && previousOperand!="" && previousOperation!=""){
      let previousOperand = localStorage.getItem("previousOperand")
      let currentNumber = parseFloat(currentOperand)
      let previousNumber = parseFloat(previousOperand)
      let result ;
      localStorage.setItem("previousOperand", currentOperand)
      localStorage.setItem("previousOperation", currentOperation)

      if(previousOperation==="+"){
         result = previousNumber + currentNumber
         localStorage.setItem("previousOperand", result)
      }
      else if(previousOperation==="-"){
         result = previousNumber - currentNumber
         localStorage.setItem("previousOperand", result)
      }
      else if(previousOperation==="/"){
         result = previousNumber / currentNumber
         localStorage.setItem("previousOperand", result)
      }
      else if(previousOperation==="x"){
         result = previousNumber * currentNumber
         localStorage.setItem("previousOperand", result)
      }
   }
   else if(currentOperand=="" && previousOperand===null && previousOperation===null){
      
      if(currentOperation==="+" || currentOperation==="-"){
         localStorage.setItem("previousOperand", "0")
         localStorage.setItem("previousOperation", currentOperation)
      }
      else{
         localStorage.setItem("previousOperand", "1")
         localStorage.setItem("previousOperation", currentOperation)
      }
   }
   else if(arrayValue[0]===undefined && currentOperation!="" && previousOperand!=undefined){
      localStorage.setItem("previousOperation", currentOperation)
   }
   else{
      localStorage.setItem("previousOperand", currentOperand)
      localStorage.setItem("previousOperation", currentOperation)
   }
   $(".result-paragraph").text('')
}

function getAnswer(){
   let currentOperand = $(".result-paragraph").text()
   let operation = localStorage.getItem("previousOperation")
   let previousOperand = localStorage.getItem("previousOperand")
   let currentNumber = parseFloat(currentOperand)
   let previousNumber = parseFloat(previousOperand)
   let result ;

   if(operation==="+"){
      result = previousNumber + currentNumber
      fetchResult(result, previousOperand)
   }
   else if(operation==="-"){
      result = previousNumber - currentNumber
      fetchResult(result, previousOperand)
   }
   else if(operation==="/"){
      result = previousNumber / currentNumber
      fetchResult(result, previousOperand)
   }
   else if(operation==="x"){
      result = previousNumber * currentNumber
      fetchResult(result, previousOperand)
   }
   localStorage.clear();
}


// Display value of numbered button on button click
$(".num-button").on("click", function(){
   let newStringNumber = this.innerText
   pushValue(newStringNumber)
})

// Display value of numbered key on keyboard click
$("body").on("keyup", function(e){
   let value = e.key

   if(!isNaN(value)){
      pushValue(value)
   }
})


// Delete value from display on button click
$(".delete-button").on("click", function(){
   popValue()
})

// Delete value from display on backspace keyup
$("body").on("keyup", function(e){
   let value = e.key

   if(value==="Backspace"){
      popValue()
   }
})


// Add decimal to display on button click
$("#btnDecimal").on("click", function(){
   pushDecimal()
})

// Add decimal to display on "." keyup
$("body").on("keyup", function(e){
   let value = e.key

   if(value==="."){
      pushDecimal()
   }
})


// Reset display and clear local storage values
$(".reset-button").on("click", function(){
   $(".result-paragraph").text('')
   localStorage.clear();
})


// Add operation on opertion button click
$(".operation-button").on("click", function(){
   let currentOperation = this.innerText
   addOperation(currentOperation)
})


// Add operation on operational key keyup
$("body").on("keyup", function(e){
   let value = e.key

   if(value==="+" || value==="-" || value==="/" || value==="*"){
      addOperation(value)
   }
})


// Get answer on equal button click
$("#btnEqual").on("click", function(){
   getAnswer()   
})

// Get answer on enter key keyup
$("body").on("keyup", function(e){
   let value = e.key
   
   if(value==="=" || value==="Enter"){
      getAnswer()
   }
})


// Clears local storage on window refresh
window.onbeforeunload = function (e) {
   localStorage.clear();
};