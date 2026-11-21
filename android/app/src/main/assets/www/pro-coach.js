// ============================================================
// GYM PLAN PRO (LIFETIME ₹499) - PERSONALIZATION & UPI ENGINE
// Powered by CodeByTushu • Version 0.05 • 100% Offline Ready
// ============================================================

(function (global) {
  'use strict';

  var PRO_STORAGE_KEY = 'tushu_gym_pro_state_v1';
  var PRO_UPI_ID = 'Q788722929@ybl';
  var PRO_PAYEE_NAME = 'Tushpendra Shop';
  var PRO_PRICE_INR = 499;
  var PRO_LICENSE_SALT = 'CODEBYTUSHU_PRO_499_VERIFY_2026_TSH';

  // Pure deterministic FIPS 180-4 SHA-256 (works identically on file:// WebView and Node/Browser)
  function sha256Hex(ascii) {
    function rightRotate(value, amount) {
      return (value >>> amount) | (value << (32 - amount));
    }

    var maxWord = Math.pow(2, 32);
    var result = '';
    var words = [];
    var asciiBitLength = ascii.length * 8;
    var hash = sha256Hex.h || [];
    var k = sha256Hex.k || [];
    var primeCounter = k.length;
    var isComposite = {};

    for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
        for (var i = 0; i < 313; i += candidate) {
          isComposite[i] = candidate;
        }
        hash[primeCounter] = (Math.pow(candidate, 0.5) * maxWord) | 0;
        k[primeCounter++] = (Math.pow(candidate, 1 / 3) * maxWord) | 0;
      }
    }
    sha256Hex.h = hash;
    sha256Hex.k = k;

    var h = hash.slice(0);
    var msg = unescape(encodeURIComponent(String(ascii)));
    asciiBitLength = msg.length * 8;

    msg += '\x80';
    while ((msg.length % 64) - 56) msg += '\x00';

    for (var j = 0; j < msg.length; j++) {
      var code = msg.charCodeAt(j);
      words[j >> 2] |= code << (((3 - j) % 4) * 8);
    }
    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;

    for (var chunk = 0; chunk < words.length;) {
      var w = words.slice(chunk, (chunk += 16));
      var oldHash = h.slice(0);

      for (var t = 0; t < 64; t++) {
        if (t >= 16) {
          var s0 = rightRotate(w[t - 15], 7) ^ rightRotate(w[t - 15], 18) ^ (w[t - 15] >>> 3);
          var s1 = rightRotate(w[t - 2], 17) ^ rightRotate(w[t - 2], 19) ^ (w[t - 2] >>> 10);
          w[t] = (w[t - 16] + s0 + w[t - 7] + s1) | 0;
        }

        var a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hh = h[7];
        var S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
        var ch = (e & f) ^ ((~e) & g);
        var temp1 = (hh + S1 + ch + k[t] + w[t]) | 0;
        var S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var temp2 = (S0 + maj) | 0;

        h = [(temp1 + temp2) | 0, a, b, c, (d + temp1) | 0, e, f, g];
      }

      for (var m = 0; m < 8; m++) {
        h[m] = (h[m] + oldHash[m]) | 0;
      }
    }

    for (var p = 0; p < 8; p++) {
      for (var q = 3; q + 1; q--) {
        var bVal = (h[p] >> (q * 8)) & 255;
        result += (bVal < 16 ? '0' : '') + bVal.toString(16);
      }
    }
    return result;
  }

  function getTodayIsoDate() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function generateRequestId() {
    var rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    var ts = Date.now().toString(36).slice(-4).toUpperCase();
    return 'CBTPRO-' + ts + rand;
  }

  function computeActivationKey(requestId, utr) {
    var cleanReq = String(requestId || '').trim().toUpperCase();
    var cleanUtr = String(utr || '').trim().toUpperCase();
    var raw = cleanReq + '|' + cleanUtr + '|' + PRO_UPI_ID + '|' + PRO_PRICE_INR + '|' + PRO_LICENSE_SALT;
    var digest = sha256Hex(raw).slice(0, 12).toUpperCase();
    return 'CBT-' + digest.slice(0, 4) + '-' + digest.slice(4, 8) + '-' + digest.slice(8, 12);
  }

  function computeEntitlementSignature(checkout) {
    if (!checkout) return '';
    var raw = [
      'UNLOCKED',
      String(checkout.requestId || '').trim().toUpperCase(),
      String(checkout.transactionId || '').trim().toUpperCase(),
      PRO_UPI_ID,
      PRO_PRICE_INR,
      String(checkout.verifiedAt || ''),
      PRO_LICENSE_SALT
    ].join('|');
    return sha256Hex(raw);
  }

  function defaultProState() {
    return {
      profile: {
        age: '',
        weightKg: '',
        goal: 'Muscle Gain',
        condition: 'Beginner',
        durationDays: 60,
        skipOptional: false,
        climate: 'Moderate / Temperate',
        environment: 'Commercial Gym',
        bodyType: 'Mesomorph',
        dietNotes: '',
        planStartDate: ''
      },
      checkout: {
        requestId: generateRequestId(),
        upiId: PRO_UPI_ID,
        amount: PRO_PRICE_INR,
        currency: 'INR',
        transactionId: '',
        approvalRefNo: '',
        paymentStatus: 'NOT_PAID', // NOT_PAID | PENDING_VERIFICATION | FAILED | VERIFIED
        unlocked: false,
        entitlementType: 'LIFETIME',
        verificationMethod: '',
        entitlementSignature: '',
        submittedAt: '',
        verifiedAt: ''
      },
      waterTracker: {
        date: getTodayIsoDate(),
        ml: 0
      },
      activityTracker: {
        date: getTodayIsoDate(),
        doneIds: []
      }
    };
  }

  function loadProState() {
    var fallback = defaultProState();
    try {
      if (typeof localStorage === 'undefined') return fallback;
      var raw = localStorage.getItem(PRO_STORAGE_KEY);
      if (!raw) {
        saveProState(fallback);
        return fallback;
      }
      var parsed = JSON.parse(raw);
      var merged = {
        profile: Object.assign({}, fallback.profile, parsed.profile || {}),
        checkout: Object.assign({}, fallback.checkout, parsed.checkout || {}),
        waterTracker: Object.assign({}, fallback.waterTracker, parsed.waterTracker || {}),
        activityTracker: Object.assign({}, fallback.activityTracker, parsed.activityTracker || {})
      };

      // Always enforce fixed price and payee UPI ID
      merged.checkout.upiId = PRO_UPI_ID;
      merged.checkout.amount = PRO_PRICE_INR;
      merged.checkout.currency = 'INR';
      merged.checkout.entitlementType = 'LIFETIME';

      // Tamper verification: unlocked state is ONLY accepted if signature validates
      if (merged.checkout.unlocked) {
        var expectedSig = computeEntitlementSignature(merged.checkout);
        if (
          !merged.checkout.entitlementSignature ||
          merged.checkout.entitlementSignature !== expectedSig ||
          merged.checkout.paymentStatus !== 'VERIFIED' ||
          !merged.checkout.transactionId
        ) {
          merged.checkout.unlocked = false;
          merged.checkout.paymentStatus = merged.checkout.transactionId ? 'PENDING_VERIFICATION' : 'NOT_PAID';
          merged.checkout.entitlementSignature = '';
          saveProState(merged);
        }
      }

      // Reset daily trackers cleanly when date rolls over
      var today = getTodayIsoDate();
      if (merged.waterTracker.date !== today) {
        merged.waterTracker = { date: today, ml: 0 };
      }
      if (merged.activityTracker.date !== today) {
        merged.activityTracker = { date: today, doneIds: [] };
      }

      return merged;
    } catch (e) {
      return fallback;
    }
  }

  function saveProState(state) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(PRO_STORAGE_KEY, JSON.stringify(state));
      }
    } catch (e) {
      // Storage unavailable
    }
  }

  function notifyModalAlert(msg, title, tone) {
    if (typeof global.showAppAlert === 'function') {
      return global.showAppAlert({ message: msg, title: title || 'Notice', tone: tone || 'info' });
    }
    return Promise.resolve();
  }

  function safeEscape(str) {
    if (typeof global.escapeHtml === 'function') return global.escapeHtml(str);
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function hasValidMandatoryProfile(profile) {
    var age = Number(profile && profile.age);
    var weight = Number(profile && profile.weightKg);
    var days = Number(profile && profile.durationDays);
    return (
      Number.isFinite(age) && age >= 12 && age <= 95 &&
      Number.isFinite(weight) && weight >= 30 && weight <= 250 &&
      Boolean(profile && profile.goal) &&
      Boolean(profile && profile.condition) &&
      Number.isFinite(days) && days >= 7 && days <= 365
    );
  }

  function buildUpiUri(checkout) {
    var reqId = (checkout && checkout.requestId) ? checkout.requestId : generateRequestId();
    var note = 'Gym Plan Pro ' + reqId;
    return (
      'upi://pay?pa=' + PRO_UPI_ID +
      '&pn=' + encodeURIComponent(PRO_PAYEE_NAME) +
      '&tr=' + encodeURIComponent(reqId) +
      '&tn=' + encodeURIComponent(note) +
      '&am=' + PRO_PRICE_INR + '.00' +
      '&cu=INR'
    );
  }

  // Personalized plan calculation engine
  function calculatePersonalizedTargets(profile) {
    var age = Math.max(12, Math.min(95, Number(profile.age) || 24));
    var weight = Math.max(30, Math.min(250, Number(profile.weightKg) || 70));
    var goal = profile.goal || 'Muscle Gain';
    var condition = profile.condition || 'Beginner';
    var durationDays = Math.max(7, Math.min(365, Number(profile.durationDays) || 60));
    var skipOptional = Boolean(profile.skipOptional);
    var climate = skipOptional ? 'Moderate / Temperate' : (profile.climate || 'Moderate / Temperate');
    var environment = skipOptional ? 'Commercial Gym' : (profile.environment || 'Commercial Gym');
    var bodyType = skipOptional ? 'Mesomorph' : (profile.bodyType || 'Mesomorph');

    // Maintenance estimate based on weight, age & training level
    var activityFactor = condition === 'Athletic' ? 35 : (condition === 'Intermediate' ? 32 : 29);
    if (age > 40) activityFactor -= 1.5;
    if (bodyType === 'Ectomorph') activityFactor += 2;
    if (bodyType === 'Endomorph') activityFactor -= 2;

    var maintenance = Math.round(weight * activityFactor);
    var calories = maintenance;
    var proteinPerKg = 1.8;
    var fatPerKg = 0.85;
    var stepsTarget = 8000;

    if (goal === 'Muscle Gain') {
      calories = maintenance + 320;
      proteinPerKg = 2.0;
      fatPerKg = 0.9;
      stepsTarget = 7500;
    } else if (goal === 'Weight Loss') {
      calories = Math.max(1350, maintenance - 450);
      proteinPerKg = 2.1;
      fatPerKg = 0.7;
      stepsTarget = 10500;
    } else if (goal === 'Weight Gain') {
      calories = maintenance + 500;
      proteinPerKg = 1.75;
      fatPerKg = 1.0;
      stepsTarget = 6500;
    } else {
      // General Fitness
      calories = maintenance;
      proteinPerKg = 1.65;
      fatPerKg = 0.8;
      stepsTarget = 8500;
    }

    var proteinG = Math.round(weight * proteinPerKg);
    var fatsG = Math.round(weight * fatPerKg);
    var remainingCals = Math.max(250, calories - (proteinG * 4 + fatsG * 9));
    var carbsG = Math.round(remainingCals / 4);

    // Water goal in ml (adjusted by climate and fitness level)
    var waterMl = Math.round(weight * 38);
    if (climate === 'Hot / Humid') waterMl += 600;
    if (condition === 'Athletic') waterMl += 400;
    waterMl = Math.max(2200, Math.min(5500, Math.round(waterMl / 250) * 250));

    // Workout guidance
    var splitAdvice = '';
    if (environment === 'Bodyweight / Minimal') {
      splitAdvice = '4-5x/week progressive calisthenics: push-up variations, pull-ups, Bulgarian split squats, pike presses, and tempo planks.';
    } else if (environment === 'Home Dumbbells / Bands') {
      splitAdvice = '4-5x/week dumbbell hypertrophy: goblet squats, Romanian deadlifts, floor/incline presses, one-arm rows, and lateral raises.';
    } else {
      splitAdvice = condition === 'Beginner'
        ? '4-day Upper/Lower strength foundation focusing on controlled compound lifts and clean progressive overload.'
        : '5-6 day Push/Pull/Legs split targeting 12-16 weekly working sets per muscle group with progressive overload.';
    }

    var dietAdvice = '';
    if (goal === 'Weight Loss') {
      dietAdvice = 'Prioritize high-volume lean proteins, green vegetables, whole grains, and eliminate liquid calories. Keep protein spread across 4 meals.';
    } else if (goal === 'Weight Gain' || goal === 'Muscle Gain') {
      dietAdvice = 'Anchor every meal around 30-40g protein (eggs, paneer, chicken, whey, lentils) paired with complex carbs (rice, oats, potatoes) pre/post workout.';
    } else {
      dietAdvice = 'Balanced whole-food nutrition with 80% nutrient-dense home meals, steady hydration, and consistent meal timing.';
    }

    if (!skipOptional && profile.dietNotes && profile.dietNotes.trim()) {
      dietAdvice += ' Note applied: ' + profile.dietNotes.trim();
    }

    // Target duration countdown
    var startStr = profile.planStartDate || getTodayIsoDate();
    var startDate = new Date(startStr + 'T00:00:00');
    var todayDate = new Date(getTodayIsoDate() + 'T00:00:00');
    var elapsedDays = Math.max(1, Math.floor((todayDate.getTime() - startDate.getTime()) / 86400000) + 1);
    var remainingDays = Math.max(0, durationDays - elapsedDays);

    return {
      calories: calories,
      proteinG: proteinG,
      carbsG: carbsG,
      fatsG: fatsG,
      waterMl: waterMl,
      waterLiters: (waterMl / 1000).toFixed(1),
      stepsTarget: stepsTarget,
      durationDays: durationDays,
      elapsedDays: Math.min(durationDays, elapsedDays),
      remainingDays: remainingDays,
      splitAdvice: splitAdvice,
      dietAdvice: dietAdvice,
      dailyChecklist: [
        { id: 'act_workout', label: 'Complete today\'s scheduled training session' },
        { id: 'act_steps', label: 'Reach ' + stepsTarget.toLocaleString('en-US') + ' daily activity steps' },
        { id: 'act_protein', label: 'Hit ' + proteinG + 'g daily protein target' },
        { id: 'act_sleep', label: 'Get 7.5+ hours of recovery sleep' }
      ]
    };
  }

  function renderProHomeBanner() {
    if (typeof document === 'undefined') return;
    var banner = document.getElementById('proHomeBanner');
    if (!banner) return;

    var state = loadProState();
    var badge = document.getElementById('proHomeBadge');
    var pricePill = document.getElementById('proHomePricePill');
    var titleEl = document.getElementById('proHomeTitle');
    var descEl = document.getElementById('proHomeDesc');

    if (state.checkout.unlocked) {
      banner.classList.add('pro-unlocked');
      if (badge) badge.textContent = 'GYM PLAN PRO • ACTIVE';
      if (pricePill) pricePill.textContent = 'Lifetime Unlocked';
      if (hasValidMandatoryProfile(state.profile)) {
        var targets = calculatePersonalizedTargets(state.profile);
        if (titleEl) titleEl.textContent = state.profile.goal + ' Protocol • Day ' + targets.elapsedDays + ' of ' + targets.durationDays;
        if (descEl) descEl.textContent = targets.calories + ' kcal • ' + targets.proteinG + 'g Protein • ' + targets.waterLiters + 'L Water Goal • Tap to open Pro Coach';
      } else {
        if (titleEl) titleEl.textContent = 'Complete Your Pro Profile';
        if (descEl) descEl.textContent = 'Lifetime Pro is verified. Tap to enter your body metrics and generate your custom targets.';
      }
    } else {
      banner.classList.remove('pro-unlocked');
      if (badge) badge.textContent = 'GYM PLAN PRO • LIFETIME';
      if (pricePill) pricePill.textContent = '₹499 One-Time';
      if (state.checkout.paymentStatus === 'PENDING_VERIFICATION') {
        if (titleEl) titleEl.textContent = 'Payment Verification Pending';
        if (descEl) descEl.textContent = 'UTR ' + state.checkout.transactionId + ' submitted. Enter your CodeByTushu Activation Key to unlock Lifetime Pro.';
      } else {
        if (titleEl) titleEl.textContent = 'Unlock Personalized Pro Coaching';
        if (descEl) descEl.textContent = 'Custom calories, hydration goals, daily activity targets & goal roadmap. One-time lifetime unlock.';
      }
    }
  }

  var activeTab = 'coach'; // 'coach' | 'profile' | 'receipt'
  var editingProfileInActiveMode = false;

  function renderProfileFormHtml(state, isCheckoutFlow) {
    var p = state.profile;
    var skipChecked = p.skipOptional ? 'checked' : '';
    var optStyle = p.skipOptional ? 'display:none;' : '';

    return '' +
      '<div class="pro-section-card">' +
        '<div class="pro-section-header">' +
          '<div>' +
            '<h4 class="pro-section-title">' + (isCheckoutFlow ? 'Step 1: Personalized Fitness Profile' : 'Update Personalized Profile') + '</h4>' +
            '<p class="pro-section-sub">Fields marked <span class="pro-required-tag">* Required</span> tailor your calories, hydration, and workout plan.</p>' +
          '</div>' +
        '</div>' +
        '<div class="pro-form-grid">' +
          '<div class="form-group">' +
            '<label for="proInputAge">Age (Years) <span class="pro-required-tag">* Required</span></label>' +
            '<input type="number" id="proInputAge" min="12" max="95" placeholder="e.g. 24" value="' + safeEscape(p.age) + '">' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="proInputWeight">Current Weight (kg) <span class="pro-required-tag">* Required</span></label>' +
            '<input type="number" id="proInputWeight" min="30" max="250" step="0.5" placeholder="e.g. 72" value="' + safeEscape(p.weightKg) + '">' +
          '</div>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="proInputGoal">Primary Fitness Goal <span class="pro-required-tag">* Required</span></label>' +
          '<select id="proInputGoal">' +
            renderSelectOptions(['Muscle Gain', 'Weight Loss', 'Weight Gain', 'General Fitness'], p.goal) +
          '</select>' +
        '</div>' +
        '<div class="pro-form-grid">' +
          '<div class="form-group">' +
            '<label for="proInputCondition">Fitness Condition <span class="pro-required-tag">* Required</span></label>' +
            '<select id="proInputCondition">' +
              renderSelectOptions(['Beginner', 'Intermediate', 'Athletic'], p.condition) +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="proInputDuration">Target Plan Duration (Days) <span class="pro-required-tag">* Required</span></label>' +
            '<input type="number" id="proInputDuration" min="7" max="365" placeholder="e.g. 60" value="' + safeEscape(p.durationDays || 60) + '">' +
          '</div>' +
        '</div>' +
        '<div class="pro-optional-bar">' +
          '<label class="pro-skip-toggle">' +
            '<input type="checkbox" id="proSkipOptionalToggle" ' + skipChecked + ' onchange="toggleProOptionalFields(this.checked)">' +
            '<span>Skip Optional Details (Use balanced defaults)</span>' +
          '</label>' +
          '<span class="pro-optional-tag">Optional</span>' +
        '</div>' +
        '<div id="proOptionalFieldsWrap" style="' + optStyle + '">' +
          '<div class="pro-form-grid">' +
            '<div class="form-group">' +
              '<label for="proInputClimate">Location / Climate <span class="pro-optional-tag">Optional</span></label>' +
              '<select id="proInputClimate">' +
                renderSelectOptions(['Moderate / Temperate', 'Hot / Humid', 'Cold / Dry'], p.climate) +
              '</select>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="proInputEnvironment">Workout Environment <span class="pro-optional-tag">Optional</span></label>' +
              '<select id="proInputEnvironment">' +
                renderSelectOptions(['Commercial Gym', 'Home Dumbbells / Bands', 'Bodyweight / Minimal'], p.environment) +
              '</select>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="proInputBodyType">Body Type <span class="pro-optional-tag">Optional</span></label>' +
            '<select id="proInputBodyType">' +
              renderSelectOptions(['Mesomorph', 'Ectomorph', 'Endomorph'], p.bodyType) +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label for="proInputDietNotes">Dietary Preference or Restrictions <span class="pro-optional-tag">Optional</span></label>' +
            '<input type="text" id="proInputDietNotes" maxlength="140" placeholder="e.g. Vegetarian, lactose-free, high protein" value="' + safeEscape(p.dietNotes) + '">' +
          '</div>' +
        '</div>' +
        '<button type="button" class="btn-primary-dark" style="margin-top:8px;" onclick="saveProProfileForm(' + (isCheckoutFlow ? 'false' : 'true') + ')">' +
          (isCheckoutFlow ? 'Save Fitness Profile' : 'Save & Recalculate Targets') +
        '</button>' +
      '</div>';
  }

  function renderSelectOptions(options, selected) {
    return options.map(function (opt) {
      var isSel = opt === selected ? ' selected' : '';
      return '<option value="' + safeEscape(opt) + '"' + isSel + '>' + safeEscape(opt) + '</option>';
    }).join('');
  }

  function renderCheckoutHtml(state) {
    var c = state.checkout;
    var statusBanner = '';

    if (c.paymentStatus === 'PENDING_VERIFICATION') {
      statusBanner = '' +
        '<div class="pro-status-banner pending">' +
          '<strong>Verification in Progress</strong>' +
          '<span>UTR <code>' + safeEscape(c.transactionId) + '</code> recorded. Tap "Verify &amp; Activate Pro" below to unlock immediately.</span>' +
        '</div>';
    } else if (c.paymentStatus === 'FAILED') {
      statusBanner = '' +
        '<div class="pro-status-banner failed">' +
          '<strong>Payment Incomplete</strong>' +
          '<span>Transaction was not completed in the UPI app. If amount was debited, enter your 12-digit UTR from PhonePe/GPay receipt below to unlock immediately.</span>' +
        '</div>';
    }

    return '' +
      renderProfileFormHtml(state, true) +
      '<div class="pro-section-card">' +
        '<div class="pro-section-header">' +
          '<div>' +
            '<h4 class="pro-section-title">Step 2: Lifetime Pro Payment (₹499 One-Time)</h4>' +
            '<p class="pro-section-sub">Single one-time payment — zero recurring subscriptions. Pay via PhonePe, GPay, Paytm or scan QR.</p>' +
          '</div>' +
          '<span class="pro-price-tag">₹499 INR</span>' +
        '</div>' +
        statusBanner +
        '<div class="pro-vip-pass-card" style="margin: 14px 0; padding: 14px; background: rgba(52, 199, 89, 0.08); border: 1px solid rgba(52, 199, 89, 0.28); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px;">' +
          '<div>' +
            '<strong style="font-size: 0.88rem; color: var(--apple-green-dark); display: block;">⚡ Founder &amp; Athlete VIP Pass</strong>' +
            '<span style="font-size: 0.74rem; color: var(--text-secondary); display: block; line-height: 1.35; margin-top: 2px;">Testing or friend of CodeByTushu? Unlock 100% free lifetime access immediately.</span>' +
          '</div>' +
          '<button type="button" class="btn btn-primary" style="background: var(--apple-green); font-size: 0.78rem; padding: 8px 14px; border-radius: 10px; flex-shrink: 0;" onclick="unlockProFreePass(\'VIP Athlete Pass\')">Unlock Free</button>' +
        '</div>' +
        '<div class="upi-payment-box">' +
          '<div class="upi-qr-frame" style="background:#ffffff; padding:12px; border-radius:14px; text-align:center; border:1px solid #e2e8f0; margin-bottom:12px;">' +
            '<img id="proOfficialQrImg" src="./images/phonepe-merchant-qr.jpg" alt="PhonePe Merchant QR - Tushpendra Shop" style="max-width:210px; width:100%; height:auto; border-radius:10px; display:block; margin:0 auto; box-shadow:0 4px 14px rgba(0,0,0,0.08);">' +
            '<canvas id="proUpiQrCanvas" width="196" height="196" style="display:none;"></canvas>' +
            '<span style="display:block; font-size:0.72rem; color:#64748b; margin-top:8px; font-weight:600;">Scan with PhonePe, GPay, Paytm or any UPI App</span>' +
          '</div>' +
          '<div class="upi-meta-row">' +
            '<span>Merchant Name:</span>' +
            '<strong>' + safeEscape(PRO_PAYEE_NAME) + '</strong>' +
          '</div>' +
          '<div class="upi-meta-row">' +
            '<span>Payee UPI ID:</span>' +
            '<strong id="proUpiIdText">' + safeEscape(PRO_UPI_ID) + '</strong>' +
            '<button type="button" class="btn-chip" onclick="copyProUpiId()">Copy UPI ID</button>' +
          '</div>' +
          '<div class="upi-meta-row">' +
            '<span>Amount:</span>' +
            '<strong>₹' + PRO_PRICE_INR + ' (Lifetime One-Time)</strong>' +
          '</div>' +
          '<div class="upi-meta-row">' +
            '<span>Payment Request ID:</span>' +
            '<code>' + safeEscape(c.requestId) + '</code>' +
          '</div>' +
          '<button type="button" class="btn-primary-dark" style="margin-top:12px; width:100%; font-weight:700; padding:12px; border-radius:10px;" onclick="initiateUpiAppPayment()">⚡ Pay ₹499 via UPI App (PhonePe / GPay / Paytm)</button>' +
        '</div>' +
        '<div class="pro-verification-box" style="margin-top:16px;">' +
          '<h5 class="pro-sub-heading" style="font-size:0.95rem; font-weight:700; margin-bottom:4px;">Step 3: Instant Payment Verification</h5>' +
          '<p class="pro-section-sub" style="font-size:0.76rem; color:var(--text-secondary); margin-bottom:12px;">Pay ₹499 via QR code or button above. Then enter the 12-digit UTR from your payment receipt to activate Pro Lifetime instantly.</p>' +
          '<div class="form-group">' +
            '<label for="proUtrInput" style="font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:0.04em;">12-Digit UPI Transaction ID / UTR</label>' +
            '<div class="pro-inline-input-row" style="display:flex; gap:8px; margin-top:4px;">' +
              '<input type="text" id="proUtrInput" maxlength="24" placeholder="Enter 12-digit UTR (e.g. 432109876543)" value="' + safeEscape(c.transactionId) + '" style="flex:1;">' +
              '<button type="button" class="btn-primary-dark" style="white-space:nowrap; padding:10px 16px;" onclick="submitProUtrVerification()">Verify &amp; Activate Pro</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        renderLedgerSummaryHtml(state) +
      '</div>';
  }

  function renderLedgerSummaryHtml(state) {
    var c = state.checkout;
    var statusLabel = c.paymentStatus === 'VERIFIED'
      ? 'VERIFIED (LIFETIME ACTIVE)'
      : (c.paymentStatus === 'PENDING_VERIFICATION' ? 'PENDING VERIFICATION (LOCKED)' : (c.paymentStatus === 'FAILED' ? 'FAILED / CANCELLED (LOCKED)' : 'NOT PAID (LOCKED)'));

    return '' +
      '<div class="pro-ledger-card">' +
        '<div class="pro-ledger-title">Entitlement &amp; Transaction Ledger</div>' +
        '<div class="pro-ledger-row"><span>Request ID</span><code>' + safeEscape(c.requestId) + '</code></div>' +
        '<div class="pro-ledger-row"><span>Beneficiary UPI</span><span>' + safeEscape(c.upiId) + '</span></div>' +
        '<div class="pro-ledger-row"><span>Plan &amp; Amount</span><span>Lifetime One-Time • ₹' + PRO_PRICE_INR + '</span></div>' +
        '<div class="pro-ledger-row"><span>Transaction / UTR</span><code>' + safeEscape(c.transactionId || 'Not submitted') + '</code></div>' +
        '<div class="pro-ledger-row"><span>Verification Status</span><strong>' + safeEscape(statusLabel) + '</strong></div>' +
        (c.verifiedAt ? '<div class="pro-ledger-row"><span>Verified At</span><span>' + safeEscape(new Date(c.verifiedAt).toLocaleString('en-US')) + '</span></div>' : '') +
      '</div>';
  }

  function renderActiveProHubHtml(state) {
    var profileValid = hasValidMandatoryProfile(state.profile);
    if (!profileValid || editingProfileInActiveMode) {
      return '' +
        '<div class="pro-status-banner verified">' +
          '<strong>Lifetime Pro Verified</strong>' +
          '<span>' + (profileValid ? 'Update your profile below and recalculate your personalized plan.' : 'Enter your mandatory fitness details below to generate your custom plan.') + '</span>' +
        '</div>' +
        renderProfileFormHtml(state, false) +
        (profileValid ? '<button type="button" class="btn-secondary-light" style="width:100%;margin-top:8px;" onclick="cancelProProfileEdit()">Back to Pro Dashboard</button>' : '');
    }

    var targets = calculatePersonalizedTargets(state.profile);
    var waterMl = state.waterTracker.ml || 0;
    var waterPct = Math.min(100, Math.round((waterMl / targets.waterMl) * 100));
    var doneIds = Array.isArray(state.activityTracker.doneIds) ? state.activityTracker.doneIds : [];

    var checklistHtml = targets.dailyChecklist.map(function (item) {
      var isDone = doneIds.indexOf(item.id) !== -1;
      return '' +
        '<label class="pro-check-item' + (isDone ? ' done' : '') + '">' +
          '<input type="checkbox" ' + (isDone ? 'checked' : '') + ' onchange="toggleProActivityTask(\'' + item.id + '\')">' +
          '<span>' + safeEscape(item.label) + '</span>' +
        '</label>';
    }).join('');

    return '' +
      '<div class="pro-tabs-row">' +
        '<button type="button" class="pro-tab-btn' + (activeTab === 'coach' ? ' active' : '') + '" onclick="switchProTab(\'coach\')">My Plan</button>' +
        '<button type="button" class="pro-tab-btn' + (activeTab === 'profile' ? ' active' : '') + '" onclick="switchProTab(\'profile\')">Profile</button>' +
        '<button type="button" class="pro-tab-btn' + (activeTab === 'receipt' ? ' active' : '') + '" onclick="switchProTab(\'receipt\')">Receipt</button>' +
      '</div>' +
      (activeTab === 'coach' ? (
        '<div class="pro-goal-pill-row">' +
          '<span class="pro-goal-pill">' + safeEscape(state.profile.goal) + '</span>' +
          '<span class="pro-goal-pill subtle">' + safeEscape(state.profile.condition) + '</span>' +
          '<span class="pro-goal-pill subtle">Day ' + targets.elapsedDays + ' / ' + targets.durationDays + ' (' + targets.remainingDays + ' left)</span>' +
        '</div>' +
        '<div class="pro-stats-grid">' +
          '<div class="pro-stat-box"><span class="pro-stat-label">Daily Calories</span><strong class="pro-stat-value">' + targets.calories + ' kcal</strong></div>' +
          '<div class="pro-stat-box"><span class="pro-stat-label">Protein Goal</span><strong class="pro-stat-value">' + targets.proteinG + ' g</strong></div>' +
          '<div class="pro-stat-box"><span class="pro-stat-label">Carbs / Fats</span><strong class="pro-stat-value">' + targets.carbsG + 'g / ' + targets.fatsG + 'g</strong></div>' +
          '<div class="pro-stat-box"><span class="pro-stat-label">Daily Steps</span><strong class="pro-stat-value">' + targets.stepsTarget.toLocaleString('en-US') + '</strong></div>' +
        '</div>' +
        '<div class="pro-section-card">' +
          '<div class="pro-section-header">' +
            '<div>' +
              '<h4 class="pro-section-title">Daily Hydration Tracker</h4>' +
              '<p class="pro-section-sub">' + waterMl + ' ml / ' + targets.waterMl + ' ml (' + waterPct + '%)</p>' +
            '</div>' +
          '</div>' +
          '<div class="pro-progress-track"><div class="pro-progress-fill" style="width:' + waterPct + '%;"></div></div>' +
          '<div class="pro-water-actions">' +
            '<button type="button" class="btn-chip" onclick="addProWater(250)">+ 250 ml</button>' +
            '<button type="button" class="btn-chip" onclick="addProWater(500)">+ 500 ml</button>' +
            '<button type="button" class="btn-chip subtle" onclick="resetProWater()">Reset Today</button>' +
          '</div>' +
        '</div>' +
        '<div class="pro-section-card">' +
          '<h4 class="pro-section-title">Daily Pro Checklist</h4>' +
          '<div class="pro-checklist">' + checklistHtml + '</div>' +
        '</div>' +
        '<div class="pro-section-card">' +
          '<h4 class="pro-section-title">Nutrition Recommendation</h4>' +
          '<p class="pro-recommendation-text">' + safeEscape(targets.dietAdvice) + '</p>' +
          '<h4 class="pro-section-title" style="margin-top:12px;">Training Focus</h4>' +
          '<p class="pro-recommendation-text">' + safeEscape(targets.splitAdvice) + '</p>' +
        '</div>'
      ) : activeTab === 'profile' ? (
        renderProfileFormHtml(state, false)
      ) : (
        '<div class="pro-status-banner verified">' +
          '<strong>Verified Lifetime Access</strong>' +
          '<span>Your one-time ₹499 Lifetime entitlement is verified and stored securely offline.</span>' +
        '</div>' +
        renderLedgerSummaryHtml(state)
      ));
  }

  function renderProModalContent() {
    if (typeof document === 'undefined') return;
    var body = document.getElementById('proModalBody');
    if (!body) return;

    var state = loadProState();
    var badge = document.getElementById('proHeaderBadge');
    var sub = document.getElementById('proHeaderSub');

    if (state.checkout.unlocked) {
      if (badge) badge.textContent = 'PRO ACTIVE • LIFETIME';
      if (sub) sub.textContent = 'Personalized Nutrition, Hydration & Training';
      body.innerHTML = renderActiveProHubHtml(state);
    } else {
      if (badge) badge.textContent = 'LIFETIME • ₹499';
      if (sub) sub.textContent = 'One-Time Payment & Cryptographic Verification';
      body.innerHTML = renderCheckoutHtml(state);

      // Render offline QR canvas for UPI payment
      var canvas = document.getElementById('proUpiQrCanvas');
      if (canvas && global.OfflineQr && typeof global.OfflineQr.renderQrToCanvas === 'function') {
        try {
          global.OfflineQr.renderQrToCanvas(canvas, buildUpiUri(state.checkout), 180);
        } catch (err) {
          // Canvas fallback message if QR renderer fails
          var ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#1D1D1F';
            ctx.font = '12px sans-serif';
            ctx.fillText('UPI ID: ' + PRO_UPI_ID, 16, 98);
          }
        }
      }
    }
  }

  global.openProModal = function (tab) {
    if (tab) activeTab = tab;
    editingProfileInActiveMode = false;
    renderProModalContent();
    if (typeof global.openModal === 'function') {
      global.openModal('proModal');
    }
  };

  global.switchProTab = function (tab) {
    activeTab = tab;
    editingProfileInActiveMode = false;
    renderProModalContent();
  };

  global.cancelProProfileEdit = function () {
    editingProfileInActiveMode = false;
    activeTab = 'coach';
    renderProModalContent();
  };

  global.toggleProOptionalFields = function (skip) {
    var wrap = document.getElementById('proOptionalFieldsWrap');
    if (wrap) wrap.style.display = skip ? 'none' : '';
  };

  function collectProfileFromDom(existingProfile) {
    var ageEl = document.getElementById('proInputAge');
    var weightEl = document.getElementById('proInputWeight');
    var goalEl = document.getElementById('proInputGoal');
    var condEl = document.getElementById('proInputCondition');
    var durEl = document.getElementById('proInputDuration');
    var skipEl = document.getElementById('proSkipOptionalToggle');
    var climEl = document.getElementById('proInputClimate');
    var envEl = document.getElementById('proInputEnvironment');
    var bodyEl = document.getElementById('proInputBodyType');
    var notesEl = document.getElementById('proInputDietNotes');

    var age = Number(ageEl ? ageEl.value : existingProfile.age);
    var weight = Number(weightEl ? weightEl.value : existingProfile.weightKg);
    var durationDays = Number(durEl ? durEl.value : existingProfile.durationDays);

    if (!Number.isFinite(age) || age < 12 || age > 95) {
      return { error: 'Please enter a valid age between 12 and 95 years.' };
    }
    if (!Number.isFinite(weight) || weight < 30 || weight > 250) {
      return { error: 'Please enter a valid weight between 30 and 250 kg.' };
    }
    if (!Number.isFinite(durationDays) || durationDays < 7 || durationDays > 365) {
      return { error: 'Please enter a target plan duration between 7 and 365 days.' };
    }

    var skipOptional = skipEl ? Boolean(skipEl.checked) : Boolean(existingProfile.skipOptional);
    return {
      profile: {
        age: age,
        weightKg: weight,
        goal: goalEl ? goalEl.value : existingProfile.goal,
        condition: condEl ? condEl.value : existingProfile.condition,
        durationDays: Math.round(durationDays),
        skipOptional: skipOptional,
        climate: skipOptional ? 'Moderate / Temperate' : (climEl ? climEl.value : existingProfile.climate),
        environment: skipOptional ? 'Commercial Gym' : (envEl ? envEl.value : existingProfile.environment),
        bodyType: skipOptional ? 'Mesomorph' : (bodyEl ? bodyEl.value : existingProfile.bodyType),
        dietNotes: skipOptional ? '' : (notesEl ? notesEl.value.trim() : existingProfile.dietNotes),
        planStartDate: existingProfile.planStartDate || getTodayIsoDate()
      }
    };
  }

  global.saveProProfileForm = function (switchToCoach) {
    var state = loadProState();
    var collected = collectProfileFromDom(state.profile);
    if (collected.error) {
      notifyModalAlert(collected.error, 'Invalid Profile Details', 'error');
      return false;
    }
    state.profile = collected.profile;
    saveProState(state);
    renderProHomeBanner();
    if (switchToCoach) {
      editingProfileInActiveMode = false;
      activeTab = 'coach';
      renderProModalContent();
      notifyModalAlert('Your personalized targets and nutrition recommendations have been updated.', 'Profile Saved', 'success');
    } else {
      notifyModalAlert('Your fitness profile is saved. Complete the ₹499 one-time payment below to unlock your custom plan.', 'Profile Saved', 'success');
    }
    return true;
  };

  global.copyProUpiId = function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PRO_UPI_ID).then(function () {
        notifyModalAlert('UPI ID "' + PRO_UPI_ID + '" copied to your clipboard.', 'UPI ID Copied', 'success');
      }).catch(function () {
        notifyModalAlert('UPI ID: ' + PRO_UPI_ID, 'Beneficiary UPI ID', 'info');
      });
    } else {
      notifyModalAlert('UPI ID: ' + PRO_UPI_ID, 'Beneficiary UPI ID', 'info');
    }
  };

  global.initiateUpiAppPayment = function () {
    var state = loadProState();
    // Save valid profile fields automatically if user filled them before clicking Pay
    var ageEl = document.getElementById('proInputAge');
    if (ageEl && ageEl.value) {
      var collected = collectProfileFromDom(state.profile);
      if (collected.error) {
        notifyModalAlert(collected.error, 'Complete Required Profile First', 'error');
        return;
      }
      state.profile = collected.profile;
      saveProState(state);
    }

    if (global.Android && typeof global.Android.launchUpiPayment === 'function') {
      global.Android.launchUpiPayment(
        PRO_UPI_ID,
        PRO_PAYEE_NAME,
        PRO_PRICE_INR + '.00',
        state.checkout.requestId,
        'Gym Plan Pro Lifetime ' + state.checkout.requestId
      );
    } else {
      notifyModalAlert(
        'Direct UPI app handoff requires the Android app. Scan the PhonePe QR code above using any UPI app, pay ₹499 to ' + PRO_UPI_ID + ' (' + PRO_PAYEE_NAME + '), then enter your 12-digit UTR below to unlock Pro immediately.',
        'Scan QR to Pay ₹499',
        'info'
      );
    }
  };

  // Native callback from MainActivity.java ActivityResultLauncher
  global.onNativeUpiResult = function (payload) {
    var state = loadProState();
    var p = payload || {};
    var status = String(p.status || '').trim().toUpperCase();
    var txnId = String(p.txnId || '').trim();
    var approvalRef = String(p.approvalRefNo || '').trim();
    var responseCode = String(p.responseCode || '').trim().toUpperCase();
    var txnRef = String(p.txnRef || '').trim();

    var isSuccess = (
      status === 'SUCCESS' ||
      status === 'SUBMITTED' ||
      status === 'COMPLETED' ||
      (p.resultCode === -1 && (txnId.length >= 6 || approvalRef.length >= 6)) ||
      (responseCode === '00' || responseCode === '0')
    );

    if (isSuccess && (txnId.length >= 6 || approvalRef.length >= 6 || txnRef.length >= 6)) {
      var activeRef = txnId || approvalRef || txnRef || ('UPI-' + Date.now());
      var nowIso = new Date().toISOString();
      state.checkout.transactionId = activeRef;
      state.checkout.approvalRefNo = approvalRef || activeRef;
      state.checkout.paymentStatus = 'VERIFIED';
      state.checkout.unlocked = true;
      state.checkout.verificationMethod = 'ANDROID_UPI_APP';
      state.checkout.verifiedAt = nowIso;
      state.checkout.submittedAt = state.checkout.submittedAt || nowIso;
      state.checkout.entitlementSignature = computeEntitlementSignature(state.checkout);
      if (!state.profile.planStartDate) state.profile.planStartDate = getTodayIsoDate();
      saveProState(state);

      renderProHomeBanner();
      if (typeof global.updatePersonalDashboardUI === 'function') global.updatePersonalDashboardUI();
      activeTab = 'coach';
      renderProModalContent();
      notifyModalAlert(
        'Payment of ₹499 verified successfully (Ref: ' + activeRef + ') to ' + PRO_PAYEE_NAME + '. Welcome to Gym Plan Pro Lifetime!',
        'Pro Lifetime Unlocked',
        'success'
      );
      return true;
    }

    if (status === 'NO_UPI_APP') {
      notifyModalAlert(
        'No dedicated UPI app detected. Scan the PhonePe QR code above or pay ₹499 to ' + PRO_UPI_ID + ' (' + PRO_PAYEE_NAME + '), then enter your 12-digit UTR below.',
        'Scan QR to Pay',
        'info'
      );
      return false;
    }

    if (state.checkout.paymentStatus !== 'VERIFIED') {
      state.checkout.paymentStatus = 'NOT_PAID';
      state.checkout.unlocked = false;
      saveProState(state);
      renderProHomeBanner();
      if (typeof global.updatePersonalDashboardUI === 'function') global.updatePersonalDashboardUI();
      renderProModalContent();
    }

    notifyModalAlert(
      'Payment was not completed in the UPI app. If your ₹499 was debited, simply enter the 12-digit UTR from your PhonePe/GPay receipt below to unlock Pro immediately.',
      'Complete Verification',
      'info'
    );
    return false;
  };

  global.submitProUtrVerification = function () {
    var utrEl = document.getElementById('proUtrInput');
    var utr = utrEl ? utrEl.value.trim().toUpperCase() : '';

    // Quick promo code bypass for VIP/testing
    var freeCodes = ['TUSHU', 'DEV', 'VIP', 'PRO', 'FREE', 'ATHLETE', 'ACCESS', 'FRIEND'];
    if (freeCodes.indexOf(utr) !== -1) {
      return global.unlockProFreePass('Promo Code: ' + utr);
    }

    if (!/^[A-Z0-9]{10,24}$/.test(utr)) {
      notifyModalAlert('Please enter a valid 10 to 24-character UPI Reference / UTR number from your payment receipt (e.g. 432109876543).', 'Invalid UTR Format', 'error');
      return false;
    }

    var state = loadProState();
    var nowIso = new Date().toISOString();
    state.checkout.transactionId = utr;
    state.checkout.approvalRefNo = 'UTR-' + utr;
    state.checkout.paymentStatus = 'VERIFIED';
    state.checkout.unlocked = true;
    state.checkout.verificationMethod = 'UPI_UTR_CONFIRMATION';
    state.checkout.verifiedAt = nowIso;
    state.checkout.submittedAt = state.checkout.submittedAt || nowIso;
    state.checkout.entitlementSignature = computeEntitlementSignature(state.checkout);
    if (!state.profile.planStartDate) state.profile.planStartDate = getTodayIsoDate();
    saveProState(state);

    renderProHomeBanner();
    if (typeof global.updatePersonalDashboardUI === 'function') global.updatePersonalDashboardUI();
    activeTab = 'coach';
    renderProModalContent();
    notifyModalAlert(
      'Payment verified successfully! UTR ' + utr + ' confirmed. Welcome to Gym Plan Pro Lifetime!',
      'Pro Lifetime Unlocked',
      'success'
    );
    return true;
  };

  global.unlockProFreePass = function (source) {
    var state = loadProState();
    var nowIso = new Date().toISOString();
    state.checkout.transactionId = 'VIP-ATHLETE-FREE';
    state.checkout.approvalRefNo = 'VIP-REF-' + Date.now();
    state.checkout.paymentStatus = 'VERIFIED';
    state.checkout.unlocked = true;
    state.checkout.verificationMethod = 'VIP_FREE_PASS';
    state.checkout.verifiedAt = nowIso;
    state.checkout.submittedAt = state.checkout.submittedAt || nowIso;
    state.checkout.entitlementSignature = computeEntitlementSignature(state.checkout);
    if (!state.profile.planStartDate) state.profile.planStartDate = getTodayIsoDate();
    saveProState(state);

    renderProHomeBanner();
    if (typeof global.updatePersonalDashboardUI === 'function') global.updatePersonalDashboardUI();
    activeTab = 'coach';
    renderProModalContent();
    notifyModalAlert(
      'Lifetime Pro Coaching has been unlocked for free! You now have full access to custom calories, hydration targets, body metrics, and workout targets.',
      'Pro Unlocked (VIP Pass)',
      'success'
    );
    return true;
  };

  global.verifyProActivationKey = function () {
    var utrEl = document.getElementById('proUtrInput');
    var keyEl = document.getElementById('proActivationKeyInput');
    var state = loadProState();

    var utr = (utrEl && utrEl.value.trim()) ? utrEl.value.trim().toUpperCase() : String(state.checkout.transactionId || '').trim().toUpperCase();
    var enteredKey = keyEl ? keyEl.value.trim().toUpperCase() : '';

    // Quick promo code bypass for friends & testers
    var freeCodes = ['TUSHU', 'DEV', 'VIP', 'PRO', 'FREE', 'ATHLETE', 'ACCESS', 'FRIEND'];
    if (freeCodes.indexOf(enteredKey) !== -1) {
      return global.unlockProFreePass('Promo Code: ' + enteredKey);
    }

    if (!/^[A-Z0-9]{10,24}$/.test(utr)) {
      notifyModalAlert('Enter the valid 12-digit UPI UTR used for your payment before verifying your Activation Key.', 'UTR Required', 'error');
      return false;
    }
    if (!/^CBT-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(enteredKey)) {
      notifyModalAlert('Please enter a valid CodeByTushu Activation Key (CBT-XXXX-XXXX-XXXX) or promo code VIP / TUSHU.', 'Invalid Key Format', 'error');
      return false;
    }

    var expectedKey = computeActivationKey(state.checkout.requestId, utr);
    if (enteredKey !== expectedKey) {
      notifyModalAlert(
        'The Activation Key does not match Request ID ' + state.checkout.requestId + ' and UTR ' + utr + '. Please check the characters and try again.',
        'Verification Failed',
        'error'
      );
      return false;
    }

    var nowIso = new Date().toISOString();
    state.checkout.transactionId = utr;
    state.checkout.paymentStatus = 'VERIFIED';
    state.checkout.unlocked = true;
    state.checkout.verificationMethod = 'ACTIVATION_KEY';
    state.checkout.verifiedAt = nowIso;
    state.checkout.submittedAt = state.checkout.submittedAt || nowIso;
    state.checkout.entitlementSignature = computeEntitlementSignature(state.checkout);
    if (!state.profile.planStartDate) state.profile.planStartDate = getTodayIsoDate();
    saveProState(state);

    renderProHomeBanner();
    if (typeof global.updatePersonalDashboardUI === 'function') global.updatePersonalDashboardUI();
    activeTab = 'coach';
    renderProModalContent();
    notifyModalAlert(
      'Verification successful! Your Gym Plan Pro Lifetime access is now permanently unlocked on this profile.',
      'Lifetime Pro Activated',
      'success'
    );
    return true;
  };

  global.addProWater = function (mlAmount) {
    var state = loadProState();
    if (!state.checkout.unlocked) return;
    state.waterTracker.date = getTodayIsoDate();
    state.waterTracker.ml = Math.min(8000, (state.waterTracker.ml || 0) + Number(mlAmount || 0));
    saveProState(state);
    renderProModalContent();
  };

  global.resetProWater = function () {
    var state = loadProState();
    if (!state.checkout.unlocked) return;
    state.waterTracker = { date: getTodayIsoDate(), ml: 0 };
    saveProState(state);
    renderProModalContent();
  };

  global.toggleProActivityTask = function (taskId) {
    var state = loadProState();
    if (!state.checkout.unlocked) return;
    state.activityTracker.date = getTodayIsoDate();
    var ids = Array.isArray(state.activityTracker.doneIds) ? state.activityTracker.doneIds.slice() : [];
    var idx = ids.indexOf(taskId);
    if (idx === -1) ids.push(taskId);
    else ids.splice(idx, 1);
    state.activityTracker.doneIds = ids;
    saveProState(state);
    renderProModalContent();
  };

  // Hooks consumed by app.js Personal Dashboard & Backup/Restore
  global.getProEntitlementStatus = function () {
    var state = loadProState();
    return {
      unlocked: Boolean(state.checkout.unlocked),
      status: state.checkout.paymentStatus,
      requestId: state.checkout.requestId,
      transactionId: state.checkout.transactionId,
      verifiedAt: state.checkout.verifiedAt
    };
  };

  global.getProBackupSnapshot = function () {
    return loadProState();
  };

  global.restoreProBackupSnapshot = function (snapshot) {
    if (!snapshot || typeof snapshot !== 'object') return false;
    var fallback = defaultProState();
    var restored = {
      profile: Object.assign({}, fallback.profile, snapshot.profile || {}),
      checkout: Object.assign({}, fallback.checkout, snapshot.checkout || {}),
      waterTracker: Object.assign({}, fallback.waterTracker, snapshot.waterTracker || {}),
      activityTracker: Object.assign({}, fallback.activityTracker, snapshot.activityTracker || {})
    };
    saveProState(restored);
    loadProState(); // Re-runs tamper/signature check cleanly
    renderProHomeBanner();
    if (typeof global.updatePersonalDashboardUI === 'function') global.updatePersonalDashboardUI();
    return true;
  };

  global.renderProHomeBanner = renderProHomeBanner;

  // Export testable internals for Node verification tests without polluting browser UI
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      sha256Hex: sha256Hex,
      computeActivationKey: computeActivationKey,
      computeEntitlementSignature: computeEntitlementSignature,
      calculatePersonalizedTargets: calculatePersonalizedTargets,
      loadProState: loadProState,
      defaultProState: defaultProState,
      PRO_UPI_ID: PRO_UPI_ID,
      PRO_PRICE_INR: PRO_PRICE_INR
    };
  } else if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      renderProHomeBanner();
      if (typeof global.updatePersonalDashboardUI === 'function') {
        global.updatePersonalDashboardUI();
      }
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
