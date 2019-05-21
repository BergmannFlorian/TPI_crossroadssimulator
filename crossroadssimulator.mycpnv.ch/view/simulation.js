//Filename : index.html
//Crator : Bergmann Florian
//Last update : 17.05.2019

"use strict";

var Simulation = function(){
    var _this = this;
    this.e = {};
	this.roads = {};
	//method to build simulation
	this.buildSimulation = function(crossroadId, roads, speed){
		//build crossroad part
		this.e.divSimulation = document.getElementById("divSimulation");
		
		this.e.contentSimulation = buildElement("div", "contentSimulation", this.e.divSimulation);
		this.e.contentSimulation.id = "contentSimulation";
		
		this.e.crossroad = buildElement("img", "imgCrossroad", this.e.contentSimulation);
		this.e.crossroad.src = "/asset/crossroad/"+crossroadId+"/"+roads.length+".png";
		
		//build car part
		//to do in sprint 6
		var positionX = 200;
		var positionY = 0;
		for(var i = 0; i < roads.length; i++){
			_this.roads[i] = {};
			for(var x = 0; x < roads[i].childNodes[2].textContent; x++){
				var vehicule = new Vehicle();
				vehicule.buildVehicle(20, 1, 1, roads.length, positionX, positionY, 0);
				_this.roads[i][x] = vehicule;
				positionY += 60;
			}
			positionX += 40
			positionY = 0;
		}
		console.log(_this.roads);
		//build result part
		//to do in sprint 7
	}
	//method to run simulation
	this.runSimulation = function(){
		//to do in sprint 7
	}
}