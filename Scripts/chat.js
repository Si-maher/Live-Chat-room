// Adding new chat docs
// Setting up a real-time listener to get new chats
// Updating the username
// Updating the room

class Chatroom {
  constructor(room, username) {
    (this.room = room),
      (this.username = username),
      (this.chats = dataBase.collection("chats"));
    this.unsub;
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
    this.unsub = this.chats
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
  updateName(username) {
    this.username = username;
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

// setTimeout(() => {
//   chatroom.updateRoom("general");
//   chatroom.updateName("Hanna");
//   chatroom.getChats(data => {
//     console.log(data);
//   });
//   chatroom.addChat("Hello");
// }, 3000);
