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

  var getDirection = (x, y, direction) => {
    if (direction == "top") if (y - 1 >= 0) return grid.cells[x][y - 1];

    if (direction == "right")
      if (x + 1 <= grid.CELL_COLUMNS - 1) return grid.cells[x + 1][y];

    if (direction == "bottom")
      if (y + 1 <= grid.CELL_ROWS - 1) return grid.cells[x][y + 1];

    if (direction == "left") if (x - 1 >= 0) return grid.cells[x - 1][y];
  };

  var getTriDegree = (x, y, ignoredSide) => {
    let trifecta = [];

    if (ignoredSide != "top")
      if (y - 1 >= 0) trifecta.push(grid.cells[x][y - 1]);

    if (ignoredSide != "right")
      if (x + 1 <= grid.CELL_COLUMNS - 1) trifecta.push(grid.cells[x + 1][y]);

    if (ignoredSide != "bottom")
      if (y + 1 <= grid.CELL_ROWS - 1) trifecta.push(grid.cells[x][y + 1]);

    if (ignoredSide != "left")
      if (x - 1 >= 0) trifecta.push(grid.cells[x - 1][y]);

    return trifecta;
  };

  var getPointingDirection = (pointer, target) => {
    var directions = ["top", "bottom", "right", "left"];

    for (let index = 0; index < directions.length; index++) {
      let pointing = getDirection(pointer.x, pointer.y, directions[index]);
      if (pointing == target) return directions[index];
    }
  };

  var turnOnWire = (wire, lastWire) => {
    if (wire.name == "wire") {
      wire.on = true;
    }

    if (wire.name == "crossover") {
      var targetDirection = getPointingDirection(wire, lastWire);

      if (targetDirection == "top" || targetDirection == "bottom")
        wire.verticalOn = true;

      if (targetDirection == "right" || targetDirection == "left")
        wire.horizontalOn = true;
    }
  };

  var wireIsOn = (wire, lastWire) => {
    if (wire.name == "wire") {
      return wire.on;
    }

    if (wire.name == "crossover") {
      var targetDirection = getPointingDirection(wire, lastWire);

      if (targetDirection == "top" || targetDirection == "bottom")
        return wire.verticalOn;

      if (targetDirection == "right" || targetDirection == "left")
        return wire.horizontalOn;
    }
  };

  var turnOnCluster = (onTransistors) => {
    var collectConnected = (branch, lastBranch) => {
      if (branch.name == "transistor") {
        getTriDegree(branch.x, branch.y, branch.rotation)
          .filter((wire) => wire.name == "wire" || wire.name == "crossover")
          .forEach((nextWire) => {
            turnOnWire(nextWire, branch);
            collectConnected(nextWire, branch);
          });
      }

      if (branch.name == "wire") {
        getCross(branch.x, branch.y)
          .filter(
            (nextWire) =>
              nextWire.name == "wire" || nextWire.name == "crossover"
          )
          .forEach((nextWire) => {
            if (!wireIsOn(nextWire, branch)) {
              turnOnWire(nextWire, branch);
              collectConnected(nextWire, branch);
            }
          });
      }

      if (branch.name == "crossover") {
        var cross = getDirection(
          branch.x,
          branch.y,
          getPointingDirection(lastBranch, branch)
        );

        if (cross && (cross.name == "wire" || cross.name == "crossover"))
          if (!wireIsOn(cross, branch)) {
            turnOnWire(cross, branch);
            collectConnected(cross, branch);
          }
      }
    };

    onTransistors.forEach((transistor) => collectConnected(transistor));
  };

  return {
    getPointingDirection,
    getCross,
    getDirection,
    getTriDegree,
    turnOnCluster,
  };
})();
