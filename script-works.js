gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let container = document.querySelector(".container");
let cursors = gsap.utils.toArray(".cursor-muva");

cursors.forEach((cursor, index) => {
  let rotate = $(cursor).find(".rotate");

  gsap.set(cursor, {
    xPercent: -80,
    yPercent: -80,
    x: 0,
    y: 0,
    transformOrigin: "-80% -80%"
  });

  gsap.set(rotate, { transformOrigin: "80% 80%" });

  let rotateTween = gsap.to(rotate, {
    duration: 0.8,
    paused: true
  });

  let speed = index * -0.4 + 0.8;
  let xTo = gsap.quickTo(cursor, "x", {
    duration: speed,
    ease: "power3.out"
  });
  let yTo = gsap.quickTo(cursor, "y", {
    duration: speed,
    ease: "power3.out"
  });

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
});
