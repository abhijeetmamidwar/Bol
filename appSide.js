const check_key = function (key) {
    if (key == "0000") {
        return true
    }
    return false
}

const validate_name_room = function (user, room) {
    if (user.length != 0 && room.length != 0) {
        return true
    }
    return false
}

module.exports = {check_key, validate_name_room}