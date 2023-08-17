import { openDB } from "idb";

export const db = await openDB("quotes-data", 1, {
  upgrade(db) {
    db.createObjectStore("quotes");
  },
});

const quoteContainer = document.querySelector(".quotes-container");
let donnees = [];

fetch("https://type.fit/api/quotes")
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    db.add("quotes", json, "quotes");
    renderItem(json, "online");
  });

// films file

const renderItem = (data, type) => {
  const showdata = type === "online" ? data : data[0];
  showdata.forEach((quot) => {
    const userCard = document.createElement("div");
    userCard.classList.add("quote");

    userCard.innerHTML = `
    <blockquote>
    ${quot.text}
  </blockquote>
  <p class="author">${quot.author}</p>
                    `;
    quoteContainer.appendChild(userCard);
  });
};

const renderOffline = async () => {
  const quotes = await db.getAll("quotes");
  renderItem(quotes, "offline");
};

renderOffline();
//   register service worker

if ("serviceWorker" in navigator) {
  // Wait for the 'load' event to not block other work
  window.addEventListener("load", async () => {
    // Try to register the service worker.
    try {
      // Capture the registration for later use, if needed
      let reg;

      // import.meta.env.DEV is a special environment variable injected by Vite to let us know we're in development mode. Here, we can use the JS Module form of our service worker because we can control our browsers in dev.
      if (import.meta.env.DEV) {
        reg = await navigator.serviceWorker.register("/service-worker.js", {
          type: "module",
        });
      } else {
        // In production, we use the normal service worker registration
        reg = await navigator.serviceWorker.register("/registerSW.js");
      }

      console.log("Service worker registered! 😎", reg);
    } catch (err) {
      console.log("😥 Service worker registration failed: ", err);
    }
  });
}

// Installation

const btn = document.querySelector(".install-btn");

window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the mini-infobar from appearing on mobile.
  event.preventDefault();
  console.log("👍", "beforeinstallprompt", event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container.
  btn.classList.toggle("hidden", false);
});

btn.addEventListener("click", async () => {
  console.log("👍", "butInstall-clicked");
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  const result = await promptEvent.userChoice;
  console.log("👍", "userChoice", result);
  // Reset the deferred prompt variable, since
  // prompt() can only be called once.
  window.deferredPrompt = null;
  // Hide the install button.
  btn.classList.toggle("hidden", true);
});
