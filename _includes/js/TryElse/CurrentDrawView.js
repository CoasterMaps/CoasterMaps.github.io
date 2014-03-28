
function CurrentDrawView() {



	this.initViewArray = function() {

		this.prevStates = new Array();
		this.prevStatesCounter = 0;

		this.nextStates = new Array();
		this.nextStatesCounter = 0;
	};


	this.newPrevView = function() {
        
        // prev and current states saved in the array
       // window.alert("new prev view saved");
       
        this.prevStates[this.prevStatesCounter] = this.getCurrentView();
		this.prevStatesCounter++;
		//window.alert("new prev");
		
		//window.alert("new prev view created");    
	};


	this.getPrevView = function() {

		//window.alert("get new prev view");
        
		this.prevStatesCounter--;
		this.newNextView(this.prevStates[this.prevStatesCounter]);
		
		this.prevStatesCounter--;

		var returnView = this.prevStates[this.prevStatesCounter];
		this.prevStatesCounter++;

		//window.alert("return new prev view");
		this.prevStates.pop();    

		//window.alert("- prev");    

		return returnView;
	};


	this.newNextView = function(view) {

		//window.alert("new next");

		this.nextStates[this.nextStatesCounter] = view;
		this.nextStatesCounter++;
		//window.alert(this.nextStates.length);
	}

	this.getNextView = function() {

		//window.alert(this.nextStates.length);
	    

		this.nextStatesCounter--;
		//window.alert("counter"+this.nextStatesCounter);
		var returnView = this.nextStates[this.nextStatesCounter];
		this.newPrevView(returnView);
		this.nextStates.pop();

	    //window.alert("- next");
		

		return returnView;
	}


	this.getCurrentView = function() {

	  var saveDrawings = new Save();
      
      //staticLayer.clear(); 
      
      //window.alert("got annotations cleared");

	  var arrayToolTip = toolTips.returnArray();
      var lineArray = lines.returnArray();
      var handlineArray = handLines.returnArray();

      //window.alert("got current once");

      var saveDrawings = new Save();

      if (arrayToolTip.length > 0) saveDrawings.saveAnnot(arrayToolTip);
      
      if (lineArray.length > 0) saveDrawings.saveLines(lineArray);
      
      if (handlineArray.length > 0) saveDrawings.saveHandLines(handlineArray);

      // saveWithVera
      jsonstr = annotGlobalString + "+" + lineGlobalString + "+" + handLinesGlobalString;
      //window.alert("returning saved annotation string");

      return jsonstr;
	}

}