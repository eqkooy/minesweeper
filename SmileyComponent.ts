export class SmileyComponent {
    private smileyElement: HTMLElement;

    constructor(smileyElementId: string) {
        this.smileyElement = document.getElementById(smileyElementId);
    }

    win() {
        this.smileyElement.innerHTML = '😎';
    }

    gameOver() {
        this.smileyElement.innerHTML = '😠';
    }
}