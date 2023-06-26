window.addEventListener("alpine:init", () => {
  Alpine.data("users", () => ({
    me: {},
    users: [],
    activeUsers: [],
    chatWith: "",
    isEmojiOpen: false,

    currentChat: {},
    chatMessages: [],
    message: "",
    autoscroll: null,
    socket: null,

    init: async function () {
      this.users = await fetch("/api/users").then((user) => user.json());
      this.me = await fetch("/api/users/me").then((me) => me.json());
      window.addEventListener("keydown", (e) => {
        e.key === "Escape" && (this.isEmojiOpen = false);
      });

      this.socket = io();
      this.socket.emit("add-active-user", this.me.id);

      this.socket.on("get-users", (activeUsers) => {
        this.activeUsers = activeUsers;
      });

      this.socket.on("receive-msg", (data) => {
        if (data.sender === this.currentChat.id) {
          this.chatMessages.push(data);
        }
      });

      this.autoscroll =
        this.$refs.div &&
        this.$refs.div.offsetHeight + this.$refs.div.scrollTop > this.$refs.div.scrollHeight - 20;
      this.$watch("chatMessages", () => {
        if (this.autoscroll) this.$refs.div.scrollTo(0, this.$refs.div.scrollHeight);
      });
    },

    selectChat: async function (username) {
      this.chatWith = username;
      this.currentChat = this.users.find((user) => user.username === username);
      this.isEmojiOpen = false;

      const response = await fetch(`/messages/${this.currentChat.id}`);
      this.chatMessages = await response.json();
    },

    send: async function (e) {
      const formData = new FormData(e.target);

      if (!formData.get("message")) return;

      const response = await fetch("/messages", { method: "POST", body: formData });
      const data = await response.json();

      this.chatMessages.push(data);
      this.socket.emit("send-msg", { ...data, to: this.currentChat.id });

      this.message = "";
    },
  }));
});
