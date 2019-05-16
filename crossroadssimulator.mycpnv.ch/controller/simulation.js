//Filename : simulation.js
//Crator : Bergmann Florian
//Last update : 16.05.2019

//use strict//

//event when button play/pause is clicked
document.getElementById("playpause").addEventListener("click", function(e){
	console.log(e.target);
	e.target.classList.toggle("pause");
	e.target.classList.toggle("play");
});