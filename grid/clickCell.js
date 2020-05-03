import toolSelect from "../toolSelect.js";
import grid from "../grid.js";

export default (() => {
  var getCellPos = (mouseX, mouseY) => {
    for (let cellX = 0; cellX < grid.CELL_COLUMNS; cellX++) {
      let cellXStart = cellX * grid.CELL_WIDTH;
      let cellXEnd = cellXStart + grid.CELL_WIDTH;

      for (let cellY = 0; cellY < grid.CELL_ROWS; cellY++) {
        let cellYStart = cellY * grid.CELL_HEIGHT;
        let cellYEnd = cellYStart + grid.CELL_HEIGHT;

        if (mouseX > cellXStart && mouseX < cellXEnd)
          if (mouseY > cellYStart && mouseY < cellYEnd)
            return { x: cellX, y: cellY };
      }
    }
  };

  var setCellToActiveTool = (event) => {
    if (event.buttons == 0) return;

    let cellPos = getCellPos(event.offsetX, event.offsetY);

    grid.cells[cellPos.x][cellPos.y] = toolSelect.getActive(
      cellPos.x,
      cellPos.y,
      event
    );
  };

  canvasElement.onmousedown = (event) => {
    setCellToActiveTool(event);
  };

  canvasElement.onmousemove = (event) => {
    setCellToActiveTool(event);
  };

  canvasElement.oncontextmenu = (event) => {
    setCellToActiveTool(event);
    return false;
  };

  return {};
})();
