// Ensures JavaScript runs after the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    // setupImageViewer();
    setupScrollToTop();
});

// === Mobile Menu Toggle ===
function setupMobileMenu() {
    const menuToggle = document.querySelector(".js-fh5co-nav-toggle");
    const body = document.body;
    const menu = document.getElementById("fh5co-offcanvas");

    if (!menuToggle || !menu) return;

    menuToggle.addEventListener("click", (event) => {
        event.preventDefault();
        body.classList.toggle("offcanvas");
        menuToggle.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            body.classList.remove("offcanvas");
            menuToggle.classList.remove("active");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded, initializing galleries.");
  const galleries = document.querySelectorAll(".gallery-wrapper");
  galleries.forEach(function(wrapper) {
    const container = wrapper.querySelector(".gallery-container");
    let images = [];
    try {
      images = JSON.parse(container.getAttribute("data-images"));
      console.log("Parsed images:", images);
    } catch(e) {
      console.error("Invalid JSON for gallery images", e);
      return;
    }
    let currentIndex = 0;
    const imgElement = container.querySelector(".gallery-image img");
    const leftArrow = container.querySelector(".left-arrow");
    const rightArrow = container.querySelector(".right-arrow");
    const fullscreenBtn = container.querySelector(".fullscreen-btn");
    const indicatorsContainer = wrapper.querySelector(".gallery-controls .image-indicators");
    const descriptionElement = wrapper.querySelector(".gallery-controls .image-description");
    
    function updateGallery() {
      console.log("Updating gallery: index", currentIndex, "image", images[currentIndex].src);
      imgElement.src = images[currentIndex].src;
      descriptionElement.textContent = images[currentIndex].desc;
      const dots = indicatorsContainer.querySelectorAll(".dot");
      dots.forEach(function(dot, index) {
        dot.classList.toggle("active", index === currentIndex);
      });
    }




    document.addEventListener("DOMContentLoaded", () => {
      const videoContainer = document.querySelector(".video-container");
      const video = document.getElementById("proteoVideo");
      const controls = document.querySelector(".video-controls");
      const playPauseBtn = document.getElementById("playPauseBtn");
      const progressBar = document.getElementById("videoProgress");
      const fullscreenBtn = document.getElementById("fullscreenBtn");
      
      let hideControlsTimer = null;
    
      // Show the controls and reset the auto-hide timer
      function showControls() {
        controls.style.opacity = "1";
    
        // Clear any previous timer
        if (hideControlsTimer) {
          clearTimeout(hideControlsTimer);
        }
        // Hide again after 3s of no mouse movement
        hideControlsTimer = setTimeout(() => {
          controls.style.opacity = "0";
        }, 3000);
      }
    
      // Toggle play/pause
      function togglePlayPause() {
        if (video.paused || video.ended) {
          video.play();
          playPauseBtn.innerHTML = "&#10074;&#10074;"; // Pause icon
        } else {
          video.pause();
          playPauseBtn.innerHTML = "&#9658;";          // Play icon
        }
      }
    
      // Update progress bar as the video plays
      video.addEventListener("timeupdate", () => {
        progressBar.value = video.currentTime;
      });
    
      // Click inside video toggles play/pause
      video.addEventListener("click", togglePlayPause);
    
      // Mousemove inside container shows controls
      videoContainer.addEventListener("mousemove", showControls);
    
      // Progress bar changes the video time
      progressBar.addEventListener("input", () => {
        video.currentTime = progressBar.value;
      });
    
      // Once the video is loaded, set the max value of the progress bar
      video.addEventListener("loadedmetadata", () => {
        progressBar.max = video.duration;
      });
    
      // Play/Pause button
      playPauseBtn.addEventListener("click", togglePlayPause);
    
      // Press spacebar to toggle play/pause
      document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          // Prevent the page from scrolling when spacebar is pressed
          e.preventDefault();
          togglePlayPause();
        }
      });
    
      // Fullscreen toggle
      fullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          videoContainer.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      });
    });
    
    
    // Create dot indicators
    indicatorsContainer.innerHTML = "";
    images.forEach(function(image, index) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", function() {
        currentIndex = index;
        updateGallery();
      });
      indicatorsContainer.appendChild(dot);
    });
    
    leftArrow.addEventListener("click", function() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateGallery();
    });
    rightArrow.addEventListener("click", function() {
      currentIndex = (currentIndex + 1) % images.length;
      updateGallery();
    });
    // Replace your existing fullscreenBtn listener with this:
fullscreenBtn.addEventListener("click", function() {
  wrapper.classList.toggle("expanded");
  updateExpandedIcon();
});

// Add (or modify) the updateExpandedIcon() helper function:
function updateExpandedIcon() {
  if (wrapper.classList.contains("expanded")) {
    // Add a class so that the CSS for the minimized (expanded) state applies.
    fullscreenBtn.classList.add("minimized");
    // You can keep the same icon character – the CSS will invert it
    fullscreenBtn.innerHTML = "&#x26F6;";
  } else {
    fullscreenBtn.classList.remove("minimized");
    fullscreenBtn.innerHTML = "&#x26F6;";
  }
}

// Add a global keydown listener to exit expanded mode with ESC:
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    const expandedGallery = document.querySelector(".gallery-wrapper.expanded");
    if (expandedGallery) {
      expandedGallery.classList.remove("expanded");
      const btn = expandedGallery.querySelector(".fullscreen-btn");
      if (btn) {
        btn.classList.remove("minimized");
        btn.innerHTML = "&#x26F6;";
      }
    }
  }
});

    
    
    function updateFullscreenIcon() {
      const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      if (fsElement === wrapper) {
        fullscreenBtn.innerHTML = '<span style="display:inline-block; transform: scaleY(-1);">&#x26F6;</span>';
      } else {
        fullscreenBtn.innerHTML = "&#x26F6;";
      }
    }
    //document.addEventListener("fullscreenchange", updateFullscreenIcon);
    //document.addEventListener("webkitfullscreenchange", updateFullscreenIcon);
    //document.addEventListener("msfullscreenchange", updateFullscreenIcon);
    
    // Immediately update the gallery so the first image loads
    updateGallery();
  });
});






  

// === Scroll to Top Button ===
function setupScrollToTop() {
    const scrollButton = document.querySelector(".js-gotop");

    if (!scrollButton) return;

    scrollButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollButton.classList.add("active");
        } else {
            scrollButton.classList.remove("active");
        }
    });
}
