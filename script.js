
document.addEventListener("DOMContentLoaded", function () {

  const introScreen = document.getElementById("introScreen");
  const openSurprise = document.getElementById("openSurprise");
  const partyButton = document.getElementById("partyButton");

  const confettiLayer = document.getElementById("confettiLayer");
  const balloonLayer = document.getElementById("balloonLayer");
  const introStars = document.getElementById("introStars");

  let websiteOpened = false;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // INTRO SCREEN STARS
  for (let i = 0; i < 30; i++) {
    const star = document.createElement("span");
    star.innerHTML = i % 2 === 0 ? "✦" : "✧";

    star.style.left = random(2, 98) + "%";
    star.style.top = random(2, 98) + "%";
    star.style.fontSize = random(12, 27) + "px";

    introStars.appendChild(star);
  }

  // FLOATING BALLOONS
  function createBalloons() {
    const colors = ["#f56b9e", "#f7b6ce", "#d9a64e", "#e88ab0", "#ffffff"];

    for (let i = 0; i < 12; i++) {
      const balloon = document.createElement("div");
      balloon.className = "floating-balloon";

      balloon.style.position = "absolute";
      balloon.style.left = random(2, 96) + "%";
      balloon.style.top = random(10, 90) + "%";
      balloon.style.width = random(25, 45) + "px";
      balloon.style.height = random(35, 55) + "px";
      balloon.style.borderRadius = "50% 50% 45% 45%";
      balloon.style.background = colors[i % colors.length];
      balloon.style.opacity = ".25";
      balloon.style.boxShadow = "inset -6px -6px 10px rgba(100,20,55,.12)";
      balloonLayer.appendChild(balloon);
    }
  }

  createBalloons();

  // CONFETTI EFFECT
  function createConfetti(amount, centerBurst) {
    const colors = [
      "#ed5792",
      "#ffd2e3",
      "#d7a64f",
      "#ffffff",
      "#a91f59",
      "#f7c2d7"
    ];

    for (let i = 0; i < amount; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";

      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = random(5, 11) + "px";
      piece.style.height = random(8, 16) + "px";

      if (centerBurst) {
        piece.style.left = "50%";
        piece.style.top = "50%";
      } else {
        piece.style.left = random(0, 100) + "%";
        piece.style.top = "-20px";
      }

      confettiLayer.appendChild(piece);

      const x = centerBurst ? random(-450, 450) : random(-160, 160);
      const y = centerBurst ? random(-350, 450) : window.innerHeight + 100;

      if (window.gsap) {
        gsap.to(piece, {
          x: x,
          y: y,
          rotation: random(-600, 600),
          opacity: 0,
          duration: centerBurst ? random(1.3, 2.4) : random(2.5, 4.5),
          ease: "power2.out",
          onComplete: function () {
            piece.remove();
          }
        });
      } else {
        piece.animate(
          [
            { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
            {
              transform: "translate(" + x + "px," + y + "px) rotate(500deg)",
              opacity: 0
            }
          ],
          { duration: 2500, easing: "ease-out" }
        ).onfinish = function () {
          piece.remove();
        };
      }
    }
  }

  // OPEN THE WEBSITE
  openSurprise.addEventListener("click", function () {

    if (websiteOpened) return;

    websiteOpened = true;

    if (window.gsap) {
      const introTimeline = gsap.timeline();

      introTimeline.to(".invitation", {
        scale: .9,
        y: -35,
        opacity: 0,
        duration: .55,
        ease: "power2.in"
      });

      introTimeline.to(introScreen, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: function () {
          introScreen.style.display = "none";
          startWebsite();
        }
      }, "-=.1");

    } else {
      introScreen.style.display = "none";
      startWebsite();
    }
  });

  // START MAIN WEBSITE
  function startWebsite() {

    createConfetti(100, false);

    if (!window.gsap) return;

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const heroTimeline = gsap.timeline();

    heroTimeline.from(".logo", {
      y: -20,
      opacity: 0,
      duration: .6
    });

    heroTimeline.from(".nav-links a", {
      y: -15,
      opacity: 0,
      stagger: .08,
      duration: .4
    }, "-=.25");

    heroTimeline.from(".nav-button", {
      scale: .8,
      opacity: 0,
      duration: .5
    }, "-=.2");

    heroTimeline.from(".hero .eyebrow", {
      x: -30,
      opacity: 0,
      duration: .6
    });

    heroTimeline.from(".hero-title", {
      y: 55,
      opacity: 0,
      duration: .9,
      ease: "back.out(1.2)"
    }, "-=.2");

    heroTimeline.from(".hero-subtitle, .hero-description", {
      y: 25,
      opacity: 0,
      stagger: .15,
      duration: .7
    }, "-=.3");

    heroTimeline.from(".hero-actions", {
      y: 20,
      opacity: 0,
      duration: .6
    }, "-=.2");

    heroTimeline.from(".hero-cake-card", {
      scale: .7,
      rotation: 8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.4)"
    }, "-=1");

    // FLOATING CAKE
    gsap.to(".hero-cake-card", {
      y: -12,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // ROTATING ORBIT
    gsap.to(".ring-two", {
      rotation: 360,
      duration: 55,
      repeat: -1,
      ease: "none"
    });

    // FLOATING BALLOONS AND GIFTS
    gsap.utils.toArray([
      ".hero-balloon",
      ".art-gift",
      ".art-heart"
    ].join(",")).forEach(function (element, index) {

      gsap.to(element, {
        y: random(-17, 17),
        rotation: random(-10, 10),
        duration: random(2, 3.5),
        repeat: -1,
        yoyo: true,
        delay: index * .2,
        ease: "sine.inOut"
      });

    });

    // INTRO STARS
    gsap.to(".intro-stars span", {
      opacity: .2,
      scale: .6,
      duration: 1,
      stagger: .04,
      repeat: 1,
      yoyo: true
    });

    // SCROLL REVEALS
    if (window.ScrollTrigger) {

      gsap.utils.toArray(".reveal").forEach(function (element) {

        gsap.fromTo(element,
          {
            y: 45,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: .9,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true
            }
          }
        );

      });

      // HIGHLIGHT CARDS
      gsap.fromTo(".highlight",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: .12,
          duration: .7,
          immediateRender: false,
          scrollTrigger: {
            trigger: ".highlights",
            start: "top 90%",
            once: true
          }
        }
      );

      // WISH CARDS
      gsap.fromTo(".wish-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: .15,
          duration: .8,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".wish-grid",
            start: "top 85%",
            once: true
          }
        }
      );

      // PHOTO REVEAL
      gsap.fromTo(".photo-frame",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.3,
          ease: "power3.inOut",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".photo-column",
            start: "top 80%",
            once: true
          }
        }
      );

      // LETTER REVEAL
      gsap.fromTo(".letter-card",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".letter-card",
            start: "top 85%",
            once: true
          }
        }
      );

      // CAKE REVEAL
      gsap.fromTo(".party-cake",
        { y: 55, scale: .85, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.4)",
          immediateRender: false,
          scrollTrigger: {
            trigger: ".party-stage",
            start: "top 85%",
            once: true
          }
        }
      );

    }

    // PARTY CAKE CANDLES
    gsap.to(".party-candle i", {
      scale: 1.2,
      rotation: 8,
      duration: .4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // PARTY LIGHTS
    gsap.to(".party-string span", {
      scale: 1.4,
      opacity: .4,
      duration: .7,
      stagger: .12,
      repeat: -1,
      yoyo: true
    });

    // FINAL HEART
    gsap.to(".final-heart", {
      scale: 1.15,
      duration: .8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // PARTY BALLOONS
    gsap.to(".party-balloon", {
      y: -17,
      rotation: 8,
      duration: 2.2,
      stagger: .3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }

  // PARTY BUTTON
  partyButton.addEventListener("click", function () {

    createConfetti(150, true);
    createConfetti(80, false);

    if (window.gsap) {
      gsap.fromTo(partyButton,
        { scale: 1 },
        {
          scale: 1.1,
          duration: .2,
          repeat: 1,
          yoyo: true
        }
      );
    }

  });

  // SMOOTH NAVIGATION
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });

});
