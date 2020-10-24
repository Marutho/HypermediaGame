
export class GameItem {
  name: string;
  description: string;
  used: boolean;
  type: number; //0 => key, 1 => coin
  value: number; //the value of the coin if its a coin

  constructor(name, description,type, value){
    this.name = name;
    this.description = description;
    this.used = false;
    this.type = type;
    this.value = value;
  }
}
