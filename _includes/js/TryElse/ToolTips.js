function ToolTips() {


    this.initArray = function () {

        this.array = new Array();
    }


    this.addToolTip = function (x, y, name) {

        var tooltip = new Kinetic.Label({
            x: x - 60 + mapLayerState.getDiffX(),
            y: y + mapLayerState.getDiffY(),
            opacity: 0.75
        });

        tooltip.add(new Kinetic.Tag({
            fill: 'black',
            pointerDirection: 'down',
            pointerWidth: 10,
            pointerHeight: 10,
            lineJoin: 'round',
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: {
                x: 10,
                y: 20
            },
            shadowOpacity: 0.5
        }));

        
        tooltip.add(new Kinetic.Text({
            name: this.array.length,
            text: name, //annotText,
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 5,
            fill: 'white'
        }));

        tooltip.on('dblclick', function (evt) {
            
            if (deleteMode!==0) {
            var shape = evt.targetNode;
            toolTips.deleteItemNumber(parseInt(shape.attrs.name));
            }
        });

        var toolTipGeo = new Array();

        toolTipGeo[0] = tooltip;

        var currentLayerPoint = new google.maps.Point(x - 60, y);
        toolTipGeo[1] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);

        this.array.push(toolTipGeo);
     }

    this.deleteLastItem = function () {

        this.array.pop();
    }


    this.deleteItemNumber = function (num) {

        this.array[num][0].hide();

        if (this.array.length > 1) this.array.splice(num, 1);
        else {
            this.array = [];
            annotGlobalString = "";
        }

      
        curViewQueue.newPrevView(curViewQueue.getCurrentView());
        var newAnnotString = curViewQueue.getCurrentView();

        staticLayer.clear();
        overlay.hideAll();


        if (newAnnotString !== undefined) {

            var saveDrawings = new Save();

            var res = newAnnotString.split("+");

            saveDrawings.getLines("lines", res[1]);

            saveDrawings.getLines("handLines", res[2]);

            saveDrawings.getAnnot(res[0]);

        }

    }



    this.returnArray = function () {

        return this.array;
    }

    this.clearArray = function () {

        this.array = [];
    }

    this.returnCounter = function () {

        return this.array.length;
    }


}