import grid from "./grid.js";
import Wire from "./material/Wire.js";
import Transistor from "./material/Transistor.js";
import Crossover from "./material/Crossover.js";

export default (() => {
  var tools = [...document.getElementById("tools").children];
  var toolList = [Wire, Crossover, Transistor];
  var active = null;

  var rotateTransistor = (transistor, x, y) => {
    if (transistor.rotation == "top") return new Transistor(x, y, "right");
    if (transistor.rotation == "right") return new Transistor(x, y, "bottom");
    if (transistor.rotation == "bottom") return new Transistor(x, y, "left");
    if (transistor.rotation == "left") return new Transistor(x, y, "top");
  };

  var toolTwiceSelected = (cell, name, constructor, eventType) => {
    return (
      cell &&
      cell.name == name &&
      active &&
      active.prototype.constructor == constructor &&
      eventType != "mousemove"
    );
  };

  var getActive = (x, y, event) => {
    if (event.buttons == 2) return false;

    if (
      toolTwiceSelected(grid.cells[x][y], "transistor", Transistor, event.type)
    )
      return rotateTransistor(grid.cells[x][y], x, y);

    if (active) return new active(x, y);
  };

  var selectTool = (tool, index) => {
    tools.forEach((tool) => (tool.style.backgroundColor = "white"));
    tool.style.backgroundColor = "lightgray";
    active = toolList[index];
  };

  // Register onclick each tool button
  tools.forEach(
    (tool, index) =>
      (tool.onclick = (event) => {
        selectTool(tool, index);
      })
  );

  // Set tool 0 as default
  selectTool(tools[0], 0);

  return { getActive };
})();
