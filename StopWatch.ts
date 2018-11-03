export class StopWatch {
    private intervalId : number;
    private olderDate : Date;

    constructor() {}

    start() {
        this.olderDate = new Date();

        this.intervalId = setInterval(() => {
            this.updateTime();
        }, 500);
    }

    updateTime() {
        let time = new Date() + this.olderDate;
    }
}