// Adding new chat docs
// Setting up a real-time listener to get new chats
// Updating the username
// Updating the room

class Chatroom {
  constructor(room, username) {
    (this.room = room),
      (this.username = username),
      (this.chats = dataBase.collection("chats"));
  }
  async addChat(message) {
    // format a chat object
    const now = new Date();
    // Every chat will have this object
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // Save the chat doc

    const response = await this.chats.add(chat);
    return response;
  }
}
const chatroom = new Chatroom("politics", "Shaun");
chatroom
  .addChat("Hello everyone")
  .then(() => {
    console.log("Chat added");
  })
  .catch(error => {
    console.log(error);
  });
