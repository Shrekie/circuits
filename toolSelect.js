import grid from "./grid.js";
import Wire from "./material/Wire.js";
import Transistor from "./material/Transistor.js";

export default (() => {
  var tools = [...document.getElementById("tools").children];
  var toolList = [Wire, Transistor];
  var active = null;

  var rotateTransistor = (transistor, x, y) => {
    if (transistor.rotation == "top") return new Transistor(x, y, "right");
    if (transistor.rotation == "right") return new Transistor(x, y, "bottom");
    if (transistor.rotation == "bottom") return new Transistor(x, y, "left");
    if (transistor.rotation == "left") return new Transistor(x, y, "top");
  };

  var transistorTwiceSelected = (x, y) => {
    return (
      grid.cells[x][y] &&
      grid.cells[x][y].name == "transistor" &&
      active &&
      active.prototype.constructor == Transistor
    );
  };

  var getActive = (x, y, event) => {
    if (event.which == 3 || event.which == 2) return false;

    if (transistorTwiceSelected(x, y) && event.type != "mousemove")
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
