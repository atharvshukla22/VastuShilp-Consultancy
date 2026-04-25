document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger) hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.08 });
  document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

  highlightNav();
});

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) { target.classList.add("active"); window.scrollTo({ top: 0, behavior: "smooth" }); }
  document.getElementById("mobileMenu").classList.remove("open");
  highlightNav();
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.08 });
  document.querySelectorAll("#" + id + " .fade-up").forEach(el => { el.classList.remove("visible"); obs.observe(el); });
}

function highlightNav() {
  document.querySelectorAll(".nav-links a[data-page]").forEach(l => l.classList.remove("active"));
  const active = document.querySelector(".page.active")?.id;
  if (active) document.querySelectorAll(".nav-links a[data-page='" + active + "']").forEach(l => l.classList.add("active"));
}

function closeMobile() { document.getElementById("mobileMenu").classList.remove("open"); }

function handleForm(e) {
  e.preventDefault();
  const name    = document.getElementById("f-name").value.trim();
  const phone   = document.getElementById("f-phone").value.trim();
  const service = document.getElementById("f-service").value || "a Vastu Consultation";
  const msg     = document.getElementById("f-message").value.trim();
  let text = "Jai Shri Ram \uD83D\uDE4F I am interested in the " + service + " and need your consultation. Please guide me.";
  if (name)  text += "\nName: " + name;
  if (phone) text += "\nPhone: " + phone;
  if (msg)   text += "\nMessage: " + msg;
  window.open("https://wa.me/919977110496?text=" + encodeURIComponent(text), "_blank");
}