/**
 * Gym Plan - Ultra-Premium Luxury Monochrome Edition (v0.05)
 * Powered by CodeByTushu
 * 7 - 12 - 15 Reverse Pyramid Rep Scheme
 * 100% Offline with LocalStorage, IndexedDB & Service Worker
 */

// Default 7-Day Athletic Workout Plan
const DEFAULT_PLAN = {
  monday: {
    name: "Monday",
    title: "Chest & Athletic Core",
    focus: "Push Strength & Core Stability",
    description: "Athletic chest development and core stability. Each exercise targets a distinct pectoral angle with precise biomechanical cues.",
    color: "#111111",
    exercises: [
      {
        id: "m1",
        name: "Incline Dumbbell Bench Press",
        target: "[1/5] Upper Chest & Clavicular Shape",
        notes: "Set the bench to 30-45 degrees. Lower dumbbells smoothly under control and press up to squeeze the upper chest without clanking weights.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 25, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 20, reps: 12, done: false },
          { setNum: 3, type: "Light/Pump", targetReps: 15, weight: 15, reps: 15, done: false }
        ]
      },
      {
        id: "m2",
        name: "Flat Barbell Bench Press",
        target: "[2/5] Mid Chest & Raw Pushing Power",
        notes: "Retract shoulder blades into the bench and plant both feet firmly. Lower the bar under control to touch your chest, then drive powerfully without bouncing.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 60, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 50, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 40, reps: 15, done: false }
        ]
      },
      {
        id: "m3",
        name: "Weighted / Bodyweight Dips",
        target: "[3/5] Lower Chest Cut & Triceps",
        notes: "Grip the parallel bars and lean your torso forward 20-30 degrees so tension shifts cleanly onto the lower chest rather than only the triceps.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 10, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 0, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 0, reps: 15, done: false }
        ]
      },
      {
        id: "m4",
        name: "Cable Chest Flyes (High to Low)",
        target: "[4/5] Inner Chest Separation & Control",
        notes: "Bring both handles together at center with a soft bend in your elbows and hold a 2-second peak squeeze on every repetition.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 25, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 20, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 15, reps: 15, done: false }
        ]
      },
      {
        id: "m5",
        name: "Hanging Leg / Knee Raises",
        target: "[5/5] Lower Abdominals & Core Armor",
        notes: "Hang steadily without swinging and curl your knees or legs toward your chest while rolling your hips upward for full lower-ab contraction.",
        sets: [
          { setNum: 1, type: "Strict", targetReps: 12, weight: 0, reps: 12, done: false },
          { setNum: 2, type: "Strict", targetReps: 12, weight: 0, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 0, reps: 15, done: false }
        ]
      }
    ]
  },
  tuesday: {
    name: "Tuesday",
    title: "Back & Posterior Chain",
    focus: "V-Taper, Posture & Pulling Power",
    description: "Build athletic posture and complete upper-to-lower back thickness with strict pulling mechanics.",
    color: "#3b82f6",
    exercises: [
      {
        id: "t1",
        name: "Deadlift (Conventional or Trap Bar)",
        target: "[1/5] Full Posterior Chain & Raw Strength",
        notes: "Keep your spine strictly neutral throughout the lift. Push the floor away through your heels and squeeze glutes at lockout.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 100, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 80, reps: 12, done: false },
          { setNum: 3, type: "Endurance", targetReps: 15, weight: 65, reps: 15, done: false }
        ]
      },
      {
        id: "t2",
        name: "Wide-Grip Lat Pulldowns / Pull-Ups",
        target: "[2/5] Upper Lats & V-Taper Width",
        notes: "Grip wider than shoulder width, keep chest lifted, and drive your elbows smoothly down toward your hips.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 65, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 50, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 40, reps: 15, done: false }
        ]
      },
      {
        id: "t3",
        name: "Bent-Over Barbell Rows",
        target: "[3/5] Mid-Back Thickness & Posture",
        notes: "Hinge back 45 degrees at the hips and pull the barbell toward your lower torso to squeeze the mid-back muscles.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 60, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 50, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 40, reps: 15, done: false }
        ]
      },
      {
        id: "t4",
        name: "Single-Arm Dumbbell Row",
        target: "[4/5] Unilateral Lat Stretch & Isolation",
        notes: "Achieve a full stretch at the bottom and pull your elbow upward toward the ceiling without rotating your torso.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 27.5, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 22.5, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 17.5, reps: 15, done: false }
        ]
      },
      {
        id: "t5",
        name: "Face Pulls (with Rope)",
        target: "[5/5] Rear Delts & Shoulder Posture",
        notes: "Pull the rope smoothly toward eye level while rotating thumbs backward to strengthen rear delts and posture.",
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
    description: "Balanced shoulder development across all three deltoid heads paired with deep abdominal bracing.",
    color: "#f59e0b",
    exercises: [
      {
        id: "w1",
        name: "Standing Overhead Barbell / Dumbbell Press",
        target: "[1/5] Front Delts & Overhead Power",
        notes: "Brace glutes and abs tightly. Press the weight directly overhead without over-arching your lower back.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 45, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 35, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 25, reps: 15, done: false }
        ]
      },
      {
        id: "w2",
        name: "Dumbbell Lateral Raises (Strict Form)",
        target: "[2/5] Side Delts & Shoulder Width",
        notes: "Raise dumbbells slightly ahead of your torso leading with your elbows, avoiding any hip swing or momentum.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 12.5, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 10, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 7.5, reps: 15, done: false }
        ]
      },
      {
        id: "w3",
        name: "Arnold Dumbbell Press",
        target: "[3/5] 360-Degree Delts & Rotator Control",
        notes: "Start with palms facing your chest and smoothly rotate outward 180 degrees as you press overhead.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 18, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 14, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 10, reps: 15, done: false }
        ]
      },
      {
        id: "w4",
        name: "Dumbbell / Barbell Shrugs",
        target: "[4/5] Upper Traps & Neck Stability",
        notes: "Elevate shoulders straight up toward your ears and hold for 2 seconds at the top; avoid rolling shoulders.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 10, weight: 30, reps: 10, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 25, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 20, reps: 15, done: false }
        ]
      },
      {
        id: "w5",
        name: "Ab Wheel Rollouts / Cable Woodchoppers",
        target: "[5/5] Deep Core Compression & Stability",
        notes: "Brace your core firmly before rolling forward and pull back using abdominal strength without arching your spine.",
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
    description: "Complete arm hypertrophy targeting biceps peak, triceps mass, and athletic forearm grip strength.",
    color: "#ec4899",
    exercises: [
      {
        id: "th1",
        name: "Barbell / EZ-Bar Bicep Curls",
        target: "[1/5] Bicep Peak & Controlled Flexion",
        notes: "Pin elbows steadily beside your ribs and move only through the forearms without swinging your torso.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 35, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 27.5, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 20, reps: 15, done: false }
        ]
      },
      {
        id: "th2",
        name: "Close-Grip Bench Press or Skullcrushers",
        target: "[2/5] Triceps Long Head & Mass",
        notes: "Keep elbows tucked shoulder-width apart, lower under control toward your forehead, and lock out cleanly via triceps.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 50, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 40, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 30, reps: 15, done: false }
        ]
      },
      {
        id: "th3",
        name: "Incline Dumbbell Hammer Curls",
        target: "[3/5] Brachialis & Forearm Thickness",
        notes: "Maintain a neutral hammer grip with thumbs pointing up and achieve a full bottom stretch on an incline bench.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 16, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 12.5, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 10, reps: 15, done: false }
        ]
      },
      {
        id: "th4",
        name: "Triceps Cable Rope Pushdowns",
        target: "[4/5] Triceps Lateral Definition",
        notes: "Push downward and spread both ends of the rope apart at lockout, holding peak contraction for 1 second.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 30, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 22.5, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 17.5, reps: 15, done: false }
        ]
      },
      {
        id: "th5",
        name: "Wrist Curls + Heavy Plate Hold",
        target: "[5/5] Forearms & Crushing Grip Power",
        notes: "Grip heavy plates or dumbbells firmly for timed holds followed by controlled wrist curls to build unbreakable grip.",
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
    description: "High-intensity athletic conditioning focused on explosive hip power, agility, and cardiovascular endurance.",
    color: "#8b5cf6",
    exercises: [
      {
        id: "f1",
        name: "Kettlebell / Dumbbell Swings",
        target: "[1/5] Hip Hinge Power & Conditioning",
        notes: "Hinge back at the hips and snap forcefully forward; propel the bell with hip power rather than lifting with your arms.",
        sets: [
          { setNum: 1, type: "Heavy Power", targetReps: 15, weight: 24, reps: 15, done: false },
          { setNum: 2, type: "Heavy Power", targetReps: 15, weight: 24, reps: 15, done: false },
          { setNum: 3, type: "Stamina", targetReps: 20, weight: 20, reps: 20, done: false }
        ]
      },
      {
        id: "f2",
        name: "Box Jumps or Broad Jumps",
        target: "[2/5] Fast-Twitch Leg Spring & Agility",
        notes: "Explode upward from a quarter squat and land softly with bent knees to absorb force cleanly.",
        sets: [
          { setNum: 1, type: "Explosive", targetReps: 8, weight: 0, reps: 8, done: false },
          { setNum: 2, type: "Explosive", targetReps: 8, weight: 0, reps: 8, done: false },
          { setNum: 3, type: "Explosive", targetReps: 8, weight: 0, reps: 8, done: false }
        ]
      },
      {
        id: "f3",
        name: "Battle Ropes / Medicine Ball Slams",
        target: "[3/5] Upper Body Stamina & Core Grit",
        notes: "Maintain an athletic stance and drive crisp alternating waves or slams with steady breathing.",
        sets: [
          { setNum: 1, type: "Interval", targetReps: 30, weight: 8, reps: 30, done: false },
          { setNum: 2, type: "Interval", targetReps: 30, weight: 8, reps: 30, done: false },
          { setNum: 3, type: "All Out", targetReps: 30, weight: 8, reps: 30, done: false }
        ]
      },
      {
        id: "f4",
        name: "Farmer's Walk / Dumbbell Carries",
        target: "[4/5] Total Body Core Stability & Traps",
        notes: "Keep your chest proud and shoulders packed while walking 30-40 meters in a straight, braced line.",
        sets: [
          { setNum: 1, type: "Heavy Carry", targetReps: 1, weight: 30, reps: 1, done: false },
          { setNum: 2, type: "Heavy Carry", targetReps: 1, weight: 30, reps: 1, done: false },
          { setNum: 3, type: "Heavy Carry", targetReps: 1, weight: 30, reps: 1, done: false }
        ]
      },
      {
        id: "f5",
        name: "HIIT Sprint Intervals / Treadmill",
        target: "[5/5] VO2 Max & Metabolic Conditioning",
        notes: "Perform 30-second high-effort sprints followed by 45-second controlled walking recovery for 6 to 8 rounds.",
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
    description: "Athletes are built from the ground up. Compound squats paired with unilateral balance and posterior leg power.",
    color: "#ef4444",
    exercises: [
      {
        id: "s1",
        name: "Barbell Back / Front Squats",
        target: "[1/5] Quads & Raw Leg Drive",
        notes: "Keep knees tracking in line with toes, descend to parallel depth, and drive powerfully through heels.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 80, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 65, reps: 12, done: false },
          { setNum: 3, type: "Endurance", targetReps: 15, weight: 50, reps: 15, done: false }
        ]
      },
      {
        id: "s2",
        name: "Romanian Deadlifts (RDLs)",
        target: "[2/5] Hamstrings & Glute Tie-In",
        notes: "Push hips straight back while keeping the bar close to your legs until a deep hamstring stretch is felt.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 70, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 55, reps: 12, done: false },
          { setNum: 3, type: "Pump", targetReps: 15, weight: 45, reps: 15, done: false }
        ]
      },
      {
        id: "s3",
        name: "Bulgarian Split Squats (Dumbbell)",
        target: "[3/5] Single-Leg Balance & Power",
        notes: "Elevate your rear foot on a bench and descend vertically with a stable front knee to 90 degrees.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 16, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 12, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 8, reps: 15, done: false }
        ]
      },
      {
        id: "s4",
        name: "Leg Press or Hack Squat",
        target: "[4/5] Quad Sweep & Hypertrophy",
        notes: "Place feet shoulder-width apart and press smoothly without snapping or locking out your knees at the top.",
        sets: [
          { setNum: 1, type: "Heavy", targetReps: 7, weight: 150, reps: 7, done: false },
          { setNum: 2, type: "Moderate", targetReps: 12, weight: 120, reps: 12, done: false },
          { setNum: 3, type: "Burnout", targetReps: 15, weight: 90, reps: 15, done: false }
        ]
      },
      {
        id: "s5",
        name: "Standing / Seated Calf Raises",
        target: "[5/5] Calves & Ankle Resilience",
        notes: "Pause for 2 seconds in the bottom stretch before driving up onto your toes for a 1-second peak squeeze.",
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
    description: "Muscles rebuild during recovery. Prioritize tissue quality, joint mobility, and relaxed aerobic circulation.",
    color: "#06b6d4",
    exercises: [
      {
        id: "su1",
        name: "Full Body Foam Rolling & Myofascial",
        target: "[1/4] Tissue Quality & Soreness Relief",
        notes: "Roll slowly over quads, IT bands, lats, and upper back for 60 seconds per region to relieve tightness.",
        sets: [
          { setNum: 1, type: "Recovery", targetReps: 1, weight: 0, reps: 1, done: false }
        ]
      },
      {
        id: "su2",
        name: "Dynamic Hip Flow (World's Greatest Stretch)",
        target: "[2/4] Hip Mobility & Lower Back Relief",
        notes: "Step into a deep lunge, drop your elbow toward the floor, and rotate your chest smoothly toward the ceiling.",
        sets: [
          { setNum: 1, type: "Mobility", targetReps: 10, weight: 0, reps: 10, done: false },
          { setNum: 2, type: "Mobility", targetReps: 10, weight: 0, reps: 10, done: false }
        ]
      },
      {
        id: "su3",
        name: "Shoulder Dislocations & Band Pull-Aparts",
        target: "[3/4] Overhead Mobility & Rotator Health",
        notes: "Hold a resistance band or light bar wide and sweep smoothly overhead without bending your elbows.",
        sets: [
          { setNum: 1, type: "Mobility", targetReps: 15, weight: 0, reps: 15, done: false },
          { setNum: 2, type: "Mobility", targetReps: 15, weight: 0, reps: 15, done: false }
        ]
      },
      {
        id: "su4",
        name: "45-Minute Outdoor Low-Intensity Walk",
        target: "[4/4] Aerobic Base & Active Recovery",
        notes: "Walk at a comfortable, steady pace aiming for ~7,000 steps with relaxed nasal breathing.",
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
const STORAGE_USER_NAME = 'tushu_gym_user_name_v1';
const STORAGE_PLAN_CONFIGURED = 'tushu_user_plan_configured_v1';
const STORAGE_USER_PIN = 'tushu_gym_user_pin_v1';
const STORAGE_LOGGED_OUT = 'tushu_gym_logged_out_v1';
const STORAGE_RETENTION_POLICY = 'tushu_gym_retention_policy';

async function hashPin(pin) {
  if (!pin || !String(pin).trim()) return '';
  const clean = String(pin).trim();
  const salt = 'gym_athlete_security_salt_2026';
  try {
    if (window.crypto && window.crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(salt + clean + salt);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (err) {
    console.warn("SubtleCrypto unavailable, using fallback hash", err);
  }
  let h1 = 0xdeadbeef, h2 = 0x41c64e6d;
  const str = salt + clean + salt;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 'h_' + (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

async function saveUserPin(pin) {
  try {
    if (pin && String(pin).trim()) {
      const hashed = await hashPin(pin);
      localStorage.setItem(STORAGE_USER_PIN, hashed);
    } else {
      localStorage.removeItem(STORAGE_USER_PIN);
    }
  } catch (e) {
    console.error("Error saving PIN", e);
  }
}

function getUserPin() {
  try {
    return localStorage.getItem(STORAGE_USER_PIN) || '';
  } catch (e) {
    return '';
  }
}

function hasUserPin() {
  return Boolean(getUserPin());
}

async function verifyUserPin(inputPin) {
  const saved = getUserPin();
  if (!saved) return true;
  if (!inputPin) return false;
  const hashedInput = await hashPin(inputPin);
  if (hashedInput === saved || inputPin.trim() === saved) {
    if (inputPin.trim() === saved) {
      await saveUserPin(inputPin);
    }
    return true;
  }
  return false;
}

// ==============================================
// Custom In-App Dialog Engine (Zero browser "file://" popups)
// ==============================================
function openInAppDialog(options) {
  return new Promise((resolve) => {
    const modal = document.getElementById('appDialogModal');
    const iconEl = document.getElementById('appDialogIcon');
    const titleEl = document.getElementById('appDialogTitle');
    const msgEl = document.getElementById('appDialogMessage');
    const inputEl = document.getElementById('appDialogInput');
    const cancelBtn = document.getElementById('appDialogCancelBtn');
    const confirmBtn = document.getElementById('appDialogConfirmBtn');

    if (!modal || !titleEl || !msgEl || !confirmBtn) {
      resolve(options.mode === 'confirm' ? false : (options.mode === 'prompt' ? null : undefined));
      return;
    }

    const tone = options.tone || 'info';
    if (iconEl) {
      iconEl.className = 'app-dialog-icon' + (tone !== 'info' ? ` is-${tone}` : '');
      if (tone === 'error') {
        iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
      } else if (tone === 'success') {
        iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
      } else if (tone === 'warning') {
        iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
      } else {
        iconEl.innerHTML = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
      }
    }

    titleEl.textContent = options.title || 'Notice';
    msgEl.textContent = options.message || '';

    if (options.mode === 'prompt' && inputEl) {
      inputEl.style.display = 'block';
      inputEl.type = options.inputType || 'password';
      inputEl.placeholder = options.placeholder || 'Enter value';
      inputEl.value = options.defaultValue || '';
      setTimeout(() => inputEl.focus(), 120);
    } else if (inputEl) {
      inputEl.style.display = 'none';
      inputEl.value = '';
    }

    if (cancelBtn) {
      if (options.mode === 'confirm' || options.mode === 'prompt') {
        cancelBtn.style.display = 'inline-flex';
        cancelBtn.textContent = options.cancelText || 'Cancel';
      } else {
        cancelBtn.style.display = 'none';
      }
    }

    confirmBtn.textContent = options.confirmText || 'OK';

    const cleanup = (result) => {
      modal.classList.remove('open');
      confirmBtn.onclick = null;
      if (cancelBtn) cancelBtn.onclick = null;
      if (inputEl) inputEl.onkeydown = null;
      resolve(result);
    };

    confirmBtn.onclick = () => {
      if (options.mode === 'confirm') cleanup(true);
      else if (options.mode === 'prompt') cleanup(inputEl ? inputEl.value : '');
      else cleanup(true);
    };

    if (cancelBtn) {
      cancelBtn.onclick = () => {
        if (options.mode === 'confirm') cleanup(false);
        else if (options.mode === 'prompt') cleanup(null);
        else cleanup(false);
      };
    }

    if (inputEl && options.mode === 'prompt') {
      inputEl.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          cleanup(inputEl.value);
        }
      };
    }

    modal.classList.add('open');
  });
}

function showAppAlert(optionsOrMsg, title = 'Notice', tone = 'info') {
  const opts = typeof optionsOrMsg === 'string'
    ? { title, message: optionsOrMsg, tone, mode: 'alert' }
    : { ...optionsOrMsg, mode: 'alert' };
  return openInAppDialog(opts);
}

function showAppConfirm(optionsOrMsg, title = 'Confirm Action') {
  const opts = typeof optionsOrMsg === 'string'
    ? { title, message: optionsOrMsg, tone: 'warning', mode: 'confirm' }
    : { ...optionsOrMsg, mode: 'confirm' };
  return openInAppDialog(opts);
}

function showAppPrompt(optionsOrMsg, title = 'Security Verification', inputType = 'password') {
  const opts = typeof optionsOrMsg === 'string'
    ? { title, message: optionsOrMsg, inputType, tone: 'info', mode: 'prompt' }
    : { ...optionsOrMsg, mode: 'prompt' };
  return openInAppDialog(opts);
}

function showOnboardingPinError(msg) {
  const field = document.getElementById('onboardingPinFieldWrap');
  const errEl = document.getElementById('onboardingPinError');
  if (field) field.classList.add('input-error');
  if (errEl) {
    errEl.textContent = msg;
    errEl.classList.add('visible');
  }
}

function clearOnboardingPinError() {
  const field = document.getElementById('onboardingPinFieldWrap');
  const errEl = document.getElementById('onboardingPinError');
  if (field) field.classList.remove('input-error');
  if (errEl) {
    errEl.textContent = '';
    errEl.classList.remove('visible');
  }
}

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
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-update Hinglish target and notes from DEFAULT_PLAN
      let hasUpdate = false;
      Object.keys(DEFAULT_PLAN).forEach(day => {
        if (parsed[day] && DEFAULT_PLAN[day]) {
          parsed[day].title = DEFAULT_PLAN[day].title;
          parsed[day].focus = DEFAULT_PLAN[day].focus;
          parsed[day].description = DEFAULT_PLAN[day].description;
          if (Array.isArray(parsed[day].exercises)) {
            parsed[day].exercises.forEach((ex, idx) => {
              const defEx = DEFAULT_PLAN[day].exercises[idx];
              if (defEx && (defEx.name === ex.name || defEx.id === ex.id)) {
                if (ex.target !== defEx.target || ex.notes !== defEx.notes) {
                  ex.target = defEx.target;
                  ex.notes = defEx.notes;
                  hasUpdate = true;
                }
              }
            });
          }
        }
      });
      if (hasUpdate) {
        localStorage.setItem(STORAGE_PLAN, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.error("Error loading plan", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_PLAN));
}

function savePlan() {
  try {
    localStorage.setItem(STORAGE_PLAN, JSON.stringify(workoutPlan));
    if (window.CloudSync && typeof window.CloudSync.triggerAutoSync === 'function') {
      window.CloudSync.triggerAutoSync();
    }
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
    if (window.CloudSync && typeof window.CloudSync.triggerAutoSync === 'function') {
      window.CloudSync.triggerAutoSync();
    }
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
    if (window.CloudSync && typeof window.CloudSync.triggerAutoSync === 'function') {
      window.CloudSync.triggerAutoSync();
    }
  } catch (e) {
    console.error("Error saving meals", e);
  }
}

// Reload in-memory variables and views after cloud restoration
window.reloadAppDataFromStorage = function () {
  try {
    workoutPlan = loadPlan();
    workoutHistory = loadHistory();
    nutritionMeals = loadMeals();
    athleteRoadmap = loadRoadmap();
    if (typeof updateUserGreeting === 'function') updateUserGreeting();
    if (typeof renderHomeStats === 'function') renderHomeStats();
    if (typeof renderWeeklyBars === 'function') renderWeeklyBars();
    if (typeof renderWorkoutView === 'function') renderWorkoutView();
    if (typeof renderActivityStats === 'function') renderActivityStats();
    if (typeof renderMeals === 'function') renderMeals();
    if (typeof renderRoadmapHero === 'function') renderRoadmapHero();
    if (typeof updatePersonalDashboardUI === 'function') updatePersonalDashboardUI();
    if (typeof window.renderProHomeBanner === 'function') window.renderProHomeBanner();
    if (typeof window.renderHabitsTracker === 'function') window.renderHabitsTracker();
    if (typeof window.renderRoomFitnessView === 'function') window.renderRoomFitnessView();
  } catch (e) {
    console.error('Error reloading app state from storage:', e);
  }
};

function getUserName() {
  const saved = localStorage.getItem(STORAGE_USER_NAME);
  if (saved && saved.trim()) return saved.trim();
  if (athleteRoadmap && athleteRoadmap.profileName && athleteRoadmap.profileName.trim()) {
    return athleteRoadmap.profileName.trim();
  }
  return 'Athlete';
}

function saveUserName(name) {
  const cleanName = (name && name.trim()) ? name.trim() : 'Athlete';
  localStorage.setItem(STORAGE_USER_NAME, cleanName);
  if (athleteRoadmap) {
    athleteRoadmap.profileName = cleanName;
    saveRoadmap();
  }
  updateUserGreeting();
  return cleanName;
}

function updateUserGreeting() {
  const name = getUserName();
  const greetingEl = document.getElementById('headerGreetingName');
  if (greetingEl) {
    greetingEl.innerText = `Hi, ${name}`;
  }
  const drawerNameEl = document.getElementById('drawerUserName');
  if (drawerNameEl) {
    drawerNameEl.innerText = name;
  }
  const subgreetingEl = document.getElementById('headerSubgreeting');
  if (subgreetingEl) {
    const dietStr = athleteRoadmap && athleteRoadmap.dietType ? athleteRoadmap.dietType.toUpperCase() : 'v0.05';
    subgreetingEl.innerText = `Ready to train • ${dietStr}`;
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
    userName: getUserName(),
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
  applyDataRetentionPolicy();
  updateUserGreeting();
  checkOnboarding();
  renderWeeklyBars();
  renderHomeStats();
  renderWorkoutDayPills();
  renderWorkoutView();
  renderMeals();
  renderRoadmapHero();
  renderActivityStats();
  renderRemindersHub();
  if (typeof renderHabitsView === 'function') renderHabitsView();
  if (typeof renderRoomFitnessHomeCard === 'function') renderRoomFitnessHomeCard();
  updateNotificationBadge();
  setupEventListeners();
  checkPwaInstall();
}

// ==============================================
// Onboarding State & 2-Step Flow Logic
// Step 1: Goku Ultra Instinct Hero & Athlete Name
// Step 2: Food Category, Duration & Training Purpose
// ==============================================
let onboardingPlanState = {
  diet: 'veg',
  duration: 30,
  goal: 'shred',
  hours: '1.5-2'
};

function checkOnboarding() {
  const isLoggedOut = localStorage.getItem(STORAGE_LOGGED_OUT) === 'true';
  const isDone = localStorage.getItem(STORAGE_ONBOARDED);
  const screen = document.getElementById('viewOnboarding');
  if (!screen) return;

  if (isLoggedOut) {
    screen.classList.remove('hidden');
    screen.style.display = 'flex';
    setupAthleteLoginScreen();
  } else if (isDone === 'true') {
    screen.classList.add('hidden');
    screen.style.display = 'none';
  } else {
    screen.classList.remove('hidden');
    screen.style.display = 'flex';
    resetOnboardingView();
    const skipBtn = document.getElementById('btnOnboardingSkip');
    if (skipBtn) skipBtn.style.display = 'inline-flex';
    const input = document.getElementById('onboardingUserNameInput');
    if (input) {
      const saved = localStorage.getItem(STORAGE_USER_NAME);
      if (saved && saved !== 'Athlete') input.value = saved;
      setTimeout(() => input.focus(), 300);
    }
  }
}

async function handleUserLogout() {
  const ok = await showAppConfirm({
    title: 'Log Out',
    message: 'Are you sure you want to log out? Your workout and nutrition data will remain safely stored on this device.',
    confirmText: 'Log Out',
    cancelText: 'Stay Logged In',
    tone: 'warning'
  });
  if (!ok) return;

  localStorage.setItem(STORAGE_LOGGED_OUT, 'true');
  closeSideDrawer();
  
  const screen = document.getElementById('viewOnboarding');
  if (screen) {
    screen.classList.remove('hidden');
    screen.style.display = 'flex';
  }
  
  setupAthleteLoginScreen();
}

function setupAthleteLoginScreen() {
  resetOnboardingView();
  clearOnboardingPinError();
  
  const savedName = getUserName();
  const savedPin = getUserPin();
  
  const titleEl = document.getElementById('onboardingHeroTitle');
  const subEl = document.getElementById('onboardingHeroSubtitle');
  const nameInput = document.getElementById('onboardingUserNameInput');
  const pinLabel = document.getElementById('onboardingPinLabel');
  const pinInput = document.getElementById('onboardingUserPinInput');
  const pinHint = document.getElementById('onboardingPinHint');
  const btnText = document.getElementById('btnOnboardingContinueText');
  const switchBtn = document.getElementById('btnSwitchAthlete');
  const skipBtn = document.getElementById('btnOnboardingSkip');

  if (nameInput) {
    nameInput.value = (savedName && savedName !== 'Athlete') ? savedName : '';
  }

  if (titleEl) {
    titleEl.textContent = (savedName && savedName !== 'Athlete') ? `Welcome Back, ${savedName}!` : 'Athlete Login';
  }

  if (subEl) {
    subEl.textContent = savedPin
      ? 'Please enter your security PIN to access your dashboard.'
      : 'Enter your name to log in to your local fitness dashboard.';
  }

  if (pinLabel) {
    pinLabel.textContent = savedPin ? 'ENTER YOUR PIN / PASSWORD' : 'LOGIN PIN / PASSWORD (OPTIONAL • FREE)';
  }

  if (pinInput) {
    pinInput.value = '';
    pinInput.placeholder = savedPin ? 'Enter your security PIN' : 'Set PIN or Password (optional)';
  }

  if (pinHint) {
    pinHint.textContent = savedPin
      ? 'Protected by offline security PIN'
      : 'Free offline login • Safe on-device storage';
  }

  if (btnText) {
    btnText.textContent = 'Log In to My Dashboard';
  }

  if (switchBtn) {
    switchBtn.style.display = 'block';
  }

  // Hide Skip button when account is protected by a security PIN so navigation stays unambiguous
  if (skipBtn) {
    skipBtn.style.display = savedPin ? 'none' : 'inline-flex';
  }

  setTimeout(() => {
    if (savedPin && pinInput) {
      pinInput.focus();
    } else if (nameInput) {
      nameInput.focus();
    }
  }, 200);
}

function switchAthleteLogin() {
  clearOnboardingPinError();
  const nameInput = document.getElementById('onboardingUserNameInput');
  const pinInput = document.getElementById('onboardingUserPinInput');
  const titleEl = document.getElementById('onboardingHeroTitle');
  const subEl = document.getElementById('onboardingHeroSubtitle');
  const pinLabel = document.getElementById('onboardingPinLabel');
  const pinHint = document.getElementById('onboardingPinHint');
  const btnText = document.getElementById('btnOnboardingContinueText');
  const switchBtn = document.getElementById('btnSwitchAthlete');
  const skipBtn = document.getElementById('btnOnboardingSkip');

  if (nameInput) {
    nameInput.value = '';
    nameInput.focus();
  }
  if (pinInput) pinInput.value = '';
  if (titleEl) titleEl.textContent = 'Athletic Performance Starts Here';
  if (subEl) subEl.textContent = 'Reverse pyramid 7-12-15 strength lifts, customized athlete nutrition & 100% offline precision tracking.';
  if (pinLabel) pinLabel.textContent = 'LOGIN PIN / PASSWORD (OPTIONAL • FREE)';
  if (pinHint) pinHint.textContent = 'Free offline login • Keep your profile private and secure';
  if (btnText) btnText.textContent = 'Continue to Plan Setup';
  if (switchBtn) switchBtn.style.display = 'none';
  if (skipBtn) skipBtn.style.display = 'inline-flex';

  localStorage.removeItem(STORAGE_LOGGED_OUT);
}

function resetOnboardingView() {
  const step1 = document.getElementById('onboardingStep1');
  const googleChooser = document.getElementById('onboardingGoogleChooser');
  const step2 = document.getElementById('onboardingStep2');
  const btnBack = document.getElementById('btnOnboardingBack');
  const btnSkip = document.getElementById('btnOnboardingSkip');
  if (step1) step1.style.display = 'block';
  if (googleChooser) {
    googleChooser.style.display = 'none';
    googleChooser.dataset.active = 'false';
  }
  if (step2) step2.style.display = 'none';
  if (btnBack) btnBack.style.display = 'none';
  if (btnSkip) btnSkip.style.display = 'inline-flex';
}

function showGoogleAccountChooser() {
  const step1 = document.getElementById('onboardingStep1');
  const googleChooser = document.getElementById('onboardingGoogleChooser');
  const btnBack = document.getElementById('btnOnboardingBack');
  const btnSkip = document.getElementById('btnOnboardingSkip');
  const screen = document.getElementById('viewOnboarding');

  if (step1) step1.style.display = 'none';
  if (googleChooser) {
    googleChooser.style.display = 'block';
    googleChooser.dataset.active = 'true';
  }
  if (btnBack) btnBack.style.display = 'inline-flex';
  if (btnSkip) btnSkip.style.display = 'none';
  renderGoogleAccountsList();
  if (screen) screen.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderGoogleAccountsList() {
  const slot = document.getElementById('googleAccountsRenderSlot');
  if (!slot) return;
  const accounts = (window.CloudSync && typeof window.CloudSync.getGoogleAccounts === 'function')
    ? window.CloudSync.getGoogleAccounts()
    : [
        { name: 'Tushpendra Kumar', email: 'tushpendra.kumar@gmail.com', avatarColor: '#7c3aed', initial: 'T' },
        { name: 'Tushu Dev', email: 'tushu.dev.work@gmail.com', avatarColor: '#0f172a', initial: 'TD' }
      ];

  let html = '';
  accounts.forEach((acc) => {
    const color = acc.avatarColor || '#7c3aed';
    const init = acc.initial || (acc.name ? acc.name.charAt(0).toUpperCase() : 'G');
    const safeName = acc.name.replace(/'/g, "\\'");
    html += `
      <div class="google-account-row" onclick="selectGoogleAccount('${acc.email}', '${safeName}', '${color}')">
        <div style="display: flex; align-items: center; gap: 12px; overflow: hidden;">
          <div class="google-account-avatar" style="background: ${color};">
            ${init}
          </div>
          <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            <div style="font-size: 0.90rem; font-weight: 700; color: var(--text-primary);">${acc.name}</div>
            <div style="font-size: 0.74rem; color: #64748b;">${acc.email}</div>
          </div>
        </div>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #94a3b8; flex-shrink: 0;"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    `;
  });
  slot.innerHTML = html;
}

function toggleAddAnotherAccountForm() {
  const wrap = document.getElementById('addAnotherAccountFormWrap');
  if (!wrap) return;
  wrap.style.display = (wrap.style.display === 'none' || !wrap.style.display) ? 'block' : 'none';
  if (wrap.style.display === 'block') {
    const input = document.getElementById('inputCustomGoogleName');
    if (input) input.focus();
  }
}

async function submitCustomGoogleAccount() {
  const nameEl = document.getElementById('inputCustomGoogleName');
  const emailEl = document.getElementById('inputCustomGoogleEmail');
  const name = nameEl ? nameEl.value.trim() : '';
  const email = emailEl ? emailEl.value.trim() : '';

  if (!email || !email.includes('@')) {
    await showAppAlert({ title: 'Invalid Email', message: 'Please enter a valid Google email address.', tone: 'warning' });
    if (emailEl) emailEl.focus();
    return;
  }

  const cleanName = name || email.split('@')[0];
  if (window.CloudSync && typeof window.CloudSync.addGoogleAccount === 'function') {
    window.CloudSync.addGoogleAccount(cleanName, email);
  }
  selectGoogleAccount(email, cleanName, '#0284c7');
}

async function selectGoogleAccount(email, name, color) {
  saveUserName(name);

  if (window.CloudSync && typeof window.CloudSync.signInWithGoogleAccount === 'function') {
    window.CloudSync.signInWithGoogleAccount({ email: email, name: name, avatarColor: color });
  }

  localStorage.removeItem(STORAGE_LOGGED_OUT);
  localStorage.setItem(STORAGE_ONBOARDED, 'true');

  if (typeof showAppToast === 'function') {
    showAppToast(`☁️ Connected as ${name}! Aapka data cloud par hamesha safe rahega.`);
  }

  // If workout plan was already configured previously, go straight to Home
  if (localStorage.getItem(STORAGE_PLAN_CONFIGURED) === 'true') {
    const screen = document.getElementById('viewOnboarding');
    if (screen) {
      screen.classList.add('hidden');
      screen.style.display = 'none';
    }
    updateUserGreeting();
    renderHomeStats();
    renderRoadmapHero();
    switchView('home');
    return;
  }

  // Otherwise, proceed to Step 2 (Plan Setup)
  goToOnboardingStep2();
}

function handleContinueOfflineClick() {
  openModal('offlineWarningModal');
}

function confirmProceedOffline() {
  closeModal('offlineWarningModal');
  if (typeof showAppToast === 'function') {
    showAppToast('⚡ Offline Mode Active. Data device par save rahega.');
  }

  const isLoggedOut = localStorage.getItem(STORAGE_LOGGED_OUT) === 'true';
  if (isLoggedOut || localStorage.getItem(STORAGE_PLAN_CONFIGURED) === 'true') {
    localStorage.removeItem(STORAGE_LOGGED_OUT);
    localStorage.setItem(STORAGE_ONBOARDED, 'true');
    const screen = document.getElementById('viewOnboarding');
    if (screen) {
      screen.classList.add('hidden');
      screen.style.display = 'none';
    }
    updateUserGreeting();
    renderHomeStats();
    renderRoadmapHero();
    switchView('home');
  } else {
    goToOnboardingStep2();
  }
}

function openTermsPrivacyModal(tab) {
  openModal('termsPrivacyModal');
  switchTermsTab(tab || 'terms');
}

function switchTermsTab(tab) {
  const termsContent = document.getElementById('termsTabContent');
  const privacyContent = document.getElementById('privacyTabContent');
  const btnTerms = document.getElementById('tabBtnTerms');
  const btnPrivacy = document.getElementById('tabBtnPrivacy');

  if (tab === 'privacy') {
    if (termsContent) termsContent.style.display = 'none';
    if (privacyContent) privacyContent.style.display = 'block';
    if (btnTerms) {
      btnTerms.style.color = '#64748b';
      btnTerms.style.borderBottom = 'none';
      btnTerms.style.fontWeight = '600';
    }
    if (btnPrivacy) {
      btnPrivacy.style.color = '#0f172a';
      btnPrivacy.style.borderBottom = '2px solid #0f172a';
      btnPrivacy.style.fontWeight = '700';
    }
  } else {
    if (termsContent) termsContent.style.display = 'block';
    if (privacyContent) privacyContent.style.display = 'none';
    if (btnTerms) {
      btnTerms.style.color = '#0f172a';
      btnTerms.style.borderBottom = '2px solid #0f172a';
      btnTerms.style.fontWeight = '700';
    }
    if (btnPrivacy) {
      btnPrivacy.style.color = '#64748b';
      btnPrivacy.style.borderBottom = 'none';
      btnPrivacy.style.fontWeight = '600';
    }
  }
}

async function goToOnboardingStep2() {
  const inputEl = document.getElementById('onboardingUserNameInput');
  let name = (inputEl && inputEl.value.trim()) ? inputEl.value.trim() : '';
  if (!name) name = getUserName() || 'Athlete';

  saveUserName(name);

  const pinEl = document.getElementById('onboardingUserPinInput');
  if (pinEl && pinEl.value.trim()) {
    await saveUserPin(pinEl.value.trim());
  }

  const welcomeNameEl = document.getElementById('onboardingWelcomeName');
  if (welcomeNameEl) welcomeNameEl.textContent = name;

  const step1 = document.getElementById('onboardingStep1');
  const googleChooser = document.getElementById('onboardingGoogleChooser');
  const step2 = document.getElementById('onboardingStep2');
  const btnBack = document.getElementById('btnOnboardingBack');
  const btnSkip = document.getElementById('btnOnboardingSkip');
  const screen = document.getElementById('viewOnboarding');

  if (step1) step1.style.display = 'none';
  if (googleChooser) googleChooser.style.display = 'none';
  if (step2) {
    step2.style.display = 'block';
    step2.classList.add('onboarding-step-content');
  }
  if (btnBack) btnBack.style.display = 'inline-flex';
  if (btnSkip) btnSkip.style.display = 'none';
  if (screen) screen.scrollTo({ top: 0, behavior: 'smooth' });
}

async function handleOnboardingContinue() {
  clearOnboardingPinError();
  const isLoggedOut = localStorage.getItem(STORAGE_LOGGED_OUT) === 'true';
  const nameInput = document.getElementById('onboardingUserNameInput');
  const pinInput = document.getElementById('onboardingUserPinInput');
  const enteredPin = pinInput ? pinInput.value.trim() : '';
  const savedPin = getUserPin();

  // If user is currently logged out
  if (isLoggedOut) {
    if (savedPin) {
      if (!enteredPin) {
        const msg = 'Please enter your security PIN to continue.';
        showOnboardingPinError(msg);
        await showAppAlert({ title: 'PIN Required', message: msg, tone: 'warning' });
        if (pinInput) pinInput.focus();
        return;
      }
      const isMatch = await verifyUserPin(enteredPin);
      if (!isMatch) {
        const msg = 'Incorrect PIN. Please enter the correct PIN.';
        showOnboardingPinError(msg);
        await showAppAlert({ title: 'Authentication Failed', message: msg, tone: 'error' });
        if (pinInput) {
          pinInput.focus();
          pinInput.select();
        }
        return;
      }
    } else {
      if (enteredPin) {
        await saveUserPin(enteredPin);
      }
    }

    if (nameInput && nameInput.value.trim()) {
      saveUserName(nameInput.value.trim());
    }

    localStorage.removeItem(STORAGE_LOGGED_OUT);
    localStorage.setItem(STORAGE_ONBOARDED, 'true');

    const screen = document.getElementById('viewOnboarding');
    if (screen) {
      screen.classList.add('hidden');
      screen.style.display = 'none';
    }

    updateUserGreeting();
    renderHomeStats();
    renderRoadmapHero();
    switchView('home');
    return;
  }

  // First-time onboarding flow: Save name and PIN, then go to Step 2
  let name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : '';
  if (!name) name = 'Athlete';
  saveUserName(name);

  if (enteredPin) {
    await saveUserPin(enteredPin);
  }

  goToOnboardingStep2();
}

function prevOnboardingStep() {
  const step1 = document.getElementById('onboardingStep1');
  const googleChooser = document.getElementById('onboardingGoogleChooser');
  const step2 = document.getElementById('onboardingStep2');
  const btnBack = document.getElementById('btnOnboardingBack');
  const btnSkip = document.getElementById('btnOnboardingSkip');
  const screen = document.getElementById('viewOnboarding');

  if (step2 && step2.style.display === 'block') {
    step2.style.display = 'none';
    if (googleChooser && googleChooser.dataset.active === 'true') {
      googleChooser.style.display = 'block';
      if (btnBack) btnBack.style.display = 'inline-flex';
      if (btnSkip) btnSkip.style.display = 'none';
    } else {
      if (step1) step1.style.display = 'block';
      if (btnBack) btnBack.style.display = 'none';
      if (btnSkip) btnSkip.style.display = 'inline-flex';
    }
  } else if (googleChooser && googleChooser.style.display === 'block') {
    googleChooser.style.display = 'none';
    googleChooser.dataset.active = 'false';
    if (step1) step1.style.display = 'block';
    if (btnBack) btnBack.style.display = 'none';
    if (btnSkip) btnSkip.style.display = 'inline-flex';
  }
  if (screen) screen.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectOnboardingDiet(diet) {
  onboardingPlanState.diet = diet;
  const grid = document.getElementById('onboardingDietGrid');
  if (!grid) return;
  grid.querySelectorAll('.option-pill').forEach(btn => {
    if (btn.getAttribute('data-diet') === diet) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function selectOnboardingDuration(days) {
  onboardingPlanState.duration = Number(days);
  const grid = document.getElementById('onboardingDurationGrid');
  if (!grid) return;
  grid.querySelectorAll('.option-pill').forEach(btn => {
    if (Number(btn.getAttribute('data-days')) === Number(days)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function selectOnboardingGoal(goal) {
  onboardingPlanState.goal = goal;
  const grid = document.getElementById('onboardingGoalGrid');
  if (!grid) return;
  grid.querySelectorAll('.option-pill').forEach(btn => {
    if (btn.getAttribute('data-goal') === goal) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function selectOnboardingHours(hours) {
  onboardingPlanState.hours = hours;
  const grid = document.getElementById('onboardingHoursGrid');
  if (!grid) return;
  grid.querySelectorAll('.option-pill').forEach(btn => {
    if (btn.getAttribute('data-hours') === String(hours)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function finishOnboardingSetup() {
  try {
    const currentName = getUserName();
    roadmapFormState = {
      userName: currentName,
      duration: onboardingPlanState.duration,
      diet: onboardingPlanState.diet,
      hours: onboardingPlanState.hours,
      goal: onboardingPlanState.goal
    };

    athleteRoadmap = generateRoadmapPlan(roadmapFormState);
    saveRoadmap();

    localStorage.setItem(STORAGE_ONBOARDED, 'true');
    localStorage.setItem(STORAGE_PLAN_CONFIGURED, 'true');

    // Automatically apply meals to Today's tracker
    if (athleteRoadmap && athleteRoadmap.meals) {
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
    }
  } catch (err) {
    console.error('Error in finishOnboardingSetup:', err);
    localStorage.setItem(STORAGE_ONBOARDED, 'true');
    localStorage.setItem(STORAGE_PLAN_CONFIGURED, 'true');
  }

  const screen = document.getElementById('viewOnboarding');
  if (screen) {
    screen.classList.add('hidden');
    screen.style.display = 'none';
  }

  try {
    updateUserGreeting();
    renderHomeStats();
    renderRoadmapHero();
    switchView('home');
  } catch (renderErr) {
    console.error('Render error after onboarding:', renderErr);
    switchView('home');
  }
}

async function skipOnboarding() {
  const isLoggedOut = localStorage.getItem(STORAGE_LOGGED_OUT) === 'true';
  const savedPin = getUserPin();

  if (isLoggedOut && savedPin) {
    const msg = 'Please enter your security PIN to continue.';
    showOnboardingPinError(msg);
    await showAppAlert({ title: 'PIN Required', message: msg, tone: 'warning' });
    const pinInput = document.getElementById('onboardingUserPinInput');
    if (pinInput) pinInput.focus();
    return;
  }

  localStorage.removeItem(STORAGE_LOGGED_OUT);
  localStorage.setItem(STORAGE_ONBOARDED, 'true');

  const inputEl = document.getElementById('onboardingUserNameInput');
  let name = (inputEl && inputEl.value.trim()) ? inputEl.value.trim() : '';
  if (!name) name = getUserName() || 'Athlete';
  saveUserName(name);

  const screen = document.getElementById('viewOnboarding');
  if (screen) {
    screen.classList.add('hidden');
    screen.style.display = 'none';
  }

  resetOnboardingView();
  updateUserGreeting();
  renderHomeStats();
  renderRoadmapHero();
  switchView('home');
}

function submitOnboardingName(isSkip = false) {
  if (isSkip) {
    skipOnboarding();
  } else {
    handleOnboardingContinue();
  }
}

function completeOnboarding() {
  skipOnboarding();
}

function showOnboardingScreen() {
  const screen = document.getElementById('viewOnboarding');
  if (screen) {
    resetOnboardingView();
    screen.classList.remove('hidden');
    screen.style.display = 'flex';
    const skipBtn = document.getElementById('btnOnboardingSkip');
    if (skipBtn) skipBtn.style.display = 'inline-flex';
    const input = document.getElementById('onboardingUserNameInput');
    if (input) input.value = getUserName() === 'Athlete' ? '' : getUserName();
  }
}

async function resetForNewUser() {
  if (hasUserPin()) {
    const entered = await showAppPrompt({
      title: 'Security Verification',
      message: 'Please enter your current PIN to reset all device data.',
      placeholder: 'Enter current PIN',
      confirmText: 'Verify',
      tone: 'warning'
    });
    if (entered === null) return;
    const okPin = await verifyUserPin(entered);
    if (!okPin) {
      await showAppAlert({
        title: 'Reset Cancelled',
        message: 'Incorrect PIN. Device reset has been cancelled.',
        tone: 'error'
      });
      return;
    }
  }

  const ok = await showAppConfirm({
    title: 'Clear Device Data',
    message: 'Are you sure you want to permanently clear all local workout, nutrition, and profile records and start fresh?',
    confirmText: 'Clear All Data',
    cancelText: 'Cancel',
    tone: 'error'
  });
  if (!ok) return;

  localStorage.removeItem(STORAGE_ONBOARDED);
  localStorage.removeItem(STORAGE_USER_NAME);
  localStorage.removeItem(STORAGE_PLAN_CONFIGURED);
  localStorage.removeItem(STORAGE_ROADMAP);
  localStorage.removeItem(STORAGE_USER_PIN);
  localStorage.removeItem(STORAGE_LOGGED_OUT);
  localStorage.removeItem(STORAGE_HISTORY);
  localStorage.removeItem(STORAGE_MEALS);
  localStorage.removeItem('tushu_gym_habits_v1');
  localStorage.removeItem('tushu_room_fitness_v1');
  localStorage.removeItem('tushu_gym_pro_state_v1');

  workoutPlan = JSON.parse(JSON.stringify(DEFAULT_PLAN));
  savePlan();
  workoutHistory = [];
  saveHistory();
  nutritionMeals = [];
  saveMeals();

  athleteRoadmap = loadRoadmap();
  if (typeof renderHabitsView === 'function') renderHabitsView();
  if (typeof renderRoomFitnessHomeCard === 'function') renderRoomFitnessHomeCard();
  if (typeof renderRoomFitnessView === 'function') renderRoomFitnessView();
  
  const inputEl = document.getElementById('onboardingUserNameInput');
  if (inputEl) inputEl.value = '';
  const pinEl = document.getElementById('onboardingUserPinInput');
  if (pinEl) pinEl.value = '';

  resetOnboardingView();
  clearOnboardingPinError();

  const screen = document.getElementById('viewOnboarding');
  if (screen) {
    screen.classList.remove('hidden');
    screen.style.display = 'flex';
    const skipBtn = document.getElementById('btnOnboardingSkip');
    if (skipBtn) skipBtn.style.display = 'inline-flex';
  }

  updateUserGreeting();
  renderMeals();
  renderRoadmapHero();
  renderHomeStats();
}

// ==============================================
// Personal Dashboard & CodeByTushu Studio Controller
// ==============================================
function openPersonalDashboard() {
  updatePersonalDashboardUI();
  if (typeof renderOtaUpdateCard === 'function') renderOtaUpdateCard();
  openModal('personalDashboardModal');
}

function updatePersonalDashboardUI() {
  const nameEl = document.getElementById('personalDashName');
  const roleEl = document.getElementById('personalDashRole');
  const secEl = document.getElementById('personalDashSecBadge');
  const proTitleEl = document.getElementById('personalDashProTitle');
  const proDescEl = document.getElementById('personalDashProDesc');
  const name = getUserName();
  if (nameEl) nameEl.textContent = name;
  if (roleEl) {
    const goal = athleteRoadmap && athleteRoadmap.goalTitle ? athleteRoadmap.goalTitle : 'Personalized Athlete Protocol';
    roleEl.textContent = goal;
  }
  if (secEl) {
    secEl.textContent = hasUserPin() ? "ID & PASSWORD PROTECTED (OFFLINE)" : "DIRECT LOCAL ACCESS (NO PIN SET)";
  }
  if (typeof window.getProEntitlementStatus === 'function') {
    const ent = window.getProEntitlementStatus();
    if (proTitleEl && proDescEl) {
      if (ent && ent.unlocked) {
        proTitleEl.textContent = 'Gym Plan Pro • Lifetime Verified';
        proDescEl.textContent = `Active Lifetime Membership (TXN: ${ent.transactionId || 'Verified'}). Tap to open Pro Coach.`;
      } else if (ent && ent.status === 'PENDING_VERIFICATION') {
        proTitleEl.textContent = 'Gym Plan Pro • Pending Verification';
        proDescEl.textContent = 'Transaction submitted. Tap to complete verification and activate Lifetime Pro.';
      } else {
        proTitleEl.textContent = 'Gym Plan Pro (₹499 Lifetime)';
        proDescEl.textContent = 'Unlock personalized diet, water & workout coaching for a one-time ₹499 fee.';
      }
    }
  }

  const retDescEl = document.getElementById('personalDashRetentionDesc');
  if (retDescEl) {
    const policy = getRetentionPolicy();
    retDescEl.textContent = policy === 'keep_6_months'
      ? 'Auto-Delete > 6 Months (Active) • PRs & profile safe'
      : (policy === 'keep_1_year' ? 'Auto-Delete > 1 Year (Active) • PRs & profile safe' : 'Keep forever (Recommended) • 6-Month auto-cleanup available');
  }
}

async function promptChangeUserPin() {
  if (hasUserPin()) {
    const current = await showAppPrompt({
      title: 'Verify Current PIN',
      message: 'Please enter your current security PIN to continue.',
      placeholder: 'Current PIN / Password',
      confirmText: 'Continue',
      tone: 'info'
    });
    if (current === null) return;
    const ok = await verifyUserPin(current);
    if (!ok) {
      await showAppAlert({
        title: 'Verification Failed',
        message: 'Incorrect current PIN. Password update has been cancelled.',
        tone: 'error'
      });
      return;
    }
  }

  const newPin = await showAppPrompt({
    title: 'Set New PIN / Password',
    message: 'Enter a new security PIN or password (leave blank to disable PIN lock).',
    placeholder: 'New PIN or Password',
    confirmText: 'Save PIN',
    tone: 'info'
  });
  if (newPin === null) return;
  
  if (newPin.trim()) {
    await saveUserPin(newPin.trim());
    await showAppAlert({
      title: 'Security PIN Updated',
      message: 'Your new PIN has been encrypted (SHA-256) and saved securely on this device.',
      tone: 'success'
    });
  } else {
    await saveUserPin('');
    await showAppAlert({
      title: 'Security PIN Removed',
      message: 'PIN protection has been removed. Direct profile login is now active.',
      tone: 'info'
    });
  }
  updatePersonalDashboardUI();
}

function openCodeByTushuModal() {
  openModal('codeByTushuModal');
}

// View Switcher (Home, Workouts, Activity, Nutrition)
function switchView(viewName) {
  currentView = viewName;

  // Views mapping
  const views = {
    home: document.getElementById('viewHome'),
    workouts: document.getElementById('viewWorkouts'),
    activity: document.getElementById('viewActivity'),
    habits: document.getElementById('viewHabits'),
    nutrition: document.getElementById('viewNutrition'),
    'room-fitness': document.getElementById('viewRoomFitness')
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
    habits: document.getElementById('tabHabits'),
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
  } else if (viewName === 'habits') {
    if (typeof renderHabitsView === 'function') {
      renderHabitsView();
    }
  } else if (viewName === 'nutrition') {
    renderMeals();
    renderRoadmapHero();
  } else if (viewName === 'room-fitness') {
    if (typeof renderRoomFitnessView === 'function') {
      renderRoomFitnessView();
    }
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
  if (typeof renderRoomFitnessHomeCard === 'function') {
    renderRoomFitnessHomeCard();
  }
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
let dayPillHoldTimer = null;
let dayPillHoldTriggered = false;

function onDayPillTouchStart(dayKey) {
  dayPillHoldTriggered = false;
  dayPillHoldTimer = setTimeout(() => {
    dayPillHoldTriggered = true;
    openSwitchDayModal(dayKey);
  }, 450);
}

function onDayPillTouchEnd() {
  if (dayPillHoldTimer) {
    clearTimeout(dayPillHoldTimer);
    dayPillHoldTimer = null;
  }
}

function handleDayPillClick(dayKey) {
  if (dayPillHoldTriggered) {
    dayPillHoldTriggered = false;
    return;
  }
  if (currentDay === dayKey) {
    openSwitchDayModal(dayKey);
  } else {
    selectWorkoutDay(dayKey);
  }
}

function getDayPillLabel(dayKey) {
  const dayAbbrs = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun'
  };
  const abbr = dayAbbrs[dayKey] || dayKey.slice(0, 3);
  const data = workoutPlan[dayKey];
  if (!data) return abbr;

  if (data.status === 'rest') return `${abbr}: Rest`;
  if (data.status === 'off') return `${abbr}: Off`;
  if (data.status === 'absent') return `${abbr}: Absent`;

  const fullText = ((data.title || '') + ' ' + (data.focus || '')).toLowerCase();
  let short = 'Train';
  if (fullText.includes('chest')) short = 'Chest';
  else if (fullText.includes('back')) short = 'Back';
  else if (fullText.includes('shoulder')) short = 'Shoulders';
  else if (fullText.includes('arm')) short = 'Arms';
  else if (fullText.includes('leg')) short = 'Legs';
  else if (fullText.includes('hiit') || fullText.includes('core')) short = 'HIIT';
  else if (fullText.includes('recovery') || fullText.includes('mobility')) short = 'Recovery';
  else if (data.title) short = data.title.split(' ')[0];

  return `${abbr}: ${short}`;
}

function renderWorkoutDayPills() {
  const container = document.getElementById('workoutDayPills');
  if (!container) return;

  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  container.innerHTML = dayKeys.map(k => {
    const isActive = k === currentDay;
    const label = getDayPillLabel(k);
    return `
      <button class="filter-pill ${isActive ? 'active' : ''}"
        onclick="handleDayPillClick('${k}')"
        ontouchstart="onDayPillTouchStart('${k}')"
        ontouchend="onDayPillTouchEnd()"
        ontouchcancel="onDayPillTouchEnd()"
        oncontextmenu="event.preventDefault(); openSwitchDayModal('${k}')"
        title="Tap to view • Hold or tap again to switch or mark rest/off">
        ${label}
      </button>
    `;
  }).join('');
}

function selectWorkoutDay(dayKey) {
  currentDay = dayKey;
  renderWorkoutDayPills();
  renderWorkoutView();
}

function openSwitchDayModal(dayKey) {
  const targetDay = dayKey || currentDay;
  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const hiddenInput = document.getElementById('switchTargetDayKey');
  if (hiddenInput) hiddenInput.value = targetDay;

  const titleEl = document.getElementById('switchDayModalTitle');
  if (titleEl) titleEl.innerText = `Manage ${dayNames[targetDay] || targetDay}`;

  const data = workoutPlan[targetDay] || {};
  const status = data.status || 'active';

  const radios = document.getElementsByName('dayStatusRadio');
  radios.forEach(r => {
    r.checked = (r.value === status);
  });
  onDayStatusRadioChange(status);

  const focusSelect = document.getElementById('switchMuscleFocusSelect');
  if (focusSelect) {
    const f = (data.focus || data.title || '').toLowerCase();
    if (f.includes('chest')) focusSelect.value = 'chest';
    else if (f.includes('back')) focusSelect.value = 'back';
    else if (f.includes('shoulder')) focusSelect.value = 'shoulders';
    else if (f.includes('arm')) focusSelect.value = 'arms';
    else if (f.includes('leg')) focusSelect.value = 'legs';
    else if (f.includes('hiit') || f.includes('core')) focusSelect.value = 'hiit';
    else if (f.includes('recovery')) focusSelect.value = 'recovery';
  }

  const swapSelect = document.getElementById('swapTargetDaySelect');
  if (swapSelect) {
    const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const other = allDays.find(d => d !== targetDay) || 'tuesday';
    swapSelect.value = other;
  }

  openModal('switchWorkoutDayModal');
}

function onDayStatusRadioChange(status) {
  const focusSec = document.getElementById('switchFocusSection');
  if (focusSec) {
    focusSec.style.display = (status === 'active') ? 'block' : 'none';
  }
}

function setDayStatus(dayKey, status) {
  if (!workoutPlan[dayKey]) return;
  workoutPlan[dayKey].status = status;
  savePlan();
  renderWorkoutDayPills();
  renderWorkoutView();
}

function submitSwitchWorkoutDay(e) {
  if (e) e.preventDefault();
  const targetDay = document.getElementById('switchTargetDayKey').value || currentDay;
  if (!workoutPlan[targetDay]) return;

  const radios = document.getElementsByName('dayStatusRadio');
  let selectedStatus = 'active';
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedStatus = radios[i].value;
      break;
    }
  }

  workoutPlan[targetDay].status = selectedStatus;

  if (selectedStatus === 'active') {
    const focusSelect = document.getElementById('switchMuscleFocusSelect');
    const selectedFocus = focusSelect ? focusSelect.value : 'chest';

    const focusTemplates = {
      chest: {
        title: 'Chest & Athletic Core',
        focus: 'Push Strength & Core Stability',
        sourceDay: 'monday'
      },
      back: {
        title: 'Back & Biceps Hypertrophy',
        focus: 'Pull Hypertrophy & Traps',
        sourceDay: 'tuesday'
      },
      shoulders: {
        title: 'Shoulders & Traps',
        focus: 'Boulder Delts & Upper Traps',
        sourceDay: 'wednesday'
      },
      arms: {
        title: 'Arms & Core Supersets',
        focus: 'Biceps & Triceps Mass',
        sourceDay: 'thursday'
      },
      hiit: {
        title: 'HIIT & Core Conditioning',
        focus: 'Metabolic Conditioning & Core',
        sourceDay: 'friday'
      },
      legs: {
        title: 'Legs & Explosive Glutes',
        focus: 'Lower Body Strength & Quads',
        sourceDay: 'saturday'
      },
      recovery: {
        title: 'Active Recovery & Mobility',
        focus: 'Mobility & Foam Rolling',
        sourceDay: 'sunday'
      }
    };

    const tmpl = focusTemplates[selectedFocus];
    if (tmpl) {
      workoutPlan[targetDay].title = tmpl.title;
      workoutPlan[targetDay].focus = tmpl.focus;
      const srcExercises = DEFAULT_PLAN[tmpl.sourceDay] ? DEFAULT_PLAN[tmpl.sourceDay].exercises : [];
      workoutPlan[targetDay].exercises = JSON.parse(JSON.stringify(srcExercises));
    }
  }

  savePlan();
  renderWorkoutDayPills();
  renderWorkoutView();
  closeModal('switchWorkoutDayModal');
}

function executeSwapDays() {
  const dayA = document.getElementById('switchTargetDayKey').value || currentDay;
  const dayB = document.getElementById('swapTargetDaySelect').value;

  if (!dayA || !dayB || dayA === dayB) {
    if (typeof showAppAlert === 'function') {
      showAppAlert({ title: 'Select Different Day', message: 'Please select a different day to swap plans.', tone: 'info' });
    }
    return;
  }

  const planA = JSON.parse(JSON.stringify(workoutPlan[dayA]));
  const planB = JSON.parse(JSON.stringify(workoutPlan[dayB]));

  workoutPlan[dayA] = planB;
  workoutPlan[dayB] = planA;

  savePlan();
  renderWorkoutDayPills();
  renderWorkoutView();
  closeModal('switchWorkoutDayModal');

  if (typeof showAppAlert === 'function') {
    showAppAlert({
      title: 'Plans Swapped',
      message: `Successfully swapped ${dayA.toUpperCase()} and ${dayB.toUpperCase()} workout routines!`,
      tone: 'success'
    });
  }
}

function renderWorkoutView() {
  const dayData = workoutPlan[currentDay];
  if (!dayData) return;

  const titleEl = document.getElementById('workoutDayTitle');
  const focusEl = document.getElementById('workoutDayFocus');
  const todayBadge = document.getElementById('workoutTodayBadge');
  const schemeBox = document.getElementById('workoutSchemeBox');

  if (titleEl) titleEl.innerText = dayData.title;
  if (focusEl) focusEl.innerText = dayData.focus;
  if (todayBadge) {
    todayBadge.style.display = (currentDay === getTodayDayKey()) ? 'inline-block' : 'none';
  }

  const listEl = document.getElementById('exerciseList');
  if (!listEl) return;

  // Handle Rest / Off / Absent day views
  if (dayData.status === 'rest' || dayData.status === 'off' || dayData.status === 'absent') {
    if (schemeBox) schemeBox.style.display = 'none';

    let icon = '🛌';
    let title = 'Rest & Recovery Day';
    let desc = 'Rest is where muscle growth and neural adaptation happen! Hydrate well with 3+ liters of water, maintain clean athlete nutrition, and let your muscles rebuild.';
    let btnText = 'Resume Workout Routine';

    if (dayData.status === 'off') {
      icon = '⏸️';
      title = 'Gym Off / Holiday';
      desc = 'Gym is closed or scheduled day off. Enjoy your recovery and stay energized!';
      btnText = 'Switch to Active Workout';
    } else if (dayData.status === 'absent') {
      icon = '❌';
      title = 'Absent / Missed Session';
      desc = 'Marked as absent today. Real champions look forward: stay disciplined with your nutrition and crush tomorrow\'s workout!';
      btnText = 'Log Workout Anyway';
    }

    listEl.innerHTML = `
      <div class="rest-day-card">
        <div class="rest-day-icon">${icon}</div>
        <h2 class="rest-day-title">${title}</h2>
        <p class="rest-day-desc">${desc}</p>
        <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          <button type="button" class="btn btn-outline" onclick="openSwitchDayModal('${currentDay}')">Change Status</button>
          <button type="button" class="btn btn-primary" onclick="setDayStatus('${currentDay}', 'active')">${btnText}</button>
        </div>
      </div>
    `;
    return;
  }

  if (schemeBox) schemeBox.style.display = 'block';

  if (!dayData.exercises || dayData.exercises.length === 0) {
    listEl.innerHTML = `
      <div class="glass-card" style="text-align: center; padding: 30px 16px;">
        <p style="color: var(--text-muted); margin-bottom: 12px;">No exercises scheduled for this day.</p>
        <button class="btn btn-primary" onclick="openAddExerciseModal()">+ Add Exercise</button>
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

async function deleteExerciseDirect(exId) {
  const ok = await showAppConfirm({
    title: 'Delete Exercise',
    message: 'Are you sure you want to remove this exercise from today’s routine?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    tone: 'warning'
  });
  if (!ok) return;
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

  // From plan - Only record PRs from sets that the user has ACTUALLY completed (s.done === true)
  Object.keys(workoutPlan).forEach(dayKey => {
    const day = workoutPlan[dayKey];
    if (day.exercises && day.status !== 'rest' && day.status !== 'off' && day.status !== 'absent') {
      day.exercises.forEach(ex => {
        let maxWeight = 0;
        ex.sets.forEach(s => {
          const w = parseFloat(s.weight) || 0;
          const r = parseInt(s.reps) || s.targetReps || 0;
          if (s.done) {
            totalSets++;
            totalVolume += w * r;
            if (w > maxWeight) maxWeight = w;
          }
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
      prListEl.innerHTML = `
        <div style="text-align: center; padding: 20px 10px;">
          <p style="font-size: 0.84rem; font-weight: 500; color: var(--text-secondary); margin-bottom: 4px;">No Personal Records logged yet</p>
          <span style="font-size: 0.74rem; color: var(--text-tertiary); line-height: 1.4; display: block;">Complete and tick your workout sets to record your personal bests here.</span>
        </div>
      `;
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

function formatCurrentTime() {
  const d = new Date();
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
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

  container.innerHTML = nutritionMeals.map((meal, idx) => {
    const timingDisplay = meal.timing ? `${escapeHtml(meal.timing)} • ` : '';
    let descText = meal.desc || '';
    if (!descText && meal.calories) {
      descText = `${timingDisplay}${meal.calories} kcal`;
    } else if (meal.timing && !descText.includes(meal.timing)) {
      descText = `${meal.timing} • ${descText}`;
    }

    return `
      <div class="meal-item" id="meal-item-${idx}">
        <div class="meal-left" onclick="openEditMealModal(${idx})" title="Tap to edit meal">
          <div class="meal-avatar-icon">
            ${getMealIconSvg(meal.type)}
          </div>
          <div class="meal-info">
            <span class="meal-name">${escapeHtml(meal.name)}</span>
            <span class="meal-desc">${escapeHtml(descText)}</span>
          </div>
        </div>
        <div class="meal-right-actions">
          <button type="button" class="meal-icon-btn" onclick="event.stopPropagation(); openEditMealModal(${idx})" title="Edit meal" aria-label="Edit">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
          <button type="button" class="meal-icon-btn delete" onclick="event.stopPropagation(); deleteMealDirect(${idx})" title="Delete meal" aria-label="Delete">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
          <button type="button" class="check-btn ${meal.done ? 'checked' : ''}" onclick="event.stopPropagation(); toggleMealDone(${idx})" aria-label="Toggle meal">
            ${meal.done ? '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleMealDone(idx) {
  if (!nutritionMeals[idx]) return;
  nutritionMeals[idx].done = !nutritionMeals[idx].done;
  saveMeals();
  renderMeals();
}

function openAddMealModal() {
  const nameEl = document.getElementById('mealInputName');
  const calEl = document.getElementById('mealInputCalories');
  const timeEl = document.getElementById('mealInputTiming');
  if (nameEl) nameEl.value = '';
  if (calEl) calEl.value = '';
  if (timeEl) timeEl.value = formatCurrentTime();
  openModal('addMealModal');
}

function submitAddMeal(e) {
  e.preventDefault();
  const name = document.getElementById('mealInputName').value.trim();
  const timeInput = document.getElementById('mealInputTiming');
  const timing = (timeInput && timeInput.value.trim()) ? timeInput.value.trim() : formatCurrentTime();
  const calories = parseInt(document.getElementById('mealInputCalories').value) || 400;
  const type = document.getElementById('mealInputType').value || 'Snacks';

  if (!name) return;

  nutritionMeals.push({
    id: 'm_' + Date.now(),
    name: name,
    timing: timing,
    desc: `${timing} • ${calories} kcal • Custom Meal`,
    type: type,
    done: true,
    calories: calories
  });

  saveMeals();
  renderMeals();
  closeModal('addMealModal');
}

function openEditMealModal(idx) {
  const meal = nutritionMeals[idx];
  if (!meal) return;
  document.getElementById('editMealIndex').value = idx;
  document.getElementById('editMealName').value = meal.name || '';
  document.getElementById('editMealTiming').value = meal.timing || '';
  document.getElementById('editMealCalories').value = meal.calories || 400;
  document.getElementById('editMealType').value = meal.type || 'Snacks';
  document.getElementById('editMealDesc').value = meal.desc || '';
  openModal('editMealModal');
}

function submitEditMeal(e) {
  if (e) e.preventDefault();
  const idx = parseInt(document.getElementById('editMealIndex').value, 10);
  if (isNaN(idx) || !nutritionMeals[idx]) return;

  const name = document.getElementById('editMealName').value.trim();
  const timing = document.getElementById('editMealTiming').value.trim();
  const calories = parseInt(document.getElementById('editMealCalories').value, 10) || 400;
  const type = document.getElementById('editMealType').value || 'Snacks';
  const customDesc = document.getElementById('editMealDesc').value.trim();

  if (!name) return;

  nutritionMeals[idx].name = name;
  nutritionMeals[idx].timing = timing;
  nutritionMeals[idx].calories = calories;
  nutritionMeals[idx].type = type;

  if (customDesc && !customDesc.startsWith(timing) && !customDesc.includes('kcal')) {
    nutritionMeals[idx].desc = `${timing ? timing + ' • ' : ''}${calories} kcal • ${customDesc}`;
  } else if (customDesc) {
    nutritionMeals[idx].desc = customDesc;
  } else {
    nutritionMeals[idx].desc = `${timing ? timing + ' • ' : ''}${calories} kcal`;
  }

  saveMeals();
  renderMeals();
  closeModal('editMealModal');
}

async function deleteMealFromModal() {
  const idx = parseInt(document.getElementById('editMealIndex').value, 10);
  if (isNaN(idx) || !nutritionMeals[idx]) return;
  const mealName = nutritionMeals[idx].name || 'this meal';

  if (typeof showAppConfirm === 'function') {
    const ok = await showAppConfirm({
      title: 'Delete Meal',
      message: `Are you sure you want to delete "${mealName}" from your diet plan?`,
      confirmText: 'Delete',
      tone: 'warning'
    });
    if (!ok) return;
  }

  nutritionMeals.splice(idx, 1);
  saveMeals();
  renderMeals();
  closeModal('editMealModal');
}

async function deleteMealDirect(idx) {
  if (!nutritionMeals[idx]) return;
  const mealName = nutritionMeals[idx].name || 'this meal';

  if (typeof showAppConfirm === 'function') {
    const ok = await showAppConfirm({
      title: 'Delete Meal',
      message: `Are you sure you want to delete "${mealName}"?`,
      confirmText: 'Delete',
      tone: 'warning'
    });
    if (!ok) return;
  }

  nutritionMeals.splice(idx, 1);
  saveMeals();
  renderMeals();
}

// ----------------------------------------------------
// ATHLETE DIET & GYM ROADMAP ENGINE (Offline Generator)
// ----------------------------------------------------
let roadmapFormState = {
  userName: '',
  duration: 30,
  diet: 'veg',
  hours: '1.5-2',
  goal: 'shred'
};
let activeRoadmapDetailsTab = 'diet';

function generateRoadmapPlan(options) {
  const profileName = (options.userName && options.userName.trim()) ? options.userName.trim() : ((options.profileName && options.profileName.trim()) ? options.profileName.trim() : getUserName());
  const duration = parseInt(options.duration) || 30;
  const diet = options.diet || 'veg';
  const hours = options.hours || '1.5-2';
  const goal = options.goal || 'shred';

  let targetCalories = 2400;
  let proteinGrams = 160;
  let carbsGrams = 220;
  let fatsGrams = 60;
  let dietLabel = 'High-Protein Vegetarian';
  let goalLabel = 'Virat Kohli Athletic Lean Shred';

  if (goal === 'bulk') {
    targetCalories = 2800;
    proteinGrams = 180;
    carbsGrams = 300;
    fatsGrams = 75;
    goalLabel = 'Clean Muscle Bulk & Hypertrophy';
  } else if (goal === 'shred') {
    targetCalories = 2250;
    proteinGrams = 165;
    carbsGrams = 195;
    fatsGrams = 52;
    goalLabel = 'Virat Kohli Athletic Lean Shred';
  } else if (goal === 'speed') {
    targetCalories = 2450;
    proteinGrams = 160;
    carbsGrams = 240;
    fatsGrams = 58;
    goalLabel = 'Speed, Agility & Explosive Power';
  } else if (goal === 'fitness') {
    targetCalories = 2150;
    proteinGrams = 145;
    carbsGrams = 200;
    fatsGrams = 50;
    goalLabel = 'Daily Functional Fitness & Posture';
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
    isGuest: Boolean(options && options.isGuest),
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
  // Backwards compatibility stub
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
  const currentName = getUserName();
  const nameInput = document.getElementById('roadmapUserName');
  if (nameInput) {
    nameInput.value = (currentName === 'Athlete') ? '' : currentName;
  }

  if (athleteRoadmap) {
    roadmapFormState.userName = currentName;
    roadmapFormState.duration = athleteRoadmap.durationDays || 30;
    roadmapFormState.diet = athleteRoadmap.dietType || 'veg';
    roadmapFormState.hours = athleteRoadmap.gymHoursPerDay || '1.5-2';
    roadmapFormState.goal = athleteRoadmap.goal || 'shred';
  } else {
    roadmapFormState.userName = currentName;
  }

  selectRoadmapDuration(roadmapFormState.duration);
  selectRoadmapDiet(roadmapFormState.diet);
  selectRoadmapHours(roadmapFormState.hours);
  selectRoadmapGoal(roadmapFormState.goal);

  openModal('roadmapModal');
}

function submitRoadmapGenerator(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('roadmapUserName');
  const enteredName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : getUserName();
  saveUserName(enteredName);
  roadmapFormState.userName = enteredName;

  athleteRoadmap = generateRoadmapPlan(roadmapFormState);
  saveRoadmap();

  localStorage.setItem(STORAGE_PLAN_CONFIGURED, 'true');

  // Automatically apply meals to Today's tracker
  if (athleteRoadmap && athleteRoadmap.meals) {
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
  }

  updateUserGreeting();
  renderHomeStats();
  renderRoadmapHero();
  closeModal('roadmapModal');
  openRoadmapDetailsModal();

  if (window.AndroidBridge && typeof window.AndroidBridge.vibratePhone === 'function') {
    window.AndroidBridge.vibratePhone(50);
  }
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
        let title = 'Gym Plan';
        let msg = 'Daily target pending. Tap to open and complete.';
        if (id === 'workout') {
          const dayData = workoutPlan[getTodayDayKey()] || {};
          title = 'Training Call: ' + (dayData.title || 'Workout');
          msg = 'Today’s workout session is pending. Start your 7-12-15 protocol.';
        } else if (id === 'hydrate') {
          title = 'Hydration Alert';
          msg = 'Hydration pending. Drink 500 ml of water to support recovery and performance.';
        } else if (id === 'fuel') {
          title = 'Post-Workout Fuel Alert';
          msg = 'Nutrition pending. Consume 30g high-quality protein to support muscle recovery.';
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
      pendingMsg: `Today's ${todayWorkout.title || 'workout'} session is still pending. Start your first heavy 7-rep set.`,
      doneMsg: `Completed! Today's training session (${todayWorkout.title || 'Workout'}) is finished.`,
      actionBtnText: 'Open Workout ->',
      onAction: "jumpToReminderView('workouts')"
    },
    {
      id: 'hydrate',
      key: 'hydrate',
      title: 'Hydration Protocol',
      sub: '3.5L Daily Goal • Fluid Balance',
      iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
      pendingMsg: 'Hydration pending. Log 500 ml of water to stay energized and hydrated.',
      doneMsg: 'Target reached! Today’s 3.5L daily hydration goal is complete.',
      isWater: true
    },
    {
      id: 'fuel',
      key: 'fuel',
      title: 'Post-Workout Fuel',
      sub: '30g High Protein • Recovery Window',
      iconSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>`,
      pendingMsg: 'Nutrition pending. Log your high-protein recovery meal to refuel.',
      doneMsg: 'Completed! Post-workout recovery nutrition has been logged.',
      actionBtnText: 'Open Nutrition ->',
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
async function resetTodayWorkout() {
  const ok = await showAppConfirm({
    title: 'Reset Today’s Sets',
    message: 'Uncheck all completed sets for today? Your logged weights will remain saved.',
    confirmText: 'Reset Sets',
    cancelText: 'Cancel',
    tone: 'warning'
  });
  if (!ok) {
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
    app: "GymPlan",
    version: "0.05",
    userName: getUserName(),
    plan: workoutPlan,
    history: workoutHistory,
    meals: nutritionMeals,
    roadmap: athleteRoadmap,
    proState: typeof window.getProBackupSnapshot === 'function' ? window.getProBackupSnapshot() : null,
    habits: typeof window.getHabitsBackupSnapshot === 'function' ? window.getHabitsBackupSnapshot() : null,
    roomFitness: typeof window.getRoomFitnessBackupSnapshot === 'function' ? window.getRoomFitnessBackupSnapshot() : null,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `GymPlan_Backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function importWorkoutData(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (hasUserPin()) {
    const entered = await showAppPrompt({
      title: 'Security Verification',
      message: 'Please enter your current security PIN to restore this backup.',
      placeholder: 'Enter security PIN',
      confirmText: 'Verify & Restore',
      tone: 'info'
    });
    if (!entered) {
      event.target.value = '';
      return;
    }
    const okPin = await verifyUserPin(entered);
    if (!okPin) {
      await showAppAlert({
        title: 'Restore Cancelled',
        message: 'Incorrect PIN. Backup restoration has been cancelled.',
        tone: 'error'
      });
      event.target.value = '';
      return;
    }
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data && typeof data === 'object') {
        if (data.userName && typeof data.userName === 'string') {
          saveUserName(data.userName);
        }
        if (data.plan && typeof data.plan === 'object') {
          workoutPlan = data.plan;
          savePlan();
        }
        if (Array.isArray(data.history)) {
          workoutHistory = data.history;
          saveHistory();
        }
        if (Array.isArray(data.meals)) {
          nutritionMeals = data.meals;
          saveMeals();
        }
        if (data.roadmap && typeof data.roadmap === 'object') {
          athleteRoadmap = data.roadmap;
          saveRoadmap();
          renderRoadmapHero();
        }
        if (data.proState && typeof window.restoreProBackupSnapshot === 'function') {
          await window.restoreProBackupSnapshot(data.proState);
        }
        if (data.habits && typeof window.restoreHabitsBackupSnapshot === 'function') {
          window.restoreHabitsBackupSnapshot(data.habits);
        }
        if (data.roomFitness && typeof window.restoreRoomFitnessBackupSnapshot === 'function') {
          window.restoreRoomFitnessBackupSnapshot(data.roomFitness);
        }
        await showAppAlert({
          title: 'Backup Restored',
          message: 'Your workout, nutrition, and profile records have been restored successfully.',
          tone: 'success'
        });
        updateUserGreeting();
        renderHomeStats();
        renderWorkoutView();
        renderMeals();
        renderRoadmapHero();
        closeModal('backupModal');
      }
    } catch (err) {
      await showAppAlert({
        title: 'Invalid File',
        message: 'The selected file is not a valid Gym Plan JSON backup.',
        tone: 'error'
      });
    }
  };
  reader.readAsText(file);
}

// ==============================================
// Data Retention & Storage Lifecycle Policy
// ==============================================
function getRetentionPolicy() {
  try {
    return localStorage.getItem(STORAGE_RETENTION_POLICY) || 'keep_forever';
  } catch (e) {
    return 'keep_forever';
  }
}

function setRetentionPolicy(policy) {
  try {
    localStorage.setItem(STORAGE_RETENTION_POLICY, policy);
  } catch (e) {}
}

function applyDataRetentionPolicy(forceDays) {
  const policy = forceDays ? (forceDays === 180 ? 'keep_6_months' : 'keep_1_year') : getRetentionPolicy();
  if (policy === 'keep_forever' && !forceDays) return { workoutPruned: 0, mealsPruned: 0, habitsPruned: 0 };

  const days = forceDays || (policy === 'keep_6_months' ? 180 : 365);
  const cutoffTime = Date.now() - (days * 86400000);

  let workoutPruned = 0;
  if (Array.isArray(workoutHistory)) {
    const origCount = workoutHistory.length;
    workoutHistory = workoutHistory.filter(item => {
      if (!item || !item.date) return true;
      const itemTime = new Date(item.date).getTime();
      return isNaN(itemTime) || itemTime >= cutoffTime;
    });
    workoutPruned = origCount - workoutHistory.length;
    if (workoutPruned > 0) saveHistory();
  }

  let mealsPruned = 0;
  if (Array.isArray(nutritionMeals)) {
    const origMeals = nutritionMeals.length;
    nutritionMeals = nutritionMeals.filter(m => {
      if (!m || !m.date) return true;
      const mTime = new Date(m.date).getTime();
      return isNaN(mTime) || mTime >= cutoffTime;
    });
    mealsPruned = origMeals - nutritionMeals.length;
    if (mealsPruned > 0) saveMeals();
  }

  const cutoffIso = new Date(cutoffTime).toISOString().split('T')[0];

  let habitsPruned = 0;
  if (typeof window.pruneHabitsLogsOlderThan === 'function') {
    habitsPruned = window.pruneHabitsLogsOlderThan(cutoffIso) || 0;
  }

  let roomPruned = 0;
  if (typeof window.pruneRoomFitnessLogsOlderThan === 'function') {
    roomPruned = window.pruneRoomFitnessLogsOlderThan(cutoffIso) || 0;
  }

  return { workoutPruned, mealsPruned, habitsPruned: habitsPruned + roomPruned };
}

function openRetentionPolicyModal() {
  const policy = getRetentionPolicy();
  const radForever = document.getElementById('retentionOptionForever');
  const rad6 = document.getElementById('retentionOption6Months');
  const rad1 = document.getElementById('retentionOption1Year');

  if (radForever) radForever.checked = (policy === 'keep_forever');
  if (rad6) rad6.checked = (policy === 'keep_6_months');
  if (rad1) rad1.checked = (policy === 'keep_1_year');

  openModal('retentionPolicyModal');
}

function saveRetentionPolicyFromModal() {
  const rad6 = document.getElementById('retentionOption6Months');
  const rad1 = document.getElementById('retentionOption1Year');
  let chosen = 'keep_forever';
  if (rad6 && rad6.checked) chosen = 'keep_6_months';
  else if (rad1 && rad1.checked) chosen = 'keep_1_year';

  setRetentionPolicy(chosen);
  applyDataRetentionPolicy();
  updatePersonalDashboardUI();
  closeModal('retentionPolicyModal');

  const label = chosen === 'keep_6_months'
    ? 'Auto-delete older than 6 months is now active. Daily logs older than 180 days will be cleanly pruned while preserving your PRs and profile.'
    : (chosen === 'keep_1_year' ? 'Auto-delete older than 1 year is now active.' : 'Keep Forever is active. All your past records are permanently preserved.');

  showAppAlert({
    title: 'Retention Policy Saved',
    message: label,
    tone: 'success'
  });
}

async function triggerManualPrune6Months() {
  const confirmed = await showAppConfirm({
    title: 'Clean Logs Older Than 6 Months',
    message: 'This will purge daily workout logs and habit marks older than 180 days. Your Personal Records (PRs), Profile, and Active Plan will NOT be affected. Proceed?',
    confirmText: 'Clean Old Data',
    tone: 'warning'
  });

  if (!confirmed) return;

  const result = applyDataRetentionPolicy(180);
  renderHomeStats();
  renderWeeklyBars();
  renderActivityStats();
  renderMeals();
  if (typeof renderHabitsView === 'function') renderHabitsView();
  updatePersonalDashboardUI();

  const total = result.workoutPruned + result.mealsPruned + result.habitsPruned;
  showAppAlert({
    title: 'Storage Cleaned',
    message: total > 0
      ? `Cleaned ${total} historical entries older than 6 months (${result.workoutPruned} workouts, ${result.habitsPruned} habit days, ${result.mealsPruned} meals). Your PRs and current plan remain untouched.`
      : 'No logs older than 6 months were found. Your storage is already clean and optimized.',
    tone: 'info'
  });
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

// ==============================================
// Multi-Tier Navigation & Back Button Controller
// Prevents accidental app exit when modals/tabs are open
// ==============================================
window.handleBackPress = function () {
  try {
    // 1. Check if In-App Dialog is open
    const appDialog = document.getElementById('appDialogModal');
    if (appDialog && appDialog.classList.contains('open')) {
      const cancelBtn = document.getElementById('appDialogCancelBtn');
      if (cancelBtn && cancelBtn.style.display !== 'none') {
        cancelBtn.click();
      } else {
        const confirmBtn = document.getElementById('appDialogConfirmBtn');
        if (confirmBtn) confirmBtn.click();
        else appDialog.classList.remove('open');
      }
      return 'handled';
    }

    // 2. Check for any open Modal (.modal-backdrop.open)
    const openModals = Array.from(document.querySelectorAll('.modal-backdrop.open'));
    if (openModals.length > 0) {
      const topModal = openModals[openModals.length - 1];
      if (typeof closeModal === 'function') {
        closeModal(topModal.id);
      } else {
        topModal.classList.remove('open');
      }
      return 'handled';
    }

    // 3. Check if Side Navigation Drawer is open
    const drawerBackdrop = document.getElementById('drawerBackdrop');
    if (drawerBackdrop && drawerBackdrop.classList.contains('open')) {
      if (typeof closeSideDrawer === 'function') {
        closeSideDrawer();
      } else {
        drawerBackdrop.classList.remove('open');
      }
      return 'handled';
    }

    // 4. If in Habits view on subtab other than cards, return to cards first
    if (typeof currentView !== 'undefined' && currentView === 'habits' && typeof window.getHabitsActiveSubTab === 'function') {
      if (window.getHabitsActiveSubTab() !== 'cards') {
        if (typeof window.switchHabitsSubTab === 'function') {
          window.switchHabitsSubTab('cards');
          return 'handled';
        }
      }
    }

    // 5. Check if user is on another tab/view (not 'home')
    if (typeof currentView !== 'undefined' && currentView !== 'home') {
      if (typeof switchView === 'function') {
        switchView('home');
      }
      return 'handled';
    }

    // 6. Already on Home view with zero modals/drawers open
    return 'root';
  } catch (err) {
    console.error('Error handling back press:', err);
    return 'unhandled';
  }
};

// Fallback popstate listener for Web/PWA browsers
window.addEventListener('popstate', function () {
  if (typeof Android !== 'undefined' && Android.isNativeAndroid && Android.isNativeAndroid()) {
    return; // Handled natively by MainActivity
  }
  window.handleBackPress();
});

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
