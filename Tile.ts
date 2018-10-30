
export enum TileType {
    Empty = 1,
    Mine,
    Number,
}

export class Tile {
    public neighbouringMines;
    
    constructor(public type) {

    }
}