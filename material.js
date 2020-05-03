import matrix from "./matrix.js";

export default (() => {
  var conductCluster = (wire) => {
    var onTransistors = matrix
      .getCross(wire.x, wire.y)
      .filter(
        (cell) =>
          cell.name == "transistor" &&
          cell.on == true &&
          matrix.getDirection(cell.x, cell.y, cell.rotation) != wire
      );

    if (onTransistors.length < 0) return;

    matrix.turnOnCluster(onTransistors);
  };
  return { conductCluster };
})();
