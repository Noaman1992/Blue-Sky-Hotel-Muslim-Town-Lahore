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
});
