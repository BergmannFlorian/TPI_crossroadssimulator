//Filename : vehicle.js
//Crator : Bergmann Florian
//Last update : 24.05.2019

"use strict";

var Vehicle = function(){
    var _this = this;
    this.e = {};
	var typeLs = ["car", "bike", "truck"];
	
	//method to build a vehicle
	this.buildVehicle = function(speed, number, road, maxRoad, contentVehicles){
		//set parameters of vehicle
		_this.type = typeLs[getRandomInt(0, typeLs.length - 1)];
		_this.colorR = getRandomInt(0, 255);
		_this.colorG = getRandomInt(0, 255);
		_this.colorB = getRandomInt(0, 255);
		_this.speed = speed;
		_this.road = road;
		_this.number = number;
		//select an target
		do{
			_this.target = getRandomInt(1, maxRoad);
		}while(_this.target == _this.road);
		//define level of priority
		if(_this.road == 1 && _this.target == maxRoad){
			_this.priority = 1;
			if(maxRoad == 3)_this.priority = 2;
		}else if(_this.road == maxRoad && _this.target == 1){
			_this.priority = 3;
			if(maxRoad == 3)_this.priority = 2;
		}else if(_this.target == _this.road - 1){
			_this.priority = 1;
		}else if(_this.target == _this.road + 1){
			_this.priority = 3;
		}else{
			_this.priority = 2;
		}
		//draw vehicle
		_this.e.imgVehicle = buildElement("img", "vehicle "+_this.type, contentVehicles);
		
		_this.e.imgVehicle.style.backgroundColor = "rgb("+_this.colorR+","+_this.colorG+","+_this.colorB+")";
		_this.e.imgVehicle.src = "/asset/vehicles/"+_this.type+".png";
	}
	
	//method to place vehicle
	this.placeVehicle = function(positionX, positionY, degree){
		_this.e.imgVehicle.style.left = positionX;
		_this.e.imgVehicle.style.top = positionY;
		_this.e.imgVehicle.style.transform = "rotate("+degree+"deg)";
	}
}