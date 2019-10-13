export class RemainingMinesComponent {
    private remainingMinesElement: HTMLElement;
    private mines: number = 0;

    constructor(remainingMinesElementId: string) {
        this.remainingMinesElement = document.getElementById(remainingMinesElementId);
    }

    set remainingMines(newMines) {
        this.mines = newMines;
        this.remainingMinesElement.innerHTML = `${('000' + this.mines.toString()).substr(-3)}`;
    }

    get remainingMines() {
        return this.mines;
    }
}