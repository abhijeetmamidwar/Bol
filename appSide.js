const check_key = function (rooms, room, key) {
    for (let j = 0; j < rooms.length; j++) {
        if (rooms[j]["room"] === room && rooms[j]["key"] === key) {
            return true
        }
    }
    return false
}

const validate_name_room = function (user, room) {
    if (user.length != 0 && room.length != 0) {
        return true
    }
    return false
}

const create_Room = function (rooms, params) {
    for (let j = 0; j < rooms.length; j++) {
        if (rooms[j]["room"] == params.room) {
            return true
        }
    }
    return false
}

module.exports = {check_key, validate_name_room, create_Room}