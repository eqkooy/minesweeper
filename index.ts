import { MineField } from './MineField';
import { MineFieldConsoleRenderer } from './MineFieldConsoleRenderer';
import { TileType, Tile } from './Tile';
import './styles.css';

function mainConsole() {
    let mineField = new MineField();
    new MineFieldConsoleRenderer().render(mineField);
}

let blackFlagCharacter = '&#x2691';
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
                let tileElement = this.createTileElement(this.mineField.tiles[i][j]);
                row.push(tileElement);         
                minefieldElement.appendChild(tileElement);
            }
            this.tileElements.push(row);
        }
    }

    createTileElement(tile: Tile) {
        let tileElement = document.createElement('div');
        tileElement.className = 'tile';

        tileElement.onclick = event => {
            if (event.ctrlKey) {
                tileElement.innerHTML = blackFlagCharacter;
                return;
            }

            if (tile.type == TileType.Empty) {
                tileElement.className += ' empty';
                this.revealAdjacentEmptyTiles();
            } else if (tile.type == TileType.Number) {
                tileElement.className += ' number';
                tileElement.innerHTML = `${tile.neighbouringMines}`;
            } else if (tile.type == TileType.Mine) {
                tileElement.className += ' mine';
                tileElement.innerHTML = bombCharacter;
                this.gameOver();
            }
        };

        return tileElement;
    }

    revealAdjacentEmptyTiles() {
        // TODO
    }
    
    gameOver() {
        // Reveal all tiles
        for(let i = 0; i < this.mineField.tiles.length; i++) {
            for(let j = 0; j < this.mineField.tiles[0].length; j++) {
                let tileElement = this.tileElements[i][j];
                let tile = this.mineField.tiles[i][j];

                if (tile.type == TileType.Empty) {
                    tileElement.className += ' empty';
                } else if (tile.type == TileType.Number) {
                    tileElement.className += ' number';
                    tileElement.innerHTML = `${tile.neighbouringMines}`;
                } else if (tile.type == TileType.Mine) {
                    tileElement.className += ' mine';
                    tileElement.innerHTML = bombCharacter;
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