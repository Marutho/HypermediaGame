import { Room } from './room.model';

export class RoomManager
{
  constructor(private rooms: Room[]){
  }

  generateRooms() {
    this.rooms[0] = this.createRoom(0, 100, "This is the starting room.", ["Left", "Forward", "Right"], [])
  }

  createRoom(_id, st_code, txt, opt, invent)
  {
    let rm: Room;
    
    return rm = {
      id: _id,
      state_code: st_code,
      text: txt,
      options: opt,
      inventory: invent
    };
  }
}