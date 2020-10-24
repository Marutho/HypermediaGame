import {GameItem} from '../game_item/game_item.model'

export class Player{
    inventory: GameItem[];
    history: boolean[];

    constructor(){
        this.inventory = [];
        this.history = [true];
    }    
}