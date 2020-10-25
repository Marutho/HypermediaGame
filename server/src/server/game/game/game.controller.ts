import {Game} from './game.model'
import {Room} from '../room/room.model'
import { Player } from '../player/player.model';
import { GameItem } from '../game_item/game_item.model';

export class GameController{

    map : Room[];

    constructor() {
        
        const newMap = require('./Map.json');
        this.map = [];
        for(let i =0;i<newMap.Rooms.length;i++)
        {
            if(newMap.Rooms[i].inventory.length != 0)
            {
                this.map.push(new Room(newMap.Rooms[i].id,
                    newMap.Rooms[i].text,
                    newMap.Rooms[i].options,
                    newMap.Rooms[i].neighbours,
                    newMap.Rooms[i].doors,
                    [new GameItem(newMap.Rooms[i].inventory[0], newMap.Rooms[i].inventory[1], newMap.Rooms[i].inventory[2], newMap.Rooms[i].inventory[3])]));
            }
            else
            {
                this.map.push(new Room(newMap.Rooms[i].id,
                    newMap.Rooms[i].text,
                    newMap.Rooms[i].options,
                    newMap.Rooms[i].neighbours,
                    newMap.Rooms[i].doors,
                    []));
            }
        }
         console.log(this.map);
        // this.map = [
        //     new Room(0,"start room", ["forward", "right", "left"],[1,2,3],[true, false, false],[]),
        //     new Room(1,"room 1", ["back"],[0],[false],[new GameItem("coin", "Is a gold coin",1,0)]),
        //     new Room(2,"room 2", ["left"],[0],[false],[]),
        //     new Room(3,"room 3", ["right"],[0],[false],[new GameItem("key", "Is a simple key", 0,0)])
        // ];
        // console.log(this.map);
    }

    /**
     * @api GET /start
     * 
     * This method creates a new game
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    startGame(req, res, next) {
        res.send(new Game(this.map[0], new Player(), this.map[0].text));
    }

    /**
     * @api GET /inventory
     * 
     * This method sends the inventory of the player
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    showInventory(req, res, next) {
        if(req.body){
            res.send(this.printInventory(req.body));
        }
    }

    /**
     * @api POST /room/:id/forward
     * 
     * This method tries to apply an action in the game provided
     * 
     * @param req 
     * @param res 
     * @param next 
     */

     forward(req, res, next) {
        if(req.params.id && req.body){
            res.send(this.tryToGoTo(req.params.id,"up", req.body));
        }
     }

     /**
     * @api POST /room/:id/left
     * 
     * This method tries to apply an action in the game provided
     * 
     * @param req 
     * @param res 
     * @param next 
     */

    left(req, res, next) {
        if(req.params.id && req.body){
            res.send(this.tryToGoTo(req.params.id,"left", req.body));
        }
     }

     /**
     * @api POST /room/:id/right
     * 
     * This method tries to apply an action in the game provided
     * 
     * @param req 
     * @param res 
     * @param next 
     */

    right(req, res, next) {
        if(req.params.id && req.body){
            res.send(this.tryToGoTo(req.params.id,"right", req.body));
        }
     }

     /**
     * @api POST /room/:id/back
     * 
     * This method tries to apply an action in the game provided
     * 
     * @param req 
     * @param res 
     * @param next 
     */

    back(req, res, next) {
        if(req.params.id && req.body){
            res.send(this.tryToGoTo(req.params.id,"down", req.body));
        }
     }

     tryToGoTo(id : number, option: string, player : Player){
        var index = this.map[id].options.indexOf(option);
        if(index >= 0){
            var locked = this.map[id].doors[index] && !player.history[this.map[id].neighbours[index]];
            if(!locked || this.hasKey(player))
            {
                var r = this.map[this.map[id].neighbours[index]];
                var message = r.text;
                if(locked){
                    message = "There is a locked door.\nYou used a key from your inventory to open the door.\nThe key brokes after you open the door.\n";
                }
                return this.checkRoom(player, r, message);
            }
            else{
                return new Game(this.map[id], player, "There is a locked door")
            }
        }
        else{
            return new Game(this.map[id], player, "you cannot through there")
        }
      }

      printInventory(player: Player){
          var strInventory;
          if(player.inventory && player.inventory.length>0){
            strInventory = "You have :\n";
            for (let index = 0; index < player.inventory.length; index++) {
                const item = player.inventory[index];
                if(!item.used)
                strInventory += `${item.name}`
            }
          }
          else{
            strInventory = "There is nothing in your inventory";
          }          

          return new Game(null, player, strInventory);
      }

      checkRoom(player: Player, room: Room, message: string){
        if(!player.history[room.id])
        {            
            player.history[room.id] = true;
            for (let index = 0; index < room.inventory.length; index++)
            {
                var item = room.inventory[index];
                this.addToInventory(player, item);   
                message += `\nYou have found a ${item.name}\n`;
            }
        }
        else
        {
            message += "\nYou have already been here!";
        }

        return new Game(room, player, message);
      }

    addToInventory(player, item){
        player.inventory[player.inventory.length] = item;
    }

    hasKey(player){
        for (let index = 0; index < player.inventory.length; index++) {
            const element = player.inventory[index];
            if(element.type == 0 && !element.used){
                element.used = true;
                return true;
            }
        }
        return false;
    }
}