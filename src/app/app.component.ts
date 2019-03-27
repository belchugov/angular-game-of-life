import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  grid;
  col;
  rowsMax = 10;
  colMax = 10;
  generation = 0;
  delay = 1000;
  gameTimeout;

  createGrid() {
    const grid = [];
    for (let i = 0; i < this.rowsMax; i++) {
      const column = [];
      for (let j = 0; j < this.colMax; j++) {
        const elem = 0;
        column.push(elem);
      }
      grid.push(column);
    }
    return grid;
  }

  ngOnInit() {
    this.grid =  this.createGrid();
    this.randomizeGrid();
  }

  activate(row, column) {
    this.grid[row][column] = 1;
  }

  randomizeGrid() {
    for (let i = 0; i < this.rowsMax; i++) {
      for (let j = 0; j < this.colMax; j++) {
        this.grid[i][j] = Math.round(Math.random());
      }
    }
  }

  start() {
    this.generation++;
    this.grid = this.applyGameRules();
    this.gameTimeout = setTimeout(
      () => {
        this.start();
      }, this.delay);
  }

  stop() {
    window.clearTimeout(this.gameTimeout);
  }

  applyGameRules() {
    const copyGrid = this.createGrid();

    for (let row = 0; row < this.rowsMax; row++) {
      for (let column  = 0; column  < this.colMax; column ++) {
        const totalCells = this.checkSurroundingsCells(this.grid, row, column);

        switch (totalCells) {
          case 2:
            copyGrid[row][column] = this.grid[row][column];

            break;
          case 3:
            copyGrid[row][column] = 1;

            break;
          default:
            copyGrid[row][column] = 0;
        }
      }
    }
    return copyGrid;
  }

  checkSurroundingsCells(grid, row: number, column: number) {
    let totalCells = 0;

    totalCells += grid[(row - 1 + this.rowsMax) % this.rowsMax][(column - 1 + this.colMax) % this.colMax] || 0;
    totalCells += grid[(row - 1 + this.rowsMax) % this.rowsMax][column] || 0;
    totalCells += grid[(row - 1 + this.rowsMax) % this.rowsMax][(column + 1 + this.colMax) % this.colMax] || 0;

    totalCells += grid[row][(column - 1 + this.colMax) % this.colMax] || 0;
    totalCells += grid[row][(column + 1 + this.colMax) % this.colMax] || 0;

    totalCells += grid[(row + 1 + this.rowsMax) % this.rowsMax][(column - 1 + this.colMax) % this.colMax] || 0;
    totalCells += grid[(row + 1 + this.rowsMax) % this.rowsMax][column] || 0;
    totalCells += grid[(row + 1 + this.rowsMax) % this.rowsMax][(column + 1 + this.colMax) % this.colMax] || 0;
    return totalCells;

  }

  clear() {
    this.generation = 0;
    this.grid = this.createGrid();
  }

}
