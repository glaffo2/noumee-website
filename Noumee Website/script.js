let lenis;

if (window.Lenis) {
  const prefersMobileScroll = window.matchMedia("(max-width: 820px)").matches;

  lenis = new Lenis({
    autoRaf: true,
    duration: prefersMobileScroll ? 0.45 : 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.2,
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (!target) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(target, {
        offset: -24,
      });
    });
  });
}

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
  }

  const usesMobileScrollEffect = window.matchMedia("(max-width: 820px)").matches;

  document.querySelectorAll(".follow-section").forEach((section, index, sections) => {
    const container = section.querySelector(".follow-container");

    if (usesMobileScrollEffect) {
      gsap.fromTo(
        container,
        {
          rotation: index % 2 === 0 ? -5 : 5,
          y: 54,
          scale: 0.96,
        },
        {
          rotation: 0,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            end: "top 28%",
            invalidateOnRefresh: true,
            scrub: true,
          },
        },
      );
      return;
    }

    gsap.to(container, {
      rotation: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top 20%",
        invalidateOnRefresh: true,
        scrub: true,
      },
    });

    if (index === sections.length - 1) {
      return;
    }

    ScrollTrigger.create({
      trigger: section,
      start: "bottom bottom",
      end: "bottom top",
      invalidateOnRefresh: true,
      pin: true,
      pinSpacing: false,
    });
  });

  function initConnectCards() {
    const connectSection = document.querySelector(".connect-section");
    const connectCardContainer = document.querySelector(".connect-card-container");
    const connectHeader = document.querySelector(".connect-header h2");

    if (!connectSection || !connectCardContainer || !connectHeader) {
      return;
    }

    const prefersCompactConnect = window.matchMedia("(max-width: 820px)").matches;

    if (prefersCompactConnect) {
      gsap.set(".connect-card, .connect-card-container, .connect-header h2", {
        clearProps: "all",
      });
      return;
    }

    ScrollTrigger.create({
      trigger: connectSection,
      start: "top top",
      end: () => `+=${window.innerHeight * 1.65}px`,
      scrub: 0.25,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress >= 0.1 && progress <= 0.25) {
          const headerProgress = gsap.utils.mapRange(0.1, 0.25, 0, 1, progress);

          gsap.set(connectHeader, {
            y: gsap.utils.mapRange(0, 1, 40, 0, headerProgress),
            opacity: headerProgress,
          });
        } else if (progress < 0.1) {
          gsap.set(connectHeader, { y: 40, opacity: 0 });
        } else {
          gsap.set(connectHeader, { y: 0, opacity: 1 });
        }

        const widthProgress = gsap.utils.clamp(0, 1, progress / 0.22);
        const gapProgress = gsap.utils.clamp(0, 1, (progress - 0.22) / 0.18);
        const flipProgress = gsap.utils.clamp(0, 1, (progress - 0.52) / 0.28);
        const easedGap = gsap.parseEase("power2.out")(gapProgress);
        const easedFlip = gsap.parseEase("power2.inOut")(flipProgress);

        gsap.set(connectCardContainer, {
          width: `${gsap.utils.interpolate(75, 60, widthProgress)}%`,
          gap: `${gsap.utils.interpolate(0, 22, easedGap)}px`,
        });

        gsap.set(".connect-card", {
          rotationY: gsap.utils.interpolate(0, 180, easedFlip),
          borderRadius: `${gsap.utils.interpolate(0, 28, easedGap)}px`,
        });

        gsap.set("#connect-card-1", {
          y: gsap.utils.interpolate(0, 30, easedFlip),
          rotationZ: gsap.utils.interpolate(0, -15, easedFlip),
        });

        gsap.set("#connect-card-3", {
          y: gsap.utils.interpolate(0, 30, easedFlip),
          rotationZ: gsap.utils.interpolate(0, 15, easedFlip),
        });
      },
    });
  }

  window.addEventListener("load", () => {
    initConnectCards();
    ScrollTrigger.refresh();
  });
}

document.querySelectorAll(".billing-option").forEach((button) => {
  button.addEventListener("click", () => {
    const billing = button.dataset.billing;

    document.querySelectorAll(".billing-option").forEach((option) => {
      const isActive = option === button;

      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });

    document.querySelectorAll("[data-monthly][data-yearly]").forEach((node) => {
      node.textContent = node.dataset[billing];
    });
  });
});

const connectVideos = {
  tap: {
    kicker: "Method 01",
    title: "Tap your card",
    label: "NFC tap demo",
    description: "Show how a single NFC tap opens your Noumee profile in the moment.",
  },
  qr: {
    kicker: "Method 02",
    title: "Let them scan your QR code",
    label: "QR scan demo",
    description: "Show how your profile can be shared from a screen, card, poster, or quick conversation.",
  },
  wallet: {
    kicker: "Method 03",
    title: "Add your QR code to Google Wallet",
    label: "Wallet QR demo",
    description: "Show how your Noumee QR stays ready in your wallet when the card is not in reach.",
  },
};

const connectModal = document.querySelector("#connect-video-modal");
const connectModalTitle = document.querySelector("#connect-video-title");
const connectModalKicker = document.querySelector("#connect-video-kicker");
const connectModalLabel = document.querySelector("#connect-video-label");
const connectModalDescription = document.querySelector("#connect-video-description");

function closeConnectModal() {
  if (!connectModal || !connectModal.open) {
    return;
  }

  connectModal.close();
}

document.querySelectorAll("[data-connect-video]").forEach((button) => {
  button.addEventListener("click", () => {
    const video = connectVideos[button.dataset.connectVideo];

    if (!connectModal || !video) {
      return;
    }

    connectModalKicker.textContent = video.kicker;
    connectModalTitle.textContent = video.title;
    connectModalLabel.textContent = video.label;
    connectModalDescription.textContent = video.description;
    connectModal.showModal();
    document.body.classList.add("modal-open");

    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }
  });
});

if (connectModal) {
  connectModal.addEventListener("click", (event) => {
    if (event.target === connectModal) {
      closeConnectModal();
    }
  });

  connectModal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    connectModal.querySelectorAll("video").forEach((video) => {
      video.pause();
    });

    if (lenis && typeof lenis.start === "function") {
      lenis.start();
    }
  });

  connectModal.addEventListener("cancel", () => {
    document.body.classList.remove("modal-open");

    if (lenis && typeof lenis.start === "function") {
      lenis.start();
    }
  });

}
