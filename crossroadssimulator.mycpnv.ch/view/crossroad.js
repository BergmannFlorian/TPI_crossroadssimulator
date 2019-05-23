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
		"rightPriorityAndTraficLight": {
			3: {
				1:{x: -15, y: -60, degree: 0, decalX: 0, decalY: -40},
				2:{x: 45, y: -25, degree: 90, decalX: 40, decalY: 0},
				3:{x: 20, y: 35, degree: 180, decalX: 0, decalY: 40},
			},
			4: {
				1:{x: -15, y: -60, degree: 0, decalX: 0, decalY: -40},
				2:{x: 45, y: -25, degree: 90, decalX: 40, decalY: 0},
				3:{x: 20, y: 35, degree: 180, decalX: 0, decalY: 40},
				4:{x: -50, y: 5, degree: 270, decalX: -40, decalY: 0}
			},
			5: {
				1:{x: -15, y: -60, degree: 0, decalX: 0, decalY: -39},
				2:{x: 50, y: -30, degree: 70, decalX: 35, decalY: -13},
				3:{x: 50, y: 40, degree: 145, decalX: 22, decalY: 32},
				4:{x: -25, y: 60, degree: 215, decalX: -22, decalY: 32},
				5:{x: -60, y: -5, degree: 290, decalX: -35, decalY: -13}
			}
		},
		"giratory": {
			1:{x: -95, y: -120, degree: 0, decalX: 0, decalY: -40},
			2:{x: 100, y: -100, degree: 90, decalX: 40, decalY: 0},
			3:{x: 80, y: 100, degree: 180, decalX: 0, decalY: 40},
			4:{x: -120, y: 60, degree: 270, decalX: -40, decalY: 0},
			5:{x: 0, y: -150, degree: 45, decalX: 30, decalY: -30},
			6:{x: 125, y: 0, degree: 135, decalX: 30, decalY: 30},
			7:{x: -25, y: 120, degree: 225, decalX: -30, decalY: 30}
		}
	};
	//method to build crossroad
	this.buildCrossroad = function(contentSimulation, crossroadId, roads){
		_this.crossRoadType = crossroadId;
		_this.roads = roads;
		//build crossroad part		
		_this.e.crossroad = buildElement("img", "imgCrossroad", contentSimulation);
		_this.e.crossroad.src = "/asset/crossroad/"+crossroadId+"/"+roads.length+".png";
	}
	//function to create all vehicle
	this.createAllVehicles = function(contentSimulation, speed){
		var numberOfVehicle = 1
		//div to content all vehicles
		_this.e.contentVehicles = buildElement("div", "contentVehicles", contentSimulation);
		//for each road
		for(var road = 1; road <= _this.roads.length; road++){
			_this.vehicleLs[road] = {};
			//for each vehicle
			for(var x = 0; x < _this.roads[road-1].childNodes[2].textContent; x++){
				//instence new vehicle
				var vehicle = new Vehicle();
				//build vehicle
				vehicle.buildVehicle(speed, numberOfVehicle, road, _this.roads, _this.e.contentVehicles);
				//add vehicle to the list
				_this.vehicleLs[road][x] = vehicle;
			}
		}
	}
	//function to place all vehicles
	this.placeAllVehicles = function(){
		//get center of crossroad
		var positionCrossroad = _this.e.crossroad.getBoundingClientRect();
		var centerCrossroadX = positionCrossroad.width / 2;
		var centerCrossroadY = positionCrossroad.height / 2;
		//for each road
		for(var road in _this.vehicleLs){
			var road = _this.vehicleLs[road];
			//for each vehicle
			for(var vehicles in road){
				var vehicle = road[vehicles];
				//define location for the vehicule				
				if(_this.crossRoadType == "giratory"){
					var positionX = centerCrossroadX + _this.positionBaseVehicule["giratory"][vehicle.road]["x"] + (_this.positionBaseVehicule["giratory"][vehicle.road]["decalX"]*vehicles);
					var positionY = centerCrossroadY + _this.positionBaseVehicule["giratory"][vehicle.road]["y"] + (_this.positionBaseVehicule["giratory"][vehicle.road]["decalY"]*vehicles);
					var positionDegree = _this.positionBaseVehicule["giratory"][vehicle.road]["degree"];
				}else{
					var positionX = centerCrossroadX + _this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["x"] + (_this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["decalX"]*vehicles);
					var positionY = centerCrossroadY + _this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["y"] + (_this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["decalY"]*vehicles);
					var positionDegree = _this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["degree"];
				}
				console.log(positionX, positionY, positionDegree);
				vehicle.placeVehicle(positionX, positionY, positionDegree);
			}
		}		
	}
}