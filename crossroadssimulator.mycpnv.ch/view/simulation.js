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
		_this.crossroad = new Crossroad();
		_this.crossroad.buildCrossroad(crossroadId, roads);
		
		//build car part
		//to do in sprint 6
		_this.crossroad.createAllVehicle();
		
		//build result part
		//to do in sprint 7
	}
	
	//method to run simulation
	this.runSimulation = function(){
		//to do in sprint 7
	}
}