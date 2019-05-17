//Filename : simulation.js
//Crator : Bergmann Florian
//Last update : 16.05.2019

//use strict//

//event when button play/pause is clicked
document.getElementById("playpause").addEventListener("click", function(e){
	e.target.classList.toggle("pause");
	e.target.classList.toggle("play");
	if(run == true)run = false; else run = true;
	console.log(run);
});