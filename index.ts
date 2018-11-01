import { MineField } from './MineField';
import { MineFieldConsoleRenderer } from './MineFieldConsoleRenderer';
import { TileType, Tile } from './Tile';
import './styles.css';

function mainConsole() {
    let mineField = new MineField();
    new MineFieldConsoleRenderer().render(mineField);
}

let blackFlagCharacter = "⚑"; // '&#x2691';
let bombCharacter = '&#x1F4A3';

class MineFieldComponent {
    private mineField: MineField = new MineField();
    private tileElements: Array<Array<HTMLDivElement>>;

    constructor() {
        let minefieldElement = document.getElementById('minefield');

        this.tileElements = [];
        for(let i = 0; i < this.mineField.tiles.length; i++) {
            let row = [];
            for(let j = 0; j < this.mineField.tiles[0].length; j++) {
                let tileElement = this.createTileElement(this.mineField.tiles[i][j], i, j);
                row.push(tileElement);         
                minefieldElement.appendChild(tileElement);
            }
            this.tileElements.push(row);
        }
    }

    createTileElement(tile: Tile, i, j) {
        let tileElement = document.createElement('div');
        tileElement.className = 'tile';

        tileElement.onclick = event => {
            if (event.ctrlKey && tileElement.className == 'tile') {
                tileElement.innerHTML = (tileElement.innerHTML != blackFlagCharacter) ? blackFlagCharacter : '';
                return;
            }

            if (tile.type == TileType.Empty) {
                this.revealEmpty(tileElement);
                this.revealAdjacentTiles(i, j);
            } else if (tile.type == TileType.Number) {
                this.revealNumber(tileElement, tile.neighbouringMines);
            } else if (tile.type == TileType.Mine) {
                this.revealMine(tileElement);
                this.gameOver();
            }
        };

        return tileElement;
    }

    revealEmpty(tileElement) {
        tileElement.className += ' empty';
    }

    revealMine(tileElement) {
        tileElement.className += ' mine';
        tileElement.innerHTML = bombCharacter;
    }

    revealNumber(tileElement, neighbouringMines) {
        tileElement.className += ' number';
        tileElement.innerHTML = `${neighbouringMines}`;
    }

    revealAdjacentTiles(i, j) {
        this.mineField.forEachNeighbouringTilesIndices(i, j, (k, l) => {
            let tile = this.mineField.tiles[k][l];
            let tileElement = this.tileElements[k][l];
            if (tile.type == TileType.Empty && tileElement.className == 'tile') {
                this.revealEmpty(this.tileElements[k][l]);
                this.revealAdjacentTiles(k, l);
            } else if (tile.type == TileType.Number) {
                this.revealNumber(tileElement, tile.neighbouringMines);
            }
        });
    }
    
    gameOver() {
        // Reveal all tiles
        for(let i = 0; i < this.mineField.tiles.length; i++) {
            for(let j = 0; j < this.mineField.tiles[0].length; j++) {
                let tileElement = this.tileElements[i][j];
                let tile = this.mineField.tiles[i][j];

                if (tile.type == TileType.Empty) {
                    this.revealEmpty(tileElement);
                } else if (tile.type == TileType.Number) {
                    this.revealNumber(tileElement, tile.neighbouringMines);
                } else if (tile.type == TileType.Mine) {
                    this.revealMine(tileElement);
                }
            }
        }

        // TODO: Abort game
    }
}


function main() {
    new MineFieldComponent();
}

main();