// ============================================================
// MY GYM PLAN — GOOGLE FIREBASE CLOUD SYNC & ATHLETE AUTH
// Automatic Cross-Device Backup, Multi-Phone Sync & Athlete ID
// 100% Offline-First (Local changes cached & synced when online)
// ============================================================

(function (global) {
  'use strict';

  var FIREBASE_CONFIG = {
    apiKey: 'AIzaSyCFcS72VEpqeH6rEkaKTLPLy15wXNTPukU',
    authDomain: 'codebytushu-gym.firebaseapp.com',
    projectId: 'codebytushu-gym',
    storageBucket: 'codebytushu-gym.firebasestorage.app',
    messagingSenderId: '102145180610',
    appId: '1:102145180610:web:a8776dd00e895fd3e48c5b',
    measurementId: 'G-YBYL59NHHG'
  };

  var STORAGE_USER_KEY = 'tushu_cloud_user_v1';
  var STORAGE_LAST_SYNC_KEY = 'tushu_cloud_last_synced_v1';

  var syncState = {
    isSyncing: false,
    lastSyncTime: null,
    syncStatus: 'idle', // idle | syncing | success | error | offline
    lastError: ''
  };

  function safeEscape(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Session Management
  function getStoredUser() {
    try {
      if (typeof localStorage === 'undefined') return null;
      var raw = localStorage.getItem(STORAGE_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveStoredUser(user) {
    try {
      if (typeof localStorage === 'undefined') return;
      if (!user) {
        localStorage.removeItem(STORAGE_USER_KEY);
      } else {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      }
      updateAuthUIState();
    } catch (e) {}
  }

  function getValidIdToken() {
    var user = getStoredUser();
    if (!user || !user.idToken) return Promise.resolve(null);

    // Refresh if expiring within 5 minutes
    var nowSec = Math.floor(Date.now() / 1000);
    if (user.expiresAt && user.expiresAt - nowSec > 300) {
      return Promise.resolve(user.idToken);
    }

    if (!user.refreshToken) return Promise.resolve(user.idToken);

    // Refresh via Google Secure Token API
    var url = 'https://securetoken.googleapis.com/v1/token?key=' + encodeURIComponent(FIREBASE_CONFIG.apiKey);
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(user.refreshToken)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Token refresh failed');
        return res.json();
      })
      .then(function (data) {
        user.idToken = data.id_token;
        user.refreshToken = data.refresh_token;
        user.expiresAt = Math.floor(Date.now() / 1000) + Number(data.expires_in || 3600);
        saveStoredUser(user);
        return user.idToken;
      })
      .catch(function () {
        return user.idToken; // fallback to existing
      });
  }

  // Firebase Auth Endpoints
  function signInWithEmail(email, password) {
    if (!email || !password) {
      return Promise.reject(new Error('Please enter both email and password.'));
    }
    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + encodeURIComponent(FIREBASE_CONFIG.apiKey);
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
        returnSecureToken: true
      })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) {
            var msg = (data.error && data.error.message) ? data.error.message : 'Login failed';
            if (msg.indexOf('EMAIL_NOT_FOUND') !== -1 || msg.indexOf('INVALID_LOGIN_CREDENTIALS') !== -1 || msg.indexOf('INVALID_PASSWORD') !== -1) {
              msg = 'Invalid email or password. Please verify your credentials.';
            } else if (msg.indexOf('OPERATION_NOT_ALLOWED') !== -1) {
              msg = 'Email login is currently disabled in Firebase Console. Please enable Email/Password provider.';
            }
            throw new Error(msg);
          }
          return data;
        });
      })
      .then(function (data) {
        var user = {
          uid: data.localId,
          email: data.email,
          displayName: data.displayName || data.email.split('@')[0],
          idToken: data.idToken,
          refreshToken: data.refreshToken,
          expiresAt: Math.floor(Date.now() / 1000) + Number(data.expiresIn || 3600)
        };
        saveStoredUser(user);
        // Automatically sync and restore data on login
        syncCloudData(true);
        return user;
      });
  }

  function signUpWithEmail(email, password, displayName) {
    if (!email || !password) {
      return Promise.reject(new Error('Please enter both email and password.'));
    }
    if (password.length < 6) {
      return Promise.reject(new Error('Password must be at least 6 characters.'));
    }
    var name = (displayName && displayName.trim()) ? displayName.trim() : email.split('@')[0];
    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + encodeURIComponent(FIREBASE_CONFIG.apiKey);
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        password: password,
        returnSecureToken: true
      })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok) {
            var msg = (data.error && data.error.message) ? data.error.message : 'Sign up failed';
            if (msg.indexOf('EMAIL_EXISTS') !== -1) {
              msg = 'An account with this email already exists. Please sign in instead.';
            } else if (msg.indexOf('OPERATION_NOT_ALLOWED') !== -1) {
              msg = 'Email registration is currently disabled in Firebase Console. Please enable Email/Password provider.';
            }
            throw new Error(msg);
          }
          return data;
        });
      })
      .then(function (data) {
        var user = {
          uid: data.localId,
          email: data.email,
          displayName: name,
          idToken: data.idToken,
          refreshToken: data.refreshToken,
          expiresAt: Math.floor(Date.now() / 1000) + Number(data.expiresIn || 3600)
        };
        saveStoredUser(user);
        // Immediately backup existing workouts/habits to new cloud account
        syncCloudData(false);
        return user;
      });
  }

  function sendPasswordReset(email) {
    if (!email || !email.trim()) {
      return Promise.reject(new Error('Please enter your account email.'));
    }
    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + encodeURIComponent(FIREBASE_CONFIG.apiKey);
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email: email.trim()
      })
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          throw new Error((data.error && data.error.message) ? data.error.message : 'Unable to send reset email.');
        }
        return true;
      });
    });
  }

  function signOutAthlete() {
    saveStoredUser(null);
    updateAuthUIState();
    if (typeof global.showAppToast === 'function') {
      global.showAppToast('☁️ Signed out of Cloud Sync. Local offline data preserved.');
    }
  }

  // Firestore Data Synchronization
  function getFirestoreDocUrl(uid) {
    return 'https://firestore.googleapis.com/v1/projects/' +
      encodeURIComponent(FIREBASE_CONFIG.projectId) +
      '/databases/(default)/documents/users/' +
      encodeURIComponent(uid) +
      '?key=' + encodeURIComponent(FIREBASE_CONFIG.apiKey);
  }

  function collectLocalDataBundle() {
    function get(k, fallback) {
      try {
        var v = localStorage.getItem(k);
        return v ? JSON.parse(v) : fallback;
      } catch (e) {
        return fallback;
      }
    }

    return {
      history: get('tushu_gym_history_v2', {}),
      habits: get('tushu_gym_habits_v1', {}),
      meals: get('tushu_gym_meals_v1', []),
      roomFitness: get('tushu_room_fitness_v1', {}),
      proState: get('tushu_gym_pro_state_v1', null),
      plan: get('tushu_gym_plan_v2', null),
      roadmap: get('tushu_gym_roadmap_v1', null),
      userName: localStorage.getItem('tushu_gym_user_name_v1') || 'Athlete',
      updatedAt: new Date().toISOString()
    };
  }

  function mergeCloudDataIntoLocal(cloudBundle) {
    if (!cloudBundle || typeof cloudBundle !== 'object') return false;

    var changesMade = false;

    // 1. Merge Workout History (Supports both Dictionary by Date and Array formats)
    if (cloudBundle.history) {
      var localHist = null;
      try {
        var raw = localStorage.getItem('tushu_gym_history_v2');
        if (raw) localHist = JSON.parse(raw);
      } catch (e) {}

      if (Array.isArray(cloudBundle.history)) {
        if (!Array.isArray(localHist)) localHist = [];
        var existingMap = {};
        localHist.forEach(function (h) {
          var key = h.id || (h.date + '_' + (h.exercise || ''));
          existingMap[key] = true;
        });

        cloudBundle.history.forEach(function (ch) {
          var key = ch.id || (ch.date + '_' + (ch.exercise || ''));
          if (!existingMap[key]) {
            localHist.push(ch);
            existingMap[key] = true;
            changesMade = true;
          }
        });
        localStorage.setItem('tushu_gym_history_v2', JSON.stringify(localHist));
      } else if (typeof cloudBundle.history === 'object') {
        if (!localHist || typeof localHist !== 'object' || Array.isArray(localHist)) localHist = {};
        Object.keys(cloudBundle.history).forEach(function (dateKey) {
          if (!localHist[dateKey]) {
            localHist[dateKey] = cloudBundle.history[dateKey];
            changesMade = true;
          } else if (Array.isArray(cloudBundle.history[dateKey]) && Array.isArray(localHist[dateKey])) {
            var localSets = localHist[dateKey];
            var cloudSets = cloudBundle.history[dateKey];
            var existingSetKeys = {};
            localSets.forEach(function (s) {
              var sKey = (s.exercise || '') + '_' + (s.setIndex !== undefined ? s.setIndex : '') + '_' + (s.weight || '');
              existingSetKeys[sKey] = true;
            });
            cloudSets.forEach(function (cs) {
              var csKey = (cs.exercise || '') + '_' + (cs.setIndex !== undefined ? cs.setIndex : '') + '_' + (cs.weight || '');
              if (!existingSetKeys[csKey]) {
                localSets.push(cs);
                changesMade = true;
              }
            });
          }
        });
        localStorage.setItem('tushu_gym_history_v2', JSON.stringify(localHist));
      }
    }

    // 2. Merge Habits Tracker
    if (cloudBundle.habits && typeof cloudBundle.habits === 'object') {
      var localHabits = {};
      try {
        var hRaw = localStorage.getItem('tushu_gym_habits_v1');
        if (hRaw) localHabits = JSON.parse(hRaw);
      } catch (e) {}
      Object.keys(cloudBundle.habits).forEach(function (k) {
        if (!localHabits[k]) {
          localHabits[k] = cloudBundle.habits[k];
          changesMade = true;
        }
      });
      localStorage.setItem('tushu_gym_habits_v1', JSON.stringify(localHabits));
    }

    // 3. Merge Meals
    if (cloudBundle.meals) {
      var localMeals = null;
      try {
        var mRaw = localStorage.getItem('tushu_gym_meals_v1');
        if (mRaw) localMeals = JSON.parse(mRaw);
      } catch (e) {}

      if (Array.isArray(cloudBundle.meals)) {
        if (!localMeals || !Array.isArray(localMeals)) {
          localStorage.setItem('tushu_gym_meals_v1', JSON.stringify(cloudBundle.meals));
          changesMade = true;
        }
      } else if (typeof cloudBundle.meals === 'object') {
        if (!localMeals || typeof localMeals !== 'object') localMeals = {};
        Object.keys(cloudBundle.meals).forEach(function (k) {
          if (!localMeals[k]) {
            localMeals[k] = cloudBundle.meals[k];
            changesMade = true;
          }
        });
        localStorage.setItem('tushu_gym_meals_v1', JSON.stringify(localMeals));
      }
    }

    // 4. Merge Room Fitness
    if (cloudBundle.roomFitness && typeof cloudBundle.roomFitness === 'object') {
      var localRoom = {};
      try {
        var rRaw = localStorage.getItem('tushu_room_fitness_v1');
        if (rRaw) localRoom = JSON.parse(rRaw);
      } catch (e) {}
      Object.keys(cloudBundle.roomFitness).forEach(function (rk) {
        if (!localRoom[rk]) {
          localRoom[rk] = cloudBundle.roomFitness[rk];
          changesMade = true;
        }
      });
      localStorage.setItem('tushu_room_fitness_v1', JSON.stringify(localRoom));
    }

    // 5. Restore Roadmap Profile
    if (cloudBundle.roadmap && typeof cloudBundle.roadmap === 'object') {
      if (!localStorage.getItem('tushu_gym_roadmap_v1')) {
        localStorage.setItem('tushu_gym_roadmap_v1', JSON.stringify(cloudBundle.roadmap));
        changesMade = true;
      }
    }

    // 6. Restore Pro State (If cloud account has Pro unlocked, unlock on this device too!)
    if (cloudBundle.proState && cloudBundle.proState.checkout && cloudBundle.proState.checkout.unlocked) {
      if (typeof global.restoreProBackupSnapshot === 'function') {
        global.restoreProBackupSnapshot(cloudBundle.proState);
        changesMade = true;
      }
    }

    // 7. Restore Plan if empty locally
    if (cloudBundle.plan && (!localStorage.getItem('tushu_gym_plan_v2') || localStorage.getItem('tushu_gym_plan_v2') === '{}')) {
      localStorage.setItem('tushu_gym_plan_v2', JSON.stringify(cloudBundle.plan));
      changesMade = true;
    }

    // 8. Restore User Name if unset locally
    if (cloudBundle.userName && (!localStorage.getItem('tushu_gym_user_name_v1') || localStorage.getItem('tushu_gym_user_name_v1') === 'Athlete')) {
      localStorage.setItem('tushu_gym_user_name_v1', cloudBundle.userName);
      changesMade = true;
    }

    // Trigger complete live app refresh
    if (changesMade) {
      if (typeof global.reloadAppDataFromStorage === 'function') global.reloadAppDataFromStorage();
      if (typeof global.updatePersonalDashboardUI === 'function') global.updatePersonalDashboardUI();
      if (typeof global.renderProHomeBanner === 'function') global.renderProHomeBanner();
      if (typeof global.renderHabitsTracker === 'function') global.renderHabitsTracker();
      if (typeof global.renderRoomFitnessView === 'function') global.renderRoomFitnessView();
      if (typeof global.renderWorkoutView === 'function') global.renderWorkoutView();
      if (typeof global.renderHomeStats === 'function') global.renderHomeStats();
      if (typeof global.renderWeeklyBars === 'function') global.renderWeeklyBars();
      if (typeof global.renderMeals === 'function') global.renderMeals();
    }
    return changesMade;
  }

  function syncCloudData(pullFirst) {
    var user = getStoredUser();
    if (!user || !user.uid) return Promise.resolve(null);

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      syncState.syncStatus = 'offline';
      renderCloudAccountWidget();
      return Promise.resolve(null);
    }

    syncState.isSyncing = true;
    syncState.syncStatus = 'syncing';
    renderCloudAccountWidget();

    return getValidIdToken().then(function (token) {
      if (!token) throw new Error('No valid authentication token');
      var docUrl = getFirestoreDocUrl(user.uid);

      if (pullFirst) {
        // Step A: Fetch existing cloud document
        return fetch(docUrl, {
          headers: { 'Authorization': 'Bearer ' + token }
        })
          .then(function (res) {
            if (res.status === 404) return null; // No cloud doc yet
            if (!res.ok) throw new Error('Cloud fetch error: ' + res.status);
            return res.json();
          })
          .then(function (doc) {
            if (doc && doc.fields && doc.fields.dataBundleJson) {
              try {
                var cloudBundle = JSON.parse(doc.fields.dataBundleJson.stringValue);
                mergeCloudDataIntoLocal(cloudBundle);
              } catch (e) {}
            }
            // Step B: Push combined local state back to cloud
            return pushLocalToFirestore(docUrl, token, user);
          });
      } else {
        return pushLocalToFirestore(docUrl, token, user);
      }
    })
      .then(function () {
        syncState.isSyncing = false;
        syncState.syncStatus = 'success';
        syncState.lastSyncTime = new Date();
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_LAST_SYNC_KEY, syncState.lastSyncTime.toISOString());
        }
        renderCloudAccountWidget();
        return true;
      })
      .catch(function (err) {
        syncState.isSyncing = false;
        syncState.syncStatus = 'error';
        syncState.lastError = err.message || 'Sync failed';
        renderCloudAccountWidget();
        return false;
      });
  }

  function pushLocalToFirestore(docUrl, token, user) {
    var localBundle = collectLocalDataBundle();
    var payload = {
      fields: {
        uid: { stringValue: user.uid },
        email: { stringValue: user.email || '' },
        displayName: { stringValue: user.displayName || '' },
        syncedAt: { stringValue: new Date().toISOString() },
        dataBundleJson: { stringValue: JSON.stringify(localBundle) }
      }
    };

    return fetch(docUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error('Cloud push failed: ' + res.status);
      return res.json();
    });
  }

  // Debounced Auto-Sync Hook (called whenever user logs a workout or habit)
  var autoSyncDebounceTimer = null;
  function triggerAutoSync() {
    var user = getStoredUser();
    if (!user || !user.uid) return;
    if (autoSyncDebounceTimer) clearTimeout(autoSyncDebounceTimer);
    autoSyncDebounceTimer = setTimeout(function () {
      syncCloudData(false);
    }, 2500);
  }

  // UI Components & Modal Rendering
  function updateAuthUIState() {
    renderCloudAccountWidget();
    renderPersonalDashCloudCard();
  }

  function renderCloudAccountWidget() {
    if (typeof document === 'undefined') return;
    var container = document.getElementById('homeCloudSyncSlot');
    if (!container) return;

    var user = getStoredUser();
    if (!user) {
      container.innerHTML = '' +
        '<div class="cloud-promo-card" style="background:#ffffff; border:1px solid rgba(0,0,0,0.08); border-radius:14px; padding:12px 14px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:10px; box-shadow:0 2px 10px rgba(0,0,0,0.03);">' +
          '<div style="display:flex; align-items:center; gap:10px;">' +
            '<div style="width:36px; height:36px; border-radius:10px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; flex-shrink:0;">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<div style="font-size:0.82rem; font-weight:700; color:#0f172a;">Cloud Backup &amp; Sync</div>' +
              '<div style="font-size:0.72rem; color:#64748b;">Save your 10-day history &amp; workouts online</div>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="btn btn-primary" style="font-size:0.75rem; padding:7px 12px; border-radius:8px; font-weight:700; flex-shrink:0; background:#0f172a; color:#ffffff;" onclick="CloudSync.openAuthModal()">Sign In</button>' +
        '</div>';
      return;
    }

    var statusText = 'Synced';
    var statusColor = '#10b981';
    if (syncState.syncStatus === 'syncing') {
      statusText = 'Syncing...';
      statusColor = '#3b82f6';
    } else if (syncState.syncStatus === 'offline') {
      statusText = 'Offline';
      statusColor = '#f59e0b';
    } else if (syncState.syncStatus === 'error') {
      statusText = 'Sync Error';
      statusColor = '#ef4444';
    }

    container.innerHTML = '' +
      '<div class="cloud-status-bar" style="background:#ffffff; border:1px solid rgba(0,0,0,0.08); border-radius:14px; padding:10px 14px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:10px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">' +
        '<div style="display:flex; align-items:center; gap:8px; overflow:hidden;">' +
          '<span style="width:8px; height:8px; border-radius:50%; background:' + statusColor + '; flex-shrink:0;"></span>' +
          '<div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' +
            '<span style="font-size:0.78rem; font-weight:700; color:#0f172a;">' + safeEscape(user.displayName || user.email) + '</span>' +
            '<span style="font-size:0.70rem; color:#64748b; margin-left:6px;">(' + statusText + ')</span>' +
          '</div>' +
        '</div>' +
        '<div style="display:flex; gap:6px; flex-shrink:0;">' +
          '<button type="button" class="btn-chip" style="font-size:0.72rem; padding:5px 9px;" onclick="CloudSync.syncNow(true)" ' + (syncState.isSyncing ? 'disabled' : '') + '>Sync 🔄</button>' +
          '<button type="button" class="btn-chip" style="font-size:0.72rem; padding:5px 9px;" onclick="CloudSync.openAuthModal()">Account</button>' +
        '</div>' +
      '</div>';
  }

  function renderPersonalDashCloudCard() {
    if (typeof document === 'undefined') return;
    var slot = document.getElementById('dashCloudAccountSlot');
    if (!slot) return;

    var user = getStoredUser();
    if (!user) {
      slot.innerHTML = '' +
        '<div class="dash-option-row" onclick="CloudSync.openAuthModal();" style="border-left: 2.5px solid #0f172a; margin-top:8px;">' +
          '<div class="dash-option-icon" style="background: #0f172a; color: #ffffff;">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' +
            '</svg>' +
          '</div>' +
          '<div class="dash-option-content">' +
            '<div class="dash-option-title">Google Cloud Account &amp; Sync</div>' +
            '<div class="dash-option-desc">Sign in with Google or Email to backup your workouts &amp; habits permanently</div>' +
          '</div>' +
          '<span style="font-size:0.70rem; font-weight:700; color:#0f172a; background:#f1f5f9; padding:4px 8px; border-radius:6px;">Connect</span>' +
        '</div>';
    } else {
      slot.innerHTML = '' +
        '<div class="dash-option-row" onclick="CloudSync.openAuthModal();" style="border-left: 2.5px solid #10b981; margin-top:8px;">' +
          '<div class="dash-option-icon" style="background: #10b981; color: #ffffff;">' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
              '<polyline points="20 6 9 17 4 12"/>' +
            '</svg>' +
          '</div>' +
          '<div class="dash-option-content">' +
            '<div class="dash-option-title">Cloud Account Active (' + safeEscape(user.email) + ')</div>' +
            '<div class="dash-option-desc">Continuous automatic cloud backup linked to your athlete account</div>' +
          '</div>' +
          '<span style="font-size:0.70rem; font-weight:700; color:#10b981; background:#ecfdf5; padding:4px 8px; border-radius:6px;">Active</span>' +
        '</div>';
    }
  }

  // Open Modal UI
  function openAuthModal() {
    var modal = document.getElementById('cloudAuthModal');
    if (!modal) return;
    renderAuthModalContent('signin');
    modal.classList.add('open');
    modal.classList.add('active');
  }

  function closeAuthModal() {
    var modal = document.getElementById('cloudAuthModal');
    if (modal) {
      modal.classList.remove('open');
      modal.classList.remove('active');
    }
  }

  function renderAuthModalContent(mode) {
    var body = document.getElementById('cloudAuthModalBody');
    if (!body) return;

    var user = getStoredUser();
    if (user) {
      var lastSyncStr = syncState.lastSyncTime
        ? syncState.lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : (localStorage.getItem(STORAGE_LAST_SYNC_KEY) ? new Date(localStorage.getItem(STORAGE_LAST_SYNC_KEY)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Never');

      body.innerHTML = '' +
        '<div style="text-align:center; padding:10px 0 16px;">' +
          '<div style="width:54px; height:54px; border-radius:50%; background:#0f172a; color:#ffffff; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; font-size:1.3rem; font-weight:800;">' +
            safeEscape((user.displayName || user.email || 'A')[0].toUpperCase()) +
          '</div>' +
          '<h4 style="font-size:1.05rem; font-weight:800; color:#0f172a; margin-bottom:2px;">' + safeEscape(user.displayName || 'Athlete') + '</h4>' +
          '<div style="font-size:0.80rem; color:#64748b;">' + safeEscape(user.email) + '</div>' +
          '<div style="display:inline-flex; align-items:center; gap:6px; background:#ecfdf5; color:#065f46; font-size:0.72rem; font-weight:700; padding:4px 10px; border-radius:20px; margin-top:10px;">' +
            '<span style="width:6px; height:6px; background:#10b981; border-radius:50%;"></span>' +
            'Cloud Backup Active • Last synced: ' + safeEscape(lastSyncStr) +
          '</div>' +
        '</div>' +
        '<div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">' +
          '<button type="button" class="btn-primary-dark" style="width:100%; padding:12px; font-weight:700; border-radius:10px;" onclick="CloudSync.handleManualSync()">' +
            (syncState.isSyncing ? 'Syncing...' : '🔄 Sync &amp; Backup Now') +
          '</button>' +
          '<button type="button" class="btn btn-secondary" style="width:100%; padding:11px; font-weight:600; border-radius:10px; background:#f1f5f9; color:#0f172a;" onclick="CloudSync.signOut()">' +
            'Sign Out of Cloud Account' +
          '</button>' +
        '</div>';
      return;
    }

    var isSignUp = (mode === 'signup');
    var isForgot = (mode === 'forgot');

    if (isForgot) {
      body.innerHTML = '' +
        '<div style="padding:4px 0 12px;">' +
          '<h4 style="font-size:1.05rem; font-weight:800; color:#0f172a; margin-bottom:4px;">Reset Password</h4>' +
          '<p style="font-size:0.78rem; color:#64748b; margin-bottom:14px;">Enter your registered account email and we will send a password reset link.</p>' +
          '<div class="form-group">' +
            '<label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#475569;">Email Address</label>' +
            '<input type="email" id="cloudAuthEmail" placeholder="your@email.com" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:10px; margin-top:4px; font-size:0.9rem;">' +
          '</div>' +
          '<div id="cloudAuthAlert" style="margin-top:10px; font-size:0.78rem;"></div>' +
          '<button type="button" class="btn-primary-dark" style="width:100%; padding:12px; font-weight:700; border-radius:10px; margin-top:14px;" onclick="CloudSync.handleSendReset()">' +
            'Send Reset Email' +
          '</button>' +
          '<div style="text-align:center; margin-top:12px;">' +
            '<a href="javascript:void(0)" onclick="CloudSync.renderAuthModalContent(\'signin\')" style="font-size:0.78rem; color:#0f172a; font-weight:600;">← Back to Sign In</a>' +
          '</div>' +
        '</div>';
      return;
    }

    body.innerHTML = '' +
      '<div style="padding:4px 0 12px;">' +
        '<div style="display:flex; border-bottom:1px solid #e2e8f0; margin-bottom:16px;">' +
          '<button type="button" style="flex:1; padding:10px; font-size:0.85rem; font-weight:700; background:none; border:none; border-bottom:2.5px solid ' + (!isSignUp ? '#0f172a; color:#0f172a;' : 'transparent; color:#64748b;') + ' cursor:pointer;" onclick="CloudSync.renderAuthModalContent(\'signin\')">Sign In</button>' +
          '<button type="button" style="flex:1; padding:10px; font-size:0.85rem; font-weight:700; background:none; border:none; border-bottom:2.5px solid ' + (isSignUp ? '#0f172a; color:#0f172a;' : 'transparent; color:#64748b;') + ' cursor:pointer;" onclick="CloudSync.renderAuthModalContent(\'signup\')">Create Account</button>' +
        '</div>' +

        (isSignUp ? '' +
          '<div class="form-group" style="margin-bottom:12px;">' +
            '<label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#475569;">Your Name</label>' +
            '<input type="text" id="cloudAuthName" placeholder="Athlete Name" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:10px; margin-top:4px; font-size:0.9rem;">' +
          '</div>' : '') +

        '<div class="form-group" style="margin-bottom:12px;">' +
          '<label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#475569;">Email Address</label>' +
          '<input type="email" id="cloudAuthEmail" placeholder="your@email.com" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:10px; margin-top:4px; font-size:0.9rem;">' +
        '</div>' +

        '<div class="form-group" style="margin-bottom:6px;">' +
          '<label style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:#475569;">Password</label>' +
          '<input type="password" id="cloudAuthPass" placeholder="Min. 6 characters" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:10px; margin-top:4px; font-size:0.9rem;">' +
        '</div>' +

        (!isSignUp ? '' +
          '<div style="text-align:right; margin-bottom:12px;">' +
            '<a href="javascript:void(0)" onclick="CloudSync.renderAuthModalContent(\'forgot\')" style="font-size:0.74rem; color:#64748b; text-decoration:none;">Forgot password?</a>' +
          '</div>' : '<div style="margin-bottom:12px;"></div>') +

        '<div id="cloudAuthAlert" style="margin-bottom:10px; font-size:0.78rem;"></div>' +

        '<button type="button" class="btn-primary-dark" style="width:100%; padding:12px; font-weight:700; border-radius:10px;" onclick="' + (isSignUp ? 'CloudSync.handleEmailSignUp()' : 'CloudSync.handleEmailSignIn()') + '">' +
          (isSignUp ? 'Create Cloud Account &amp; Sync' : 'Sign In &amp; Restore Data') +
        '</button>' +

        '<div style="margin:16px 0; display:flex; align-items:center; gap:10px;">' +
          '<div style="flex:1; height:1px; background:#e2e8f0;"></div>' +
          '<span style="font-size:0.72rem; color:#94a3b8; font-weight:600; text-transform:uppercase;">100% Private Cloud Backup</span>' +
          '<div style="flex:1; height:1px; background:#e2e8f0;"></div>' +
        '</div>' +

        '<div style="font-size:0.72rem; color:#64748b; text-align:center; line-height:1.4;">' +
          'Your workouts, habits, food logs, and Pro status stay saved to this email even if you switch phones or delete the app.' +
        '</div>' +
      '</div>';
  }

  // Handlers for Form Submission
  function showModalAlert(msg, isError) {
    var el = document.getElementById('cloudAuthAlert');
    if (!el) return;
    el.innerHTML = '<div style="padding:8px 12px; border-radius:8px; background:' + (isError ? '#fef2f2; color:#b91c1c; border:1px solid #fecaca;' : '#f0fdf4; color:#15803d; border:1px solid #bbf7d0;') + '">' + safeEscape(msg) + '</div>';
  }

  function handleEmailSignIn() {
    var emailEl = document.getElementById('cloudAuthEmail');
    var passEl = document.getElementById('cloudAuthPass');
    var email = emailEl ? emailEl.value.trim() : '';
    var pass = passEl ? passEl.value : '';

    if (!email || !pass) {
      showModalAlert('Please enter your email and password.', true);
      return;
    }

    showModalAlert('Signing in & fetching your workouts...', false);
    signInWithEmail(email, pass)
      .then(function (user) {
        showModalAlert('Welcome back, ' + user.displayName + '! Synced successfully.', false);
        setTimeout(function () {
          closeAuthModal();
          if (typeof global.showAppToast === 'function') {
            global.showAppToast('☁️ Welcome back! Your database has been restored from the cloud.');
          }
        }, 1200);
      })
      .catch(function (err) {
        showModalAlert(err.message, true);
      });
  }

  function handleEmailSignUp() {
    var emailEl = document.getElementById('cloudAuthEmail');
    var passEl = document.getElementById('cloudAuthPass');
    var nameEl = document.getElementById('cloudAuthName');
    var email = emailEl ? emailEl.value.trim() : '';
    var pass = passEl ? passEl.value : '';
    var name = nameEl ? nameEl.value.trim() : '';

    if (!email || !pass) {
      showModalAlert('Please enter an email and password.', true);
      return;
    }
    if (pass.length < 6) {
      showModalAlert('Password must be at least 6 characters long.', true);
      return;
    }

    showModalAlert('Creating your athlete account...', false);
    signUpWithEmail(email, pass, name)
      .then(function (user) {
        showModalAlert('Account created! Backed up your workouts to cloud.', false);
        setTimeout(function () {
          closeAuthModal();
          if (typeof global.showAppToast === 'function') {
            global.showAppToast('☁️ Cloud account created! All your data is safely backed up.');
          }
        }, 1200);
      })
      .catch(function (err) {
        showModalAlert(err.message, true);
      });
  }

  function handleSendReset() {
    var emailEl = document.getElementById('cloudAuthEmail');
    var email = emailEl ? emailEl.value.trim() : '';
    if (!email) {
      showModalAlert('Please enter your registered email.', true);
      return;
    }
    showModalAlert('Sending password reset email...', false);
    sendPasswordReset(email)
      .then(function () {
        showModalAlert('Reset link sent to ' + email + '. Check your inbox.', false);
      })
      .catch(function (err) {
        showModalAlert(err.message, true);
      });
  }

  function handleManualSync() {
    syncState.isSyncing = true;
    renderAuthModalContent('user');
    syncCloudData(true).then(function (ok) {
      renderAuthModalContent('user');
      if (ok && typeof global.showAppToast === 'function') {
        global.showAppToast('☁️ Cloud Sync Complete! All data is up to date.');
      }
    });
  }

  // Initialization
  function initCloudSync() {
    updateAuthUIState();
    // If logged in and online, sync silently on startup
    var user = getStoredUser();
    if (user && typeof navigator !== 'undefined' && navigator.onLine !== false) {
      setTimeout(function () {
        syncCloudData(true);
      }, 3500);
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCloudSync);
    } else {
      initCloudSync();
    }
  }

  // Global Export
  global.CloudSync = {
    config: FIREBASE_CONFIG,
    signInWithEmail: signInWithEmail,
    signUpWithEmail: signUpWithEmail,
    sendPasswordReset: sendPasswordReset,
    signOut: signOutAthlete,
    getStoredUser: getStoredUser,
    syncNow: syncCloudData,
    triggerAutoSync: triggerAutoSync,
    openAuthModal: openAuthModal,
    closeAuthModal: closeAuthModal,
    renderAuthModalContent: renderAuthModalContent,
    handleEmailSignIn: handleEmailSignIn,
    handleEmailSignUp: handleEmailSignUp,
    handleSendReset: handleSendReset,
    handleManualSync: handleManualSync
  };

})(typeof window !== 'undefined' ? window : globalThis);
