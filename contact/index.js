   // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

    // Hamburger
    const ham = document.getElementById('hamburger'), mob = document.getElementById('mobileMenu');
    ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('visible'); });
    document.addEventListener('click', e => { if (!ham.contains(e.target) && !mob.contains(e.target)) { ham.classList.remove('open'); mob.classList.remove('visible'); } });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('visible'); }));

    // Scroll reveal
    const revObs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(r => revObs.observe(r));

    // Live now badge (show during working hours UAE time)
    (function() {
      const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' }));
      const h = now.getHours(), d = now.getDay();
      const isFri = d === 5, isSun = d === 0;
      const open =
        (isSun ? false :
         isFri ? (h >= 14 && h < 21) :
         (h >= 9 && h < 20));
      if (open) {
        document.getElementById('liveNow').innerHTML =
          `<span style="display:inline-flex;align-items:center;gap:.3rem;background:rgba(74,222,128,.15);border:1px solid rgba(74,222,128,.3);border-radius:50px;padding:.1rem .5rem;font-size:.68rem;font-weight:700;color:#4ade80;margin-left:.4rem;">
            <span style="width:5px;height:5px;background:#4ade80;border-radius:50%;animation:livePulse 1.5s infinite;display:inline-block;"></span>
            Online Now
          </span>`;
      }
    })();

    // Form submit
    function submitForm() {
      const fname = document.getElementById('qfFname').value.trim();
      const phone = document.getElementById('qfPhone').value.trim();
      const msg   = document.getElementById('qfMsg').value.trim();
      if (!fname || !phone || !msg) { alert('Please fill in your name, phone, and message.'); return; }

      const btn = document.querySelector('.qf-submit');
      btn.innerHTML = '<div style="width:16px;height:16px;border:2px solid rgba(255,255,255,.3);border-top-color:white;border-radius:50%;animation:spin .7s linear infinite;"></div> Sending...';
      btn.style.pointerEvents = 'none';

      const waText = encodeURIComponent(
        `📩 *New Contact Message — Ginyard International Co.*\n\nName: ${fname}\nPhone: ${phone}\nInterest: ${document.getElementById('qfInterest').value}\n\nMessage:\n${msg}`
      );

      setTimeout(() => {
        document.getElementById('qfFormBody').style.display = 'none';
        document.getElementById('qfSuccess').classList.add('show');
        window.open('https://wa.me/971500000000?text=' + waText, '_blank');
      }, 1000);
    }