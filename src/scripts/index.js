const $ = require('jquery');

function displayResult(num){
   let stringValue =`${num}`
   let arrayValue = stringValue.split("")
   
   if(arrayValue.length >= 11){
      let parsedNum = parseFloat(num)
      let result = parsedNum.toExponential(6)
      $(".result-paragraph").text(`${result}`)
   }
   else{
      let parsedNum = parseFloat(num)
      let displayResult = parsedNum.toLocaleString()
      $(".result-paragraph").text(displayResult)
   }
}

function pushValue(value){
   let previousStringNumber = $(".result-paragraph").text()
   let arrayValue = previousStringNumber.split("")
   
   if(arrayValue.length < 11 ){
      arrayValue.push(value)
      let stringValue = arrayValue.join("")
      $(".result-paragraph").text(stringValue)
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
   arrayValue.pop()
   let stringValue = arrayValue.join("")
   $(".result-paragraph").text(stringValue)
   
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
   else if(currentOperand=="" && currentOperation!=""){
      let previousOperand = localStorage.getItem("previousOperand")

      if(currentOperation==="+" || currentOperation==="-"){
         localStorage.setItem("previousOperand", "0")
         localStorage.setItem("previousOperation", currentOperation)
      }
      else{
         localStorage.setItem("previousOperand", "1")
         localStorage.setItem("previousOperation", currentOperation)
      }
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
      displayResult(result)
   }
   else if(operation==="-"){
      result = previousNumber - currentNumber
      displayResult(result)
   }
   else if(operation==="/"){
      result = previousNumber / currentNumber
      displayResult(result)
   }
   else if(operation==="x"){
      result = previousNumber * currentNumber
      displayResult(result)
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