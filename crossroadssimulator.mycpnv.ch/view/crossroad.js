//Filename : crossroad.js
//Crator : Bergmann Florian
//Last update : 04.06.2019

"use strict";
//Class for crossroad
var Crossroad = function(){
    //all properties for the class
	var _this = this;
    this.e = {};
	this.roads = {};
	this.vehicleLs = [];
	this.vehicleInGiratory = [];
	this.crossRoadType = "";
	//properties to store all base position of each roads for each crossroads
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
			1:{x: -95, y: -135, degree: 0, decalX: 0, decalY: -39},
			2:{x: 105, y: -100, degree: 90, decalX: 39, decalY: 0},
			3:{x: 80, y: 100, degree: 180, decalX: 0, decalY: 39},
			4:{x: -130, y: 60, degree: 270, decalX: -39, decalY: 0},
			5:{x: 5, y: -155, degree: 45, decalX: 29, decalY: -29},
			6:{x: 130, y: 0, degree: 135, decalX: 29, decalY: 29},
			7:{x: -35, y: 125, degree: 225, decalX: -29, decalY: 29},
			}
		};
	//properties to store all position in the giratory
	this.positionInGiratory = {
		1:{x: -90, y: -90, degree: 45},
		2:{x: 80, y: -80, degree: 135},
		3:{x: 60, y: 60, degree: 225},
		4:{x: -70, y: 70, degree: 315},
		5:{x: -5, y: -120, degree: 90},
		6:{x: 95, y: -10, degree: 180},
		7:{x: 0, y: 90, degree: 270},
		8:{x: -115, y: -10, degree: 0}
	};
	//method to build crossroad
	this.buildCrossroad = function(contentSimulation, crossroadId, roads){
		_this.crossRoadType = crossroadId;
		_this.roads = roads;
		//build crossroad part		
		_this.e.crossroad = buildElement("img", "imgCrossroad", contentSimulation);
		_this.e.crossroad.src = "./asset/crossroad/"+crossroadId+"/"+roads.length+".png";
	}
	//method to create all vehicle
	this.createAllVehicles = function(contentSimulation, speed){
		var numberOfVehicle = 1
		//div to content all vehicles
		_this.e.contentVehicles = buildElement("div", "contentVehicles", contentSimulation);
		//for each road
		for(var road = 1; road <= _this.roads.length; road++){
			_this.vehicleLs[road] = [];
			//for each vehicle
			for(var x = 0; x < _this.roads[road-1].childNodes[2].textContent; x++){
				//instence new vehicle
				var vehicle = new Vehicle();
				//build vehicle
				vehicle.buildVehicle(speed, numberOfVehicle, road, _this.roads.length, _this.e.contentVehicles);
				//add vehicle to the list
				_this.vehicleLs[road][x] = vehicle;
				numberOfVehicle++;
			}
		}
	}
	//method to place all vehicles
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
				//define location for the vehicle				
				if(_this.crossRoadType == "giratory"){
					var positionX = centerCrossroadX + _this.positionBaseVehicule["giratory"][vehicle.road]["x"] + (_this.positionBaseVehicule["giratory"][vehicle.road]["decalX"]*vehicles);
					var positionY = centerCrossroadY + _this.positionBaseVehicule["giratory"][vehicle.road]["y"] + (_this.positionBaseVehicule["giratory"][vehicle.road]["decalY"]*vehicles);
					var positionDegree = _this.positionBaseVehicule["giratory"][vehicle.road]["degree"];
				}else{
					var positionX = centerCrossroadX + _this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["x"] + (_this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["decalX"]*vehicles);
					var positionY = centerCrossroadY + _this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["y"] + (_this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["decalY"]*vehicles);
					var positionDegree = _this.positionBaseVehicule["rightPriorityAndTraficLight"][Object.keys(_this.vehicleLs).length][vehicle.road]["degree"];
				}
				//place the vehicle
				vehicle.placeVehicle(positionX, positionY, positionDegree);
			}
		}
		//for each vehicle in giratory
		for(var vehicle in _this.vehicleInGiratory){
			vehicle = _this.vehicleInGiratory[vehicle];
			var positionX = centerCrossroadX + _this.positionInGiratory[vehicle.road]["x"];
			var positionY = centerCrossroadY + _this.positionInGiratory[vehicle.road]["y"];
			var positionDegree = _this.positionInGiratory[vehicle.road]["degree"];
			//place the vehicle
			vehicle.placeVehicle(positionX, positionY, positionDegree);
		}
	}
	//method to check if the crossroad is empty
	this.checkIfEmpty = function(){
		for(var road in _this.vehicleLs){
			if(_this.vehicleLs[road].length > 0)return false;
		}
		if(_this.vehicleInGiratory.length > 0)return false;
		return true;
	}
	//method to remove vehicle from the road
	this.removeVehicle = function(numberOfVehicle, removeGraph = true){
		for(var road in _this.vehicleLs){
			for(var vehicle in _this.vehicleLs[road]){
				if(_this.vehicleLs[road][vehicle].number == numberOfVehicle){
					if(removeGraph)document.getElementById("vehicle"+numberOfVehicle).remove();
					_this.vehicleLs[road].shift();
				}
			}
		}
	}
	//method to remove vehicle from the giratory
	this.removeVehicleFromGiratory = function(numberOfVehicle){
		for(var vehicle in _this.vehicleInGiratory){
			if(_this.vehicleInGiratory[vehicle].number == numberOfVehicle){
				document.getElementById("vehicle"+numberOfVehicle).remove();
				_this.vehicleInGiratory.splice(vehicle, 1);
				console.log(vehicle, _this.vehicleInGiratory);
			}
		}
	}
}