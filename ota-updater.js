// ============================================================
// GYM PLAN — LIVE OTA & GITHUB RELEASES AUTO-UPDATER
// Repo: https://github.com/Tushpendra-Kumar/my-gym-plan
// Supports: 1-Click Instant Live Web OTA + GitHub APK Releases
// Preserves 100% Offline Mode & All Local Workout/Habit Data
// ============================================================

(function (global) {
  'use strict';

  var OTA_CONFIG = {
    repo: 'Tushpendra-Kumar/my-gym-plan',
    branch: 'main',
    bundledVersion: '0.05.1',
    bundledBuildNumber: 8,
    bundledNativeCode: 7,
    manifestUrl: 'https://raw.githubusercontent.com/Tushpendra-Kumar/my-gym-plan/main/ota-manifest.json',
    releasesUrl: 'https://github.com/Tushpendra-Kumar/my-gym-plan/releases/latest'
  };

  var otaUiState = {
    status: 'idle', // idle | checking | up_to_date | ota_available | apk_required | downloading | applied | offline | error
    currentVersion: OTA_CONFIG.bundledVersion,
    currentBuildNumber: OTA_CONFIG.bundledBuildNumber,
    currentNativeCode: OTA_CONFIG.bundledNativeCode,
    hasOtaActive: false,
    remoteVersion: '',
    remoteBuildNumber: 0,
    releasedAt: '',
    notes: '',
    releaseUrl: OTA_CONFIG.releasesUrl,
    progressCurrent: 0,
    progressTotal: 0,
    progressFile: '',
    message: ''
  };

  function safeEsc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isNativeAndroidOta() {
    return typeof global.Android !== 'undefined' &&
      global.Android !== null &&
      typeof global.Android.checkForOtaUpdate === 'function';
  }

  function refreshLocalBuildInfo() {
    if (isNativeAndroidOta() && typeof global.Android.getAppBuildInfo === 'function') {
      try {
        var info = JSON.parse(global.Android.getAppBuildInfo());
        if (info) {
          otaUiState.currentVersion = info.otaVersion || info.versionName || OTA_CONFIG.bundledVersion;
          otaUiState.currentBuildNumber = Number(info.otaBuildNumber || OTA_CONFIG.bundledBuildNumber);
          otaUiState.currentNativeCode = Number(info.versionCode || OTA_CONFIG.bundledNativeCode);
          otaUiState.hasOtaActive = Boolean(info.hasOtaActive);
        }
      } catch (e) {}
    }
    // Update all version badge elements across the DOM
    if (typeof document !== 'undefined') {
      var badges = document.querySelectorAll('.app-version-badge');
      for (var b = 0; b < badges.length; b++) {
        badges[b].textContent = 'v' + otaUiState.currentVersion;
      }
    }
  }

  function renderOtaUpdateCard() {
    refreshLocalBuildInfo();

    if (typeof document === 'undefined') return;

    // Render Home screen top announcement banner if an update is waiting
    var homeSlot = document.getElementById('homeOtaBannerSlot');
    if (homeSlot) {
      if (otaUiState.status === 'ota_available') {
        homeSlot.innerHTML = '' +
          '<div class="home-ota-notice-banner" style="background:#000000; color:#ffffff; padding:12px 16px; border-radius:14px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:10px; box-shadow:0 4px 14px rgba(0,0,0,0.12);">' +
            '<div>' +
              '<div style="font-size:0.84rem; font-weight:700;">✨ New Update (v' + safeEsc(otaUiState.remoteVersion) + ') Available!</div>' +
              '<div style="font-size:0.72rem; opacity:0.8;">PhonePe Merchant UPI & instant payment unlock.</div>' +
            '</div>' +
            '<button type="button" class="btn btn-primary" style="background:#ffffff; color:#000000; font-size:0.75rem; font-weight:700; padding:7px 12px; border-radius:8px; flex-shrink:0;" onclick="installLiveOtaUpdate()">Install (2s)</button>' +
          '</div>';
      } else {
        homeSlot.innerHTML = '';
      }
    }

    var container = document.getElementById('otaUpdatesCardContainer');
    if (!container) return;

    var isBusy = (otaUiState.status === 'checking' || otaUiState.status === 'downloading');
    var statusBlockHtml = '';

    if (otaUiState.status === 'checking') {
      statusBlockHtml = '' +
        '<div class="ota-status-pill ota-status-info">' +
          '<span class="ota-spinner"></span>' +
          '<span>Checking GitHub for latest updates...</span>' +
        '</div>';
    } else if (otaUiState.status === 'offline') {
      statusBlockHtml = '' +
        '<div class="ota-status-pill ota-status-warn">' +
          '<span>📡</span>' +
          '<span>' + safeEsc(otaUiState.message || 'Internet is OFF. Turn on Wi-Fi or mobile data to check for updates.') + '</span>' +
        '</div>';
    } else if (otaUiState.status === 'error') {
      statusBlockHtml = '' +
        '<div class="ota-status-pill ota-status-error">' +
          '<span>⚠️</span>' +
          '<span>' + safeEsc(otaUiState.message || 'Could not reach GitHub update server. Please try again.') + '</span>' +
        '</div>';
    } else if (otaUiState.status === 'downloading') {
      var pct = otaUiState.progressTotal > 0
        ? Math.min(100, Math.round((otaUiState.progressCurrent / otaUiState.progressTotal) * 100))
        : 15;
      statusBlockHtml = '' +
        '<div class="ota-update-box">' +
          '<div class="ota-update-box-top">' +
            '<span class="ota-new-tag">⬇ Installing Live Update v' + safeEsc(otaUiState.remoteVersion) + '</span>' +
            '<span class="ota-date-tag">' + pct + '%</span>' +
          '</div>' +
          '<div class="ota-progress-track"><div class="ota-progress-fill" style="width: ' + pct + '%;"></div></div>' +
          '<div class="ota-progress-caption">Syncing ' + safeEsc(otaUiState.progressFile || 'app bundle') + ' (' + otaUiState.progressCurrent + '/' + (otaUiState.progressTotal || '?') + ')...</div>' +
        '</div>';
    } else if (otaUiState.status === 'applied') {
      statusBlockHtml = '' +
        '<div class="ota-status-pill ota-status-ok">' +
          '<span>✅</span>' +
          '<span>Updated to v' + safeEsc(otaUiState.remoteVersion || otaUiState.currentVersion) + '! Restarting interface...</span>' +
        '</div>';
    } else if (otaUiState.status === 'ota_available') {
      statusBlockHtml = '' +
        '<div class="ota-update-box">' +
          '<div class="ota-update-box-top">' +
            '<span class="ota-new-tag">✨ New Version: v' + safeEsc(otaUiState.remoteVersion) + '</span>' +
            '<span class="ota-date-tag">' + safeEsc(otaUiState.releasedAt) + '</span>' +
          '</div>' +
          '<div class="ota-notes-card">' +
            '<strong>What\'s New (Live OTA Bundle):</strong>' +
            '<p>' + safeEsc(otaUiState.notes || 'Performance improvements, new features & bug fixes.') + '</p>' +
          '</div>' +
          '<button type="button" class="ota-install-btn" onclick="installLiveOtaUpdate()">' +
            '⬇ Install Live Update Now (No APK Needed)' +
          '</button>' +
          '<button type="button" class="ota-apk-link-btn" onclick="openOtaReleasePage()">' +
            'Or Download Full APK from GitHub Releases ↗' +
          '</button>' +
        '</div>';
    } else if (otaUiState.status === 'apk_required') {
      statusBlockHtml = '' +
        '<div class="ota-update-box">' +
          '<div class="ota-update-box-top">' +
            '<span class="ota-new-tag">🚀 Major Build: v' + safeEsc(otaUiState.remoteVersion) + '</span>' +
            '<span class="ota-date-tag">' + safeEsc(otaUiState.releasedAt) + '</span>' +
          '</div>' +
          '<div class="ota-notes-card">' +
            '<strong>Native Android Update Required:</strong>' +
            '<p>' + safeEsc(otaUiState.notes || 'Includes updated Android native components and icons.') + '</p>' +
          '</div>' +
          '<button type="button" class="ota-install-btn" onclick="openOtaReleasePage()">' +
            '⬇ Download APK from GitHub Releases' +
          '</button>' +
        '</div>';
    } else {
      var upToDateText = otaUiState.status === 'up_to_date'
        ? "You're on the latest build (v" + otaUiState.currentVersion + ")! All up to date."
        : "Current build: v" + otaUiState.currentVersion + (otaUiState.hasOtaActive ? " (Live OTA Active)" : " (Offline Ready)") + ". Tap above with internet ON to check.";
      statusBlockHtml = '' +
        '<div class="ota-status-pill ' + (otaUiState.status === 'up_to_date' ? 'ota-status-ok' : 'ota-status-neutral') + '">' +
          '<span>' + (otaUiState.status === 'up_to_date' ? '✅' : 'ℹ️') + '</span>' +
          '<span>' + safeEsc(upToDateText) + '</span>' +
        '</div>';
    }

    container.innerHTML = '' +
      '<div class="ota-card">' +
        '<div class="ota-card-header">' +
          '<div class="ota-card-title-wrap">' +
            '<div class="ota-icon-circle">' +
              '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
                '<circle cx="12" cy="12" r="10"/>' +
                '<polyline points="16 12 12 8 8 12"/>' +
                '<line x1="12" y1="16" x2="12" y2="8"/>' +
              '</svg>' +
            '</div>' +
            '<div>' +
              '<div class="ota-title">App Updates</div>' +
              '<div class="ota-subtitle">Live OTA &amp; GitHub Releases</div>' +
            '</div>' +
          '</div>' +
          '<span class="ota-version-pill">v' + safeEsc(otaUiState.currentVersion) + '</span>' +
        '</div>' +

        '<button type="button" class="ota-check-btn" onclick="triggerOtaUpdateCheck()" ' + (isBusy ? 'disabled' : '') + '>' +
          '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="23 4 23 10 17 10"/>' +
            '<polyline points="1 20 1 14 7 14"/>' +
            '<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>' +
          '</svg>' +
          '<span>' + (otaUiState.status === 'checking' ? 'Checking...' : 'Check for Updates') + '</span>' +
        '</button>' +

        statusBlockHtml +
      '</div>';
  }

  // Trigger OTA Check (Native Android or Browser Fallback)
  global.triggerOtaUpdateCheck = function () {
    refreshLocalBuildInfo();
    otaUiState.status = 'checking';
    otaUiState.message = '';
    renderOtaUpdateCard();

    if (isNativeAndroidOta()) {
      try {
        global.Android.checkForOtaUpdate();
      } catch (e) {
        otaUiState.status = 'error';
        otaUiState.message = 'Unable to start native update check.';
        renderOtaUpdateCard();
      }
      return;
    }

    // Browser / PWA fallback check
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      otaUiState.status = 'offline';
      otaUiState.message = 'Internet is OFF. Turn on internet to check for updates.';
      renderOtaUpdateCard();
      return;
    }

    fetch(OTA_CONFIG.manifestUrl + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function (remote) {
        handleRemoteManifestComparison(remote);
      })
      .catch(function () {
        otaUiState.status = 'error';
        otaUiState.message = 'Could not reach GitHub repo yet. Make sure Tushpendra-Kumar/my-gym-plan is public and pushed.';
        renderOtaUpdateCard();
      });
  };

  function handleRemoteManifestComparison(remote) {
    if (!remote) return;
    var remoteBuild = Number(remote.buildNumber || 0);
    var remoteNative = Number(remote.nativeVersionCode || 0);

    otaUiState.remoteVersion = remote.version || otaUiState.currentVersion;
    otaUiState.remoteBuildNumber = remoteBuild;
    otaUiState.releasedAt = remote.releasedAt || '';
    otaUiState.notes = remote.notes || '';
    otaUiState.releaseUrl = remote.releaseUrl || OTA_CONFIG.releasesUrl;

    if (remoteNative > otaUiState.currentNativeCode) {
      otaUiState.status = 'apk_required';
    } else if (remoteBuild > otaUiState.currentBuildNumber) {
      otaUiState.status = 'ota_available';
    } else {
      otaUiState.status = 'up_to_date';
    }
    renderOtaUpdateCard();
  }

  // Trigger Live OTA Download & Atomic Apply
  global.installLiveOtaUpdate = function () {
    if (isNativeAndroidOta() && typeof global.Android.downloadAndApplyOtaUpdate === 'function') {
      otaUiState.status = 'downloading';
      otaUiState.progressCurrent = 0;
      otaUiState.progressTotal = 12;
      otaUiState.progressFile = 'manifest';
      renderOtaUpdateCard();
      try {
        global.Android.downloadAndApplyOtaUpdate();
      } catch (e) {
        otaUiState.status = 'error';
        otaUiState.message = 'Unable to start live update download.';
        renderOtaUpdateCard();
      }
    } else {
      // Browser reload fallback
      if (typeof global.location !== 'undefined' && global.location.reload) {
        global.location.reload(true);
      }
    }
  };

  global.openOtaReleasePage = function () {
    var url = otaUiState.releaseUrl || OTA_CONFIG.releasesUrl;
    if (isNativeAndroidOta() && typeof global.Android.openExternalUrl === 'function') {
      global.Android.openExternalUrl(url);
    } else if (typeof global.open === 'function') {
      global.open(url, '_blank');
    }
  };

  // Native Android Callback Hooks
  global.onOtaCheckResult = function (rawJson) {
    try {
      var res = (typeof rawJson === 'string') ? JSON.parse(rawJson) : rawJson;
      if (!res) return;
      otaUiState.status = res.status || 'error';
      otaUiState.remoteVersion = res.remoteVersion || otaUiState.currentVersion;
      otaUiState.remoteBuildNumber = Number(res.remoteBuildNumber || 0);
      otaUiState.releasedAt = res.releasedAt || '';
      otaUiState.notes = res.notes || '';
      otaUiState.releaseUrl = res.releaseUrl || OTA_CONFIG.releasesUrl;
      otaUiState.message = res.message || '';
      renderOtaUpdateCard();
    } catch (e) {
      otaUiState.status = 'error';
      otaUiState.message = 'Invalid update response received.';
      renderOtaUpdateCard();
    }
  };

  global.onOtaProgress = function (current, total, fileName) {
    otaUiState.status = 'downloading';
    otaUiState.progressCurrent = Number(current || 0);
    otaUiState.progressTotal = Number(total || 1);
    otaUiState.progressFile = String(fileName || '');
    renderOtaUpdateCard();
  };

  global.onOtaApplied = function (newVersion) {
    otaUiState.status = 'applied';
    otaUiState.remoteVersion = String(newVersion || otaUiState.remoteVersion);
    otaUiState.currentVersion = otaUiState.remoteVersion;
    renderOtaUpdateCard();
  };

  global.onOtaError = function (msg) {
    otaUiState.status = 'error';
    otaUiState.message = String(msg || 'Update failed. Your existing app data is completely safe.');
    renderOtaUpdateCard();
  };

  global.renderOtaUpdateCard = renderOtaUpdateCard;

  function checkOtaSilentlyOnStartup() {
    renderOtaUpdateCard();
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
    setTimeout(function () {
      triggerOtaUpdateCheck();
    }, 1200);
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkOtaSilentlyOnStartup);
    } else {
      checkOtaSilentlyOnStartup();
    }
  }
})(typeof window !== 'undefined' ? window : this);
