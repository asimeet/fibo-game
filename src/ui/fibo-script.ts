export const gridArray: number[][] = [];

interface ClickEvent extends MouseEvent {
  target: HTMLElement;
}

export function init() {
  const gridContainer: HTMLElement = document.getElementById("grid-container")!;
  gridContainer.innerHTML = "";

  for (let i = 0; i < 50; i++) {
    gridArray[i] = [];
    for (let j = 0; j < 50; j++) {
      /** Add to Array */
      gridArray[i][j] = 0;

      /** Add to DOM */
      const cell: HTMLElement = document.createElement("button")!;
      cell.innerHTML = String(gridArray[i][j]);
      cell.id = `${i}_${j}`;
      cell.addEventListener("click", update);
      cell.classList.add("cell");
      gridContainer.appendChild(cell);
    }
  }
}

export function lightUpCell(cell: HTMLElement) {
  
  /** light up cell with yellow background */
  cell.classList.add("clicked");

  /** remove the yello light after 2 seconds */
  setTimeout(
    (element: HTMLElement) => {
      element.classList.remove("clicked");
    },
    2000,
    cell
  );
}

export function update(this: HTMLElement, event: MouseEvent) {
  const clickEvent: ClickEvent = event as ClickEvent;
  lightUpCell(clickEvent.target);

  const idSplit = clickEvent.target.id.split("_");
  const targetRow = parseInt(idSplit[0]);
  const targetColumn = parseInt(idSplit[1]);

  for (let currentCursor = 0; currentCursor < 50; currentCursor++) {
    /**increase all cells in row where user clicks by one */
    gridArray[targetRow][currentCursor] += 1;
   /**increase all cells in column where user clicks by one */
    gridArray[currentCursor][targetColumn] += 1;

    if (currentCursor == targetColumn) {
      /** needed otherwise cell clicked by user get increased 2 times */
      gridArray[targetRow][currentCursor] -= 1;
    }

    /** update the cells with new values */
    const rowCell: HTMLElement = document.getElementById(
      `${targetRow}_${currentCursor}`
    )!;
    const columnCell: HTMLElement = document.getElementById(
      `${currentCursor}_${targetColumn}`
    )!;
    rowCell.innerHTML = `${gridArray[targetRow][currentCursor]}`;
    columnCell.innerHTML = `${gridArray[currentCursor][targetColumn]}`;
    
    /**check if a fibonacci series was formed either horizontally or vertically */
    checkFibonaci(targetRow, targetColumn, currentCursor);
  }
}

export function isFibonacci(fibonacciSeq: number[]) {
  if (fibonacciSeq.length !== 5) {
    return false;
  }

  if (fibonacciSeq[0] === 0) {
    return false;
  }

  if (fibonacciSeq[0] === fibonacciSeq[1] && fibonacciSeq[0] !== 1) {
    return false;
  }

  return (
    fibonacciSeq[4] - fibonacciSeq[3] === fibonacciSeq[2] &&
    fibonacciSeq[3] - fibonacciSeq[2] === fibonacciSeq[1] &&
    fibonacciSeq[2] - fibonacciSeq[1] === fibonacciSeq[0]
  );
}

export function checkFibonaci(
  targetRow: number,
  targetColumn: number,
  currentCursor: number
) {
  const rowSeq = gridArray[currentCursor].slice(
    targetColumn - 4,
    targetColumn + 1
  );
  const columnSeq = gridArray
    .filter((rowItems, idx) => idx >= targetRow - 4 && idx <= targetRow)
    .map((rowItems) => rowItems[currentCursor]);

  if (isFibonacci(rowSeq)) {
    lightUpRowSeq(currentCursor, targetColumn);
    resetRowSeq(currentCursor, targetColumn);
  }

  if (isFibonacci(columnSeq)) {
    lightUpColumnSeq(targetRow, currentCursor);
    resetColumnSeq(targetRow, currentCursor);
  }
}

export function lightUpRowSeq(row: number, column: number) {
  for (let i = column; i >= column - 4; i--) {
    const rowCell: HTMLElement = document.getElementById(`${row}_${i}`)!;
    rowCell.classList.add("is-fibonacci");
  }
}

export function lightUpColumnSeq(row: number, column: number) {
  for (let i = row; i >= row - 4; i--) {
    const rowCell: HTMLElement = document.getElementById(`${i}_${column}`)!;
    rowCell.classList.add("is-fibonacci");
  }
}

export function resetRowSeq(row: number, column: number) {
  setTimeout(
    (row: number, column: number) => {
      for (let i = column; i >= column - 4; i--) {
        gridArray[row][i] = 0;
        const rowCell: HTMLElement = document.getElementById(`${row}_${i}`)!;
        rowCell.innerHTML = `${gridArray[row][i]}`;
        rowCell.classList.remove("is-fibonacci");
      }
    },
    2000,
    row,
    column
  );
}

export function resetColumnSeq(row: number, column: number) {
  setTimeout(
    (row: number, column: number) => {
      for (let i = row; i >= row - 4; i--) {
        gridArray[i][column] = 0;
        const rowCell: HTMLElement = document.getElementById(`${i}_${column}`)!;
        rowCell.innerHTML = `${gridArray[i][column]}`;
        rowCell.classList.remove("is-fibonacci");
      }
    },
    2000,
    row,
    column
  );
}
