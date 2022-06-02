const $ = require('jquery');


$(".num-button").on("click", function(){
   let number = $(".result-paragraph").text()
   
   let arrayValue = number.split("")
   let newNumber = this.innerText
   arrayValue.push(newNumber)
   let stringValue = arrayValue.join("")
   
   $(".result-paragraph").text(stringValue)
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
   let currentOperand = $(".result-paragraph").text()
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
      $(".result-paragraph").text(`${result}`)
   }
   else if(operation==="-"){
      result = previousNumber - currentNumber
      $(".result-paragraph").text(`${result}`)
   }
   else if(operation==="/"){
      result = previousNumber / currentNumber
      $(".result-paragraph").text(`${result}`)
   }
   else if(operation==="x"){
      result = previousNumber * currentNumber
      $(".result-paragraph").text(`${result}`)
   }
   localStorage.clear();
})