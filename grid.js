export default (() => {
  const CELL_COLUMNS = 35;
  const CELL_ROWS = 35;

  const CELL_WIDTH = CANVAS_WIDTH / CELL_COLUMNS;
  const CELL_HEIGHT = CANVAS_HEIGHT / CELL_ROWS;

  var cells = new Array(CELL_COLUMNS).fill(new Array());
  cells = cells.map((_) => new Array(CELL_ROWS).fill(false));

  var drawCells = () => {
    for (let x = 0; x < CELL_COLUMNS; x++) {
      for (let y = 0; y < CELL_ROWS; y++) {
        canvas2DContext.strokeStyle = "black";
        canvas2DContext.lineWidth = 1;

        canvas2DContext.beginPath();

        canvas2DContext.rect(
          x * CELL_WIDTH,
          y * CELL_HEIGHT,
          CELL_WIDTH,
          CELL_HEIGHT
        );

        canvas2DContext.stroke();

        // Draw current from all transistors
        if (cells[x][y].name == "wire") cells[x][y].tick();
      }
    }

    for (let x = 0; x < CELL_COLUMNS; x++) {
      for (let y = 0; y < CELL_ROWS; y++) {
        // Flip transistors
        if (cells[x][y].name == "transistor") cells[x][y].tick();
        
        // Redraw flipped current
        if (cells[x][y].name == "wire") cells[x][y].tick();
      }
    }

    for (let x = 0; x < CELL_COLUMNS; x++) {
      for (let y = 0; y < CELL_ROWS; y++) {
        // Reset wire for next tick
        if (cells[x][y].name == "wire") cells[x][y].on = false;
      }
    }
  };

  return { cells, drawCells, CELL_COLUMNS, CELL_ROWS, CELL_WIDTH, CELL_HEIGHT };
})();
