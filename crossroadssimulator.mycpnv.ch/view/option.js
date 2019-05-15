document.getElementById("divOptionType").addEventListener("change", function(e){
	document.getElementById("nbrRoad").textContent = 3;
});

document.getElementById("nbrRoadLess").addEventListener("click", function(e){
	var nbRoad = parseInt(document.getElementById("nbrRoad").textContent);
	if(nbRoad > 3)document.getElementById("nbrRoad").textContent = nbRoad-1;
});

document.getElementById("nbrRoadMore").addEventListener("click", function(e){
	var maxRoad = 5;
	var nbRoad = parseInt(document.getElementById("nbrRoad").textContent);
	var typeCrssroad = document.getElementsByName("grpType");
	for(var i = 0, length = typeCrssroad.length; i < length; i++){
		if(typeCrssroad[i].checked){
			if(typeCrssroad[i].value == 3){
				maxRoad = 7
			}else{
				maxRoad = 5
			};
		};
	};
	if(nbRoad < maxRoad)document.getElementById("nbrRoad").textContent = nbRoad+1;
});