     // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

    // Hamburger
    const ham = document.getElementById('hamburger'), mob = document.getElementById('mobileMenu');
    ham.addEventListener('click', () => { ham.classList.toggle('open'); mob.classList.toggle('visible'); });
    document.addEventListener('click', e => { if (!ham.contains(e.target) && !mob.contains(e.target)) { ham.classList.remove('open'); mob.classList.remove('visible'); } });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); mob.classList.remove('visible'); }));

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }), { threshold: 0.1 }).observe ? null : null;
    const revObs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); } }), { threshold: 0.1 });
    reveals.forEach(r => revObs.observe(r));

    // Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.car-card');
    const countEl = document.getElementById('resultCount');
    const emptyState = document.getElementById('emptyState');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        let count = 0;
        cards.forEach(card => {
          const cats = card.dataset.category || '';
          const show = filter === 'all' || cats.includes(filter);
          card.classList.toggle('hidden', !show);
          if (show) count++;
        });
        countEl.textContent = count;
        emptyState.classList.toggle('visible', count === 0);
      });
    });

    // ── Buy Now → redirect to login ──
    // Check if returning from login with buy intent
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('buy') === '1') {
      const make  = urlParams.get('make')  || '';
      const name  = urlParams.get('name')  || '';
      const price = urlParams.get('price') || '';
      if (make && name) {
        setTimeout(() => openBuyConfirm(make, name, price), 400);
      }
    }

    function openBuyConfirm(make, name, price) {
      const overlay = document.getElementById('buyOverlay');
      document.getElementById('popupMake').textContent  = make;
      document.getElementById('popupName').textContent  = name;
      document.getElementById('popupPrice').textContent = price;
      document.getElementById('summaryName').textContent  = make + ' ' + name;
      document.getElementById('summaryPrice').textContent = price;
      document.getElementById('buyForm').style.display = 'block';
      document.getElementById('buySuccess').classList.remove('visible');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeBuyPopup() {
      document.getElementById('buyOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }

    document.getElementById('buyClose').addEventListener('click', closeBuyPopup);
    document.getElementById('buyOverlay').addEventListener('click', e => { if (e.target === document.getElementById('buyOverlay')) closeBuyPopup(); });
    document.getElementById('backBtn').addEventListener('click', closeBuyPopup);

    document.getElementById('submitBuy').addEventListener('click', () => {
      const fname = document.getElementById('f-fname').value.trim();
      const phone = document.getElementById('f-phone').value.trim();
      if (!fname || !phone) { alert('Please fill in your name and phone number.'); return; }
      const make  = document.getElementById('popupMake').textContent;
      const name  = document.getElementById('popupName').textContent;
      const price = document.getElementById('popupPrice').textContent;
      const msg   = encodeURIComponent(`🚗 *Purchase Request — Ginyard International Co.*\n\nVehicle: ${make} ${name}\nEst. Price: ${price}\n\nCustomer: ${fname}\nPhone: ${phone}\n\nI am interested in purchasing this vehicle. Please contact me.`);
      window.open('https://wa.me/971500000000?text=' + msg, '_blank');
      document.getElementById('buyForm').style.display = 'none';
      document.getElementById('buySuccess').classList.add('visible');
    });

    // Buy Now button → go to login with car context
    document.querySelectorAll('.btn-buy').forEach(btn => {
      btn.addEventListener('click', () => {
        const { make, name, price } = btn.dataset;
        window.location.href = `../Log in/login.html?from=buy&make=${encodeURIComponent(make)}&car=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
      });
    });