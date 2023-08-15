import { openDB } from "idb";

const db = await openDB("quotes-data", 1, {
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

renderItem(await db.getAll("quotes"), "offline");
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
        reg = await navigator.serviceWorker.register("/service-worker.js");
      }

      console.log("Service worker registered! 😎", reg);
    } catch (err) {
      console.log("😥 Service worker registration failed: ", err);
    }
  });
}
