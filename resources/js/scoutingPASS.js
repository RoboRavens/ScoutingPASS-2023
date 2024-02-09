// ScoutingPASS.js
//
// The guts of the ScountingPASS application
// Written by Team 2451 - PWNAGE

document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchend", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var xThreshold = 0.3;
var slide = 0;
var enableGoogleSheets = false;
var checkboxAs = 'YN';

// Options
var options = {
  correctLevel: QRCode.CorrectLevel.L,
  quietZone: 15,
  quietZoneColor: '#FFFFFF'
};

// Must be filled in: e=event, m=match#, l=level(q,qf,sf,f), t=team#, r=robot(r1,r2,b1..), s=scouter
//var requiredFields = ["e", "m", "l", "t", "r", "s", "as"];
var requiredFields = ["e", "m", "l", "r", "s", "as"];

function addTimer(table, idx, name, data) {
  var row = table.insertRow(idx);
  var cell1 = row.insertCell(0);
  cell1.setAttribute("colspan", 2);
  cell1.setAttribute("style", "text-align: center;");
  cell1.classList.add("title");
  if (!data.hasOwnProperty('code')) {
    cell1.innerHTML = `Error: No code specified for ${name}`;
    return idx + 1;
  }
  cell1.innerHTML = name;
  if (data.hasOwnProperty('tooltip')) {
    cell1.setAttribute("title", data.tooltip);
  }

  idx += 1
  row = table.insertRow(idx);
  cell = row.insertCell(0);
  cell.setAttribute("colspan", 2);
  cell.setAttribute("style", "text-align: center;");
  if (data.type == 'cycle') {
    var ct = document.createElement('input');
    ct.setAttribute("type", "hidden");
    ct.setAttribute("id", "cycletime_" + data.code);
    ct.setAttribute("value", "[]");
    cell.appendChild(ct);
    ct = document.createElement('input');
    ct.setAttribute("type", "text");
    ct.setAttribute("id", "display_" + data.code);
    ct.setAttribute("value", "");
    ct.setAttribute("disabled", "");
    cell.appendChild(ct);
    var lineBreak = document.createElement("br");
    cell.appendChild(lineBreak);
  }

  var inp = document.createElement("input");
  if (data.type == 'timer') {
    inp.classList.add("timer");
  } else {
    inp.classList.add("cycle");
  }
  inp.setAttribute("id", "input_" + data.code);
  inp.setAttribute("type", "text");
  if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
    inp.setAttribute("name", data.gsCol);
  } else {
    inp.setAttribute("name", data.code);
  }
  inp.setAttribute("style", "background-color: black; color: white;border: none; text-align: center;");
  inp.setAttribute("disabled", "");
  inp.setAttribute("value", 0);
  inp.setAttribute("size", 7);
  inp.setAttribute("maxLength", 7);
  
  if(data.code == "ddt") {
  var button1 = document.createElement("input");
  button1.setAttribute("id", "start_" + data.code);
  button1.setAttribute("type", "button");
  button1.setAttribute("onclick", "timer(this.parentElement)");
  button1.setAttribute("value", "Start");
  cell.appendChild(button1);
  var button2 = document.createElement("input");
    button2.setAttribute("id", "cycle_" + data.code);
    button2.setAttribute("type", "button");
    button2.setAttribute("onclick", "newCycle(this.parentElement)");
    button2.setAttribute("value", "Engaged");
    cell.appendChild(button2);
	 cell.appendChild(inp);
	 var button2 = document.createElement("input");
    button2.setAttribute("id", "undo_" + data.code);
    button2.setAttribute("type", "button");
    button2.setAttribute("onclick", "undoCycle(this.parentElement)");
    button2.setAttribute("value", "Feed");
    button2.setAttribute('style', "margin-left: 20px;");
    cell.appendChild(button2);
	var button4 = document.createElement("input");
  button4.setAttribute("id", "clear_" + data.code);
  button4.setAttribute("type", "button");
  button4.setAttribute("onclick", "resetTimer(this.parentElement)");
  button4.setAttribute("value", "Reset");
  cell.appendChild(button4);
  }
   if(data.code == "dddt") {
  var button1 = document.createElement("input");
  button1.setAttribute("id", "start_" + data.code);
  button1.setAttribute("type", "button");
  button1.setAttribute("onclick", "timer(this.parentElement)");
  button1.setAttribute("value", "Docked");
  cell.appendChild(button1);
  var button2 = document.createElement("input");
    button2.setAttribute("id", "cycle_" + data.code);
    button2.setAttribute("type", "button");
    button2.setAttribute("onclick", "newCycle(this.parentElement)");
    button2.setAttribute("value", "Engaged");
    cell.appendChild(button2);
	 cell.appendChild(inp);
	 var button3 = document.createElement("input");
    button3.setAttribute("id", "undo_" + data.code);
    button3.setAttribute("type", "button");
    button3.setAttribute("onclick", "undoCycle(this.parentElement)");
    button3.setAttribute("value", "Undo");
    button3.setAttribute('style', "margin-left: 20px;");
    cell.appendChild(button3);
	var button4 = document.createElement("input");
  button4.setAttribute("id", "clear_" + data.code);
  button4.setAttribute("type", "button");
  button4.setAttribute("onclick", "resetTimer(this.parentElement)");
  button4.setAttribute("value", "Reset");
  cell.appendChild(button4);
  }
   
if(data.code == "tct") {
  var button1 = document.createElement("input");
  button1.setAttribute("id", "start_" + data.code);
  button1.setAttribute("type", "button");
  button1.setAttribute("onclick", "timer(this.parentElement)");
  button1.setAttribute("value", "Start");
  button1.setAttribute('style', "Background-color: #4f884f");
  cell.appendChild(button1);
  cell.appendChild(inp);
 var button2 = document.createElement("input");
  button2.setAttribute("id", "cycle_" + data.code);
  button2.setAttribute("type", "button");
  button2.setAttribute("onclick", "newCycle(this.parentElement)");
  button2.setAttribute("value", "Pickup");
  cell.appendChild(button2);
  cell.appendChild(button2);
  cell.appendChild(button2);

  //var lineBreak = document.createElement("br");
  //cell.appendChild(lineBreak);
  
  var button2 = document.createElement("input");
  button2.setAttribute("id", "undo_" + data.code);
  button2.setAttribute("type", "button");
  button2.setAttribute("onclick", "undoCycle(this.parentElement)");
  button2.setAttribute("value", "Undo");
  button2.setAttribute('style', "margin-left: 20px; Background-color: #D23232");
  cell.appendChild(button2);
  
  
  var lineBreak = document.createElement("br");
  cell.appendChild(lineBreak);

  var ampButton = document.createElement("input");
  ampButton.setAttribute("id", "amper_" + data.code);
  ampButton.setAttribute("type", "button");
  ampButton.setAttribute("onclick", "newCycle(this.parentElement); addShotTypeAmpScore(this.parentElement); addXToFinalArray()");
  ampButton.setAttribute("value", "Amp Score");
  ampButton.setAttribute('style', "margin-top: 10px; margin-bottom: 1px; Background-color: #D23232; width: 200px; height: 50px");
  cell.appendChild(ampButton);

}
if(data.code == "act") {
  var button1 = document.createElement("input");
  button1.setAttribute("id", "start_" + data.code);
  button1.setAttribute("type", "button");
  button1.setAttribute("onclick", "timer(this.parentElement)");
  button1.setAttribute("value", "Start");
  button1.setAttribute('style', "Background-color: #4f884f");	
  cell.appendChild(button1);
  cell.appendChild(inp);
  
  //THIS BUTTON DOES NOTHING, IF YOU DELETE IT, THE FIELD CLICK WILL LAG REALLY BAD
  // DO NOT DELETE > button2.setAttribute("type", "hidden");
  
  var button2 = document.createElement("input"); 
  button2.setAttribute("id", "cycle_" + data.code);
  button2.setAttribute("type", "button");
  button2.setAttribute("onclick", "newCycle(this.parentElement)");
  button2.setAttribute("value", "Pickup");
  button2.setAttribute("type", "hidden");
  cell.appendChild(button2);
  cell.appendChild(button2);
  cell.appendChild(button2);
  
  var button3 = document.createElement("input");
  button3.setAttribute("id", "undo_" + data.code);
  button3.setAttribute("type", "button");
  button3.setAttribute("onclick", "undoCycle(this.parentElement)");
  button3.setAttribute("value", "Undo");
  button3.setAttribute('style', "Background-color: #D23232");
  cell.appendChild(button3);
  
  
  var lineBreak = document.createElement("br");
  cell.appendChild(lineBreak);

  
}

  idx += 1
  row = table.insertRow(idx);
  row.setAttribute("style", "display:none");
  cell = row.insertCell(0);
  cell.setAttribute("colspan", 2);
  cell.setAttribute("style", "text-align: center;");
  var inp = document.createElement('input');
  inp.setAttribute("type", "hidden");
  inp.setAttribute("id", "status_" + data.code);
  inp.setAttribute("value", "stopped");
  cell.appendChild(inp);
  inp = document.createElement('input');
  inp.setAttribute("hidden", "");
  inp.setAttribute("id", "intervalId_" + data.code);
  inp.setAttribute("value", "");
  cell.appendChild(inp);

  if (data.hasOwnProperty('defaultValue')) {
    var def = document.createElement("input");
    def.setAttribute("id", "default_" + data.code)
    def.setAttribute("type", "hidden");
    def.setAttribute("value", data.defaultValue);
    cell2.appendChild(def);
  }

  return idx + 1;
}

function addCounter(table, idx, name, data) {
  var row = table.insertRow(idx);
  var cell1 = row.insertCell(0);
  cell1.classList.add("title");
  if (!data.hasOwnProperty('code')) {
    cell1.innerHTML = `Error: No code specified for ${name}`;
    return idx + 1;
  }
  var cell2 = row.insertCell(1);
  cell1.innerHTML = name + '&nbsp;';
  if (data.hasOwnProperty('tooltip')) {
    cell1.setAttribute("title", data.tooltip);
  }
  cell2.classList.add("field");

  var button1 = document.createElement("input");
  button1.setAttribute("type", "button");
  button1.setAttribute("onclick", "counter(this.parentElement, -1)");
  button1.setAttribute("value", "-");
  button1.setAttribute("style", "color: white; background-color: #7514D5; padding-right: 15px; padding-left: 15px; padding-top: 23px; padding-bottom: 23px");
  cell2.appendChild(button1);

  var inp = document.createElement("input");
  inp.classList.add("counter");
  inp.setAttribute("id", "input_" + data.code);
  inp.setAttribute("type", "text");
  if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
    inp.setAttribute("name", data.gsCol);
  } else {
    inp.setAttribute("name", data.code);
  }
  inp.setAttribute("style", "background-color: #2F4F4F; color: white; font-weight: bold; border: none; text-align: center; padding-right: 25px; padding-left: 25px; padding-top: 25px; padding-bottom: 25px");
  inp.setAttribute("disabled", "");
  inp.setAttribute("value", 0);
  inp.setAttribute("size", 2);
  inp.setAttribute("maxLength", 2);
  cell2.appendChild(inp);

  var button2 = document.createElement("input");
  button2.setAttribute("type", "button");
  button2.setAttribute("onclick", "counter(this.parentElement, 1)");
  button2.setAttribute("value", "+");
  button2.setAttribute("style", "background-color: #1F61E6; padding-right: 15px; padding-left: 15px; padding-top: 23px; padding-bottom: 23px");
  cell2.appendChild(button2);

  if (data.hasOwnProperty('defaultValue')) {
    var def = document.createElement("input");
    def.setAttribute("id", "default_" + data.code)
    def.setAttribute("type", "hidden");
    def.setAttribute("value", data.defaultValue);
    cell2.appendChild(def);
  }

  return idx + 1;
}

function addClickableImage(table, idx, name, data) {
  var row = table.insertRow(idx);
  var cell = row.insertCell(0);
  cell.setAttribute("colspan", 3);
  cell.setAttribute("style", "text-align: center;");
  cell.classList.add("title");
  if (!data.hasOwnProperty('code')) {
    cell1.innerHTML = `Error: No code specified for ${name}`;
    return idx + 1;
  }
  cell.innerHTML = name;
  if (data.hasOwnProperty('tooltip')) {
    cell.setAttribute("title", data.tooltip);
  }

  let showFlip = true;
  if (data.hasOwnProperty('showFlip')) {
    if (data.showFlip.toLowerCase() == 'false') {
      showFlip = false;
    }
  }

  let showUndo = true;
  if (data.hasOwnProperty('showUndo')) {
    if (data.showUndo.toLowerCase() == 'false') {
      showUndo = false;
    }
  }

  if (showFlip || showUndo) {
    idx += 1
    row = table.insertRow(idx);
    cell = row.insertCell(0);
    cell.setAttribute("colspan", 2);
    cell.setAttribute("style", "text-align: center;");

    if (showUndo) {
      // Undo button
      let undoButton = document.createElement("input");
      undoButton.setAttribute("type", "button");
      undoButton.setAttribute("onclick", "undo(this.parentElement)");
      undoButton.setAttribute("value", "Undo");
      undoButton.setAttribute("id", "undo_" + data.code);
      undoButton.setAttribute("class", "undoButton");
      cell.appendChild(undoButton);
    }

    if (showFlip) {
      // Flip button
      let flipButton = document.createElement("input");
      flipButton.setAttribute("type", "button");
      flipButton.setAttribute("onclick", "flip(this.parentElement)");
      flipButton.setAttribute("value", "Flip Image");
      flipButton.setAttribute("id", "flip_" + data.code);
      flipButton.setAttribute("class", "flipButton");
      if (showUndo) {
        flipButton.setAttribute("margin-left", '8px');
      }
      cell.appendChild(flipButton);
    }
  }

  idx += 1;
  row = table.insertRow(idx);
  cell = row.insertCell(0);
  cell.setAttribute("colspan", 2);
  cell.setAttribute("style", "text-align: center;");
  var canvas = document.createElement('canvas');
  //canvas.onclick = onFieldClick;
  canvas.setAttribute("onclick", "onFieldClick(event)");
  canvas.setAttribute("class", "field-image-src");
  canvas.setAttribute("id", "canvas_" + data.code);
  canvas.innerHTML = "No canvas support";
  cell.appendChild(canvas);

  idx += 1;
  row = table.insertRow(idx);
  row.setAttribute("style", "display:none");
  cell = row.insertCell(0);
  cell.setAttribute("colspan", 2);
  var inp = document.createElement('input');
  inp.setAttribute("type", "hidden");
  inp.setAttribute("id", "XY_" + data.code);
  inp.setAttribute("value", "[]");
  cell.appendChild(inp);
  inp = document.createElement('input');
  inp.setAttribute("hidden", "");
  if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
    inp.setAttribute("name", data.gsCol);
  } else {
    inp.setAttribute("name", data.code);
  }
  inp.setAttribute("id", "input_" + data.code);
  inp.setAttribute("value", "[]");
  inp.setAttribute("class", "clickableImage");
 
  cell.appendChild(inp);

  // TODO: Make these more efficient/elegant
  inp = document.createElement('input');
  inp.setAttribute("hidden", "");
  inp.setAttribute("id", "clickRestriction_" + data.code);
  inp.setAttribute("value", "none");
  if (data.hasOwnProperty('clickRestriction')) {
    if ((data.clickRestriction == "one") ||
        (data.clickRestriction == "onePerBox")) {
          inp.setAttribute("value", data.clickRestriction);
    }
  }
  cell.appendChild(inp);

  inp = document.createElement('input');
  inp.setAttribute("hidden", "");
  inp.setAttribute("id", "dimensions_" + data.code);
  inp.setAttribute("value", "12 6");
  if (data.hasOwnProperty('dimensions')) {
    if (data.dimensions != "") {
      // TODO: Add validation for "X Y" format
      inp.setAttribute("value", data.dimensions);
    }
  }
  cell.appendChild(inp);

  inp = document.createElement('input');
  inp.setAttribute("hidden", "");
  inp.setAttribute("id", "shape_" + data.code);
  // Default shape: white circle of size 5 not filled in
  inp.setAttribute("value", "circle 5 white white true");
  if (data.hasOwnProperty('shape')) {
    if (data.shape != "") {
      // TODO: Add validation for "shape size color fill" format
      inp.setAttribute("value", data.shape);
    }
  }
  cell.appendChild(inp);

  inp = document.createElement('input');
  inp.setAttribute("hidden", "");
  inp.setAttribute("id", "toggleClick_" + data.code);
  inp.setAttribute("value", "false");
  if (data.hasOwnProperty('toggleClick')) {
    if (data.toggleClick != "") {
      // TODO: Add validation for true/false format
      inp.setAttribute("value", data.toggleClick);
    }
  }
  cell.appendChild(inp);

  if (data.hasOwnProperty('cycleTimer')) {
    if (data.cycleTimer != "") {
      inp = document.createElement('input');
      inp.setAttribute("hidden", "");
      inp.setAttribute("id", "cycleTimer_" + data.code);
      inp.setAttribute("value", data.cycleTimer);
      cell.appendChild(inp);
    }
  }

  idx += 1
  row = table.insertRow(idx);
  row.setAttribute("style", "display:none");
  cell = row.insertCell(0);
  cell.setAttribute("colspan", 2);
  var img = document.createElement('img');
  img.src = data.filename;
  img.setAttribute("id", "img_" + data.code);
  img.setAttribute("class", "field-image-src");
  img.setAttribute("onload", "drawFields()");
  img.setAttribute("hidden", "");
  cell.appendChild(img);

  return idx + 1
}

function addButton(table, idx, name, data) {
  
  //SETUP CODE

  var row = table.insertRow(idx);
  var cell1 = row.insertCell(0);
  cell1.setAttribute("colspan", 2);
  cell1.setAttribute("style", "text-align: center;");
  cell1.classList.add("title");
  if (!data.hasOwnProperty('code')) {
    cell1.innerHTML = `Error: No code specified for ${name}`;
    return idx + 1;
  }
  cell1.innerHTML = name;
  if (data.hasOwnProperty('tooltip')) {
    cell1.setAttribute("title", data.tooltip);
  }

  idx += 1
  row = table.insertRow(idx);
  cell = row.insertCell(0);
  cell.setAttribute("colspan", 2);
  cell.setAttribute("style", "text-align: center;");
  
  if (data.type == 'button') {
    var ct = document.createElement('input');
    ct.setAttribute("type", "hidden");
    ct.setAttribute("id", "input_" + data.code);
    ct.setAttribute("value", "[]");
    ct.setAttribute("class", "buttonClass");
    cell.appendChild(ct);
    ct = document.createElement('input');
    ct.setAttribute("type", "text");
    ct.setAttribute("id", "display_" + data.code);
    ct.setAttribute("value", "");
    ct.setAttribute("disabled", "");
    ct.setAttribute("class", "buttonClass");
    cell.appendChild(ct);
    var lineBreak = document.createElement("br");
    cell.appendChild(lineBreak);
  }


  var inp = document.createElement("input");
  inp.classList.add("button");
  inp.setAttribute("id", "input_" + data.code);
  inp.setAttribute("type", "text");
  if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
    inp.setAttribute("name", data.gsCol);
  } else {
    inp.setAttribute("name", data.code);
  }
  inp.setAttribute("style", "background-color: black; color: white;border: none; text-align: center;");
  inp.setAttribute("disabled", "");
  inp.setAttribute("value", 0);
  inp.setAttribute("size", 7);
  inp.setAttribute("maxLength", 7);


  //BUTTONS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  var button1 = document.createElement("input");
  button1.setAttribute("id", "amped_" + data.code);
  button1.setAttribute("type", "button");
  button1.setAttribute("onclick", "addShotTypeAmped(this.parentElement)");
  button1.setAttribute("value", "Amped");
  cell.appendChild(button1);

  var button2 = document.createElement("input");
  button2.setAttribute("id", "miss_" + data.code);
  button2.setAttribute("type", "button");
  button2.setAttribute("onclick", "addShotTypeMiss(this.parentElement)");
  button2.setAttribute("value", "Miss");
  cell.appendChild(button2);

  var button3 = document.createElement("input");
  button3.setAttribute("id", "normal_" + data.code);
  button3.setAttribute("type", "button");
  button3.setAttribute("onclick", "addShotTypeNormal(this.parentElement)");
  button3.setAttribute("value", "Normal");
  cell.appendChild(button3);
}

function addText(table, idx, name, data) {
  var row = table.insertRow(idx);
  var cell1 = row.insertCell(0);
  cell1.classList.add("title");
  if (!data.hasOwnProperty('code')) {
    cell1.innerHTML = `Error: No code specified for ${name}`;
    return idx + 1;
  }
  var cell2 = row.insertCell(1);
  cell1.innerHTML = name + '&nbsp;';
  if (data.hasOwnProperty('tooltip')) {
    cell1.setAttribute("title", data.tooltip);
  }
  cell2.classList.add("field");
  var inp = document.createElement("input");
  inp.setAttribute("id", "input_" + data.code);
  inp.setAttribute("type", "text");
  if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
    inp.setAttribute("name", data.gsCol);
  } else {
    inp.setAttribute("name", data.code);
  }
  if (data.hasOwnProperty('size')) {
    inp.setAttribute("size", data.size);
  }
  if (data.hasOwnProperty('maxSize')) {
    inp.setAttribute("maxLength", data.maxSize);
  }
  if (data.hasOwnProperty('defaultValue')) {
    inp.setAttribute("value", data.defaultValue);
  }
  if (data.hasOwnProperty('required')) {
    inp.setAttribute("required", "");
  }
  if (data.hasOwnProperty('disabled')) {
    inp.setAttribute("disabled", "");
  }
  cell2.appendChild(inp);

  if (data.hasOwnProperty('defaultValue')) {
    var def = document.createElement("input");
    def.setAttribute("id", "default_" + data.code)
    def.setAttribute("type", "hidden");
    def.setAttribute("value", data.defaultValue);
    cell2.appendChild(def);
  }

  return idx + 1
}

function addNumber(table, idx, name, data) {
  var row = table.insertRow(idx);
  var cell1 = row.insertCell(0);
  cell1.classList.add("title");
  if (!data.hasOwnProperty('code')) {
    cell1.innerHTML = `Error: No code specified for ${name}`;
    return idx + 1;
  }
  var cell2 = row.insertCell(1);
  cell1.innerHTML = name + '&nbsp;';
  if (data.hasOwnProperty('tooltip')) {
    cell1.setAttribute("title", data.tooltip);
  }
  cell2.classList.add("field");
  var inp = document.createElement("input");
  inp.setAttribute("id", "input_" + data.code);
  inp.setAttribute("type", "number");
  if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
    inp.setAttribute("name", data.gsCol);
  } else {
    inp.setAttribute("name", data.code);
  }
  if ((data.type == 'team') ||
    (data.type == 'match')) {
    inp.setAttribute("onchange", "updateMatchStart(event)");
  }
  if (data.hasOwnProperty('min')) {
    inp.setAttribute("min", data.min);
  }
  if (data.hasOwnProperty('max')) {
    inp.setAttribute("max", data.max);
  }
  if (data.hasOwnProperty('defaultValue')) {
    inp.setAttribute("value", data.defaultValue);
  }
  if (data.hasOwnProperty('disabled')) {
    inp.setAttribute("disabled", "");
  }
  if (data.hasOwnProperty('required')) {
    inp.setAttribute("required", "");
  }
  cell2.appendChild(inp);

  if (data.hasOwnProperty('defaultValue')) {
    var def = document.createElement("input");
    def.setAttribute("id", "default_" + data.code)
    def.setAttribute("type", "hidden");
    def.setAttribute("value", data.defaultValue);
    cell2.appendChild(def);
  }

  if (data.type == 'team') {
    idx += 1
    row = table.insertRow(idx);
    cell1 = row.insertCell(0);
    cell1.setAttribute("id", "teamname-label");
    cell1.setAttribute("colspan", 2);
    cell1.setAttribute("style", "text-align: center;");
  }

  return idx + 1;
}

function addRadio(table, idx, name, data) {
  var row = table.insertRow(idx);
  var cell1 = row.insertCell(0);
  cell1.classList.add("title");
  if (!data.hasOwnProperty('code')) {
    cell1.innerHTML = `Error: No code specified for ${name}`;
    return idx + 1;
  }
  var cell2 = row.insertCell(1);
  cell1.innerHTML = name + '&nbsp;';
  if (data.hasOwnProperty('tooltip')) {
    cell1.setAttribute("title", data.tooltip);
  }
  cell2.classList.add("field");
  if ((data.type == 'level') ||
    (data.type == 'robot')
  ) {
    cell2.setAttribute("onchange", "updateMatchStart(event)");
  }
  var checked = null
  if (data.hasOwnProperty('defaultValue')) {
    checked = data.defaultValue;
  }
  if (data.hasOwnProperty('choices')) {
    keys = Object.keys(data.choices);
    keys.forEach(c => {
      var inp = document.createElement("input");
      inp.setAttribute("id", "input_" + data.code + "_" + c);
      inp.setAttribute("type", "radio");
      if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
        inp.setAttribute("name", data.gsCol);
      } else {
        inp.setAttribute("name", data.code);
      }
      inp.setAttribute("value", c);
      if (checked == c) {
        inp.setAttribute("checked", "");
      }
      cell2.appendChild(inp);
      cell2.innerHTML += data.choices[c];
    });
  }
  var inp = document.createElement("input");
  inp.setAttribute("id", "display_" + data.code);
  inp.setAttribute("hidden", "");
  inp.setAttribute("value", "");
  cell2.appendChild(inp);

  if (data.hasOwnProperty('defaultValue')) {
    var def = document.createElement("input");
    def.setAttribute("id", "default_" + data.code)
    def.setAttribute("type", "hidden");
    def.setAttribute("value", data.defaultValue);
    cell2.appendChild(def);
  }

  return idx + 1;
}

function addCheckbox(table, idx, name, data) {
  var row = table.insertRow(idx);
  var cell1 = row.insertCell(0);
  cell1.classList.add("title");
  if (!data.hasOwnProperty('code')) {
    cell1.innerHTML = `Error: No code specified for ${name}`;
    return idx + 1;
  }
  var cell2 = row.insertCell(1);
  cell1.innerHTML = name + '&nbsp;';
  if (data.hasOwnProperty('tooltip')) {
    cell1.setAttribute("title", data.tooltip);
  }
  cell2.classList.add("field");
  var inp = document.createElement("input");
  inp.setAttribute("id", "input_" + data.code);
  inp.setAttribute("type", "checkbox");
  if (enableGoogleSheets && data.hasOwnProperty('gsCol')) {
    inp.setAttribute("name", data.gsCol);
  } else {
    inp.setAttribute("name", data.code);
  }
  cell2.appendChild(inp);

  if (data.type == 'bool') {
    cell2.innerHTML += "(checked = Yes)";
  }

  if (data.hasOwnProperty('defaultValue')) {
    var def = document.createElement("input");
    def.setAttribute("id", "default_" + data.code)
    def.setAttribute("type", "hidden");
    def.setAttribute("value", data.defaultValue);
    cell2.appendChild(def);
  }

  return idx + 1;
}

function addElement(table, idx, data) {
  var type = null;
  var name = 'Default Name';
  if (data.hasOwnProperty('name')) {
    name = data.name
  }
  if (data.hasOwnProperty('type')) {
    type = data.type
  } else {
    console.log("No type specified");
    console.log("Data: ")
    console.log(data);
    err = { code: "err", defaultValue: "No type specified: " + data };
    idx = addText(table, idx, name, err);
    return
  }
  if (type == 'counter') {
    idx = addCounter(table, idx, name, data);
  } else if ((data.type == 'scouter') ||
    (data.type == 'event') ||
    (data.type == 'text')
  ) {
    idx = addText(table, idx, name, data);
  } else if ((data.type == 'level') ||
    (data.type == 'radio') ||
    (data.type == 'robot')
  ) {
    idx = addRadio(table, idx, name, data);
  } else if ((data.type == 'match') ||
    (data.type == 'team') ||
    (data.type == 'number')
  ) {
    idx = addNumber(table, idx, name, data);
  } else if ((data.type == 'field_image') ||
  			 (data.type == 'clickable_image')) {
    idx = addClickableImage(table, idx, name, data);
  } else if ((data.type == 'bool') ||
    (data.type == 'checkbox') ||
    (data.type == 'pass_fail')
  ) {
    idx = addCheckbox(table, idx, name, data);
  } else if (data.type == 'counter') {
    idx = addCounter(table, idx, name, data);
  } else if (data.type == 'button') {
    idx = addButton(table, idx, name, data);
  } else if ((data.type == 'timer') ||
	     (data.type == 'cycle')) {
    idx = addTimer(table, idx, name, data);
  } else {
    console.log(`Unrecognized type: ${data.type}`);
  }
  return idx
}

function configure() {
  try {
    var mydata = JSON.parse(config_data);
  } catch (err) {
    console.log(`Error parsing configuration file`)
    console.log(err.message)
    console.log('Use a tool like http://jsonlint.com/ to help you debug your config file')
    var table = document.getElementById("prematch_table")
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = `Error parsing configuration file: ${err.message}<br><br>Use a tool like <a href="http://jsonlint.com/">http://jsonlint.com/</a> to help you debug your config file`
    return -1
  }

  if (mydata.hasOwnProperty('title')) {
    document.title = mydata.title;
  }

  if (mydata.hasOwnProperty('page_title')) {
    var elements = document.getElementsByClassName("page_title");
    for (var i = 0; i < elements.length; i++) {
      elements[i].innerHTML = mydata.page_title;
    }
  }

  if (mydata.hasOwnProperty('enable_google_sheets')) {
    if ((mydata.enable_google_sheets == 'true') ||
      (mydata.enable_google_sheets == 'True') ||
      (mydata.enable_google_sheets == 'TRUE')) {
      enableGoogleSheets = true;
    }
  }

  if (mydata.hasOwnProperty('checkboxAs')) {
    // Supported modes
    // YN - Y or N
    // TF - T or F
    // 10 - 1 or 0
    if ((mydata.checkboxAs == 'YN') ||
      (mydata.checkboxAs == 'TF') ||
      (mydata.checkboxAs == '10')) {
      console.log("Setting checkboxAs to " + mydata.checkboxAs);
      checkboxAs = mydata.checkboxAs;
    } else {
      console.log("unrecognized checkboxAs setting.  Defaulting to YN.")
      checkboxAs = 'YN';
    }
  }

  // Configure prematch screen
  var pmc = mydata.prematch;
  var pmt = document.getElementById("prematch_table");
  var idx = 0;
  pmc.forEach(element => {
    idx = addElement(pmt, idx, element);
  });

  // Configure auton screen
  var ac = mydata.auton;
  var at = document.getElementById("auton_table");
  idx = 0;
  ac.forEach(element => {
    idx = addElement(at, idx, element);
  });

  // Configure teleop screen
  var tc = mydata.teleop;
  var tt = document.getElementById("teleop_table");
  idx = 0;
  tc.forEach(element => {
    idx = addElement(tt, idx, element);
  });

  // Configure postmatch screen
  pmc = mydata.postmatch;
  pmt = document.getElementById("postmatch_table");
  var idx = 0;
  pmc.forEach(element => {
    idx = addElement(pmt, idx, element);
  });

  if (!enableGoogleSheets) {
    document.getElementById("submit").style.display = "none";
  }

  return 0
}

function getRobot() {
  if (document.getElementById("input_r_r1").checked) {
    return "r1";
  } else if (document.getElementById("input_r_r2").checked) {
    return "r2";
  } else if (document.getElementById("input_r_r3").checked) {
    return "r3";
  } else if (document.getElementById("input_r_b1").checked) {
    return "b1";
  } else if (document.getElementById("input_r_b2").checked) {
    return "b2";
  } else if (document.getElementById("input_r_b3").checked) {
    return "b3";
  } else {
    return "";
  }
}

function validateRobot() {
  if (document.getElementById("input_r_r1").checked ||
    document.getElementById("input_r_r2").checked ||
    document.getElementById("input_r_r3").checked ||
    document.getElementById("input_r_b1").checked ||
    document.getElementById("input_r_b2").checked ||
    document.getElementById("input_r_b3").checked
  ) {
    return true
  } else {

    return false
  }
}

function resetRobot() {
  if (document.getElementById("input_r_r1").checked) {
    document.getElementById("input_r_r1").checked = false
  }
  if (document.getElementById("input_r_r2").checked) {
    document.getElementById("input_r_r2").checked = false
  }
  if (document.getElementById("input_r_r3").checked) {
    document.getElementById("input_r_r3").checked = false
  }
  if (document.getElementById("input_r_b1").checked) {
    document.getElementById("input_r_b1").checked = false
  }
  if (document.getElementById("input_r_b2").checked) {
    document.getElementById("input_r_b2").checked = false
  }
  if (document.getElementById("input_r_b3").checked) {
    document.getElementById("input_r_b3").checked = false
  }
}


function getLevel() {
  if (document.getElementById("input_l_qm").checked) {
    return "qm";
  } else if (document.getElementById("input_l_de").checked) {
    return "de";
  } else if (document.getElementById("input_l_f").checked) {
    return "f";
  } else {
    return "";
  }
}

function validateLevel() {
  if (document.getElementById("input_l_qm").checked ||
    document.getElementById("input_l_de").checked ||
    document.getElementById("input_l_f").checked
  ) {
    return true
  } else {
    return false
  }
}

function validateData() {
  var ret = true
  var errStr = "Bad fields: ";
  for (rf of requiredFields) {
    // Robot requires special (radio) validation
    if (rf == "r") {
      if (!validateRobot()) {
        errStr += rf + " "
        ret = false
      }
    } else if (rf == "l") {
      if (!validateLevel()) {
        errStr += rf + " "
        ret = false
      }
      // Normal validation (length <> 0)
    } else if (document.getElementById("input_" + rf).value == "[]") {
        errStr += rf + " ";
        ret = false;
    } else if (document.getElementById("input_" + rf).value.length == 0) {
      errStr += rf + " "
      ret = false
    }
  }
  if (ret == false) {
    alert("Enter all required values\n" + errStr);
  }
  return ret
}

function getData(useStr) {
  var str = ''
  var fd = new FormData()
  var rep = ''
  var start = true
  var checkedChar = 'Y'
  var uncheckedChar = 'N'
  if (checkboxAs == 'TF') {
    checkedChar = 'T';
    uncheckedChar = 'F';
  } else if (checkboxAs == '10') {
    checkedChar = '1';
    uncheckedChar = '0';
  }
  inputs = document.querySelectorAll("[id*='input_']");
  for (e of inputs) {
    code = e.id.substring(6)
    name = e.name
    radio = code.indexOf("_")
    if (radio > -1) {
      if (e.checked) {
        if (start == false) {
          str = str + ';'
        } else {
          start = false
        }
        // str=str+code.substr(0,radio)+'='+code.substr(radio+1)
        // document.getElementById("display_"+code.substr(0, radio)).value = code.substr(radio+1)
        if (useStr) {
          str = str + code.substr(0, radio) + '=' + e.value
        } else {
          fd.append(name, '' + e.value)
        }
        document.getElementById("display_" + code.substr(0, radio)).value = e.value
      }
    } else {
      if (start == false) {
        str = str + ';'
      } else {
        start = false
      }
      if (e.value == "on") {
        if (e.checked) {
          if (useStr) {
            str = str + code + '=' + checkedChar
          } else {
            fd.append(name, checkedChar)
          }
        } else {
          if (useStr) {
            str = str + code + '=' + uncheckedChar
          } else {
            fd.append(name, uncheckedChar)
          }
        }
      } else {
	if (e.className == "cycle") {
	  e = document.getElementById("cycletime_" + code)
	}


	let val = e.value.split(';').join('-').replace(/"/g,'')
        if (useStr) {
          str = str + code + '=' + val
        } else {
          fd.append(name, val)
        }
      }
    }
  
    
  }
  
  if (useStr) {
    return str
  } else {
    return fd
  }
}

function updateQRHeader() {
  var str = 'Event: !EVENT! Match: !MATCH! Robot: !ROBOT! Team: !TEAM!';

  str = str
    .replace('!EVENT!', document.getElementById("input_e").value)
    .replace('!MATCH!', document.getElementById("input_m").value)
    .replace('!ROBOT!', document.getElementById("display_r").value)
    .replace('!TEAM!', document.getElementById("input_t").value);

  document.getElementById("display_qr-info").textContent = str;
}


function qr_regenerate() {
  // Validate required pre-match date (event, match, level, robot, scouter)
  if (validateData() == false) {
    // Don't allow a swipe until all required data is filled in
    return false
  }

  // Get data
  data = getData(true)

  // Regenerate QR Code
  qr.makeCode(data)

  updateQRHeader()
  return true
}

function qr_clear() {
  qr.clear()
}

function clearForm() {
  var match = 0;
  var e = 0;

  swipePage(-4)

  // Increment match
  match = parseInt(document.getElementById("input_m").value)
  if (match == NaN) {
    document.getElementById("input_m").value = ""
  } else {
    document.getElementById("input_m").value = match + 1
  }

  // Robot
  resetRobot()

  // Clear XY coordinates
  inputs = document.querySelectorAll("[id*='XY_']");
  for (e of inputs) {
    code = e.id.substring(3)
    e.value = "[]"
  }

  inputs = document.querySelectorAll("[id*='input_']");
  for (e of inputs) {
    code = e.id.substring(6)

    if (e.className == "buttonClass") {
      document.getElementById("input_amn").value = "[]"
      document.getElementById("display_amn").value = ""
    }

    if (e.className == "buttonClass") {
      e.value = "[]";
      continue;
    }

    // Don't clear key fields
    if (code == "m") continue
    if (code.substring(0, 2) == "r_") continue
    if (code.substring(0, 2) == "l_") continue
    if (code == "e") continue
    if (code == "s") continue

    if (e.className == "clickableImage") {
      e.value = "[]";
      continue;
    }

    radio = code.indexOf("_")
    if (radio > -1) {
      var baseCode = code.substr(0, radio)
      if (e.checked) {
        e.checked = false
        document.getElementById("display_" + baseCode).value = ""
      }
      var defaultValue = document.getElementById("default_" + baseCode).value
      if (defaultValue != "") {
        if (defaultValue == e.value) {
          e.checked = true
          document.getElementById("display_" + baseCode).value = defaultValue
        }
      }
    } else {
      if (e.type == "number" || e.type == "text" || e.type == "hidden") {
        if ((e.className == "counter") ||
          (e.className == "timer") ||
	  (e.className == "cycle")) {
          e.value = 0
	  if (e.className == "timer" || e.className == "cycle") {
	    // Stop interval
	    timerStatus = document.getElementById("status_" + code);
            startButton = document.getElementById("start_" + code);
            intervalIdField = document.getElementById("intervalId_" + code);
            var intervalId = intervalIdField.value;
            timerStatus.value = 'stopped';
            startButton.innerHTML = "Start";
            if (intervalId != '') {
              clearInterval(intervalId);
            }
            intervalIdField.value = '';
	    if (e.className == "cycle") {
	      document.getElementById("cycletime_" + code).value = "[]"
	      document.getElementById("display_" + code).value = ""
	    }
      
	  }
	} else {
          e.value = ""
        }
      } else if (e.type == "checkbox") {
        if (e.checked == true) {
          e.checked = false
        }
      } else {
        console.log("unsupported input type")
      }
    }
  }
  drawFields()
}

function startTouch(e) {
  initialX = e.touches[0].screenX;
};

function moveTouch(e) {
  if (initialX === null) {
    return;
  }

  var currentX = e.changedTouches[0].screenX;
  var diffX = initialX - currentX;

  // sliding horizontally
  if (diffX / screen.width > xThreshold) {
    // swiped left
    // swipePage(1);
  } else if (diffX / screen.width < -xThreshold) {
    // swiped right
    // swipePage(-1);
  }
  initialX = null;
};

function swipePage(increment) {
  if (qr_regenerate() == true) {
    slides = document.getElementById("main-panel-holder").children
    if (slide + increment < slides.length && slide + increment >= 0) {
      slides[slide].style.display = "none";
      slide += increment;
      window.scrollTo(0, 0);
      slides[slide].style.display = "table";
      document.getElementById('data').innerHTML = "";
      document.getElementById('copyButton').setAttribute('value','Copy Data');
    }
  }
}

function drawFields(name) {
  var fields = document.querySelectorAll("[id*='canvas_']");

  for (f of fields) {
    code = f.id.substring(7);
    var img = document.getElementById("img_" + code);
    var shape = document.getElementById("shape_" + code);
    let shapeArr = shape.value.split(' ');
    var ctx = f.getContext("2d");
    ctx.clearRect(0, 0, f.width, f.height);
    ctx.drawImage(img, 0, 0, f.width, f.height);

    var xyStr = document.getElementById("XY_" + code).value
    if (JSON.stringify(xyStr).length > 2) {
      pts = Array.from(JSON.parse(xyStr))
      for (p of pts) {
        var coord = p.split(",")
        var centerX = coord[0];
        var centerY = coord[1];
        var radius = 5;
        ctx.beginPath();
        if (shapeArr[0].toLowerCase() == 'circle') {
          ctx.arc(centerX, centerY, shapeArr[1], 0, 2 * Math.PI, false);
        } else {
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        }
        ctx.lineWidth = 2;
        if (shapeArr[2] != "") {
          ctx.strokeStyle = shapeArr[2];
        } else {
          ctx.strokeStyle = '#FFFFFF';
        }
        if (shapeArr[4].toLowerCase() == 'true') {
          ctx.fillStyle = shapeArr[3];
        }
        ctx.stroke();
        if (shapeArr[4].toLowerCase() == 'true') {
          ctx.fill();
        }
      }
    }
  }
}

function onFieldClick(event) {
  //Resolution height and width (e.g. 52x26)
  let target = event.target;
  let base = getIdBase(target.id);

  let resX = 12;
  let resY = 6;

  let dimensions = document.getElementById("dimensions" + base);
  if (dimensions.value != "") {
    let arr = dimensions.value.split(' ');
    resX = arr[0];
    resY = arr[1];
  }

  //Turns coordinates into a numeric box
  let box = ((Math.ceil(event.offsetY / target.height * resY) - 1) * resX) + Math.ceil(event.offsetX / target.width * resX);
  let coords = event.offsetX + "," + event.offsetY;


  //Cumulating values
  let changingXY = document.getElementById("XY" + base);
  let changingInput = document.getElementById("input" + base);
  let clickRestriction = document.getElementById("clickRestriction" + base).value;
  let toggleClick = document.getElementById("toggleClick" + base).value;
  let cycleTimer = document.getElementById("cycleTimer" + base);
  let boxArr = Array.from(JSON.parse(changingInput.value));
  let xyArr = Array.from(JSON.parse(changingXY.value));

  if ((toggleClick.toLowerCase() == 'true') &&
      (boxArr.includes(box))) {
    // Remove it
    let idx = boxArr.indexOf(box);
    boxArr.splice(idx, 1);
    xyArr.splice(idx, 1);
    changingInput.value = JSON.stringify(boxArr);
    changingXY.value = JSON.stringify(xyArr);
  } else {
    if (JSON.stringify(changingXY.value).length <= 2) {
      changingXY.value = JSON.stringify([coords]);
      changingInput.value = JSON.stringify([box]);
    } else if (clickRestriction == "one") {
      // Replace box and coords
      changingXY.value = JSON.stringify([coords]);
      changingInput.value = JSON.stringify([box]);
    } else if (clickRestriction == "onePerBox") {
      // Add if box already not in box list/Array
      if (!boxArr.includes(box)) {
        boxArr.push(box);
        changingInput.value = JSON.stringify(boxArr);

        coords = findMiddleOfBox(box, target.width, target.height, resX, resY);
        xyArr.push(coords);
        changingXY.value = JSON.stringify(xyArr);
      }
    } else {
      // No restrictions - add to array
      xyArr.push(coords);
      changingXY.value = JSON.stringify(xyArr);

      boxArr.push(box);
      changingInput.value = JSON.stringify(boxArr);
    }
    // If associated with cycleTimer - send New Cycle EVENT
    if (cycleTimer != null) {
      document.getElementById("cycle_" + cycleTimer.value).click();
    }
  }

  drawFields()
}

function addXToFinalArray() {
  // Get the current value of the input field and parse it as an array
  var currentValue = JSON.parse(document.getElementById("input_ss").value);

  // Add "x" to the array
  currentValue.push("x");

  // Update the input field with the modified array
  document.getElementById("input_ss").value = JSON.stringify(currentValue);

}

function findMiddleOfBox(boxNum, width, height, resX, resY) {
  let boxHeight = height / resY;
  let boxWidth = width / resX;
  let boxX = (boxNum % resX) - 1;
  if (boxX == -1) { boxX = resX - 1 }
  let boxY = Math.floor((boxNum - boxX + 1) / resX);
  let x = Math.round((boxWidth * boxX) + (Math.floor(boxWidth / 2)));
  let y = Math.round((boxHeight * boxY) + (Math.floor(boxHeight / 2)));
  return x+","+y
}

function getIdBase(name) {
  return name.slice(name.indexOf("_"), name.length)
}

function getTeamName(teamNumber) {
  if (teamNumber !== undefined) {
    if (teams) {
      var teamKey = "frc" + teamNumber;
      var ret = "";
      Array.from(teams).forEach(team => ret = team.key == teamKey ? team.nickname : ret);
      return ret;
    }
  }
  return "";
}

function getMatch(matchKey) {
  //This needs to be different than getTeamName() because of how JS stores their data
  if (matchKey !== undefined) {
    if (schedule) {
      var ret = "";
      Array.from(schedule).forEach(match => ret = match.key == matchKey ? match.alliances : ret);
      return ret;
    }
  }
  return "";
}

function getCurrentTeamNumberFromRobot() {
  if (getRobot() != "" && typeof getRobot() !== 'undefined' && getCurrentMatch() != "") {
    if (getRobot().charAt(0) == "r") {
      return getCurrentMatch().red.team_keys[parseInt(getRobot().charAt(1)) - 1]
    } else if (getRobot().charAt(0) == "b") {
      return getCurrentMatch().blue.team_keys[parseInt(getRobot().charAt(1)) - 1]
    }
  }
}

function getCurrentMatchKey() {
  return document.getElementById("input_e").value + "_" + getLevel() + document.getElementById("input_m").value;
}

function getCurrentMatch() {
  return getMatch(getCurrentMatchKey());
}

function updateMatchStart(event) {
  if ((getCurrentMatch() == "") ||
    (!teams)) {
    console.log("No match or team data.");
    return;
  }
  if (event.target.id.startsWith("input_r")) {
    document.getElementById("input_t").value = getCurrentTeamNumberFromRobot().replace("frc", "");
    onTeamnameChange();
  }
  if (event.target.id == "input_m") {
    if (getRobot() != "" && typeof getRobot()) {
      document.getElementById("input_t").value = getCurrentTeamNumberFromRobot().replace("frc", "");
      onTeamnameChange();
    }
  }
}

function onTeamnameChange(event) {
  var newNumber = document.getElementById("input_t").value;
  var teamLabel = document.getElementById("teamname-label");
  if (newNumber != "") {
    teamLabel.innerText = getTeamName(newNumber) != "" ? "You are scouting " + getTeamName(newNumber) : "That team isn't playing this match, please double check to verify correct number";
  } else {
    teamLabel.innerText = "";
  }
}

/**
 * adds to the number in innerHTML of the value tag.
 *
 * @param {element} element the <div> tag element (parent to the value tag).
 * @param {number} step the amount to add to the value tag.
 */
function counter(element, step) {
  var ctr = element.getElementsByClassName("counter")[0];
  var result = parseInt(ctr.value) + step;

  if (isNaN(result)) {
    result = 0;
  }

  if (result >= 0 || ctr.hasAttribute('data-negative')) {
    ctr.value = result;
  } else {
    ctr.value = 0;
  }
}

function addShotTypeAmped(event)
{

  //this line check cycleTime value
  let base = "_amn"
  let cycleInput = document.getElementById("input" + base);
  var tempValue = Array.from(JSON.parse(cycleInput.value));
  tempValue.push("A");
  cycleInput.value = JSON.stringify(tempValue);
  let d = document.getElementById("display" + base);
  d.value = cycleInput.value.replace(/\"/g,'').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, ', ');
  
}
function addShotTypeMiss(event)
{

  //this line check cycleTime value
  let base = "_amn"
  let cycleInput = document.getElementById("input" + base);
  var tempValue = Array.from(JSON.parse(cycleInput.value));
  tempValue.push("M");
  cycleInput.value = JSON.stringify(tempValue);
  let d = document.getElementById("display" + base);
  d.value = cycleInput.value.replace(/\"/g,'').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, ', ');
  
}

function addShotTypeNormal(event)
{

  //this line check cycleTime value
  let base = "_amn"
  let cycleInput = document.getElementById("input" + base);
  var tempValue = Array.from(JSON.parse(cycleInput.value));
  tempValue.push("N");
  cycleInput.value = JSON.stringify(tempValue);
  let d = document.getElementById("display" + base);
  d.value = cycleInput.value.replace(/\"/g,'').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, ', ');
  
}

function addShotTypeAmpScore(event)
{

  //this line check cycleTime value
  let base = "_amn"
  let cycleInput = document.getElementById("input" + base);
  var tempValue = Array.from(JSON.parse(cycleInput.value));
  tempValue.push("x");
  cycleInput.value = JSON.stringify(tempValue);
  let d = document.getElementById("display" + base);
  d.value = cycleInput.value.replace(/\"/g,'').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, ', ');
}

function newCycle(event)
{
  let timerID = event.firstChild;
  let base = getIdBase(timerID.id);
  let inp = document.getElementById("input" + base)
  let cycleTime = inp.value
  inp.value = 0

  if (cycleTime > 0) {
    let cycleInput = document.getElementById("cycletime" + base);
    var tempValue = Array.from(JSON.parse(cycleInput.value));
    tempValue.push(cycleTime);
    cycleInput.value = JSON.stringify(tempValue);
    let d = document.getElementById("display" + base);
    d.value = cycleInput.value.replace(/\"/g,'').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, ', ');
  }
}

function undoCycle(event) {
  let undoID = event.firstChild;
  let uId = getIdBase(undoID.id);
  //Getting rid of last value
  let cycleInput = document.getElementById("cycletime" + uId);
  var tempValue = Array.from(JSON.parse(cycleInput.value));
  tempValue.pop();
  cycleInput.value = JSON.stringify(tempValue);
  let d = document.getElementById("display" + uId);
  d.value = cycleInput.value.replace(/\"/g,'').replace(/\[/g, '').replace(/\]/g, '').replace(/,/g, ', ');
}

function resetTimer(event) {
  let timerID = event.firstChild;
  let tId = getIdBase(timerID.id);
  let inp = document.getElementById("input" + tId)
  inp.value = 0

  // stop timer
  timerStatus = document.getElementById("status" + tId);
  startButton = document.getElementById("start" + tId);
  intervalIdField = document.getElementById("intervalId" + tId);
  var intervalId = intervalIdField.value;
  timerStatus.value = 'stopped';
  startButton.setAttribute("value", "Start");
  if (intervalId != '') {
    clearInterval(intervalId);
  }
  intervalIdField.value = '';
}

function timer(event) {
  let timerID = event.firstChild;
  let tId = getIdBase(timerID.id)
  timerStatus = document.getElementById("status" + tId);
  startButton = document.getElementById("start" + tId);
  intervalIdField = document.getElementById("intervalId" + tId);
  var statusValue = timerStatus.value;
  var intervalId = intervalIdField.value;
  if (statusValue == 'stopped') {
    timerStatus.value = 'started';
    startButton.setAttribute("value", "Stop");

    var intId = setInterval(() => {
      if (document.getElementById("status" + tId).value == 'started') {
        inp = document.getElementById("input" + tId);
        var t = parseFloat(inp.value);
        t += 0.1;
        tTrunc = t.toFixed(1)
        inp.value = tTrunc;
      }
    }, 100);
    intervalIdField.value = intId;
  } else {
    timerStatus.value = 'stopped';
    startButton.setAttribute("value", "Start");

    clearInterval(intervalId);
    intervalIdField.value = '';
  }
  drawFields();
}

function undo(event) {
  let undoID = event.firstChild;
  //Getting rid of last value
  changingXY = document.getElementById("XY" + getIdBase(undoID.id));
  changingInput = document.getElementById("input" + getIdBase(undoID.id));
  var tempValue = Array.from(JSON.parse(changingXY.value));
  tempValue.pop();
  changingXY.value = JSON.stringify(tempValue);

  tempValue = Array.from(JSON.parse(changingInput.value));
  tempValue.pop();
  changingInput.value = JSON.stringify(tempValue);
  drawFields();
}

function flip(event) {
  let flipID = event.firstChild;
  var flipImg = document.getElementById("canvas" + getIdBase(flipID.id));
  if (flipImg.style.transform == "") {
    flipImg.style.transform = 'rotate(180deg)';
  } else {
    flipImg.style.transform = '';
  }
  drawFields();
}

function displayData(){
  document.getElementById('data').innerHTML = getData(true);
}

function copyData(){
  navigator.clipboard.writeText(getData(true));
  document.getElementById('copyButton').setAttribute('value','Copied');
}

window.onload = function () {
  var ret = configure();
  if (ret != -1) {
    var ec = document.getElementById("input_e").value;
    getTeams(ec);
    getSchedule(ec);
    this.drawFields();
    if (enableGoogleSheets) {
      console.log("Enabling Google Sheets.");
      setUpGoogleSheets();
    }
  }
};
