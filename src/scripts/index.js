const $ = require('jquery');

function displayResult(num){
   let stringValue =`${num}`
   let arrayValue = stringValue.split("")
   
   if(arrayValue.length >= 12){
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


$(".num-button").on("click", function(){
   let previousStringNumber = $(".result-paragraph").text()
   let arrayValue = previousStringNumber.split("")
   let newStringNumber = this.innerText
   
   if(arrayValue.length < 12 ){
      arrayValue.push(newStringNumber)
      let stringValue = arrayValue.join("")
      $(".result-paragraph").text(stringValue)
   }
})


$(".delete-button").on("click", function(){
   let number = $(".result-paragraph").text()
   let arrayValue = number.split("")
   arrayValue.pop()
   let stringValue = arrayValue.join("")
   $(".result-paragraph").text(stringValue)
   
   if(arrayValue[0] === undefined){
      localStorage.clear()
   }
})


$("#btnDecimal").on("click", function(){
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
})


$(".reset-button").on("click", function(){
   $(".result-paragraph").text('')
   localStorage.clear();
})


$(".operation-button").on("click", function(){
   let displayValue = $(".result-paragraph").text();
   let arrayValue = displayValue.split("")
   let filteredValue = arrayValue.filter(words => words != ",");
   let currentOperand = filteredValue.join("")
   let currentOperation = this.innerText
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
})


$("#btnEqual").on("click", function(){
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
})
window.onbeforeunload = function (e) {
   localStorage.clear();
};