import grid from "./grid.js";

let animationLoop = () => {
  canvas2DContext.fillStyle = "white";
  canvas2DContext.fillRect(0, 0, canvasElement.width, canvasElement.height);

  grid.drawCells();

  window.requestAnimationFrame(animationLoop);
};

window.requestAnimationFrame(animationLoop);
