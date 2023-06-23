window.addEventListener("alpine:init", () => {
  Alpine.data("users", () => ({
    me: {},
    users: [],
    chatWith: "",
    isEmojiOpen: false,

    currentChat: {},
    message: "",

    init: async function () {
      this.users = await fetch("/api/users").then((user) => user.json());
      this.me = await fetch("/api/users/me").then((me) => me.json());
      window.addEventListener("keydown", (e) => {
        e.key === "Escape" && (this.isEmojiOpen = false);
      });
    },

    selectChat: async function (username) {
      this.chatWith = username;
      this.currentChat = this.users.find((user) => user.username === username);
      this.isEmojiOpen = false;

      const response = await fetch(`/messages/${this.currentChat.id}`);
      console.log(await response.json());
    },

    send: async function (e) {
      const formData = new FormData(e.target);

      if (!formData.get("message")) return;

      const response = await fetch("/messages", { method: "POST", body: formData });
      const data = await response.json();

      this.message = "";
    },
  }));
});
