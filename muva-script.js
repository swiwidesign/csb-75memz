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
// MARQUEE POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
    // attribute value checker
    function attr(defaultVal, attrVal) {
        const defaultValType = typeof defaultVal;
        if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
        if (attrVal === "true" && defaultValType === "boolean") return true;
        if (attrVal === "false" && defaultValType === "boolean") return false;
        if (isNaN(attrVal) && defaultValType === "string") return attrVal;
        if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
        return defaultVal;
    }
    // marquee component
    $("[tr-marquee-element='component']").each(function (index) {
        let componentEl = $(this)
            , panelEl = componentEl.find("[tr-marquee-element='panel']")
            , triggerHoverEl = componentEl.find("[tr-marquee-element='triggerhover']")
            , triggerClickEl = componentEl.find("[tr-marquee-element='triggerclick']");
        let speedSetting = attr(100, componentEl.attr("tr-marquee-speed"))
            , verticalSetting = attr(false, componentEl.attr("tr-marquee-vertical"))
            , reverseSetting = attr(false, componentEl.attr("tr-marquee-reverse"))
            , scrollDirectionSetting = attr(false, componentEl.attr("tr-marquee-scrolldirection"))
            , scrollScrubSetting = attr(false, componentEl.attr("tr-marquee-scrollscrub"))
            , moveDistanceSetting = -100
            , timeScaleSetting = 1
            , pausedStateSetting = false;
        if (reverseSetting) moveDistanceSetting = 100;
        let marqueeTimeline = gsap.timeline({
            repeat: -1
            , onReverseComplete: () => marqueeTimeline.progress(1)
        });
        if (verticalSetting) {
            speedSetting = panelEl.first().height() / speedSetting;
            marqueeTimeline.fromTo(panelEl, {
                yPercent: 0
            }, {
                yPercent: moveDistanceSetting
                , ease: "none"
                , duration: speedSetting
            });
        }
        else {
            speedSetting = panelEl.first().width() / speedSetting;
            marqueeTimeline.fromTo(panelEl, {
                xPercent: 0
            }, {
                xPercent: moveDistanceSetting
                , ease: "none"
                , duration: speedSetting
            });
        }
        let scrubObject = {
            value: 1
        };
        ScrollTrigger.create({
            trigger: "body"
            , start: "top top"
            , end: "bottom bottom"
            , onUpdate: (self) => {
                if (!pausedStateSetting) {
                    if (scrollDirectionSetting && timeScaleSetting !== self.direction) {
                        timeScaleSetting = self.direction;
                        marqueeTimeline.timeScale(self.direction);
                    }
                    if (scrollScrubSetting) {
                        let v = self.getVelocity() * 0.006;
                        v = gsap.utils.clamp(-60, 60, v);
                        let scrubTimeline = gsap.timeline({
                            onUpdate: () => marqueeTimeline.timeScale(scrubObject.value)
                        });
                        scrubTimeline.fromTo(scrubObject, {
                            value: v
                        }, {
                            value: timeScaleSetting
                            , duration: 0.5
                        });
                    }
                }
            }
        });

        function pauseMarquee(isPausing) {
            pausedStateSetting = isPausing;
            let pauseObject = {
                value: 1
            };
            let pauseTimeline = gsap.timeline({
                onUpdate: () => marqueeTimeline.timeScale(pauseObject.value)
            });
            if (isPausing) {
                pauseTimeline.fromTo(pauseObject, {
                    value: timeScaleSetting
                }, {
                    value: 0
                    , duration: 0.5
                });
                triggerClickEl.addClass("is-paused");
            }
            else {
                pauseTimeline.fromTo(pauseObject, {
                    value: 0
                }, {
                    value: timeScaleSetting
                    , duration: 0.5
                });
                triggerClickEl.removeClass("is-paused");
            }
        }
        if (window.matchMedia("(pointer: fine)").matches) {
            triggerHoverEl.on("mouseenter", () => pauseMarquee(true));
            triggerHoverEl.on("mouseleave", () => pauseMarquee(false));
        }
        triggerClickEl.on("click", function () {
            !$(this).hasClass("is-paused") ? pauseMarquee(true) : pauseMarquee(false);
        });
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