const hamburger = document.querySelector(".hamburger");
const mobilemenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobilemenu.classList.toggle("active");

  const spans = hamburger.querySelectorAll("span");
  if (hamburger.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(6px, -5px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const icon = themeToggle.querySelector("i");

  if (document.body.classList.contains("light-theme")) {
    icon.classList.replace("fa-moon", "fa-sun");
    document.body.style.background =
      "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
    document.body.style.color = "#1e293b";
    mobilemenu.style.background = "rgba(226, 232, 240, 0.95)";
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    document.body.style.background =
      "linear-gradient(135deg, #0f172a, #1e293b)";
    document.body.style.color = "#f8fafc";
    mobilemenu.style.background = "rgba(15, 23, 42, 0.95)";
  }
});
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobilemenu.classList.remove("active");

    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    const icon = themeToggle.querySelector("i");
    icon.classList.replace("fa-moon", "fa-sun");
    document.body.style.background =
      "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
    document.body.style.color = "#1e293b";
    mobilemenu.style.background = "rgba(226, 232, 240, 0.95)";
  }
});

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});
const aboutSection = document.querySelector(".about-section");

window.addEventListener("scroll", () => {
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight - 100) {
    aboutSection.classList.add("active");
  }
});
document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
    });

    if (response.ok) {
      form.reset();
      form.style.display = "none";
      document.getElementById("success-message").style.display = "block";

      setTimeout(() => {
        document.getElementById("success-message").style.display = "none";
        form.style.display = "block";
      }, 3000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  });
const progressBars = document.querySelectorAll(".progress");

function animateProgress() {
  const triggerBottom = window.innerHeight * 0.85;

  progressBars.forEach((bar) => {
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < triggerBottom) {
      bar.style.width = bar.getAttribute("data-width");
    }
  });
}

window.addEventListener("scroll", animateProgress);
window.addEventListener("load", animateProgress);
const btn = document.getElementById("toggleAbout");
const aboutMore = document.getElementById("aboutMore");

btn.addEventListener("click", () => {
  aboutMore.classList.toggle("hidden");
  btn.textContent = aboutMore.classList.contains("hidden")
    ? "View more"
    : "Show less";
});
const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "all 0.6s ease";
  observer.observe(card);
});
const skills = document.querySelectorAll(".skill-circle");

skills.forEach((skill) => {
  const percentageEl = skill.querySelector(".percentage");
  const value = skill.dataset.skill;

  let count = 0;
  const interval = setInterval(() => {
    if (count <= value) {
      percentageEl.textContent = count + "%";
      skill.style.setProperty("--rotate", `${(count / 100) * 360}deg`);
      skill.style.setProperty("--percent", `${count}%`);
      count++;
    } else {
      clearInterval(interval);
    }
  }, 20);
});
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offset = 80; // navbar height
    const bodyRect = document.body.getBoundingClientRect().top;
    const targetRect = target.getBoundingClientRect().top;
    const scrollTo = targetRect - bodyRect - offset;

    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  });
});
// ===== CONTACT FORM SUBMISSION =====
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        successMessage.style.display = "block"; // Show success message
        form.reset(); // Clear form fields
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000); // Hide message after 5s
      } else {
        alert("Oops! Something went wrong.");
      }
    })
    .catch((error) => {
      alert("Oops! Something went wrong.");
      console.error(error);
    });
});

// ===== SMOOTH SCROLL =====
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth" });
  });
});

// ===== OPTIONAL: SOCIAL BUTTON EFFECTS =====
const socialBtns = document.querySelectorAll(".social-btn");

socialBtns.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});
// const toggleBtn = document.getElementById('mode-toggle');

// toggleBtn.addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
// });
const toggleBtn = document.getElementById('mode-toggle');

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Works for both desktop and mobile
toggleBtn.addEventListener('click', toggleDarkMode);
toggleBtn.addEventListener('touchend', toggleDarkMode);
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mode-toggle');
  toggleBtn.addEventListener('click', toggleDarkMode);
});

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mode-toggle');

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

  // Works for both desktop and mobile
  toggleBtn.addEventListener('click', toggleDarkMode);
  toggleBtn.addEventListener('touchend', toggleDarkMode);
 });

// document.addEventListener('DOMContentLoaded', () => {
//   const toggleBtn = document.getElementById('mode-toggle');

//   function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
//   }

//   toggleBtn.addEventListener('click', toggleDarkMode);
//   toggleBtn.addEventListener('touchend', toggleDarkMode);
// });
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mode-toggle');
  const mobilemenu = document.querySelector('.mobile-menu');
  const icon = toggleBtn.querySelector('i');

  function toggleDarkMode() {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      document.body.style.background = "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
      document.body.style.color = "#1e293b";
      mobilemenu.style.background = "rgba(226, 232, 240, 0.95)";
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      document.body.style.background = "linear-gradient(135deg, #0f172a, #1e293b)";
      document.body.style.color = "#f8fafc";
      mobilemenu.style.background = "rgba(15, 23, 42, 0.95)";
      localStorage.setItem('theme', 'dark');
    }
  }

  // Works on desktop and mobile
  toggleBtn.addEventListener('click', toggleDarkMode);
  toggleBtn.addEventListener('touchend', toggleDarkMode);

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
    document.body.style.background = "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
    document.body.style.color = "#1e293b";
    mobilemenu.style.background = "rgba(226, 232, 240, 0.95)";
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mode-toggle');
  const mobilemenu = document.querySelector('.mobile-menu');
  const icon = toggleBtn.querySelector('i');

  function toggleDarkMode() {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      document.body.style.background = "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
      document.body.style.color = "#1e293b";
      mobilemenu.style.background = "rgba(226, 232, 240, 0.95)";
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      document.body.style.background = "linear-gradient(135deg, #0f172a, #1e293b)";
      document.body.style.color = "#f8fafc";
      mobilemenu.style.background = "rgba(15, 23, 42, 0.95)";
      localStorage.setItem('theme', 'dark');
    }
  }

  toggleBtn.addEventListener('click', toggleDarkMode);
  toggleBtn.addEventListener('touchend', toggleDarkMode);

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
    document.body.style.background = "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
    document.body.style.color = "#1e293b";
    mobilemenu.style.background = "rgba(226, 232, 240, 0.95)";
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mode-toggle');
  const mobilemenu = document.querySelector('.mobile-menu');
  const icon = toggleBtn.querySelector('i');

  function toggleDarkMode() {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      document.body.style.background = "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
      document.body.style.color = "#1e293b";
      mobilemenu.style.background = "rgba(226, 232, 240, 0.95)";
      localStorage.setItem('theme', 'light');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      document.body.style.background = "linear-gradient(135deg, #0f172a, #1e293b)";
      document.body.style.color = "#f8fafc";
      mobilemenu.style.background = "rgba(15, 23, 42, 0.95)";
      localStorage.setItem('theme', 'dark');
    }
  }

  toggleBtn.addEventListener('click', toggleDarkMode);
  toggleBtn.addEventListener('touchend', toggleDarkMode);

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
    document.body.style.background = "linear-gradient(135deg, #e2e8f0, #f1f5f9)";
    document.body.style.color = "#1e293b";
    mobilemenu.style.background = "rgba(226, 232, 240, 0.95)";
  }
});
