const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const currentPage = document.body.dataset.page;
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const appointmentForm = document.getElementById("appointment-form");
const formNote = document.getElementById("form-note");
const sitePopup = document.getElementById("site-popup");
const popupCloseButtons = [...document.querySelectorAll("[data-popup-close]")];
const popupPrimaryAction = sitePopup ? sitePopup.querySelector(".button") : null;
const homeGalleryGrid = document.getElementById("home-gallery-grid");
const galleryModal = document.getElementById("gallery-modal");
const galleryModalGrid = document.getElementById("gallery-modal-grid");
const galleryOpenButton = document.getElementById("open-gallery-modal");
const galleryCloseButtons = [...document.querySelectorAll("[data-gallery-close]")];
const mediaViewer = document.getElementById("media-viewer");
const mediaViewerStage = document.getElementById("media-viewer-stage");
const mediaViewerTitle = document.getElementById("media-viewer-title");
const mediaViewerCloseButtons = [...document.querySelectorAll("[data-media-viewer-close]")];

const homeGalleryItems = [
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 15, 2026, 05_30_00 PM.png", title: "Clinic Visual" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 15, 2026, 06_04_50 PM.png", title: "Dermatology Creative" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 15, 2026, 06_06_11 PM.png", title: "Practice Branding" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 15, 2026, 06_11_05 PM.png", title: "Care Experience" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 15, 2026, 06_15_26 PM.png", title: "Professional Skin Care" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 15, 2026, 06_20_44 PM.png", title: "Clinical Portrait" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 15, 2026, 06_26_53 PM.png", title: "Consultation Visual" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 15, 2026, 06_28_44 PM.png", title: "Office Creative" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 17, 2026, 10_43_55 PM.png", title: "Dermatology Concept" },
  { type: "image", src: "Images/gallery/ChatGPT Image Mar 7, 2026, 05_11_31 PM.png", title: "Skin Health Creative" },
  { type: "video", src: "Images/gallery/Happy Birthday, Dr. Michael Gladstein!\uD83C\uDF89 Today, we celebrate you and all the incredible work you.mp4", title: "Celebration Video" },
  { type: "image", src: "Images/gallery/Untitled design.png", title: "Design Visual" },
  { type: "video", src: "Images/gallery/Video_Generation_Based_on_Scene_Descriptions.mp4", title: "Brand Video" },
  { type: "video", src: "Images/gallery/Video_Script_for_Patient_Testimonial.mp4", title: "Patient Story Video" },
  { type: "image", src: "Images/gallery/WhatsApp Image 2026-03-05 at 1.51.06 AM.jpeg", title: "Clinic Photo" },
  { type: "image", src: "Images/gallery/WhatsApp Image 2026-03-05 at 1.51.08 AM.jpeg", title: "Patient Moment" },
  { type: "image", src: "Images/gallery/WhatsApp Image 2026-03-05 at 1.51.10 AM.jpeg", title: "Practice Snapshot" },
  { type: "image", src: "Images/gallery/WhatsApp Image 2026-03-05 at 1.51.11 AM (1).jpeg", title: "Office Scene" },
  { type: "image", src: "Images/gallery/WhatsApp Image 2026-03-05 at 1.51.11 AM (2).jpeg", title: "Patient Care" },
  { type: "image", src: "Images/gallery/WhatsApp Image 2026-03-05 at 1.51.11 AM.jpeg", title: "Clinic Detail" },
  { type: "image", src: "Images/gallery/jgfdfhfdht.png", title: "Dermatology Asset" },
  { type: "image", src: "Images/gallery/tttttt.png", title: "Medical Creative" },
  { type: "image", src: "Images/gallery/uuuuuugf.png", title: "Practice Showcase" },
  { type: "image", src: "Images/gallery/uuuuuuuuu.png", title: "Brand Artwork" },
];

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  const pageMap = {
    "index.html": "home",
    "about.html": "about",
    "services.html": "services",
    "reviews.html": "reviews",
    "blog.html": "blog",
    "contact.html": "contact",
  };

  if (href && pageMap[href] === currentPage) {
    link.classList.add("is-active");
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const createGalleryCard = (item, index) => {
    const card = document.createElement("article");
    card.className = "apple-gallery-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${item.title}`);
    card.dataset.galleryIndex = String(index);
    if (index % 5 === 0) {
      card.classList.add("is-featured");
    }
    if (item.type === "video") {
      card.classList.add("is-video");
    }

    const media = document.createElement(item.type === "video" ? "video" : "img");
    media.className = "apple-gallery-media";
    media.src = encodeURI(item.src);
    media.setAttribute("title", item.title);

    if (item.type === "video") {
      media.autoplay = true;
      media.loop = true;
      media.muted = true;
      media.playsInline = true;
      media.preload = "metadata";
    } else {
      media.alt = item.title;
      media.loading = "lazy";
    }

    const meta = document.createElement("div");
    meta.className = "apple-gallery-meta";
    meta.innerHTML = `<span>${item.type === "video" ? "Video" : "Image"}</span><strong>${item.title}</strong>`;

    card.appendChild(media);
    card.appendChild(meta);
    return card;
};

const openMediaViewer = (item) => {
  if (!mediaViewer || !mediaViewerStage || !mediaViewerTitle) {
    return;
  }

  mediaViewerStage.innerHTML = "";
  mediaViewerTitle.textContent = item.title;

  const media = document.createElement(item.type === "video" ? "video" : "img");
  media.className = "media-viewer-media";
  media.src = encodeURI(item.src);

  if (item.type === "video") {
    media.controls = true;
    media.autoplay = true;
    media.muted = false;
    media.playsInline = true;
    media.preload = "auto";
  } else {
    media.alt = item.title;
    media.loading = "eager";
  }

  mediaViewerStage.appendChild(media);
  mediaViewer.classList.add("is-open");
  mediaViewer.setAttribute("aria-hidden", "false");
  document.body.classList.add("media-viewer-open");
};

const closeMediaViewer = () => {
  if (!mediaViewer || !mediaViewerStage) {
    return;
  }

  const activeVideo = mediaViewerStage.querySelector("video");
  if (activeVideo) {
    activeVideo.pause();
    activeVideo.currentTime = 0;
  }

  mediaViewerStage.innerHTML = "";
  mediaViewer.classList.remove("is-open");
  mediaViewer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("media-viewer-open");
};

const attachGalleryInteraction = (card, item) => {
  card.addEventListener("click", () => {
    openMediaViewer(item);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMediaViewer(item);
    }
  });
};

if (homeGalleryGrid) {
  const previewItems = homeGalleryItems.filter((item) => item.type === "image").slice(0, 3);

  previewItems.forEach((item, index) => {
    const card = createGalleryCard(item, index);
    attachGalleryInteraction(card, item);
    homeGalleryGrid.appendChild(card);
  });
}

if (galleryModalGrid) {
  homeGalleryItems.forEach((item, index) => {
    const card = createGalleryCard(item, index);
    attachGalleryInteraction(card, item);
    galleryModalGrid.appendChild(card);
  });
}

if (galleryModal && galleryOpenButton) {
  const openGalleryModal = () => {
    galleryModal.classList.add("is-open");
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-modal-open");
  };

  const closeGalleryModal = () => {
    galleryModal.classList.remove("is-open");
    galleryModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("gallery-modal-open");
  };

  galleryOpenButton.addEventListener("click", openGalleryModal);

  galleryCloseButtons.forEach((button) => {
    button.addEventListener("click", closeGalleryModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && galleryModal.classList.contains("is-open")) {
      closeGalleryModal();
    }
  });
}

if (mediaViewer) {
  mediaViewerCloseButtons.forEach((button) => {
    button.addEventListener("click", closeMediaViewer);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mediaViewer.classList.contains("is-open")) {
      closeMediaViewer();
    }
  });
}

if (appointmentForm && formNote) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(appointmentForm);
    const name = String(formData.get("name") || "").trim();

    formNote.textContent = `Thank you${name ? `, ${name}` : ""}. Your message has been received. For appointments, please call +1 (718) 728-8979 directly.`;
    appointmentForm.reset();
  });
}

if (sitePopup) {
  const closePopup = () => {
    sitePopup.classList.remove("is-open");
    sitePopup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popup-open");
  };

  const openPopup = () => {
    sitePopup.classList.add("is-open");
    sitePopup.setAttribute("aria-hidden", "false");
    document.body.classList.add("popup-open");
    if (popupPrimaryAction) {
      popupPrimaryAction.focus();
    }
  };

  window.requestAnimationFrame(openPopup);

  popupCloseButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sitePopup.classList.contains("is-open")) {
      closePopup();
    }
  });
}
