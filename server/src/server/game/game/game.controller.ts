import {Game} from './game.model'
import {Room} from '../room/room.model'
import { Player } from '../player/player.model';

export class GameController{

    map : Room[];

    constructor() {
        this.map = [
            new Room(0,"start room", ["forward", "right", "left"],[1,2,3],[false, false, false],[]),
            new Room(1,"room 1", ["back"],[0],[false],[]),
            new Room(2,"room 2", ["back"],[0],[false],[]),
            new Room(3,"room 3", ["back"],[0],[false],[])
        ];
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
        res.send(new Game(this.map[0], new Player(), "Here starts your adventure"));
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
            res.send(this.tryToGoTo(req.params.id,"forward", req.body));
        }
     }

     /**
     * @api POST /room/:id/lefy
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
            res.send(this.tryToGoTo(req.params.id,"back", req.body));
        }
     }

     tryToGoTo(id, option, player){
        var index = this.map[id].options.indexOf(option);
        if(index >= 0){
            var r = this.map[this.map[id].neighbours[index]];
          return new Game(r, player, "success");
        }
        else{
            return new Game(this.map[id], player, "you cannot through there")
        }
      }
}