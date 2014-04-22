function HandLines() {


    this.initArray = function () {

        this.array = new Array();
    }


    this.newRedLine = function () {

        var redLine = new Kinetic.Line({
            name: this.array.length,
            points: [],
            stroke: 'red',
            strokeWidth: globalHandLineStroke,
            lineCap: 'round',
            lineJoin: 'round'
        });

        redLine.on('dblclick', function (evt) {

            var shape = evt.targetNode;

            if (deleteMode !== 0) {

                handLines.deleteItemNumber(parseInt(shape.attrs.name));
            }

        });

        var newHandLineContainer = new HandLineContainer(redLine);
        newHandLineContainer.getGeoPoints(redLine.points());

        this.array.push(newHandLineContainer);

        staticLayer.add(redLine);

        return redLine;
    }


    this.deleteItemNumber = function (num) {

        this.array[num].getLine().hide();
        if (this.array.length > 1) this.array.splice(num, 1);
        else {
            this.array = [];
            handLinesGlobalString = "";
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


    this.deleteLastLineContainer = function () {
        this.array.pop();
    }

    this.returnArray = function () {

        return this.array;
    }

    this.clearArray = function () {

        this.array = [];
    }

    this.getLastLineContainer = function () {

        return this.array[this.array.length - 1];
    }


}