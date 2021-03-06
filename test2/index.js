const assert = require("chai").assert;

const friends = []


const database = {
    621: { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
    123: { id: 123, name: "FriendNo1", friends: [621, 631] },
    251: { id: 251, name: "SecondBestFriend", friends: [621] },
    631: { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] }
};

const getUser = id => new Promise((res, rej) => {
    setTimeout(() => {
        database[id] ? res(database[id]) : rej(new Error("not_found"))
    }, 300);
});

const expected = [
    { id: 621, name: "XxDragonSlayerxX", friends: [
        { id: 123, name: "FriendNo1", friends: [621, 631] },
        { id: 251, name: "SecondBestFriend", friends: [621] },
        { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] }
    ] },
    { id: 123, name: "FriendNo1", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
        { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] }
    ] },
    { id: 251, name: "SecondBestFriend", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] }
    ] },
    { id: 631, name: "ThirdWh33l", friends: [
        { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
        { id: 123, name: "FriendNo1", friends: [621, 631] },
        { id: 251, name: "SecondBestFriend", friends: [621] },
    ] },
];

const validate = (result) => {
    try {
        assert.deepEqual(result, expected);
    } catch (e) {
        console.error("Failed", e);
    }
};

const getFriends =  (ids) => {

    var list = [];
    for (var id of ids)
    {
        var index = friends.findIndex(obj => obj.id === id);
        list.push(friends[index])

    }

  return list;


};

const processFriend = (friend) => {

    var newFriend = {

        id: friend.id,
        name: friend.name,
        friends: getFriends(friend.friends)

    }

    return newFriend;


};


const process = (objects) => {

Object.keys(objects).forEach(function(key) {
    // console.table('Key : ' + key + ', Value : ' + objects[key]);
    friends.push(objects[key])
  })

var newFriends = friends.map(processFriend);

return newFriends;

}

// implement a method to create this result
const result = process(database);
console.log(result);

// At the end call validate
validate(result);
