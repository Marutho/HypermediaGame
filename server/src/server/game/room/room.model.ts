import { game_item} from '../game_item/game_item.model';

export interface Room {
  id: number;
  text: string;
  options: string[];        //Left, Forward, Right
  op_number: number[];      //201 , 295    , 130
  inventory: game_item[];
}
