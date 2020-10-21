import { game_item} from '../game_item/game_item.model';

export interface Room {
  id: number;
  state_code: number;
  text: string;
  options: string[];
  inventory: game_item[];
}
