const $ = require('jquery');

$("#myRange").on('input', function() {
   const slider = $("#myRange");
   var styleFileNo = slider.val();
   if(styleFileNo==2){
      $("#currentStyle").attr("href", "dist/styles/style-two.css")
   }
   else if(styleFileNo==3){
      $("#currentStyle").attr("href", "dist/styles/style-three.css")
   }
   else{
      $("#currentStyle").attr("href", "dist/styles/style-one.css")
   }
})