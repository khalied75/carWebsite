  // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Hamburger
    const ham = document.getElementById('hamburger');
    const mob = document.getElementById('mobileMenu');
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('visible');
    });
    document.addEventListener('click', e => {
      if (!ham.contains(e.target) && !mob.contains(e.target)) {
        ham.classList.remove('open');
        mob.classList.remove('visible');
      }
    });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      ham.classList.remove('open');
      mob.classList.remove('visible');
    }));

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(r => revealObs.observe(r));

    // Counter animation
    function animateCounter(el) {
      if (el.dataset.display === 'year') return; // don't animate year
      const target = parseInt(el.dataset.target);
      const suffix = el.innerHTML.includes('%') ? '<sup>%</sup>' :
                     el.innerHTML.includes('+') ? '<sup>+</sup>' : '';
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.innerHTML = Math.floor(current) + suffix;
      }, 16);
    }
    const counters = document.querySelectorAll('[data-target]');
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); cObs.unobserve(e.target); }
      });
    }, { threshold: .4 });
    counters.forEach(c => cObs.observe(c));