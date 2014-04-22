var overlay;
var toolTips;
var lines;
var handLines;

var mapLayer;

var currentToolType;
var currentToolTypePos;

var curViewQueue;

function SetEasel() {


    var googleMap = new GoogleMap();
    googleMap.initialize();

    document.getElementById("cancel-tool").disabled = false;
    document.getElementById("line-tool").disabled = false;
    document.getElementById("annotation-tool").disabled = false;
    document.getElementById("hand-tool").disabled = false;
    document.getElementById("delete-tool").disabled = false;
    //document.getElementById("get-tool").disabled = false;

    document.getElementById("save-tool").disabled = true;

    mapLayer = new MapLayer();

    overlay = new Overlay();


    toolTips = new ToolTips();
    toolTips.initArray();

    lines = new Lines();
    lines.initArray();


    handLines = new HandLines();
    handLines.initArray();


    overlay.setStage();


    overlay.uploadOverlay();
    currentToolType = new Array();
    currentToolTypePos = 0;



    curViewQueue = new CurrentDrawView();
    curViewQueue.initViewArray();




    var eventListener = new Events(googleMap, overlay);
    eventListener.setListeners();



    function get_value(callback) {
        jQuery.getJSON("{{ the_url }}", function (a, b) {

            d = JSON.stringify(a)
            callback(a)
        })
    }

    function get_annotation_from_database() {
        console.log("helo")
        $(document).ready(function () {
            get_value(function (value) {
               
                console.log(value)
                veraString = value;

                var saveDrawings = new Save();
                staticLayer.clear();

                var res = veraString.split("+");

                saveDrawings.getLines(res[0]);
                saveDrawings.getHandLines(res[1]);
                saveDrawings.getAnnot(res[2]);

                return value;
            });
        });
    }


}