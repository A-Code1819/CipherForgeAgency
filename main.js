/* =========================================
   MOBILE NAVIGATION
========================================= */

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {

  hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");

  });

}

/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {

  if(cursorGlow){

    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";

  }

});

/* =========================================
   COUNTER ANIMATION
========================================= */

const counter = document.getElementById("counter");

if(counter){

  let current = 0;
  const target = 878;

  const updateCounter = () => {

    current += 6;

    if(current >= target){
      current = target;
    }

    counter.innerText = current;

    if(current < target){
      requestAnimationFrame(updateCounter);
    }

  };

  updateCounter();

}

/* =========================================
   ACTIVE NAV LINK
========================================= */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-item").forEach(link => {

  const href = link.getAttribute("href");

  link.classList.remove("active");

  if(href === currentPage){

    link.classList.add("active");

  }

});

/* =========================================
   PAGE TRANSITION
========================================= */

document.querySelectorAll("a").forEach(link => {

  const href = link.getAttribute("href");

  if(
    href &&
    !href.startsWith("#") &&
    !href.startsWith("http") &&
    !link.hasAttribute("target")
  ){

    link.addEventListener("click", function(e){

      e.preventDefault();

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 300);

    });
  }
});

//portfolio filter
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove active highlights from all buttons, apply to the clicked one
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // 2. Filter the cards
      portfolioCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
});

/* --- SECURE INTAKE PORTAL PACKET SANITIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
  const secureForm = document.querySelector('.contact-form-hardened');
  
  if (secureForm) {
    secureForm.addEventListener('submit', (e) => {
      const nameInput = secureForm.querySelector('input[name="name"]');
      const messageInput = secureForm.querySelector('textarea[name="message"]');
      
      // XSS Mitigation Regular Expression: Targets structural angle brackets 
      const maliciousPattern = /[<>]/g;
      
      if (maliciousPattern.test(nameInput.value) || maliciousPattern.test(messageInput.value)) {
        console.warn("[!] Security Alert: Cross-Site Scripting (XSS) payload vectors intercepted.");
        
        // Sanitize the text fields dynamically by stripping syntax blocks
        nameInput.value = nameInput.value.replace(maliciousPattern, "");
        messageInput.value = messageInput.value.replace(maliciousPattern, "");
        
        console.log("[*] Packet data sanitized. Transmission stream cleared for dispatch.");
      }
    });
  }
});

// --- SOC Dashboard Live Counter Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const counterEl = document.getElementById('blocked-threats');
    if (!counterEl) return;

    const targetValue = 878;
    const duration = 2000; // Counter takes 2 seconds to roll up smoothly
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for a premium slowing effect at the end
        const easeOutQuad = progress * (2 - progress);
        const currentValue = Math.floor(easeOutQuad * targetValue);
        
        counterEl.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Once rollup completes, activate the background live network ticker
            startLiveTicker(targetValue);
        }
    }

    requestAnimationFrame(updateCounter);

    function startLiveTicker(initialValue) {
        let currentCount = initialValue;
        // Simulates a new threat intercepted randomly every 15 to 45 seconds
        setInterval(() => {
            currentCount++;
            counterEl.textContent = currentCount;
            
            // Brief glowing highlight pulse to indicate live event activity
            counterEl.style.color = '#5AC8FA'; 
            counterEl.style.textShadow = '0 0 12px rgba(90, 200, 250, 0.6)';
            setTimeout(() => {
                counterEl.style.color = ''; 
                counterEl.style.textShadow = '';
            }, 800);
        }, Math.random() * (45000 - 15000) + 15000);
    }
});

// --- Formspree AJAX Submission & Success Modal Controller ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const modal = document.getElementById('successModal');

    if (form && modal) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop traditional form redirecting

            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Switch to processing visual feedback
            button.textContent = "TRANSMITTING DATA...";
            button.disabled = true;
            button.style.opacity = '0.7';

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset(); // Wipe all form inputs clear
                    modal.style.display = 'flex'; // Launch custom dashboard modal
                } else {
                    alert("Secure transmission refused by endpoint node. Please verify fields and re-transmit.");
                }
            } catch (error) {
                alert("Network routing connection error. Please leverage direct communications.");
            } finally {
                // Restore button defaults
                button.textContent = originalText;
                button.disabled = false;
                button.style.opacity = '';
            }
        });
    }
});

// Global modal execution controller
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}