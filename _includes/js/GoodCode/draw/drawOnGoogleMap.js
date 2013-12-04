function DrawOnGoogleMap() {

	
    this.drawAllAnnotationsOnGMap = function(gmap) {

        var lati = new Array();
        var longi = new Array();

        var string_annotationsLat = myLocalStorage.getAnnotationsLat();
        var string_annotationsLong = myLocalStorage.getAnnotationsLong();

        lati = this.stringToArrayParser(string_annotationsLat);
        longi = this.stringToArrayParser(string_annotationsLong);

        myLocalStorage.setAnnotationsLat("");
        myLocalStorage.setAnnotationsLong("");

        var drawTag = new DrawTag(gmap);
      

        for (var counter=0; counter<longi.length; counter++) {
            drawTag.onGMap(new google.maps.LatLng(lati[counter],longi[counter]));
        }
    }



this.stringToArrayParser=function(inputString) {

	var outputArray = new Array();
	var arrayCount = 0;
	var string_annotation = "";

     for (var counter=0; counter<inputString.length; counter++) {

     	var currentCharLong =  inputString.charAt(counter);
     	if (currentCharLong!=='#')  {
     		string_annotation += currentCharLong;
     	} else {
     		outputArray[arrayCount] = parseFloat(string_annotation);
     		arrayCount++;
     		string_annotation = "";
     	}
     }

     return outputArray;
}

}