// Change this to the email address that should receive enquiries.
const CONTACT_EMAIL = "hello@nextech.com";

const burger = document.querySelector(".burger");
const menu = document.getElementById("menu");

function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
}
burger.addEventListener("click", () =>
  setMenu(!menu.classList.contains("open")),
);
menu
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", () => setMenu(false)));

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("quote");
const msg = form.querySelector(".msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim());

  if (!d.name.trim() || !emailOk || d.message.trim().length < 10) {
    msg.className = "msg err";
    msg.textContent =
      "Please enter your name, a valid email and a message of at least 10 characters.";
    return;
  }

  const body = `Name: ${d.name}\nEmail: ${d.email}\nService: ${d.service}\n\n${d.message}`;
  const subject = "Project enquiry: " + d.service;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  msg.className = "msg ok";
  msg.textContent =
    "Thanks! Your email app is opening with your message ready to send.";
  form.reset();
});
