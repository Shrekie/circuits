import grid from "../grid.js";
import material from "../material.js";

export default class Crossover {
  constructor(x, y) {
    this.name = "crossover";

    this.verticalOn = false;
    this.horizontalOn = false;

    this.x = x;
    this.y = y;
  }

  getVerticalColor() {
    if (this.verticalOn) return "red";
    else return "LightCoral";
  }

  getHorizontalColor() {
    if (this.horizontalOn) return "blue";
    else return "lightblue";
  }

  drawVertical() {
    canvas2DContext.strokeStyle = this.getVerticalColor();
    canvas2DContext.lineWidth = 5;

    canvas2DContext.beginPath();

    canvas2DContext.moveTo(
      this.x * grid.CELL_WIDTH + grid.CELL_WIDTH / 2,
      this.y * grid.CELL_HEIGHT
    );

    canvas2DContext.lineTo(
      this.x * grid.CELL_WIDTH + grid.CELL_WIDTH / 2,
      this.y * grid.CELL_HEIGHT + grid.CELL_HEIGHT
    );

    canvas2DContext.stroke();
  }

  drawHorizontal() {
    canvas2DContext.strokeStyle = this.getHorizontalColor();
    canvas2DContext.lineWidth = 5;

    canvas2DContext.beginPath();

    canvas2DContext.moveTo(
      this.x * grid.CELL_WIDTH,
      this.y * grid.CELL_HEIGHT + grid.CELL_HEIGHT / 2
    );

    canvas2DContext.lineTo(
      this.x * grid.CELL_WIDTH + grid.CELL_WIDTH,
      this.y * grid.CELL_HEIGHT + grid.CELL_HEIGHT / 2
    );

    canvas2DContext.stroke();
  }

  drawCross() {
    material.conductCluster(this);

    this.drawHorizontal();
    this.drawVertical();
  }

  tick() {
    this.drawCross();
  }
}
