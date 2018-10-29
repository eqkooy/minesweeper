import { Tile, TileType } from './Tile';

export class MineField {
    public tiles : Tile[][];
    private rows : number = 20;
    private columns : number = 20;

    constructor() {
        this.tiles = new Array<Array<Tile>>();
        for(var i: number = 0; i < this.rows; i++) {

            let row = new Array<Tile>();
            for(var j: number = 0; j < this.columns; j++) {
                row.push(new Tile(TileType.Empty));
            }
            this.tiles.push(row);
        }

        this.generateTiles();
    }

    generateTiles() {
        let mines = 60;

        this.populateMines(mines);
        this.computeRemainingTiles();
    }

    populateMines(mines) {
        for(let i = 0; i < mines - 1; i++) {
            let rowIndex;
            let columnIndex;

            do {
                rowIndex = MineField.getRandomInteger(this.tiles.length);
                columnIndex = MineField.getRandomInteger(this.tiles[0].length);
            } while(this.tiles[rowIndex][columnIndex].type == TileType.Mine)

            this.tiles[rowIndex][columnIndex].type = TileType.Mine;
        }
    }

    computeRemainingTiles() {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[0].length; j++) {
                let currentTile = this.tiles[i][j];
                if (currentTile.type != TileType.Mine) {
                    // Look at neighbours and sum count of mines
                    let neighbouringMines = 0;
                    for(let p = (i > 0 ? -1 : 0); p < (i < this.tiles.length - 1 ? 2 : 1); p++) {
                        for(let q = (j > 0 ? -1 : 0); q < (j < this.tiles[0].length -1 ? 2 : 1); q++) {
                            if(!(p == 0 && q == 0)) {
                                if (this.tiles[i + p][j + q].type == TileType.Mine) {
                                    neighbouringMines++;
                                }
                            }
                        }
                    }

                    // Conclude for tile
                    if (neighbouringMines == 0) {
                        currentTile.type = TileType.Empty;
                    } else {
                        currentTile.type = TileType.Number;
                        currentTile.neighbouringMines = neighbouringMines;
                    }
                }
            }
        }
    }

    static getRandomInteger(max) {
        return Math.floor((Math.random() * max));
    }
}