import grid from "./grid.js";

export default (() => {
  var getCross = (x, y) => {
    let cross = [];

    if (y - 1 >= 0) cross.push(grid.cells[x][y - 1]);
    if (x + 1 <= grid.CELL_COLUMNS - 1) cross.push(grid.cells[x + 1][y]);
    if (y + 1 <= grid.CELL_ROWS - 1) cross.push(grid.cells[x][y + 1]);
    if (x - 1 >= 0) cross.push(grid.cells[x - 1][y]);

    return cross;
  };

  var getTriDegree = (x, y, direction) => {
    let trifecta = [];

    if (direction != "top") if (y - 1 >= 0) trifecta.push(grid.cells[x][y - 1]);

    if (direction != "right")
      if (x + 1 <= grid.CELL_COLUMNS - 1) trifecta.push(grid.cells[x + 1][y]);

    if (direction != "bottom")
      if (y + 1 <= grid.CELL_ROWS - 1) trifecta.push(grid.cells[x][y + 1]);

    if (direction != "left")
      if (x - 1 >= 0) trifecta.push(grid.cells[x - 1][y]);

    return trifecta;
  };

  var getDirection = (x, y, direction) => {
    if (direction == "top") if (y - 1 >= 0) return grid.cells[x][y - 1];

    if (direction == "right")
      if (x + 1 <= grid.CELL_COLUMNS - 1) return grid.cells[x + 1][y];

    if (direction == "bottom")
      if (y + 1 <= grid.CELL_ROWS - 1) return grid.cells[x][y + 1];

    if (direction == "left") if (x - 1 >= 0) return grid.cells[x - 1][y];

  };

  var getWireCluster = (startWire) => {
    var cluster = [];

    var collectConnected = (wire) => {
      cluster.push(wire);

      var adjacent = getCross(wire.x, wire.y).filter((material) => {
        return (
          material.name == "wire" &&
          !cluster.some((wire) => wire.x == material.x && wire.y == material.y)
        );
      });

      adjacent.forEach((wire) => collectConnected(wire));
    };

    collectConnected(startWire);

    return cluster;
  };

  return { getCross, getTriDegree, getDirection, getWireCluster };
})();
