import { MineField } from './MineField';
import { TileType, Tile } from './Tile';
import { StopWatchComponent } from './StopWatchComponent';
import { RemainingMinesComponent } from './RemainingMinesComponent';
import { SmileyComponent } from './SmileyComponent';

let blackFlagCharacter = "⚑"; // '&#x2691';
let bombCharacter = '&#x1F4A3';

export class MineFieldComponent {
    private mineField: MineField = new MineField();
    private tileElements: Array<Array<HTMLDivElement>>;

    private stopWatchComponent: StopWatchComponent = new StopWatchComponent('stopwatch');
    private remainingMinesComponent: RemainingMinesComponent = new RemainingMinesComponent('remaining-mines');
    private smileyComponent: SmileyComponent = new SmileyComponent('smiley');

    constructor(mineFieldId: string) {
        let minefieldElement = document.getElementById(mineFieldId);
        this.remainingMinesComponent.remainingMines = this.mineField.mines;

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
            if (!this.stopWatchComponent.started) { this.stopWatchComponent.start(); }
            if (event.ctrlKey && tileElement.className == 'tile') {
                if (tileElement.innerHTML != blackFlagCharacter) {
                    this.remainingMinesComponent.remainingMines--;
                } else {
                    this.remainingMinesComponent.remainingMines++;
                }

                tileElement.innerHTML = (tileElement.innerHTML != blackFlagCharacter) ? blackFlagCharacter : '';
            } else {
                if (tile.type == TileType.Empty) {
                    this.revealEmpty(tileElement);
                    this.revealAdjacentTiles(i, j);
                } else if (tile.type == TileType.Number) {
                    this.revealNumber(tileElement, tile.neighbouringMines);
                } else if (tile.type == TileType.Mine) {
                    this.stopWatchComponent.stop();
                    this.revealMine(tileElement);
                    this.gameOver();
                }
            }


            if (this.bruteForceCheckIsWon()) {
                this.smileyComponent.win();
                this.stopWatchComponent.stop();
            }
        };

        return tileElement;
    }

    revealEmpty(tileElement) {
        tileElement.className += ' empty revealed';
    }

    revealMine(tileElement) {
        tileElement.className += ' mine revealed';
        tileElement.innerHTML = bombCharacter;
    }

    revealNumber(tileElement, neighbouringMines) {
        tileElement.className += ' number revealed';
        tileElement.innerHTML = `${neighbouringMines}`;
    }

    revealAdjacentTiles(i, j) {
        this.mineField.forEachNeighbouringTilesIndices(i, j, (k, l) => {
            let tile = this.mineField.tiles[k][l];
            let tileElement = this.tileElements[k][l];
            if (tile.type == TileType.Empty && tileElement.className == 'tile') {
                this.revealEmpty(tileElement);
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

        this.smileyComponent.gameOver();
    }

    bruteForceCheckIsWon() {
        for(let i = 0; i < this.mineField.tiles.length; i++) {
            for(let j = 0; j < this.mineField.tiles[0].length; j++) {
                let tileElement = this.tileElements[i][j];
                let tile = this.mineField.tiles[i][j];

                if (tile.type == TileType.Mine && tileElement.innerHTML != blackFlagCharacter) {
                    return false;
                } else if (tile.type != TileType.Mine && !tileElement.className.includes('revealed')) {
                    return false;
                }
            }
        }

        return true;
    }
}