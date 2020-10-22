import {GameItem} from '../game_item/game_item.model';
import {Room} from '../room/room.model';

export class Game{
    currentRoom: Room;
    player: GameItem[];
    message: string;

    constructor(initialRoom, player, message){
        this.currentRoom = initialRoom;
        this.player = player;
        this.message = message;
    }
}