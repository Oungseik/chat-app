window.addEventListener("alpine:init", () => {
  Alpine.data("formData", () => ({
    error: "",
    init() {
      this.$refs.form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const response = await fetch("http://localhost:3000/login/", {
          method: "POST",
          body: data,
        });

        if (response.status === 400) {
          const responseData = await response.json();
          console.log(responseData);
        }

        if (response.status === 302) {
          const { url } = await response.json();
          window.location = url;
        }
      });
    },
  }));
});
