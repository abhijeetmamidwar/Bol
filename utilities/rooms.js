class Rooms {
    constructor() {
        this.rooms = []
    }

    addroom(room, key){
        var temp = {room, key, users:[]}
        this.room.push(temp);
    }

    removeroom(room, key){
        this.rooms = this.rooms.filter((roomI) => roomI.room !== room && roomI.key != key )
    }

    updatemembers(room, key){
        
    }
}