class Rooms {
    constructor() {
        this.rooms = []
    }

    addroom(room, key){
        var temp = {room: room, key: key, users:[]}
        this.rooms.push(temp);
    }

    adduser(socketId, room){
        for (let j = 0; j < this.rooms.length; j++) {
            if (this.rooms[j]["room"] === room) {
                this.rooms[j]["users"].push(socketId)
                break
            }
        }
    }

    removeroom(room){
        this.rooms = this.rooms.filter((roomI) => roomI.room !== room)
    }

    removeuser(socketId){
        for (let j = 0; j < this.rooms.length; j++) {
            var flag = 1
            var temp = 1
            for( var i = 0; i < this.rooms[j]["users"].length; i++){ 
                if ( this.rooms[j]["users"][i] === socketId) { 
                    this.rooms[j]["users"].splice(i, 1);
                    flag = 0
                }
                if (this.rooms[j]["users"].length == 0) {
                    this.removeroom(this.rooms[j]["room"])
                    temp = 0
                }
                if (flag == 0) {
                    if(temp == 1)
                        return this.rooms[j]["room"]
                    break
                }
            }
            if (flag == 0) {
                break
            }
        }
    }

    total_users_in_room(room){
        for (let j = 0; j < this.rooms.length; j++) {
            if (this.rooms[j]["room"] === room) {
                return this.rooms[j]["users"].length
            }
        }
    }
    
}

module.exports = {Rooms}