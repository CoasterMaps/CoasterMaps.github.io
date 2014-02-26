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
            strokeWidth: 3,
            lineCap: 'round',
            lineJoin: 'round'
    });

     
    var newLineContainer = new LineContainer(redLine);
    newLineContainer.getGeoPoints(redLine.points());
    

  	this.array[this.counter] = newLineContainer;
   
  	this.counter++;
   // return redLine;
  }


  this.returnArray = function() {

  	return this.array;
  }



  this.getLastLineContainer = function() {

  	return this.array[this.counter-1];
  }


}