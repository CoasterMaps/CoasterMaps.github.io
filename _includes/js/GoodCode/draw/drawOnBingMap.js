function DrawOnBingMap() {

	
    this.drawAllAnnotationsOnBMap = function(bmap) {

      	var lati = new Array();
        var longi = new Array();

        var string_annotationsLat = myLocalStorage.getAnnotationsLat();
        var string_annotationsLong = myLocalStorage.getAnnotationsLong();

        lati = this.stringToArrayParser(string_annotationsLat);
        longi = this.stringToArrayParser(string_annotationsLong);

        myLocalStorage.setAnnotationsLat("");
        myLocalStorage.setAnnotationsLong("");

        var drawTag = new DrawTag(bmap);

        for (var counter=0; counter<longi.length; counter++) {
          drawTag.onBMap(new Microsoft.Maps.Location(lati[counter],longi[counter]));
        }

    }



this.stringToArrayParser = function(inputString) {

  // window.alert("hi");

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


/*
function drawAllAnnotationsOnBMap(bmap) {

//window.alert("hi1");


var lati = new Array();
var latiCount = 0;
var longi = new Array();
var longiCount = 0;

var string_annotationsLat="";
var string_annotationsLong="";


 if(typeof localStorage.annotationsLat !== 'undefined')
string_annotationsLat = localStorage.annotationsLat;

 if(typeof localStorage.annotationsLong !== 'undefined')
string_annotationsLong = localStorage.annotationsLong;

//window.alert("Lat:"+string_annotationsLat);
//window.alert("Longi:"+string_annotationsLong);


var string_annotation = "";
for (var counter=0; counter<string_annotationsLat.length; counter++) {

var currentCharLat =  string_annotationsLat.charAt(counter);


  if (currentCharLat!=='#')  {
     string_annotation += currentCharLat;
  }
  else {
   lati[latiCount] = parseFloat(string_annotation);
   latiCount++;
   string_annotation = "";
  }

 

}



string_annotation = "";
for (var counter=0; counter<string_annotationsLong.length; counter++) {

var currentCharLong =  string_annotationsLong.charAt(counter);

  if (currentCharLong!=='#')  {
     string_annotation += currentCharLong;
  }
  else {
   longi[longiCount] = parseFloat(string_annotation);
   longiCount++;
   string_annotation = "";
  }

}


 localStorage.annotationsLat = "";
 localStorage.annotationsLong = "";

  for (var counter=0; counter<longi.length; counter++) {
    drawTagOnBMap(bmap, new Microsoft.Maps.Location(lati[counter],longi[counter]));
  }


}
*/

