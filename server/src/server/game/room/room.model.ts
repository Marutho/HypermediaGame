import { Object } from './object.model';

export interface Room {
  id: number;
  state_code: number;
  text: string;
  options: string[];
  inventary: Object[];
}
