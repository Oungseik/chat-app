window.addEventListener("alpine:init", () => {
  Alpine.data("users", () => ({
    me: null,
    users: [],
    chatWith: "",

    currentChat: null,

    init: async function () {
      this.users = await fetch("/api/users").then((user) => user.json());
      this.me = await fetch("/api/users/me").then((me) => me.json());
    },

    selectChat(username) {
      this.chatWith = username;
      this.currentChat = this.users.find((user) => user.username === username);
    },
  }));
});
