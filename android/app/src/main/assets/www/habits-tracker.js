// ============================================================
// HABITS & DISCIPLINE TRACKER (100% OFFLINE & MOBILE-FIRST)
// Inspired by Automated Discipline Sheet & Daily Check-in System
// Powered by CodeByTushu • Version 0.05 • Pure English
// 100% Vertical Scrolling (Zero Left-To-Right Horizontal Scroll)
// ============================================================

(function (global) {
  'use strict';

  var HABITS_STORAGE_KEY = 'tushu_gym_habits_v1';

  var DEFAULT_HABITS = [
    { id: 'h_wake', name: 'Wake up at 05:00', icon: '⏰', category: 'Morning', targetDays: 30 },
    { id: 'h_gym', name: 'Gym / Training', icon: '🏋️', category: 'Fitness', targetDays: 26 },
    { id: 'h_diet', name: 'Clean Athlete Diet', icon: '🥗', category: 'Nutrition', targetDays: 30 },
    { id: 'h_water', name: '3+ Liters Water', icon: '💧', category: 'Health', targetDays: 30 },
    { id: 'h_read', name: 'Reading / Learning', icon: '📖', category: 'Mindset', targetDays: 26 },
    { id: 'h_work', name: 'Deep Work / Study', icon: '💻', category: 'Productivity', targetDays: 26 },
    { id: 'h_detox', name: 'Social Media Detox', icon: '📵', category: 'Discipline', targetDays: 30 },
    { id: 'h_plan', name: 'Day Plan & Budget', icon: '📋', category: 'Finance', targetDays: 30 },
    { id: 'h_cold', name: 'Cold Shower', icon: '🚿', category: 'Discipline', targetDays: 24 },
    { id: 'h_sleep', name: '7.5+ Hours Sleep', icon: '😴', category: 'Recovery', targetDays: 30 }
  ];

  var MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  var DAY_ABBR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Current view state
  var selectedYear = new Date().getFullYear();
  var selectedMonth = new Date().getMonth(); // 0-indexed
  var activeSubTab = 'cards'; // Default to 100% Mobile Vertical Weekly Feed (Zero Horizontal Scroll!)
  var selectedWeekStart = getMondayOfWeek(new Date());
  var manageMode = false;

  function getTodayIsoDate() {
    var d = new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function formatDateKey(year, month, day) {
    var y = String(year);
    var m = String(month + 1).padStart(2, '0');
    var d = String(day).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function getMondayOfWeek(date) {
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var day = d.getDay();
    var diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.getFullYear(), d.getMonth(), diff);
  }

  function defaultState() {
    return {
      habits: DEFAULT_HABITS.slice(),
      logs: {}
    };
  }

  function loadHabitsState() {
    var fallback = defaultState();
    try {
      if (typeof localStorage === 'undefined') return fallback;
      var raw = localStorage.getItem(HABITS_STORAGE_KEY);
      if (!raw) {
        saveHabitsState(fallback);
        return fallback;
      }
      var parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.habits) || parsed.habits.length === 0) {
        parsed.habits = DEFAULT_HABITS.slice();
      }
      if (!parsed.logs || typeof parsed.logs !== 'object') {
        parsed.logs = {};
      }
      return parsed;
    } catch (e) {
      return fallback;
    }
  }

  function saveHabitsState(state) {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(state));
      }
      if (typeof global !== 'undefined' && global.CloudSync && typeof global.CloudSync.triggerAutoSync === 'function') {
        global.CloudSync.triggerAutoSync();
      }
    } catch (e) {
      // Storage unavailable
    }
  }

  function isHabitDone(state, dateKey, habitId) {
    if (!state || !state.logs || !state.logs[dateKey]) return false;
    return Boolean(state.logs[dateKey][habitId]);
  }

  function toggleHabit(dateKey, habitId) {
    var state = loadHabitsState();
    if (!state.logs[dateKey]) {
      state.logs[dateKey] = {};
    }
    var current = Boolean(state.logs[dateKey][habitId]);
    if (current) {
      delete state.logs[dateKey][habitId];
      if (Object.keys(state.logs[dateKey]).length === 0) {
        delete state.logs[dateKey];
      }
    } else {
      state.logs[dateKey][habitId] = true;
    }
    saveHabitsState(state);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(20);
    }

    renderHabitsView();
  }

  function getDailyProgress(state, dateKey) {
    var habits = state.habits || [];
    var total = habits.length;
    if (total === 0) return { done: 0, total: 0, pct: 0 };
    var done = 0;
    for (var i = 0; i < total; i++) {
      if (isHabitDone(state, dateKey, habits[i].id)) {
        done++;
      }
    }
    return {
      done: done,
      total: total,
      pct: Math.round((done / total) * 100)
    };
  }

  function getMonthlyStats(state, year, month) {
    var habits = state.habits || [];
    var daysCount = getDaysInMonth(year, month);
    var totalPossible = habits.length * daysCount;
    var totalDone = 0;

    for (var d = 1; d <= daysCount; d++) {
      var dateKey = formatDateKey(year, month, d);
      for (var h = 0; h < habits.length; h++) {
        if (isHabitDone(state, dateKey, habits[h].id)) {
          totalDone++;
        }
      }
    }

    var overallPct = totalPossible > 0 ? Math.round((totalDone / totalPossible) * 100) : 0;
    var todayKey = getTodayIsoDate();
    var todayProg = getDailyProgress(state, todayKey);

    return {
      overallPct: overallPct,
      totalDone: totalDone,
      totalPossible: totalPossible,
      todayDone: todayProg.done,
      todayTotal: todayProg.total,
      todayPct: todayProg.pct
    };
  }

  function getHabitConsistency(state, habitId, year, month) {
    var daysCount = getDaysInMonth(year, month);
    var completed = 0;
    var streak = 0;
    var maxStreak = 0;

    for (var d = 1; d <= daysCount; d++) {
      var dateKey = formatDateKey(year, month, d);
      if (isHabitDone(state, dateKey, habitId)) {
        completed++;
        streak++;
        if (streak > maxStreak) maxStreak = streak;
      } else {
        streak = 0;
      }
    }

    var rate = daysCount > 0 ? Math.round((completed / daysCount) * 100) : 0;
    return {
      completed: completed,
      daysCount: daysCount,
      rate: rate,
      streak: streak,
      maxStreak: maxStreak
    };
  }

  function safeEscape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ============================================================
  // MASTER VIEW RENDERER (100% MOBILE-FIRST)
  // ============================================================
  function renderHabitsView() {
    if (typeof document === 'undefined') return;
    var container = document.getElementById('viewHabits') || document.getElementById('habitsContainer');
    if (!container) return;

    var state = loadHabitsState();
    var todayKey = getTodayIsoDate();
    var stats = getMonthlyStats(state, selectedYear, selectedMonth);

    var html = '' +
      '<div class="habits-header-row">' +
        '<div>' +
          '<h2 class="view-main-title" style="margin-bottom: 2px;">Habits &amp; Discipline</h2>' +
          '<p class="view-sub-title" style="margin: 0;">Automated daily accountability &amp; performance tracker</p>' +
        '</div>' +
        '<button type="button" class="btn-chip" onclick="openAddHabitModal()">+ Add Habit</button>' +
      '</div>' +

      // Top Monthly Performance Banner
      '<div class="habits-stats-banner">' +
        '<div class="habits-stat-col">' +
          '<span class="habits-stat-label">Monthly Score</span>' +
          '<strong class="habits-stat-value">' + stats.overallPct + '%</strong>' +
        '</div>' +
        '<div class="habits-stat-col">' +
          '<span class="habits-stat-label">Today\'s Check-in</span>' +
          '<strong class="habits-stat-value">' + stats.todayDone + ' / ' + stats.todayTotal + ' (' + stats.todayPct + '%)</strong>' +
        '</div>' +
        '<div class="habits-stat-col">' +
          '<span class="habits-stat-label">Checks Done</span>' +
          '<strong class="habits-stat-value">' + stats.totalDone + '</strong>' +
        '</div>' +
      '</div>' +
      '<div class="habits-overall-track"><div class="habits-overall-fill" style="width:' + stats.overallPct + '%;"></div></div>' +

      // Today's Quick Check-in Card (Review & tick before bed)
      renderTodayEveningCard(state, todayKey) +

      // Mobile Navigation & View Mode Switcher
      '<div class="habits-controls-bar">' +
        '<div class="habits-subtabs-row">' +
          '<button type="button" class="habits-subtab-btn' + (activeSubTab === 'cards' ? ' active' : '') + '" onclick="switchHabitsSubTab(\'cards\')">📅 Weekly Cards</button>' +
          '<button type="button" class="habits-subtab-btn' + (activeSubTab === 'calendar' ? ' active' : '') + '" onclick="switchHabitsSubTab(\'calendar\')">🗓️ Monthly Calendar</button>' +
          '<button type="button" class="habits-subtab-btn' + (activeSubTab === 'analysis' ? ' active' : '') + '" onclick="switchHabitsSubTab(\'analysis\')">📊 Analysis</button>' +
        '</div>' +
      '</div>';

    if (activeSubTab === 'cards') {
      html += renderWeeklyFeedHtml(state, todayKey);
    } else if (activeSubTab === 'calendar') {
      html += renderMobileCalendarHtml(state, selectedYear, selectedMonth, todayKey);
    } else {
      html += renderConsistencyAnalysisHtml(state, selectedYear, selectedMonth);
    }

    container.innerHTML = html;
  }

  function renderTodayEveningCard(state, todayKey) {
    var habits = state.habits || [];
    var prog = getDailyProgress(state, todayKey);
    var d = new Date();
    var dayFormatted = DAY_ABBR[d.getDay()] + ', ' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear();

    var itemsHtml = habits.map(function (h) {
      var done = isHabitDone(state, todayKey, h.id);
      if (manageMode) {
        return '' +
          '<div class="habit-quick-item habit-manage-item">' +
            '<span class="habit-quick-icon">' + safeEscape(h.icon || '✓') + '</span>' +
            '<span class="habit-quick-name">' + safeEscape(h.name) + '</span>' +
            '<div class="habit-manage-actions">' +
              '<button type="button" class="habit-act-btn habit-act-edit" onclick="openEditHabitModal(\'' + h.id + '\')" aria-label="Edit Habit" title="Edit">✎</button>' +
              '<button type="button" class="habit-act-btn habit-act-del" onclick="removeHabitDirect(\'' + h.id + '\')" aria-label="Delete Habit" title="Delete">✕</button>' +
            '</div>' +
          '</div>';
      }
      return '' +
        '<label class="habit-quick-item' + (done ? ' checked' : '') + '">' +
          '<input type="checkbox" ' + (done ? 'checked' : '') + ' onchange="toggleHabit(\'' + todayKey + '\', \'' + h.id + '\')">' +
          '<span class="habit-quick-icon">' + safeEscape(h.icon || '✓') + '</span>' +
          '<span class="habit-quick-name">' + safeEscape(h.name) + '</span>' +
        '</label>';
    }).join('');

    return '' +
      '<div class="habits-today-card">' +
        '<div class="habits-today-header">' +
          '<div>' +
            '<h3 class="habits-today-title">Today\'s Check-in</h3>' +
            '<span class="habits-today-sub">' + (manageMode ? 'Tap ✎ to edit or ✕ to delete any habit' : (safeEscape(dayFormatted) + ' • Review &amp; tick before bed')) + '</span>' +
          '</div>' +
          '<div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">' +
            '<button type="button" class="habits-manage-toggle' + (manageMode ? ' active' : '') + '" onclick="toggleHabitsManageMode()">' +
              (manageMode ? '✓ Done' : '✎ Manage') +
            '</button>' +
            '<div class="habits-today-badge' + (prog.pct === 100 ? ' completed' : '') + '">' +
              prog.done + ' / ' + prog.total + ' (' + prog.pct + '%)' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="habits-quick-grid' + (manageMode ? ' manage-mode' : '') + '">' + itemsHtml + '</div>' +
      '</div>';
  }

  // ============================================================
  // VIEW 1: WEEKLY FEED (100% VERTICAL SCROLL - SCREENSHOT 1)
  // ============================================================
  function renderWeeklyFeedHtml(state, todayKey) {
    var habits = state.habits || [];
    var mon = new Date(selectedWeekStart);
    var sun = new Date(mon);
    sun.setDate(sun.getDate() + 6);

    var weekTitle = mon.getDate() + ' ' + MONTH_NAMES[mon.getMonth()].slice(0, 3) + ' – ' +
                    sun.getDate() + ' ' + MONTH_NAMES[sun.getMonth()].slice(0, 3) + ' ' + sun.getFullYear();

    // 7-Day Quick-Jump Strip (Fits 100% on mobile without scroll)
    var stripHtml = '';
    var cardsHtml = '';

    for (var i = 0; i < 7; i++) {
      var d = new Date(mon);
      d.setDate(d.getDate() + i);
      var dateKey = formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
      var dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
      var dayAbbr = DAY_ABBR[d.getDay()];
      var prog = getDailyProgress(state, dateKey);
      var isToday = (dateKey === todayKey);

      // Mini 7-day strip button
      stripHtml += '' +
        '<button type="button" class="week-strip-day' + (isToday ? ' is-today' : '') + (prog.pct === 100 ? ' is-complete' : '') + '" ' +
          'onclick="scrollToDayCard(\'' + dateKey + '\')">' +
          '<span class="strip-day-name">' + dayAbbr + '</span>' +
          '<span class="strip-day-num">' + d.getDate() + '</span>' +
          '<span class="strip-day-pct">' + (prog.pct > 0 ? prog.pct + '%' : '·') + '</span>' +
        '</button>';

      // Task checklist for that day
      var tasksHtml = habits.map(function (h) {
        var done = isHabitDone(state, dateKey, h.id);
        return '' +
          '<label class="weekly-task-item' + (done ? ' checked' : '') + '">' +
            '<input type="checkbox" ' + (done ? 'checked' : '') + ' onchange="toggleHabit(\'' + dateKey + '\', \'' + h.id + '\')">' +
            '<span class="task-checkbox-custom">' + (done ? '✓' : '') + '</span>' +
            '<span class="task-icon">' + safeEscape(h.icon || '✓') + '</span>' +
            '<span class="task-name">' + safeEscape(h.name) + '</span>' +
          '</label>';
      }).join('');

      // Full-Width Mobile Day Card (Screenshot 1 Style)
      cardsHtml += '' +
        '<div id="day-card-' + dateKey + '" class="weekly-day-card' + (isToday ? ' is-today-card' : '') + '">' +
          '<div class="weekly-day-banner">' +
            '<div class="weekly-day-info">' +
              (isToday ? '<span class="weekly-today-badge">TODAY</span>' : '') +
              '<h3 class="weekly-day-title">' + dayName + '</h3>' +
              '<span class="weekly-day-date">' + d.getDate() + ' ' + MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear() + '</span>' +
            '</div>' +
            '<div class="weekly-ring-container">' +
              renderSvgProgressRing(prog.pct, 52, 4.5) +
              '<div class="weekly-ring-percent">' + prog.pct + '%</div>' +
            '</div>' +
          '</div>' +
          '<div class="weekly-day-meta">' +
            '<div class="weekly-progress-bar-bg">' +
              '<div class="weekly-progress-bar-fill" style="width:' + prog.pct + '%;"></div>' +
            '</div>' +
            '<span class="weekly-status-text">' + prog.done + ' / ' + prog.total + ' Completed</span>' +
          '</div>' +
          '<div class="weekly-tasks-list">' + tasksHtml + '</div>' +
        '</div>';
    }

    return '' +
      '<div class="habits-week-view">' +
        // Week Navigator
        '<div class="habits-week-nav">' +
          '<button type="button" class="btn-month-nav" onclick="changeHabitsWeek(-1)" aria-label="Previous Week">&lsaquo;</button>' +
          '<span class="habits-current-week">' + safeEscape(weekTitle) + '</span>' +
          '<button type="button" class="btn-month-nav" onclick="changeHabitsWeek(1)" aria-label="Next Week">&rsaquo;</button>' +
          '<button type="button" class="btn-month-today" onclick="resetHabitsToCurrentWeek()">This Week</button>' +
        '</div>' +

        // 7-Day Responsive Strip
        '<div class="habits-week-strip">' + stripHtml + '</div>' +

        // Vertical Day-by-Day Cards (Zero Horizontal Scroll!)
        '<div class="habits-weekly-grid">' + cardsHtml + '</div>' +
      '</div>';
  }

  // ============================================================
  // VIEW 2: MONTHLY CALENDAR (7-COLUMNS MOBILE-FIT, ZERO HORIZONTAL SCROLL)
  // ============================================================
  function renderMobileCalendarHtml(state, year, month, todayKey) {
    var habits = state.habits || [];
    var daysCount = getDaysInMonth(year, month);
    var firstDayIdx = new Date(year, month, 1).getDay(); // 0 is Sunday
    var monthTitle = MONTH_NAMES[month] + ' ' + year;

    // Weekday headers
    var headersHtml = DAY_ABBR.map(function (d) {
      return '<div class="mobile-cal-th">' + d + '</div>';
    }).join('');

    // Day cells
    var cellsHtml = '';
    // Leading empty padding days
    for (var p = 0; p < firstDayIdx; p++) {
      cellsHtml += '<div class="mobile-cal-cell is-empty"></div>';
    }

    for (var d = 1; d <= daysCount; d++) {
      var dateKey = formatDateKey(year, month, d);
      var prog = getDailyProgress(state, dateKey);
      var isToday = (dateKey === todayKey);
      var ringColor = prog.pct === 100 ? '#059669' : (prog.pct >= 50 ? '#10b981' : (prog.pct > 0 ? '#f59e0b' : 'rgba(0,0,0,0.08)'));

      cellsHtml += '' +
        '<div class="mobile-cal-cell' + (isToday ? ' is-today' : '') + '" onclick="jumpToDateFromCalendar(\'' + dateKey + '\')">' +
          '<span class="mobile-cal-num">' + d + '</span>' +
          '<div class="mobile-cal-indicator">' +
            renderSvgProgressRing(prog.pct, 26, 3, ringColor) +
            '<span class="mobile-cal-pct">' + (prog.pct > 0 ? prog.pct : '') + '</span>' +
          '</div>' +
        '</div>';
    }

    return '' +
      '<div class="habits-calendar-view">' +
        '<div class="habits-month-nav" style="margin-bottom: 12px;">' +
          '<button type="button" class="btn-month-nav" onclick="changeHabitsMonth(-1)" aria-label="Previous Month">&lsaquo;</button>' +
          '<span class="habits-current-month">' + safeEscape(monthTitle) + '</span>' +
          '<button type="button" class="btn-month-nav" onclick="changeHabitsMonth(1)" aria-label="Next Month">&rsaquo;</button>' +
          '<button type="button" class="btn-month-today" onclick="resetHabitsToCurrentMonth()">Today</button>' +
        '</div>' +
        '<div class="mobile-cal-card">' +
          '<div class="mobile-cal-header">' + headersHtml + '</div>' +
          '<div class="mobile-cal-grid">' + cellsHtml + '</div>' +
        '</div>' +
        '<p style="text-align: center; font-size: 0.72rem; color: var(--text-tertiary); margin-top: 8px;">Tap any date to open its weekly checklist</p>' +
      '</div>';
  }

  function renderSvgProgressRing(percent, size, strokeWidth, customColor) {
    var radius = (size - strokeWidth) / 2;
    var circumference = 2 * Math.PI * radius;
    var strokeDashoffset = circumference - (percent / 100) * circumference;
    var strokeColor = customColor || (percent === 100 ? '#059669' : (percent >= 50 ? '#10b981' : (percent > 0 ? '#f59e0b' : 'rgba(0, 0, 0, 0.1)')));

    return '' +
      '<svg class="progress-ring-svg" width="' + size + '" height="' + size + '">' +
        '<circle class="progress-ring-bg" stroke="rgba(0, 0, 0, 0.08)" stroke-width="' + strokeWidth + '" fill="transparent" r="' + radius + '" cx="' + (size / 2) + '" cy="' + (size / 2) + '"/>' +
        '<circle class="progress-ring-fg" stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '" fill="transparent" r="' + radius + '" cx="' + (size / 2) + '" cy="' + (size / 2) + '" ' +
          'style="stroke-dasharray: ' + circumference + ' ' + circumference + '; stroke-dashoffset: ' + strokeDashoffset + '; transform: rotate(-90deg); transform-origin: 50% 50%; stroke-linecap: round; transition: stroke-dashoffset 0.3s ease;"/>' +
      '</svg>';
  }

  // ============================================================
  // VIEW 3: HABIT CONSISTENCY & PERFORMANCE ANALYSIS
  // ============================================================
  function renderConsistencyAnalysisHtml(state, year, month) {
    var habits = state.habits || [];
    var daysCount = getDaysInMonth(year, month);

    var rowsHtml = habits.map(function (h) {
      var cons = getHabitConsistency(state, h.id, year, month);
      var goal = h.targetDays || daysCount;
      var rateClass = cons.rate >= 80 ? 'rate-green' : (cons.rate >= 50 ? 'rate-orange' : 'rate-red');

      return '' +
        '<div class="analysis-habit-card">' +
          '<div class="analysis-habit-header">' +
            '<div class="analysis-habit-title-wrap">' +
              '<span class="analysis-habit-icon">' + safeEscape(h.icon || '✓') + '</span>' +
              '<div>' +
                '<h4 class="analysis-habit-name">' + safeEscape(h.name) + '</h4>' +
                '<span class="analysis-habit-category">' + safeEscape(h.category || 'Discipline') + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="analysis-habit-scores">' +
              '<span class="analysis-rate-badge ' + rateClass + '">' + cons.rate + '%</span>' +
              '<span class="analysis-fraction">' + cons.completed + ' / ' + goal + ' Days</span>' +
            '</div>' +
          '</div>' +
          '<div class="analysis-progress-track">' +
            '<div class="analysis-progress-fill ' + rateClass + '" style="width:' + Math.min(100, cons.rate) + '%;"></div>' +
          '</div>' +
          '<div class="analysis-meta-row">' +
            '<span>Current Streak: <strong>' + cons.streak + ' Day' + (cons.streak === 1 ? '' : 's') + '</strong></span>' +
            '<div style="display: flex; align-items: center; gap: 10px;">' +
              '<button type="button" class="btn-text-edit" onclick="openEditHabitModal(\'' + h.id + '\')">Edit</button>' +
              '<button type="button" class="btn-text-danger" onclick="removeHabitDirect(\'' + h.id + '\')">Delete</button>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('');

    return '' +
      '<div class="habits-analysis-container">' +
        '<div class="analysis-top-card">' +
          '<h3 style="font-size: 0.96rem; font-weight: 700; margin: 0 0 4px;">Consistency &amp; Target Breakdown</h3>' +
          '<p style="font-size: 0.76rem; color: var(--text-secondary); margin: 0 0 12px; line-height: 1.45;">' +
            'Real-time discipline scoring calculated across ' + MONTH_NAMES[month] + ' ' + year + '.' +
          '</p>' +
          '<div class="analysis-cards-grid">' + rowsHtml + '</div>' +
        '</div>' +
      '</div>';
  }

  // ============================================================
  // NAVIGATION CONTROLLERS & EVENT HANDLERS
  // ============================================================
  global.changeHabitsWeek = function (delta) {
    selectedWeekStart.setDate(selectedWeekStart.getDate() + (delta * 7));
    renderHabitsView();
  };

  global.resetHabitsToCurrentWeek = function () {
    selectedWeekStart = getMondayOfWeek(new Date());
    renderHabitsView();
  };

  global.scrollToDayCard = function (dateKey) {
    var card = document.getElementById('day-card-' + dateKey);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.classList.add('pulse-highlight');
      setTimeout(function () {
        card.classList.remove('pulse-highlight');
      }, 1000);
    }
  };

  global.jumpToDateFromCalendar = function (dateKey) {
    var parts = dateKey.split('-');
    if (parts.length === 3) {
      var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      selectedWeekStart = getMondayOfWeek(d);
      activeSubTab = 'cards';
      renderHabitsView();
      setTimeout(function () {
        global.scrollToDayCard(dateKey);
      }, 100);
    }
  };

  global.changeHabitsMonth = function (delta) {
    selectedMonth += delta;
    if (selectedMonth > 11) {
      selectedMonth = 0;
      selectedYear++;
    } else if (selectedMonth < 0) {
      selectedMonth = 11;
      selectedYear--;
    }
    renderHabitsView();
  };

  global.resetHabitsToCurrentMonth = function () {
    selectedYear = new Date().getFullYear();
    selectedMonth = new Date().getMonth();
    renderHabitsView();
  };

  global.switchHabitsSubTab = function (subTab) {
    activeSubTab = subTab;
    renderHabitsView();
  };

  global.getHabitsActiveSubTab = function () {
    return activeSubTab;
  };

  global.toggleHabit = toggleHabit;
  global.renderHabitsView = renderHabitsView;

  global.toggleHabitsManageMode = function () {
    manageMode = !manageMode;
    renderHabitsView();
  };

  global.openAddHabitModal = function () {
    if (typeof global.openModal === 'function') {
      var editIdInput = document.getElementById('habitEditId');
      var titleEl = document.getElementById('habitModalTitle');
      var submitBtn = document.getElementById('habitSubmitBtn');
      var deleteBtn = document.getElementById('habitDeleteInModalBtn');
      var nameInput = document.getElementById('habitInputName');
      var iconInput = document.getElementById('habitInputIcon');
      var targetInput = document.getElementById('habitInputTarget');
      var catInput = document.getElementById('habitInputCategory');

      if (editIdInput) editIdInput.value = '';
      if (titleEl) titleEl.textContent = 'Add Custom Habit';
      if (submitBtn) submitBtn.textContent = 'Add to Tracker';
      if (deleteBtn) deleteBtn.style.display = 'none';
      if (nameInput) nameInput.value = '';
      if (iconInput) iconInput.value = '⚡';
      if (targetInput) targetInput.value = '30';
      if (catInput) catInput.value = 'Discipline';
      global.openModal('addHabitModal');
    }
  };

  global.openEditHabitModal = function (habitId) {
    var state = loadHabitsState();
    var habit = state.habits.find(function (h) { return h.id === habitId; });
    if (!habit) return;

    var editIdInput = document.getElementById('habitEditId');
    var titleEl = document.getElementById('habitModalTitle');
    var submitBtn = document.getElementById('habitSubmitBtn');
    var deleteBtn = document.getElementById('habitDeleteInModalBtn');
    var nameInput = document.getElementById('habitInputName');
    var iconInput = document.getElementById('habitInputIcon');
    var targetInput = document.getElementById('habitInputTarget');
    var catInput = document.getElementById('habitInputCategory');

    if (editIdInput) editIdInput.value = habit.id;
    if (titleEl) titleEl.textContent = 'Edit Habit';
    if (submitBtn) submitBtn.textContent = 'Save Changes';
    if (deleteBtn) deleteBtn.style.display = 'block';
    if (nameInput) nameInput.value = habit.name || '';
    if (iconInput) iconInput.value = habit.icon || '⚡';
    if (targetInput) targetInput.value = String(habit.targetDays || 30);
    if (catInput) {
      var opts = Array.from(catInput.options).map(function (o) { return o.value; });
      catInput.value = opts.indexOf(habit.category) >= 0 ? habit.category : 'Discipline';
    }

    if (typeof global.openModal === 'function') {
      global.openModal('addHabitModal');
    }
  };

  global.submitAddHabit = function (event) {
    if (event) event.preventDefault();
    var editId = document.getElementById('habitEditId') ? document.getElementById('habitEditId').value.trim() : '';
    var name = document.getElementById('habitInputName') ? document.getElementById('habitInputName').value.trim() : '';
    var icon = document.getElementById('habitInputIcon') ? document.getElementById('habitInputIcon').value.trim() : '⚡';
    var cat = document.getElementById('habitInputCategory') ? document.getElementById('habitInputCategory').value : 'Discipline';
    var target = document.getElementById('habitInputTarget') ? parseInt(document.getElementById('habitInputTarget').value, 10) : 30;

    if (!name) return;

    var state = loadHabitsState();
    if (editId) {
      var existing = state.habits.find(function (h) { return h.id === editId; });
      if (existing) {
        existing.name = name;
        existing.icon = icon || '⚡';
        existing.category = cat || 'Discipline';
        existing.targetDays = target || 30;
      }
    } else {
      var newId = 'h_' + Date.now().toString(36);
      state.habits.push({
        id: newId,
        name: name,
        icon: icon || '⚡',
        category: cat || 'Discipline',
        targetDays: target || 30
      });
    }
    saveHabitsState(state);

    if (typeof global.closeModal === 'function') {
      global.closeModal('addHabitModal');
    }
    renderHabitsView();
  };

  global.deleteHabitFromModal = async function () {
    var editId = document.getElementById('habitEditId') ? document.getElementById('habitEditId').value.trim() : '';
    if (!editId) return;
    if (typeof global.closeModal === 'function') {
      global.closeModal('addHabitModal');
    }
    await global.removeHabitDirect(editId);
  };

  global.removeHabitDirect = async function (habitId) {
    var state = loadHabitsState();
    var habit = state.habits.find(function (h) { return h.id === habitId; });
    var name = habit ? habit.name : 'this habit';

    if (typeof global.showAppConfirm === 'function') {
      var ok = await global.showAppConfirm({
        title: 'Remove Habit',
        message: 'Are you sure you want to remove "' + name + '" from your tracking routine?',
        confirmText: 'Remove',
        tone: 'warning'
      });
      if (!ok) return;
    }

    state.habits = state.habits.filter(function (h) { return h.id !== habitId; });
    saveHabitsState(state);
    renderHabitsView();
  };

  // Retention auto-cleanup helper (6-month rule)
  global.pruneHabitsLogsOlderThan = function (cutoffDateIso) {
    var state = loadHabitsState();
    if (!state.logs) return 0;
    var prunedCount = 0;
    var keys = Object.keys(state.logs);
    keys.forEach(function (k) {
      if (k < cutoffDateIso) {
        delete state.logs[k];
        prunedCount++;
      }
    });
    if (prunedCount > 0) {
      saveHabitsState(state);
    }
    return prunedCount;
  };

  // Backup & Restore snapshot helpers
  global.getHabitsBackupSnapshot = function () {
    return loadHabitsState();
  };

  global.restoreHabitsBackupSnapshot = function (snapshot) {
    if (!snapshot || typeof snapshot !== 'object') return;
    if (!Array.isArray(snapshot.habits)) snapshot.habits = DEFAULT_HABITS.slice();
    if (!snapshot.logs || typeof snapshot.logs !== 'object') snapshot.logs = {};
    saveHabitsState(snapshot);
    renderHabitsView();
  };

  // Auto-render on initial script load if DOM is ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        renderHabitsView();
      });
    } else {
      renderHabitsView();
    }
  }

})(typeof window !== 'undefined' ? window : this);
