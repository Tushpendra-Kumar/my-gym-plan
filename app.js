/**
 * Athletic Workout Tracker & Planner
 * Tailored for Virat Kohli Athletic Physique (Lean, Functional, Explosive)
 * 7 - 12 - 15 Reverse Pyramid Rep Scheme
 * 100% Offline with LocalStorage & Service Worker
 */

// Default Workout Plan
const DEFAULT_PLAN = {
  monday: {
    name: "Monday",
    title: "Chest & Athletic Core",
    focus: "Push Strength & Core Stability",
    description: "Build a broad athletic chest and solid core. Start with 1-2 dynamic warm-up sets, then hit the 7-12-15 Reverse Pyramid.",
    color: "#10b981", // Emerald
    exercises: [
      {
        id: "m1",
        name: "Incline Dumbbell Bench Press",
        target: "Upper Chest & Shoulders",
        notes: "45-degree angle. Explode up, control down in 2 seconds.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 25, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 20, reps: 12, done: false },
          { setNum: 3, type: "Light/Pump", targetReps: 15, weight: 15, reps: 15, done: false }
        ]
      },
      {
        id: "m2",
        name: "Flat Barbell Bench Press",
        target: "Mid Chest & Raw Power",
        notes: "Grip slightly wider than shoulders. Drive through feet.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 60, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 50, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 40, reps: 15, done: false }
        ]
      },
      {
        id: "m3",
        name: "Weighted / Bodyweight Dips",
        target: "Lower Chest & Triceps",
        notes: "Lean forward 20 degrees to hit lower chest fibers.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 10, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 0, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 0, reps: 15, done: false }
        ]
      },
      {
        id: "m4",
        name: "Cable Chest Flyes (High to Low)",
        target: "Inner & Lower Chest Definition",
        notes: "Squeeze 1 sec at peak contraction.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 25, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 20, reps: 12, done: false },
          { setNum: 3, type: "Light/Pump", targetReps: 15, weight: 15, reps: 15, done: false }
        ]
      },
      {
        id: "m5",
        name: "Hanging Leg / Knee Raises",
        target: "Lower Abs & Athletic Core",
        notes: "No swinging. Curl pelvis up towards chest.",
        sets: [
          { setNum: 1, type: "Strict", targetReps: 12, weight: 0, reps: 12, done: false },
          { setNum: 2, type: "Strict", targetReps: 12, weight: 0, reps: 12, done: false },
          { setNum: 3, type: "Strict", targetReps: 15, weight: 0, reps: 15, done: false }
        ]
      }
    ]
  },
  tuesday: {
    name: "Tuesday",
    title: "Back & Posterior Chain",
    focus: "V-Taper, Posture & Pulling Power",
    description: "Athletic posture and strong back. Essential for explosive throwing, running posture, and V-taper frame.",
    color: "#3b82f6", // Blue
    exercises: [
      {
        id: "t1",
        name: "Deadlift (Conventional or Trap Bar)",
        target: "Full Posterior Chain & Raw Brute Force",
        notes: "Keep spine neutral. Push through floor with heels.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 100, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 80, reps: 12, done: false },
          { setNum: 3, type: "Endurance", targetReps: 15, weight: 65, reps: 15, done: false }
        ]
      },
      {
        id: "t2",
        name: "Wide-Grip Lat Pulldowns / Pull-Ups",
        target: "Lats & Upper Back Width",
        notes: "Pull elbows down to your pockets, chest up high.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 65, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 50, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 40, reps: 15, done: false }
        ]
      },
      {
        id: "t3",
        name: "Bent-Over Barbell Rows",
        target: "Mid Back Thickness & Grip",
        notes: "45-degree hip hinge. Pull bar to belly button.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 60, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 50, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 40, reps: 15, done: false }
        ]
      },
      {
        id: "t4",
        name: "Single-Arm Dumbbell Row",
        target: "Lat Isolation & Unilateral Balance",
        notes: "Full stretch at bottom, squeeze lat hard at top.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 27.5, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 22.5, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 17.5, reps: 15, done: false }
        ]
      },
      {
        id: "t5",
        name: "Face Pulls (with Rope)",
        target: "Rear Delts, Rotator Cuff & Posture",
        notes: "Pull rope towards eyes, rotate thumbs backward.",
        sets: [
          { setNum: 1, type: "Control", targetReps: 12, weight: 25, reps: 12, done: false },
          { setNum: 2, type: "Control", targetReps: 15, weight: 20, reps: 15, done: false },
          { setNum: 3, type: "Burnout", targetReps: 20, weight: 15, reps: 20, done: false }
        ]
      }
    ]
  },
  wednesday: {
    name: "Wednesday",
    title: "Shoulders (Delts) & Core",
    focus: "Boulder Shoulders & Rotational Core",
    description: "Athletes need strong, mobile shoulders for throwing, pushing, and striking power + rock hard core stability.",
    color: "#f59e0b", // Amber
    exercises: [
      {
        id: "w1",
        name: "Standing Overhead Barbell / Dumbbell Press",
        target: "Anterior Delts & Core Stability",
        notes: "Tight glutes and abs. Lock out overhead without arching back.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 45, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 35, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 25, reps: 15, done: false }
        ]
      },
      {
        id: "w2",
        name: "Dumbbell Lateral Raises (Strict Form)",
        target: "Lateral Delts (V-Taper Width)",
        notes: "Slight forward lean. Lead with elbows, avoid swinging.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 12.5, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 10, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 7.5, reps: 15, done: false }
        ]
      },
      {
        id: "w3",
        name: "Arnold Dumbbell Press",
        target: "Full Shoulder Roundness",
        notes: "Rotate palms from facing you to facing outward as you press.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 18, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 14, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 10, reps: 15, done: false }
        ]
      },
      {
        id: "w4",
        name: "Dumbbell / Barbell Shrugs",
        target: "Upper Traps & Neck Support",
        notes: "Lift straight up to ears, pause 2 seconds at the top.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 10, weight: 30, reps: 10, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 25, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 20, reps: 15, done: false }
        ]
      },
      {
        id: "w5",
        name: "Ab Wheel Rollouts / Cable Woodchoppers",
        target: "Deep Core & Rotational Power",
        notes: "Brace core hard like preparing for a punch.",
        sets: [
          { setNum: 1, type: "Strict", targetReps: 10, weight: 0, reps: 10, done: false },
          { setNum: 2, type: "Strict", targetReps: 12, weight: 0, reps: 12, done: false },
          { setNum: 3, type: "Strict", targetReps: 15, weight: 0, reps: 15, done: false }
        ]
      }
    ]
  },
  thursday: {
    name: "Thursday",
    title: "Arms & Grip Power",
    focus: "Biceps, Triceps, Forearms & Hand Grip",
    description: "Athletic arms for high torque, grip strength for sports, and proportionate muscular aesthetics.",
    color: "#ec4899", // Pink
    exercises: [
      {
        id: "th1",
        name: "Barbell / EZ-Bar Bicep Curls",
        target: "Biceps Brachii & Arm Mass",
        notes: "Strict form, pin elbows to ribs, no hip momentum.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 35, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 27.5, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 20, reps: 15, done: false }
        ]
      },
      {
        id: "th2",
        name: "Close-Grip Bench Press or Skullcrushers",
        target: "Triceps Long & Lateral Heads",
        notes: "Grip shoulder-width. Lower bar under full control.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 50, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 40, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 30, reps: 15, done: false }
        ]
      },
      {
        id: "th3",
        name: "Incline Dumbbell Hammer Curls",
        target: "Brachialis & Forearms (Arm Thickness)",
        notes: "Thumbs up throughout the curl.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 16, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 12.5, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 10, reps: 15, done: false }
        ]
      },
      {
        id: "th4",
        name: "Triceps Cable Rope Pushdowns",
        target: "Triceps Horseshoe & Definition",
        notes: "Spread the rope wide at the bottom contraction.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 30, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 22.5, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 17.5, reps: 15, done: false }
        ]
      },
      {
        id: "th5",
        name: "Wrist Curls + Heavy Plate / Farmer's Hold",
        target: "Forearm Mass & Crushing Grip",
        notes: "Hold heavy dumbbells or plates till failure.",
        sets: [
          { setNum: 1, type: "Hold", targetReps: 15, weight: 25, reps: 15, done: false },
          { setNum: 2, type: "Hold", targetReps: 15, weight: 20, reps: 15, done: false },
          { setNum: 3, type: "Burnout", targetReps: 20, weight: 15, reps: 20, done: false }
        ]
      }
    ]
  },
  friday: {
    name: "Friday",
    title: "Athletic Functional & HIIT Conditioning",
    focus: "Speed, Explosiveness, Agility & Fat Burn",
    description: "Virat Kohli's secret weapon. High-intensity conditioning for shredding body fat, explosive stamina, and unmatched athleticism.",
    color: "#8b5cf6", // Purple
    exercises: [
      {
        id: "f1",
        name: "Kettlebell / Dumbbell Swings",
        target: "Hip Hinge Explosion & Posterior Power",
        notes: "Drive hips through explosively, squeeze glutes at top.",
        sets: [
          { setNum: 1, type: "Heavy Power", targetReps: 15, weight: 24, reps: 15, done: false },
          { setNum: 2, type: "Heavy Power", targetReps: 15, weight: 24, reps: 15, done: false },
          { setNum: 3, type: "Stamina", targetReps: 20, weight: 20, reps: 20, done: false }
        ]
      },
      {
        id: "f2",
        name: "Box Jumps or Broad Jumps",
        target: "Fast-Twitch Leg Spring & Sprint Speed",
        notes: "Land soft like a panther in quarter squat. Step down safely.",
        sets: [
          { setNum: 1, type: "Explosive", targetReps: 8, weight: 0, reps: 8, done: false },
          { setNum: 2, type: "Explosive", targetReps: 8, weight: 0, reps: 8, done: false },
          { setNum: 3, type: "Explosive", targetReps: 8, weight: 0, reps: 8, done: false }
        ]
      },
      {
        id: "f3",
        name: "Battle Ropes / Medicine Ball Slams",
        target: "Cardiovascular Stamina & Upper Body Grit",
        notes: "Maximum intensity for 30-40 seconds per set.",
        sets: [
          { setNum: 1, type: "Interval", targetReps: 30, weight: 8, reps: 30, done: false },
          { setNum: 2, type: "Interval", targetReps: 30, weight: 8, reps: 30, done: false },
          { setNum: 3, type: "All Out", targetReps: 30, weight: 8, reps: 30, done: false }
        ]
      },
      {
        id: "f4",
        name: "Farmer's Walk / Dumbbell Carries",
        target: "Total Body Brute Stability & Traps",
        notes: "Walk tall, shoulder blades packed back, 30-40 meters.",
        sets: [
          { setNum: 1, type: "Heavy Carry", targetReps: 1, weight: 30, reps: 1, done: false },
          { setNum: 2, type: "Heavy Carry", targetReps: 1, weight: 30, reps: 1, done: false },
          { setNum: 3, type: "Heavy Carry", targetReps: 1, weight: 30, reps: 1, done: false }
        ]
      },
      {
        id: "f5",
        name: "HIIT Sprint Intervals / Treadmill Incline",
        target: "Sub-10% Bodyfat Conditioning",
        notes: "30s sprint @ max effort, 45s rest walk. Repeat 6-8 rounds.",
        sets: [
          { setNum: 1, type: "HIIT", targetReps: 6, weight: 0, reps: 6, done: false }
        ]
      }
    ]
  },
  saturday: {
    name: "Saturday",
    title: "Legs & Lower Body Athletic Power",
    focus: "Quads, Hamstrings, Glutes & Calves",
    description: "Athletes are built from the ground up. Heavy squats + single-leg athletic balance to forge bulletproof knees and running speed.",
    color: "#ef4444", // Red
    exercises: [
      {
        id: "s1",
        name: "Barbell Back / Front Squats",
        target: "Total Quad, Glute & Core Power",
        notes: "Hit parallel depth. Drive through midfoot, knees in line with toes.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 80, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 65, reps: 12, done: false },
          { setNum: 3, type: "Endurance", targetReps: 15, weight: 50, reps: 15, done: false }
        ]
      },
      {
        id: "s2",
        name: "Romanian Deadlifts (RDLs)",
        target: "Hamstrings, Glutes & Sprinting Strength",
        notes: "Push hips back towards wall, slight knee bend, feel deep hamstring stretch.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 70, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 55, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 45, reps: 15, done: false }
        ]
      },
      {
        id: "s3",
        name: "Bulgarian Split Squats (Dumbbell)",
        target: "Single-Leg Balance & Unilateral Strength",
        notes: "Back foot elevated on bench. Keep front knee stable.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 16, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 12, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 8, reps: 15, done: false }
        ]
      },
      {
        id: "s4",
        name: "Leg Press or Hack Squat",
        target: "Quad Hypertrophy & Volume",
        notes: "Feet shoulder-width on platform. Don't lock knees at top.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 150, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 120, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 90, reps: 15, done: false }
        ]
      },
      {
        id: "s5",
        name: "Standing / Seated Calf Raises",
        target: "Calves & Achilles Spring Elasticity",
        notes: "2-second deep stretch at bottom, 1-second pause at top on toes.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 12, weight: 60, reps: 12, done: false },
          { setNum: 2, type: "Moderate", targetReps: 15, weight: 45, reps: 15, done: false },
          { setNum: 3, type: "Burnout", targetReps: 20, weight: 35, reps: 20, done: false }
        ]
      }
    ]
  },
  sunday: {
    name: "Sunday",
    title: "Active Recovery & Mobility",
    focus: "Muscle Repair, Foam Rolling & Flexibility",
    description: "Muscles grow when you rest. Professional athletes treat recovery with the same seriousness as training.",
    color: "#06b6d4", // Cyan
    exercises: [
      {
        id: "su1",
        name: "Full Body Foam Rolling & Myofascial Release",
        target: "Tissue Quality & Lactic Flush",
        notes: "Roll quads, IT band, lats, glutes, upper back (60s each).",
        sets: [
          { setNum: 1, type: "Recovery", targetReps: 1, weight: 0, reps: 1, done: false }
        ]
      },
      {
        id: "su2",
        name: "Dynamic Hip & Hamstring Flow (World's Greatest Stretch)",
        target: "Hip Mobility & Joint Health",
        notes: "Deep lunge, reach elbow to instep, twist chest upward.",
        sets: [
          { setNum: 1, type: "Mobility", targetReps: 10, weight: 0, reps: 10, done: false },
          { setNum: 2, type: "Mobility", targetReps: 10, weight: 0, reps: 10, done: false }
        ]
      },
      {
        id: "su3",
        name: "Shoulder Dislocations & Thoracic Extension",
        target: "Spine & Shoulder Overhead Freedom",
        notes: "Use resistance band or PVC pipe.",
        sets: [
          { setNum: 1, type: "Mobility", targetReps: 15, weight: 0, reps: 15, done: false },
          { setNum: 2, type: "Mobility", targetReps: 15, weight: 0, reps: 15, done: false }
        ]
      },
      {
        id: "su4",
        name: "45-Minute Outdoor Low-Intensity Walk / Swimming",
        target: "Aerobic Base & Lymphatic Drainage",
        notes: "Breathe through nose, relaxed pace in fresh air.",
        sets: [
          { setNum: 1, type: "Cardio", targetReps: 45, weight: 0, reps: 45, done: false }
        ]
      }
    ]
  }
};

// Storage Keys
const STORAGE_PLAN = 'virat_gym_plan_v2';
const STORAGE_HISTORY = 'virat_gym_history_v2';
const STORAGE_SETTINGS = 'virat_gym_settings_v2';

// State
let currentDay = getTodayDayKey();
let workoutPlan = loadPlan();
let workoutHistory = loadHistory();
let timerInterval = null;
let timerSeconds = 0;
let timerTotal = 60;
let audioCtx = null;

// Helper: Get Today's Key
function getTodayDayKey() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayIdx = new Date().getDay();
  return days[todayIdx];
}

// Storage loaders
function loadPlan() {
  try {
    const saved = localStorage.getItem(STORAGE_PLAN);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error loading plan", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_PLAN));
}

function savePlan() {
  try {
    localStorage.setItem(STORAGE_PLAN, JSON.stringify(workoutPlan));
  } catch (e) {
    console.error("Error saving plan", e);
  }
}

function loadHistory() {
  try {
    const saved = localStorage.getItem(STORAGE_HISTORY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error loading history", e);
  }
  return {};
}

function saveHistory() {
  try {
    localStorage.setItem(STORAGE_HISTORY, JSON.stringify(workoutHistory));
  } catch (e) {
    console.error("Error saving history", e);
  }
}

// Play sound offline with Web Audio API
function playTimerBeep() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    // Play 3 short high beeps
    const times = [0, 0.25, 0.5];
    times.forEach((t, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(i === 2 ? 880 : 587.33, audioCtx.currentTime + t); // D5 then A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + t + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + t);
      osc.stop(audioCtx.currentTime + t + 0.2);
    });

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
  } catch (e) {
    console.log("Audio not supported or blocked", e);
  }
}

// Render Functions
function initApp() {
  renderDayTabs();
  renderWorkoutView();
  setupEventListeners();
  checkPwaInstall();
  updateStatsHeader();
}

// Render Day Tabs
function renderDayTabs() {
  const container = document.getElementById('dayTabs');
  if (!container) return;

  const todayKey = getTodayDayKey();
  const days = [
    { key: 'monday', label: 'Mon', full: 'Chest' },
    { key: 'tuesday', label: 'Tue', full: 'Back' },
    { key: 'wednesday', label: 'Wed', full: 'Shoulders' },
    { key: 'thursday', label: 'Thu', full: 'Arms' },
    { key: 'friday', label: 'Fri', full: 'HIIT/Athletic' },
    { key: 'saturday', label: 'Sat', full: 'Legs' },
    { key: 'sunday', label: 'Sun', full: 'Recovery' }
  ];

  container.innerHTML = days.map(d => {
    const isSelected = d.key === currentDay;
    const isToday = d.key === todayKey;
    return `
      <button class="day-tab ${isSelected ? 'active' : ''} ${isToday ? 'is-today' : ''}" data-day="${d.key}">
        <span class="tab-label">${d.label}</span>
        <span class="tab-sub">${d.full}</span>
        ${isToday ? '<span class="today-badge">TODAY</span>' : ''}
      </button>
    `;
  }).join('');
}

// Render Active Workout
function renderWorkoutView() {
  const dayData = workoutPlan[currentDay];
  if (!dayData) return;

  // Header information
  document.getElementById('dayTitle').innerText = dayData.title;
  document.getElementById('dayFocus').innerText = dayData.focus;
  document.getElementById('dayDescription').innerText = dayData.description;

  const todayBadge = document.getElementById('dayTodayBadge');
  if (todayBadge) {
    todayBadge.style.display = (currentDay === getTodayDayKey()) ? 'inline-block' : 'none';
  }

  // Render Exercise Cards
  const listEl = document.getElementById('exerciseList');
  if (!listEl) return;

  if (!dayData.exercises || dayData.exercises.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <p>Is din ke liye koi exercise nahi hai.</p>
        <button class="btn btn-primary" onclick="openAddExerciseModal()">+ Exercise Add Karein</button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = dayData.exercises.map((ex, exIndex) => {
    const completedSets = ex.sets.filter(s => s.done).length;
    const totalSets = ex.sets.length;
    const isAllDone = totalSets > 0 && completedSets === totalSets;

    return `
      <div class="exercise-card ${isAllDone ? 'card-completed' : ''}" data-ex-id="${ex.id}">
        <div class="exercise-header">
          <div class="ex-info">
            <div class="ex-title-row">
              <span class="ex-index">#${exIndex + 1}</span>
              <h3 class="ex-name">${escapeHtml(ex.name)}</h3>
            </div>
            <span class="ex-target">${escapeHtml(ex.target || '')}</span>
          </div>
          <div class="ex-actions">
            <button class="btn-demo-view" onclick="openExerciseDemoModal('${ex.id}')" title="Form & Video Demo">
              🎬 Demo
            </button>
            <span class="sets-progress ${isAllDone ? 'done-badge' : ''}">${completedSets}/${totalSets} Sets</span>
            <button class="icon-btn" onclick="openEditExerciseModal('${ex.id}')" title="Edit / Delete" aria-label="Edit">
              ✏️
            </button>
          </div>
        </div>

        ${ex.notes ? `<div class="ex-notes">💡 <strong>Coach Tip:</strong> ${escapeHtml(ex.notes)}</div>` : ''}

        <div class="sets-table-wrapper">
          <table class="sets-table">
            <thead>
              <tr>
                <th>SET</th>
                <th>SCHEME</th>
                <th>TARGET</th>
                <th>WEIGHT (KG)</th>
                <th>ACTUAL REPS</th>
                <th>DONE</th>
              </tr>
            </thead>
            <tbody>
              ${ex.sets.map((set, sIdx) => {
                let badgeClass = 'badge-scheme';
                if (set.type && set.type.toLowerCase().includes('heavy')) badgeClass = 'badge-heavy';
                else if (set.type && set.type.toLowerCase().includes('moderate')) badgeClass = 'badge-moderate';
                else if (set.type && set.type.toLowerCase().includes('burnout') || (set.type && set.type.toLowerCase().includes('light'))) badgeClass = 'badge-light';

                return `
                  <tr class="set-row ${set.done ? 'row-completed' : ''}">
                    <td class="set-num-cell">
                      <strong>${set.setNum || sIdx + 1}</strong>
                    </td>
                    <td>
                      <span class="scheme-badge ${badgeClass}">${escapeHtml(set.type || 'Normal')}</span>
                    </td>
                    <td class="target-reps-cell">
                      ${set.targetReps} reps
                    </td>
                    <td>
                      <div class="stepper-input">
                        <button class="step-btn" onclick="adjustWeight('${ex.id}', ${sIdx}, -2.5)">-</button>
                        <input type="number" 
                               step="0.5" 
                               class="weight-input" 
                               value="${set.weight}" 
                               onchange="updateWeight('${ex.id}', ${sIdx}, this.value)"
                               aria-label="Weight in kg">
                        <button class="step-btn" onclick="adjustWeight('${ex.id}', ${sIdx}, +2.5)">+</button>
                      </div>
                    </td>
                    <td>
                      <div class="stepper-input">
                        <button class="step-btn" onclick="adjustReps('${ex.id}', ${sIdx}, -1)">-</button>
                        <input type="number" 
                               class="reps-input" 
                               value="${set.reps || set.targetReps}" 
                               onchange="updateReps('${ex.id}', ${sIdx}, this.value)"
                               aria-label="Actual reps">
                        <button class="step-btn" onclick="adjustReps('${ex.id}', ${sIdx}, +1)">+</button>
                      </div>
                    </td>
                    <td>
                      <button class="check-btn ${set.done ? 'checked' : ''}" 
                              onclick="toggleSetDone('${ex.id}', ${sIdx})"
                              aria-label="Mark set complete">
                        ${set.done ? '✓' : '○'}
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="ex-footer">
          <button class="btn-subtle" onclick="addSetToExercise('${ex.id}')">+ Set Add Karein</button>
        </div>
      </div>
    `;
  }).join('');

  updateStatsHeader();
}

// Quick Steppers and Update handlers
function adjustWeight(exId, setIdx, delta) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;
  let currentVal = parseFloat(ex.sets[setIdx].weight) || 0;
  currentVal = Math.max(0, currentVal + delta);
  // Round to 1 decimal
  ex.sets[setIdx].weight = Math.round(currentVal * 10) / 10;
  savePlan();
  renderWorkoutView();
}

function updateWeight(exId, setIdx, val) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;
  ex.sets[setIdx].weight = Math.max(0, parseFloat(val) || 0);
  savePlan();
  updateStatsHeader();
}

function adjustReps(exId, setIdx, delta) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;
  let currentVal = parseInt(ex.sets[setIdx].reps) || ex.sets[setIdx].targetReps || 0;
  currentVal = Math.max(1, currentVal + delta);
  ex.sets[setIdx].reps = currentVal;
  savePlan();
  renderWorkoutView();
}

function updateReps(exId, setIdx, val) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;
  ex.sets[setIdx].reps = Math.max(1, parseInt(val) || 1);
  savePlan();
  updateStatsHeader();
}

function toggleSetDone(exId, setIdx) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;

  const set = ex.sets[setIdx];
  set.done = !set.done;

  if (set.done) {
    // If completed, trigger rest timer
    startRestTimer(getRecommendedRestTime(set.type));
    // Log to history
    logSetHistory(ex.name, set.weight, set.reps || set.targetReps);
  }

  savePlan();
  renderWorkoutView();
}

function getRecommendedRestTime(setType) {
  const t = (setType || '').toLowerCase();
  if (t.includes('heavy') || t.includes('power')) return 90; // 90s for heavy 7 reps
  if (t.includes('moderate')) return 60; // 60s for 12 reps
  if (t.includes('burnout') || t.includes('light') || t.includes('pump')) return 45; // 45s for 15 reps
  return 60;
}

function addSetToExercise(exId) {
  const ex = findExercise(exId);
  if (!ex) return;
  const newSetNum = ex.sets.length + 1;
  const lastSet = ex.sets[ex.sets.length - 1];
  
  ex.sets.push({
    setNum: newSetNum,
    type: "Extra Set",
    targetReps: lastSet ? lastSet.targetReps : 12,
    weight: lastSet ? lastSet.weight : 20,
    reps: lastSet ? lastSet.reps : 12,
    done: false
  });

  savePlan();
  renderWorkoutView();
}

function findExercise(exId) {
  const dayData = workoutPlan[currentDay];
  if (!dayData || !dayData.exercises) return null;
  return dayData.exercises.find(e => e.id === exId);
}

// Log history in local storage
function logSetHistory(exerciseName, weight, reps) {
  const dateStr = new Date().toISOString().split('T')[0];
  if (!workoutHistory[dateStr]) {
    workoutHistory[dateStr] = [];
  }
  workoutHistory[dateStr].push({
    exercise: exerciseName,
    weight: weight,
    reps: reps,
    timestamp: new Date().toLocaleTimeString()
  });
  saveHistory();
}

// Header & Stats
function updateStatsHeader() {
  const dayData = workoutPlan[currentDay];
  if (!dayData || !dayData.exercises) return;

  let totalSets = 0;
  let doneSets = 0;
  let totalVolume = 0;

  dayData.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      totalSets++;
      if (s.done) {
        doneSets++;
        totalVolume += (parseFloat(s.weight) || 0) * (parseInt(s.reps) || s.targetReps || 0);
      }
    });
  });

  const setsCounterEl = document.getElementById('statSetsCounter');
  const volumeEl = document.getElementById('statVolume');
  const progressBar = document.getElementById('workoutProgressBar');

  if (setsCounterEl) setsCounterEl.innerText = `${doneSets} / ${totalSets}`;
  if (volumeEl) volumeEl.innerText = `${Math.round(totalVolume).toLocaleString()} kg`;
  
  if (progressBar) {
    const pct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;
    progressBar.style.width = `${pct}%`;
  }

  // Celebration if 100% complete
  const congratsEl = document.getElementById('congratsBanner');
  if (congratsEl) {
    if (totalSets > 0 && doneSets === totalSets) {
      congratsEl.style.display = 'block';
    } else {
      congratsEl.style.display = 'none';
    }
  }
}

// Rest Timer Logic
function startRestTimer(seconds) {
  timerTotal = seconds;
  timerSeconds = seconds;
  
  const timerWidget = document.getElementById('restTimerWidget');
  if (timerWidget) timerWidget.classList.add('visible');

  updateTimerDisplay();

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      playTimerBeep();
      if (timerWidget) {
        timerWidget.classList.add('timer-finished');
        setTimeout(() => {
          timerWidget.classList.remove('timer-finished');
        }, 3000);
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const displayEl = document.getElementById('timerCountdown');
  if (displayEl) {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    displayEl.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  const fillEl = document.getElementById('timerProgressCircle');
  if (fillEl && timerTotal > 0) {
    const offset = 283 - (283 * timerSeconds) / timerTotal;
    fillEl.style.strokeDashoffset = offset;
  }
}

function stopRestTimer() {
  if (timerInterval) clearInterval(timerInterval);
  const timerWidget = document.getElementById('restTimerWidget');
  if (timerWidget) timerWidget.classList.remove('visible');
}

function addTimerSeconds(addSec) {
  timerSeconds += addSec;
  timerTotal += addSec;
  updateTimerDisplay();
}

// Reset Workout For Current Day
function resetTodayWorkout() {
  if (!confirm("Kya aap aaj ke workout sets ko uncheck/reset karna chahte hain? Weights wahi save rahenge.")) {
    return;
  }
  const dayData = workoutPlan[currentDay];
  if (dayData && dayData.exercises) {
    dayData.exercises.forEach(ex => {
      ex.sets.forEach(s => s.done = false);
    });
    savePlan();
    renderWorkoutView();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Day tab clicks
  document.getElementById('dayTabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.day-tab');
    if (!tab) return;
    currentDay = tab.getAttribute('data-day');
    renderDayTabs();
    renderWorkoutView();
  });

  // Modal close handlers
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });
}

// Modal: Add Custom Exercise
function openAddExerciseModal() {
  const modal = document.getElementById('addExerciseModal');
  if (modal) {
    document.getElementById('addExName').value = '';
    document.getElementById('addExTarget').value = '';
    document.getElementById('addExNotes').value = '';
    modal.classList.add('open');
  }
}

function submitAddExercise(event) {
  event.preventDefault();
  const name = document.getElementById('addExName').value.trim();
  const target = document.getElementById('addExTarget').value.trim();
  const notes = document.getElementById('addExNotes').value.trim();

  if (!name) return;

  const newExercise = {
    id: 'custom_' + Date.now(),
    name: name,
    target: target || 'Athletic Muscle',
    notes: notes || '',
    sets: [
      { setNum: 1, type: "Heavy", targetReps: 7, weight: 20, reps: 7, done: false },
      { setNum: 2, type: "Moderate", targetReps: 12, weight: 15, reps: 12, done: false },
      { setNum: 3, type: "Light/Pump", targetReps: 15, weight: 10, reps: 15, done: false }
    ]
  };

  workoutPlan[currentDay].exercises.push(newExercise);
  savePlan();
  renderWorkoutView();
  closeModal('addExerciseModal');
}

// Modal: Edit Exercise
let currentEditingExId = null;

function openEditExerciseModal(exId) {
  currentEditingExId = exId;
  const ex = findExercise(exId);
  if (!ex) return;

  document.getElementById('editExName').value = ex.name;
  document.getElementById('editExTarget').value = ex.target || '';
  document.getElementById('editExNotes').value = ex.notes || '';

  const modal = document.getElementById('editExerciseModal');
  if (modal) modal.classList.add('open');
}

function submitEditExercise(event) {
  event.preventDefault();
  if (!currentEditingExId) return;

  const ex = findExercise(currentEditingExId);
  if (!ex) return;

  ex.name = document.getElementById('editExName').value.trim() || ex.name;
  ex.target = document.getElementById('editExTarget').value.trim();
  ex.notes = document.getElementById('editExNotes').value.trim();

  savePlan();
  renderWorkoutView();
  closeModal('editExerciseModal');
}

function deleteCurrentExercise() {
  if (!currentEditingExId) return;
  if (!confirm("Kya aap sach me is exercise ko delete karna chahte hain?")) return;

  workoutPlan[currentDay].exercises = workoutPlan[currentDay].exercises.filter(e => e.id !== currentEditingExId);
  savePlan();
  renderWorkoutView();
  closeModal('editExerciseModal');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

// Export & Import Data (Zero Data Loss)
function exportWorkoutData() {
  const data = {
    plan: workoutPlan,
    history: workoutHistory,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TushuGymPlanBackup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importWorkoutData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.plan) {
        workoutPlan = data.plan;
        savePlan();
      }
      if (data.history) {
        workoutHistory = data.history;
        saveHistory();
      }
      alert("✅ Data successfully restore ho gaya!");
      renderDayTabs();
      renderWorkoutView();
    } catch (err) {
      alert("❌ Invalid backup file!");
    }
  };
  reader.readAsText(file);
}

// PWA Install prompt handling
let deferredPrompt = null;
function checkPwaInstall() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBanner = document.getElementById('pwaInstallBanner');
    if (installBanner) installBanner.style.display = 'flex';
  });

  const installBtn = document.getElementById('btnInstallPwa');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to install prompt: ${outcome}`);
        deferredPrompt = null;
        const installBanner = document.getElementById('pwaInstallBanner');
        if (installBanner) installBanner.style.display = 'none';
      } else {
        alert("App ko install karne ke liye Chrome ke menu (3 dots) par click karein aur 'Install app' ya 'Add to Home screen' select karein.");
      }
    });
  }
}

// Side Drawer Handlers
function toggleSideDrawer() {
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) backdrop.classList.toggle('open');
}

function closeSideDrawer() {
  const backdrop = document.getElementById('drawerBackdrop');
  if (backdrop) backdrop.classList.remove('open');
}

function selectDayFromDrawer(dayKey) {
  currentDay = dayKey;
  renderDayTabs();
  renderWorkoutView();
  closeSideDrawer();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateBottomNavActive('navItemPlan');
}

// Sportsman Dashboard Logic (User & Admin Portal)
function openSportsmanDashboard() {
  closeSideDrawer();
  updateBottomNavActive('navItemStats');
  
  let totalVolume = 0;
  let totalSets = 0;
  const prs = {};

  // From current plan
  Object.keys(workoutPlan).forEach(dayKey => {
    const day = workoutPlan[dayKey];
    if (day.exercises) {
      day.exercises.forEach(ex => {
        let maxWeight = 0;
        ex.sets.forEach(s => {
          const w = parseFloat(s.weight) || 0;
          const r = parseInt(s.reps) || s.targetReps || 0;
          if (s.done) {
            totalSets++;
            totalVolume += w * r;
          }
          if (w > maxWeight) maxWeight = w;
        });
        if (maxWeight > 0) {
          prs[ex.name] = Math.max(prs[ex.name] || 0, maxWeight);
        }
      });
    }
  });

  // From historical sessions
  const sessionDates = Object.keys(workoutHistory);
  sessionDates.forEach(date => {
    const logs = workoutHistory[date];
    if (Array.isArray(logs)) {
      logs.forEach(log => {
        const w = parseFloat(log.weight) || 0;
        const r = parseInt(log.reps) || 0;
        totalVolume += w * r;
        totalSets++;
        if (w > 0 && log.exercise) {
          prs[log.exercise] = Math.max(prs[log.exercise] || 0, w);
        }
      });
    }
  });

  // Populate Dashboard UI
  const volEl = document.getElementById('dashTotalVolume');
  const setsEl = document.getElementById('dashTotalSets');
  const sessEl = document.getElementById('dashTotalSessions');

  if (volEl) volEl.innerText = `${Math.round(totalVolume).toLocaleString()} kg`;
  if (setsEl) setsEl.innerText = totalSets;
  if (sessEl) sessEl.innerText = Math.max(1, sessionDates.length);

  // Top PRs
  const prListEl = document.getElementById('dashPrList');
  if (prListEl) {
    const prEntries = Object.entries(prs).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (prEntries.length === 0) {
      prListEl.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-dim); text-align: center; padding: 6px;">Sets complete karne par aapke record yahan dikhenge.</p>`;
    } else {
      prListEl.innerHTML = prEntries.map(([name, weight]) => `
        <div class="pr-item">
          <span class="pr-name">${escapeHtml(name)}</span>
          <span class="pr-weight">${weight} kg</span>
        </div>
      `).join('');
    }
  }

  openModal('sportsmanDashboardModal');
}

// Bottom Navigation Actions
function goToTodayWorkout() {
  currentDay = getTodayDayKey();
  renderDayTabs();
  renderWorkoutView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateBottomNavActive('navItemToday');
}

function scrollToDayPicker() {
  const tabs = document.querySelector('.day-tabs-container');
  if (tabs) {
    tabs.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  updateBottomNavActive('navItemPlan');
}

function toggleRestTimerQuick() {
  const timerWidget = document.getElementById('restTimerWidget');
  if (timerWidget && timerWidget.classList.contains('visible')) {
    stopRestTimer();
  } else {
    startRestTimer(60);
  }
  updateBottomNavActive('navItemTimer');
}

function updateBottomNavActive(activeId) {
  document.querySelectorAll('.bottom-nav-item').forEach(btn => {
    btn.classList.remove('active');
  });
  const el = document.getElementById(activeId);
  if (el) el.classList.add('active');
}

function dismissPwaBanner() {
  const banner = document.getElementById('pwaInstallBanner');
  if (banner) banner.style.display = 'none';
  sessionStorage.setItem('tushu_pwa_dismissed', 'true');
}

// Utility: HTML Escaper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Register Service Worker for 100% Offline Support (Web / PWA)
if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('✅ ServiceWorker registered offline-ready:', reg.scope);
      })
      .catch((err) => {
        console.log('ServiceWorker registration error:', err);
      });
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
