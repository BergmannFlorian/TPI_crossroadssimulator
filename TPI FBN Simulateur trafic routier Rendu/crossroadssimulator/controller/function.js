//Filename : function.js
//Crator : Bergmann Florian
//Last update : 04.06.2019

"use strict";

//function to build new html element
function buildElement(type, CSSClassName, parent){
    //creation of the element
    var elem = document.createElement(type);
    //define class of element
    elem.setAttribute("class", CSSClassName);
    //add element at the end of parent give
    parent.appendChild(elem);
    return elem;
}
//function to add one ligne of modify number of car by road
function addOptionNbCar(){
	//get div content all option to car number
	var div = buildElement("div", "divOptionNbrCar", document.getElementById("divOptionLsNbrCar"));
	//build label for number of car
	var label = buildElement("label", "lblNbCar", div);
	label.textContent = "Route "+(document.getElementsByClassName("divOptionNbrCar").length)+" : ";
	//add image for less car
	var imgLess = buildElement("img", "imgLessCar", div);
	imgLess.src = "./asset/images/less.png";
	//add number of car
	var number = buildElement("p", "pNumberCar", div);
	number.textContent = _minCarByRoad;
	//add image for more car
	var imgMore = buildElement("img", "imgMoreCar", div);
	imgMore.src = "./asset/images/more.png";
	
	//event for add a car in option car number
	imgLess.addEventListener("click", function(e){
		//get number of car corresponding of image cliqued
		var nbCar = parseInt(e.target.nextElementSibling.textContent);
		if(nbCar > _minCarByRoad)e.target.nextElementSibling.textContent = nbCar-1;
	});
	
	//event for add a car in option car number
	imgMore.addEventListener("click", function(e){
		//get number of car corresponding of image cliqued
		var nbCar = parseInt(e.target.previousElementSibling.textContent);
		if(nbCar < _maxCarByRoad)e.target.previousElementSibling.textContent = nbCar+1;
	});
}
//function to remove last option car number of the list
function removeLastOptionNbCar(){
	var optNbCar = document.getElementsByClassName("divOptionNbrCar");
	optNbCar[optNbCar.length - 1].remove();
}
//function to get a rondome value in INT between max and min
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}