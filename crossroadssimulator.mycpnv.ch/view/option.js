//use strict//

//set id of crossroad
document.getElementById("grpType1").value = _idRightPriority;
document.getElementById("grpType2").value = _idTraficLight;
document.getElementById("grpType3").value = _idGiratory;

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
			console.log(nbRoad);
			if((typeCrossroad[i].value == _idGiratory && nbRoad < _maxRoadGiratory) || nbRoad < _maxRoadTraficLightAndRightPriority){
				document.getElementById("nbrRoad").textContent = nbRoad+1;
				addOptionNbCar();				
			}
		};
	};
});

//add 3 base number of cars
addOptionNbCar();
addOptionNbCar();
addOptionNbCar();