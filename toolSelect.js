import grid from "./grid.js";
import Wire from "./material/Wire.js";
import Transistor from "./material/Transistor.js";

export default (() => {
  var active = Wire;

  var rotateTransistor = (transistor, x, y) => {
    if (transistor.rotation == "top") return new active(x, y, "right");
    if (transistor.rotation == "right") return new active(x, y, "bottom");
    if (transistor.rotation == "bottom") return new active(x, y, "left");
    if (transistor.rotation == "left") return new active(x, y, "top");
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

  var wireToolButton = document.getElementById("wire-tool-button");
  var transistorToolButton = document.getElementById("transistor-tool-button");

  wireToolButton.onclick = (event) => {
    wireToolButton.style.backgroundColor = "lightgray";
    transistorToolButton.style.backgroundColor = "white";
    active = Wire;
  };

  transistorToolButton.onclick = (event) => {
    wireToolButton.style.backgroundColor = "white";
    transistorToolButton.style.backgroundColor = "lightgray";
    active = Transistor;
  };

  return { getActive };
})();
