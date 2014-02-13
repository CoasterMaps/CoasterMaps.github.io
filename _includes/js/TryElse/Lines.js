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

  	this.array[this.counter] = redLine;
  	this.counter++;
  }


  this.getLines = function() {

  	return this.array;
  }


  this.getLastLine = function() {

  	return this.array[this.counter-1];
  }


}