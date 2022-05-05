const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  butInstall.style.visibility = "visible";

  // TODO: Implement a click event handler on the `butInstall` element
  butInstall.addEventListener("click", async () => {
    event.prompt();
    console.log("Install button clicked");
    butInstall.setAttribute("disabled", true);
    butInstall.textContent = "Installed!";
  });
});

window.addEventListener("appinstalled", (event) => {
  butInstall.textContent = "Installation A Success!";
  console.log("👍", "appinstalled", event);
});
