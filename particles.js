particlesJS("particles", {

  particles: {
    number: {
      value: 77,
      density: {
        enable: true,
        value_area: 900
      }
    },

    color: {
      value: [
        "#7c3aed",
        "#22d3ee",
        "#002FA7",
        "#ffffff"
      ]
    },

    shape: {
      type: "circle"
    },

  opacity: {
    value: 0.8,
    random: true,
    
    anim: {
      enable: true,
      speed: 0.6,
      opacity_min: 0.35,
      sync: false
    }
  },

    size: {
      value: 2,
      random: true
    },

    line_linked: {
      enable: true,
      distance: 170,
      color: "#4c1d95",
      opacity: 0.22,
      width: 1
    },

    move: {
      enable: true,
      speed: 0.35,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out"
    }
  },

  interactivity: {

    detect_on: "window",

    events: {

      onhover: {
        enable: true,
        mode: "grab"
      },

      resize: true
    },

    modes: {

      grab: {
        distance: 180,

        line_linked: {
          opacity: 0.7
        }
      }
    }
  },
  retina_detect: true
});