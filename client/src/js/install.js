// const butInstall = document.getElementById('buttonInstall');

// // Logic for installing the PWA
// // TODO: Add an event handler to the `beforeinstallprompt` event
// window.addEventListener('beforeinstallprompt', (event) => {});

// // TODO: Implement a click event handler on the `butInstall` element
// butInstall.addEventListener('click', async () => {});

// // TODO: Add an handler for the `appinstalled` event
// window.addEventListener('appinstalled', (event) => {});

const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  butInstall.style.visibility = 'visible';

  butInstall.addEventListener('click', async () => {
    event.prompt();
    console.log("Install button clicked");
    butInstall.setAttribute('disabled', true);
    butInstall.textContent = 'Installed!';
});
});

window.addEventListener('appinstalled', (event) => {
  butInstall.textContent = 'Successfully installed!';
  console.log('appinstalled', event);
});

