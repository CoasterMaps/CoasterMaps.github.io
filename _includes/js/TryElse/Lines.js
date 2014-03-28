function Lines()
{
  
  this.initArray = function() {

  	this.array = new Array();	
  	this.counter = 0;
  }

   
  this.newRedLine = function() {

   
  	var redLine = new Kinetic.Line({
            points: [],
            stroke: 'red',
            strokeWidth: globalLineStroke,
            lineCap: 'round',
            lineJoin: 'round'
    });

     
    var newLineContainer = new LineContainer(redLine);
    newLineContainer.getGeoPoints(redLine.points());
    

  	this.array[this.counter] = newLineContainer;
   
  	this.counter++;

    staticLayer.add(redLine);
   // return redLine;
  }


  this.returnArray = function() {

  	return this.array;
  }

  this.clearArray = function() {

    this.array=[];
    this.counter=0;
  }



  this.deleteLastLineContainer = function() {

    return this.array.pop();
    this.counter--;
  }


  this.getLastLineContainer = function() {

  	return this.array[this.counter-1];
  }


}