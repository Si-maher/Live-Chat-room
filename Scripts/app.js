// Dom queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const rooms = document.querySelector(".chat-rooms");

// add new chat

newChatForm.addEventListener("submit", element => {
  element.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch(error => console.log(error));
});
// add username
newNameForm.addEventListener("submit", element => {
  element.preventDefault();
  // update name via chatroom class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset form
  newNameForm.reset();
  // show then hide the update message
  updateMsg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => {
    updateMsg.innerText = "";
  }, 3000);
});
// update the chatroom
rooms.addEventListener("click", element => {
  if (element.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(element.target.getAttribute("id"));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});
// check local storage for a name
const username = localStorage.username ? localStorage.username : "anon";

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);
// Get chats and render

chatroom.getChats(data => {
  chatUI.render(data);
});
