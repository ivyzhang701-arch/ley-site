/* =====================================================================
   LEY — site-wide scripts
     1. Mobile nav toggle + accessible state
     2. Sticky header blur-on-scroll
     3. Active nav link highlighting
     4. Scroll-reveal (Intersection Observer)
     5. Hero "ready" state for image ken-burns
     6. Footer year
     7. Magnetic hover (light-touch) for primary CTAs on fine pointers
   ===================================================================== */
(function () {
  "use strict";

  // Progressive-enhancement flag — CSS only hides reveal elements while js is on.
  document.documentElement.classList.add("js");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* --- 1. Mobile nav toggle --- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    // close when a link is tapped
    nav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    // ensure nav collapses when width grows past tablet
    const mq = window.matchMedia("(min-width: 901px)");
    mq.addEventListener("change", (ev) => {
      if (ev.matches) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* --- 2. Sticky header blur-on-scroll --- */
  const header = document.querySelector(".site-header");
  if (header) {
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* --- 3. Active nav link --- */
  let path = window.location.pathname.split("/").pop().toLowerCase();
  if (!path) path = "index.html";
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (href === path) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* --- 4. Scroll reveal --- */
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (
    revealTargets.length &&
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    revealTargets.forEach((el) => io.observe(el));

    // Safety net: force-reveal anything still hidden after page settle.
    window.addEventListener("load", () => {
      setTimeout(() => {
        document
          .querySelectorAll("[data-reveal]:not(.is-visible)")
          .forEach((el) => el.classList.add("is-visible"));
      }, 2400);
    });
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* --- 5. Hero ken-burns kick-in on load --- */
  const hero = document.querySelector(".hero");
  if (hero) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => hero.classList.add("is-ready"));
    });
  }

  /* --- 6. Footer year --- */
  document.querySelectorAll("#footerYear").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* --- 7. Magnetic hover for primary CTAs (fine pointers only) --- */
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (finePointer && !prefersReducedMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = 6;
      let frame = null;
      const move = (e) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
      };
      const reset = () => {
        cancelAnimationFrame(frame);
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
    });
  }
})();
