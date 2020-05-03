import matrix from "./matrix.js";

export default (() => {
  var conductTransistor = (wire) => {
    var onTransistor = matrix
      .getCross(wire.x, wire.y)
      .find(
        (cell) =>
          cell.name == "transistor" &&
          cell.on == true &&
          matrix.getDirection(cell.x, cell.y, cell.rotation) != wire
      );

    if (onTransistor) matrix.turnOnConnected(onTransistor);
  };
  return { conductTransistor };
})();
