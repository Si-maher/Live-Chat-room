// Dom queries
const chatList = document.querySelector(".chat-list");

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", "Hanna");
// Get chats and render

chatroom.getChats(data => {
  chatUI.render(data);
});
