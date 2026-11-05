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

// Default Athlete Nutrition & Diet Meals (Clean Apple Health Style)
const DEFAULT_MEALS = [
  { id: 'm_1', name: 'Oatmeal with Berries & 4 Egg Whites', desc: '450 kcal • High Protein Breakfast', type: 'Breakfast', icon: 'breakfast', done: true, calories: 450 },
  { id: 'm_2', name: 'Grilled Chicken Breast / Paneer & Brown Rice', desc: '650 kcal • Lean Athletic Lunch', type: 'Lunch', icon: 'lunch', done: true, calories: 650 },
  { id: 'm_3', name: 'Fish Fillet / Yellow Dal with Sweet Potato', desc: '550 kcal • Clean Dinner Fuel', type: 'Dinner', icon: 'dinner', done: false, calories: 550 },
  { id: 'm_4', name: 'Whey Isolate Shake & Raw Almonds', desc: '350 kcal • Post-Workout Recovery', type: 'Snacks', icon: 'snacks', done: false, calories: 350 }
];

// Storage Keys
const STORAGE_PLAN = 'tushu_gym_plan_v2';
const STORAGE_HISTORY = 'tushu_gym_history_v2';
const STORAGE_MEALS = 'tushu_gym_meals_v1';
const STORAGE_ONBOARDED = 'tushu_onboarded_v1';
const STORAGE_REMINDERS = 'tushu_gym_reminders_v1';
const STORAGE_ROADMAP = 'tushu_gym_roadmap_v1';

function getTodayDateStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 3 Core Reminders for Virat-Kohli Athletic Aim
const DEFAULT_REMINDERS = {
  workout: {
    id: 'workout',
    title: 'Daily Training Call',
    time: '17:30',
    enabled: true,
    done: false,
    lastDoneDate: ''
  },
  hydrate: {
    id: 'hydrate',
    title: 'Hydration Protocol',
    time: '14:00',
    enabled: true,
    done: false,
    lastDoneDate: '',
    waterMl: 0,
    targetMl: 3500
  },
  fuel: {
    id: 'fuel',
    title: 'Post-Workout Fuel',
    time: '19:30',
    enabled: true,
    done: false,
    lastDoneDate: ''
  }
};

// Global State
let currentDay = getTodayDayKey();
let currentView = 'home';
let workoutPlan = loadPlan();
let workoutHistory = loadHistory();
let nutritionMeals = loadMeals();
let athleteRoadmap = null;
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

function loadRoadmap() {
  try {
    const saved = localStorage.getItem(STORAGE_ROADMAP);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error loading roadmap", e);
  }
  return generateRoadmapPlan({
    profile: 'tushu',
    guestName: '',
    duration: 30,
    diet: 'veg',
    hours: '1.5-2',
    goal: 'shred'
  });
}

function saveRoadmap() {
  try {
    localStorage.setItem(STORAGE_ROADMAP, JSON.stringify(athleteRoadmap));
  } catch (e) {
    console.error("Error saving roadmap", e);
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
  athleteRoadmap = loadRoadmap();
  checkOnboarding();
  renderWeeklyBars();
  renderHomeStats();
  renderWorkoutDayPills();
  renderWorkoutView();
  renderMeals();
  renderRoadmapHero();
  renderActivityStats();
  renderRemindersHub();
  updateNotificationBadge();
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
    renderRoadmapHero();
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
            <div class="ex-avatar">
              <span class="ex-index-num">${String(exIndex + 1).padStart(2, '0')}</span>
            </div>
            <div>
              <h3 class="ex-title">${escapeHtml(ex.name)}</h3>
              <span class="ex-target">${escapeHtml(ex.target || 'Athletic Focus')}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <button class="btn-demo-view" onclick="openExerciseDemoModal('${ex.id}')" title="Form Guide">
              <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><polygon points="6 4 18 12 6 20 6 4"/></svg>
              <span>Demo</span>
            </button>
            <span class="ex-progress-badge ${isAllDone ? 'done' : ''}">
              ${completedSets}/${totalSets}
            </span>
          </div>
        </div>

        ${ex.notes ? `
          <div class="coach-tip-callout">
            <span class="coach-tip-tag">Form Cue</span>
            <span class="coach-tip-text">${escapeHtml(ex.notes)}</span>
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
                let badgeClass = 'scheme-normal';
                const lower = (set.type || '').toLowerCase();
                if (lower.includes('heavy')) badgeClass = 'scheme-heavy';
                else if (lower.includes('moderate')) badgeClass = 'scheme-moderate';
                else if (lower.includes('light') || lower.includes('burnout') || lower.includes('pump')) badgeClass = 'scheme-burnout';

                return `
                  <tr class="set-row ${set.done ? 'row-completed' : ''}">
                    <td class="set-col-num">${set.setNum || sIdx + 1}</td>
                    <td>
                      <span class="scheme-pill ${badgeClass}">
                        ${escapeHtml(set.type || 'Normal')}
                      </span>
                    </td>
                    <td class="set-col-target">${set.targetReps}</td>
                    <td>
                      <div class="stepper-input">
                        <button class="step-btn" onclick="adjustWeight('${ex.id}', ${sIdx}, -2.5)" aria-label="Decrease weight">-</button>
                        <input type="number" step="0.5" class="weight-input" value="${set.weight}" onchange="updateWeight('${ex.id}', ${sIdx}, this.value)">
                        <button class="step-btn" onclick="adjustWeight('${ex.id}', ${sIdx}, +2.5)" aria-label="Increase weight">+</button>
                      </div>
                    </td>
                    <td>
                      <div class="stepper-input">
                        <button class="step-btn" onclick="adjustReps('${ex.id}', ${sIdx}, -1)" aria-label="Decrease reps">-</button>
                        <input type="number" class="reps-input" value="${set.reps || set.targetReps}" onchange="updateReps('${ex.id}', ${sIdx}, this.value)">
                        <button class="step-btn" onclick="adjustReps('${ex.id}', ${sIdx}, +1)" aria-label="Increase reps">+</button>
                      </div>
                    </td>
                    <td>
                      <button class="check-btn ${set.done ? 'checked' : ''}" onclick="toggleSetDone('${ex.id}', ${sIdx})" aria-label="Toggle set done">
                        ${set.done ? '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="ex-card-footer">
          <button class="btn-text-action" onclick="addSetToExercise('${ex.id}')">
            + Add Set
          </button>
          <button class="btn-text-action btn-danger-action" onclick="deleteExerciseDirect('${ex.id}')">
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
  if (typeof checkAndSyncTodayWorkoutReminder === 'function') {
    checkAndSyncTodayWorkoutReminder();
  }
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
      prListEl.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-tertiary); text-align: center; padding: 10px;">Sets complete karne par aapke records yahan aayenge.</p>`;
    } else {
      prListEl.innerHTML = prEntries.map(([name, weight]) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 0.5px solid rgba(0, 0, 0, 0.05); font-size: 0.84rem;">
          <span style="font-weight: 500; color: var(--text-secondary);">${escapeHtml(name)}</span>
          <span style="font-weight: 600; color: var(--apple-green-dark);">${weight} kg</span>
        </div>
      `).join('');
    }
  }
}

function setTimePill(btn) {
  document.querySelectorAll('.time-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Minimalist Vector Icon for Meals (Zero Emojis)
function getMealIconSvg(type) {
  const t = (type || '').toLowerCase();
  if (t === 'breakfast') {
    return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
  } else if (t === 'lunch') {
    return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`;
  } else if (t === 'dinner') {
    return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
  }
  return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>`;
}

// ----------------------------------------------------
// NUTRITION & FOOD LOGIC (Clean Apple Health Style)
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
        <div class="meal-avatar-icon">
          ${getMealIconSvg(meal.type)}
        </div>
        <div class="meal-info">
          <span class="meal-name">${escapeHtml(meal.name)}</span>
          <span class="meal-desc">${escapeHtml(meal.desc || `${meal.calories || 400} kcal`)}</span>
        </div>
      </div>
      <button class="check-btn ${meal.done ? 'checked' : ''}" style="width: 28px; height: 28px;" aria-label="Toggle meal">
        ${meal.done ? '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
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

  nutritionMeals.push({
    id: 'm_' + Date.now(),
    name: name,
    desc: `${calories} kcal • Custom Meal`,
    type: type,
    done: true,
    calories: calories
  });

  saveMeals();
  renderMeals();
  closeModal('addMealModal');
}

// ----------------------------------------------------
// ATHLETE DIET & GYM ROADMAP ENGINE (Offline Generator)
// ----------------------------------------------------
let roadmapFormState = {
  profile: 'tushu',
  guestName: '',
  duration: 30,
  diet: 'veg',
  hours: '1.5-2',
  goal: 'shred'
};
let activeRoadmapDetailsTab = 'diet';

function generateRoadmapPlan(options) {
  const isGuest = options.profile === 'guest';
  const profileName = isGuest ? (options.guestName && options.guestName.trim() ? options.guestName.trim() : 'Guest Athlete') : 'Tushu';
  const duration = parseInt(options.duration) || 30;
  const diet = options.diet || 'veg';
  const hours = options.hours || '1.5-2';
  const goal = options.goal || 'shred';

  let targetCalories = 2400;
  let proteinGrams = 160;
  let carbsGrams = 220;
  let fatsGrams = 60;
  let dietLabel = 'High-Protein Vegetarian';

  if (goal === 'bulk') {
    targetCalories = 2750;
    proteinGrams = 175;
    carbsGrams = 290;
    fatsGrams = 70;
  } else if (goal === 'shred') {
    targetCalories = 2250;
    proteinGrams = 165;
    carbsGrams = 195;
    fatsGrams = 52;
  }

  let meals = [];
  if (diet === 'veg') {
    dietLabel = 'High-Protein Vegetarian';
    meals = [
      {
        timing: '07:00 AM',
        name: 'Morning Hydration & Mineral Shot',
        desc: '500ml Warm Lemon Water + 6 Soaked Almonds + 2 Walnuts + Pink Himalayan Salt',
        calories: 95,
        protein: 3,
        carbs: 4,
        fats: 7,
        type: 'Breakfast'
      },
      {
        timing: '08:30 AM',
        name: 'High-Torque Athlete Oatmeal Bowl',
        desc: '65g Rolled Oats in 250ml Skimmed Milk, 1 Scoop Whey/Plant Protein, 1 sliced Banana & 1 tbsp Chia Seeds',
        calories: 520,
        protein: 34,
        carbs: 65,
        fats: 11,
        type: 'Breakfast'
      },
      {
        timing: '11:30 AM',
        name: 'Mid-Morning Alkaline Sprouts Chaat',
        desc: '1 Big Bowl Boiled Moong & Kala Chana Sprouts with fresh Lemon juice, diced Cucumber, Tomato & Coriander',
        calories: 190,
        protein: 13,
        carbs: 28,
        fats: 2,
        type: 'Snacks'
      },
      {
        timing: '01:30 PM',
        name: 'Athletic Power Lunch (Paneer & Dal)',
        desc: '150g Grilled Low-Fat Paneer / Tofu, 1 Bowl Thick Moong/Arhar Dal, 1 Cup Brown Rice or 2 Multigrain Rotis, Big Green Salad',
        calories: 680,
        protein: 42,
        carbs: 68,
        fats: 18,
        type: 'Lunch'
      },
      {
        timing: '05:00 PM',
        name: 'Pre-Workout Explosive Fuel (45 min prior)',
        desc: '1 Ripe Banana + 1 tbsp Natural Peanut Butter + 1 Cup Sugar-Free Black Coffee or Green Tea (Instant glycogen + caffeine drive)',
        calories: 220,
        protein: 6,
        carbs: 34,
        fats: 8,
        type: 'Snacks'
      },
      {
        timing: '07:30 PM',
        name: 'Post-Workout Anabolic Recovery',
        desc: '1 Scoop Whey Protein Isolate in 300ml Water + 1 Medium Boiled Sweet Potato (Muscle protein synthesis window)',
        calories: 275,
        protein: 27,
        carbs: 38,
        fats: 2,
        type: 'Dinner'
      },
      {
        timing: '09:00 PM',
        name: 'Night Recovery Sautéed Bowl',
        desc: '100g Sautéed Paneer / Soya Chunks with Steamed Broccoli, Green Beans, Capsicum + 1 Soft Phulka',
        calories: 420,
        protein: 30,
        carbs: 32,
        fats: 14,
        type: 'Dinner'
      }
    ];
  } else if (diet === 'non-veg') {
    dietLabel = 'Lean Athletic Non-Vegetarian';
    meals = [
      {
        timing: '07:00 AM',
        name: 'Morning Hydration & Mineral Shot',
        desc: '500ml Warm Lime Water + 6 Soaked Almonds + 2 Walnuts',
        calories: 95,
        protein: 3,
        carbs: 4,
        fats: 7,
        type: 'Breakfast'
      },
      {
        timing: '08:30 AM',
        name: 'Athlete Egg Power Breakfast',
        desc: '4 Egg Whites + 2 Whole Eggs Scrambled with Spinach & Mushrooms, 2 Slices Whole Grain Toast, 1 Sliced Apple',
        calories: 490,
        protein: 36,
        carbs: 44,
        fats: 14,
        type: 'Breakfast'
      },
      {
        timing: '11:30 AM',
        name: 'Mid-Morning Clean Protein Snack',
        desc: '1 Bowl Boiled Chana Chaat or 150g Low Fat Greek Yogurt with roasted Flaxseeds',
        calories: 180,
        protein: 15,
        carbs: 22,
        fats: 3,
        type: 'Snacks'
      },
      {
        timing: '01:30 PM',
        name: 'Athlete Lean Shred Lunch',
        desc: '180g Grilled Lemon-Herb Chicken Breast or Fish Fillet, 1 Cup Steamed Brown Rice, 1 Bowl Yellow Dal, Fresh Cucumber Salad',
        calories: 660,
        protein: 52,
        carbs: 60,
        fats: 12,
        type: 'Lunch'
      },
      {
        timing: '05:00 PM',
        name: 'Pre-Workout Glycogen Primer',
        desc: '1 Banana + 1 tbsp Peanut Butter + 1 Shot Black Coffee (45 mins prior to heavy lifts)',
        calories: 220,
        protein: 6,
        carbs: 34,
        fats: 8,
        type: 'Snacks'
      },
      {
        timing: '07:30 PM',
        name: 'Post-Workout Anabolic Fuel',
        desc: '1 Scoop Whey Protein Isolate with Water + 5 Boiled Egg Whites + 1 Boiled Sweet Potato',
        calories: 290,
        protein: 38,
        carbs: 32,
        fats: 2,
        type: 'Dinner'
      },
      {
        timing: '09:00 PM',
        name: 'Night Repair Dinner',
        desc: '160g Pan-Seared Chicken Breast / White Fish with Sautéed Broccoli, Zucchini, Carrots + 1 Small Multigrain Roti',
        calories: 390,
        protein: 44,
        carbs: 25,
        fats: 9,
        type: 'Dinner'
      }
    ];
  } else {
    dietLabel = 'Eggetarian Athletic Fuel';
    meals = [
      {
        timing: '07:00 AM',
        name: 'Morning Hydration & Mineral Shot',
        desc: '500ml Warm Lime Water + 6 Soaked Almonds + 2 Walnuts',
        calories: 95,
        protein: 3,
        carbs: 4,
        fats: 7,
        type: 'Breakfast'
      },
      {
        timing: '08:30 AM',
        name: 'Eggs & Oatmeal Champion Breakfast',
        desc: '4 Boiled / Poached Egg Whites + 50g Rolled Oats with 200ml Milk, Banana & Chia seeds',
        calories: 490,
        protein: 34,
        carbs: 58,
        fats: 10,
        type: 'Breakfast'
      },
      {
        timing: '11:30 AM',
        name: 'Mid-Morning Sprouts Bowl',
        desc: '1 Big Bowl Mixed Sprouts (Moong & Chana) with Lemon Juice, Tomatoes & Rock Salt',
        calories: 180,
        protein: 12,
        carbs: 26,
        fats: 2,
        type: 'Snacks'
      },
      {
        timing: '01:30 PM',
        name: 'Paneer, Eggs & Dal Power Lunch',
        desc: '120g Grilled Low-Fat Paneer + 2 Boiled Eggs, 1 Cup Brown Rice, 1 Bowl Dal, Green Salad',
        calories: 670,
        protein: 45,
        carbs: 62,
        fats: 16,
        type: 'Lunch'
      },
      {
        timing: '05:00 PM',
        name: 'Pre-Workout Natural Fuel',
        desc: '1 Banana + 1 tbsp Peanut Butter + Black Coffee / Green Tea',
        calories: 220,
        protein: 6,
        carbs: 34,
        fats: 8,
        type: 'Snacks'
      },
      {
        timing: '07:30 PM',
        name: 'Post-Workout Rapid Recovery',
        desc: '1 Scoop Whey Protein Isolate + 4 Boiled Egg Whites + 1 Sweet Potato',
        calories: 280,
        protein: 35,
        carbs: 32,
        fats: 2,
        type: 'Dinner'
      },
      {
        timing: '09:00 PM',
        name: 'Light Egg Bhurji & Greens Dinner',
        desc: '3 Egg Whites + 1 Whole Egg Bhurji with Bell Peppers, Onions & Tomatoes + 50g Grilled Paneer + 1 Phulka',
        calories: 400,
        protein: 32,
        carbs: 28,
        fats: 13,
        type: 'Dinner'
      }
    ];
  }

  let hoursAllocation = [];
  let hoursLabel = '1.5 - 2 Hours / Day';

  if (hours === '1.5-2') {
    hoursLabel = '1.5 - 2 Hours / Day (Elite Athlete)';
    hoursAllocation = [
      { time: '15 Min', name: 'Dynamic Warmup & Agility', desc: 'Arm swings, thoracic rotations, hip openers, band pull-aparts, 2 min light jump rope to elevate core temperature.' },
      { time: '65 Min', name: 'Reverse Pyramid 7-12-15 Lifts', desc: 'Main muscle group compound work: Heavy Set 1 (7 reps @ high torque), Moderate Set 2 (12 reps hypertrophy), Burnout Set 3 (15 reps pump).' },
      { time: '15 Min', name: 'Core Armor & Rotational Power', desc: 'Hanging knee/leg raises, farmer walks with heavy dumbbells, RKC planks. Crucial for functional sports power.' },
      { time: '10 Min', name: 'Cooldown & Decompression', desc: 'Foam rolling calves and quads, doorway chest stretch, diaphragmatic belly breathing to shift into parasympathetic recovery.' }
    ];
  } else if (hours === '1') {
    hoursLabel = '60 - 75 Min / Day (Balanced Sportsman)';
    hoursAllocation = [
      { time: '10 Min', name: 'Dynamic Joint Mobility', desc: 'Joint circles, band warmups, bodyweight lunges and pushups.' },
      { time: '45 Min', name: '7-12-15 Strength Circuit', desc: '4-5 primary lifts targeting the daily muscle split with strict rest intervals.' },
      { time: '10 Min', name: 'Core & Static Stretching', desc: 'Plank holds, hanging knee raises and posterior chain stretches.' }
    ];
  } else {
    hoursLabel = '45 Min / Day (Express High-Torque)';
    hoursAllocation = [
      { time: '5 Min', name: 'Rapid Warmup', desc: 'Jumping jacks, shoulder rotations, hip circles.' },
      { time: '35 Min', name: 'High-Density Supersets (7-12-15)', desc: 'Antagonistic muscle supersets with strict 60-second rest intervals.' },
      { time: '5 Min', name: 'Immediate Cooldown', desc: 'Deep hamstring stretch and shoulder dislocates.' }
    ];
  }

  const splitSchedule = [
    { day: 'Monday', target: 'Chest & Athletic Core', intensity: 'Heavy Push', keyExercises: 'Incline DB Press (7-12-15), Flat Barbell Press, Weighted Dips, Cable Flyes, Hanging Leg Raises' },
    { day: 'Tuesday', target: 'Back & Posterior Chain', intensity: 'V-Taper Pull', keyExercises: 'Deadlifts (7-12-15), Lat Pulldowns, Bent-Over Rows, Single Arm DB Rows, Face Pulls' },
    { day: 'Wednesday', target: 'Shoulders (Delts) & Core', intensity: '3D Delts', keyExercises: 'Overhead Barbell Press, Lateral Raises, Reverse Pec Deck, Shrugs, Russian Twists' },
    { day: 'Thursday', target: 'Arms & Grip Power', intensity: 'Hypertrophy & Grip', keyExercises: 'Barbell Curls, Incline DB Curls, Skull Crushers, Cable Pushdowns, Heavy Farmer Carries' },
    { day: 'Friday', target: 'Legs & Explosive Glutes', intensity: 'Maximum Force', keyExercises: 'Barbell Back Squats (7-12-15), Romanian Deadlifts, Leg Press, Walking DB Lunges, Calf Raises' },
    { day: 'Saturday', target: 'Full Body Conditioning & Core', intensity: 'Metabolic Athletic', keyExercises: 'Kettlebell Swings, Push-up into Row, Pull-ups, Ab Wheel Rollouts, 3x60s Planks' },
    { day: 'Sunday', target: 'Active Recovery & Regeneration', intensity: 'Mobility Walk', keyExercises: '7,000 brisk steps walk in fresh air, 20 min full body mobility flow, hydration & sleep focus' }
  ];

  return {
    profileName: profileName,
    isGuest: isGuest,
    durationDays: duration,
    startDate: getTodayDateStr(),
    dietType: diet,
    dietLabel: dietLabel,
    gymHoursPerDay: hours,
    gymHoursLabel: hoursLabel,
    goal: goal,
    goalLabel: goal === 'shred' ? 'Virat Kohli Athletic Lean Shred' : 'Clean Muscle Hypertrophy',
    targetCalories: targetCalories,
    proteinGrams: proteinGrams,
    carbsGrams: carbsGrams,
    fatsGrams: fatsGrams,
    meals: meals,
    hoursAllocation: hoursAllocation,
    splitSchedule: splitSchedule,
    createdAt: new Date().toISOString()
  };
}

function renderRoadmapHero() {
  const container = document.getElementById('roadmapHeroCard');
  if (!container) return;

  if (!athleteRoadmap) {
    athleteRoadmap = loadRoadmap();
  }

  // Calculate day progress
  const start = new Date(athleteRoadmap.startDate || getTodayDateStr());
  const now = new Date(getTodayDateStr());
  const diffTime = Math.max(0, now.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const currentDayNum = Math.min(athleteRoadmap.durationDays, Math.max(1, diffDays));
  const progressPct = Math.min(100, Math.round((currentDayNum / athleteRoadmap.durationDays) * 100));

  // Update target display in Nutrition view
  const targetDisplay = document.getElementById('nutriTargetDisplay');
  if (targetDisplay) targetDisplay.innerHTML = `${athleteRoadmap.targetCalories.toLocaleString()} <span style="font-size: 0.92rem; color: var(--text-tertiary); font-weight: 400;">kcal</span>`;
  
  const carbsVal = document.getElementById('macroCarbsVal');
  if (carbsVal) carbsVal.innerText = `${athleteRoadmap.carbsGrams}g`;
  const proteinVal = document.getElementById('macroProteinVal');
  if (proteinVal) proteinVal.innerText = `${athleteRoadmap.proteinGrams}g`;
  const fatsVal = document.getElementById('macroFatsVal');
  if (fatsVal) fatsVal.innerText = `${athleteRoadmap.fatsGrams}g`;

  const badgeEl = document.getElementById('nutriDietBadge');
  if (badgeEl) badgeEl.innerText = athleteRoadmap.dietType.toUpperCase();

  container.innerHTML = `
    <div class="roadmap-header-row">
      <div class="roadmap-title-area">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
          <h3>${escapeHtml(athleteRoadmap.profileName)}'s Roadmap</h3>
          <span class="roadmap-badge">${athleteRoadmap.durationDays} DAYS</span>
        </div>
        <span>${escapeHtml(athleteRoadmap.dietLabel)} • ${escapeHtml(athleteRoadmap.gymHoursLabel)}</span>
      </div>
      <button class="icon-btn" onclick="openRoadmapModal()" title="Customize Roadmap" aria-label="Customize Roadmap" style="width: 32px; height: 32px;">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
      </button>
    </div>

    <div class="roadmap-progress-wrap">
      <div class="roadmap-progress-labels">
        <span>Day ${currentDayNum} of ${athleteRoadmap.durationDays}</span>
        <span>${progressPct}% Completed</span>
      </div>
      <div class="roadmap-progress-bar">
        <div class="roadmap-progress-fill" style="width: ${progressPct}%;"></div>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.74rem; color: var(--text-secondary); margin-bottom: 12px; background: rgba(0,0,0,0.025); padding: 8px 10px; border-radius: var(--radius-xs);">
      <span>Daily Target: <b>${athleteRoadmap.targetCalories} kcal</b></span>
      <span>Protein: <b>${athleteRoadmap.proteinGrams}g</b></span>
      <span>Gym: <b>${athleteRoadmap.gymHoursPerDay}h/day</b></span>
    </div>

    <div class="roadmap-btn-row">
      <button class="btn btn-outline" onclick="openRoadmapDetailsModal()" style="flex: 1; font-size: 0.78rem; padding: 7px 12px; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        Full Diet & Gym Plan
      </button>
      <button class="btn btn-primary" onclick="applyRoadmapToToday()" style="background: var(--apple-green-dark); color: #ffffff; flex: 1; font-size: 0.78rem; padding: 7px 12px; display: inline-flex; align-items: center; justify-content: center; gap: 5px;">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Apply Meals to Today
      </button>
    </div>
  `;
}

// Modal Helpers & Pill Selectors
function selectRoadmapProfile(p) {
  roadmapFormState.profile = p;
  const grid = document.getElementById('profileSelectorGrid');
  if (grid) {
    grid.querySelectorAll('.option-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-profile') === p);
    });
  }
  const inputWrap = document.getElementById('guestNameInputWrap');
  if (inputWrap) {
    inputWrap.style.display = p === 'guest' ? 'block' : 'none';
  }
}

function selectRoadmapDuration(days) {
  roadmapFormState.duration = days;
  const grid = document.getElementById('durationSelectorGrid');
  if (grid) {
    grid.querySelectorAll('.option-pill').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-days')) === days);
    });
  }
}

function selectRoadmapDiet(diet) {
  roadmapFormState.diet = diet;
  const grid = document.getElementById('dietSelectorGrid');
  if (grid) {
    grid.querySelectorAll('.option-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-diet') === diet);
    });
  }
}

function selectRoadmapHours(hours) {
  roadmapFormState.hours = hours;
  const grid = document.getElementById('hoursSelectorGrid');
  if (grid) {
    grid.querySelectorAll('.option-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-hours') === hours);
    });
  }
}

function selectRoadmapGoal(goal) {
  roadmapFormState.goal = goal;
  const grid = document.getElementById('goalSelectorGrid');
  if (grid) {
    grid.querySelectorAll('.option-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-goal') === goal);
    });
  }
}

function openRoadmapModal() {
  if (athleteRoadmap) {
    roadmapFormState.profile = athleteRoadmap.isGuest ? 'guest' : 'tushu';
    roadmapFormState.guestName = athleteRoadmap.isGuest ? athleteRoadmap.profileName : '';
    roadmapFormState.duration = athleteRoadmap.durationDays;
    roadmapFormState.diet = athleteRoadmap.dietType;
    roadmapFormState.hours = athleteRoadmap.gymHoursPerDay;
    roadmapFormState.goal = athleteRoadmap.goal;

    const guestInput = document.getElementById('roadmapGuestName');
    if (guestInput) guestInput.value = roadmapFormState.guestName;
  }
  selectRoadmapProfile(roadmapFormState.profile);
  selectRoadmapDuration(roadmapFormState.duration);
  selectRoadmapDiet(roadmapFormState.diet);
  selectRoadmapHours(roadmapFormState.hours);
  selectRoadmapGoal(roadmapFormState.goal);

  openModal('roadmapModal');
}

function submitRoadmapGenerator(e) {
  e.preventDefault();
  if (roadmapFormState.profile === 'guest') {
    const inputEl = document.getElementById('roadmapGuestName');
    roadmapFormState.guestName = inputEl ? inputEl.value.trim() : '';
  }
  athleteRoadmap = generateRoadmapPlan(roadmapFormState);
  saveRoadmap();
  renderRoadmapHero();
  closeModal('roadmapModal');
  openRoadmapDetailsModal();
}

function openRoadmapDetailsModal() {
  if (!athleteRoadmap) athleteRoadmap = loadRoadmap();

  const titleEl = document.getElementById('detailsModalTitle');
  if (titleEl) titleEl.innerText = `${athleteRoadmap.profileName}'s Roadmap`;

  const badgeEl = document.getElementById('detailsModalBadge');
  if (badgeEl) badgeEl.innerText = `${athleteRoadmap.durationDays}-DAY ${athleteRoadmap.dietType.toUpperCase()}`;

  const subEl = document.getElementById('detailsModalSub');
  if (subEl) subEl.innerText = `${athleteRoadmap.dietLabel.toUpperCase()} • ${athleteRoadmap.gymHoursLabel.toUpperCase()}`;

  activeRoadmapDetailsTab = 'diet';
  switchRoadmapDetailsTab('diet');
  openModal('roadmapDetailsModal');
}

function switchRoadmapDetailsTab(tab) {
  activeRoadmapDetailsTab = tab;
  const dietBtn = document.getElementById('btnDetailsTabDiet');
  const gymBtn = document.getElementById('btnDetailsTabGym');
  if (dietBtn) dietBtn.classList.toggle('active', tab === 'diet');
  if (gymBtn) gymBtn.classList.toggle('active', tab === 'gym');
  renderRoadmapDetailsContent(tab);
}

function renderRoadmapDetailsContent(tab) {
  const container = document.getElementById('roadmapDetailsBody');
  if (!container || !athleteRoadmap) return;

  if (tab === 'diet') {
    container.innerHTML = `
      <div style="background: rgba(52, 199, 89, 0.08); border: 0.5px solid rgba(52, 199, 89, 0.2); border-radius: var(--radius-sm); padding: 12px 14px; margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span style="font-size: 0.74rem; font-weight: 700; color: var(--apple-green-dark); text-transform: uppercase;">Daily Fuel Target</span>
          <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-primary);">${athleteRoadmap.targetCalories} kcal</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-secondary);">
          <span>Protein: <b>${athleteRoadmap.proteinGrams}g</b></span>
          <span>Carbs: <b>${athleteRoadmap.carbsGrams}g</b></span>
          <span>Fats: <b>${athleteRoadmap.fatsGrams}g</b></span>
        </div>
      </div>

      <div class="roadmap-timeline">
        ${athleteRoadmap.meals.map(m => `
          <div class="roadmap-timeline-card">
            <div class="roadmap-timeline-header">
              <span class="roadmap-timing-pill">${m.timing}</span>
              <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-tertiary);">${m.type}</span>
            </div>
            <div class="roadmap-meal-title">${escapeHtml(m.name)}</div>
            <div class="roadmap-meal-desc">${escapeHtml(m.desc)}</div>
            <div class="roadmap-macro-mini">
              <span>Calories: <b>${m.calories} kcal</b></span>
              <span>Protein: <b>${m.protein}g</b></span>
              <span>Carbs: <b>${m.carbs}g</b></span>
              <span>Fats: <b>${m.fats}g</b></span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="roadmap-hours-card">
        <div style="font-size: 0.74rem; font-weight: 700; color: var(--apple-green-dark); text-transform: uppercase; margin-bottom: 6px;">
          Daily Time Commitment: ${escapeHtml(athleteRoadmap.gymHoursLabel)}
        </div>
        <div style="font-size: 0.75rem; color: var(--text-tertiary); margin-bottom: 10px;">
          Athletic 7-12-15 Reverse Pyramid Protocol for maximum neuromuscular torque & functional power.
        </div>
        ${athleteRoadmap.hoursAllocation.map(h => `
          <div class="roadmap-hours-step">
            <div class="roadmap-step-time">${h.time}</div>
            <div class="roadmap-step-info">
              <div class="roadmap-step-name">${escapeHtml(h.name)}</div>
              <div class="roadmap-step-desc">${escapeHtml(h.desc)}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="font-size: 0.76rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.02em; margin: 14px 0 8px;">
        7-Day Athletic Training Split
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${athleteRoadmap.splitSchedule.map(s => `
          <div class="roadmap-split-card">
            <div class="roadmap-split-header">
              <span class="roadmap-split-day">${s.day}: ${escapeHtml(s.target)}</span>
              <span class="roadmap-split-badge">${s.intensity}</span>
            </div>
            <div class="roadmap-split-exercises">
              <b>Key Lifts:</b> ${escapeHtml(s.keyExercises)}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top: 14px; background: rgba(0,0,0,0.03); border-radius: var(--radius-sm); padding: 12px 14px; font-size: 0.74rem; color: var(--text-secondary); line-height: 1.45;">
        <b style="color: var(--text-primary);">Athlete Coaching Rules:</b><br>
        1. <b>Strict Form:</b> Zero momentum, explode on concentric (1s), control eccentric (2s).<br>
        2. <b>Rest Interval:</b> 90s - 120s between Heavy 7s; 60s between Moderate 12s.<br>
        3. <b>Hydration:</b> 3.5 - 4 Litres pure water daily. Keep electrolytes balanced.
      </div>
    `;
  }
}

function applyRoadmapToToday() {
  if (!athleteRoadmap || !athleteRoadmap.meals) return;

  nutritionMeals = athleteRoadmap.meals.map((meal, idx) => ({
    id: 'rm_' + Date.now() + '_' + idx,
    name: meal.name,
    desc: `${meal.timing} • ${meal.calories} kcal • ${meal.desc}`,
    type: meal.type,
    calories: meal.calories,
    done: false
  }));

  saveMeals();
  renderMeals();
  renderRoadmapHero();
  closeModal('roadmapDetailsModal');

  if (window.AndroidBridge && typeof window.AndroidBridge.vibratePhone === 'function') {
    window.AndroidBridge.vibratePhone(50);
  }
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

// ----------------------------------------------------
// REDUX-PATTERN OFFLINE REMINDER & NOTIFICATION ENGINE
// ----------------------------------------------------
function loadRemindersState() {
  try {
    const raw = localStorage.getItem(STORAGE_REMINDERS);
    let parsed = raw ? JSON.parse(raw) : null;
    if (!parsed) parsed = JSON.parse(JSON.stringify(DEFAULT_REMINDERS));
    
    const todayStr = getTodayDateStr();

    Object.keys(DEFAULT_REMINDERS).forEach(k => {
      if (!parsed[k]) {
        parsed[k] = JSON.parse(JSON.stringify(DEFAULT_REMINDERS[k]));
      }
      // Daily reset: if last marked done on a previous date, auto-reset for today
      if (parsed[k].lastDoneDate && parsed[k].lastDoneDate !== todayStr) {
        parsed[k].done = false;
        if (k === 'hydrate') parsed[k].waterMl = 0;
      }
      // Check if Android Native SharedPreferences marked it done
      if (window.Android && typeof window.Android.isReminderDoneToday === 'function') {
        if (window.Android.isReminderDoneToday(k)) {
          parsed[k].done = true;
          parsed[k].lastDoneDate = todayStr;
        }
      }
    });

    return parsed;
  } catch (e) {
    console.error('Error loading reminders:', e);
    return JSON.parse(JSON.stringify(DEFAULT_REMINDERS));
  }
}

function saveRemindersState(reminders) {
  try {
    localStorage.setItem(STORAGE_REMINDERS, JSON.stringify(reminders));
  } catch (e) {
    console.error('Error saving reminders:', e);
  }
}

// Redux-Pattern Predictable State Store (Zero-Bug Tracking)
const ReduxStore = (function() {
  let state = {
    reminders: loadRemindersState(),
    actionHistory: []
  };

  const listeners = [];

  function reducer(currentState, action) {
    const todayStr = getTodayDateStr();

    // Log action for deterministic bug-free traceability
    currentState.actionHistory.push({
      action: action.type,
      payload: action.payload,
      timestamp: new Date().toLocaleTimeString()
    });
    if (currentState.actionHistory.length > 30) currentState.actionHistory.shift();

    switch (action.type) {
      case 'TOGGLE_REMINDER_DONE': {
        const { id } = action.payload;
        const current = currentState.reminders[id];
        if (!current) return currentState;

        const newDone = !current.done;
        const updatedReminders = {
          ...currentState.reminders,
          [id]: {
            ...current,
            done: newDone,
            lastDoneDate: newDone ? todayStr : ''
          }
        };

        if (id === 'hydrate' && newDone) {
          updatedReminders.hydrate.waterMl = updatedReminders.hydrate.targetMl || 3500;
        }

        saveRemindersState(updatedReminders);
        syncReminderWithAndroid(id, updatedReminders[id]);
        return { ...currentState, reminders: updatedReminders };
      }

      case 'SET_REMINDER_DONE_EXPLICIT': {
        const { id, done } = action.payload;
        const current = currentState.reminders[id];
        if (!current) return currentState;

        const updatedReminders = {
          ...currentState.reminders,
          [id]: {
            ...current,
            done: done,
            lastDoneDate: done ? todayStr : ''
          }
        };

        saveRemindersState(updatedReminders);
        syncReminderWithAndroid(id, updatedReminders[id]);
        return { ...currentState, reminders: updatedReminders };
      }

      case 'UPDATE_REMINDER_TIME': {
        const { id, time } = action.payload;
        const current = currentState.reminders[id];
        if (!current) return currentState;

        const updatedReminders = {
          ...currentState.reminders,
          [id]: {
            ...current,
            time: time
          }
        };

        saveRemindersState(updatedReminders);
        syncReminderWithAndroid(id, updatedReminders[id]);
        return { ...currentState, reminders: updatedReminders };
      }

      case 'TOGGLE_REMINDER_ENABLED': {
        const { id, enabled } = action.payload;
        const current = currentState.reminders[id];
        if (!current) return currentState;

        const updatedReminders = {
          ...currentState.reminders,
          [id]: {
            ...current,
            enabled: enabled
          }
        };

        saveRemindersState(updatedReminders);
        syncReminderWithAndroid(id, updatedReminders[id]);
        return { ...currentState, reminders: updatedReminders };
      }

      case 'LOG_WATER': {
        const { amount } = action.payload;
        const current = currentState.reminders.hydrate;
        const target = current.targetMl || 3500;
        const newWater = Math.max(0, (current.waterMl || 0) + amount);
        const isDone = newWater >= target;

        const updatedReminders = {
          ...currentState.reminders,
          hydrate: {
            ...current,
            waterMl: newWater,
            done: isDone,
            lastDoneDate: isDone ? todayStr : current.lastDoneDate
          }
        };

        saveRemindersState(updatedReminders);
        syncReminderWithAndroid('hydrate', updatedReminders.hydrate);
        return { ...currentState, reminders: updatedReminders };
      }

      default:
        return currentState;
    }
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(fn => fn(state, action));
  }

  function getState() {
    return state;
  }

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      const idx = listeners.indexOf(fn);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }

  return { dispatch, getState, subscribe };
})();

// Native Android AlarmManager & Storage Synchronization
function syncReminderWithAndroid(id, rem) {
  if (window.Android) {
    if (rem.done) {
      if (typeof window.Android.markReminderDone === 'function') {
        window.Android.markReminderDone(id);
      }
      if (typeof window.Android.cancelReminder === 'function') {
        window.Android.cancelReminder(id);
      }
      if (typeof window.Android.vibratePhone === 'function') {
        window.Android.vibratePhone(40);
      }
    } else if (rem.enabled) {
      if (typeof window.Android.scheduleReminder === 'function') {
        const [hStr, mStr] = (rem.time || '17:30').split(':');
        const hour = parseInt(hStr, 10) || 17;
        const min = parseInt(mStr, 10) || 30;
        let title = 'Tushu Gym Plan';
        let msg = 'Target pending hai. Tap to complete!';
        if (id === 'workout') {
          const dayData = workoutPlan[getTodayDayKey()] || {};
          title = 'Training Call: ' + (dayData.title || 'Workout');
          msg = 'Aaj ka session pending hai. 7-12-15 protocol shuru karein!';
        } else if (id === 'hydrate') {
          title = 'Hydration Alert';
          msg = 'Hydration pending! 500ml water intake lo muscle pumps ke liye.';
        } else if (id === 'fuel') {
          title = 'Post-Workout Fuel Alert';
          msg = 'Fuel pending! 30g protein consume karke micro-tears repair karein.';
        }
        window.Android.scheduleReminder(id, hour, min, title, msg);
      }
    } else {
      if (typeof window.Android.cancelReminder === 'function') {
        window.Android.cancelReminder(id);
      }
    }
  }
}

// Render the 3 Athletic Reminders into the Hub
function renderRemindersHub() {
  const container = document.getElementById('remindersListContainer');
  if (!container) return;

  const state = ReduxStore.getState();
  const reminders = state.reminders;
  const todayKey = getTodayDayKey();
  const todayWorkout = workoutPlan[todayKey] || {};

  let completedCount = 0;
  const totalCount = 3;

  const remList = [
    {
      id: 'workout',
      key: 'workout',
      title: 'Daily Training Call',
      sub: `${todayWorkout.name || 'Today'}: ${todayWorkout.title || 'Workout Session'}`,
      iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"/></svg>`,
      pendingMsg: `Aapne aaj ka ${todayWorkout.title || 'workout'} abhi tak complete nahi kiya hai. Pehla set heavy 7 reps se start karein!`,
      doneMsg: `Done! Aaj ka training session (${todayWorkout.title || 'Workout'}) complete ho chuka hai.`,
      actionBtnText: 'Open Workout →',
      onAction: "jumpToReminderView('workouts')"
    },
    {
      id: 'hydrate',
      key: 'hydrate',
      title: 'Hydration Protocol',
      sub: '3.5L Daily Goal • Fluid Balance',
      iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
      pendingMsg: 'Hydration pending! Muscle pumps aur athletic power ke liye 500ml water intake lo.',
      doneMsg: 'Target Reached! Aaj ka 3.5L water target achieve ho chuka hai.',
      isWater: true
    },
    {
      id: 'fuel',
      key: 'fuel',
      title: 'Post-Workout Fuel',
      sub: '30g High Protein • Recovery Window',
      iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`,
      pendingMsg: 'Fuel pending! Anabolic recovery window active hai. High protein fuel log karein.',
      doneMsg: 'Done! Post-workout recovery fuel log ho chuka hai.',
      actionBtnText: 'Open Nutrition →',
      onAction: "jumpToReminderView('nutrition')"
    }
  ];

  container.innerHTML = remList.map(item => {
    const rem = reminders[item.key] || DEFAULT_REMINDERS[item.key];
    if (rem.done) completedCount++;

    return `
      <div class="reminder-card ${rem.done ? 'card-done' : ''}" id="remCard_${item.id}">
        <div class="reminder-top-row">
          <div class="reminder-title-wrap">
            <div class="reminder-icon-box">
              ${item.iconSvg}
            </div>
            <div>
              <div class="reminder-title">${item.title}</div>
              <div class="reminder-sub">${item.sub}</div>
            </div>
          </div>
          <div>
            ${rem.done 
              ? '<span class="status-pill status-done"><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align: -1px; margin-right: 3px;"><polyline points="20 6 9 17 4 12"/></svg>Done</span>' 
              : '<span class="status-pill status-pending">Incomplete</span>'}
          </div>
        </div>

        <div class="reminder-msg-callout">
          ${rem.done ? item.doneMsg : item.pendingMsg}
        </div>

        ${item.isWater ? `
          <div class="reminder-water-log-row">
            <div style="font-size: 0.74rem; font-weight: 600; color: var(--apple-blue);">
              Water: ${rem.waterMl || 0} / 3,500 ml
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="water-quick-btn" onclick="logWaterIntake(250)">+250ml</button>
              <button class="water-quick-btn" onclick="logWaterIntake(500)">+500ml</button>
            </div>
          </div>
        ` : ''}

        <div class="reminder-actions-row">
          <div class="reminder-controls-left">
            <input type="time" class="time-picker" value="${rem.time || '17:30'}" onchange="updateReminderTime('${item.id}', this.value)" title="Reminder Time">
            <label class="ios-switch" title="Toggle Reminder ON/OFF">
              <input type="checkbox" ${rem.enabled ? 'checked' : ''} onchange="toggleReminderEnabled('${item.id}', this.checked)">
              <span class="ios-slider"></span>
            </label>
          </div>

          <div style="display: flex; align-items: center; gap: 6px;">
            ${item.actionBtnText ? `
              <button class="btn btn-outline" style="font-size: 0.72rem; padding: 5px 10px;" onclick="${item.onAction}">
                ${item.actionBtnText}
              </button>
            ` : ''}
            <button class="btn-status-action ${rem.done ? 'is-done' : ''}" onclick="toggleReminderDone('${item.id}')">
              ${rem.done ? '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align: -1px; margin-right: 3px;"><polyline points="20 6 9 17 4 12"/></svg>Done' : 'Mark Done'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Update Summary Bar
  const summaryEl = document.getElementById('remindersSummaryCount');
  const barEl = document.getElementById('remindersProgressBar');
  if (summaryEl) summaryEl.innerText = `${completedCount} / ${totalCount} Complete`;
  if (barEl) {
    const pct = Math.round((completedCount / totalCount) * 100);
    barEl.style.width = `${pct}%`;
  }

  // Update Bell Notification Dot
  updateNotificationBadge();
}

function updateNotificationBadge() {
  const dot = document.querySelector('.notification-dot');
  if (!dot) return;

  const state = ReduxStore.getState();
  const reminders = state.reminders;
  // If ANY enabled reminder is still NOT done, show the dot
  const hasPending = Object.values(reminders).some(r => r.enabled && !r.done);
  dot.style.display = hasPending ? 'block' : 'none';
}

function toggleReminderDone(id) {
  ReduxStore.dispatch({
    type: 'TOGGLE_REMINDER_DONE',
    payload: { id }
  });
  renderRemindersHub();
}

function updateReminderTime(id, time) {
  ReduxStore.dispatch({
    type: 'UPDATE_REMINDER_TIME',
    payload: { id, time }
  });
  renderRemindersHub();
}

function toggleReminderEnabled(id, enabled) {
  ReduxStore.dispatch({
    type: 'TOGGLE_REMINDER_ENABLED',
    payload: { id, enabled }
  });
  renderRemindersHub();
}

function logWaterIntake(amount) {
  ReduxStore.dispatch({
    type: 'LOG_WATER',
    payload: { amount }
  });
  renderRemindersHub();
}

function jumpToReminderView(viewName) {
  closeModal('notificationsModal');
  switchView(viewName);
}

// Deep Link handler from Android System Notification Click
window.handleNotificationDeepLink = function(targetType) {
  openNotificationsModal();
  if (targetType === 'workout') {
    switchView('workouts');
  } else if (targetType === 'fuel') {
    switchView('nutrition');
  }
};

// Auto check and sync workout reminder when user completes sets
function checkAndSyncTodayWorkoutReminder() {
  const todayKey = getTodayDayKey();
  const dayData = workoutPlan[todayKey];
  if (!dayData || !dayData.exercises) return;

  let totalSets = 0;
  let doneSets = 0;
  dayData.exercises.forEach(ex => {
    ex.sets.forEach(s => {
      totalSets++;
      if (s.done) doneSets++;
    });
  });

  const state = ReduxStore.getState();
  const workoutRem = state.reminders.workout;
  if (totalSets > 0 && doneSets === totalSets && !workoutRem.done) {
    ReduxStore.dispatch({
      type: 'SET_REMINDER_DONE_EXPLICIT',
      payload: { id: 'workout', done: true }
    });
    renderRemindersHub();
  }
}

function openNotificationsModal() {
  renderRemindersHub();
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
    roadmap: athleteRoadmap,
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
      if (data.roadmap) {
        athleteRoadmap = data.roadmap;
        saveRoadmap();
        renderRoadmapHero();
      }
      alert("Data successfully restore ho gaya.");
      renderHomeStats();
      renderWorkoutView();
      renderMeals();
      renderRoadmapHero();
    } catch (err) {
      alert("Invalid backup file.");
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
        console.log('ServiceWorker registered offline-ready:', reg.scope);
      })
      .catch((err) => {
        console.log('ServiceWorker registration error:', err);
      });
  });
}

// Start App on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
