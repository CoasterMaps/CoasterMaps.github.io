function MapLayerState()
{


//this.clear();

    this.setInitialPosition = function(x,y) {
    	this.initialPositionX = x;
        this.initialPositionY = y;
    }

    this.setFinalPosition = function(x,y) {
    	this.finalPositionX = x;
        this.finalPositionY = y;
    }

    this.setDiff = function(x,y) {
    	this.initialDifferenceX = x;
        this.initialDifferenceY = y;
    }


    this.getInitPosX = function() {

    	if(typeof this.initialPositionX !== 'undefined')
    		return parseFloat(this.initialPositionX);
        else return 0;
    }
    this.getInitPosY = function() {

    	if(typeof this.initialPositionY !== 'undefined')
    		return parseFloat(this.initialPositionY);
        else return 0;
    }


    this.getFinalPosX = function() {

    	if(typeof this.finalPositionX !== 'undefined')
    		return parseFloat(this.finalPositionX);
        else return 0;
    }
    this.getFinalPosY = function() {

    	if(typeof this.finalPositionY !== 'undefined')
    		return parseFloat(this.finalPositionY);
        else return 0;
    }


    this.getDiffX = function() {

    	if(typeof this.initialDifferenceX !== 'undefined')
    		return parseFloat(this.initialDifferenceX);
        else return 0;
    }
    this.getDiffY = function() {

    	if(typeof this.initialDifferenceY !== 'undefined')
    		return parseFloat(this.initialDifferenceY );
        else return 0;
    }
    
}