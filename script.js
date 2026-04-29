
// Track the current item being requested
let currentItem = "";

// MODAL FUNCTIONS
function requestItem(item) {
  if (!item) return;
  
  currentItem = item;
  const modalTitle = document.getElementById("modalTitle");
  const modal = document.getElementById("requestModal");
  
  if (modalTitle) {
    modalTitle.innerText = `Request: ${item}`;
  }
  
  if (modal) {
    modal.style.display = "flex";
    // Trap focus inside modal
    const firstInput = modal.querySelector("input");
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }
}

/**
 * Closes the request modal
 */
function closeModal() {
  const modal = document.getElementById("requestModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Close modal when clicking outside content
window.addEventListener("click", function (e) {
  const modal = document.getElementById("requestModal");
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});


// FORM SUBMISSION WITH EMAILJS


document.addEventListener("DOMContentLoaded", function () {
  
  // Initialize EmailJS
  (function () {
    if (typeof emailjs !== "undefined") {
      emailjs.init("pmO2wo-WZanfsMlxG");
    }
  })();

  const form = document.getElementById("modalForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const userEmail = document.getElementById("userEmail")?.value?.trim();
      const details = document.getElementById("details")?.value?.trim();
      const submitBtn = form.querySelector('button[type="submit"]');

      // Basic validation
      if (!userEmail) {
        alert("⚠️ Please enter your email address.");
        return;
      }

      if (!isValidEmail(userEmail)) {
        alert("⚠️ Please enter a valid email address.");
        return;
      }

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Sending...";
      }

      // Create fresh timestamp
      const timestamp = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Send via EmailJS
      if (typeof emailjs !== "undefined") {
        emailjs
          .send("service_xfw9cxn", "template_lsliend", {
            item_name: currentItem || "Not specified",
            item_details: details || "No extra details provided",
            user_email: userEmail,
            timestamp: timestamp,
          })
          .then(function (response) {
            console.log("Email sent successfully:", response);
            alert("🎉 Your request has been sent successfully! We'll get back to you soon.");
            form.reset();
            closeModal();
          })
          .catch(function (error) {
            console.error("EmailJS error:", error);
            alert("❌ Failed to send request. Please try again later.\n\nError: " + (error.text || "Unknown error"));
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerText = "Send Request";
            }
          });
      } else {
        alert("⚠️ Email service is not available at the moment. Please contact us directly via WhatsApp.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = "Send Request";
        }
      }
    });
  }

  
  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-stagger, .product, #about, #products, #contact"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          
          if (!entry.target.classList.contains("reveal-stagger")) {
            revealObserver.unobserve(entry.target);
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // SMOOTH SCROLL FOR NAVIGATION LINKS
  
  document.querySelectorAll('.nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.style.color = "";
      link.style.background = "";
      if (link.getAttribute("href") === `#${current}`) {
        link.style.color = "#ff6f61";
        link.style.background = "rgba(255, 111, 97, 0.1)";
      }
    });
  });

  
  // LAZY LOAD IMAGES WITH LOADED CLASS
  
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  lazyImages.forEach((img) => {
    img.addEventListener("load", () => {
      img.classList.add("loaded");
    });
    
    // If image is already cached/loaded
    if (img.complete) {
      img.classList.add("loaded");
    }
  });

  
  // HEADER SCROLL EFFECT
  
  const header = document.querySelector("header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
    } else {
      header.style.boxShadow = "none";
    }

    lastScroll = currentScroll;
  });

  console.log("🚀 Fend24 Tech Ent - Professional enhancements active!");
});


// UTILITY: Email Validation

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
              }    item_details: details || "No extra details",
    user_email: userEmail,
    timestamp: timestamp   
  })
  .then(function (response) {
    alert("🎉 Your request has been sent successfully!");
    form.reset();
    closeModal();
  })
  .catch(function (error) {
    console.error("EmailJS error:", error);
    alert("❌ Failed to send request: " + error.text);
  });
    });
  }
});
