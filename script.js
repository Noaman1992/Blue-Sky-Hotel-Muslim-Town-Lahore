document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const images = carousel.querySelectorAll("img");
  const totalImages = images.length;
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let index = 0;
  let interval;

  // Move to selected image
  const showImage = () => {
    carousel.style.transform = `translateX(-${index * 100}%)`;
  };

  // Auto slide every 3 seconds
  const startAutoSlide = () => {
    interval = setInterval(() => {
      index = (index + 1) % totalImages;
      showImage();
    }, 3000);
  };

  // Stop auto slide on hover
  const stopAutoSlide = () => clearInterval(interval);

  // Button click events
  nextBtn.addEventListener("click", () => {
    index = (index + 1) % totalImages;
    showImage();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + totalImages) % totalImages;
    showImage();
  });

  // Pause on hover, show arrows
  const gallery = carousel.parentElement;
  gallery.addEventListener("mouseenter", () => {
    stopAutoSlide();
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  });

  // Resume on mouse leave, hide arrows
  gallery.addEventListener("mouseleave", () => {
    startAutoSlide();
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  });

  // Start initially
  startAutoSlide();

  // ===== Limited Time Offer Scrolling Text =====
(function() {
  const messages = [
    "Free Breakfast for 2 persons per room",
    "10% Off for more than 2 nights booking"
  ];

  const el = document.getElementById("scroll-text");
  if (!el) return; // safety check

  let index = 0;
  let pos;
  let speed = 2; // slightly faster scrolling

  function startMessage(immediate = false) {
    el.textContent = messages[index];
    // start slightly inside the right boundary, so visible immediately
    pos = immediate ? (document.querySelector(".offer-container")?.offsetWidth || window.innerWidth) * 0.9
                    : (document.querySelector(".offer-container")?.offsetWidth || window.innerWidth);
  }

  function animate() {
    pos -= speed;
    el.style.left = pos + "px";

    // when text fully leaves left edge, start next one immediately
    if (pos + el.offsetWidth <= 0) {
      index = (index + 1) % messages.length;
      startMessage(true); // next one appears instantly
    }

    requestAnimationFrame(animate);
  }

  // Start instantly on page load (no delay)
  startMessage(true);
  animate();
})();




// ===== Active Menu Highlighting =====
  setActiveMenu();


});

// Active menu highlighting
function setActiveMenu() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const menuItems = document.querySelectorAll('nav a, #mobile-menu a');
  const roomsButton = document.querySelector('nav .relative.group button');
  const mobileRoomsSummary = document.querySelector('#mobile-menu details summary');
  
  // Remove active class from all items first
  menuItems.forEach(item => {
    item.classList.remove('text-yellow-700', 'font-semibold');
    item.classList.add('text-gray-700');
  });
  
  // Reset Rooms button and mobile summary
  if (roomsButton) {
    roomsButton.classList.remove('text-yellow-700', 'font-semibold');
    roomsButton.classList.add('text-gray-700');
  }
  if (mobileRoomsSummary) {
    mobileRoomsSummary.classList.remove('text-yellow-700', 'font-semibold');
    mobileRoomsSummary.classList.add('text-gray-700');
  }
  
  // Set active based on current page
  if (currentPage === 'index.html') {
    // Check if we're on contact section
    if (window.location.hash === '#contact') {
      // Highlight Contact link
      document.querySelectorAll('a[href="#contact"], a[href="index.html#contact"]').forEach(link => {
        link.classList.add('text-yellow-700', 'font-semibold');
        link.classList.remove('text-gray-700');
      });
    } else {
      // Highlight Home link
      document.querySelectorAll('a[href="index.html"]').forEach(link => {
        link.classList.add('text-yellow-700', 'font-semibold');
        link.classList.remove('text-gray-700');
      });
    }
  } else if (currentPage.includes('room.html')) {
    // For room pages, highlight Rooms dropdown
    if (roomsButton) {
      roomsButton.classList.add('text-yellow-700', 'font-semibold');
      roomsButton.classList.remove('text-gray-700');
    }
    
    // Highlight Rooms summary in mobile menu
    if (mobileRoomsSummary) {
      mobileRoomsSummary.classList.add('text-yellow-700', 'font-semibold');
      mobileRoomsSummary.classList.remove('text-gray-700');
    }
    
    // Highlight current room in mobile menu
    const currentRoomLink = document.querySelector(`#mobile-menu a[href="${currentPage}"]`);
    if (currentRoomLink) {
      currentRoomLink.classList.add('text-yellow-700', 'font-semibold');
      currentRoomLink.classList.remove('text-gray-700');
    }
    
    // Highlight current room in desktop dropdown
    const desktopRoomLink = document.querySelector(`nav .relative.group ul a[href="${currentPage}"]`);
    if (desktopRoomLink) {
      desktopRoomLink.classList.add('text-yellow-700', 'font-semibold');
      desktopRoomLink.classList.remove('text-gray-700', 'hover:bg-gray-100');
      desktopRoomLink.classList.add('bg-gray-100'); // Add background to make it more visible
    }
  }
}

// Call this function when page loads and when hash changes
document.addEventListener('DOMContentLoaded', () => {
  setActiveMenu();
  window.addEventListener('hashchange', setActiveMenu);
});
