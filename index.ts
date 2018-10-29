import { MineField } from './MineField';
import { TileType } from './Tile';

function main() {
    let mineField = new MineField();
    for(let i = 0; i < mineField.tiles.length; i++) {
        let lineString = '';

        for(let j = 0; j < mineField.tiles[0].length; j++) {
            let tile = mineField.tiles[i][j];

            if (tile.type == TileType.Empty) {
                lineString += '_';
            } else if (tile.type == TileType.Number) {
                lineString += `${tile.neighbouringMines}`;
            } else if (tile.type == TileType.Mine) {
                lineString += 'X';
            }
        }
        console.log(lineString);
    }
}

main();