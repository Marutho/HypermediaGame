import {Player} from '../player/player.model';
import {Room} from '../room/room.model';

export class Game{
    options: string[];
    endpoints: string[];
    methods: string[];
    player: Player[];
    message: string;

    constructor(room, player, message){
        var index = 0;
        this.options = [];
        this.endpoints = [];
        this.methods = [];
        if(room)
        {
            for (index; index < room.options.length; index++) {
                const element = room.options[index];
                this.options[index] = element;
                this.endpoints[index] =  `/room/${room.id}/${element}`;   
                this.methods[index] = "POST";
            }
            this.options[index] = "inventory";
            this.endpoints[index] =  `/inventory`;
            this.methods[index] = "GET";
        }        
        this.player = player;
        this.message = message;
    }
}