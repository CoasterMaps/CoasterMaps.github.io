
function CurrentDrawView() {


	this.initViewArray = function() {

		this.prevStates = new Array();
		this.nextStates = new Array();
		this.newPrevView(this.getCurrentView());
	};


	this.newPrevView = function(view) {
        
		this.prevStates.push(view);
	};


	this.getPrevView = function() {
        
		if (this.prevStates.length>0) {

		    var currentView = this.prevStates.pop();
			this.newNextView(currentView);
		 
			var prevView = this.prevStates.pop();
			
			if (this.prevStates.length!==0) {
		        this.newPrevView(prevView);
		    }
		    else this.newNextView(prevView);


            var outString = "prevStates: "+"\n";
		    for (var i=0; i<this.prevStates.length; i++) {
		    	outString+= "num "+i+": "+this.prevStates[i]+"\n";
		    }
		    //window.alert(outString);
	    }

		return prevView;
	};


	this.newNextView = function(view) {

		this.nextStates.push(view);
    }


	this.getNextView = function() {

		if (this.nextStates.length>0) {

			var nextView = this.nextStates.pop();

	        this.newPrevView(nextView);


	        var outString = "nextStates: "+"\n";
	    	for (var i=0; i<this.nextStates.length; i++) {
	    		outString+= "num "+i+": "+this.nextStates[i]+"\n";
		    }
		    //window.alert(outString);
	    }
		
		
		return nextView;
	}


	this.getCurrentView = function() {

	 //window.alert("getCurrentView");

	  var saveDrawings = new Save();
      
	  var arrayToolTip = toolTips.returnArray();
      var lineArray = lines.returnArray();
      var handlineArray = handLines.returnArray();

      if (arrayToolTip.length > 0) 
      	saveDrawings.saveAnnot(arrayToolTip);
      if (lineArray.length > 0) 
      	saveDrawings.saveLines(lineArray);
      if (handlineArray.length > 0) 
      	saveDrawings.saveHandLines(handlineArray);

      var curSavedView = annotGlobalString + "+" + lineGlobalString + "+" + handLinesGlobalString;

      return curSavedView;
	}


}