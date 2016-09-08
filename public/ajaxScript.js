
	var newTr;
	var newTh;
	var delId = 1;
	var buttonArray = [];
			
     document.addEventListener('DOMContentLoaded', bindButtons);

      function bindButtons(){
      	document.getElementById('Submit').addEventListener('click', function(event){
      	var req = new XMLHttpRequest();
      	var reqDelete = new XMLHttpRequest();
      	var name = document.getElementById('name').value;
	    var reps = document.getElementById('reps').value;
	    var weight = document.getElementById('weight').value;
		var date = document.getElementById('date').value;

		console.log(date);

		if(document.getElementById('lbs').checked){
			var unitText = "lbs";
			var unitValue = 1;
		}
		else {
			var unitText = "kg";
			var unitValue = 0;
		}

	    req.open("GET", "http://52.36.252.61:3000/insert?name=" + name + "&reps=" + reps + "&weight=" + weight + "&date=" + date + "&lbs=" + unitValue, true);


		req.addEventListener('load',function(){
      		if(req.status >= 200 && req.status < 400){

      		console.log(req);
	      		if (name != "" ){
					console.log("load being called" + name);
	        		//var response = JSON.parse(req.responseText);
			        //console.log(response);
			        newTr = document.createElement("tr");
			        newTh = document.createElement("th");
			        document.getElementById('tbody').appendChild(newTr);
			        //newTr.appendChild(newTh);

			        var responseThing = JSON.parse(req.responseText);
			        var entryId = responseThing.idResults;
			        console.log(responseThing);
			        console.log(responseThing.idResults);
			        cellMaker(name);
			        cellMaker(reps);
			        cellMaker(weight);
			        cellMaker(date);
			        cellMaker(unitText);
			        var newTd;
			        function cellMaker(text){
					  newTd = document.createElement("td");
					  newTd.textContent = text;
					  newTd.style.border = "1px solid black";
					  newTr.appendChild(newTd);
					}

					var emptyTd = document.createElement("td");
					newTr.appendChild(emptyTd);
					var deleteButton = document.createElement("button");
					//deleteButton.value = "Delete";        
					var deleteText = document.createTextNode("Delete");
					//deleteButton.class = "delete";
					//deleteButton.id = delId++;  
					//deleteButton.onclick = deleteRow(this);
					//buttonArray.push(deleteButton);     
					deleteButton.appendChild(deleteText);                               
					emptyTd.appendChild(deleteButton);




					var editButton = document.createElement("BUTTON");        
					var editText = document.createTextNode("Edit");
					//deleteButton.class = "delete";
					//deleteButton.id = delId++;  
					editButton.appendChild(editText);                               
					newTr.appendChild(editButton);



					function removeExercise(r) {
						console.log(r);
						console.log("i deleted");
					    var i = r.parentNode.parentNode.rowIndex;
					    document.getElementById("myTable").deleteRow(i);
						//event.preventDefault();
				    }

				    deleteButton.addEventListener('click', function(){
				        removeExercise(deleteButton);
				        reqDelete.open("GET", "http://52.36.252.61:3000/delete?entryId=" + entryId, true);
				        reqDelete.send(null);
					});


				//	for(var i = 0; i < buttonArray.length; i++){
				//		deleteButton[i].addEventListener('click', function (event){ 
				//		document.getElementById("myTable").deleteRow(i);
				//		});
				//	}

					//var editButton = document.createElement("BUTTON");        
					//var textE = document.createTextNode("Edit");       
					//editButton.appendChild(textE);                               
					//deleteButton.appendChild(editButton);     
				}
					   
		         //   document.getElementById('tbody').textContent = " " + response.name;
		         //   document.getElementById('temperature').textContent = " " + response.main.temp;
		         //   document.getElementById('humidity').textContent = " " + response.main.humidity;
	      	} else {
        	  console.log("Error in network request: " + request.statusText);
      		}});

	      req.send(null);


          event.preventDefault();
        })
      }