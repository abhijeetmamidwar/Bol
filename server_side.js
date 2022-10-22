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
            flag : 0,
            msg : "Room Name Not Available try other one"
        }
    }
    else{
        let temp = {Name: "", key : "", Users : []}
        temp["Name"] = room
        temp["key"] = key
        temp["Users"].push(user)
        Rooms.push(temp)
        return {flag: 1,Rooms: Rooms}
    }
}

module.exports = {create_Room, check_RoomPresent}