//Filename : simulation.js
//Crator : Bergmann Florian
//Last update : 24.05.2019

"use strict";

var Simulation = function(){
    var _this = this;
    this.e = {};
	this.run = false;
	this.speedSimulation = 500;

	//method to build simulation
	this.buildSimulation = function(crossroadId, roads, speed){
		//build content of simulation
		_this.e.divSimulation = document.getElementById("divSimulation");
		_this.e.contentSimulation = buildElement("div", "contentSimulation", _this.e.divSimulation);
		_this.e.contentSimulation.id = "contentSimulation";

		//build crossroad part
		_this.crossroad = new Crossroad();
		_this.crossroad.buildCrossroad(_this.e.contentSimulation, crossroadId, roads);
		
		//build car part
		_this.crossroad.createAllVehicles(_this.e.contentSimulation, speed);
		_this.crossroad.placeAllVehicles();
		
		//build result part
		_this.e.divResultSimulation = document.getElementById("divResultSimulation");
		_this.e.contentResultSimulation = buildElement("div", "contentResultSimulation", _this.e.divResultSimulation);
		
		_this.e.btnPlayPause = buildElement("div", "playpause play", _this.e.contentResultSimulation);
		
		//event when button play/pause is clicked
		_this.e.btnPlayPause.addEventListener("click", function(e){
			//change class of button
			e.target.classList.toggle("pause");
			e.target.classList.toggle("play");
			//if the simulation is running
			if(_this.run){
				_this.run = false;
				//stop execution of the simulation
				clearInterval(_this.setInterval);
				
			}else{
				_this.run = true;
				//run simulation
				_this.setInterval = setInterval(_this.runSimulation, _this.speedSimulation);
			}
		});
	}
	
	//method to run simulation
	this.runSimulation = function(){
		var vehicles = [];
		
		switch(_this.crossroad.crossRoadType){
			case "rightPriority": 
				//get vehicles for this loop
				for(var road in _this.crossroad.vehicleLs){			
					//if they are vehicle
					if(_this.crossroad.vehicleLs[road][0] != undefined){
						vehicles.push(_this.crossroad.vehicleLs[road][0]);
					}
				}
				vehicles.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
				console.log(vehicles);
				break;
			case "traficLight":
				
				break;
			case "giratory":
				
				break;
		}
	}
}