document.addEventListener("DOMContentLoaded", () => {
  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  const scrollReveal = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", scrollReveal);

  // Smooth Scrolling for Nav Links
  document
    .querySelectorAll(".nav-links a, .hero-actions a")
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      });
    });

  // Reveal Elements on Scroll using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Active Link Highlighting
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  const activateNavItem = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", activateNavItem);

  // Form Handling with Feedback
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector("button");
      const originalText = submitBtn.textContent;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending Message...";
      submitBtn.style.opacity = "0.7";

      // --- Temporary local testing ---
      const isLocal =
        location.hostname === "localhost" || location.hostname === "127.0.0.1";
      if (isLocal) {
        // Simulate successful submission locally
        setTimeout(() => {
          contactForm.reset();
          document.getElementById("form-popup").style.display = "flex";
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.opacity = "1";
        }, 1000); // 1 second delay to simulate network
        return;
      }

      // --- Real submission for deployed site ---
      const formData = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          contactForm.reset();
          document.getElementById("form-popup").style.display = "flex";
        } else {
          alert("❌ Message failed. Try again.");
        }
      } catch (error) {
        alert("❌ Network error. Try again.");
      }

      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = "1";
    });
  }

  // Mobile Menu Logic
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      if (navLinks.style.display === "flex") {
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "100%";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.background = "var(--bg-dark)";
        navLinks.style.padding = "2rem";
        navLinks.style.borderBottom = "1px solid var(--glass-border)";
      }
    });
  }
});
