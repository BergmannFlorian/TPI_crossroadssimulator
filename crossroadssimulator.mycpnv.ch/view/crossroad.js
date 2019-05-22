//Filename : crossroad.js
//Crator : Bergmann Florian
//Last update : 22.05.2019

"use strict";

var Crossroad = function(){
    var _this = this;
    this.e = {};
	this.roads = {};
	this.vehicleLs = {};
	this.crossRoadType = "";
	this.positionBaseVehicule = {
		"rightPriority": {
			3: {
				1:{x: 0, y: -10, degree: 0},
				2:{x: 10, y: 0, degree: 90},
				3:{x: 0, y: -10, degree: 180},
			},
			4: {
				1:{x: 0, y: -10, degree: 0},
				2:{x: 10, y: 0, degree: 90},
				3:{x: 0, y: -10, degree: 180},
				4:{x: -10, y: 0, degree: 270}
			},
			5: {
				1:{x: 0, y: -10, degree: 0},
				2:{x: 10, y: 0, degree: 90},
				3:{x: 0, y: -10, degree: 180},
				4:{x: -10, y: 0, degree: 270},
				5:{x: 5, y: -5, degree: 45}
			}
		},
		"traficLight": {
			3: {
				1:{x: 0, y: -10, degree: 0},
				2:{x: 10, y: 0, degree: 90},
				3:{x: 0, y: -10, degree: 180},
			},
			4: {
				1:{x: 0, y: -10, degree: 0},
				2:{x: 10, y: 0, degree: 90},
				3:{x: 0, y: -10, degree: 180},
				4:{x: -10, y: 0, degree: 270}
			},
			5: {
				1:{x: 0, y: -10, degree: 0},
				2:{x: 10, y: 0, degree: 90},
				3:{x: 0, y: -10, degree: 180},
				4:{x: -10, y: 0, degree: 270},
				5:{x: 5, y: -5, degree: 45}
			}
		},
		"giratory": {
			1:{x: 0, y: -10, degree: 0},
			2:{x: 10, y: 0, degree: 90},
			3:{x: 0, y: -10, degree: 180},
			4:{x: -10, y: 0, degree: 270},
			5:{x: 5, y: -5, degree: 45},
			6:{x: 5, y: 5, degree: 135},
			7:{x: -5, y: 5, degree: 225}
		}
	};
	//method to build crossroad
	this.buildCrossroad = function(crossroadId, roads){
		_this.crossRoadType = crossroadId;
		_this.roads = roads;
		//build crossroad part
		_this.e.divSimulation = document.getElementById("divSimulation");
		
		_this.e.contentSimulation = buildElement("div", "contentSimulation", _this.e.divSimulation);
		_this.e.contentSimulation.id = "contentSimulation";
		
		_this.e.crossroad = buildElement("img", "imgCrossroad", _this.e.contentSimulation);
		_this.e.crossroad.src = "/asset/crossroad/"+crossroadId+"/"+roads.length+".png";
	}
	//function to create all vehicle
	this.createAllVehicle = function(){
		//get center of crossroad
		var positionCrossroad = _this.e.crossroad.getBoundingClientRect();
		var positionBaseX = positionCrossroad.width / 2;
		var positionBaseY = -(positionCrossroad.height / 2);
		//for each road
		for(var i = 0; i < _this.roads.length; i++){
			_this.vehicleLs[i] = {};
			//for each vehicle
			for(var x = 0; x < _this.roads[i].childNodes[2].textContent; x++){
				//instence new vehicle
				var vehicle = new Vehicle();
				//build vehicle
				vehicle.buildVehicle(20, 1, 1, _this.roads);
				//define location for the vehicule
				var positionX = positionBaseX + _this.positionBaseVehicule[_this.crossRoadType][_this.roads.length][x]["x"];
				var positionX = positionBaseX + _this.positionBaseVehicule[_this.crossRoadType][_this.roads.length][x]["y"];
				var positionDegree =_this.positionBaseVehicule[_thiscrossRoadType][roads.length][x]["degree"];
				vehicle.placeVehicle(positionX, positionY, 0);
				//add vehicle to the list
				_this.vehicleLs[i][x] = vehicle;
			}
		}
	}
}