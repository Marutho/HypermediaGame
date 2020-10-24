
export class GameItem {
  name: string;
  description: string;
  used: boolean;
  type: number; //0 => key, 1 => coin

  constructor(name, description,type){
    this.name = name;
    this.description = description;
    this.used = false;
    this.type = type;
  }
}
