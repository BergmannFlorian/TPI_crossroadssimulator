//Filename : index.html
//Crator : Bergmann Florian
//Last update : 17.05.2019

"use strict";

var Simulation = function(){
    var _this = this;
    this.e = {};
	this.road = {};
	//method to build simulation
	this.buildSimulation = function(crossroadId, roads, speed){
		//build crossroad part
		this.e.divSimulation = document.getElementById("divSimulation");
		
		this.e.contentSimulation = buildElement("div", "contentSimulation", this.e.divSimulation);
		
		this.e.crossroad = buildElement("img", "imgCrossroad", this.e.contentSimulation);
		this.e.crossroad.src = "/asset/crossroad/"+crossroadId+"/"+roads.length+".png";
		
		//build car part
		//to do in sprint 6
		
		//build result part
		//to do in sprint 7
	}
	//method to run simulation
	this.runSimulation = function(){
		//to do in sprint 7
	}
}