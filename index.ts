import { MineField } from './MineField';
import { MineFieldConsoleRenderer } from './MineFieldConsoleRenderer';
import './styles.css';

function mainConsole() {
    let mineField = new MineField();

    new MineFieldConsoleRenderer().render(mineField);
}

let tileElementString = `<div class="tile"></div>`;
let blackFlagCharacter = '&#x2691';

function main() {
    let mineField = new MineField();

    let minefieldElement = document.getElementById('minefield');

    mineField.tiles.forEach(row => row.forEach(tile => {
        minefieldElement.innerHTML += tileElementString;
    }));
}

main();