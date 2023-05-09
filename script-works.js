gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let container = document.querySelector(".container");
let cursor = $(".cursor-muva");
let rotate = $(cursor).find(".rotate");

gsap.set(cursor, {
  xPercent: -50,
  yPercent: -50,
  x: 0,
  y: 0,
  transformOrigin: "center center"
});
gsap.set(rotate, { transformOrigin: "center center" });
let rotateTween = gsap.to(rotate, {
  duration: 0.5,
  paused: true
});
let xTo = gsap.quickTo(cursor, "x", { duration: 0.3 });
let yTo = gsap.quickTo(cursor, "y", { duration: 0.3 });
let RAD2DEG = 180 / Math.PI;
let x = 0,
  y = 0;

container.addEventListener("mousemove", (e) => {
  let yDif = e.clientY - y,
    xDif = e.clientX - x;
  xTo(e.clientX);
  yTo(e.clientY);
  if (Math.abs(xDif) > 3 || Math.abs(yDif) > 3) {
    x = e.clientX;
    y = e.clientY;
    rotateTween.vars.rotation =
      Math.atan2(yDif, xDif) * RAD2DEG - 40 + "_short";
    rotateTween.invalidate().restart();
  }
});
