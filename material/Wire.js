import grid from "../grid.js";
import matrix from "../matrix.js";

export default class Wire {
  constructor(x, y) {
    this.name = "wire";
    this.on = false;

    this.x = x;
    this.y = y;
  }

  clusterTurnedOn() {
    var crossOnTransistor = matrix
      .getCross(this.x, this.y)
      .some(
        (cell) =>
          cell.name == "transistor" &&
          cell.on == true &&
          matrix.getDirection(cell.x, cell.y, cell.rotation) != this
      );

    if (crossOnTransistor)
      matrix.getWireCluster(this).forEach((wire) => {
        wire.on = true;
      });
  }

  getColor() {
    if (this.on) return "blue";
    else return "lightblue";
  }

  drawCircle() {
    this.clusterTurnedOn();

    canvas2DContext.fillStyle = this.getColor();

    canvas2DContext.beginPath();

    canvas2DContext.arc(
      this.x * grid.CELL_WIDTH + grid.CELL_WIDTH / 2,
      this.y * grid.CELL_HEIGHT + grid.CELL_HEIGHT / 2,
      (grid.CELL_WIDTH + grid.CELL_HEIGHT) / 8,
      0,
      2 * Math.PI
    );

    canvas2DContext.fill();
  }

  tick() {
    this.drawCircle();
  }
}
