//Filename : function.js
//Crator : Bergmann Florian
//Last update : 16.05.2019

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
	var div = buildElement("div", "divOptionNbrCar", document.getElementById("divOptionLsNbrCar"));
	var label = buildElement("label", "lblNbCar", div);
	label.textContent = "Route "+(document.getElementsByClassName("divOptionNbrCar").length)+" : ";
	var imgLess = buildElement("img", "imgLessCar", div);
	imgLess.src = "./asset/images/less.png";
	var number = buildElement("p", "pNumberCar", div);
	number.textContent = _minCarByRoad;
	var imgMore = buildElement("img", "imgMoreCar", div);
	imgMore.src = "./asset/images/more.png";
	
	imgLess.addEventListener("click", function(e){
		//get number of car corresponding of image cliqued
		var nbCar = parseInt(e.target.nextElementSibling.textContent);
		if(nbCar > _minCarByRoad)e.target.nextElementSibling.textContent = nbCar-1;
	});
	
	imgMore.addEventListener("click", function(e){
		//get number of car corresponding of image cliqued
		var nbCar = parseInt(e.target.previousElementSibling.textContent);
		if(nbCar < _maxCarByRoad)e.target.previousElementSibling.textContent = nbCar+1;
	});
}

function removeLastOptionNbCar(){
	var optNbCar = document.getElementsByClassName("divOptionNbrCar");
	console.log(optNbCar);
	optNbCar[optNbCar.length - 1].remove();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}