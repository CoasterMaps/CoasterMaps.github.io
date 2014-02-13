function MapLayerState()
{


localStorage.clear();

    this.setInitialPosition = function(x,y) {
    	localStorage.initialPositionX = x;
        localStorage.initialPositionY = y;
    }

    this.setFinalPosition = function(x,y) {
    	localStorage.finalPositionX = x;
        localStorage.finalPositionY = y;
    }

    this.setDiff = function(x,y) {
    	localStorage.initialDifferenceX = x;
        localStorage.initialDifferenceY = y;
    }

   

    this.getInitPosX = function() {

    	if(typeof localStorage.initialPositionX !== 'undefined')
    		return parseFloat(localStorage.initialPositionX);
        else return 0;
    }
    this.getInitPosY = function() {

    	if(typeof localStorage.initialPositionY !== 'undefined')
    		return parseFloat(localStorage.initialPositionY);
        else return 0;
    }


    this.getFinalPosX = function() {

    	if(typeof localStorage.finalPositionX !== 'undefined')
    		return parseFloat(localStorage.finalPositionX);
        else return 0;
    }
    this.getFinalPosY = function() {

    	if(typeof localStorage.finalPositionY !== 'undefined')
    		return parseFloat(localStorage.finalPositionY);
        else return 0;
    }


    this.getDiffX = function() {

    	if(typeof localStorage.initialDifferenceX !== 'undefined')
    		return parseFloat(localStorage.initialDifferenceX);
        else return 0;
    }
    this.getDiffY = function() {

    	if(typeof localStorage.initialDifferenceY !== 'undefined')
    		return parseFloat(localStorage.initialDifferenceY );
        else return 0;
    }

    
}