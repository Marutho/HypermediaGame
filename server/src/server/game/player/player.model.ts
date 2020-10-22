import {GameItem} from '../game_item/game_item.model'

export class Player{
    inventory: GameItem[];

    constructor(){
        this.inventory = [];
    }
}