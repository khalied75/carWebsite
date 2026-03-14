   // ── Read URL params (car context from Buy Now) ──
  const params = new URLSearchParams(window.location.search);
  const fromBuy  = params.get('from') === 'buy';
  const carName  = params.get('car') || '';
  const carPrice = params.get('price') || '';
  const carMake  = params.get('make') || '';

  if (fromBuy && carName) {
    const ctx = document.getElementById('buyContext');
    ctx.classList.add('show');
    document.getElementById('ctxCarName').textContent = carMake + ' ' + carName;
  }

  // ── Tab switch ──
  function switchTab(tab) {
    document.getElementById('loginPanel').classList.toggle('active', tab === 'login');
    document.getElementById('signupPanel').classList.toggle('active', tab === 'signup');
    document.getElementById('loginTab').classList.toggle('active', tab === 'login');
    document.getElementById('signupTab').classList.toggle('active', tab === 'signup');
  }

  // ── Password visibility ──
  function togglePw(id, btn) {
    const inp = document.getElementById(id);
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.innerHTML = show
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }

  // ── Password strength ──
  function checkStrength(val) {
    const fill  = document.getElementById('pwFill');
    const label = document.getElementById('pwLabel');
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const colors = ['#ef4444','#f97316','#eab308','#22c55e'];
    const labels = ['Too weak','Fair','Good','Strong 💪'];
    const widths  = ['25%','50%','75%','100%'];

    if (!val) { fill.style.width = '0'; label.textContent = 'Enter a password'; return; }
    const i = Math.max(0, score - 1);
    fill.style.width = widths[i];
    fill.style.background = colors[i];
    label.textContent = labels[i];
    label.style.color = colors[i];
  }

  // ── Validation helpers ──
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  function setMsg(id, msg, type) {
    const el = document.getElementById(id);
    el.className = 'form-msg ' + type;
    el.textContent = msg;
  }

  // ── Login submit ──
  function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const pw    = document.getElementById('loginPw').value;
    let ok = true;

    document.getElementById('loginEmailErr').classList.toggle('show', !isEmail(email));
    document.getElementById('loginPwErr').classList.toggle('show', !pw);
    if (!isEmail(email) || !pw) return;

    const btn = document.getElementById('loginBtn');
    btn.classList.add('loading');
    btn.innerHTML = '<div class="spinner"></div> Signing in...';

    // Simulate auth → redirect back to catalogue (or buy flow)
    setTimeout(() => {
      if (fromBuy && carName) {
        // Redirect back to catalogue with buy intent
        const redirectUrl = `../catalogue/catalogue (1).html?buy=1&make=${encodeURIComponent(carMake)}&name=${encodeURIComponent(carName)}&price=${encodeURIComponent(carPrice)}`;
        window.location.href = redirectUrl;
      } else {
        window.location.href = '../catalogue/catalogue (1).html';
      }
    }, 1400);
  }

  // ── Signup submit ──
  function handleSignup() {
    const fname = document.getElementById('suFname').value.trim();
    const lname = document.getElementById('suLname').value.trim();
    const email = document.getElementById('suEmail').value.trim();
    const phone = document.getElementById('suPhone').value.trim();
    const pw    = document.getElementById('suPw').value;
    const terms = document.getElementById('termsCheck').checked;

    if (!fname || !lname || !isEmail(email) || !phone || pw.length < 8 || !terms) {
      document.getElementById('suEmailErr').classList.toggle('show', !isEmail(email));
      if (!terms) setMsg('signupMsg', 'Please agree to the Terms of Service to continue.', 'error');
      else if (pw.length < 8) setMsg('signupMsg', 'Password must be at least 8 characters.', 'error');
      else if (!fname || !lname || !phone) setMsg('signupMsg', 'Please fill in all required fields.', 'error');
      return;
    }

    const btn = document.getElementById('signupBtn');
    btn.classList.add('loading');
    btn.innerHTML = '<div class="spinner"></div> Creating account...';

    setTimeout(() => {
      setMsg('signupMsg', '', '');
      btn.classList.remove('loading');
      // Show success then redirect
      btn.innerHTML = '✓ Account Created!';
      btn.style.background = 'linear-gradient(135deg,#16a34a,#15803d)';
      setMsg('signupMsg', `Welcome, ${fname}! Your account has been created successfully.`, 'success');
      setTimeout(() => {
        if (fromBuy && carName) {
          window.location.href = `?buy=1&make=${encodeURIComponent(carMake)}&name=${encodeURIComponent(carName)}&price=${encodeURIComponent(carPrice)}`;
        } else {
          window.location.href = '../catalogue/catalogue (1).html';
        }
      }, 1600);
    }, 1600);
  }

  // ── Social login ──
  function socialLogin(provider) {
    const btn = event.currentTarget;
    btn.innerHTML = `<div class="spinner" style="border-color:rgba(0,0,0,.15);border-top-color:#333"></div> Connecting...`;
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      if (fromBuy && carName) {
        window.location.href = `catalogue.html?buy=1&make=${encodeURIComponent(carMake)}&name=${encodeURIComponent(carName)}&price=${encodeURIComponent(carPrice)}`;
      } else {
        window.location.href = 'catalogue.html';
      }
    }, 1200);
  }

  // ── Enter key ──
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (document.getElementById('loginPanel').classList.contains('active')) handleLogin();
      else handleSignup();
    }
  });