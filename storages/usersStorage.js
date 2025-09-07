// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
  constructor() {
    this.storage = [
      {
        id: 1,
        firstName: "Poo",
        lastName: "Brains",
        email: "poobrain@gmail.com",
        age: "32",
        bio: "Lots of brain, mainly made of Poo",
      },
      {
        id: 2,
        firstName: "Bum",
        lastName: "Features",
        email: "bumfeatures@gmail.com",
        age: "43",
        bio: "Nice features, but they look like a bum",
      },
    ];
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
module.exports = new UsersStorage();
