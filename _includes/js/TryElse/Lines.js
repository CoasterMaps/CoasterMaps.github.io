function Lines() {

    this.initArray = function () {

        this.array = new Array();
    }


    this.newRedLine = function () {

        var redLine = new Kinetic.Line({
            name: this.array.length,
            points: [],
            stroke: 'red',
            strokeWidth: globalLineStroke,
            lineCap: 'round',
            lineJoin: 'round'
        });

        redLine.on('dblclick', function (evt) {

            var shape = evt.targetNode;

            if (deleteMode !== 0) {

                lines.deleteItemNumber(parseInt(shape.attrs.name));
            }
        });

        var newLineContainer = new LineContainer(redLine);
        newLineContainer.getGeoPoints(redLine.points());

        this.array.push(newLineContainer);

        staticLayer.add(redLine);
    }


    this.deleteItemNumber = function (num) {

        this.array[num].getLine().hide();
        if (this.array.length > 1) this.array.splice(num, 1);
        else {
            this.array = [];
            lineGlobalString = "";
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

    this.deleteLastLineContainer = function () {

        return this.array.pop();
    }

    this.getLastLineContainer = function () {

        return this.array[this.array.length - 1];
    }


}