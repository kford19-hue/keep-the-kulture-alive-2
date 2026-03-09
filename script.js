const page = document.body.dataset.page;

document.querySelectorAll("nav a[data-link]").forEach((link) => {
  if (link.dataset.link === page) {
    link.classList.add("active");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el, idx) => {
  el.style.transitionDelay = `${idx * 70}ms`;
  observer.observe(el);
});
