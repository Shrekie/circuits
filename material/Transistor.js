import grid from "../grid.js";
import matrix from "../matrix.js";

export default class Transistor {
  constructor(x, y, rotation = "bottom") {
    this.name = "transistor";
    this.on = true;

    this.x = x;
    this.y = y;

    this.rotation = rotation;
  }

  flipIntake() {
    let cellDirection = matrix.getDirection(this.x, this.y, this.rotation);

    if (
      cellDirection &&
      cellDirection.name == "wire" &&
      cellDirection.on == true
    )
      this.on = false;
    else this.on = true;
  }

  getColor() {
    if (this.on) return "red";
    else return "LightCoral";
  }

  drawCircle() {
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

  drawLineRotation() {
    if (this.rotation == "top")
      canvas2DContext.lineTo(
        this.x * grid.CELL_WIDTH + grid.CELL_WIDTH / 2,
        this.y * grid.CELL_HEIGHT
      );

    if (this.rotation == "right")
      canvas2DContext.lineTo(
        this.x * grid.CELL_WIDTH + grid.CELL_WIDTH,
        this.y * grid.CELL_HEIGHT + grid.CELL_HEIGHT / 2
      );

    if (this.rotation == "bottom")
      canvas2DContext.lineTo(
        this.x * grid.CELL_WIDTH + grid.CELL_WIDTH / 2,
        this.y * grid.CELL_HEIGHT + grid.CELL_HEIGHT
      );

    if (this.rotation == "left")
      canvas2DContext.lineTo(
        this.x * grid.CELL_WIDTH,
        this.y * grid.CELL_HEIGHT + grid.CELL_HEIGHT / 2
      );
  }

  drawLine() {
    canvas2DContext.strokeStyle = this.getColor();
    canvas2DContext.lineWidth = 5;

    canvas2DContext.beginPath();

    canvas2DContext.moveTo(
      this.x * grid.CELL_WIDTH + grid.CELL_WIDTH / 2,
      this.y * grid.CELL_HEIGHT + grid.CELL_HEIGHT / 2
    );

    this.drawLineRotation();

    canvas2DContext.stroke();
  }

  tick() {
    this.flipIntake();

    this.drawCircle();
    this.drawLine();
  }
}
