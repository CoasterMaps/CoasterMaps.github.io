function HandLines()
{


	this.initArray = function() {

		this.array = new Array();	
		this.counter = 0;
	}


	this.newRedLine = function() {



		var redLine = new Kinetic.Line({
			points: [],
			stroke: 'red',//'' rgb(r.getValue(),g.getValue(),b.getValue()
			strokeWidth: globalHandLineStroke,
			lineCap: 'round',
			lineJoin: 'round'
		});


		var newHandLineContainer = new HandLineContainer(redLine);
		newHandLineContainer.getGeoPoints(redLine.points());

		this.array[this.counter] = newHandLineContainer;
		this.counter++;

		staticLayer.add(redLine);

		return redLine;
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