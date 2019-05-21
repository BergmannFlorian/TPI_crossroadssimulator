//Filename : index.html
//Crator : Bergmann Florian
//Last update : 16.05.2019

"use strict";

//variable list
var _idRightPriority = "rightPriority"; //the value is equal to folder name of right priority image
var _idTraficLight = "traficLight"; //the value is equal to folder name of trafic light image
var _idGiratory = "giratory"; //the value is equal to folder name of giratory image

var _minRoad = 3;
var _maxRoadTraficLightAndRightPriority = 5;
var _maxRoadGiratory = 7;

var _minCarByRoad = 0;
var _maxCarByRoad = 5;

//set id of crossroad
document.getElementById("grpType1").value = _idRightPriority;
document.getElementById("grpType2").value = _idTraficLight;
document.getElementById("grpType3").value = _idGiratory;

//add 3 base number of cars
addOptionNbCar();
addOptionNbCar();
addOptionNbCar();

//event when change type of crossroad
document.getElementById("divOptionType").addEventListener("change", function(e){
	//reset number of road on standard
	document.getElementById("nbrRoad").textContent = _minRoad;
	var optNbCar = document.getElementsByClassName("divOptionNbrCar");
	for(var i=optNbCar.length; i>_minRoad ; i--)removeLastOptionNbCar();
});

//event when reduce number of road
document.getElementById("nbrRoadLess").addEventListener("click", function(e){
	var nbRoad = parseInt(document.getElementById("nbrRoad").textContent);
	if(nbRoad > _minRoad){
		document.getElementById("nbrRoad").textContent = nbRoad-1;
		removeLastOptionNbCar();
	}
});

//event when increase number of road
document.getElementById("nbrRoadMore").addEventListener("click", function(e){
	//get number of road
	var nbRoad = parseInt(document.getElementById("nbrRoad").textContent);
	var typeCrossroad = document.getElementsByName("grpType");
	//for each crossroad radio
	for(var i = 0, length = typeCrossroad.length; i < length; i++){
		if(typeCrossroad[i].checked){
			//if crossroad is right priority and traffic lights or gyratory
			if((typeCrossroad[i].value == _idGiratory && nbRoad < _maxRoadGiratory) || nbRoad < _maxRoadTraficLightAndRightPriority){
				document.getElementById("nbrRoad").textContent = nbRoad+1;
				addOptionNbCar();				
			}
		};
	};
});

//event when button to generate simulation is cliqued
document.getElementById("btnGenerate").addEventListener("click", function(e){
	//test if an simulation is running
	if(run){
		document.getElementById("msgAlertGenerate").textContent = "Il faut arrêter la simulation en cours avant d'en générer une nouvelle";
	}else{	
		document.getElementById("msgAlertGenerate").textContent = "";
		//remove element if exist
		if(simulation.e != undefined){
			simulation.e.contentSimulation.remove();
		}
		var typeCrossroad = document.getElementsByName("grpType");
		//for each crossroad radio
		for(var i = 0, length = typeCrossroad.length; i < length; i++){
			if(typeCrossroad[i].checked){
				var crossroadId = typeCrossroad[i].value;
			};
		};
		var roads = document.getElementsByClassName("divOptionNbrCar");
		var speeds = document.getElementsByName("grpSpeed");
		//for each speed radio
		for(var i = 0, length = speeds.length; i < length; i++){
			if(speeds[i].checked){
				var speed = speeds[i].value;
			};
		};
		//create simulation
		simulation = new Simulation();
		simulation.buildSimulation(crossroadId, roads, speed);
	}
});