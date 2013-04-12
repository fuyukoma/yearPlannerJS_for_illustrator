////////////////////

// User Setting
startYear = 2013;
startMonth = 4;
endYear = 2015;
endMonth = 3;
// Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6
keyDay = 4;

color1 = setColor(75.56, 64.33, 60.16, 16.13);
color2 = setColor(0, 0, 0, 0);

////////////////////

// lineCount and pageCount
var y = startYear;
var m = startMonth;
var monthCount = 0;
var lineCount = 0;
var pageCount = 0;
while(y != endYear || m != endMonth) {
	if(monthCount%3 == 0) {
		lineCount++;
	}
	if(monthCount%6 == 0) {
		pageCount++;
	}
	monthCount++;
	m++;
	if(m > 12) {
		y++;
		m = 1;
	}
}

// Document Size
// A4 : 210mm　* 297mm
// point = mm * 2.835
var doc = {"width": 210*2.835, "height": 297*2.835};
docObj = documents.add(DocumentColorSpace.CMYK, doc.width, doc.height, pageCount, DocumentArtboardLayout.GridByCol, 0);

// Set Date
firstDate = new Date(startYear, startMonth -1, 1);
startDateOfMonth = keyDay - firstDate.getDate() +1;
startDate = new Date(startYear, startMonth -1, startDateOfMonth);
tmpDate = startDate;
var prevYear;
var prevMonth;


for(l = 0; l < lineCount; l++) {
	// add Layer
	layObj = activeDocument.layers.add();
	layObj.name = "Layer " + l;
	activeObj = layObj;

	// add Main Line
	addPath(activeObj, 38.347, 47.19, 38.347, 47.19+735.955, 2, color1, {type:"solid"});
	addPath(activeObj, 38.347, 20.105, 38.347, 20.105+27.085, 2, color1, {type:"dash", d1: 0, d2: 4});

	// add Year Icon
	if(l%2 == 0 || prevYear != tmpDate.getFullYear()) {
		addPath(activeObj, 38.347, 780.785, 38.347, 780.785+31.478, 2, color1, {type:"solid"});
		yearIcon(activeObj, 10, 832.105, color1);
		addText(activeObj, 37.996, 816.662, 14, startDate.getFullYear(), color2);
		prevYear = tmpDate.getFullYear();
	} else {
		addPath(activeObj, 38.347, 780.785, 38.347, 780.785+31.478, 2, color1, {type:"dash", d1:0, d2:4});
	}

	// draw every week
	for(var i = 0; i < 13; i++) {
		d = 61.149*i;

		// add Monthly Icon
		if(prevMonth != tmpDate.getMonth()+1) {
			monthlyIcon(activeObj, 13.004, 788.49-d, color1);
			addText(activeObj, 23.015, 794.106-d, 12, tmpDate.getMonth()+1, color2);
			prevMonth = tmpDate.getMonth()+1;
		}

		addPath(activeObj, 35, 780.785-d, 277.64, 780.785-d, 1, color1, {type:"dash", d1: 3, d2: 3});
		addEllipse(activeObj, 31.26, 788.177-d, 14.173, color2, color1);
		addText(activeObj, 38.23, 778.262-(61.149*i), 9, tmpDate.getDate(), color1);

		tmpDate.setTime(tmpDate.getTime()+86400000*7);
	}

	// translate all items on active layer for right side
	for(i = 0; i < activeObj.pageItems.length; i++) {
		activeObj.pageItems[i].translate((doc.width/2)*l, 0)
	}
}

function addPath(layerObj, x1, y1, x2, y2, width, color, style) {
	pObj = layerObj.pathItems.add();
	pObj.setEntirePath( [ [x1,y1], [x2,y2] ] );
	pObj.filled = false;
	pObj.stroked = true;
	pObj.strokeWidth = width;
	pObj.strokeColor = color;
	if(style.type == "dash") {
		pObj.strokeDashes = [style.d1, style.d2];
		pObj.strokeCap = StrokeCap.ROUNDENDCAP;
	}
}

function addEllipse(layerObj, x, y, radius, fillColor, strokeColor) {
	pObj = layerObj.pathItems.ellipse(y, x, radius, radius);
	pObj.filled = true;
	pObj.stroked = true;
	pObj.strokeWidth = 1;
	pObj.fillColor = fillColor;
	pObj.strokeColor = strokeColor;
}

function addText(layerObj, x, y, size, str, color) {
	textObj = layerObj.textFrames.add();
	textObj.contents = str;
	textObj.pointType = PointType.CORNER;
	textObj.paragraphs[0].size = size;
	font = app.textFonts.getByName("Consolas");
	textObj.paragraphs[0].textFont = font;
	textObj.paragraphs[0].fillColor = color;
	textObj.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
	textObj.translate(x, y);
}

function yearIcon(layerObj, x, y, color) {
	pObj = docObj.pathItems.roundedRectangle(y, x, 56.692, 19.843, 7.087, 7.087);
	pObj.filled = true;
	pObj.stroked = false;
	pObj.fillColor = color;
}

function monthlyIcon(layerObj, x, y, color) {
	pObj = layerObj.pathItems.add();
	pObj.filled = true;
	pObj.stroked = false;
	pObj.fillColor = color;

	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [24.841796875,9.9208984375];
	nPathObj.leftDirection = [24.841796875,9.9208984375];
	nPathObj.rightDirection = [24.841796875,9.9208984375];
	nPathObj.pointType = PointType.CORNER;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [24.8427734375,9.92138671875];
	nPathObj.leftDirection = [24.8427734375,9.92138671875];
	nPathObj.rightDirection = [24.8427734375,9.92138671875];
	nPathObj.pointType = PointType.CORNER;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [24.8408203125,9.92138671875];
	nPathObj.leftDirection = [24.8408203125,9.92138671875];
	nPathObj.rightDirection = [22.3857421875,11.17138671875];
	nPathObj.pointType = PointType.CORNER;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [18.6357421875,15.4208984375];
	nPathObj.leftDirection = [20.5478515625,12.89453125];
	nPathObj.rightDirection = [17.0126953125,17.56640625];
	nPathObj.pointType = PointType.SMOOTH;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [9.9208984375,19.84228515625];
	nPathObj.leftDirection = [13.5537109375,19.84228515625];
	nPathObj.rightDirection = [4.4423828125,19.84228515625];
	nPathObj.pointType = PointType.SMOOTH;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [0,9.92138671875];
	nPathObj.leftDirection = [0.0009765625,15.400390625];
	nPathObj.rightDirection = [0,9.92138671875];
	nPathObj.pointType = PointType.CORNER;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [0,9.92138671875];
	nPathObj.leftDirection = [0,9.92138671875];
	nPathObj.rightDirection = [0,9.92138671875];
	nPathObj.pointType = PointType.CORNER;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [0,9.9208984375];
	nPathObj.leftDirection = [0,9.9208984375];
	nPathObj.rightDirection = [0,9.9208984375];
	nPathObj.pointType = PointType.SMOOTH;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [0,9.9208984375];
	nPathObj.leftDirection = [0,9.9208984375];
	nPathObj.rightDirection = [0,9.9208984375];
	nPathObj.pointType = PointType.CORNER;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [0,9.9208984375];
	nPathObj.leftDirection = [0,9.9208984375];
	nPathObj.rightDirection = [0.0009765625,4.44140625];
	nPathObj.pointType = PointType.CORNER;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [9.9208984375,0];
	nPathObj.leftDirection = [4.4423828125,0];
	nPathObj.rightDirection = [13.5537109375,0];
	nPathObj.pointType = PointType.SMOOTH;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [18.6357421875,4.421875];
	nPathObj.leftDirection = [17.0126953125,2.275390625];
	nPathObj.rightDirection = [20.5478515625,6.947265625];
	nPathObj.pointType = PointType.SMOOTH;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [24.8408203125,9.9208984375];
	nPathObj.leftDirection = [22.3857421875,8.6708984375];
	nPathObj.rightDirection = [24.8408203125,9.9208984375];
	nPathObj.pointType = PointType.CORNER;
	nPathObj = pObj.pathPoints.add();
	nPathObj.anchor = [24.8427734375,9.9208984375];
	nPathObj.leftDirection = [24.8427734375,9.9208984375];
	nPathObj.rightDirection = [24.8427734375,9.9208984375];
	nPathObj.pointType = PointType.CORNER;

	pObj.translate(x, y);
}

function setColor(c, m, y, k) {
	var tmpColor = new CMYKColor();
	tmpColor.cyan = c;
	tmpColor.magenta = m;
	tmpColor.yellow = y;
	tmpColor.black = k;
	return tmpColor;
}