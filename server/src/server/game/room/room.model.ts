import { GameItem} from '../game_item/game_item.model';

export class Room {
  id: number;
  text: string;
  options: string[];
  neighbours: number[];
  doors: boolean[];
  inventory: GameItem[];

  constructor(id, text, options, neighbours, doors, inventory){
    this.id = id;
    this.text = text;
    this.options = options;
    this.neighbours = neighbours;
    this.doors = doors;
    this.inventory = inventory;
  }  
}
