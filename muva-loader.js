// PAGE TRANSITION
// Code that runs on pageload
window.onload = function() {
  gsap.to(".loader", {
    yPercent: -100,
    duration: 2,
    onComplete: () => {
      gsap.set(".loader", { display: "none" });
    }
  });
}

// Code that runs on click of a link
$(document).ready(function () {
  $("a").on("click", function (e) {
    if (
    	$(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank") {
        e.preventDefault();
        let destination = $(this).attr("href");
        gsap.set(".loader", { display: "block" });
        gsap.fromTo(
          ".loader",
          {
            yPercent: -100,
          },
          {
            yPercent: 0,,
            onComplete: () => {
              window.location = destination;
            }
          }
        );
    }
  });
  
  
  
  
  // On click of the back button
  window.onpageshow = function(event){
  	if (event.persisted) {
    	window.location.reload();
    }
  }
});