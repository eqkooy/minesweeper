import { MineField } from './MineField';
import { MineFieldComponent } from './MineFieldComponent';
import { MineFieldConsoleRenderer } from './MineFieldConsoleRenderer';
import './styles.css';

function mainConsole() {
    let mineField = new MineField();
    new MineFieldConsoleRenderer().render(mineField);
}

function main() {
    new MineFieldComponent('minefield');
}

main();