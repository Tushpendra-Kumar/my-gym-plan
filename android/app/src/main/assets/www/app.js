/**
 * Tushu Gym Plan - Ultra-Premium Glassmorphic Edition (v0.01)
 * 7 - 12 - 15 Reverse Pyramid Rep Scheme
 * 100% Offline with LocalStorage, IndexedDB & Service Worker
 */

// Default 7-Day Athletic Workout Plan (Virat Kohli Protocol)
const DEFAULT_PLAN = {
  monday: {
    name: "Monday",
    title: "Chest & Athletic Core",
    focus: "Push Strength & Core Stability",
    description: "Build a broad athletic chest and solid core. 1-2 light dynamic warmup sets, then hit 7-12-15 Reverse Pyramid.",
    color: "#10b981",
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
    color: "#3b82f6",
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
    focus: "3D Delts & Rotational Power",
    description: "Athletes need strong, mobile shoulders for throwing, pushing, and striking power + rock hard core stability.",
    color: "#f59e0b",
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
    focus: "Biceps, Triceps & Forearms",
    description: "Athletic arms for high torque, grip strength for sports, and proportionate muscular aesthetics.",
    color: "#ec4899",
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
        target: "Brachialis & Forearms",
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
        name: "Wrist Curls + Heavy Plate Hold",
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
    title: "Athletic Functional & HIIT",
    focus: "Speed, Explosiveness & Stamina",
    description: "Virat Kohli's secret weapon. High-intensity conditioning for shredding body fat, explosive stamina, and unmatched athleticism.",
    color: "#8b5cf6",
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
        name: "HIIT Sprint Intervals / Treadmill",
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
    title: "Legs & Lower Body Power",
    focus: "Quads, Hamstrings & Calves",
    description: "Athletes are built from the ground up. Heavy squats + single-leg balance to forge bulletproof knees and running speed.",
    color: "#ef4444",
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
        target: "Hamstrings, Glutes & Sprint Strength",
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
        target: "Single-Leg Balance & Strength",
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
        target: "Calves & Achilles Elasticity",
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
    focus: "Muscle Repair & Flexibility",
    description: "Muscles grow when you rest. Professional athletes treat recovery with the same seriousness as training.",
    color: "#06b6d4",
    exercises: [
      {
        id: "su1",
        name: "Full Body Foam Rolling & Myofascial",
        target: "Tissue Quality & Lactic Flush",
        notes: "Roll quads, IT band, lats, glutes, upper back (60s each).",
        sets: [
          { setNum: 1, type: "Recovery", targetReps: 1, weight: 0, reps: 1, done: false }
        ]
      },
      {
        id: "su2",
        name: "Dynamic Hip Flow (World's Greatest Stretch)",
        target: "Hip Mobility & Joint Health",
        notes: "Deep lunge, reach elbow to instep, twist chest upward.",
        sets: [
          { setNum: 1, type: "Mobility", targetReps: 10, weight: 0, reps: 10, done: false },
          { setNum: 2, type: "Mobility", targetReps: 10, weight: 0, reps: 10, done: false }
        ]
      },
      {
        id: "su3",
        name: "Shoulder Dislocations & Thoracic",
        target: "Spine & Shoulder Overhead Freedom",
        notes: "Use resistance band or PVC pipe.",
        sets: [
          { setNum: 1, type: "Mobility", targetReps: 15, weight: 0, reps: 15, done: false },
          { setNum: 2, type: "Mobility", targetReps: 15, weight: 0, reps: 15, done: false }
        ]
      },
      {
        id: "su4",
        name: "45-Minute Outdoor Low-Intensity Walk",
        target: "Aerobic Base & Lymphatic Drainage",
        notes: "Breathe through nose, relaxed pace in fresh air.",
        sets: [
          { setNum: 1, type: "Cardio", targetReps: 45, weight: 0, reps: 45, done: false }
        ]
      }
    ]
  }
};

// Default Athlete Nutrition & Diet Meals (Screen 6 in reference)
const DEFAULT_MEALS = [
  { id: 'm_1', name: 'Oatmeal with Fruits & 4 Eggs', desc: '450 kcal • High Protein Fuel', type: 'Breakfast', emoji: '🍳', done: true, calories: 450 },
  { id: 'm_2', name: 'Grilled Chicken / Paneer with Brown Rice', desc: '650 kcal • Lean Muscle Fuel', type: 'Lunch', emoji: '🥗', done: true, calories: 650 },
  { id: 'm_3', name: 'Fish / Dal with Sweet Potato & Salad', desc: '550 kcal • Clean Dinner Fuel', type: 'Dinner', emoji: '🍲', done: false, calories: 550 },
  { id: 'm_4', name: 'Whey Protein Shake & Almonds', desc: '350 kcal • Post-Workout Recovery', type: 'Snacks', emoji: '🥛', done: false, calories: 350 }
];

// Storage Keys
const STORAGE_PLAN = 'tushu_gym_plan_v2';
const STORAGE_HISTORY = 'tushu_gym_history_v2';
const STORAGE_MEALS = 'tushu_gym_meals_v1';
const STORAGE_ONBOARDED = 'tushu_onboarded_v1';

// Global State
let currentDay = getTodayDayKey();
let currentView = 'home';
let workoutPlan = loadPlan();
let workoutHistory = loadHistory();
let nutritionMeals = loadMeals();
let timerInterval = null;
let timerSeconds = 0;
let timerTotal = 60;
let audioCtx = null;

// Helper: Today's Day Key
function getTodayDayKey() {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

// Storage Loaders & Savers
function loadPlan() {
  try {
    const saved = localStorage.getItem(STORAGE_PLAN);
    if (saved) return JSON.parse(saved);
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

function loadMeals() {
  try {
    const saved = localStorage.getItem(STORAGE_MEALS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error loading meals", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_MEALS));
}

function saveMeals() {
  try {
    localStorage.setItem(STORAGE_MEALS, JSON.stringify(nutritionMeals));
  } catch (e) {
    console.error("Error saving meals", e);
  }
}

// Web Audio API Offline Beep
function playTimerBeep() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const times = [0, 0.25, 0.5];
    times.forEach((t, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(i === 2 ? 880 : 587.33, audioCtx.currentTime + t);
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

// App Initialization
function initApp() {
  checkOnboarding();
  renderWeeklyBars();
  renderHomeStats();
  renderWorkoutDayPills();
  renderWorkoutView();
  renderMeals();
  renderActivityStats();
  setupEventListeners();
  checkPwaInstall();
}

// Onboarding Logic (Screen 1 in Reference)
function checkOnboarding() {
  const isDone = localStorage.getItem(STORAGE_ONBOARDED);
  const screen = document.getElementById('viewOnboarding');
  if (screen) {
    if (isDone === 'true') {
      screen.classList.add('hidden');
    } else {
      screen.classList.remove('hidden');
    }
  }
}

function completeOnboarding() {
  localStorage.setItem(STORAGE_ONBOARDED, 'true');
  const screen = document.getElementById('viewOnboarding');
  if (screen) screen.classList.add('hidden');
  switchView('home');
}

function showOnboardingScreen() {
  const screen = document.getElementById('viewOnboarding');
  if (screen) screen.classList.remove('hidden');
}

// View Switcher (Home, Workouts, Activity, Nutrition)
function switchView(viewName) {
  currentView = viewName;

  // Views mapping
  const views = {
    home: document.getElementById('viewHome'),
    workouts: document.getElementById('viewWorkouts'),
    activity: document.getElementById('viewActivity'),
    nutrition: document.getElementById('viewNutrition')
  };

  Object.keys(views).forEach(k => {
    if (views[k]) {
      if (k === viewName) {
        views[k].classList.add('active');
      } else {
        views[k].classList.remove('active');
      }
    }
  });

  // Bottom Tabs active class
  const tabs = {
    home: document.getElementById('tabHome'),
    workouts: document.getElementById('tabWorkouts'),
    activity: document.getElementById('tabActivity'),
    nutrition: document.getElementById('tabNutrition'),
    timer: document.getElementById('tabTimer')
  };

  Object.keys(tabs).forEach(k => {
    if (tabs[k]) {
      if (k === viewName) {
        tabs[k].classList.add('active');
      } else {
        tabs[k].classList.remove('active');
      }
    }
  });

  // Refresh view specific data
  if (viewName === 'home') {
    renderHomeStats();
    renderWeeklyBars();
  } else if (viewName === 'workouts') {
    renderWorkoutDayPills();
    renderWorkoutView();
  } else if (viewName === 'activity') {
    renderActivityStats();
  } else if (viewName === 'nutrition') {
    renderMeals();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ----------------------------------------------------
// HOME DASHBOARD LOGIC (Screen 2 in Reference)
// ----------------------------------------------------
function renderHomeStats() {
  const dayKey = getTodayDayKey();
  const dayData = workoutPlan[dayKey];
  if (!dayData) return;

  const todayNameEl = document.getElementById('homeTodayName');
  if (todayNameEl) todayNameEl.innerText = dayData.name;

  let totalSets = 0;
  let doneSets = 0;
  let totalVolume = 0;

  if (dayData.exercises) {
    dayData.exercises.forEach(ex => {
      ex.sets.forEach(s => {
        totalSets++;
        if (s.done) {
          doneSets++;
          totalVolume += (parseFloat(s.weight) || 0) * (parseInt(s.reps) || s.targetReps || 0);
        }
      });
    });
  }

  // Update Progress Circle Ring
  const pct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;
  const circleBar = document.getElementById('homeProgressCircle');
  const pctText = document.getElementById('homeProgressPct');
  
  if (circleBar) {
    const offset = 283 - (283 * pct) / 100;
    circleBar.style.strokeDashoffset = offset;
  }
  if (pctText) pctText.innerText = `${pct}%`;

  // Update Metrics
  const statFocus = document.getElementById('homeStatFocus');
  const statVolume = document.getElementById('homeStatVolume');
  const statSets = document.getElementById('homeStatSets');

  if (statFocus) statFocus.innerText = dayData.focus.split('&')[0].trim();
  if (statVolume) statVolume.innerText = `${Math.round(totalVolume).toLocaleString()} kg`;
  if (statSets) statSets.innerText = `${doneSets} / ${totalSets}`;
}

// Weekly Activity Bar Chart (Mon-Sun)
function renderWeeklyBars() {
  const container = document.getElementById('weeklyBarsContainer');
  if (!container) return;

  const days = [
    { key: 'monday', label: 'M' },
    { key: 'tuesday', label: 'T' },
    { key: 'wednesday', label: 'W' },
    { key: 'thursday', label: 'T' },
    { key: 'friday', label: 'F' },
    { key: 'saturday', label: 'S' },
    { key: 'sunday', label: 'S' }
  ];

  const todayKey = getTodayDayKey();

  container.innerHTML = days.map(d => {
    const isToday = d.key === todayKey;
    const dayData = workoutPlan[d.key];
    let completedSets = 0;
    let totalSets = 0;

    if (dayData && dayData.exercises) {
      dayData.exercises.forEach(ex => {
        ex.sets.forEach(s => {
          totalSets++;
          if (s.done) completedSets++;
        });
      });
    }

    let barHeight = totalSets > 0 ? Math.max(12, Math.round((completedSets / totalSets) * 100)) : 10;
    if (completedSets > 0) barHeight = Math.max(30, barHeight);

    return `
      <div class="bar-col ${isToday ? 'active-day' : ''}" onclick="selectDayFromBar('${d.key}')" style="cursor: pointer;">
        <div class="bar-pill-track">
          <div class="bar-pill-fill" style="height: ${barHeight}%;"></div>
        </div>
        <span class="bar-label">${d.label}</span>
      </div>
    `;
  }).join('');
}

function selectDayFromBar(dayKey) {
  currentDay = dayKey;
  switchView('workouts');
}

// ----------------------------------------------------
// WORKOUTS PLANNER LOGIC (Screen 3 & 4 Reference)
// ----------------------------------------------------
function renderWorkoutDayPills() {
  const container = document.getElementById('workoutDayPills');
  if (!container) return;

  const days = [
    { key: 'monday', label: 'Mon: Chest' },
    { key: 'tuesday', label: 'Tue: Back' },
    { key: 'wednesday', label: 'Wed: Shoulders' },
    { key: 'thursday', label: 'Thu: Arms' },
    { key: 'friday', label: 'Fri: HIIT' },
    { key: 'saturday', label: 'Sat: Legs' },
    { key: 'sunday', label: 'Sun: Recovery' }
  ];

  container.innerHTML = days.map(d => {
    const isActive = d.key === currentDay;
    return `
      <button class="filter-pill ${isActive ? 'active' : ''}" onclick="selectWorkoutDay('${d.key}')">
        ${d.label}
      </button>
    `;
  }).join('');
}

function selectWorkoutDay(dayKey) {
  currentDay = dayKey;
  renderWorkoutDayPills();
  renderWorkoutView();
}

function renderWorkoutView() {
  const dayData = workoutPlan[currentDay];
  if (!dayData) return;

  const titleEl = document.getElementById('workoutDayTitle');
  const focusEl = document.getElementById('workoutDayFocus');
  const todayBadge = document.getElementById('workoutTodayBadge');

  if (titleEl) titleEl.innerText = dayData.title;
  if (focusEl) focusEl.innerText = dayData.focus;
  if (todayBadge) {
    todayBadge.style.display = (currentDay === getTodayDayKey()) ? 'inline-block' : 'none';
  }

  const listEl = document.getElementById('exerciseList');
  if (!listEl) return;

  if (!dayData.exercises || dayData.exercises.length === 0) {
    listEl.innerHTML = `
      <div class="glass-card" style="text-align: center; padding: 30px 16px;">
        <p style="color: var(--text-muted); margin-bottom: 12px;">Is din ke liye koi exercise nahi hai.</p>
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
      <div class="glass-card exercise-card ${isAllDone ? 'card-completed' : ''}" data-ex-id="${ex.id}">
        <div class="ex-top-row">
          <div class="ex-name-wrap">
            <div class="ex-avatar">⚡</div>
            <div>
              <h3 class="ex-title">${escapeHtml(ex.name)}</h3>
              <span class="ex-target">${escapeHtml(ex.target || 'Athletic Focus')}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn-demo-view" onclick="openExerciseDemoModal('${ex.id}')" title="Form & Video Demo">
              🎬 Demo
            </button>
            <span style="font-size: 0.75rem; font-weight: 800; color: ${isAllDone ? 'var(--primary)' : 'var(--text-dim)'};">
              ${completedSets}/${totalSets}
            </span>
          </div>
        </div>

        ${ex.notes ? `
          <div style="background: rgba(254, 243, 199, 0.6); border-left: 3px solid var(--accent-gold); padding: 6px 10px; border-radius: 0 8px 8px 0; font-size: 0.78rem; color: #92400e; margin-bottom: 10px;">
            💡 <strong>Tip:</strong> ${escapeHtml(ex.notes)}
          </div>
        ` : ''}

        <div class="sets-table-wrapper">
          <table class="sets-table">
            <thead>
              <tr>
                <th>SET</th>
                <th>SCHEME</th>
                <th>TARGET</th>
                <th>WEIGHT (KG)</th>
                <th>REPS</th>
                <th>DONE</th>
              </tr>
            </thead>
            <tbody>
              ${ex.sets.map((set, sIdx) => {
                let badgeColor = '#64748b';
                let badgeBg = '#f1f5f9';
                if (set.type && set.type.toLowerCase().includes('heavy')) {
                  badgeColor = '#dc2626'; badgeBg = '#fef2f2';
                } else if (set.type && set.type.toLowerCase().includes('moderate')) {
                  badgeColor = '#d97706'; badgeBg = '#fffbeb';
                } else if (set.type && (set.type.toLowerCase().includes('light') || set.type.toLowerCase().includes('burnout'))) {
                  badgeColor = '#059669'; badgeBg = '#ecfdf5';
                }

                return `
                  <tr class="set-row ${set.done ? 'row-completed' : ''}">
                    <td style="font-weight: 800; color: var(--text-main);">${set.setNum || sIdx + 1}</td>
                    <td>
                      <span style="font-size: 0.7rem; font-weight: 800; color: ${badgeColor}; background: ${badgeBg}; padding: 2px 7px; border-radius: 999px;">
                        ${escapeHtml(set.type || 'Normal')}
                      </span>
                    </td>
                    <td style="color: var(--text-muted); font-weight: 700;">${set.targetReps}</td>
                    <td>
                      <div class="stepper-input">
                        <button class="step-btn" onclick="adjustWeight('${ex.id}', ${sIdx}, -2.5)">-</button>
                        <input type="number" step="0.5" class="weight-input" value="${set.weight}" onchange="updateWeight('${ex.id}', ${sIdx}, this.value)">
                        <button class="step-btn" onclick="adjustWeight('${ex.id}', ${sIdx}, +2.5)">+</button>
                      </div>
                    </td>
                    <td>
                      <div class="stepper-input">
                        <button class="step-btn" onclick="adjustReps('${ex.id}', ${sIdx}, -1)">-</button>
                        <input type="number" class="reps-input" value="${set.reps || set.targetReps}" onchange="updateReps('${ex.id}', ${sIdx}, this.value)">
                        <button class="step-btn" onclick="adjustReps('${ex.id}', ${sIdx}, +1)">+</button>
                      </div>
                    </td>
                    <td>
                      <button class="check-btn ${set.done ? 'checked' : ''}" onclick="toggleSetDone('${ex.id}', ${sIdx})">
                        ${set.done ? '✓' : '○'}
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 6px;">
          <button style="background: transparent; border: none; font-size: 0.78rem; font-weight: 700; color: var(--text-dim); cursor: pointer;" onclick="addSetToExercise('${ex.id}')">
            + Set Add
          </button>
          <button style="background: transparent; border: none; font-size: 0.78rem; font-weight: 700; color: #ef4444; cursor: pointer;" onclick="deleteExerciseDirect('${ex.id}')">
            Delete
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Steppers & Set Toggle
function adjustWeight(exId, setIdx, delta) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;
  let val = parseFloat(ex.sets[setIdx].weight) || 0;
  val = Math.max(0, val + delta);
  ex.sets[setIdx].weight = Math.round(val * 10) / 10;
  savePlan();
  renderWorkoutView();
}

function updateWeight(exId, setIdx, val) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;
  ex.sets[setIdx].weight = Math.max(0, parseFloat(val) || 0);
  savePlan();
}

function adjustReps(exId, setIdx, delta) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;
  let val = parseInt(ex.sets[setIdx].reps) || ex.sets[setIdx].targetReps || 0;
  val = Math.max(1, val + delta);
  ex.sets[setIdx].reps = val;
  savePlan();
  renderWorkoutView();
}

function updateReps(exId, setIdx, val) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;
  ex.sets[setIdx].reps = Math.max(1, parseInt(val) || 1);
  savePlan();
}

function toggleSetDone(exId, setIdx) {
  const ex = findExercise(exId);
  if (!ex || !ex.sets[setIdx]) return;

  const set = ex.sets[setIdx];
  set.done = !set.done;

  if (set.done) {
    startRestTimer(getRecommendedRestTime(set.type));
    logSetHistory(ex.name, set.weight, set.reps || set.targetReps);
  }

  savePlan();
  renderWorkoutView();
  renderHomeStats();
}

function getRecommendedRestTime(setType) {
  const t = (setType || '').toLowerCase();
  if (t.includes('heavy') || t.includes('power')) return 90;
  if (t.includes('moderate')) return 60;
  if (t.includes('burnout') || t.includes('light') || t.includes('pump')) return 45;
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

function deleteExerciseDirect(exId) {
  if (!confirm("Kya aap is exercise ko delete karna chahte hain?")) return;
  workoutPlan[currentDay].exercises = workoutPlan[currentDay].exercises.filter(e => e.id !== exId);
  savePlan();
  renderWorkoutView();
}

function findExercise(exId) {
  const dayData = workoutPlan[currentDay];
  if (!dayData || !dayData.exercises) return null;
  return dayData.exercises.find(e => e.id === exId);
}

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

// ----------------------------------------------------
// ACTIVITY & STATS LOGIC (Screen 5 in Reference)
// ----------------------------------------------------
function renderActivityStats() {
  let totalVolume = 0;
  let totalSets = 0;
  const prs = {};

  // From plan
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

  // From history
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

  const volEl = document.getElementById('actVolumeNum');
  if (volEl) volEl.innerText = `${Math.round(totalVolume).toLocaleString()} kg`;

  const legMove = document.getElementById('legendMove');
  const legSets = document.getElementById('legendSets');
  if (legMove) legMove.innerText = `${Math.round(totalVolume).toLocaleString()} / 5,000 kg`;
  if (legSets) legSets.innerText = `${totalSets} sets logged`;

  // Render PR list
  const prListEl = document.getElementById('activityPrList');
  if (prListEl) {
    const prEntries = Object.entries(prs).sort((a, b) => b[1] - a[1]).slice(0, 5);
    if (prEntries.length === 0) {
      prListEl.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-dim); text-align: center; padding: 10px;">Sets complete karne par aapke records yahan aayenge.</p>`;
    } else {
      prListEl.innerHTML = prEntries.map(([name, weight]) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(226, 232, 240, 0.7); font-size: 0.84rem;">
          <span style="font-weight: 700; color: var(--text-muted);">${escapeHtml(name)}</span>
          <span style="font-weight: 900; color: var(--primary);">${weight} kg</span>
        </div>
      `).join('');
    }
  }
}

function setTimePill(btn) {
  document.querySelectorAll('.time-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ----------------------------------------------------
// NUTRITION & FOOD LOGIC (Screen 6 in Reference)
// ----------------------------------------------------
function renderMeals() {
  const container = document.getElementById('mealsListContainer');
  if (!container) return;

  let consumedCalories = 0;
  const targetCalories = 2400;

  nutritionMeals.forEach(m => {
    if (m.done) {
      consumedCalories += (m.calories || 400);
    }
  });

  // Update Calorie Bar
  const consumedEl = document.getElementById('nutriConsumed');
  const barFillEl = document.getElementById('nutriBarFill');
  if (consumedEl) consumedEl.innerText = `${consumedCalories} / ${targetCalories} kcal`;
  if (barFillEl) {
    const pct = Math.min(100, Math.round((consumedCalories / targetCalories) * 100));
    barFillEl.style.width = `${pct}%`;
  }

  container.innerHTML = nutritionMeals.map((meal, idx) => `
    <div class="meal-item" onclick="toggleMealDone(${idx})">
      <div class="meal-left">
        <div class="meal-emoji-avatar">${meal.emoji || '🥗'}</div>
        <div class="meal-info">
          <span class="meal-name">${escapeHtml(meal.name)}</span>
          <span class="meal-desc">${escapeHtml(meal.desc || `${meal.calories || 400} kcal`)}</span>
        </div>
      </div>
      <button class="check-btn ${meal.done ? 'checked' : ''}" style="width: 28px; height: 28px;">
        ${meal.done ? '✓' : '○'}
      </button>
    </div>
  `).join('');
}

function toggleMealDone(idx) {
  if (!nutritionMeals[idx]) return;
  nutritionMeals[idx].done = !nutritionMeals[idx].done;
  saveMeals();
  renderMeals();
}

function openAddMealModal() {
  document.getElementById('mealInputName').value = '';
  document.getElementById('mealInputCalories').value = '';
  openModal('addMealModal');
}

function submitAddMeal(e) {
  e.preventDefault();
  const name = document.getElementById('mealInputName').value.trim();
  const calories = parseInt(document.getElementById('mealInputCalories').value) || 400;
  const type = document.getElementById('mealInputType').value || 'Snacks';

  if (!name) return;

  let emoji = '🥗';
  if (type === 'Breakfast') emoji = '🍳';
  else if (type === 'Dinner') emoji = '🍲';
  else if (type === 'Snacks') emoji = '🥛';

  nutritionMeals.push({
    id: 'm_' + Date.now(),
    name: name,
    desc: `${calories} kcal • Custom Log`,
    type: type,
    emoji: emoji,
    done: true,
    calories: calories
  });

  saveMeals();
  renderMeals();
  closeModal('addMealModal');
}

// ----------------------------------------------------
// REST STOPWATCH TIMER (Floating Widget)
// ----------------------------------------------------
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

function toggleRestTimerQuick() {
  const timerWidget = document.getElementById('restTimerWidget');
  if (timerWidget && timerWidget.classList.contains('visible')) {
    stopRestTimer();
  } else {
    startRestTimer(60);
  }
}

// ----------------------------------------------------
// SIDE DRAWER & NOTIFICATIONS
// ----------------------------------------------------
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
  closeSideDrawer();
  switchView('workouts');
}

function openNotificationsModal() {
  openModal('notificationsModal');
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
    renderHomeStats();
  }
}

// Modal: Add Custom Exercise
function openAddExerciseModal() {
  document.getElementById('addExName').value = '';
  document.getElementById('addExTarget').value = '';
  document.getElementById('addExNotes').value = '';
  openModal('addExerciseModal');
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

// Export & Import Data
function exportWorkoutData() {
  const data = {
    plan: workoutPlan,
    history: workoutHistory,
    meals: nutritionMeals,
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
      if (data.meals) {
        nutritionMeals = data.meals;
        saveMeals();
      }
      alert("✅ Data successfully restore ho gaya!");
      renderHomeStats();
      renderWorkoutView();
      renderMeals();
    } catch (err) {
      alert("❌ Invalid backup file!");
    }
  };
  reader.readAsText(file);
}

// Event Listeners Setup
function setupEventListeners() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  });
}

function checkPwaInstall() {
  // PWA Prompt
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Register Service Worker for 100% Offline Access
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

// Start App on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
