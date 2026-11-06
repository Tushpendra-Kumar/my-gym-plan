/**
 * Exercise Visual Guides & 5-Second Looping Movement Demonstrations
 * 100% Offline with Animated SVG Biomechanics & IndexedDB Custom Video Support
 */

// IndexedDB Helper for Custom Exercise Videos & GIFs
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

// Visual Guides Database with Form Rules and SVG Animation Templates
const EXERCISE_GUIDES = {
  // Monday: Chest
  m1: {
    category: "press",
    svgType: "incline_press",
    primary: "[1/5] Upper Chest (Upar Ka Seena / Clavicle Muscle)",
    secondary: "Front Deltoids, Triceps",
    tempo: "2s Slow Down (Negative) → 1s Explode Up",
    setup: "Bench ko 30-45 degree angle par set karein. Pair zameen par tight lock karein.",
    execution: "Dumbbells ko upper chest tak 2 second control ke sath slow layein, upar le jaakar upper chest ko tight squeeze karein. Upar dumbbells takrayein nahi.",
    mistakes: "Bench ko 45 degree se zyada steep na karein, varna chest ki jagah shoulders par load aayega."
  },
  m2: {
    category: "press",
    svgType: "bench_press",
    primary: "[2/5] Mid Chest (Chhati Ka Main Base & Heavy Power)",
    secondary: "Triceps, Anterior Deltoids",
    tempo: "2s Control Down → 1s Explosive Drive",
    setup: "Shoulder blades ko peeche bench par pinch karein. Bar ko shoulder se thoda wide pakdein.",
    execution: "Barbell ko chest ke center tak touch karein aur explosively upar push karein. Elbows ko 75-degree angle par rakhein.",
    mistakes: "Bar ko chest par bounce na karein aur kamar ko zyada jhatka na dein."
  },
  m3: {
    category: "dip",
    svgType: "dips",
    primary: "[3/5] Lower Chest Cut (Neeche Ka V-Cut & Triceps)",
    secondary: "Anterior Delts",
    tempo: "2s Controlled Lower → 1s Strong Press",
    setup: "Parallel bars par pakad banayein. Torso ko 20-30 degree aage lean karein (aage jhukna zaroori hai).",
    execution: "Elbows 90 degree aane tak control se neeche jayein, fir lower chest aur triceps se power push karein.",
    mistakes: "Seedha khade rehkar dips karne se load sirf triceps par jayega; lower chest ke liye 20° aage jhukna zaroori hai."
  },
  m4: {
    category: "fly",
    svgType: "cable_fly",
    primary: "[4/5] Inner Chest Line (Beech Ki Lakir & Deep Separation)",
    secondary: "Anterior Delts",
    tempo: "2s Stretch → 2s Peak Contraction Hold",
    setup: "Cables ko shoulder level ya upar set karein. Ek pair aage rakh kar stable athletic stance lein.",
    execution: "Cables ko aage laate hue dono haathon ko center me aapas me milayein aur 2 second squeeze hold karein taaki beech ki deep line bane.",
    mistakes: "Arms ko bilkul straight lock na karein; elbows me halka bend rakhein taaki tendons safe rahein."
  },
  m5: {
    category: "core",
    svgType: "leg_raise",
    primary: "[5/5] Lower 6-Pack Abs & Core (Pet Ka Nichla Hissa)",
    secondary: "Hip Flexors, Obliques, Grip Strength",
    tempo: "1s Strict Curl Up → 2s Slow Controlled Down",
    setup: "Pull-up bar par shoulder-width pakad banakar hang karein. Body ko bilkul steady rakhein.",
    execution: "Bina jhoole (no body swing), knees ya legs ko chest ki taraf curl karein aur hips ko upar rotate karein taaki lower abs poore crunch hon.",
    mistakes: "Body ko aage-peeche jhulakar momentum se pair mat uthayein; strictly abs ki power se lift karein."
  },

  // Tuesday: Back
  t1: {
    category: "hinge",
    svgType: "deadlift",
    primary: "Full Posterior Chain (Hamstrings, Glutes, Erector Spinae)",
    secondary: "Lats, Upper Traps, Forearm Grip",
    tempo: "1s Powerful Pull → 2s Controlled Descent",
    setup: "Feet hip-width apart. Bar shins ke 1 inch paas ho. Spine completely neutral, chest high.",
    execution: "Heels se floor ko push karein. Bar shins ke sath-sath vertically upar aayegi. Top par glutes squeeze karein.",
    mistakes: "Kamar ko round (cat back) bilkul na karein. Weight lift karte waqt pehle hips upar na bhagne dein."
  },
  t2: {
    category: "pull",
    svgType: "lat_pulldown",
    primary: "Latissimus Dorsi (Back Width)",
    secondary: "Biceps, Rear Delts, Rhomboids",
    tempo: "1s Pull Down → 2s Controlled Stretch",
    setup: "Thigh pads tight set karein. Bar ko shoulder se wide pakdein. Slight 10-degree lean back.",
    execution: "Bar ko collarbone tak pull karein. Elbows ko peeche pockets ki taraf drive karein.",
    mistakes: "Zyada peeche jhoolkar momentum se pull na karein; lats se pull karein, bicep se nahi."
  },
  t3: {
    category: "row",
    svgType: "barbell_row",
    primary: "Mid Back & Lat Thickness",
    secondary: "Biceps, Rear Delts",
    tempo: "1s Powerful Row → 2s Stretch",
    setup: "Hips ko 45 degree par hinge karein, back flat rakhein, knees slightly bent.",
    execution: "Barbell ko belly button ki taraf pull karein. Top par shoulder blades ko aapas me squeeze karein.",
    mistakes: "Spine ko curve na karein aur torso ko har rep par upar-neeche na jhatkein."
  },
  t4: {
    category: "row",
    svgType: "single_arm_row",
    primary: "Unilateral Lat Isolation",
    secondary: "Rhomboids, Biceps",
    tempo: "1s Smooth Pull → 2s Deep Stretch",
    setup: "Ek knee aur haath bench par rakhein. Spine neutral aur parallel to floor.",
    execution: "Dumbbell ko hip ki taraf arc me pull karein, elbow ko ceiling ki taraf lead karein.",
    mistakes: "Dumbbell ko chest ki taraf straight uthane se bicep zyada involve hota hai; hip ki taraf pull karein."
  },
  t5: {
    category: "pull",
    svgType: "face_pull",
    primary: "Rear Delts, Rotator Cuff, Upper Traps",
    secondary: "Rhomboids (Posture Fixer)",
    tempo: "1s Pull & External Rotate → 2s Return",
    setup: "Cable machine par rope eye level par lagayein. Thumbs backward point karein.",
    execution: "Rope ko aankhon ki taraf pull karein aur elbows ko wide spread karein (Double bicep pose jaisa).",
    mistakes: "Zyada heavy weight lekar body ko jhatkein nahi; ye posture aur shoulder health exercise hai."
  },

  // Wednesday: Shoulders & Core
  w1: {
    category: "press",
    svgType: "overhead_press",
    primary: "Anterior & Lateral Deltoids",
    secondary: "Triceps, Upper Chest, Core Stability",
    tempo: "1s Explosive Press → 2s Controlled Lower",
    setup: "Feet shoulder-width apart. Glutes aur core rock solid tight rakhein. Bar upper chest par rest karein.",
    execution: "Bar ko vertical line me press karein. Jaise hi bar forehead cross kare, head ko slightly aage layein.",
    mistakes: "Kamar ko zyada arch (bend) na karein; core ko punch khane ke liye brace rakhein."
  },
  w2: {
    category: "raise",
    svgType: "lateral_raise",
    primary: "Lateral Deltoids (3D Shoulder Width)",
    secondary: "Traps",
    tempo: "1s Smooth Raise → 2s Slow Descent",
    setup: "Dumbbells sides me rakhein. Torso me 5-degree slight forward lean rakhein.",
    execution: "Elbows ko lead karte hue dumbbells ko shoulder height tak raise karein (like pouring water from pitcher).",
    mistakes: "Heavy weight lekar hips se jhatka na marein; strict form hi lateral head ko target karegi."
  },
  w3: {
    category: "press",
    svgType: "arnold_press",
    primary: "Full 3D Deltoid Heads",
    secondary: "Triceps",
    tempo: "1s Rotate & Press → 2s Return",
    setup: "Palms facing your face at chest level.",
    execution: "Press karte hue haathon ko 180 degree bahar ki taraf rotate karein aur top par lock karein.",
    mistakes: "Rotation ko jerky na karein; smooth circular flow me press karein."
  },
  w4: {
    category: "shrug",
    svgType: "shrugs",
    primary: "Upper Trapezius",
    secondary: "Forearms, Neck Strength",
    tempo: "1s Squeeze to Ears → 2s Hold & Lower",
    setup: "Heavy dumbbells sides me pakdein, tall stand karein.",
    execution: "Shoulders ko seedha kaanon (ears) ki taraf upar uthayein. Top par 2 second pause karein.",
    mistakes: "Shoulders ko gol-gol (roll) na ghumayein; sirf vertically straight up and down karein."
  },
  w5: {
    category: "core",
    svgType: "ab_wheel",
    primary: "Rectus Abdominis & Deep Core Stabilizers",
    secondary: "Lats, Lower Back",
    tempo: "2s Controlled Rollout → 1s Power Pullback",
    setup: "Knees floor par rakhein, wheel dono haathon me firmly pakdein.",
    execution: "Body ko aage roll karein jab tak nose floor ke paas na aa jaye, fir abs ko crunch karke wapas layein.",
    mistakes: "Lower back ko sag (jhukne) na dein; core hamesha hollow body shape me lock rahe."
  },

  // Thursday: Arms & Grip
  th1: {
    category: "curl",
    svgType: "bicep_curl",
    primary: "Biceps Brachii (Short & Long Head)",
    secondary: "Brachialis, Forearms",
    tempo: "1s Power Curl → 2s Slow Negative",
    setup: "Elbows ko ribs ke sath pin karke rakhein. Shoulder-width grip.",
    execution: "Barbell ko curl karein bina elbows ko aage bheje. Top par bicep ko peak squeeze karein.",
    mistakes: "Peeth ko peeche swing karke weight na uthayein."
  },
  th2: {
    category: "tricep",
    svgType: "skull_crusher",
    primary: "Triceps Long Head & Lateral Head",
    secondary: "Forearms",
    tempo: "2s Lower Behind Head → 1s Extension",
    setup: "Bench par lie down karein. Arms vertically upar locked hon.",
    execution: "Sirf elbows ko bend karke bar ko forehead/crown ke peeche layein, fir triceps se extend karein.",
    mistakes: "Elbows ko bahar ki taraf flare na karein; unhe shoulder-width par tuck rakhein."
  },
  th3: {
    category: "curl",
    svgType: "hammer_curl",
    primary: "Brachialis & Brachioradialis (Arm Thickness)",
    secondary: "Bicep Peak",
    tempo: "1s Strict Curl → 2s Controlled Down",
    setup: "Palms facing each other (neutral hammer grip).",
    execution: "Dumbbells ko thumbs up position me upar curl karein.",
    mistakes: "Wrists ko twist na karein; neutral grip maintain rakhein."
  },
  th4: {
    category: "tricep",
    svgType: "tricep_rope",
    primary: "Triceps Lateral & Medial Head",
    secondary: "Forearm extensors",
    tempo: "1s Down & Spread → 2s Return",
    setup: "Elbows ribs par locked hon.",
    execution: "Rope ko neeche push karein aur bottom par dono ends ko wide spread karke triceps flex karein.",
    mistakes: "Elbows ko aage-peeche swing na hone dein."
  },
  th5: {
    category: "grip",
    svgType: "wrist_curl",
    primary: "Forearm Flexors & Crushing Grip",
    secondary: "Hand Endurance",
    tempo: "Hold / High Rep Burns",
    setup: "Forearms bench ya thighs par rest karein, wrists over the edge.",
    execution: "Wrists ko full stretch me neeche layein aur fir forcefully upar curl karein.",
    mistakes: "Speed me bounce na karein; slow deliberate contraction zaroori hai."
  },

  // Friday: Athletic Functional
  f1: {
    category: "functional",
    svgType: "kettlebell_swing",
    primary: "Glutes, Hamstrings & Explosive Hip Hinge",
    secondary: "Core, Lats, Cardiovascular Stamina",
    tempo: "Continuous Explosive Rhythm",
    setup: "Feet shoulder-width apart. Bell 1 foot aage floor par.",
    execution: "Hips ko peeche push karein, bell ko thighs ke beech se swing karke hips ko forcefully aage snap karein.",
    mistakes: "Squat mat karein; ye Hip Hinge movement hai. Haathon se weight na uthayein, hips se drive karein."
  },
  f2: {
    category: "functional",
    svgType: "box_jump",
    primary: "Fast-Twitch Leg Spring & Vertical Power",
    secondary: "Quads, Calves, Hip Explosion",
    tempo: "Explosive Jump → Soft Cat Landing",
    setup: "Box se 1 foot dur athletic stance me khade hon.",
    execution: "Arms swing karke quarter squat se explosively jump karein. Box par bilkul soft land karein.",
    mistakes: "Box se jump karke neeche na girein; safe step down karein joints ko protect karne ke liye."
  },
  f3: {
    category: "functional",
    svgType: "battle_ropes",
    primary: "Shoulders, Upper Body Stamina & Core",
    secondary: "Lactic Acid Threshold, Grip",
    tempo: "High Frequency Waves (30-40s)",
    setup: "Athletic quarter-squat stance, chest up.",
    execution: "Alternate arms se explosive continuous waves banayein anchor point tak.",
    mistakes: "Stiff khade na rahein; lower body athletic base maintain rakhein."
  },
  f4: {
    category: "functional",
    svgType: "farmers_walk",
    primary: "Full Body Brute Force, Traps & Core Anti-Flexion",
    secondary: "Grip, Calves",
    tempo: "Steady controlled strides",
    setup: "Heavy dumbbells/trap bar dono haathon me pakdein.",
    execution: "Tall walk karein, shoulders packed back, spine erect, continuous steady breathing.",
    mistakes: "Body ko sides me sway (jhukne) na dein; core brace rakhein."
  },
  f5: {
    category: "functional",
    svgType: "sprint",
    primary: "Sprint Speed, VO2 Max, Sub-10% Fat Burning",
    secondary: "Full Body Nervous System Drive",
    tempo: "30s Max Effort Sprint → 45s Walk Recovery",
    setup: "Treadmill incline ya track par start karein.",
    execution: "Knees high drive karein, arms 90 degree par pump karein, ball of foot par strike karein.",
    mistakes: "Heel strike na karein; midfoot/forefoot se spring banayein."
  },

  // Saturday: Legs
  s1: {
    category: "squat",
    svgType: "squat",
    primary: "Quadriceps, Glutes, Core Bracing",
    secondary: "Hamstrings, Calves, Adductors",
    tempo: "2s Down to Parallel → 1s Explosive Up",
    setup: "Bar upper traps par securely set karein. Feet shoulder-width apart, toes slightly turned out.",
    execution: "Hips ko peeche aur neeche bhejein, parallel depth hit karein, heels se floor push karke explode karein.",
    mistakes: "Knees ko andar cave in (valgus) na hone dein; knees toes ki direction me point karein."
  },
  s2: {
    category: "hinge",
    svgType: "rdl",
    primary: "Hamstrings & Glute-Ham Tie-In",
    secondary: "Lower Back, Grip",
    tempo: "3s Deep Stretch → 1s Hip Snap Up",
    setup: "Barbell ko thighs par pakdein, knees me soft slight bend.",
    execution: "Hips ko peeche wall ki taraf push karein jab tak deep hamstring stretch na feel ho. Back flat rahe.",
    mistakes: "Barbell ko pairon se dur na jane dein; bar ko thighs aur shins se close rakhein."
  },
  s3: {
    category: "unilateral",
    svgType: "split_squat",
    primary: "Single-Leg Balance, Quad & Glute Power",
    secondary: "Adductors, Ankle Mobility",
    tempo: "2s Descent → 1s Drive Up",
    setup: "Peeche wala foot bench par elevate karein. Front foot 2-3 feet aage.",
    execution: "Back knee floor ke paas aane tak neeche descend karein, front heel se push karein.",
    mistakes: "Front knee ko bohot aage toes ke bahar collapse na hone dein."
  },
  s4: {
    category: "press",
    svgType: "leg_press",
    primary: "Quad Hypertrophy & Sled Volume",
    secondary: "Glutes",
    tempo: "2s Deep Knee Bend → 1s Power Press",
    setup: "Back pad par lower back securely flat rakhein.",
    execution: "Weight ko 90 degree knee bend tak aane dein, fir foot platform ko press karein (knees lock na karein).",
    mistakes: "Top par knees ko snap/lockout bilkul na karein joint safety ke liye."
  },
  s5: {
    category: "calf",
    svgType: "calf_raise",
    primary: "Gastrocnemius & Soleus (Calf Spring Power)",
    secondary: "Achilles Tendon Elasticity",
    tempo: "2s Deep Stretch at Bottom → 1s Peak Squeeze on Toes",
    setup: "Balls of feet platform par rakhein, heels hanging off.",
    execution: "Heels ko deep stretch me neeche drop karein, fir big toe se push karke peak contraction layein.",
    mistakes: "Fast bouncing na karein; stretch aur squeeze par hold zaroori hai."
  },

  // Sunday: Recovery
  su1: {
    category: "recovery",
    svgType: "foam_roll",
    primary: "Myofascial Tissue Release",
    secondary: "Lactic Acid Drainage",
    tempo: "Slow 60s per muscle group",
    setup: "Foam roller floor par rakhein.",
    execution: "Quads, IT bands, lats aur upper back par slow roll karein. Tight spot par 20s pause karein.",
    mistakes: "Lower back spine par direct aggressive roll na karein."
  },
  su2: {
    category: "mobility",
    svgType: "mobility_flow",
    primary: "Hip Joint Mobility & Hamstrings",
    secondary: "Thoracic Spine Freedom",
    tempo: "Deep breathing hold (5-10 breaths)",
    setup: "Lunge stance me haath floor par instep ke paas rakhein.",
    execution: "Elbow floor ki taraf dip karein, fir chest aur arm ko sky ki taraf rotate karein.",
    mistakes: "Breathing hold na karein; stretch me deep oxygen exhale karein."
  },
  su3: {
    category: "mobility",
    svgType: "mobility_flow",
    primary: "Shoulder Capsule & Thoracic Extension",
    secondary: "Rotator Cuff Longevity",
    tempo: "Smooth wide circles with band/stick",
    setup: "PVC pipe ya resistance band wide pakdein.",
    execution: "Arms straight rakhte hue front se peeche circular arc me rotate karein.",
    mistakes: "Elbows bend na karein; grip ko wide karke range of motion smoothly build karein."
  },
  su4: {
    category: "recovery",
    svgType: "sprint",
    primary: "Parasympathetic Recovery & Aerobic Base",
    secondary: "Joint Lubrication",
    tempo: "45 Mins Relaxed Pace",
    setup: "Fresh outdoor open air.",
    execution: "Nasal breathing (sirf naak se saans lein), relaxed continuous walk.",
    mistakes: "Intense exercise na karein; ye CNS aur muscle repair ke liye hai."
  }
};

// Generate Crisp 5-Second Looping Biomechanics SVG Animation
function generateExerciseSvgAnimation(svgType) {
  switch (svgType) {
    case 'incline_press':
    case 'bench_press':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pecGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#10b981" />
              <stop offset="100%" stop-color="#059669" />
            </linearGradient>
          </defs>
          <!-- Bench -->
          <rect x="70" y="140" width="160" height="14" rx="4" fill="#1e293b" />
          <rect x="135" y="154" width="30" height="35" fill="#0f172a" />
          
          <!-- Lifter Torso & Head -->
          <circle cx="105" cy="120" r="14" fill="#38bdf8" />
          <path d="M115,125 Q150,135 180,135" stroke="#475569" stroke-width="20" stroke-linecap="round" fill="none" />
          
          <!-- Active Pectoral Highlight -->
          <ellipse cx="140" cy="128" rx="16" ry="10" fill="url(#pecGlow)" class="anim-muscle-pec" />
          
          <!-- Moving Arms & Barbell / Dumbbells -->
          <g class="anim-press-motion">
            <!-- Trajectory Arrow -->
            <path d="M140,115 L140,55" stroke="rgba(16, 185, 129, 0.4)" stroke-width="2" stroke-dasharray="4,4" />
            <polygon points="140,50 136,58 144,58" fill="#10b981" />
            
            <!-- Forearm & Barbell -->
            <line x1="140" y1="120" x2="140" y2="70" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round" />
            <!-- Barbell Weight -->
            <rect x="80" y="65" width="120" height="8" rx="3" fill="#475569" />
            <rect x="70" y="52" width="10" height="34" rx="3" fill="#10b981" />
            <rect x="200" y="52" width="10" height="34" rx="3" fill="#10b981" />
          </g>
          <text x="150" y="190" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">PUSH & SQUEEZE (7-12-15)</text>
        </svg>
      `;

    case 'squat':
    case 'leg_press':
    case 'split_squat':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Floor -->
          <line x1="40" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="4" />
          
          <!-- Squatting Lifter Group -->
          <g class="anim-squat-motion">
            <!-- Head -->
            <circle cx="150" cy="55" r="14" fill="#38bdf8" />
            <!-- Barbell on Traps -->
            <line x1="90" y1="65" x2="210" y2="65" stroke="#94a3b8" stroke-width="8" />
            <rect x="80" y="48" width="12" height="42" rx="3" fill="#ef4444" />
            <rect x="208" y="48" width="12" height="42" rx="3" fill="#ef4444" />
            <!-- Torso -->
            <line x1="150" y1="65" x2="145" y2="115" stroke="#475569" stroke-width="18" stroke-linecap="round" />
            <!-- Active Quads & Glutes -->
            <ellipse cx="138" cy="130" rx="14" ry="8" fill="#10b981" class="anim-muscle-leg" />
            <!-- Thigh -->
            <line x1="145" y1="115" x2="175" y2="145" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" />
            <!-- Shin to Feet -->
            <line x1="175" y1="145" x2="165" y2="178" stroke="#64748b" stroke-width="12" stroke-linecap="round" />
          </g>
          <!-- Depth Indicator line -->
          <line x1="110" y1="140" x2="190" y2="140" stroke="rgba(16, 185, 129, 0.4)" stroke-width="1.5" stroke-dasharray="3,3" />
          <text x="150" y="196" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">PARALLEL DEPTH → EXPLOSIVE DRIVE</text>
        </svg>
      `;

    case 'deadlift':
    case 'rdl':
    case 'barbell_row':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="40" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="4" />
          <g class="anim-deadlift-motion">
            <!-- Head -->
            <circle cx="160" cy="50" r="14" fill="#38bdf8" />
            <!-- Torso Hip Hinge -->
            <line x1="160" y1="62" x2="135" y2="115" stroke="#475569" stroke-width="18" stroke-linecap="round" />
            <!-- Posterior Chain Muscle Highlight -->
            <path d="M125,105 Q145,95 155,75" stroke="#10b981" stroke-width="8" stroke-linecap="round" fill="none" class="anim-muscle-back" />
            <!-- Thigh & Shin -->
            <line x1="135" y1="115" x2="150" y2="178" stroke="#64748b" stroke-width="12" stroke-linecap="round" />
            <!-- Arms holding Barbell -->
            <line x1="155" y1="70" x2="170" y2="130" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round" />
            <!-- Barbell Plates -->
            <circle cx="170" cy="135" r="24" fill="#0f172a" stroke="#10b981" stroke-width="5" />
            <circle cx="170" cy="135" r="6" fill="#38bdf8" />
          </g>
          <text x="150" y="196" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">FLAT BACK → HIP HINGE POWER</text>
        </svg>
      `;

    case 'lat_pulldown':
    case 'dips':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Top Pulley Bar Frame -->
          <rect x="80" y="20" width="140" height="8" rx="3" fill="#334155" />
          <circle cx="150" cy="24" r="6" fill="#64748b" />
          <!-- Seated Lifter -->
          <circle cx="150" cy="90" r="13" fill="#38bdf8" />
          <line x1="150" y1="102" x2="150" y2="155" stroke="#475569" stroke-width="20" stroke-linecap="round" />
          <!-- Active V-Taper Lats -->
          <path d="M136,115 Q144,135 140,150" stroke="#10b981" stroke-width="8" stroke-linecap="round" fill="none" class="anim-muscle-lat" />
          <path d="M164,115 Q156,135 160,150" stroke="#10b981" stroke-width="8" stroke-linecap="round" fill="none" class="anim-muscle-lat" />
          <!-- Moving Pulldown Bar -->
          <g class="anim-pulldown-motion">
            <line x1="150" y1="24" x2="150" y2="55" stroke="#cbd5e1" stroke-width="2" />
            <path d="M90,55 Q150,50 210,55" stroke="#94a3b8" stroke-width="8" stroke-linecap="round" fill="none" />
            <!-- Arms -->
            <line x1="140" y1="105" x2="105" y2="55" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round" />
            <line x1="160" y1="105" x2="195" y2="55" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round" />
          </g>
          <text x="150" y="190" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">DRIVE ELBOWS TO POCKETS (V-TAPER)</text>
        </svg>
      `;

    case 'bicep_curl':
    case 'hammer_curl':
    case 'wrist_curl':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Standing Lifter Upper Body -->
          <circle cx="130" cy="50" r="15" fill="#38bdf8" />
          <line x1="130" y1="65" x2="130" y2="150" stroke="#475569" stroke-width="22" stroke-linecap="round" />
          <!-- Upper Arm (Stationary Pin) -->
          <line x1="140" y1="75" x2="140" y2="115" stroke="#64748b" stroke-width="12" stroke-linecap="round" />
          <!-- Active Bicep Bulge -->
          <ellipse cx="144" cy="95" rx="10" ry="14" fill="#10b981" class="anim-muscle-bicep" />
          <!-- Moving Forearm & Dumbbell -->
          <g class="anim-curl-motion">
            <line x1="140" y1="115" x2="185" y2="85" stroke="#cbd5e1" stroke-width="9" stroke-linecap="round" />
            <circle cx="188" cy="83" r="14" fill="#0f172a" stroke="#10b981" stroke-width="4" />
          </g>
          <text x="150" y="185" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">ISOLATE BICEPS → ZERO ELBOW SWING</text>
        </svg>
      `;

    case 'overhead_press':
    case 'lateral_raise':
    case 'arnold_press':
    case 'shrugs':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="55" r="14" fill="#38bdf8" />
          <line x1="150" y1="70" x2="150" y2="155" stroke="#475569" stroke-width="20" stroke-linecap="round" />
          <!-- Deltoid Highlights -->
          <circle cx="132" cy="78" r="10" fill="#10b981" class="anim-muscle-delts" />
          <circle cx="168" cy="78" r="10" fill="#10b981" class="anim-muscle-delts" />
          <!-- Overhead Bar Movement -->
          <g class="anim-ohp-motion">
            <line x1="85" y1="40" x2="215" y2="40" stroke="#94a3b8" stroke-width="7" stroke-linecap="round" />
            <rect x="75" y="26" width="10" height="28" rx="2" fill="#f59e0b" />
            <rect x="215" y="26" width="10" height="28" rx="2" fill="#f59e0b" />
            <!-- Arms extending straight overhead -->
            <line x1="135" y1="75" x2="120" y2="40" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round" />
            <line x1="165" y1="75" x2="180" y2="40" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round" />
          </g>
          <text x="150" y="190" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">LOCKOUT OVERHEAD → CORE BRACED</text>
        </svg>
      `;

    case 'kettlebell_swing':
    case 'box_jump':
    case 'battle_ropes':
    case 'sprint':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <!-- Athletic Explosive Biomechanics -->
          <line x1="30" y1="180" x2="270" y2="180" stroke="#334155" stroke-width="4" />
          <g class="anim-functional-motion">
            <circle cx="130" cy="60" r="14" fill="#38bdf8" />
            <!-- Kinetic Chain lines -->
            <line x1="130" y1="74" x2="145" y2="120" stroke="#475569" stroke-width="18" stroke-linecap="round" />
            <line x1="145" y1="120" x2="160" y2="178" stroke="#64748b" stroke-width="12" stroke-linecap="round" />
            <!-- Glowing Hip Core Engine -->
            <circle cx="145" cy="120" r="12" fill="#8b5cf6" class="anim-muscle-core" />
            <!-- Kettlebell Arc -->
            <circle cx="210" cy="85" r="16" fill="#0f172a" stroke="#8b5cf6" stroke-width="5" />
            <path d="M198,80 Q210,65 222,80" stroke="#8b5cf6" stroke-width="4" fill="none" />
            <line x1="140" y1="85" x2="200" y2="85" stroke="#cbd5e1" stroke-width="6" stroke-linecap="round" />
          </g>
          <text x="150" y="196" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="700">KOHLI ATHLETIC EXPLOSION & STAMINA</text>
        </svg>
      `;

    case 'cable_fly':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="55" r="14" fill="#111111" />
          <line x1="150" y1="69" x2="150" y2="135" stroke="#333333" stroke-width="14" stroke-linecap="round" />
          <line x1="150" y1="80" x2="150" y2="110" stroke="#000000" stroke-width="4" stroke-linecap="round" class="anim-muscle-pec" />
          <ellipse cx="143" cy="95" rx="8" ry="12" fill="#555555" class="anim-muscle-pec" />
          <ellipse cx="157" cy="95" rx="8" ry="12" fill="#555555" class="anim-muscle-pec" />
          <g class="anim-press-motion">
            <path d="M70,70 Q110,80 142,95" stroke="#111111" stroke-width="6" fill="none" stroke-linecap="round" />
            <circle cx="142" cy="95" r="5" fill="#111111" />
            <path d="M230,70 Q190,80 158,95" stroke="#111111" stroke-width="6" fill="none" stroke-linecap="round" />
            <circle cx="158" cy="95" r="5" fill="#111111" />
          </g>
          <text x="150" y="180" text-anchor="middle" fill="#555555" font-size="10" font-weight="700">INNER CHEST SQUEEZE & DEEP SEPARATION</text>
        </svg>
      `;

    case 'leg_raise':
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <line x1="80" y1="25" x2="220" y2="25" stroke="#111111" stroke-width="6" stroke-linecap="round" />
          <circle cx="150" cy="50" r="12" fill="#111111" />
          <line x1="150" y1="62" x2="150" y2="115" stroke="#333333" stroke-width="12" stroke-linecap="round" />
          <line x1="145" y1="30" x2="148" y2="60" stroke="#555555" stroke-width="5" stroke-linecap="round" />
          <line x1="155" y1="30" x2="152" y2="60" stroke="#555555" stroke-width="5" stroke-linecap="round" />
          <ellipse cx="150" cy="100" rx="7" ry="10" fill="#111111" class="anim-muscle-core" />
          <g class="anim-pull-motion">
            <path d="M150,115 Q150,145 185,145" stroke="#111111" stroke-width="9" fill="none" stroke-linecap="round" />
            <circle cx="185" cy="145" r="5" fill="#000000" />
          </g>
          <text x="150" y="185" text-anchor="middle" fill="#555555" font-size="10" font-weight="700">LOWER 6-PACK ABS PELVIC CURL</text>
        </svg>
      `;

    default: // Core / Generic
      return `
        <svg viewBox="0 0 300 200" class="bio-svg" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="70" r="18" fill="#38bdf8" />
          <line x1="150" y1="88" x2="150" y2="150" stroke="#475569" stroke-width="22" stroke-linecap="round" />
          <ellipse cx="150" cy="115" rx="12" ry="18" fill="#10b981" class="anim-muscle-pec" />
          <text x="150" y="185" text-anchor="middle" fill="#475569" font-size="11" font-weight="700">ATHLETIC FORM & FULL RANGE OF MOTION</text>
        </svg>
      `;
  }
}

// Modal Controller for Visual Form & Videos
let activeDemoExId = null;

async function openExerciseDemoModal(exId) {
  activeDemoExId = exId;
  const ex = findExercise(exId);
  const guide = EXERCISE_GUIDES[exId] || {
    primary: ex ? ex.target : "Athletic Muscle",
    secondary: "Stabilizers",
    tempo: "2s Control → 1s Explode",
    setup: "Proper stance aur grip ensure karein.",
    execution: ex ? ex.notes : "Full range of motion ke sath perform karein.",
    mistakes: "Momentum ka use na karein."
  };

  const modal = document.getElementById('exerciseDemoModal');
  if (!modal) return;

  // Title and labels
  const titleEl = document.getElementById('demoExTitle');
  const primEl = document.getElementById('demoExPrimary');
  const secEl = document.getElementById('demoExSecondary');
  const tempoEl = document.getElementById('demoExTempo');
  const setupEl = document.getElementById('demoExSetup');
  const execEl = document.getElementById('demoExExecution');
  const mistEl = document.getElementById('demoExMistakes');

  if (titleEl) titleEl.innerText = ex ? ex.name : 'Exercise Demo';
  if (primEl) primEl.innerText = guide.primary || (ex ? ex.target : '');
  if (secEl) secEl.innerText = guide.secondary || 'Core & Stabilizers';
  if (tempoEl) tempoEl.innerText = guide.tempo || '2s Down → 1s Up';
  if (setupEl) setupEl.innerText = guide.setup || 'Standard athletic setup.';
  if (execEl) execEl.innerText = guide.execution || (ex ? ex.notes : '');
  if (mistEl) mistEl.innerText = guide.mistakes || 'Momentum aur swinging se bachein.';

  // Render Visual Media (Custom Video OR Biomechanics SVG Animation)
  const mediaContainer = document.getElementById('demoMediaContainer');
  mediaContainer.innerHTML = `<div class="loading-spinner">Loading visual demo...</div>`;

  // Check if user uploaded a custom video/GIF in IndexedDB
  const customBlob = await getCustomMedia(exId);
  if (customBlob) {
    const videoUrl = URL.createObjectURL(customBlob);
    const isVideo = customBlob.type && customBlob.type.startsWith('video');
    
    if (isVideo) {
      mediaContainer.innerHTML = `
        <div class="custom-video-wrapper">
          <video src="${videoUrl}" autoplay loop muted playsinline class="demo-video-player" id="activeDemoVideo"></video>
          <div class="media-badge">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><rect x="2" y="4" width="14" height="16" rx="2"/><polygon points="22 7 16 11 16 13 22 17 22 7"/></svg>Video Guide
          </div>
        </div>
      `;
    } else {
      // GIF or image
      mediaContainer.innerHTML = `
        <div class="custom-video-wrapper">
          <img src="${videoUrl}" class="demo-video-player" alt="Exercise Demo">
          <div class="media-badge">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>Motion Guide
          </div>
        </div>
      `;
    }
    document.getElementById('btnRemoveCustomMedia').style.display = 'inline-flex';
  } else {
    // Show high-precision animated SVG demo
    const svgType = guide.svgType || 'bench_press';
    mediaContainer.innerHTML = `
      <div class="svg-demo-wrapper">
        ${generateExerciseSvgAnimation(svgType)}
        <div class="media-badge">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 4px;"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>Form Dynamics
        </div>
      </div>
    `;
    document.getElementById('btnRemoveCustomMedia').style.display = 'none';
  }

  modal.classList.add('open');
}

// Custom Video / GIF Upload handler
async function handleMediaUpload(event) {
  const file = event.target.files[0];
  if (!file || !activeDemoExId) return;

  if (file.size > 50 * 1024 * 1024) {
    alert("Kripya 50MB se kam size ki 5-10 second video ya GIF chunein.");
    return;
  }

  try {
    await saveCustomMedia(activeDemoExId, file);
    alert("Video successfully save ho gayi. Offline mode me bhi hamesha uplabdh rahegi.");
    // Refresh modal
    openExerciseDemoModal(activeDemoExId);
  } catch (e) {
    alert("Error saving media: " + e.message);
  }
}

async function removeActiveCustomMedia() {
  if (!activeDemoExId) return;
  if (!confirm("Kya aap custom video delete karke original animated guide par wapas aana chahte hain?")) return;

  await deleteCustomMedia(activeDemoExId);
  openExerciseDemoModal(activeDemoExId);
}
