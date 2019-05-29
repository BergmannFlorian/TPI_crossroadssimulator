//Filename : simulation.js
//Crator : Bergmann Florian
//Last update : 24.05.2019

"use strict";

var Simulation = function(){
    var _this = this;
    this.e = {};
	this.run = false;
	this.speedSimulation = 500;
	this.resultLs = [];
	this.traficLightStep = 1;

	//method to build simulation
	this.buildSimulation = function(crossroadId, roads, speed){
		_this.speed = speed;
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
			_this.playpause();
		});
	}
	//function for play pause button
	this.playpause = function(){
		//change class of button
		_this.e.btnPlayPause.classList.toggle("pause");
		_this.e.btnPlayPause.classList.toggle("play");
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
	}
	//method to run simulation
	this.runSimulation = function(){
		var vehicles = [];
		var zonesPassage = [];
		var txtResult = "Etape " + (_this.resultLs.length + 1) + ": "; //store result of this loop
		//to the type of crossroad
		switch(_this.crossroad.crossRoadType){
			case "rightPriority": 
				//get vehicles for this loop
				for(var road in _this.crossroad.vehicleLs){			
					//if they are vehicle
					if(_this.crossroad.vehicleLs[road][0] != undefined){
						vehicles.push(_this.crossroad.vehicleLs[road][0]);
					}
				}
				//sort vehicle by priority
				vehicles.sort((a, b) => (a.priority > b.priority) ? 1 : -1)
				//for each vehicle
				for(var vehicle in vehicles){
					var free = true;
					//get zone used by the vehicle
					var nextZones = vehicles[vehicle].getNextZones();
					for(var zone in nextZones){
						//check if the zone are used by an another vehicle
						if(zonesPassage.includes(nextZones[zone]))free = false;
					}
					//if path is free
					if(free){
						//set zone to reserved for this loop
						zonesPassage = zonesPassage.concat(nextZones);
						//get result message for the vehicle
						if(vehicle > 0)txtResult += ", ";
						txtResult += vehicles[vehicle].textResult();
						_this.crossroad.removeVehicle(vehicles[vehicle].number, true);
					};
				}
				break;
			case "traficLight":
				//set start of result
				txtResult += "Le feux de la route " + _this.traficLightStep + " passe au vert";
				//define how many vehicle can pass when the light is green
				var nbVehicle = 1;
				if(_this.speed == 3)nbVehicle = 2;
				if(_this.speed == 5)nbVehicle = 3;
				//for each vehicle, number depend of speed option
				for(var i = 0; i < nbVehicle; i++){
					vehicle = _this.crossroad.vehicleLs[_this.traficLightStep][0];
					//if vehicle exist
					if(vehicle != undefined){
						//add result for the vehicle
						txtResult += ", " + vehicle.textResult();
						//remove the vehicle
						_this.crossroad.removeVehicle(vehicle.number);
					}
				}
				//define next road for green trafic light
				_this.traficLightStep++;
				if(_this.traficLightStep > _this.crossroad.roads.length)_this.traficLightStep = 1;
				break;
			case "giratory":
				var free = false;
				var zonesReserved = [];
				var vehicleToRemove = [];
				//move vehicle in giratory
				for(var vehicle in _this.crossroad.vehicleInGiratory){
					vehicle = _this.crossroad.vehicleInGiratory[vehicle];
					switch(vehicle.road){
						case 1: vehicle.road = 8; break;
						case 2: vehicle.road = 5; break;
						case 3: vehicle.road = 6; break;
						case 4: vehicle.road = 7; break;
						case 5: vehicle.road = 1; break;
						case 6: vehicle.road = 2; break;
						case 7: vehicle.road = 3; break;
						case 8: vehicle.road = 4; break;
					}
					if(vehicle.road == vehicle.target){
						txtResult += ", " + vehicle.textResult("giratory", "out");
						vehicleToRemove.push(vehicle.number);
					}else{
						zonesReserved.push(vehicle.road);
					}
				}
				for(var vehicleNumber in vehicleToRemove){
					_this.crossroad.removeVehicleFromGiratory(vehicleToRemove[vehicleNumber]);
				}
				//move vehicle in the road
				for(var road in _this.crossroad.vehicleLs){			
					//if they are vehicle
					if(_this.crossroad.vehicleLs[road][0] != undefined){
						vehicles.push(_this.crossroad.vehicleLs[road][0]);
					}
				}
				//for each vehicle
				for(var vehicleInRoad in vehicles){
					vehicleInRoad = vehicles[vehicleInRoad];
					//if zone on road is free
					if(!(zonesReserved.includes(vehicleInRoad.road))){
						txtResult += ", " + vehicleInRoad.textResult("giratory", "in");
						//move vehicle from road to giratory
						_this.crossroad.vehicleInGiratory.push(vehicleInRoad);
						_this.crossroad.removeVehicle(vehicleInRoad.number, false);
					}
				}
				break;
		}
		_this.crossroad.placeAllVehicles();
		_this.addResult(txtResult, _this.resultLs.length);
		if(_this.crossroad.checkIfEmpty()){
			_this.playpause();
			return;
		}
	}
	this.addResult = function(txtResult, number){
		_this.resultLs[number] = buildElement("p", "textResult", _this.e.contentResultSimulation);
		_this.resultLs[number].textContent = txtResult;
	}
}