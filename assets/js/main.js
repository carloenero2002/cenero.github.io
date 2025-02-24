/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle functionality
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    const header = document.querySelector("#header");
    header.classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  /**
   * Hide mobile navigation on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenuLink) => {
    navmenuLink.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.parentNode.classList.toggle("active");
      dropdown.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader functionality
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /**
   * Scroll-to-top button functionality
   */
  const scrollTopBtn = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("active", window.scrollY > 100);
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  /**
   * Animation on scroll initialization
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  window.addEventListener("load", aosInit);

  /**
   * Typed.js initialization
   */
  const typedElement = document.querySelector(".typed");
  if (typedElement) {
    const typedStrings = typedElement.getAttribute("data-typed-items").split(",");
    new Typed(".typed", {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * PureCounter initialization
   */
  new PureCounter();

  /**
   * Animate skills progress bars on reveal
   */
  const skillAnimations = document.querySelectorAll(".skills-animation");
  skillAnimations.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: () => {
        const progressBars = item.querySelectorAll(".progress .progress-bar");
        progressBars.forEach((bar) => {
          bar.style.width = bar.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initialize GLightbox
   */
  const lightbox = GLightbox({ selector: ".glightbox" });

  /**
   * Isotope layout and filter initialization
   */
  document.querySelectorAll(".isotope-layout").forEach((isotopeLayout) => {
    const layoutMode = isotopeLayout.getAttribute("data-layout") || "masonry";
    const defaultFilter = isotopeLayout.getAttribute("data-default-filter") || "*";
    const sortBy = isotopeLayout.getAttribute("data-sort") || "original-order";

    let isotopeInstance;
    imagesLoaded(isotopeLayout.querySelector(".isotope-container"), () => {
      isotopeInstance = new Isotope(isotopeLayout.querySelector(".isotope-container"), {
        itemSelector: ".isotope-item",
        layoutMode,
        filter: defaultFilter,
        sortBy,
      });
    });

    isotopeLayout.querySelectorAll(".isotope-filters li").forEach((filter) => {
      filter.addEventListener("click", function () {
        isotopeLayout.querySelector(".filter-active").classList.remove("filter-active");
        this.classList.add("filter-active");
        isotopeInstance.arrange({ filter: this.getAttribute("data-filter") });

        if (typeof aosInit === "function") aosInit();
      });
    });
  });

  /**
   * Swiper slider initialization
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach((swiperElement) => {
      const swiperConfig = JSON.parse(swiperElement.querySelector(".swiper-config").textContent.trim());
      new Swiper(swiperElement, swiperConfig);
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position for hash links
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(() => {
          const scrollMarginTop = parseInt(getComputedStyle(targetSection).scrollMarginTop);
          window.scrollTo({ top: targetSection.offsetTop - scrollMarginTop, behavior: "smooth" });
        }, 100);
      }
    }
  });

  /**
   * Navmenu scrollspy functionality
   */
  const navMenuLinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    const scrollPosition = window.scrollY + 200;

    navMenuLinks.forEach((link) => {
      if (!link.hash) return;

      const section = document.querySelector(link.hash);
      if (section && scrollPosition >= section.offsetTop && scrollPosition <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll(".navmenu a.active").forEach((activeLink) => activeLink.classList.remove("active"));
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

  