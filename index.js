    // ── Navbar scroll ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // ── Hamburger / mobile menu ──
    const ham = document.getElementById('hamburger');
    const mob = document.getElementById('mobileMenu');

    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('visible');
    });

    // close on outside click
    document.addEventListener('click', e => {
      if (!ham.contains(e.target) && !mob.contains(e.target)) {
        ham.classList.remove('open');
        mob.classList.remove('visible');
      }
    });

    // close on mobile link click
    mob.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('open');
        mob.classList.remove('visible');
      });
    });

    // ── Color switcher ──
    const dots = document.querySelectorAll('.cdot');
    const carImg = document.getElementById('carImage');
    const carGlow = document.getElementById('carGlow');

    // Car image URLs per color (using Wikimedia CC images as placeholders)
    const carImages = {
      red:      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg/1280px-2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg',
      rose:     'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg/1280px-2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg',
      silver:   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg/1280px-2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg',
      charcoal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg/1280px-2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg',
      black:    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg/1280px-2011_Ford_Mustang_-_Flickr_-_skinnylawyer_%281%29.jpg',
    };

    const filterMap = {
      red:      'none',
      rose:     'sepia(40%) saturate(60%) hue-rotate(300deg) brightness(1.1)',
      silver:   'grayscale(80%) brightness(1.15)',
      charcoal: 'grayscale(100%) brightness(.75)',
      black:    'grayscale(100%) brightness(.45)',
    };

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        const color = dot.dataset.color;
        const glow  = dot.dataset.glow;

        // animate out
        carImg.style.transition = 'opacity .3s, filter .4s';
        carImg.style.opacity = '0';

        setTimeout(() => {
          carImg.style.filter = filterMap[color];
          carImg.style.opacity = '1';
        }, 300);

        // update glow
        carGlow.style.background = `radial-gradient(ellipse, ${glow} 0%, transparent 70%)`;
      });
    });

    // ── Counter animation ──
    function animateCounter(el) {
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 16);
    }

    // trigger counters when in view
    const counters = document.querySelectorAll('[data-target]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: .3 });

    counters.forEach(c => observer.observe(c));