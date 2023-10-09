window.addEventListener("DOMContentLoaded", (event) => {
    // LENIS
    "use strict";
    if (Webflow.env("editor") === undefined) {
        const lenis = new Lenis({
            duration: 1.2
            , //easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: 0.1
            , wheelMultiplier: 0.7
            , infinite: false
            , gestureOrientation: "vertical"
            , normalizeWheel: false
            , smoothTouch: false
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        $("[data-lenis-start]").on("click", function () {
            lenis.start();
        });
        $("[data-lenis-stop]").on("click", function () {
            lenis.stop();
        });
        $("[data-lenis-toggle]").on("click", function () {
            $(this).toggleClass("stop-scroll");
            if ($(this).hasClass("stop-scroll")) {
                lenis.stop();
            }
            else {
                lenis.start();
            }
        });

        function connectToScrollTrigger() {
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            })
            gsap.ticker.lagSmoothing(0);
        }
        // Uncomment this if using GSAP ScrollTrigger
        connectToScrollTrigger();
    }
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    
    
        // CHANGE COLOUR ON HOVER
const links = document.querySelectorAll('a');
const predefinedColors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6']; links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
        const randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
        link.style.setProperty('--colour-change', randomColor);
    });
    link.addEventListener('mouseleave', () => {
        // Remove the custom property to revert to the default color
        link.style.removeProperty('--colour-change');
    });
});

    
    
    
    
    
    //GSAP CODE
    //MEDIA QUERIES
    let mm = gsap.matchMedia();
    
    
    mm.add({

  // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
  isDesktop: `(min-width: 992px)`,
  isTablet: `(max-width: 991px)`,
  isMobile: `(max-width: 479px)`,
  reduceMotion: "(prefers-reduced-motion: reduce)"

}, (context) => {

  // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
  let { isDesktop, isTablet, isMobile, reduceMotion } = context.conditions;

        
        
  //HERO LOGO
    // Logo Scale
$(".section.is-intro").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".nav_logo");

  let tlLogo = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top top",
      end: "bottom top",
      scrub: 2
    }
  });
  tlLogo.from(targetElement, {
    y: isMobile ? "-125%" : reduceMotion ? "0%" : "-115%" ,
    width: isDesktop ? "75cqi": "100cqi",
    duration: 1
  });
});
    

    
    
// HORIZONTAL
// Makes scroll timing feel more natural
function setTrackHeights() {
    $(".section-height").each(function (index) {
        let trackWidth = $(this).find(".track").outerWidth();
        $(this).height(trackWidth);
    });
}
setTrackHeights(); window.addEventListener("resize", function () {
    setTrackHeights();
}); 
    
// Horizontal scroll
let tlMain = gsap.timeline({
    scrollTrigger: {
        trigger: ".section-height"
        , start: "top top"
        , end: "98% bottom"
        , scrub: 1
    }
}).to(".track", {
    xPercent: -100
    , ease: "none"
});
        
        
        
        
// MOUSE MOVE
let container = document.querySelector(".mousemover");
let cursors = gsap.utils.toArray(".cursor-muva"); cursors.forEach((cursor, index) => {
    let rotate = $(cursor).find(".cursor-muva-image");
    let ease = "ease";
    gsap.set(cursor, {
        xPercent: -80
        , yPercent: -80
        , x: 0
        , y: 0
        , transformOrigin: "-80% -80%"
    });
    gsap.set(rotate, {
        transformOrigin: "80% 80%"
    });
    let rotateTween = gsap.to(rotate, {
        duration: 0.8
        , paused: true
    });
    let speed = index * -0.1 + 0.8;
    let xTo = gsap.quickTo(cursor, "x", {
        duration: speed
        , ease: ease
    });
    let yTo = gsap.quickTo(cursor, "y", {
        duration: speed
        , ease: ease
    });
    let RAD2DEG = 180 / Math.PI;
    let x = 0
        , y = 0;
    container.addEventListener("mousemove", (e) => {
        let yDif = e.clientY - y
            , xDif = e.clientX - x;
        xTo(e.clientX);
        yTo(e.clientY);
        if (Math.abs(xDif) > 3 || Math.abs(yDif) > 3) {
            x = e.clientX;
            y = e.clientY;
            rotateTween.vars.rotation = Math.atan2(yDif, xDif) * RAD2DEG - 40 + "_short";
            rotateTween.invalidate().restart();
        }
    });
});
        
        }); 
});