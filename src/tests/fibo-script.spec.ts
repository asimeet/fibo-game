import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";
import {
  init,
  gridArray,
  isFibonacci,
  lightUpColumnSeq,
  lightUpRowSeq,
} from "../ui/fibo-script";

const absPath = path.resolve(__dirname, "../ui/fibo-view.html");
const html = fs.readFileSync(absPath);
const dom = new JSDOM(html);
global.document = dom.window.document;

beforeEach(() => init());

describe("Fibonacci Scripts", () => {
  it("When the page loads the array should be filled up", () => {
    expect(gridArray.length).toBe(50);
    expect(gridArray[0][0]).toBe(0);
  });

  it("when I click on [0][1] cell, the value should be increased by one", () => {
    const cell_0_1 = document.getElementById("0_1");

    cell_0_1?.click();
    expect(cell_0_1?.innerHTML).toBe("1");

    cell_0_1?.click();
    expect(cell_0_1?.innerHTML).toBe("2");

    expect(gridArray[0][1]).toBe(2);
  });

  it("when I click on [1][3] cell, the cell should light up momentarily", async () => {
    const cell_1_3 = document.getElementById("1_3");

    cell_1_3?.click();
    expect(cell_1_3?.classList.contains("clicked")).toBe(true);

    const wait_for_1_seconds = new Promise((resolve) =>
      setTimeout(() => resolve(true), 2000)
    );

    await wait_for_1_seconds;

    expect(cell_1_3?.classList.contains("clicked")).toBe(false);
  });

  it("when I click on [2][4] cell, all elements in 2nd row and 4th column should be increased", () => {
    const cell_2_4 = document.getElementById("2_4");

    cell_2_4?.click();
    expect(cell_2_4?.classList.contains("clicked")).toBe(true);

    for (let i = 0; i < 50; i++) {
      expect(gridArray[2][i]).toBe(1);
      expect(gridArray[i][4]).toBe(1);
    }
  });

  it("when I click on cells in a way that it produces fibonacci series, cells forming fibonacci series should light up", () => {
    const fibonacci_producing_cell_clicks = [
      "2_14",
      "3_16",
      "3_17",
      "3_17",
      "3_18",
      "3_18",
      "3_18",
      "3_18",
    ];

    for (let i = 0; i < fibonacci_producing_cell_clicks.length; i++) {
      const cell = document.getElementById(fibonacci_producing_cell_clicks[i]);
      cell?.click();
    }
    const fibonacciSeq = document.getElementsByClassName("is-fibonacci");

    expect(fibonacciSeq.length).toBe(5);

    expect(gridArray[2][14]).toBe(1);
    expect(gridArray[2][15]).toBe(1);
    expect(gridArray[2][16]).toBe(2);
    expect(gridArray[2][17]).toBe(3);
    expect(gridArray[2][18]).toBe(5);
  });

  it("check valid fibonacci to be true", () => {
    let isfibo = isFibonacci([1, 1, 2, 3, 5]);
    expect(isfibo).toBe(true);

    isfibo = isFibonacci([5, 8, 13, 21, 34]);
    expect(isfibo).toBe(true);
  });

  it("check invalid fibonacci to be false", () => {
    let isfibo = isFibonacci([1, 1, 4, 5, 9]);
    expect(isfibo).toBe(false);

    isfibo = isFibonacci([5, 8, 13, 20, 34]);
    expect(isfibo).toBe(false);
  });

  it("should light up a column seq", () => {
    const row = 5;
    const column = 4;
    lightUpColumnSeq(row, column);
    for (let i = row; i >= row - 4; i--) {
      const rowCell: HTMLElement = document.getElementById(`${i}_${column}`)!;
      expect(rowCell.classList.contains("is-fibonacci")).toBe(true);
    }
  });

  it("should light up a row seq", () => {
    const row = 5;
    const column = 5;
    lightUpRowSeq(row, column);
    for (let i = column; i >= column - 4; i--) {
      const rowCell: HTMLElement = document.getElementById(`${row}_${i}`)!;
      rowCell.classList.add("is-fibonacci");
    }
  });
});
