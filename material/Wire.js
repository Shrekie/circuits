import grid from "../grid.js";
import material from "../material.js";

export default class Wire {
  constructor(x, y) {
    this.name = "wire";
    this.on = false;

    this.x = x;
    this.y = y;
  }

  getColor() {
    if (this.on) return "blue";
    else return "lightblue";
  }

  drawCircle() {
    material.conductCluster(this);

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
