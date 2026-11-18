/**
 * MuscleWiki-Grade Exercise Visual Guides & Human Biomechanical Motion
 * Powered by CodeByTushu • Version 0.05 • 100% Offline Ready
 * Multi-Angle Human Demonstration (Front & Side) + Anatomical Muscle Mapping
 */

// IndexedDB Helper for Custom Exercise Videos & GIFs (100% Local Device Storage)
const DB_NAME = 'AthleticGymMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'exercise_media';

function openMediaDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

async function getCustomMedia(exId) {
  try {
    const db = await openMediaDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(exId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.error("IndexedDB get error:", e);
    return null;
  }
}

async function saveCustomMedia(exId, fileBlob) {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(fileBlob, exId);
    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function deleteCustomMedia(exId) {
  const db = await openMediaDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(exId);
    req.onsuccess = () => resolve(true);
    req.onerror = (e) => reject(e.target.error);
  });
}

// =========================================================================
// MuscleWiki Master Exercise Database (Monday to Saturday + Sunday Recovery)
// =========================================================================
const EXERCISE_GUIDES = {
  // ----------------------------------------------------
  // MONDAY: CHEST & ATHLETIC CORE
  // ----------------------------------------------------
  m1: {
    name: "Incline Dumbbell Bench Press",
    equipment: "Dumbbell",
    level: "Intermediate",
    type: "Compound",
    category: "incline_press",
    primaryMuscle: "Pectoralis Major (Clavicular Head)",
    secondaryMuscle: "Anterior Deltoids, Triceps Brachii",
    tertiaryMuscle: "Rotator Cuff, Core Stabilizers",
    gripType: "Neutral to Slight Pronation",
    forceType: "Push",
    tempo: "2s Controlled Down -> 1s Explosive Press",
    anatomyTarget: { primary: "chest", secondary: "delt" },
    instructions: [
      "Set the adjustable bench to an angle between 30 and 45 degrees. Sit back with a pair of dumbbells resting on your knees.",
      "Kick dumbbells to shoulder level as you lie back. Retract your scapulae firmly against the bench pad and plant both feet flat on the floor.",
      "Lower the dumbbells in a smooth, converging path toward the sides of your upper chest, maintaining approximately a 70-degree elbow tuck.",
      "Press the weights upward explosively without clanking the dumbbell heads at the top, focusing on an intense clavicular pectoral contraction."
    ],
    mistakes: "Setting bench steeper than 45 degrees shifts tension away from the upper chest directly onto the front shoulder joints.",
    proTip: "Keep a 1-second pause at the bottom stretch position to eliminate bounce momentum and trigger deep muscle recruitment."
  },
  m2: {
    name: "Flat Barbell Bench Press",
    equipment: "Barbell",
    level: "Intermediate",
    type: "Compound",
    category: "bench_press",
    primaryMuscle: "Pectoralis Major (Sternal Mid Chest)",
    secondaryMuscle: "Triceps Brachii, Anterior Deltoids",
    tertiaryMuscle: "Latissimus Dorsi (Stabilizer), Core",
    gripType: "Overhand (Pronated, 1.5x Shoulder Width)",
    forceType: "Push",
    tempo: "2s Controlled Lower -> 1s Powerful Drive",
    anatomyTarget: { primary: "chest", secondary: "tricep" },
    instructions: [
      "Lie supine on the flat bench with your eyes aligned directly under the racked barbell. Pinch your shoulder blades down and back.",
      "Grip the knurled bar evenly with a closed overhand grip. Unrack by extending your arms and stabilizing the load over your sternum.",
      "Inhale deeply, brace your abdominal wall, and lower the bar under strict control until it lightly touches your mid-nipple line.",
      "Drive through your heels, push your upper back into the bench, and press the bar powerfully back to the starting lockout."
    ],
    mistakes: "Never bounce the barbell off your ribcage or flare your elbows at a 90-degree angle, which overstresses shoulder capsules.",
    proTip: "Think about trying to bend the barbell in half outward to engage your lats and keep your shoulders safely packed."
  },
  m3: {
    name: "Weighted / Bodyweight Dips",
    equipment: "Bodyweight",
    level: "Intermediate",
    type: "Compound",
    category: "dip",
    primaryMuscle: "Lower Pectorals (Costal Head) & Triceps",
    secondaryMuscle: "Anterior Deltoids, Rhomboids",
    tertiaryMuscle: "Core & Hip Stabilizers",
    gripType: "Neutral (Parallel Bars)",
    forceType: "Push",
    tempo: "2s Deep Lower -> 1s Strong Press",
    anatomyTarget: { primary: "chest", secondary: "tricep" },
    instructions: [
      "Grasp parallel bars firmly and press up to full lockout with straight arms.",
      "Lean your torso forward at a 20 to 30-degree angle and cross your ankles to shift tension onto the chest.",
      "Bend at the elbows and descend smoothly until your shoulders are slightly below your elbows (approx 90-degree bend).",
      "Press through your palms and contract your lower chest and triceps to drive back up to the top lockout."
    ],
    mistakes: "Staying completely upright turns the movement into a pure tricep dip; maintain the forward torso lean for chest emphasis.",
    proTip: "Keep your shoulders pulled down away from your ears to prevent impingement at the bottom of the movement."
  },
  m4: {
    name: "Cable Chest Flyes (High to Low)",
    equipment: "Cable",
    level: "Beginner",
    type: "Isolation",
    category: "fly",
    primaryMuscle: "Inner Pectoral Squeeze & Cleavage",
    secondaryMuscle: "Anterior Deltoids",
    tertiaryMuscle: "Biceps Short Head (Stabilizer)",
    gripType: "Neutral (Palms Facing)",
    forceType: "Push",
    tempo: "2s Full Stretch -> 2s Peak Squeeze",
    anatomyTarget: { primary: "chest", secondary: "delt" },
    instructions: [
      "Set both cable pulleys at or slightly above head height. Grasp handles and step forward into an athletic staggered stance.",
      "Maintain a proud chest and a slight, fixed bend in your elbows throughout the entire arc.",
      "Bring your hands forward and downward in a wide hugging motion until the handles meet in front of your lower chest.",
      "Squeeze your pecs forcefully for 2 full seconds at center, then allow the cables to stretch your chest back smoothly."
    ],
    mistakes: "Do not allow your elbows to straighten completely or let the weights pull your shoulders backward uncontrolled.",
    proTip: "Cross your hands slightly past center on alternating reps to increase inner pectoral fiber recruitment."
  },
  m5: {
    name: "Hanging Leg / Knee Raises",
    equipment: "Bodyweight",
    level: "Intermediate",
    type: "Isolation",
    category: "leg_raise",
    primaryMuscle: "Lower Rectus Abdominis",
    secondaryMuscle: "Hip Flexors, Obliques",
    tertiaryMuscle: "Forearms (Grip Endurance), Lats",
    gripType: "Overhand (Shoulder Width)",
    forceType: "Pull",
    tempo: "1s Strict Raise -> 2s Controlled Descent",
    anatomyTarget: { primary: "ab", secondary: "forearm" },
    instructions: [
      "Hang from a sturdy pull-up bar with an overhand shoulder-width grip. Engage your lats to prevent body swinging.",
      "Posteriorly tilt your pelvis and contract your lower abdominal wall before moving your legs.",
      "Without swinging or using hip momentum, curl your knees or straight legs upward toward your chest until your pelvis curls up.",
      "Hold the peak contraction briefly, then lower your legs slowly over 2 seconds back to the starting hanging position."
    ],
    mistakes: "Avoid using momentum or swinging like a pendulum; the movement must come from curling the pelvis upward with your abs.",
    proTip: "Focus on rolling your hips toward your sternum rather than just lifting your thigh bones."
  },

  // ----------------------------------------------------
  // TUESDAY: BACK & POSTERIOR CHAIN
  // ----------------------------------------------------
  t1: {
    name: "Conventional Deadlift",
    equipment: "Barbell",
    level: "Advanced",
    type: "Compound",
    category: "deadlift",
    primaryMuscle: "Hamstrings, Gluteus Maximus, Erector Spinae",
    secondaryMuscle: "Latissimus Dorsi, Trapezius, Forearms",
    tertiaryMuscle: "Quadriceps, Deep Core & Abdominals",
    gripType: "Overhand or Mixed/Hook Grip",
    forceType: "Hinge",
    tempo: "1s Powerful Pull -> 2s Controlled Lower",
    anatomyTarget: { primary: "hamstring", secondary: "back" },
    instructions: [
      "Stand with feet hip-width apart and the barbell cutting directly across your mid-foot (1 inch away from shins).",
      "Hinge at your hips to grip the bar just outside your shins. Pull your chest tall and retract your shoulder blades into your back pockets.",
      "Take the slack out of the bar, take a big breath into your belly, and drive the floor away through your mid-foot and heels.",
      "Keep the bar gliding up your shins and thighs, locking out cleanly by squeezing your glutes tall at the apex."
    ],
    mistakes: "Never round your lumbar spine or let the barbell drift away from your body during the pull.",
    proTip: "Engage your lats as if you are trying to crush oranges in your armpits before the bar leaves the floor."
  },
  t2: {
    name: "Wide-Grip Lat Pulldowns / Pull-Ups",
    equipment: "Cable",
    level: "Intermediate",
    type: "Compound",
    category: "pulldown",
    primaryMuscle: "Latissimus Dorsi (V-Taper Width)",
    secondaryMuscle: "Biceps Brachii, Rear Deltoids, Rhomboids",
    tertiaryMuscle: "Lower Trapezius, Core",
    gripType: "Overhand (1.5x Shoulder Width)",
    forceType: "Pull",
    tempo: "1s Explosive Pull -> 2s Controlled Stretch",
    anatomyTarget: { primary: "lat", secondary: "bicep" },
    instructions: [
      "Adjust the thigh pad so your legs are locked securely. Grip the wide lat bar with palms facing away.",
      "Sit down tall with a slight 10-degree backward lean. Depress your shoulder blades before initiating the arm bend.",
      "Drive your elbows down and back toward your hip pockets until the bar touches your upper collarbone.",
      "Squeeze your back muscles firmly, then allow the weight to pull your arms back up to a full lat stretch."
    ],
    mistakes: "Avoid leaning excessively backward like a row or yanking with your biceps rather than driving through the elbows.",
    proTip: "Imagine your hands are mere hooks and focus entirely on driving your elbow tips into your ribs."
  },
  t3: {
    name: "Bent-Over Barbell Rows",
    equipment: "Barbell",
    level: "Intermediate",
    type: "Compound",
    category: "row",
    primaryMuscle: "Mid Back, Rhomboids & Lat Thickness",
    secondaryMuscle: "Biceps, Posterior Deltoids, Trapezius",
    tertiaryMuscle: "Erector Spinae, Hamstrings (Static Brace)",
    gripType: "Overhand (Pronated)",
    forceType: "Pull",
    tempo: "1s Row -> 2s Controlled Lower",
    anatomyTarget: { primary: "lat", secondary: "trap" },
    instructions: [
      "Stand with feet shoulder-width apart, holding the barbell with a medium overhand grip.",
      "Hinge at your hips until your torso is approximately 45 degrees to the floor with knees softly unlocked.",
      "Pull the barbell toward your lower abdomen/navel, keeping your elbows tucked close to your torso.",
      "Pinch your shoulder blades tightly together at the top, then lower the bar smoothly under control."
    ],
    mistakes: "Do not yank your upper body upright to jerk the weight up; keep your torso angle steady throughout.",
    proTip: "Pull with your elbows rather than your wrists to maximize back thickness and minimize arm fatigue."
  },
  t4: {
    name: "Single-Arm Dumbbell Row",
    equipment: "Dumbbell",
    level: "Intermediate",
    type: "Compound",
    category: "row",
    primaryMuscle: "Unilateral Latissimus Dorsi",
    secondaryMuscle: "Rhomboids, Biceps, Teres Major",
    tertiaryMuscle: "Core & Obliques (Anti-Rotation)",
    gripType: "Neutral (Palms Facing Inward)",
    forceType: "Pull",
    tempo: "1s Strong Pull -> 2s Deep Stretch",
    anatomyTarget: { primary: "lat", secondary: "bicep" },
    instructions: [
      "Place one knee and matching hand firmly on a flat bench with your back parallel to the floor.",
      "Pick up a dumbbell with your free hand with arm hanging straight down under your shoulder.",
      "Pull the dumbbell in a smooth arc back toward your hip, leading with your elbow.",
      "Squeeze your lat at peak contraction, then lower slowly into a deep stretch without twisting your spine."
    ],
    mistakes: "Avoid rotating your torso upward to heave the weight; keep your shoulders square to the bench.",
    proTip: "Row toward your hip pocket rather than straight up to your armpit to better isolate the lower lat fibers."
  },
  t5: {
    name: "Cable Face Pulls (with Rope)",
    equipment: "Cable",
    level: "Beginner",
    type: "Isolation",
    category: "pulldown",
    primaryMuscle: "Posterior Deltoids & External Rotators",
    secondaryMuscle: "Upper Trapezius, Rhomboids, Infraspinatus",
    tertiaryMuscle: "Biceps, Core",
    gripType: "Neutral (Thumbs Pointing Back)",
    forceType: "Pull",
    tempo: "1s Pull & Rotate -> 2s Return",
    anatomyTarget: { primary: "delt", secondary: "trap" },
    instructions: [
      "Attach a double-rope to a cable pulley positioned at upper chest or eye level.",
      "Grasp the rope ends with thumbs pointed backward and step back to create tension.",
      "Pull the center of the rope directly toward the bridge of your nose while flaring your elbows high and wide.",
      "Externally rotate your shoulders at the end of the pull, holding a 2-second contraction before releasing."
    ],
    mistakes: "Do not use excessive weight that forces you to arch your lower back and turn it into a sloppy row.",
    proTip: "This is a posture-restoring exercise: prioritize full external rotation squeeze over heavy poundage."
  },

  // ----------------------------------------------------
  // WEDNESDAY: SHOULDERS & ABS
  // ----------------------------------------------------
  w1: {
    name: "Standing Overhead Military Press",
    equipment: "Barbell",
    level: "Intermediate",
    type: "Compound",
    category: "overhead_press",
    primaryMuscle: "Anterior & Lateral Deltoids",
    secondaryMuscle: "Triceps Brachii, Upper Pectorals",
    tertiaryMuscle: "Core & Glute Bracing",
    gripType: "Overhand (Slightly Outside Shoulders)",
    forceType: "Push",
    tempo: "1s Explosive Press -> 2s Controlled Lower",
    anatomyTarget: { primary: "delt", secondary: "tricep" },
    instructions: [
      "Unrack the barbell resting across your anterior delts and collarbone. Stand tall with feet shoulder-width apart.",
      "Squeeze your glutes, flex your abs, and pull your chin slightly back to clear a straight bar path.",
      "Press the barbell vertically overhead in a straight line until your arms are fully locked out.",
      "Bring your head slightly forward through the window created by your arms at lockout, then lower under control."
    ],
    mistakes: "Never arch your lower back excessively to push the weight up; brace your core tightly.",
    proTip: "Keep your forearms vertical beneath the bar at all times for maximum mechanical pressing advantage."
  },
  w2: {
    name: "Dumbbell Lateral Raises (Strict Form)",
    equipment: "Dumbbell",
    level: "Beginner",
    type: "Isolation",
    category: "overhead_press",
    primaryMuscle: "Lateral Deltoids (Shoulder Width)",
    secondaryMuscle: "Upper Trapezius, Anterior Deltoids",
    tertiaryMuscle: "Forearm Gripping Stabilizers",
    gripType: "Overhand (Palms Facing Down at Top)",
    forceType: "Push",
    tempo: "1s Smooth Raise -> 2s Controlled Lower",
    anatomyTarget: { primary: "delt", secondary: "trap" },
    instructions: [
      "Stand holding dumbbells at your sides with a slight forward torso lean of about 5 degrees.",
      "Keep a soft bend in your elbows and initiate the movement by raising your elbows out to your sides.",
      "Raise the weights until your elbows reach shoulder level with thumbs pointed slightly down or level.",
      "Pause for half a second at the top, then lower the dumbbells slowly under strict control."
    ],
    mistakes: "Avoid using leg drive or torso swinging to jerk heavy dumbbells upward.",
    proTip: "Think about pushing the weights out toward the side walls rather than lifting them up toward the ceiling."
  },
  w3: {
    name: "Arnold Dumbbell Press",
    equipment: "Dumbbell",
    level: "Intermediate",
    type: "Compound",
    category: "overhead_press",
    primaryMuscle: "All Three Deltoid Heads (3D Shoulders)",
    secondaryMuscle: "Triceps Brachii, Upper Pectorals",
    tertiaryMuscle: "Core Stabilizers",
    gripType: "Supinated to Pronated (Rotating)",
    forceType: "Push",
    tempo: "1s Rotate & Press -> 2s Reverse Lower",
    anatomyTarget: { primary: "delt", secondary: "tricep" },
    instructions: [
      "Sit on an upright bench holding dumbbells at chest height with palms facing toward you (bicep curl finish).",
      "As you press overhead, smoothly rotate your wrists 180 degrees outward so your palms face forward at lockout.",
      "Lock out overhead momentarily with biceps close to your ears.",
      "Reverse the rotational path smoothly as you lower the dumbbells back to the starting chin-level position."
    ],
    mistakes: "Do not rotate jerky or asynchronously; keep the turning motion continuous and fluid.",
    proTip: "The rotation engages the anterior delt initially and rolls smoothly into the lateral head for full-spectrum stimulation."
  },
  w4: {
    name: "Barbell / Dumbbell Shrugs",
    equipment: "Barbell",
    level: "Beginner",
    type: "Isolation",
    category: "row",
    primaryMuscle: "Upper Trapezius",
    secondaryMuscle: "Forearms, Levator Scapulae",
    tertiaryMuscle: "Neck & Spinal Stabilizers",
    gripType: "Overhand (Shoulder Width)",
    forceType: "Pull",
    tempo: "1s Elevate -> 2s Hold & Squeeze -> 1s Lower",
    anatomyTarget: { primary: "trap", secondary: "forearm" },
    instructions: [
      "Stand holding heavy dumbbells or a barbell at arm's length against your thighs.",
      "Keep your arms completely straight with locked elbows throughout the entire set.",
      "Elevate your shoulders straight upward toward your ears as high as humanly possible.",
      "Hold the peak contraction at the top for 2 full seconds before lowering slowly under full load."
    ],
    mistakes: "Never roll your shoulders in circles, which grinds the acromioclavicular joints and wastes energy.",
    proTip: "Focus on bringing your shoulders to touch your earlobes in a pure vertical plane of motion."
  },
  w5: {
    name: "Ab Wheel Rollouts",
    equipment: "Bodyweight",
    level: "Advanced",
    type: "Compound",
    category: "leg_raise",
    primaryMuscle: "Transverse Abdominis & Rectus Abdominis",
    secondaryMuscle: "Latissimus Dorsi, Posterior Delts",
    tertiaryMuscle: "Hip Flexors, Serratus Anterior",
    gripType: "Overhand (Wheel Handles)",
    forceType: "Pull",
    tempo: "2s Roll Out -> 1s Flex Pullback",
    anatomyTarget: { primary: "ab", secondary: "lat" },
    instructions: [
      "Kneel on a soft gym mat with the ab wheel on the floor directly beneath your shoulders.",
      "Brace your core tightly into a slight hollow-body position with a tucked pelvis.",
      "Roll the wheel slowly forward in a straight line, extending your body until your torso is near parallel to the floor.",
      "Squeeze your abdominal muscles hard to pull the wheel back to the starting position without bending your elbows."
    ],
    mistakes: "Never allow your lower back to sag or hyperextend at the bottom extension point.",
    proTip: "Squeeze your glutes tightly before rolling out to lock your pelvis into safe posterior pelvic tilt."
  },

  // ----------------------------------------------------
  // THURSDAY: ARMS & FOREARMS
  // ----------------------------------------------------
  th1: {
    name: "Standing Barbell Bicep Curls",
    equipment: "Barbell",
    level: "Beginner",
    type: "Isolation",
    category: "curl",
    primaryMuscle: "Biceps Brachii (Short & Long Heads)",
    secondaryMuscle: "Brachialis, Forearm Flexors",
    tertiaryMuscle: "Anterior Deltoids (Static Stabilizer)",
    gripType: "Underhand (Supinated, Shoulder Width)",
    forceType: "Pull",
    tempo: "1s Curl Up -> 2s Controlled Negative",
    anatomyTarget: { primary: "bicep", secondary: "forearm" },
    instructions: [
      "Stand tall holding the barbell with an underhand grip at shoulder width, elbows pinned firmly at your sides.",
      "Keeping your upper arms stationary, curl the bar upward toward your shoulders by contracting your biceps.",
      "Squeeze your biceps hard at the top of the contraction for 1 second.",
      "Lower the barbell under strict 2-second negative control until your arms are fully extended at the bottom."
    ],
    mistakes: "Avoid leaning backward or swinging your torso to heave the weight up; strict form isolates the biceps.",
    proTip: "Do not let your elbows drift forward more than 1 inch; keeping them pinned maximizes bicep peak tension."
  },
  th2: {
    name: "Skullcrushers / Close-Grip Bench",
    equipment: "Barbell",
    level: "Intermediate",
    type: "Isolation",
    category: "bench_press",
    primaryMuscle: "Triceps Brachii (Long & Lateral Heads)",
    secondaryMuscle: "Anterior Deltoids, Forearms",
    tertiaryMuscle: "Upper Chest",
    gripType: "Overhand (Narrow EZ-Bar Grip)",
    forceType: "Push",
    tempo: "2s Lower Behind Head -> 1s Extension",
    anatomyTarget: { primary: "tricep", secondary: "chest" },
    instructions: [
      "Lie flat on a bench holding an EZ-curl bar above your chest with arms fully extended vertically.",
      "Keep your upper arms angled slightly back toward your head (not straight 90 degrees) to maintain constant tension.",
      "Bend only at your elbows, lowering the bar smoothly toward the crown of your head or slightly behind it.",
      "Extend your elbows powerfully using your triceps to return to the starting locked position."
    ],
    mistakes: "Keep your elbows tucked shoulder-width apart rather than letting them flare wildly outward.",
    proTip: "Lowering the bar slightly behind the head keeps tension locked on the tricep long head even at full extension."
  },
  th3: {
    name: "Incline Dumbbell Hammer Curls",
    equipment: "Dumbbell",
    level: "Beginner",
    type: "Isolation",
    category: "curl",
    primaryMuscle: "Brachialis & Brachioradialis (Arm Thickness)",
    secondaryMuscle: "Biceps Long Head",
    tertiaryMuscle: "Forearms",
    gripType: "Neutral (Thumbs Up / Palms Facing In)",
    forceType: "Pull",
    tempo: "1s Clean Curl -> 2s Slow Down",
    anatomyTarget: { primary: "bicep", secondary: "forearm" },
    instructions: [
      "Set an incline bench to 60 degrees. Sit back with a dumbbell in each hand hanging at arms length.",
      "Keep your palms facing each other in a neutral hammer grip throughout the entire rep.",
      "Curl the dumbbells upward strictly using your forearms and brachialis while keeping upper arms pinned.",
      "Lower the weights slowly under control back to a full dead hang at the bottom."
    ],
    mistakes: "Do not rotate your wrists into a standard curl; keep thumbs pointing directly toward the ceiling.",
    proTip: "The incline angle places the biceps under a deep stretch, heavily activating the outer arm brachialis."
  },
  th4: {
    name: "Triceps Cable Rope Pushdowns",
    equipment: "Cable",
    level: "Beginner",
    type: "Isolation",
    category: "pulldown",
    primaryMuscle: "Triceps Brachii (Lateral Head & Horseshoe)",
    secondaryMuscle: "Triceps Medial Head, Forearms",
    tertiaryMuscle: "Core Stabilizers",
    gripType: "Neutral (Rope Ends Flared at Bottom)",
    forceType: "Push",
    tempo: "1s Pushdown & Spread -> 2s Negative Return",
    anatomyTarget: { primary: "tricep", secondary: "forearm" },
    instructions: [
      "Attach a rope attachment to the highest cable pulley. Grip ends and tuck your elbows securely to your ribs.",
      "Hinge forward slightly at the hips with braced abs.",
      "Push the rope straight downward until your elbows are fully locked out.",
      "Flare the rope ends outward away from each other at the bottom for an intense lateral head tricep burn."
    ],
    mistakes: "Avoid letting your elbows drift forward and backward; keep the elbow joint locked in space like a hinge.",
    proTip: "Spreading the rope ends apart at the bottom increases the peak contraction of the outer triceps horseshoe."
  },
  th5: {
    name: "Reverse Forearm Wrist Curls",
    equipment: "Barbell",
    level: "Beginner",
    type: "Isolation",
    category: "curl",
    primaryMuscle: "Forearm Extensors & Flexors",
    secondaryMuscle: "Brachioradialis",
    tertiaryMuscle: "Hand Grip Strength",
    gripType: "Overhand (Pronated, Flat Wrists)",
    forceType: "Pull",
    tempo: "1s Curl Up -> 2s Controlled Descent",
    anatomyTarget: { primary: "forearm", secondary: "bicep" },
    instructions: [
      "Rest your forearms on your thighs or on a flat bench with your wrists hanging just off the edge.",
      "Hold a lightweight barbell with an overhand grip (palms facing down).",
      "Curl your wrists upward as high as possible, contracting the top forearm muscles.",
      "Lower the barbell under full control back down into a full wrist stretch."
    ],
    mistakes: "Do not use heavy weights that jerk the delicate wrist ligaments; use high repetitions and strict form.",
    proTip: "High rep sets (15-20 reps) build dense, vascular forearms and injury-proof your elbow tendons."
  },

  // ----------------------------------------------------
  // FRIDAY: ATHLETIC CONDITIONING & CORE
  // ----------------------------------------------------
  f1: {
    name: "Kettlebell / Dumbbell Swings",
    equipment: "Kettlebell",
    level: "Intermediate",
    type: "Compound",
    category: "deadlift",
    primaryMuscle: "Gluteus Maximus & Hamstrings",
    secondaryMuscle: "Erector Spinae, Latissimus Dorsi",
    tertiaryMuscle: "Core & Cardiovascular System",
    gripType: "Overhand (Both Hands on Horns)",
    forceType: "Hinge",
    tempo: "Explosive Hip Snap",
    anatomyTarget: { primary: "glute", secondary: "hamstring" },
    instructions: [
      "Stand with feet shoulder-width apart, holding the kettlebell in front of you with both hands.",
      "Hinge at your hips, sending your buttocks back while keeping your spine neutral and knees soft.",
      "Snap your hips forward explosively and contract your glutes hard to drive the kettlebell to chest height.",
      "Let the weight swing back naturally between your legs under control and immediately reload the hip hinge."
    ],
    mistakes: "This is a hip hinge, NOT a squat. Never bend your knees excessively or lift the weight with your arms.",
    proTip: "All the upward power must come from your hips snapping forward; arms are merely ropes guiding the bell."
  },
  f2: {
    name: "Box Jumps or Broad Jumps",
    equipment: "Bodyweight",
    level: "Intermediate",
    type: "Compound",
    category: "squat",
    primaryMuscle: "Fast-Twitch Quadriceps & Calves",
    secondaryMuscle: "Glutes, Hamstrings",
    tertiaryMuscle: "Core & Hip Stabilizers",
    gripType: "None (Free Arm Swing)",
    forceType: "Push",
    tempo: "Explosive Takeoff -> Soft Athletic Landing",
    anatomyTarget: { primary: "quad", secondary: "calf" },
    instructions: [
      "Stand 1 to 2 feet in front of a sturdy plyometric box with feet hip-width apart.",
      "Swing arms backward and drop into a quarter-squat athletic loading position.",
      "Explode upward through your hips, knees, and ankles while swinging your arms forward.",
      "Land softly on the center of the box with knees bent to absorb impact like a shock absorber."
    ],
    mistakes: "Never land with stiff or locked knees; absorb the landing softly like a ninja.",
    proTip: "Step down cleanly between reps rather than jumping backward off the box to protect your Achilles tendons."
  },
  f3: {
    name: "Battle Ropes / Medicine Ball Slams",
    equipment: "Ropes",
    level: "Intermediate",
    type: "Compound",
    category: "pulldown",
    primaryMuscle: "Full Upper Body & Core Power",
    secondaryMuscle: "Shoulders, Lats, Forearms",
    tertiaryMuscle: "Cardiovascular VO2 Engine",
    gripType: "Neutral (Rope Handles)",
    forceType: "Push/Pull",
    tempo: "Continuous High-Velocity Waves",
    anatomyTarget: { primary: "delt", secondary: "ab" },
    instructions: [
      "Hold both rope handles in an athletic quarter-squat stance with feet wide and core braced.",
      "Alternately whip your arms up and down to create rapid fluid waves extending all the way to the anchor.",
      "Keep your breathing rhythmic and your torso firmly stabilized without swaying.",
      "Maintain max intensity output for the duration of the prescribed interval."
    ],
    mistakes: "Do not stand upright with locked knees; stay anchored in a deep athletic stance.",
    proTip: "Breathe continuously with short sharp exhales on every wave slam to maintain core pressure."
  },
  f4: {
    name: "Farmer's Walk",
    equipment: "Dumbbell",
    level: "Intermediate",
    type: "Compound",
    category: "row",
    primaryMuscle: "Trapezius, Forearm Grip & Core Anti-Flexion",
    secondaryMuscle: "Glutes, Calves, Quadriceps",
    tertiaryMuscle: "Spinal Erectors",
    gripType: "Overhand / Neutral Heavy Grip",
    forceType: "Carry",
    tempo: "Rhythmic Controlled Strides",
    anatomyTarget: { primary: "trap", secondary: "forearm" },
    instructions: [
      "Deadlift two heavy dumbbells or kettlebells evenly from the floor to your sides.",
      "Pack your shoulders back, pull your ribs down, and stand tall like a soldier.",
      "Walk forward in a straight line with smooth, controlled, heel-to-toe strides.",
      "Keep your core locked like armor, preventing any torso swaying or lateral bending."
    ],
    mistakes: "Avoid slouching forward or taking erratic, rushed steps; maintain perfect posture throughout.",
    proTip: "This is the ultimate real-world test of grip strength, upper trap density, and bulletproof core stability."
  },
  f5: {
    name: "HIIT Sprint Intervals / Treadmill",
    equipment: "Bodyweight",
    level: "Intermediate",
    type: "Compound",
    category: "squat",
    primaryMuscle: "Quads, Hamstrings, Glutes & Fast-Twitch Fibers",
    secondaryMuscle: "Calves, Hip Flexors",
    tertiaryMuscle: "Aerobic & Anaerobic Energy Systems",
    gripType: "None",
    forceType: "Push",
    tempo: "30s All-Out Sprint -> 45s Walk Recovery",
    anatomyTarget: { primary: "quad", secondary: "hamstring" },
    instructions: [
      "Perform a 3-minute dynamic running warmup before starting maximal sprint intervals.",
      "Explode into maximum sprint velocity, driving knees high and pumping arms at 90-degree angles.",
      "Strike lightly on your mid-foot under your center of gravity rather than overstriding.",
      "Walk calmly during the recovery interval to bring heart rate down before the next burst."
    ],
    mistakes: "Do not sprint without proper hamstring and calf warmup to avoid soft tissue pulls.",
    proTip: "High-intensity sprinting recruits maximal muscle mass and triggers hours of post-exercise fat oxidation."
  },

  // ----------------------------------------------------
  // SATURDAY: LEGS (QUAD & HAMSTRING DOMINANCE)
  // ----------------------------------------------------
  s1: {
    name: "Barbell Back Squats",
    equipment: "Barbell",
    level: "Intermediate",
    type: "Compound",
    category: "squat",
    primaryMuscle: "Quadriceps (Vastus Medialis, Lateralis)",
    secondaryMuscle: "Gluteus Maximus, Adductor Magnus",
    tertiaryMuscle: "Hamstrings, Calves, Erector Spinae",
    gripType: "Overhand (Firm Grip on Bar)",
    forceType: "Squat",
    tempo: "2s Down to Parallel -> 1s Explosive Up",
    anatomyTarget: { primary: "quad", secondary: "glute" },
    instructions: [
      "Step under the racked bar, resting it comfortably across your upper trapezius shelf. Unrack and take 2 clean steps back.",
      "Set your feet shoulder-width apart with toes pointed out approximately 15 to 30 degrees.",
      "Take a deep diaphragmatic breath, brace your core 360 degrees, and sit your hips back and down.",
      "Descend until your hip crease drops below the top of your knee (parallel depth), then drive through mid-foot to stand tall."
    ],
    mistakes: "Never allow your knees to collapse inward (valgus) or let your heels lift off the platform.",
    proTip: "Spread the floor apart with your feet as you descend to activate your glutes and create hip stability."
  },
  s2: {
    name: "Romanian Deadlifts (RDLs)",
    equipment: "Barbell",
    level: "Intermediate",
    type: "Compound",
    category: "deadlift",
    primaryMuscle: "Hamstrings (Biceps Femoris) & Glute-Ham Tie-In",
    secondaryMuscle: "Erector Spinae, Gluteus Maximus",
    tertiaryMuscle: "Forearm Grip, Upper Trapezius",
    gripType: "Overhand (Shoulder Width)",
    forceType: "Hinge",
    tempo: "3s Deep Stretch -> 1s Hip Snap Up",
    anatomyTarget: { primary: "hamstring", secondary: "glute" },
    instructions: [
      "Stand tall holding the barbell against your thighs with a slight, fixed 15-degree bend in your knees.",
      "Initiate the movement solely by pushing your hips straight backward toward the wall behind you.",
      "Keep the bar skimming closely against your shins as you descend until you feel a maximal hamstring stretch.",
      "Drive your hips forward powerfully to lockout, squeezing your glutes hard at the top."
    ],
    mistakes: "Do not bend your knees into a squat; this is a pure hip hinge to isolate the hamstring stretch.",
    proTip: "Keep your spine completely neutral and stop descending as soon as your hips stop travelling backward."
  },
  s3: {
    name: "Bulgarian Split Squats (Dumbbell)",
    equipment: "Dumbbell",
    level: "Intermediate",
    type: "Compound",
    category: "squat",
    primaryMuscle: "Unilateral Quadriceps & Glute Medius",
    secondaryMuscle: "Hamstrings, Adductors",
    tertiaryMuscle: "Ankle & Core Stabilizers",
    gripType: "Neutral (Dumbbells at Sides)",
    forceType: "Squat",
    tempo: "2s Descent -> 1s Drive Up",
    anatomyTarget: { primary: "quad", secondary: "glute" },
    instructions: [
      "Elevate your back foot on a bench behind you with the top of the foot resting flat. Step your front foot 2-3 feet forward.",
      "Hold dumbbells at your sides with an upright posture and locked core.",
      "Lower your body under control until your back knee almost touches the floor (approx 90-degree front knee bend).",
      "Drive through the front heel to return to the starting position without locking the front knee harshly."
    ],
    mistakes: "Avoid leaning too far forward or letting your front heel rise off the floor.",
    proTip: "A slightly longer stride targets the glutes; a slightly closer stride shifts massive load to the quads."
  },
  s4: {
    name: "Leg Press or Hack Squat",
    equipment: "Machine",
    level: "Beginner",
    type: "Compound",
    category: "squat",
    primaryMuscle: "Quadriceps Hypertrophy & Volume",
    secondaryMuscle: "Gluteus Maximus, Adductors",
    tertiaryMuscle: "Hamstrings (Lower Reaches)",
    gripType: "Machine Handles (Firm Grip)",
    forceType: "Push",
    tempo: "2s Controlled Descent -> 1s Power Press",
    anatomyTarget: { primary: "quad", secondary: "glute" },
    instructions: [
      "Sit in the machine with your lower back and glutes pressed flat against the backrest pad.",
      "Place feet shoulder-width on the platform. Disengage safety catches and take the weight with soft knees.",
      "Lower the sled smoothly until your knees reach a 90-degree angle without letting your tailbone lift off the pad.",
      "Drive through your mid-foot and heels to push the sled back up without snapping knees at lockout."
    ],
    mistakes: "Never lock out your knees completely straight under heavy load, and never let your lower back curl off the seat.",
    proTip: "Placing feet lower on the platform emphasizes quads; placing feet higher shifts recruitment to glutes."
  },
  s5: {
    name: "Standing / Seated Calf Raises",
    equipment: "Machine",
    level: "Beginner",
    type: "Isolation",
    category: "calf",
    primaryMuscle: "Gastrocnemius (Standing) & Soleus (Seated)",
    secondaryMuscle: "Achilles Tendon Elasticity",
    tertiaryMuscle: "Tibialis Posterior",
    gripType: "None / Machine Pad",
    forceType: "Push",
    tempo: "2s Deep Stretch -> 1s Peak Squeeze",
    anatomyTarget: { primary: "calf", secondary: "quad" },
    instructions: [
      "Position the balls of your feet on the step edge with heels hanging off freely.",
      "Lower your heels down into a full, deep calf stretch and hold for 1 full second at the bottom.",
      "Press through your big toes and balls of feet to elevate your body as high as possible.",
      "Hold the peak contraction at the very top for 1 second before beginning the slow descent."
    ],
    mistakes: "Avoid fast bouncy repetitions using Achilles tendon recoil; pause at both bottom and top to make muscle work.",
    proTip: "Straight-knee calf raises hit the visible gastrocnemius; bent-knee raises target the deep soleus muscle."
  },

  // ----------------------------------------------------
  // SUNDAY: ACTIVE RECOVERY & MOBILITY
  // ----------------------------------------------------
  su1: {
    name: "Full Body Foam Rolling & Myofascial",
    equipment: "Bodyweight",
    level: "Beginner",
    type: "Isolation",
    category: "recovery",
    primaryMuscle: "Myofascial Tissue & Muscle Fascia",
    secondaryMuscle: "Blood Circulation & Lymphatic Drainage",
    tertiaryMuscle: "Total Body Nervous System",
    gripType: "None",
    forceType: "Recovery",
    tempo: "Slow 60s Per Muscle Group",
    anatomyTarget: { primary: "quad", secondary: "back" },
    instructions: [
      "Place a high-density foam roller on a gym mat under targeted muscle groups (quads, IT band, lats, glutes).",
      "Roll slowly back and forth over the muscle tissue at about 1 inch per second.",
      "When you encounter a tender spot or trigger point, pause and breathe deeply for 20-30 seconds until tension releases.",
      "Repeat across major muscle groups to promote blood flow and tissue elasticity."
    ],
    mistakes: "Avoid rolling directly over joints or aggressively over the delicate lumbar spine.",
    proTip: "Relax your muscles completely while on the roller; tensing up blocks the myofascial release benefit."
  },
  su2: {
    name: "Dynamic Hip Flow (World's Greatest Stretch)",
    equipment: "Bodyweight",
    level: "Beginner",
    type: "Compound",
    category: "recovery",
    primaryMuscle: "Hip Flexors, Hamstrings & Groin",
    secondaryMuscle: "Thoracic Spine Mobility",
    tertiaryMuscle: "Ankles & Glutes",
    gripType: "None",
    forceType: "Mobility",
    tempo: "5 Deep Breaths Per Pose",
    anatomyTarget: { primary: "hamstring", secondary: "glute" },
    instructions: [
      "Step forward into a deep runner's lunge with your back leg extended and hands placed inside front foot.",
      "Drop your inside elbow down toward the floor to deepen the hip and groin stretch.",
      "Rotate your chest and free arm upward toward the sky, following your hand with your eyes to mobilize thoracic spine.",
      "Plant hand, push hips back to straighten front leg into a hamstring stretch, then switch sides."
    ],
    mistakes: "Do not hold your breath; take long diaphragmatic exhales to sink deeper into the joint angles.",
    proTip: "This is the single most efficient full-body mobility flow for desk workers and heavy lifters alike."
  },
  su3: {
    name: "Shoulder Dislocations & Band Pull-Aparts",
    equipment: "Band",
    level: "Beginner",
    type: "Isolation",
    category: "recovery",
    primaryMuscle: "Shoulder Capsule & Infraspinatus",
    secondaryMuscle: "Rotator Cuff, Rhomboids, Upper Traps",
    tertiaryMuscle: "Pectoral Stretch",
    gripType: "Overhand (Wide on Band/Pipe)",
    forceType: "Mobility",
    tempo: "Smooth Rhythmic Arc",
    anatomyTarget: { primary: "delt", secondary: "trap" },
    instructions: [
      "Hold a light resistance band or PVC pipe with a wide overhand grip in front of your hips.",
      "Keeping your arms completely straight, sweep the band slowly up and over your head in a full arc to touch your lower back.",
      "Reverse the movement back to the front under continuous gentle band tension.",
      "Follow with 15 horizontal band pull-aparts to the sternum to engage the upper back posture muscles."
    ],
    mistakes: "Never bend your elbows or force a narrow grip if your shoulders feel tight; widen hands for comfort.",
    proTip: "Daily shoulder dislocates prevent rotator cuff impingement and build indestructible pressing joints."
  },
  su4: {
    name: "45-Minute Outdoor Low-Intensity Walk",
    equipment: "Bodyweight",
    level: "Beginner",
    type: "Compound",
    category: "recovery",
    primaryMuscle: "Cardiovascular Capillarization",
    secondaryMuscle: "Joint Lubrication & Synovial Fluid",
    tertiaryMuscle: "Parasympathetic Nervous System",
    gripType: "None",
    forceType: "Recovery",
    tempo: "Relaxed Conversational Pace",
    anatomyTarget: { primary: "calf", secondary: "quad" },
    instructions: [
      "Step outside into natural daylight and fresh air.",
      "Walk at an easy, continuous pace where you can comfortably speak full sentences without gasping.",
      "Practice nasal diaphragmatic breathing to stimulate the parasympathetic rest-and-digest response.",
      "Complete 45 minutes to enhance muscular recovery without adding systemic training fatigue."
    ],
    mistakes: "Do not turn this into a stressful power-walk; keep it relaxing to optimize central nervous system recovery.",
    proTip: "Outdoor walking promotes lymphatic circulation, clearing workout waste products much faster than total rest."
  }
};

// State variables for Active Demo Modal
let activeDemoExId = null;
let currentDemoAngle = 'front'; // 'front' | 'side'

// =========================================================================
// MuscleWiki Human Anatomy Visualizer (Front & Back Athletic Silhouettes)
// =========================================================================
function generateMuscleAnatomySvg(anatomyTarget) {
  const p = (anatomyTarget && anatomyTarget.primary) ? anatomyTarget.primary.toLowerCase() : '';
  const s = (anatomyTarget && anatomyTarget.secondary) ? anatomyTarget.secondary.toLowerCase() : '';

  const getFill = (m) => {
    if (p && p.includes(m)) return '#ef4444'; // Primary Red/Coral (MuscleWiki Red)
    if (s && s.includes(m)) return '#f59e0b'; // Secondary Gold/Amber
    return '#334155'; // Dark Slate
  };

  const getFilter = (m) => {
    if (p && p.includes(m)) return 'filter="url(#primaryGlow)"';
    if (s && s.includes(m)) return 'filter="url(#secondaryGlow)"';
    return '';
  };

  return `
    <svg viewBox="0 0 280 185" class="mw-anatomy-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="primaryGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#ef4444" flood-opacity="0.8"/>
        </filter>
        <filter id="secondaryGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="#f59e0b" flood-opacity="0.7"/>
        </filter>
      </defs>
      
      <!-- FRONT BODY SILHOUETTE -->
      <g transform="translate(10, 5)">
        <text x="60" y="14" fill="#94a3b8" font-size="9" font-weight="800" letter-spacing="1" text-anchor="middle">FRONT VIEW</text>
        <!-- Head & Neck -->
        <circle cx="60" cy="27" r="9" fill="#1e293b" />
        <path d="M53,34 L67,34 L74,42 L46,42 Z" fill="${getFill('trap')}" ${getFilter('trap')} />
        
        <!-- Shoulders (Anterior Deltoids) -->
        <ellipse cx="40" cy="45" rx="6" ry="5" fill="${getFill('delt')}" ${getFilter('delt')} />
        <ellipse cx="80" cy="45" rx="6" ry="5" fill="${getFill('delt')}" ${getFilter('delt')} />
        
        <!-- Pectorals / Chest -->
        <rect x="47" y="43" width="12" height="14" rx="3" fill="${getFill('chest')}" ${getFilter('chest')} />
        <rect x="61" y="43" width="12" height="14" rx="3" fill="${getFill('chest')}" ${getFilter('chest')} />
        
        <!-- Biceps -->
        <ellipse cx="36" cy="59" rx="4" ry="7" fill="${getFill('bicep')}" ${getFilter('bicep')} />
        <ellipse cx="84" cy="59" rx="4" ry="7" fill="${getFill('bicep')}" ${getFilter('bicep')} />
        
        <!-- Forearms -->
        <ellipse cx="34" cy="77" rx="4" ry="8" fill="${getFill('forearm')}" ${getFilter('forearm')} />
        <ellipse cx="86" cy="77" rx="4" ry="8" fill="${getFill('forearm')}" ${getFilter('forearm')} />
        
        <!-- Rectus Abdominis / Core -->
        <rect x="52" y="58" width="16" height="22" rx="2" fill="${getFill('ab')}" ${getFilter('ab')} />
        
        <!-- Quadriceps -->
        <path d="M49,86 L58,86 L56,122 L46,122 Z" fill="${getFill('quad')}" ${getFilter('quad')} />
        <path d="M62,86 L71,86 L74,122 L64,122 Z" fill="${getFill('quad')}" ${getFilter('quad')} />
        
        <!-- Calves / Shins -->
        <rect x="48" y="126" width="7" height="24" rx="2" fill="${getFill('calf')}" ${getFilter('calf')} />
        <rect x="65" y="126" width="7" height="24" rx="2" fill="${getFill('calf')}" ${getFilter('calf')} />
      </g>

      <!-- BACK BODY SILHOUETTE -->
      <g transform="translate(150, 5)">
        <text x="60" y="14" fill="#94a3b8" font-size="9" font-weight="800" letter-spacing="1" text-anchor="middle">BACK VIEW</text>
        <circle cx="60" cy="27" r="9" fill="#1e293b" />
        
        <!-- Upper Traps -->
        <path d="M51,34 L69,34 L76,43 L44,43 Z" fill="${getFill('trap')}" ${getFilter('trap')} />
        
        <!-- Rear Delts -->
        <ellipse cx="40" cy="45" rx="5" ry="4" fill="${getFill('delt')}" ${getFilter('delt')} />
        <ellipse cx="80" cy="45" rx="5" ry="4" fill="${getFill('delt')}" ${getFilter('delt')} />
        
        <!-- Triceps -->
        <ellipse cx="36" cy="59" rx="4" ry="7" fill="${getFill('tricep')}" ${getFilter('tricep')} />
        <ellipse cx="84" cy="59" rx="4" ry="7" fill="${getFill('tricep')}" ${getFilter('tricep')} />
        
        <!-- Latissimus Dorsi (Lats) -->
        <path d="M47,44 L73,44 L67,69 L53,69 Z" fill="${getFill('lat')}" ${getFilter('lat')} />
        
        <!-- Lower Back (Erector Spinae) -->
        <rect x="54" y="68" width="12" height="14" rx="2" fill="${getFill('back')}" ${getFilter('back')} />
        
        <!-- Glutes -->
        <ellipse cx="53" cy="89" rx="7" ry="8" fill="${getFill('glute')}" ${getFilter('glute')} />
        <ellipse cx="67" cy="89" rx="7" ry="8" fill="${getFill('glute')}" ${getFilter('glute')} />
        
        <!-- Hamstrings -->
        <rect x="48" y="99" width="9" height="23" rx="2" fill="${getFill('hamstring')}" ${getFilter('hamstring')} />
        <rect x="63" y="99" width="9" height="23" rx="2" fill="${getFill('hamstring')}" ${getFilter('hamstring')} />
        
        <!-- Calves -->
        <ellipse cx="51" cy="133" rx="4" ry="10" fill="${getFill('calf')}" ${getFilter('calf')} />
        <ellipse cx="69" cy="133" rx="4" ry="10" fill="${getFill('calf')}" ${getFilter('calf')} />
      </g>

      <!-- LEGEND -->
      <g transform="translate(45, 172)">
        <rect x="0" y="0" width="8" height="8" rx="2" fill="#ef4444" />
        <text x="12" y="7" fill="#cbd5e1" font-size="8" font-weight="700">Primary Target</text>
        <rect x="100" y="0" width="8" height="8" rx="2" fill="#f59e0b" />
        <text x="112" y="7" fill="#cbd5e1" font-size="8" font-weight="700">Secondary / Assist</text>
      </g>
    </svg>
  `;
}

// =========================================================================
// Human Biomechanical Motion Generator (Front Angle & Side Angle SVGs)
// =========================================================================
function generateHumanMotionSvg(category, angle) {
  const isFront = (angle === 'front');

  if (category === 'squat') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <g class="anim-squat-front">
            <circle cx="160" cy="50" r="13" fill="#0f172a" />
            <path d="M142,62 Q160,56 178,62 L188,88 L132,88 Z" fill="#1e293b" />
            <rect x="50" y="60" width="220" height="7" rx="3" fill="#cbd5e1" />
            <rect x="55" y="38" width="13" height="50" rx="3" fill="#ef4444" />
            <rect x="252" y="38" width="13" height="50" rx="3" fill="#ef4444" />
            <path d="M140,88 L180,88 L174,128 L146,128 Z" fill="#334155" />
            <circle cx="115" cy="63" r="5" fill="#38bdf8" />
            <circle cx="205" cy="63" r="5" fill="#38bdf8" />
            <path d="M146,128 L130,168 L145,170 L158,128 Z" fill="#ef4444" class="anim-quad-glow" />
            <path d="M174,128 L190,168 L175,170 L162,128 Z" fill="#ef4444" class="anim-quad-glow" />
            <rect x="126" y="168" width="13" height="30" rx="3" fill="#1e293b" />
            <rect x="181" y="168" width="13" height="30" rx="3" fill="#1e293b" />
            <ellipse cx="130" cy="200" rx="13" ry="4" fill="#0f172a" />
            <ellipse cx="190" cy="200" rx="13" ry="4" fill="#0f172a" />
          </g>
          <text x="160" y="206" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • FULL DEPTH & KNEE ALIGNMENT</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="156" y1="35" x2="156" y2="140" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" stroke-dasharray="3,3" />
          <g class="anim-squat-side">
            <circle cx="150" cy="50" r="12" fill="#0f172a" />
            <path d="M142,60 L165,66 L152,122 L135,116 Z" fill="#1e293b" />
            <circle cx="156" cy="62" r="9" fill="#ef4444" />
            <circle cx="156" cy="62" r="4" fill="#ffffff" />
            <ellipse cx="132" cy="124" rx="13" ry="11" fill="#f59e0b" class="anim-glute-glow" />
            <path d="M136,122 L168,154 L154,160 L124,128 Z" fill="#ef4444" />
            <rect x="156" y="158" width="11" height="38" rx="3" fill="#334155" />
            <ellipse cx="166" cy="198" rx="15" ry="5" fill="#0f172a" />
          </g>
          <line x1="40" y1="200" x2="280" y2="200" stroke="#334155" stroke-width="2" />
          <text x="160" y="206" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • NEUTRAL SPINE & VERTICAL BAR PATH</text>
        </svg>
      `;
    }
  }

  if (category === 'bench_press' || category === 'incline_press') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Bench Frame -->
          <rect x="60" y="145" width="200" height="12" rx="3" fill="#1e293b" />
          <rect x="145" y="157" width="30" height="38" fill="#0f172a" />
          <!-- Athlete Head & Torso -->
          <circle cx="160" cy="115" r="15" fill="#0f172a" />
          <rect x="135" y="128" width="50" height="32" rx="4" fill="#334155" />
          <!-- Active Pectorals -->
          <rect x="137" y="130" width="22" height="16" rx="3" fill="#ef4444" class="anim-muscle-pec" />
          <rect x="161" y="130" width="22" height="16" rx="3" fill="#ef4444" class="anim-muscle-pec" />
          <!-- Barbell & Press Motion -->
          <g class="anim-press-front">
            <rect x="40" y="65" width="240" height="8" rx="3" fill="#cbd5e1" />
            <rect x="45" y="42" width="14" height="54" rx="3" fill="#ef4444" />
            <rect x="261" y="42" width="14" height="54" rx="3" fill="#ef4444" />
            <!-- Arms / Forearms -->
            <path d="M136,134 L115,70" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
            <path d="M184,134 L205,70" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
          </g>
          <text x="160" y="206" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • BALANCED PRESS & ELBOW TUCK</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Bench Profile -->
          <rect x="50" y="140" width="220" height="14" rx="3" fill="#1e293b" />
          <rect x="145" y="154" width="30" height="40" fill="#0f172a" />
          <!-- Lifter Profile Head & Torso -->
          <circle cx="85" cy="125" r="13" fill="#0f172a" />
          <path d="M96,132 Q140,140 185,140" stroke="#334155" stroke-width="22" stroke-linecap="round" fill="none" />
          <!-- Moving Barbell & Arm Profile -->
          <g class="anim-press-side">
            <circle cx="140" cy="65" r="10" fill="#ef4444" />
            <circle cx="140" cy="65" r="4" fill="#ffffff" />
            <path d="M125,134 L140,65" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
          </g>
          <line x1="140" y1="50" x2="140" y2="135" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" stroke-dasharray="3,3" />
          <text x="160" y="206" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • CONTROLLED DESCENT TO STERNUM</text>
        </svg>
      `;
    }
  }

  if (category === 'deadlift') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <g class="anim-deadlift-front">
            <circle cx="160" cy="50" r="13" fill="#0f172a" />
            <path d="M142,62 L178,62 L172,108 L148,108 Z" fill="#1e293b" />
            <rect x="40" y="105" width="240" height="7" rx="3" fill="#cbd5e1" />
            <circle cx="48" cy="108" r="22" fill="#ef4444" />
            <circle cx="272" cy="108" r="22" fill="#ef4444" />
            <!-- Arms hanging vertical -->
            <line x1="138" y1="68" x2="134" y2="105" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" />
            <line x1="182" y1="68" x2="186" y2="105" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" />
            <!-- Legs -->
            <rect x="146" y="108" width="12" height="42" rx="3" fill="#ef4444" class="anim-hamstring-glow" />
            <rect x="162" y="108" width="12" height="42" rx="3" fill="#ef4444" class="anim-hamstring-glow" />
            <rect x="146" y="152" width="12" height="42" rx="3" fill="#334155" />
            <rect x="162" y="152" width="12" height="42" rx="3" fill="#334155" />
          </g>
          <text x="160" y="206" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • SYMMETRICAL DRIVE & HOOK GRIP</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="170" y1="50" x2="170" y2="185" stroke="rgba(239, 68, 68, 0.4)" stroke-width="1.5" stroke-dasharray="3,3" />
          <g class="anim-deadlift-side">
            <circle cx="130" cy="70" r="13" fill="#0f172a" />
            <path d="M125,82 L155,125 L140,130 L115,86 Z" fill="#1e293b" />
            <!-- Arms hanging straight down to barbell -->
            <line x1="135" y1="88" x2="170" y2="135" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <circle cx="170" cy="135" r="18" fill="#ef4444" />
            <!-- Posterior Chain / Hamstrings -->
            <path d="M140,128 L165,160 L152,165 L132,130 Z" fill="#ef4444" class="anim-hamstring-glow" />
            <rect x="160" y="162" width="12" height="36" rx="3" fill="#334155" />
          </g>
          <line x1="40" y1="200" x2="280" y2="200" stroke="#334155" stroke-width="2" />
          <text x="160" y="206" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • HIP HINGE & SHIN CONTACT PATH</text>
        </svg>
      `;
    }
  }

  if (category === 'curl') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="40" r="13" fill="#0f172a" />
          <path d="M140,52 L180,52 L174,115 L146,115 Z" fill="#1e293b" />
          <!-- Legs -->
          <rect x="145" y="115" width="13" height="75" rx="3" fill="#334155" />
          <rect x="162" y="115" width="13" height="75" rx="3" fill="#334155" />
          <!-- Moving Forearms & Barbell -->
          <g class="anim-curl-front">
            <line x1="136" y1="62" x2="134" y2="105" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
            <line x1="184" y1="62" x2="186" y2="105" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
            <path d="M134,105 L136,65" stroke="#ef4444" stroke-width="11" stroke-linecap="round" class="anim-bicep-curl-arm" />
            <path d="M186,105 L184,65" stroke="#ef4444" stroke-width="11" stroke-linecap="round" class="anim-bicep-curl-arm" />
            <rect x="80" y="60" width="160" height="7" rx="3" fill="#cbd5e1" />
            <rect x="85" y="44" width="12" height="38" rx="3" fill="#ef4444" />
            <rect x="223" y="44" width="12" height="38" rx="3" fill="#ef4444" />
          </g>
          <text x="160" y="206" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • STRICT ELBOW PIN & SUPINATION</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="40" r="13" fill="#0f172a" />
          <path d="M142,52 L164,56 L156,120 L138,118 Z" fill="#1e293b" />
          <rect x="142" y="120" width="18" height="75" rx="4" fill="#334155" />
          <!-- Pinned Upper Arm -->
          <line x1="156" y1="60" x2="156" y2="100" stroke="#334155" stroke-width="13" stroke-linecap="round" />
          <!-- Forearm & Dumbbell Curl Arc -->
          <g class="anim-curl-side">
            <line x1="156" y1="100" x2="185" y2="65" stroke="#ef4444" stroke-width="11" stroke-linecap="round" />
            <circle cx="185" cy="65" r="9" fill="#f59e0b" />
          </g>
          <text x="160" y="206" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • ZERO ELBOW SWING & FULL CONTRACTION</text>
        </svg>
      `;
    }
  }

  if (category === 'pushup') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="35" y1="176" x2="285" y2="176" stroke="#334155" stroke-width="2.5" stroke-linecap="round" />
          <g class="anim-pushup-front">
            <!-- Athlete Head -->
            <circle cx="160" cy="68" r="14" fill="#0f172a" />
            <!-- Shoulders & Torso -->
            <path d="M126,82 Q160,76 194,82 L186,118 L134,118 Z" fill="#1e293b" />
            <!-- Active Glowing Chest (Pectorals) -->
            <rect x="136" y="86" width="22" height="16" rx="4" fill="#ef4444" class="anim-muscle-pec" />
            <rect x="162" y="86" width="22" height="16" rx="4" fill="#ef4444" class="anim-muscle-pec" />
            <!-- Arms Planting on Floor -->
            <path d="M126,88 L102,126 L108,174" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <path d="M194,88 L218,126 L212,174" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <!-- Hands -->
            <ellipse cx="108" cy="175" rx="11" ry="4" fill="#0f172a" />
            <ellipse cx="212" cy="175" rx="11" ry="4" fill="#0f172a" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • 45° ELBOW TUCK &amp; CHEST SQUEEZE</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="176" x2="290" y2="176" stroke="#334155" stroke-width="2.5" stroke-linecap="round" />
          <line x1="115" y1="84" x2="115" y2="174" stroke="rgba(239, 68, 68, 0.35)" stroke-width="1.5" stroke-dasharray="3,3" />
          <g class="anim-pushup-side">
            <!-- Rigid Plank Line: Head -> Torso -> Legs -> Toes -->
            <circle cx="88" cy="100" r="12" fill="#0f172a" />
            <line x1="100" y1="106" x2="245" y2="166" stroke="#1e293b" stroke-width="18" stroke-linecap="round" />
            <!-- Glowing Chest & Core Band -->
            <line x1="108" y1="109" x2="165" y2="132" stroke="#ef4444" stroke-width="10" stroke-linecap="round" class="anim-muscle-pec" />
            <!-- Pushing Arm -->
            <path d="M112,112 L118,144 L114,174" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <!-- Hand & Toes -->
            <ellipse cx="114" cy="175" rx="10" ry="3.5" fill="#0f172a" />
            <ellipse cx="250" cy="174" rx="8" ry="4" fill="#0f172a" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • STRAIGHT BODY LINE • FULL CHEST DEPTH</text>
        </svg>
      `;
    }
  }

  if (category === 'plank') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="35" y1="176" x2="285" y2="176" stroke="#334155" stroke-width="2.5" stroke-linecap="round" />
          <!-- Level Hip & Shoulder Alignment Reference -->
          <line x1="88" y1="96" x2="232" y2="96" stroke="rgba(52, 199, 89, 0.55)" stroke-width="1.5" stroke-dasharray="4,3" />
          <g class="anim-plank-front">
            <!-- Rear Legs Anchored Centered -->
            <ellipse cx="144" cy="158" rx="9" ry="5" fill="#334155" />
            <ellipse cx="176" cy="158" rx="9" ry="5" fill="#334155" />
            <!-- Torso & Glowing Braced Core Seen From Front -->
            <path d="M118,104 Q160,96 202,104 L192,150 L128,150 Z" fill="#1e293b" />
            <rect x="140" y="114" width="40" height="30" rx="6" fill="#ef4444" class="anim-plank-glow" />
            <!-- Head Looking Gently Down Ahead of Forearms -->
            <circle cx="160" cy="86" r="14" fill="#0f172a" />
            <!-- Shoulder-Width Stacked Elbows & Parallel Forearms on Mat -->
            <path d="M118,108 L112,158 L138,172" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <path d="M202,108 L208,158 L182,172" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <!-- Forearm Pads / Fists -->
            <ellipse cx="138" cy="173" rx="11" ry="4" fill="#0f172a" />
            <ellipse cx="182" cy="173" rx="11" ry="4" fill="#0f172a" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • ELBOWS UNDER SHOULDERS • LEVEL HIPS</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="176" x2="290" y2="176" stroke="#334155" stroke-width="2.5" stroke-linecap="round" />
          <g class="anim-plank-hold">
            <!-- Athlete Head -->
            <circle cx="76" cy="122" r="12" fill="#0f172a" />
            <!-- Straight Spine & Legs -->
            <line x1="90" y1="126" x2="255" y2="162" stroke="#1e293b" stroke-width="18" stroke-linecap="round" />
            <!-- Glowing Core Fortress Shield -->
            <line x1="128" y1="134" x2="190" y2="148" stroke="#ef4444" stroke-width="14" stroke-linecap="round" class="anim-plank-glow" />
            <!-- Forearm Support on Floor -->
            <path d="M100,130 L100,172 L74,172" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <!-- Toes planted -->
            <ellipse cx="260" cy="173" rx="9" ry="4" fill="#0f172a" />
            <!-- Neutral alignment guide -->
            <line x1="76" y1="106" x2="260" y2="144" stroke="rgba(52, 199, 89, 0.55)" stroke-width="1.5" stroke-dasharray="4,3" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • ZERO HIP SAG • STRAIGHT SPINE LINE</text>
        </svg>
      `;
    }
  }

  if (category === 'bodyweight_squat') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <g class="anim-squat-front">
            <circle cx="160" cy="42" r="13" fill="#0f172a" />
            <path d="M142,55 Q160,50 178,55 L184,98 L136,98 Z" fill="#1e293b" />
            <!-- Counterbalance Arms Forward (Desi Baithak Style) -->
            <line x1="138" y1="64" x2="112" y2="92" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <line x1="182" y1="64" x2="208" y2="92" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <!-- Glowing Quads -->
            <path d="M142,98 L128,148 L144,150 L157,98 Z" fill="#ef4444" class="anim-quad-glow" />
            <path d="M178,98 L192,148 L176,150 L163,98 Z" fill="#ef4444" class="anim-quad-glow" />
            <!-- Calves & Feet -->
            <rect x="128" y="148" width="12" height="34" rx="3" fill="#334155" />
            <rect x="180" y="148" width="12" height="34" rx="3" fill="#334155" />
            <ellipse cx="134" cy="184" rx="13" ry="4" fill="#0f172a" />
            <ellipse cx="186" cy="184" rx="13" ry="4" fill="#0f172a" />
          </g>
          <line x1="40" y1="186" x2="280" y2="186" stroke="#334155" stroke-width="2" />
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • DESI BAITHAK &amp; KNEE TRACKING</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <g class="anim-squat-side">
            <circle cx="155" cy="42" r="12" fill="#0f172a" />
            <path d="M147,54 L168,58 L156,110 L138,106 Z" fill="#1e293b" />
            <!-- Arms Extended Forward for Balance -->
            <line x1="158" y1="64" x2="205" y2="78" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <!-- Glowing Glutes & Quads -->
            <ellipse cx="136" cy="112" rx="13" ry="11" fill="#f59e0b" class="anim-glute-glow" />
            <path d="M140,110 L172,146 L158,152 L128,116 Z" fill="#ef4444" class="anim-quad-glow" />
            <rect x="158" y="148" width="11" height="36" rx="3" fill="#334155" />
            <ellipse cx="168" cy="185" rx="15" ry="4.5" fill="#0f172a" />
          </g>
          <line x1="40" y1="186" x2="280" y2="186" stroke="#334155" stroke-width="2" />
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • CHEST PROUD • FULL HIP DEPTH</text>
        </svg>
      `;
    }
  }

  if (category === 'doorframe_row') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Vertical Doorframe Posts -->
          <rect x="92" y="18" width="12" height="162" rx="3" fill="#475569" />
          <rect x="216" y="18" width="12" height="162" rx="3" fill="#475569" />
          <line x1="35" y1="180" x2="285" y2="180" stroke="#334155" stroke-width="2" />
          <g class="anim-row-front">
            <!-- Athlete Facing Doorframe: Symmetrical Grip & Wide Scapular Pull -->
            <circle cx="160" cy="54" r="13" fill="#0f172a" />
            <path d="M134,68 L186,68 L176,124 L144,124 Z" fill="#1e293b" />
            <!-- Active Glowing Lats / Mid-Back -->
            <path d="M138,72 L182,72 L172,114 L148,114 Z" fill="#ef4444" class="anim-muscle-pec" />
            <!-- Arms Gripping Frame / Towel & Driving Elbows Back -->
            <path d="M134,76 L112,92 L104,88" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <path d="M186,76 L208,92 L216,88" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <!-- Planted Legs -->
            <rect x="146" y="124" width="11" height="52" rx="3" fill="#334155" />
            <rect x="163" y="124" width="11" height="52" rx="3" fill="#334155" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • SYMMETRICAL GRIP &amp; SCAPULAR SQUEEZE</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Sturdy Doorframe Edge / Anchor on Left -->
          <rect x="74" y="18" width="14" height="162" rx="3" fill="#475569" />
          <line x1="35" y1="180" x2="285" y2="180" stroke="#334155" stroke-width="2" />
          <!-- Towel / Strap Anchor Line -->
          <line x1="88" y1="88" x2="145" y2="96" stroke="#f59e0b" stroke-width="4" stroke-dasharray="4,2" />
          <g class="anim-door-row-side">
            <!-- Angled Leaning Straight Body Pulling Chest to Door -->
            <circle cx="192" cy="68" r="12" fill="#0f172a" />
            <line x1="184" y1="80" x2="116" y2="174" stroke="#1e293b" stroke-width="18" stroke-linecap="round" />
            <!-- Glowing Back / Lats Strip -->
            <line x1="176" y1="90" x2="152" y2="124" stroke="#ef4444" stroke-width="11" stroke-linecap="round" class="anim-muscle-pec" />
            <!-- Pulling Arm Driving Elbow Past Torso -->
            <path d="M174,88 L138,94 L94,88" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <!-- Feet Anchored Close to Door Base -->
            <ellipse cx="112" cy="176" rx="11" ry="4" fill="#0f172a" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • 45° LEAN BACK • PULL STERNUM TO FRAME</text>
        </svg>
      `;
    }
  }

  if (category === 'pullup_row') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Pull-up Bar / Overhead Anchor -->
          <rect x="55" y="22" width="210" height="8" rx="4" fill="#475569" />
          <g class="anim-pull-body">
            <!-- Arms Gripping Bar Symmetrically -->
            <line x1="118" y1="28" x2="134" y2="78" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <line x1="202" y1="28" x2="186" y2="78" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <!-- Head -->
            <circle cx="160" cy="64" r="13" fill="#0f172a" />
            <!-- Upper Back / V-Taper Lats Glowing -->
            <path d="M132,76 L188,76 L174,128 L146,128 Z" fill="#ef4444" class="anim-muscle-pec" />
            <!-- Legs -->
            <rect x="148" y="128" width="11" height="50" rx="3" fill="#334155" />
            <rect x="161" y="128" width="11" height="50" rx="3" fill="#334155" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • WIDE GRIP • SYMMETRICAL LAT PULL</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Side Profile Bar Cross-Section & Vertical Pull Line -->
          <line x1="160" y1="26" x2="160" y2="180" stroke="rgba(239, 68, 68, 0.35)" stroke-width="1.5" stroke-dasharray="3,3" />
          <circle cx="160" cy="26" r="7" fill="#475569" />
          <g class="anim-pull-body">
            <!-- Arm Pulling Elbow Down & Slightly Behind Ribs -->
            <path d="M160,28 L174,64 L152,96" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <!-- Head Clearing Bar -->
            <circle cx="144" cy="62" r="12" fill="#0f172a" />
            <!-- Slight Athletic Chest-Up Lean Torso -->
            <path d="M140,74 L162,78 L156,130 L138,126 Z" fill="#1e293b" />
            <!-- Glowing Lat Strip Along Back -->
            <path d="M140,78 L152,80 L148,122 L138,120 Z" fill="#ef4444" class="anim-muscle-pec" />
            <!-- Legs Slightly Tucked / Straight Control -->
            <path d="M148,128 L156,174" stroke="#334155" stroke-width="13" stroke-linecap="round" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • CHEST TO BAR • DRIVE ELBOWS DOWN</text>
        </svg>
      `;
    }
  }

  if (category === 'dips' || category === 'dip') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Front View Chair / Parallel Bar Supports -->
          <rect x="66" y="108" width="26" height="12" rx="4" fill="#475569" />
          <rect x="228" y="108" width="26" height="12" rx="4" fill="#475569" />
          <rect x="74" y="120" width="10" height="62" fill="#1e293b" />
          <rect x="236" y="120" width="10" height="62" fill="#1e293b" />
          <line x1="35" y1="182" x2="285" y2="182" stroke="#334155" stroke-width="2" />
          <g class="anim-dip-side">
            <!-- Head & Upright Chest -->
            <circle cx="160" cy="54" r="13" fill="#0f172a" />
            <path d="M134,68 L186,68 L178,126 L142,126 Z" fill="#1e293b" />
            <!-- Lower Chest & Triceps Glowing -->
            <rect x="140" y="76" width="18" height="16" rx="3" fill="#ef4444" class="anim-muscle-pec" />
            <rect x="162" y="76" width="18" height="16" rx="3" fill="#ef4444" class="anim-muscle-pec" />
            <!-- Elbows Tucked Tight & Pressing Down -->
            <path d="M134,74 L106,86 L86,110" stroke="#ef4444" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <path d="M186,74 L214,86 L234,110" stroke="#ef4444" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <!-- Legs -->
            <rect x="145" y="126" width="12" height="44" rx="3" fill="#38bdf8" />
            <rect x="163" y="126" width="12" height="44" rx="3" fill="#38bdf8" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • SHOULDERS DEPRESSED • ZERO ELBOW FLARE</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Sturdy Chair / Bed Edge -->
          <rect x="42" y="114" width="76" height="14" rx="4" fill="#334155" />
          <rect x="50" y="128" width="12" height="54" fill="#1e293b" />
          <rect x="98" y="128" width="12" height="54" fill="#1e293b" />
          <line x1="30" y1="182" x2="290" y2="182" stroke="#334155" stroke-width="2" />
          <g class="anim-dip-side">
            <!-- Head & Torso -->
            <circle cx="145" cy="64" r="12" fill="#0f172a" />
            <line x1="142" y1="78" x2="146" y2="138" stroke="#1e293b" stroke-width="18" stroke-linecap="round" />
            <!-- Glowing Triceps Arm Gripping Edge -->
            <path d="M138,88 L118,114 L108,114" stroke="#ef4444" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" class="anim-muscle-pec" />
            <!-- Extended Legs -->
            <line x1="150" y1="140" x2="242" y2="176" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
            <ellipse cx="246" cy="178" rx="9" ry="4" fill="#0f172a" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • KEEP HIPS CLOSE TO EDGE • 90° ELBOW BEND</text>
        </svg>
      `;
    }
  }

  if (category === 'pulldown') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Overhead Cable Pulley -->
          <line x1="160" y1="8" x2="160" y2="44" stroke="#94a3b8" stroke-width="2.5" />
          <!-- Seated Athlete Facing Forward -->
          <rect x="132" y="142" width="56" height="10" rx="3" fill="#334155" />
          <circle cx="160" cy="70" r="13" fill="#0f172a" />
          <path d="M134,84 L186,84 L174,142 L146,142 Z" fill="#ef4444" class="anim-muscle-pec" />
          <!-- Moving Wide Lat Bar & Arms -->
          <g class="anim-press-front">
            <rect x="76" y="40" width="168" height="7" rx="3" fill="#cbd5e1" />
            <path d="M134,90 L108,68 L96,44" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <path d="M186,90 L212,68 L224,44" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • WIDE GRIP • DRIVE ELBOWS TO RIBS</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Cable Vertical Path -->
          <line x1="168" y1="8" x2="168" y2="115" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3,3" />
          <!-- Seat Bench & Thigh Pad -->
          <rect x="112" y="146" width="84" height="10" rx="3" fill="#334155" />
          <!-- Slight Lean-Back Torso -->
          <circle cx="136" cy="74" r="12" fill="#0f172a" />
          <path d="M132,86 L154,90 L148,146 L128,144 Z" fill="#1e293b" />
          <path d="M132,90 L144,92 L140,136 L130,134 Z" fill="#ef4444" class="anim-muscle-pec" />
          <path d="M148,146 L192,150 L192,182" stroke="#334155" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <!-- Moving Cable Handle Down to Upper Chest -->
          <g class="anim-press-side">
            <circle cx="168" cy="44" r="7" fill="#cbd5e1" />
            <path d="M146,92 L162,70 L168,44" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • SLIGHT 15° LEAN • PULL TO COLLARBONE</text>
        </svg>
      `;
    }
  }

  if (category === 'row') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Athlete Bent-Over Facing Front -->
          <circle cx="160" cy="64" r="13" fill="#0f172a" />
          <path d="M132,78 L188,78 L180,120 L140,120 Z" fill="#ef4444" class="anim-muscle-pec" />
          <rect x="142" y="120" width="13" height="60" rx="3" fill="#334155" />
          <rect x="165" y="120" width="13" height="60" rx="3" fill="#334155" />
          <!-- Barbell Row Pull Upward -->
          <g class="anim-pull-body">
            <line x1="132" y1="86" x2="118" y2="128" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <line x1="188" y1="86" x2="202" y2="128" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <rect x="52" y="126" width="216" height="7" rx="3" fill="#cbd5e1" />
            <rect x="58" y="108" width="13" height="42" rx="3" fill="#ef4444" />
            <rect x="249" y="108" width="13" height="42" rx="3" fill="#ef4444" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • SYMMETRICAL ROW &amp; ELBOW TUCK</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="35" y1="184" x2="285" y2="184" stroke="#334155" stroke-width="2" />
          <!-- 45-Degree Flat-Back Hinged Torso -->
          <circle cx="102" cy="78" r="12" fill="#0f172a" />
          <line x1="114" y1="84" x2="186" y2="114" stroke="#1e293b" stroke-width="20" stroke-linecap="round" />
          <line x1="122" y1="88" x2="176" y2="110" stroke="#ef4444" stroke-width="10" stroke-linecap="round" class="anim-muscle-pec" />
          <!-- Hinged Legs -->
          <path d="M186,116 L168,148 L178,182" stroke="#334155" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <!-- Arm Rowing Bar to Lower Ribs -->
          <g class="anim-pull-body">
            <line x1="132" y1="92" x2="132" y2="142" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <circle cx="132" cy="144" r="13" fill="#ef4444" />
            <circle cx="132" cy="144" r="4" fill="#ffffff" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • FLAT NEUTRAL BACK • ROW TO LOWER RIBS</text>
        </svg>
      `;
    }
  }

  if (category === 'overhead_press') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="64" r="13" fill="#0f172a" />
          <path d="M138,78 L182,78 L175,130 L145,130 Z" fill="#1e293b" />
          <!-- Glowing Deltoids -->
          <circle cx="134" cy="84" r="10" fill="#ef4444" class="anim-muscle-pec" />
          <circle cx="186" cy="84" r="10" fill="#ef4444" class="anim-muscle-pec" />
          <rect x="145" y="130" width="13" height="54" rx="3" fill="#334155" />
          <rect x="162" y="130" width="13" height="54" rx="3" fill="#334155" />
          <g class="anim-pull-body">
            <line x1="134" y1="84" x2="112" y2="44" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <line x1="186" y1="84" x2="208" y2="44" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <rect x="64" y="40" width="192" height="7" rx="3" fill="#cbd5e1" />
            <circle cx="74" cy="43" r="11" fill="#ef4444" />
            <circle cx="246" cy="43" r="11" fill="#ef4444" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • SYMMETRICAL OVERHEAD LOCKOUT</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="160" y1="18" x2="160" y2="184" stroke="rgba(239, 68, 68, 0.35)" stroke-width="1.5" stroke-dasharray="3,3" />
          <!-- Side Profile Standing Upright (Braced Core) -->
          <circle cx="152" cy="64" r="12" fill="#0f172a" />
          <path d="M144,76 L166,78 L162,130 L144,130 Z" fill="#1e293b" />
          <circle cx="156" cy="84" r="10" fill="#ef4444" class="anim-muscle-pec" />
          <rect x="146" y="130" width="15" height="54" rx="4" fill="#334155" />
          <g class="anim-pull-body">
            <line x1="158" y1="84" x2="160" y2="38" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" />
            <circle cx="160" cy="36" r="11" fill="#ef4444" />
            <circle cx="160" cy="36" r="4" fill="#ffffff" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • VERTICAL BAR PATH • ZERO BACK ARCH</text>
        </svg>
      `;
    }
  }

  if (category === 'fly') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="48" r="13" fill="#0f172a" />
          <path d="M138,62 L182,62 L175,124 L145,124 Z" fill="#1e293b" />
          <!-- Inner Chest Glowing -->
          <rect x="142" y="68" width="17" height="18" rx="3" fill="#ef4444" class="anim-muscle-pec" />
          <rect x="161" y="68" width="17" height="18" rx="3" fill="#ef4444" class="anim-muscle-pec" />
          <rect x="145" y="124" width="13" height="58" rx="3" fill="#334155" />
          <rect x="162" y="124" width="13" height="58" rx="3" fill="#334155" />
          <!-- Wide Sweeping Fly Arc -->
          <g class="anim-fly-front">
            <path d="M138,72 Q96,80 78,94" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" fill="none" />
            <path d="M182,72 Q224,80 242,94" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" fill="none" />
            <circle cx="76" cy="94" r="7" fill="#f59e0b" />
            <circle cx="244" cy="94" r="7" fill="#f59e0b" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • WIDE HUGGING ARC &amp; MIDLINE SQUEEZE</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Side Staggered Stance Athletic Forward Lean -->
          <circle cx="142" cy="52" r="12" fill="#0f172a" />
          <path d="M136,64 L158,68 L148,124 L128,120 Z" fill="#1e293b" />
          <rect x="136" y="72" width="16" height="18" rx="3" fill="#ef4444" class="anim-muscle-pec" />
          <path d="M136,122 L116,182" stroke="#334155" stroke-width="12" stroke-linecap="round" />
          <path d="M146,122 L170,182" stroke="#334155" stroke-width="12" stroke-linecap="round" />
          <!-- Arm Sweeping Forward with Slight 15° Elbow Bend -->
          <g class="anim-door-row-side">
            <path d="M150,74 L184,84 L212,80" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            <circle cx="215" cy="80" r="7" fill="#f59e0b" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • STAGGERED STANCE • FIXED 15° ELBOW BEND</text>
        </svg>
      `;
    }
  }

  if (category === 'leg_raise') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="35" y1="176" x2="285" y2="176" stroke="#334155" stroke-width="2" />
          <!-- Front View Supine Torso & Glowing Lower Abs -->
          <circle cx="160" cy="48" r="12" fill="#0f172a" />
          <path d="M136,62 L184,62 L178,124 L142,124 Z" fill="#1e293b" />
          <rect x="148" y="82" width="24" height="36" rx="4" fill="#ef4444" class="anim-plank-glow" />
          <line x1="134" y1="70" x2="122" y2="120" stroke="#38bdf8" stroke-width="9" stroke-linecap="round" />
          <line x1="186" y1="70" x2="198" y2="120" stroke="#38bdf8" stroke-width="9" stroke-linecap="round" />
          <!-- Symmetrical Legs Lifting Smoothly Together -->
          <g class="anim-pull-body">
            <rect x="144" y="122" width="13" height="50" rx="4" fill="#38bdf8" />
            <rect x="163" y="122" width="13" height="50" rx="4" fill="#38bdf8" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • LEGS TOGETHER • CONTROLLED AB LIFT</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="176" x2="290" y2="176" stroke="#334155" stroke-width="2.5" stroke-linecap="round" />
          <!-- Athlete Lying Flat on Back (Lumbar Glued to Floor) -->
          <circle cx="68" cy="160" r="12" fill="#0f172a" />
          <line x1="82" y1="166" x2="168" y2="166" stroke="#1e293b" stroke-width="18" stroke-linecap="round" />
          <line x1="112" y1="164" x2="162" y2="164" stroke="#ef4444" stroke-width="10" stroke-linecap="round" class="anim-plank-glow" />
          <!-- Legs Pivoting Up from Hips to 90 Degrees -->
          <g class="anim-leg-raise-side">
            <line x1="168" y1="164" x2="254" y2="142" stroke="#38bdf8" stroke-width="13" stroke-linecap="round" />
            <ellipse cx="258" cy="140" rx="8" ry="4" fill="#0f172a" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • LOWER BACK GLUED FLAT • SLOW 3S DESCENT</text>
        </svg>
      `;
    }
  }

  if (category === 'calf') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <rect x="95" y="170" width="130" height="12" rx="3" fill="#475569" />
          <g class="anim-calf-rise">
            <circle cx="160" cy="40" r="12" fill="#0f172a" />
            <path d="M142,54 L178,54 L174,104 L146,104 Z" fill="#1e293b" />
            <rect x="145" y="104" width="12" height="32" rx="3" fill="#334155" />
            <rect x="163" y="104" width="12" height="32" rx="3" fill="#334155" />
            <!-- Glowing Calves -->
            <ellipse cx="151" cy="150" rx="7" ry="16" fill="#ef4444" class="anim-quad-glow" />
            <ellipse cx="169" cy="150" rx="7" ry="16" fill="#ef4444" class="anim-quad-glow" />
            <ellipse cx="151" cy="168" rx="9" ry="4" fill="#0f172a" />
            <ellipse cx="169" cy="168" rx="9" ry="4" fill="#0f172a" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • BALANCED ANKLE TRACKING • HIGH PEAK</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Elevated Step Edge -->
          <rect x="135" y="166" width="95" height="16" rx="3" fill="#475569" />
          <line x1="35" y1="182" x2="285" y2="182" stroke="#334155" stroke-width="2" />
          <g class="anim-calf-rise">
            <circle cx="156" cy="40" r="12" fill="#0f172a" />
            <rect x="146" y="54" width="20" height="52" rx="5" fill="#1e293b" />
            <rect x="149" y="106" width="14" height="30" rx="4" fill="#334155" />
            <!-- Glowing Posterior Calf Gastrocnemius -->
            <ellipse cx="153" cy="148" rx="8" ry="15" fill="#ef4444" class="anim-quad-glow" />
            <!-- Foot Pivoting on Ball Over Edge -->
            <path d="M140,172 L168,164" stroke="#0f172a" stroke-width="8" stroke-linecap="round" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • FULL HEEL DROP STRETCH &amp; 1S TOP PAUSE</text>
        </svg>
      `;
    }
  }

  if (category === 'recovery') {
    if (isFront) {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="35" y1="180" x2="285" y2="180" stroke="#334155" stroke-width="2" />
          <g class="anim-plank-glow">
            <!-- Front Open-Chest & Mobility Recovery Stance -->
            <circle cx="160" cy="48" r="13" fill="#0f172a" />
            <path d="M138,62 L182,62 L175,118 L145,118 Z" fill="#10b981" />
            <!-- Arms Reaching Wide & Calm Overhead -->
            <path d="M138,68 Q104,54 90,34" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" fill="none" />
            <path d="M182,68 Q216,54 230,34" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" fill="none" />
            <!-- Grounded Stance -->
            <path d="M148,118 L136,178" stroke="#334155" stroke-width="13" stroke-linecap="round" />
            <path d="M172,118 L184,178" stroke="#334155" stroke-width="13" stroke-linecap="round" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • OPEN CHEST &amp; CALM NASAL BREATHING</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="176" x2="290" y2="176" stroke="#334155" stroke-width="2" />
          <!-- Side Profile Cat-Cow / Spine Decompression Flow -->
          <g class="anim-plank-glow">
            <circle cx="96" cy="116" r="12" fill="#0f172a" />
            <!-- Arched Mobile Spine Curve -->
            <path d="M108,120 Q158,92 208,122" stroke="#10b981" stroke-width="16" stroke-linecap="round" fill="none" />
            <!-- Grounded Arms & Knees (Tabletop) -->
            <line x1="112" y1="124" x2="112" y2="174" stroke="#38bdf8" stroke-width="10" stroke-linecap="round" />
            <path d="M206,124 L206,174 L242,174" stroke="#334155" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </g>
          <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • GENTLE SPINAL DECOMPRESSION FLOW</text>
        </svg>
      `;
    }
  }

  // Generic / Default Fallback (Distinct Front & Side Angles Guaranteed)
  if (isFront) {
    return `
      <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
        <g class="anim-press-front">
          <circle cx="160" cy="48" r="14" fill="#0f172a" />
          <path d="M140,62 L180,62 L174,118 L146,118 Z" fill="#1e293b" />
          <rect x="145" y="118" width="13" height="62" rx="3" fill="#334155" />
          <rect x="162" y="118" width="13" height="62" rx="3" fill="#334155" />
          <line x1="140" y1="68" x2="115" y2="34" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" />
          <line x1="180" y1="68" x2="205" y2="34" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" />
          <rect x="60" y="28" width="200" height="7" rx="3" fill="#cbd5e1" />
          <circle cx="70" cy="31" r="11" fill="#ef4444" />
          <circle cx="250" cy="31" r="11" fill="#ef4444" />
        </g>
        <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">FRONT ANGLE • BALANCED FORM &amp; FULL CONTROL</text>
      </svg>
    `;
  } else {
    return `
      <svg viewBox="0 0 320 210" class="bio-svg human-motion-svg" xmlns="http://www.w3.org/2000/svg">
        <line x1="160" y1="20" x2="160" y2="180" stroke="rgba(239, 68, 68, 0.35)" stroke-width="1.5" stroke-dasharray="3,3" />
        <g class="anim-press-side">
          <circle cx="150" cy="52" r="12" fill="#0f172a" />
          <path d="M142,64 L164,66 L158,122 L140,120 Z" fill="#1e293b" />
          <rect x="144" y="122" width="15" height="58" rx="4" fill="#334155" />
          <line x1="156" y1="74" x2="160" y2="32" stroke="#38bdf8" stroke-width="11" stroke-linecap="round" />
          <circle cx="160" cy="30" r="11" fill="#ef4444" />
        </g>
        <text x="160" y="204" text-anchor="middle" fill="#64748b" font-size="9" font-weight="700">SIDE ANGLE • NEUTRAL SPINE &amp; CONTROLLED TEMPO</text>
      </svg>
    `;
  }
}

// =========================================================================
// Modal Controller for MuscleWiki Exercise Demonstrations
// =========================================================================
async function openExerciseDemoModal(exId) {
  activeDemoExId = exId;
  const ex = (typeof findExercise === 'function') ? findExercise(exId) : null;
  const rawGuide = EXERCISE_GUIDES[exId];

  // Merge guide or build smart dynamic guide for custom exercises
  const guide = rawGuide || {
    name: ex ? ex.name : "Custom Exercise",
    equipment: "Dumbbell / Barbell",
    level: "Intermediate",
    type: "Compound",
    category: "bench_press",
    primaryMuscle: ex ? ex.target : "Target Muscle Group",
    secondaryMuscle: "Secondary Muscle Stabilizers",
    tertiaryMuscle: "Core & Postural Bracing",
    gripType: "Standard Overhand / Neutral",
    forceType: "Push",
    tempo: "2s Controlled Down -> 1s Explosive Up",
    anatomyTarget: { primary: "chest", secondary: "delt" },
    instructions: [
      "Set up with a stable athletic stance or securely positioned on the bench.",
      "Engage your core, retract your shoulder blades, and establish a firm grip.",
      ex ? ex.notes : "Lower the resistance under a strict 2-second eccentric cadence.",
      "Drive back to full contraction and squeeze the target muscle firmly."
    ],
    mistakes: "Avoid using body momentum or rushing through the eccentric phase.",
    proTip: "Focus on mind-muscle connection and full range of motion for optimal hypertrophy."
  };

  const modal = document.getElementById('exerciseDemoModal');
  if (!modal) return;

  // Title and Header Badges
  const titleEl = document.getElementById('demoExTitle');
  const equipEl = document.getElementById('demoExEquipment');
  const levelEl = document.getElementById('demoExLevel');
  const typeEl = document.getElementById('demoExType');

  if (titleEl) titleEl.innerText = (ex && ex.name) ? ex.name : guide.name;
  if (equipEl) equipEl.innerText = guide.equipment || 'Barbell';
  if (levelEl) levelEl.innerText = guide.level || 'Intermediate';
  if (typeEl) typeEl.innerText = guide.type || 'Compound';

  // Render Multi-Angle Motion Player
  renderActiveMotionPlayer(guide);

  // Render Muscle Anatomy Diagram
  const anatomyContainer = document.getElementById('demoAnatomyContainer');
  if (anatomyContainer) {
    anatomyContainer.innerHTML = generateMuscleAnatomySvg(guide.anatomyTarget);
  }

  // Key Parameters Grid
  const primEl = document.getElementById('demoExPrimary');
  const secEl = document.getElementById('demoExSecondary');
  const tertEl = document.getElementById('demoExTertiary');
  const gripEl = document.getElementById('demoExGrip');
  const forceEl = document.getElementById('demoExForce');
  const tempoEl = document.getElementById('demoExTempo');

  if (primEl) primEl.innerText = guide.primaryMuscle || (ex ? ex.target : '-');
  if (secEl) secEl.innerText = guide.secondaryMuscle || 'Core & Stabilizers';
  if (tertEl) tertEl.innerText = guide.tertiaryMuscle || 'Postural Chain';
  if (gripEl) gripEl.innerText = guide.gripType || 'Overhand (Pronated)';
  if (forceEl) forceEl.innerText = guide.forceType || 'Push';
  if (tempoEl) tempoEl.innerText = guide.tempo || '2-0-1-0';

  // Numbered Instructions List (MuscleWiki Step-by-Step layout)
  const stepsContainer = document.getElementById('demoInstructionsContainer');
  if (stepsContainer && guide.instructions) {
    let stepsHtml = '';
    guide.instructions.forEach((step, idx) => {
      stepsHtml += `
        <div class="mw-instruction-step">
          <div class="mw-step-num">${idx + 1}</div>
          <div class="mw-step-text">${step}</div>
        </div>
      `;
    });
    stepsContainer.innerHTML = stepsHtml;
  }

  // Common Mistakes & Pro Tip
  const mistEl = document.getElementById('demoExMistakes');
  const tipEl = document.getElementById('demoExProTip');
  if (mistEl) mistEl.innerText = guide.mistakes || 'Avoid momentum and poor posture.';
  if (tipEl) tipEl.innerText = guide.proTip || 'Control the eccentric phase for maximal muscle fiber tension.';

  // Management Buttons: Toggle Delete/Edit availability
  const btnDelete = document.getElementById('btnDeleteDemoExercise');
  if (btnDelete) {
    btnDelete.style.display = ex ? 'inline-flex' : 'none';
  }

  // Always reset Demo Modal scroll position strictly to top (0) on every open
  const modalBody = modal.querySelector('.modal-body');
  if (modalBody) modalBody.scrollTop = 0;

  modal.classList.add('open');

  if (modalBody) {
    modalBody.scrollTop = 0;
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        modalBody.scrollTop = 0;
      });
    }
    setTimeout(() => {
      modalBody.scrollTop = 0;
    }, 45);
  }
}

// Render the Front or Side motion player
async function renderActiveMotionPlayer(guide) {
  const mediaContainer = document.getElementById('demoMediaContainer');
  if (!mediaContainer) return;

  mediaContainer.innerHTML = `<div class="loading-spinner">Loading demonstration...</div>`;

  // Check if user uploaded a custom video in IndexedDB
  const customBlob = await getCustomMedia(activeDemoExId);
  const btnRemove = document.getElementById('btnRemoveCustomMedia');

  if (customBlob) {
    const videoUrl = URL.createObjectURL(customBlob);
    const isVideo = customBlob.type && customBlob.type.startsWith('video');

    if (isVideo) {
      mediaContainer.innerHTML = `
        <div class="custom-video-wrapper">
          <video src="${videoUrl}" autoplay loop muted playsinline class="demo-video-player"></video>
          <div class="media-badge">Personal Offline Video</div>
        </div>
      `;
    } else {
      mediaContainer.innerHTML = `
        <div class="custom-video-wrapper">
          <img src="${videoUrl}" class="demo-video-player" alt="Exercise Demo">
          <div class="media-badge">Custom Motion Guide</div>
        </div>
      `;
    }
    if (btnRemove) btnRemove.style.display = 'inline-flex';
  } else {
    // Show MuscleWiki-Style SVG Human Motion (Front or Side)
    const category = guide.category || 'squat';
    mediaContainer.innerHTML = `
      <div class="svg-demo-wrapper">
        ${generateHumanMotionSvg(category, currentDemoAngle)}
        <div class="media-badge">${currentDemoAngle.toUpperCase()} ANGLE</div>
      </div>
    `;
    if (btnRemove) btnRemove.style.display = 'none';
  }

  // Update Angle Toggle Button classes
  const btnFront = document.getElementById('btnAngleFront');
  const btnSide = document.getElementById('btnAngleSide');
  if (btnFront && btnSide) {
    if (currentDemoAngle === 'front') {
      btnFront.classList.add('active');
      btnSide.classList.remove('active');
    } else {
      btnSide.classList.add('active');
      btnFront.classList.remove('active');
    }
  }
}

// Switch between Front Angle and Side Angle
function switchDemoAngle(angle) {
  currentDemoAngle = angle;
  const ex = (typeof findExercise === 'function') ? findExercise(activeDemoExId) : null;
  const guide = EXERCISE_GUIDES[activeDemoExId] || { category: 'bench_press' };
  renderActiveMotionPlayer(guide);
}

// =========================================================================
// Demo Exercise Management: Edit, Delete & Video Upload
// =========================================================================
async function handleMediaUpload(event) {
  const file = event.target.files[0];
  if (!file || !activeDemoExId) return;

  if (file.size > 50 * 1024 * 1024) {
    if (typeof showAppAlert === 'function') {
      await showAppAlert({
        title: 'File Too Large',
        message: 'Please select a video or GIF smaller than 50 MB.',
        tone: 'warning'
      });
    }
    return;
  }

  try {
    await saveCustomMedia(activeDemoExId, file);
    if (typeof showAppAlert === 'function') {
      await showAppAlert({
        title: 'Video Saved',
        message: 'Your personal exercise demonstration is saved 100% offline.',
        tone: 'success'
      });
    }
    openExerciseDemoModal(activeDemoExId);
  } catch (e) {
    if (typeof showAppAlert === 'function') {
      await showAppAlert({
        title: 'Save Failed',
        message: 'Unable to save the selected video format.',
        tone: 'error'
      });
    }
  }
}

async function removeActiveCustomMedia() {
  if (!activeDemoExId) return;
  if (typeof showAppConfirm === 'function') {
    const ok = await showAppConfirm({
      title: 'Remove Video',
      message: 'Restore default MuscleWiki biomechanical guide?',
      confirmText: 'Restore Guide',
      tone: 'warning'
    });
    if (!ok) return;
  }
  await deleteCustomMedia(activeDemoExId);
  openExerciseDemoModal(activeDemoExId);
}

// Delete Exercise from inside Demo modal
async function deleteExerciseFromDemo() {
  if (!activeDemoExId) return;
  const ex = (typeof findExercise === 'function') ? findExercise(activeDemoExId) : null;
  const name = ex ? ex.name : 'this exercise';

  if (typeof showAppConfirm === 'function') {
    const ok = await showAppConfirm({
      title: 'Delete Exercise',
      message: `Are you sure you want to remove "${name}" from today's workout plan?`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      tone: 'warning'
    });
    if (!ok) return;
  }

  if (typeof workoutPlan !== 'undefined' && typeof currentDay !== 'undefined' && workoutPlan[currentDay]) {
    workoutPlan[currentDay].exercises = workoutPlan[currentDay].exercises.filter(e => e.id !== activeDemoExId);
    if (typeof savePlan === 'function') savePlan();
    if (typeof renderWorkoutView === 'function') renderWorkoutView();
  }

  if (typeof closeModal === 'function') {
    closeModal('exerciseDemoModal');
  }

  if (typeof showAppAlert === 'function') {
    await showAppAlert({
      title: 'Exercise Deleted',
      message: `"${name}" was successfully removed from your routine.`,
      tone: 'info'
    });
  }
}

// Open Edit Exercise Modal from Demo modal (Supports Gym + Room Fitness exercises)
function openEditExerciseFromDemo() {
  if (!activeDemoExId) return;
  let ex = (typeof findExercise === 'function') ? findExercise(activeDemoExId) : null;
  if (!ex && typeof window.getRoomExerciseDetails === 'function') {
    ex = window.getRoomExerciseDetails(activeDemoExId);
  }
  if (!ex) return;

  const idInput = document.getElementById('editExId');
  const nameInput = document.getElementById('editExName');
  const targetInput = document.getElementById('editExTarget');
  const notesInput = document.getElementById('editExNotes');

  if (idInput) idInput.value = ex.id;
  if (nameInput) nameInput.value = ex.name || '';
  if (targetInput) targetInput.value = ex.target || '';
  if (notesInput) notesInput.value = ex.notes || '';

  if (typeof openModal === 'function') {
    openModal('editExerciseModal');
  }
}

// Submit Edit Exercise Form (Supports Gym + Room Fitness exercises)
async function submitEditExercise(event) {
  if (event) event.preventDefault();
  const id = document.getElementById('editExId')?.value;
  const name = document.getElementById('editExName')?.value?.trim();
  const target = document.getElementById('editExTarget')?.value?.trim();
  const notes = document.getElementById('editExNotes')?.value?.trim();

  if (!id || !name) return;

  let updated = false;

  if (typeof workoutPlan !== 'undefined' && typeof currentDay !== 'undefined' && workoutPlan[currentDay]) {
    const ex = workoutPlan[currentDay].exercises.find(e => e.id === id);
    if (ex) {
      ex.name = name;
      if (target) ex.target = target;
      if (notes) ex.notes = notes;
      if (typeof savePlan === 'function') savePlan();
      if (typeof renderWorkoutView === 'function') renderWorkoutView();
      updated = true;
    }
  }

  if (!updated && typeof window.updateRoomExerciseDetails === 'function') {
    updated = window.updateRoomExerciseDetails(id, { name, target, notes });
  }

  if (typeof closeModal === 'function') {
    closeModal('editExerciseModal');
  }

  // Refresh demo modal from top with updated details
  openExerciseDemoModal(id);

  if (typeof showAppAlert === 'function') {
    await showAppAlert({
      title: 'Exercise Updated',
      message: 'Your exercise details and form cues have been saved.',
      tone: 'success'
    });
  }
}

// Expose globally to window
window.EXERCISE_GUIDES = EXERCISE_GUIDES;
window.generateHumanMotionSvg = generateHumanMotionSvg;
window.openExerciseDemoModal = openExerciseDemoModal;
window.switchDemoAngle = switchDemoAngle;
window.handleMediaUpload = handleMediaUpload;
window.removeActiveCustomMedia = removeActiveCustomMedia;
window.deleteExerciseFromDemo = deleteExerciseFromDemo;
window.openEditExerciseFromDemo = openEditExerciseFromDemo;
window.submitEditExercise = submitEditExercise;
