function HandLines()
{


	this.initArray = function() {

		this.array = new Array();	
		this.counter = 0;
	}


	this.newRedLine = function() {



		var redLine = new Kinetic.Line({
			name: this.counter,
			points: [],
			stroke: 'red',//'' rgb(r.getValue(),g.getValue(),b.getValue()
			strokeWidth: globalHandLineStroke,
			lineCap: 'round',
			lineJoin: 'round'
		});

		redLine.on('dblclick', function(evt) {

			var shape=evt.targetNode;
            handLines.deleteItemNumber(parseInt(shape.attrs.name));  
      		
        });


		var newHandLineContainer = new HandLineContainer(redLine);
		newHandLineContainer.getGeoPoints(redLine.points());

		this.array[this.counter] = newHandLineContainer;
		this.counter++;

		staticLayer.add(redLine);

		return redLine;
	}


	this.deleteItemNumber = function(num) {


    this.array[num].getLine().hide();
    if (this.array.length>1)  this.array.splice(num, 1);
    else  {
    	this.array = [];
    	handLinesGlobalString="";
    }
    this.counter--;

    curViewQueue.newPrevView(curViewQueue.getCurrentView());
    var newAnnotString = curViewQueue.getCurrentView();

    staticLayer.clear(); 
    overlay.hideAll();
    
      
    if (newAnnotString!== undefined) {

      var saveDrawings = new Save();

      var res = newAnnotString.split("+");
            
      var newStr = "lines:" + res[1] + " "; 
      saveDrawings.getLines(res[1]);
      
      newStr += "handlines:" + res[2] + " "; 
      saveDrawings.getHandLines(res[2]);
      
      newStr += "annot:" + res[0] + " "; 
      saveDrawings.getAnnot(res[0]);

      document.getElementById("get-tool").disabled = true;
    }



  }


	this.deleteLastLineContainer = function() {
		this.array.pop();
		this.counter--;
	}

	this.returnArray = function() {

		return this.array;
	}

	this.clearArray = function() {

		this.array=[];
        this.counter=0;
    }

	this.getLastLineContainer = function() {

		//window.alert("len:"+this.array.length+" counter"+this.counter);

		return this.array[this.counter-1];
	}


}