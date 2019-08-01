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
  //   ************************************
  //   Creating the real-time listener
  //   ****************************************
  getChats(callback) {
    //   'Where', only where the condition is true
    // Only use == in firestorm
    this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            // update the UI
            callback(change.doc.data());
          }
        });
      });
  }
}
const chatroom = new Chatroom("politics", "Shaun");
chatroom.getChats(data => {
  console.log(data);
});
