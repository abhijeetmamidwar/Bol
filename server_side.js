var Rooms = [
    {Name: "Default", key : "0000", Users : []}
]

let check_RoomPresent = function (room) {
    if (Rooms.filter((r) => r.Name == room).length != 0) return true
    return false
}

let create_Room = function (room, user, key) {
    if (check_RoomPresent(room)) {
        return {
            msg : "Room Name Not Available try other one"
        }
    }
    else{
        let temp = {}
        temp["Name"] = room
        temp["key"] = key
        temp["User"] = [user]
        Rooms.push(temp)
        return Rooms
    }
}

module.exports = {create_Room}