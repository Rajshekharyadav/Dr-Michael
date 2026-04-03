const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const currentPage = document.body.dataset.page;
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const appointmentForm = document.getElementById("appointment-form");
const formNote = document.getElementById("form-note");
const appointmentSubmitButton = appointmentForm ? appointmentForm.querySelector('button[type="submit"]') : null;
const hiddenSheetTarget = document.getElementById("hidden-sheet-target");
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
const tiltCards = [...document.querySelectorAll("[data-tilt-card]")];
const postFilterButtons = [...document.querySelectorAll("[data-post-filter]")];
const practicePostCards = [...document.querySelectorAll(".post-card[data-post-category]")];
const postFilterStatus = document.getElementById("post-filter-status");
const contactFormEndpoint =
  window.siteConfig?.contactFormEndpoint ||
  (appointmentForm ? appointmentForm.dataset.sheetEndpoint || "" : "");
const isLocalFilePage = window.location.protocol === "file:";

const homeGalleryItems = [
  {
    type: "image",
    src: "Images/seo/dr-michael-gladstein-astoria-dermatology-office-exterior.jpg",
    title: "Astoria dermatology office exterior",
  },
  {
    type: "image",
    src: "Images/seo/dr-michael-gladstein-astoria-clinic-sign.jpg",
    title: "Clinic sign at Dr. Michael Gladstein's Astoria office",
  },
  {
    type: "image",
    src: "Images/seo/dr-michael-gladstein-astoria-office-exam-room.jpg",
    title: "Exam room inside the Astoria dermatology office",
  },
  {
    type: "image",
    src: "Images/seo/dr-michael-gladstein-astoria-office-treatment-room.jpg",
    title: "Treatment room at Dr. Michael Gladstein's office",
  },
  {
    type: "image",
    src: "Images/seo/dr-michael-gladstein-astoria-dermatologist.jpg",
    title: "Dr. Michael Gladstein, board-certified dermatologist",
  },
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
    "gallery.html": "gallery",
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

const tiltMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointerQuery = window.matchMedia("(pointer: fine)");
const canTilt = finePointerQuery.matches && !tiltMotionQuery.matches;

if (canTilt) {
  tiltCards.forEach((card) => {
    let frameId = null;

    const resetTilt = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      card.classList.remove("is-tilting");
      card.style.setProperty("--tilt-rotate-x", "0deg");
      card.style.setProperty("--tilt-rotate-y", "0deg");
      card.style.setProperty("--tilt-glow-x", "50%");
      card.style.setProperty("--tilt-glow-y", "50%");
    };

    const updateTilt = (event) => {
      const rect = card.getBoundingClientRect();
      const pointerX = (event.clientX - rect.left) / rect.width;
      const pointerY = (event.clientY - rect.top) / rect.height;
      const rotateY = (pointerX - 0.5) * 14;
      const rotateX = (0.5 - pointerY) * 14;

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        card.classList.add("is-tilting");
        card.style.setProperty("--tilt-rotate-x", `${rotateX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-rotate-y", `${rotateY.toFixed(2)}deg`);
        card.style.setProperty("--tilt-glow-x", `${(pointerX * 100).toFixed(1)}%`);
        card.style.setProperty("--tilt-glow-y", `${(pointerY * 100).toFixed(1)}%`);
      });
    };

    card.addEventListener("mousemove", updateTilt);
    card.addEventListener("mouseleave", resetTilt);
    card.addEventListener("blur", resetTilt);
  });
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
      media.decoding = "async";
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

if (homeGalleryGrid && homeGalleryGrid.children.length === 0) {
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

if (postFilterButtons.length && practicePostCards.length) {
  const filterLabels = {
    all: "all practice posts",
    results: "results-focused practice posts",
    trust: "patient trust practice posts",
    screening: "skin check practice posts",
    clinic: "clinic news practice posts",
  };

  const setPostFilter = (filterValue) => {
    let visibleCount = 0;

    postFilterButtons.forEach((button) => {
      const isActive = (button.dataset.postFilter || "all") === filterValue;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    practicePostCards.forEach((card) => {
      const shouldShow = filterValue === "all" || card.dataset.postCategory === filterValue;
      card.hidden = !shouldShow;
      card.classList.toggle("is-hidden", !shouldShow);

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (postFilterStatus) {
      postFilterStatus.textContent =
        filterValue === "all"
          ? `Showing all ${visibleCount} practice posts`
          : `Showing ${visibleCount} ${filterLabels[filterValue] || "practice posts"}`;
    }
  };

  postFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setPostFilter(button.dataset.postFilter || "all");
    });
  });

  setPostFilter("all");
}

if (appointmentForm && formNote) {
  appointmentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(appointmentForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!contactFormEndpoint) {
      formNote.textContent =
        "Google Sheet connection is not added yet. Please add the Apps Script web app URL in site-config.js.";
      return;
    }

    if (appointmentSubmitButton) {
      appointmentSubmitButton.disabled = true;
      appointmentSubmitButton.textContent = "Sending...";
    }

    try {
      await submitInquiryToGoogleSheet({
        name,
        phone,
        email,
        message,
        sourcePage: window.location.href,
        submittedAt: new Date().toISOString(),
      });

      formNote.textContent = `Thank you${name ? `, ${name}` : ""}. Your message has been sent and saved successfully. For appointments, please call +1 (718) 728-8979 directly.`;
      appointmentForm.reset();
    } catch (error) {
      formNote.textContent = isLocalFilePage
        ? "Local file testing can block form submissions in some browsers. Please test from the live website or a local server, or call +1 (718) 728-8979."
        : "Sorry, your inquiry could not be saved right now. Please call +1 (718) 728-8979 or try again in a moment.";
    } finally {
      if (appointmentSubmitButton) {
        appointmentSubmitButton.disabled = false;
        appointmentSubmitButton.textContent = "Send Inquiry";
      }
    }
  });
}

function submitInquiryToGoogleSheet(payload) {
  return new Promise((resolve, reject) => {
    if (!contactFormEndpoint) {
      reject(new Error("Missing Google Sheet endpoint."));
      return;
    }

    const tempForm = document.createElement("form");
    tempForm.method = "POST";
    tempForm.action = contactFormEndpoint;
    tempForm.target = hiddenSheetTarget ? hiddenSheetTarget.name : "_blank";
    tempForm.style.display = "none";

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      tempForm.appendChild(input);
    });

    document.body.appendChild(tempForm);

    let settled = false;
    let timeoutId = null;

    const cleanup = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      if (hiddenSheetTarget) {
        hiddenSheetTarget.removeEventListener("load", handleLoad);
      }

      tempForm.remove();
    };

    const handleLoad = () => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve();
    };

    if (hiddenSheetTarget) {
      hiddenSheetTarget.addEventListener("load", handleLoad, { once: true });
    }

    timeoutId = window.setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve();
    }, 2500);

    tempForm.submit();
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
