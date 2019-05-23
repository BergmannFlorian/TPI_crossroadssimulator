//Filename : simulation.js
//Crator : Bergmann Florian
//Last update : 22.05.2019

"use strict";

var Simulation = function(){
    var _this = this;
    this.e = {};

	//method to build simulation
	this.buildSimulation = function(crossroadId, roads, speed){
		//build crossroad part
		_this.e.divSimulation = document.getElementById("divSimulation");
		_this.e.contentSimulation = buildElement("div", "contentSimulation", _this.e.divSimulation);
		_this.e.contentSimulation.id = "contentSimulation";

		_this.crossroad = new Crossroad();
		_this.crossroad.buildCrossroad(_this.e.contentSimulation, crossroadId, roads);
		
		//build car part
		_this.crossroad.createAllVehicles(_this.e.contentSimulation, speed);
		_this.crossroad.placeAllVehicles();
		
		//build result part
		//to do in sprint 7
	}
	
	//method to run simulation
	this.runSimulation = function(){
		//to do in sprint 7
	}
}