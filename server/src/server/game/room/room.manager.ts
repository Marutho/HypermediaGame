import { Room } from './room.model';

export class RoomManager
{
  constructor(private rooms: Room[]){
  }

  generateRooms() {
    this.rooms[0] = this.createRoom(0, "This is the starting room.", ["Left", "Forward", "Right"],[1,2,3], [])
  }

  createRoom(_id, txt, opt, opt_n, invent){
    let rm: Room;
    
    return rm = {
      id: _id,
      text: txt,
      options: opt,
      op_number: opt_n,
      inventory: invent
    };
  }

  getRoom(_id){
    return this.rooms[_id];
  }
}