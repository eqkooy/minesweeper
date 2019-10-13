export class StopWatchComponent {
    public started: boolean = false;
    private intervalId : number;
    private startDate : Date;

    private stopWatchElement : HTMLElement;

    constructor(stopWatchId: string) {
        this.stopWatchElement = document.getElementById(stopWatchId);
    }

    start() {
        this.started = true;
        this.startDate = new Date();

        this.intervalId = setInterval(() => {
            this.updateTime();
        }, 500);
    }

    updateTime() {
        let elapsed = (Date.now() - this.startDate.getTime()) / 1000;
        this.stopWatchElement.innerHTML = `${('000' + elapsed.toFixed(0)).substr(-3)}`;
    }

    stop() {
        this.started = false;
        clearInterval(this.intervalId);
    }

    reset() {
        // TODO
    }
}