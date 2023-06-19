window.addEventListener("alpine:init", () => {
  Alpine.data("formData", () => ({
    init() {
      this.$refs.form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const response = await fetch("http://localhost:3000/register/", {
          method: "POST",
          body: data,
        });

        if (response.status === 302) {
          const { url } = await response.json();
          window.location.replace(url);
        }
      });
    },
  }));
});
