// ============================================================
// ROOM FITNESS & CALISTHENICS MODULE (100% FREE • NO EQUIPMENT)
// Tier 1: Daily Essential Routine (Everyday Foundation)
// Tier 2: Weekly Muscle-Split & Recovery Schedule + Rest Days
// Built-in MuscleWiki-Grade Animated Demos & Offline Tracking
// Powered by CodeByTushu • Version 0.05 • 100% Offline Ready
// ============================================================

(function (global) {
  'use strict';

  var STORAGE_KEY = 'tushu_room_fitness_v1';

  var DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var DAY_NAMES = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  // ============================================================
  // TIER 1: DAILY ESSENTIAL ROUTINE (SAFE FOR EVERY SINGLE DAY)
  // Moderate volume, high frequency — zero rest day required
  // ============================================================
  var DAILY_ESSENTIALS = [
    {
      id: 'rf_daily_pushups',
      name: 'Daily Push-ups Mastery',
      categoryTag: 'DAILY FOUNDATION',
      focus: 'Chest, Triceps & Core Base',
      targetReps: { beginner: 10, intermediate: 15, advanced: 25 },
      targetSets: 3,
      cue: 'Start with 10 crisp reps daily. Elbows at 45°, chest lightly touches floor, core braced straight.',
      setupTip: 'Beginners can elevate hands on a sturdy bed or chair edge and build up to floor reps.',
      demoCategory: 'pushup',
      anatomy: { primary: 'chest', secondary: 'tricep delt ab' },
      forceType: 'Push',
      gripType: 'Shoulder-Width Floor Palm Grip',
      tempo: '2s Down Control -> 1s Explosive Push',
      mistakes: 'Avoid letting lower back sag or flaring elbows out to 90 degrees.',
      proTip: 'Performing 10 quality push-ups every single day builds unmatched neural strength without overtraining.'
    },
    {
      id: 'rf_daily_baithak',
      name: 'Daily Desi Baithak (Hindu Squats)',
      categoryTag: 'DAILY MOBILITY',
      focus: 'Quads, Knees, Glutes & Stamina',
      targetReps: { beginner: 15, intermediate: 20, advanced: 35 },
      targetSets: 3,
      cue: 'Fluid rhythmic deep squats. Swing arms smoothly as you drop low and drive tall.',
      setupTip: 'Keep chest proud and heels either flat (Air Squat) or lifted smoothly (Traditional Baithak).',
      demoCategory: 'bodyweight_squat',
      anatomy: { primary: 'quad', secondary: 'glute calf' },
      forceType: 'Push / Squat',
      gripType: 'Bodyweight • Hands Counterbalance',
      tempo: '1.5s Smooth Descent -> 1s Rhythmic Rise',
      mistakes: 'Avoid collapsing knees inward or rounding your spine at the bottom.',
      proTip: 'Daily bodyweight squats lubricate knee and hip joints and keep lower-body circulation peak.'
    },
    {
      id: 'rf_daily_plank',
      name: 'Daily Core Plank (Stambh Hold)',
      categoryTag: 'DAILY CORE SHIELD',
      focus: 'Deep Abs, Posture & Spine Armor',
      targetReps: { beginner: 30, intermediate: 45, advanced: 60 },
      unit: 'sec',
      targetSets: 2,
      cue: 'Forearms directly beneath shoulders, squeeze glutes and brace abs like preparing for a punch.',
      setupTip: 'Look slightly ahead of your hands to maintain a neutral cervical neck line.',
      demoCategory: 'plank',
      anatomy: { primary: 'ab', secondary: 'delt back glute' },
      forceType: 'Isometric Hold',
      gripType: 'Forearm Floor Support',
      tempo: 'Continuous Isometric Tension • Steady Nasal Breath',
      mistakes: 'Never let hips drop toward the floor or hike buttocks too high.',
      proTip: 'Pull your elbows slightly toward your toes isometrically to double ab activation.'
    }
  ];

  // ============================================================
  // TIER 2: WEEKLY MUSCLE-SPLIT & RECOVERY SCHEDULE (MON – SUN)
  // High-intensity targeted training with 48h muscle recovery
  // ============================================================
  var WEEKLY_RECOVERY_PROGRAM = {
    monday: {
      title: 'Chest & Tricep Hypertrophy',
      focus: 'Upper Push Power • Dand & Dips',
      subtitle: 'Targeted chest density and tricep overload beyond daily push-ups',
      icon: '💪',
      isRestDay: false,
      recoveryBadge: '⏳ 48h Chest & Tricep Recovery After Session',
      recoveryNote: 'High-tension push variations break down pectoral & tricep fibers; Tuesday & Wednesday let them rebuild stronger.',
      exercises: [
        {
          id: 'rf_mon_1',
          name: 'Desi Dand (Hindu Push-ups)',
          focus: 'Full Chest, Shoulders & Spine Flow',
          targetReps: { beginner: 8, intermediate: 12, advanced: 20 },
          targetSets: 3,
          cue: 'Start in inverted V (Parvatasana), swoop chest low near floor into Cobra stretch, push back.',
          setupTip: 'Traditional Akhada master move — take feet shoulder-width apart for smoother balance.',
          demoCategory: 'pushup',
          anatomy: { primary: 'chest delt', secondary: 'tricep back' },
          forceType: 'Dynamic Push',
          gripType: 'Wide-Neutral Palm Grip',
          tempo: '2s Swoop Dive -> 1s Cobra Press -> 1.5s Return',
          mistakes: 'Do not rush the swoop or let hips crash onto the floor.'
        },
        {
          id: 'rf_mon_2',
          name: 'Diamond / Close-Grip Push-ups',
          focus: 'Tricep Horseshoe & Inner Chest',
          targetReps: { beginner: 6, intermediate: 10, advanced: 18 },
          targetSets: 3,
          cue: 'Form a triangle with thumbs and index fingers under your sternum. Keep elbows tucked tight.',
          setupTip: 'Drop to knees if triceps reach failure while keeping torso straight.',
          demoCategory: 'pushup',
          anatomy: { primary: 'tricep', secondary: 'chest delt' },
          forceType: 'Push',
          gripType: 'Diamond Close Grip',
          tempo: '2s Controlled Down -> 1s Lockout',
          mistakes: 'Avoid flaring elbows sideways which stresses wrist joints.'
        },
        {
          id: 'rf_mon_3',
          name: 'Bed / Chair Frame Dips',
          focus: 'Lower Chest & Tricep Overload',
          targetReps: { beginner: 10, intermediate: 15, advanced: 22 },
          targetSets: 3,
          cue: 'Grip edge of sturdy chair or bed. Lower hips close to edge until elbows hit 90°, press up.',
          setupTip: 'Bend knees for easier leverage; extend legs straight out for maximum resistance.',
          demoCategory: 'dips',
          anatomy: { primary: 'tricep', secondary: 'chest delt' },
          forceType: 'Vertical Push',
          gripType: 'Edge Palm Support',
          tempo: '2s Slow Descent -> 1s Strong Lockout',
          mistakes: 'Avoid letting hips drift far away from the chair edge or shrugging shoulders.'
        },
        {
          id: 'rf_mon_4',
          name: 'Push-up Bottom Isometric Hold',
          focus: 'Time Under Tension & Pectoral Density',
          targetReps: { beginner: 15, intermediate: 25, advanced: 40 },
          unit: 'sec',
          targetSets: 3,
          cue: 'Hover 2 inches above floor with maximum chest tension. Breathe steadily without collapsing.',
          setupTip: 'Instant deep fiber recruitment without needing heavy dumbbells.',
          demoCategory: 'pushup',
          anatomy: { primary: 'chest', secondary: 'tricep ab' },
          forceType: 'Isometric Push',
          gripType: 'Standard Floor Grip',
          tempo: 'Continuous Static Hold',
          mistakes: 'Do not hold your breath or rest your stomach on the floor.'
        }
      ]
    },

    tuesday: {
      title: 'Upper Pull & Back Thickness',
      focus: 'Lats, Rhomboids, Biceps & Posture',
      subtitle: 'Build a strong V-taper back in your room using doorframes & towels',
      icon: '🧗',
      isRestDay: false,
      recoveryBadge: '⏳ 48h Back & Bicep Recovery Window',
      recoveryNote: 'While Chest recovers from Monday, Tuesday overloads pulling muscles (Lats & Biceps) for balanced posture.',
      exercises: [
        {
          id: 'rf_tue_1',
          name: 'Doorframe Towel Rows',
          focus: 'Lat Width & Scapular Squeeze',
          targetReps: { beginner: 10, intermediate: 14, advanced: 22 },
          targetSets: 3,
          cue: 'Grip doorframe or loop a thick towel around both doorknobs. Lean back and pull chest forward.',
          setupTip: 'Step feet closer to the door base to increase bodyweight load.',
          demoCategory: 'doorframe_row',
          anatomy: { primary: 'lat', secondary: 'bicep forearm' },
          forceType: 'Horizontal Pull',
          gripType: 'Neutral Towel / Doorframe Grip',
          tempo: '1s Pull & Squeeze -> 2s Controlled Stretch',
          mistakes: 'Avoid pulling with only your biceps; drive elbows straight behind your ribs.'
        },
        {
          id: 'rf_tue_2',
          name: 'Pull-ups or Under-Table Rows',
          focus: 'Lats & Heavy Pulling Strength',
          targetReps: { beginner: 6, intermediate: 10, advanced: 15 },
          targetSets: 3,
          cue: 'Use a pull-up bar or lie beneath a sturdy table. Pull chest up cleanly and lower over 3 seconds.',
          setupTip: 'Always verify table stability before pulling; keep heels anchored.',
          demoCategory: 'pullup_row',
          anatomy: { primary: 'lat', secondary: 'bicep trap' },
          forceType: 'Pull',
          gripType: 'Overhand Pronated Grip',
          tempo: '1s Strong Pull -> 3s Slow Negative',
          mistakes: 'Avoid kipping or jerking your chin over the bar using momentum.'
        },
        {
          id: 'rf_tue_3',
          name: 'Prone Floor Cobra Squeeze',
          focus: 'Lower Back, Rear Delts & Spine Posture',
          targetReps: { beginner: 12, intermediate: 15, advanced: 25 },
          targetSets: 3,
          cue: 'Lie face down, lift chest off floor, squeeze shoulder blades together with thumbs rotated upward.',
          setupTip: 'Pause for 2 full seconds at peak contraction every single rep.',
          demoCategory: 'recovery',
          anatomy: { primary: 'back', secondary: 'trap delt glute' },
          forceType: 'Posterior Extension',
          gripType: 'Bodyweight Prone',
          tempo: '1s Lift -> 2s Peak Squeeze -> 1.5s Lower',
          mistakes: 'Do not crank your neck up; keep eyes looking gently toward the mat.'
        },
        {
          id: 'rf_tue_4',
          name: 'Isometric Towel Bicep Curl Hold',
          focus: 'Bicep Peak & Forearm Grip Strength',
          targetReps: { beginner: 20, intermediate: 30, advanced: 45 },
          unit: 'sec',
          targetSets: 3,
          cue: 'Loop bath towel under one foot, hold ends with elbows pinned at 90°, pull upward at max effort.',
          setupTip: 'Matches heavy curl tension safely with zero dumbbells.',
          demoCategory: 'curl',
          anatomy: { primary: 'bicep', secondary: 'forearm' },
          forceType: 'Isometric Pull',
          gripType: 'Supinated Towel Grip',
          tempo: 'Maximal Static Contraction',
          mistakes: 'Keep elbows pinned tight to your sides — do not shrug shoulders.'
        }
      ]
    },

    wednesday: {
      title: 'Explosive Legs & Knee Armor',
      focus: 'Quads, Glutes, Hamstrings & Calves',
      subtitle: 'Deep lower-body strength & endurance needing full 48h recovery',
      icon: '🦵',
      isRestDay: false,
      recoveryBadge: '⏳ 48h Lower-Body Muscle Recovery Window',
      recoveryNote: 'Intense unilateral leg work & isometric holds require 48 hours of recovery while upper body rests.',
      exercises: [
        {
          id: 'rf_wed_1',
          name: 'Alternating Reverse Lunges',
          focus: 'Quads, Glutes & Hip Balance',
          targetReps: { beginner: 10, intermediate: 14, advanced: 20 },
          targetSets: 3,
          cue: 'Step smoothly backward, lower back knee just above floor, drive up through front heel.',
          setupTip: 'Count reps per leg. Keep torso upright throughout.',
          demoCategory: 'bodyweight_squat',
          anatomy: { primary: 'quad glute', secondary: 'hamstring calf' },
          forceType: 'Unilateral Leg Push',
          gripType: 'Hands on Hips / Guard',
          tempo: '2s Controlled Drop -> 1s Explosive Drive',
          mistakes: 'Do not slam your back knee hard onto the floor.'
        },
        {
          id: 'rf_wed_2',
          name: 'Single-Leg / Floor Glute Bridges',
          focus: 'Glutes & Hamstring Posterior Power',
          targetReps: { beginner: 12, intermediate: 16, advanced: 24 },
          targetSets: 3,
          cue: 'Lie on back, drive hips skyward through heels until knees-hips-shoulders form a straight bridge.',
          setupTip: 'Lift one leg straight out for advanced single-leg overload.',
          demoCategory: 'plank',
          anatomy: { primary: 'glute', secondary: 'hamstring back' },
          forceType: 'Hip Extension',
          gripType: 'Supine Floor Support',
          tempo: '1s Thrust -> 2s Top Squeeze -> 2s Lower',
          mistakes: 'Avoid hyperextending your lower back at the top; squeeze glutes instead.'
        },
        {
          id: 'rf_wed_3',
          name: 'Wall Sit (Ashwa Baithak Hold)',
          focus: 'Quad Endurance & Bulletproof Knees',
          targetReps: { beginner: 30, intermediate: 45, advanced: 75 },
          unit: 'sec',
          targetSets: 3,
          cue: 'Press back flat against wall, slide down until thighs are parallel (90°) to floor and hold.',
          setupTip: 'Keep hands off your thighs — place them crossed over your chest.',
          demoCategory: 'bodyweight_squat',
          anatomy: { primary: 'quad', secondary: 'glute calf' },
          forceType: 'Isometric Leg Hold',
          gripType: 'Wall Back Support',
          tempo: 'Continuous Isometric Hold',
          mistakes: 'Do not lean on your knees with your hands.'
        },
        {
          id: 'rf_wed_4',
          name: 'Single-Leg Elevated Calf Raises',
          focus: 'Calf Definition & Ankle Stability',
          targetReps: { beginner: 15, intermediate: 20, advanced: 30 },
          targetSets: 3,
          cue: 'Balance lightly against wall, press onto the ball of one foot as high as possible, pause 1s.',
          setupTip: 'Stand on a thick book or doorstep edge for full deep calf stretch.',
          demoCategory: 'calf',
          anatomy: { primary: 'calf', secondary: 'quad' },
          forceType: 'Plantar Flexion',
          gripType: 'Fingertip Wall Balance',
          tempo: '1s High Peak -> 1s Pause -> 2s Deep Stretch',
          mistakes: 'Avoid bouncing quickly at the bottom without full contraction.'
        }
      ]
    },

    thursday: {
      title: 'Core Fortress & Rotational Obliques',
      focus: 'Abs, Obliques & Anti-Rotation Stability',
      subtitle: 'Carve deep abdominal definition while legs and upper body recover',
      icon: '🛡️',
      isRestDay: false,
      recoveryBadge: '⏳ 24–48h Core Recovery • Upper/Lower Rest',
      recoveryNote: 'Active core day lets Chest, Back, and Legs recover fully before Friday explosive training.',
      exercises: [
        {
          id: 'rf_thu_1',
          name: 'Slow-Tempo Bicycle Crunches',
          focus: 'Obliques & Rotational Core',
          targetReps: { beginner: 14, intermediate: 20, advanced: 32 },
          targetSets: 3,
          cue: 'Rotate ribcage (not neck) to bring opposite shoulder toward bent knee while extending other leg.',
          setupTip: 'Slower controlled rotations build far deeper abs than frantic speed.',
          demoCategory: 'leg_raise',
          anatomy: { primary: 'ab', secondary: 'quad' },
          forceType: 'Rotational Flexion',
          gripType: 'Fingertips Behind Ears',
          tempo: '2s Controlled Twist Each Side',
          mistakes: 'Never yank your neck forward with interlaced fingers.'
        },
        {
          id: 'rf_thu_2',
          name: 'Athletic Mountain Climbers',
          focus: 'Lower Abs & Metabolic Burn',
          targetReps: { beginner: 20, intermediate: 30, advanced: 45 },
          targetSets: 3,
          cue: 'High push-up plank stance, drive knees crisply toward chest while keeping hips level.',
          setupTip: 'Keep shoulders locked directly over wrists.',
          demoCategory: 'pushup',
          anatomy: { primary: 'ab', secondary: 'delt quad' },
          forceType: 'Dynamic Core',
          gripType: 'High Plank Floor Grip',
          tempo: 'Brisk Athletic Rhythm',
          mistakes: 'Do not let hips bounce high up into the air.'
        },
        {
          id: 'rf_thu_3',
          name: 'Lying Strict Leg Raises',
          focus: 'Lower Rectus Abdominis',
          targetReps: { beginner: 10, intermediate: 14, advanced: 20 },
          targetSets: 3,
          cue: 'Press lower back flat into floor, raise straight legs to 90°, lower slowly stopping 2 inches up.',
          setupTip: 'Slide hands gently under glutes for extra lumbar support if needed.',
          demoCategory: 'leg_raise',
          anatomy: { primary: 'ab', secondary: 'quad' },
          forceType: 'Lower Ab Flexion',
          gripType: 'Supine Floor Support',
          tempo: '1s Raise -> 3s Slow Controlled Lower',
          mistakes: 'Never allow your lower back to arch off the floor on descent.'
        },
        {
          id: 'rf_thu_4',
          name: 'Gymnast Hollow Body Hold',
          focus: 'Total Core & Calisthenics Tension',
          targetReps: { beginner: 20, intermediate: 35, advanced: 50 },
          unit: 'sec',
          targetSets: 3,
          cue: 'Lie on back, lift shoulder blades and legs 6 inches off floor, glue lower back tight to mat.',
          setupTip: 'Tuck one knee in to scale down cleanly while keeping lower back glued.',
          demoCategory: 'plank',
          anatomy: { primary: 'ab', secondary: 'quad delt' },
          forceType: 'Isometric Core',
          gripType: 'Arms Extended Overhead',
          tempo: 'Static Gymnast Tension',
          mistakes: 'Stop and reset if lower back lifts off the floor.'
        }
      ]
    },

    friday: {
      title: 'Explosive Calisthenics & Desi Sapate',
      focus: 'Shoulders, Conditioning & Athletic Power',
      subtitle: 'High-output Akhada + street workout conditioning for peak stamina',
      icon: '🔥',
      isRestDay: false,
      recoveryBadge: '⏳ 48h CNS & Full-Body Conditioning Recovery',
      recoveryNote: 'Explosive full-body work spikes fat burn and endurance; pace your breathing cleanly between sets.',
      exercises: [
        {
          id: 'rf_fri_1',
          name: 'Desi Sapate (Indian Burpees)',
          focus: 'Full-Body Explosive Stamina & Fat Burn',
          targetReps: { beginner: 8, intermediate: 12, advanced: 20 },
          targetSets: 3,
          cue: 'Drop into fluid Baithak, kick legs back into Hindu Dand swoop, spring back to feet and stand tall.',
          setupTip: 'Step feet back one-by-one for a quiet low-impact room version.',
          demoCategory: 'pushup',
          anatomy: { primary: 'chest quad', secondary: 'delt ab glute' },
          forceType: 'Full-Body Conditioning',
          gripType: 'Floor Palm Support',
          tempo: 'Fluid Continuous Athletic Flow',
          mistakes: 'Keep form crisp — do not collapse your lower back when kicking feet out.'
        },
        {
          id: 'rf_fri_2',
          name: 'Hanuman Dand (Spiderman Push-ups)',
          focus: 'Chest, Obliques & Hip Flexibility',
          targetReps: { beginner: 8, intermediate: 12, advanced: 18 },
          targetSets: 3,
          cue: 'As you lower into push-up, drive one knee out wide toward your same-side elbow, then push back.',
          setupTip: 'Alternate left and right legs smoothly for warrior athletic power.',
          demoCategory: 'pushup',
          anatomy: { primary: 'chest ab', secondary: 'tricep delt' },
          forceType: 'Rotational Push',
          gripType: 'Standard Floor Grip',
          tempo: '2s Controlled Lower + Knee Drive -> 1s Press',
          mistakes: 'Avoid twisting hips excessively or rushing reps.'
        },
        {
          id: 'rf_fri_3',
          name: 'Pike Shoulder Push-ups',
          focus: 'Boulder Shoulders (Delts) & Traps',
          targetReps: { beginner: 8, intermediate: 12, advanced: 18 },
          targetSets: 3,
          cue: 'Form an inverted V with hips high. Lower top of head forward past hands, press strictly back up.',
          setupTip: 'Builds overhead pressing power with zero dumbbells.',
          demoCategory: 'pushup',
          anatomy: { primary: 'delt', secondary: 'tricep trap' },
          forceType: 'Vertical Bodyweight Push',
          gripType: 'Shoulder-Width Inverted V',
          tempo: '2s Controlled Dive -> 1s Overhead Press',
          mistakes: 'Do not drop head straight between hands; aim slightly forward in a tripod.'
        },
        {
          id: 'rf_fri_4',
          name: 'Explosive Jump Baithak',
          focus: 'Fast-Twitch Legs & Vertical Power',
          targetReps: { beginner: 10, intermediate: 14, advanced: 20 },
          targetSets: 3,
          cue: 'Drop into athletic squat, explode softly upward, absorb landing quietly on balls of feet.',
          setupTip: 'Land silently like a ninja to protect joints and keep room quiet.',
          demoCategory: 'bodyweight_squat',
          anatomy: { primary: 'quad glute', secondary: 'calf' },
          forceType: 'Plyometric Leg Drive',
          gripType: 'Athletic Arm Swing',
          tempo: '1.5s Load -> Explosive Jump -> Soft Land',
          mistakes: 'Never land stiff-legged with locked knees.'
        }
      ]
    },

    saturday: {
      title: 'Weekly Benchmark & Strength Challenge',
      focus: '10 Push-ups • 10 Pull-ups • Full-Body Test',
      subtitle: 'Measure weekly strength gains before Sunday full recovery day',
      icon: '🏆',
      isRestDay: false,
      recoveryBadge: '🏆 Peak Benchmark • Followed by Sunday Full Rest',
      recoveryNote: 'Test your strength progress cleanly today; tomorrow (Sunday) is dedicated to full body recovery.',
      exercises: [
        {
          id: 'rf_sat_1',
          name: '10 Push-ups Perfect-Form Benchmark',
          focus: 'Strict Chest & Tricep Mastery Test',
          targetReps: { beginner: 10, intermediate: 20, advanced: 35 },
          targetSets: 3,
          cue: 'Zero-cheat strict tempo push-ups. Full chest touch at bottom, full lockout at top.',
          setupTip: 'Use + button every week as your max clean streak grows.',
          demoCategory: 'pushup',
          anatomy: { primary: 'chest', secondary: 'tricep delt' },
          forceType: 'Benchmark Push',
          gripType: 'Standard Floor Grip',
          tempo: '2s Down -> 0.5s Pause -> 1s Lockout',
          mistakes: 'No half-reps — prioritize crisp full range of motion.'
        },
        {
          id: 'rf_sat_2',
          name: '10 Pull-ups / Doorframe Row Benchmark',
          focus: 'Back & Arm Pulling Strength Test',
          targetReps: { beginner: 10, intermediate: 15, advanced: 22 },
          targetSets: 3,
          cue: 'Complete 10 strict Pull-ups or steep Doorframe Towel Rows with full chest squeeze.',
          setupTip: 'Track weekly progress by stepping feet further forward for steeper angle.',
          demoCategory: 'pullup_row',
          anatomy: { primary: 'lat', secondary: 'bicep forearm' },
          forceType: 'Benchmark Pull',
          gripType: 'Bar / Doorframe Grip',
          tempo: '1s Crisp Pull -> 2s Controlled Return',
          mistakes: 'Avoid partial reps or jerking with lower back.'
        },
        {
          id: 'rf_sat_3',
          name: 'Wide Sumo Deep Squats',
          focus: 'Inner Thighs, Glutes & Hip Strength',
          targetReps: { beginner: 15, intermediate: 22, advanced: 32 },
          targetSets: 3,
          cue: 'Wide stance with toes turned out 45°. Sit deep with upright spine and squeeze glutes up.',
          setupTip: 'Opens tight hips while sculpting strong athletic thighs.',
          demoCategory: 'bodyweight_squat',
          anatomy: { primary: 'quad glute', secondary: 'hamstring' },
          forceType: 'Wide Squat',
          gripType: 'Hands Clasped Front',
          tempo: '2s Deep Drop -> 1s Glute Drive',
          mistakes: 'Keep knees pushing outward aligned with toes.'
        },
        {
          id: 'rf_sat_4',
          name: 'Side Plank Fortress Hold',
          focus: 'Lateral Core & Waist Stability',
          targetReps: { beginner: 25, intermediate: 40, advanced: 60 },
          unit: 'sec',
          targetSets: 2,
          cue: 'Stack elbow under shoulder, lift hips into a sharp straight diagonal line. Switch sides.',
          setupTip: 'Stagger top foot in front if you need extra stability.',
          demoCategory: 'plank',
          anatomy: { primary: 'ab', secondary: 'delt glute' },
          forceType: 'Lateral Isometric',
          gripType: 'Single Forearm Support',
          tempo: 'Steady Hold Per Side',
          mistakes: 'Do not let bottom hip sag down toward the floor.'
        }
      ]
    },

    sunday: {
      title: 'Full Rest & Active Mobility Day',
      focus: 'Muscle Repair, Joint Recovery & Deep Stretch',
      subtitle: 'Zero heavy strain — let muscle fibers rebuild stronger for Monday',
      icon: '🌿',
      isRestDay: true,
      recoveryBadge: '🟢 OFFICIAL REST DAY • 100% Recovery Mode',
      recoveryNote: 'Muscles grow during rest, not during training! Skip heavy push/pull load today and restore joints gently.',
      exercises: [
        {
          id: 'rf_sun_1',
          name: 'Surya Namaskar Restorative Flow',
          focus: 'Full-Body Circulation & Joint Warmth',
          targetReps: { beginner: 3, intermediate: 5, advanced: 8 },
          unit: 'rounds',
          targetSets: 1,
          cue: 'Move slowly with deep nasal breathing through each yoga posture to flush out muscle soreness.',
          setupTip: 'Keep pace gentle and meditative — zero rush.',
          demoCategory: 'recovery',
          anatomy: { primary: 'back ab', secondary: 'chest quad hamstring' },
          forceType: 'Mobility Flow',
          gripType: 'Yoga Mat / Floor',
          tempo: 'Slow Breath-Synchronized Flow',
          mistakes: 'Do not force tight hamstrings; bend knees softly as needed.'
        },
        {
          id: 'rf_sun_2',
          name: 'Deep Malasana Squat Hold',
          focus: 'Hip Openers, Ankles & Lower Back Relief',
          targetReps: { beginner: 30, intermediate: 45, advanced: 60 },
          unit: 'sec',
          targetSets: 2,
          cue: 'Sit into a relaxed deep squat with heels down, press elbows gently inside knees, lift chest.',
          setupTip: 'Decompresses spine after a full week of sitting and training.',
          demoCategory: 'bodyweight_squat',
          anatomy: { primary: 'glute', secondary: 'quad calf back' },
          forceType: 'Mobility Stretch',
          gripType: 'Prayer Palms Inside Knees',
          tempo: 'Deep Relaxed Breathing',
          mistakes: 'Avoid collapsing upper back; stay tall.'
        },
        {
          id: 'rf_sun_3',
          name: 'Cat-Cow Spine Decompression',
          focus: 'Thoracic & Lumbar Spine Mobility',
          targetReps: { beginner: 10, intermediate: 15, advanced: 20 },
          targetSets: 2,
          cue: 'On hands and knees, inhale to arch chest gently (Cow), exhale to round spine smoothly (Cat).',
          setupTip: 'Relieves back tightness immediately.',
          demoCategory: 'recovery',
          anatomy: { primary: 'back', secondary: 'ab' },
          forceType: 'Spinal Mobility',
          gripType: 'Tabletop Hands & Knees',
          tempo: '3s Inhale -> 3s Exhale',
          mistakes: 'Move smoothly without jerking your neck.'
        },
        {
          id: 'rf_sun_4',
          name: 'Doorway Chest & Shoulder Opener',
          focus: 'Pec Stretch & Upper Posture Reset',
          targetReps: { beginner: 30, intermediate: 45, advanced: 60 },
          unit: 'sec',
          targetSets: 2,
          cue: 'Place forearms on doorway edges at 90°, gently step forward until a calm chest stretch appears.',
          setupTip: 'Counters rounded desk posture and tight push-up pectorals.',
          demoCategory: 'recovery',
          anatomy: { primary: 'chest', secondary: 'delt' },
          forceType: 'Static Stretch',
          gripType: 'Doorway Forearm Brace',
          tempo: 'Calm Deep Breathing Hold',
          mistakes: 'Never stretch into sharp shoulder pain; keep it gentle.'
        }
      ]
    }
  };

  // ============================================================
  // REGISTER ALL ROOM EXERCISES INTO GLOBAL EXERCISE_GUIDES
  // Enables full MuscleWiki-grade Animated Demo Modal!
  // ============================================================
  function getResolvedExercise(state, ex) {
    if (!ex) return null;
    var overrides = (state && state.customDetails && state.customDetails[ex.id]) ? state.customDetails[ex.id] : null;
    if (!overrides) return ex;
    return Object.assign({}, ex, {
      name: overrides.name || ex.name,
      focus: overrides.focus || ex.focus,
      cue: overrides.cue || ex.cue
    });
  }

  function registerRoomExerciseGuides() {
    if (typeof global === 'undefined') return;
    if (!global.EXERCISE_GUIDES) global.EXERCISE_GUIDES = {};
    var state = loadRoomState();

    function registerItem(rawEx, badgeType) {
      var ex = getResolvedExercise(state, rawEx);
      global.EXERCISE_GUIDES[ex.id] = {
        name: ex.name,
        equipment: 'No Equipment • Bodyweight',
        level: 'All Levels (Adjustable)',
        type: badgeType,
        category: ex.demoCategory || 'pushup',
        primaryMuscle: ex.focus || 'Bodyweight Strength',
        secondaryMuscle: ex.anatomy && ex.anatomy.secondary ? ex.anatomy.secondary.toUpperCase() : 'Core & Stabilizers',
        tertiaryMuscle: 'Joint Stability & Posture',
        gripType: ex.gripType || 'Bodyweight Support',
        forceType: ex.forceType || 'Bodyweight',
        tempo: ex.tempo || '2s Controlled -> 1s Drive',
        anatomyTarget: ex.anatomy || { primary: 'chest', secondary: 'ab' },
        instructions: [
          'Room Setup: ' + (ex.setupTip || 'Clear a small mat space in your room with zero equipment needed.'),
          'Form & Execution: ' + (ex.cue || 'Move through full range of motion with steady control.'),
          'Breathing Cadence: Inhale smoothly during the lowering/stretch phase; exhale cleanly during exertion.',
          'Progression: Use the (-) and (+) buttons on the card to scale your reps week-by-week.'
        ],
        mistakes: ex.mistakes || 'Avoid rushing reps, swinging momentum, or losing core alignment.',
        proTip: ex.proTip || 'Quality reps beat sloppy reps every time. Focus on strict mind-muscle control.'
      };
    }

    DAILY_ESSENTIALS.forEach(function (ex) {
      registerItem(ex, 'Daily Essential • No Rest Needed');
    });

    Object.keys(WEEKLY_RECOVERY_PROGRAM).forEach(function (dayKey) {
      var day = WEEKLY_RECOVERY_PROGRAM[dayKey];
      var label = day.isRestDay ? 'Active Recovery & Mobility' : 'Weekly Split • 48h Recovery';
      day.exercises.forEach(function (ex) {
        registerItem(ex, label);
      });
    });
  }

  // ============================================================
  // HELPERS & STATE MANAGEMENT
  // ============================================================
  function getTodayDayKey() {
    var d = new Date().getDay();
    return DAY_KEYS[d] || 'monday';
  }

  function getTodayIsoDate() {
    var now = new Date();
    var y = now.getFullYear();
    var m = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function loadRoomState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          if (!parsed.level) parsed.level = 'beginner';
          if (!parsed.customReps) parsed.customReps = {};
          if (!parsed.customDetails) parsed.customDetails = {};
          if (!parsed.logs) parsed.logs = {};
          if (!parsed.activeDayKey) parsed.activeDayKey = getTodayDayKey();
          return parsed;
        }
      }
    } catch (e) {}
    return {
      level: 'beginner',
      customReps: {},
      customDetails: {},
      logs: {},
      activeDayKey: getTodayDayKey()
    };
  }

  registerRoomExerciseGuides();

  function saveRoomState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function safeEscape(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function findRoomExerciseById(exId) {
    for (var i = 0; i < DAILY_ESSENTIALS.length; i++) {
      if (DAILY_ESSENTIALS[i].id === exId) return DAILY_ESSENTIALS[i];
    }
    var keys = Object.keys(WEEKLY_RECOVERY_PROGRAM);
    for (var k = 0; k < keys.length; k++) {
      var list = WEEKLY_RECOVERY_PROGRAM[keys[k]].exercises;
      for (var j = 0; j < list.length; j++) {
        if (list[j].id === exId) return list[j];
      }
    }
    return null;
  }

  function getExerciseTargetRep(state, ex) {
    if (state.customReps && typeof state.customReps[ex.id] === 'number' && state.customReps[ex.id] > 0) {
      return state.customReps[ex.id];
    }
    var lvl = state.level || 'beginner';
    if (ex.targetReps && typeof ex.targetReps[lvl] === 'number') {
      return ex.targetReps[lvl];
    }
    return 10;
  }

  function isSetDoneToday(state, exId, setIndex) {
    var todayKey = getTodayIsoDate();
    var dayLog = state.logs[todayKey];
    if (!dayLog || !dayLog.setsDone) return false;
    return Boolean(dayLog.setsDone[exId + '_' + setIndex]);
  }

  function isExerciseDoneToday(state, ex) {
    var totalSets = ex.targetSets || 3;
    for (var s = 0; s < totalSets; s++) {
      if (!isSetDoneToday(state, ex.id, s)) return false;
    }
    return true;
  }

  function calculateListProgress(state, exercisesList) {
    var totalSets = 0;
    var doneSets = 0;
    var doneEx = 0;
    var totalEx = exercisesList.length;

    exercisesList.forEach(function (ex) {
      var setsCount = ex.targetSets || 3;
      var exDone = true;
      for (var s = 0; s < setsCount; s++) {
        totalSets++;
        if (isSetDoneToday(state, ex.id, s)) {
          doneSets++;
        } else {
          exDone = false;
        }
      }
      if (exDone && setsCount > 0) doneEx++;
    });

    var pct = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;
    return { doneSets: doneSets, totalSets: totalSets, doneEx: doneEx, totalEx: totalEx, pct: pct };
  }

  function calculateDayProgress(state, dayKey) {
    var program = WEEKLY_RECOVERY_PROGRAM[dayKey] || WEEKLY_RECOVERY_PROGRAM.monday;
    return calculateListProgress(state, program.exercises);
  }

  function calculateCombinedTodayProgress(state) {
    var todayDay = getTodayDayKey();
    var program = WEEKLY_RECOVERY_PROGRAM[todayDay] || WEEKLY_RECOVERY_PROGRAM.monday;
    var combined = DAILY_ESSENTIALS.concat(program.exercises);
    return calculateListProgress(state, combined);
  }

  function calculateRoomStreak(state) {
    var streak = 0;
    var now = new Date();
    for (var i = 0; i < 60; i++) {
      var d = new Date(now);
      d.setDate(now.getDate() - i);
      var iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      var log = state.logs[iso];
      var hasActivity = log && log.setsDone && Object.keys(log.setsDone).length > 0;
      if (hasActivity) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  }

  // ============================================================
  // INTERACTION HANDLERS (SET TOGGLES, DIRECT CHECK, REPS)
  // ============================================================
  function toggleSetCompletion(exId, setIndex) {
    var state = loadRoomState();
    var todayKey = getTodayIsoDate();
    if (!state.logs[todayKey]) {
      state.logs[todayKey] = { completedEx: [], setsDone: {} };
    }
    if (!state.logs[todayKey].setsDone) {
      state.logs[todayKey].setsDone = {};
    }

    var setKey = exId + '_' + setIndex;
    if (state.logs[todayKey].setsDone[setKey]) {
      delete state.logs[todayKey].setsDone[setKey];
    } else {
      state.logs[todayKey].setsDone[setKey] = true;
    }

    saveRoomState(state);
    renderRoomFitnessView();
    renderRoomFitnessHomeCard();
  }

  function toggleExerciseDoneDirect(exId) {
    var state = loadRoomState();
    var ex = findRoomExerciseById(exId);
    if (!ex) return;

    var todayKey = getTodayIsoDate();
    if (!state.logs[todayKey]) {
      state.logs[todayKey] = { completedEx: [], setsDone: {} };
    }
    if (!state.logs[todayKey].setsDone) {
      state.logs[todayKey].setsDone = {};
    }

    var totalSets = ex.targetSets || 3;
    var currentlyAllDone = isExerciseDoneToday(state, ex);

    for (var s = 0; s < totalSets; s++) {
      var setKey = exId + '_' + s;
      if (currentlyAllDone) {
        delete state.logs[todayKey].setsDone[setKey];
      } else {
        state.logs[todayKey].setsDone[setKey] = true;
      }
    }

    saveRoomState(state);
    renderRoomFitnessView();
    renderRoomFitnessHomeCard();
  }

  function adjustExerciseRep(exId, delta) {
    var state = loadRoomState();
    var ex = findRoomExerciseById(exId);
    if (!ex) return;

    var current = getExerciseTargetRep(state, ex);
    var step = (ex.unit === 'sec') ? (delta > 0 ? 5 : -5) : delta;
    var minVal = (ex.unit === 'sec') ? 10 : 1;
    var nextVal = Math.max(minVal, Math.min(200, current + step));

    state.customReps[exId] = nextVal;
    saveRoomState(state);
    renderRoomFitnessView();
    renderRoomFitnessHomeCard();
  }

  // ============================================================
  // SHARED CARD BUILDER FOR BOTH TIER 1 & TIER 2 EXERCISES
  // ============================================================
  function buildExerciseCardHtml(rawEx, idx, state, isDaily) {
    var ex = getResolvedExercise(state, rawEx);
    var numLabel = (idx + 1 < 10 ? '0' : '') + (idx + 1);
    var targetVal = getExerciseTargetRep(state, ex);
    var unitStr = ex.unit ? (' ' + ex.unit) : ' reps';
    var totalSets = ex.targetSets || 3;
    var isDone = isExerciseDoneToday(state, ex);

    var setsHtml = '';
    for (var s = 0; s < totalSets; s++) {
      var setChecked = isSetDoneToday(state, ex.id, s);
      setsHtml += '' +
        '<button type="button" class="rf-set-pill ' + (setChecked ? 'done' : '') + '" onclick="toggleSetCompletion(\'' + ex.id + '\', ' + s + ')">' +
          '<span>Set ' + (s + 1) + '</span>' +
          '<span class="rf-set-dot">' + (setChecked ? '✓' : '○') + '</span>' +
        '</button>';
    }

    var badgeTagHtml = isDaily
      ? '<span class="rf-ex-daily-chip">' + safeEscape(ex.categoryTag || 'DAILY') + '</span>'
      : '';

    return '' +
      '<div class="rf-exercise-card ' + (isDone ? 'completed' : '') + (isDaily ? ' rf-daily-card' : '') + '">' +
        '<div class="rf-ex-top">' +
          '<div class="rf-ex-num">' + numLabel + '</div>' +
          '<div class="rf-ex-info">' +
            badgeTagHtml +
            '<h4 class="rf-ex-name">' + safeEscape(ex.name) + '</h4>' +
            '<span class="rf-ex-focus">' + safeEscape(ex.focus) + '</span>' +
          '</div>' +
          '<button type="button" class="rf-check-circle ' + (isDone ? 'checked' : '') + '" onclick="toggleExerciseDoneDirect(\'' + ex.id + '\')" aria-label="Mark Done">' +
            (isDone ? '✓' : '') +
          '</button>' +
        '</div>' +

        '<div class="rf-reps-bar">' +
          '<div class="rf-reps-control">' +
            '<span class="rf-reps-label">Target per Set:</span>' +
            '<div class="rf-rep-stepper">' +
              '<button type="button" class="rf-step-btn" onclick="adjustExerciseRep(\'' + ex.id + '\', -1)" aria-label="Decrease">−</button>' +
              '<span class="rf-step-val">' + targetVal + unitStr + '</span>' +
              '<button type="button" class="rf-step-btn" onclick="adjustExerciseRep(\'' + ex.id + '\', 1)" aria-label="Increase">+</button>' +
            '</div>' +
          '</div>' +
          '<button type="button" class="rf-demo-btn" onclick="openRoomExerciseDemo(\'' + ex.id + '\')">' +
            '<svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><polygon points="6 4 18 12 6 20 6 4"/></svg>' +
            '<span>Demo</span>' +
          '</button>' +
        '</div>' +

        '<div class="rf-cue-line">' +
          '<span class="rf-cue-icon">💡</span>' +
          '<span>' + safeEscape(ex.cue) + ' <em>(' + safeEscape(ex.setupTip) + ')</em></span>' +
        '</div>' +

        '<div class="rf-sets-row">' + setsHtml + '</div>' +
      '</div>';
  }

  // ============================================================
  // 1. HOME SCREEN CARD RENDERER
  // ============================================================
  function renderRoomFitnessHomeCard() {
    if (typeof document === 'undefined') return;
    var container = document.getElementById('roomFitnessHomeCard');
    if (!container) return;

    var state = loadRoomState();
    var todayDay = getTodayDayKey();
    var program = WEEKLY_RECOVERY_PROGRAM[todayDay] || WEEKLY_RECOVERY_PROGRAM.monday;
    var combinedProg = calculateCombinedTodayProgress(state);
    var dailyProg = calculateListProgress(state, DAILY_ESSENTIALS);
    var streak = calculateRoomStreak(state);

    var pushupTarget = getExerciseTargetRep(state, DAILY_ESSENTIALS[0]);
    var levelBadge = state.level === 'advanced' ? '🔥 Beast' : (state.level === 'intermediate' ? '⚡ Intermediate' : '🌱 Beginner');
    var ringDash = 100 - combinedProg.pct;

    container.innerHTML = '' +
      '<div class="room-fitness-home-header">' +
        '<div class="room-fitness-badge-row">' +
          '<span class="room-fitness-badge">ROOM &amp; HOME FITNESS</span>' +
          '<span class="room-fitness-free-tag">100% FREE • NO EQUIPMENT</span>' +
        '</div>' +
        '<div class="room-fitness-ring-wrap">' +
          '<svg class="room-mini-ring" viewBox="0 0 36 36">' +
            '<path class="room-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />' +
            '<path class="room-ring-fill" stroke-dasharray="100, 100" stroke-dashoffset="' + ringDash + '" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />' +
          '</svg>' +
          '<span class="room-ring-text">' + combinedProg.pct + '%</span>' +
        '</div>' +
      '</div>' +

      '<div class="room-home-body">' +
        '<div class="room-home-title-row">' +
          '<span class="room-home-icon">' + program.icon + '</span>' +
          '<div>' +
            '<h3 class="room-home-title">' + safeEscape(program.title) + '</h3>' +
            '<p class="room-home-sub">Daily ' + pushupTarget + ' Push-ups + ' + safeEscape(DAY_NAMES[todayDay]) + (program.isRestDay ? ' Rest &amp; Mobility' : ' Recovery Split') + '</p>' +
          '</div>' +
        '</div>' +

        '<div class="room-home-highlights">' +
          '<span class="room-hl-chip">⭐ Daily: ' + dailyProg.doneEx + '/' + dailyProg.totalEx + '</span>' +
          '<span class="room-hl-chip">' + levelBadge + '</span>' +
          '<span class="room-hl-chip">🔥 ' + streak + 'd Streak</span>' +
        '</div>' +
      '</div>' +

      '<div class="room-home-footer">' +
        '<span class="room-home-note">' + (program.isRestDay ? '🌿 Today: Daily Essentials + Restorative Stretch' : '⏳ 48h Muscle Recovery Split • Built-in 🎬 Demos') + '</span>' +
        '<span class="btn-room-start">Open Workout →</span>' +
      '</div>';
  }

  // ============================================================
  // 2. DEDICATED FULL-SCREEN ROOM FITNESS VIEW RENDERER
  // ============================================================
  function renderRoomFitnessView() {
    if (typeof document === 'undefined') return;
    var container = document.getElementById('viewRoomFitness');
    if (!container) return;

    var state = loadRoomState();
    var activeDay = state.activeDayKey || getTodayDayKey();
    if (!WEEKLY_RECOVERY_PROGRAM[activeDay]) activeDay = 'monday';

    var program = WEEKLY_RECOVERY_PROGRAM[activeDay];
    var dailyProg = calculateListProgress(state, DAILY_ESSENTIALS);
    var weeklyProg = calculateDayProgress(state, activeDay);
    var combinedProg = calculateCombinedTodayProgress(state);
    var streak = calculateRoomStreak(state);

    // Build Level Pills
    var levels = [
      { id: 'beginner', label: '🌱 Beginner' },
      { id: 'intermediate', label: '⚡ Intermediate' },
      { id: 'advanced', label: '🔥 Beast Mode' }
    ];
    var levelHtml = levels.map(function (lvl) {
      var activeCls = state.level === lvl.id ? 'active' : '';
      return '<button type="button" class="rf-level-pill ' + activeCls + '" onclick="setRoomFitnessLevel(\'' + lvl.id + '\')">' + lvl.label + '</button>';
    }).join('');

    // Build Day Pills (Mon -> Sun, with Rest indicator on Sun)
    var orderedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    var todayKey = getTodayDayKey();
    var dayPillsHtml = orderedDays.map(function (dKey) {
      var dObj = WEEKLY_RECOVERY_PROGRAM[dKey];
      var isSelected = dKey === activeDay;
      var isToday = dKey === todayKey;
      var shortName = dKey.slice(0, 3).toUpperCase();
      var restCls = dObj.isRestDay ? ' is-rest' : '';
      return '' +
        '<button type="button" class="rf-day-pill ' + (isSelected ? 'active' : '') + (isToday ? ' is-today' : '') + restCls + '" onclick="selectRoomDay(\'' + dKey + '\')">' +
          '<span class="rf-day-short">' + shortName + '</span>' +
          '<span class="rf-day-icon">' + dObj.icon + '</span>' +
          (dObj.isRestDay ? '<span class="rf-day-rest-mini">REST</span>' : '') +
        '</button>';
    }).join('');

    // Build Tier 1: Daily Essential Cards
    var dailyCardsHtml = DAILY_ESSENTIALS.map(function (ex, idx) {
      return buildExerciseCardHtml(ex, idx, state, true);
    }).join('');

    // Build Tier 2: Weekly Recovery Split Cards
    var weeklyCardsHtml = program.exercises.map(function (ex, idx) {
      return buildExerciseCardHtml(ex, idx, state, false);
    }).join('');

    // Celebration Banner if both Daily & Active Day completed
    var celebrationBanner = '';
    if (dailyProg.pct === 100 && weeklyProg.pct === 100) {
      celebrationBanner = '' +
        '<div class="rf-celebration-banner">' +
          '<div class="rf-cel-icon">🏆</div>' +
          '<div>' +
            '<strong>Full Room Session Conquered!</strong>' +
            '<span>Daily Foundation + ' + safeEscape(DAY_NAMES[activeDay]) + ' Protocol 100% Completed. Rest well &amp; hydrate!</span>' +
          '</div>' +
        '</div>';
    } else if (dailyProg.pct === 100) {
      celebrationBanner = '' +
        '<div class="rf-daily-win-banner">' +
          '<span>✅ Daily Foundation Complete! Now crush your ' + safeEscape(DAY_NAMES[activeDay]) + ' split below.</span>' +
        '</div>';
    }

    container.innerHTML = '' +
      // Top Navigation Bar
      '<div class="rf-top-nav">' +
        '<button type="button" class="rf-back-btn" onclick="switchView(\'home\')">← Back to Home</button>' +
        '<span class="rf-free-badge">100% FREE NO-EQUIPMENT</span>' +
      '</div>' +

      // Hero Banner
      '<div class="rf-main-banner">' +
        '<div class="rf-banner-left">' +
          '<h2 class="rf-banner-title">Room Fitness &amp; Calisthenics</h2>' +
          '<p class="rf-banner-sub">Daily Essentials + Weekly 48h Muscle Recovery Split</p>' +
        '</div>' +
        '<div class="rf-banner-stats">' +
          '<div class="rf-stat-box">' +
            '<span class="rf-stat-val">' + streak + 'd</span>' +
            '<span class="rf-stat-lbl">STREAK</span>' +
          '</div>' +
          '<div class="rf-stat-box">' +
            '<span class="rf-stat-val">' + combinedProg.doneEx + '/' + combinedProg.totalEx + '</span>' +
            '<span class="rf-stat-lbl">TODAY</span>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // Intensity Level Switcher
      '<div class="rf-level-strip">' +
        '<span class="rf-level-caption">INTENSITY LEVEL:</span>' +
        '<div class="rf-level-pills">' + levelHtml + '</div>' +
      '</div>' +

      celebrationBanner +

      // ============================================================
      // TIER 1: DAILY ESSENTIAL ROUTINE (ALWAYS ACTIVE EVERY DAY)
      // ============================================================
      '<div class="rf-tier-section rf-daily-section">' +
        '<div class="rf-tier-header">' +
          '<div>' +
            '<span class="rf-tier-badge rf-tier-badge-daily">⭐ TIER 1 • EVERYDAY FOUNDATION</span>' +
            '<h3 class="rf-tier-title">Daily Essential Routine</h3>' +
            '<p class="rf-tier-sub">Safe to perform every single day • Zero rest day required • Adjust reps with − / +</p>' +
          '</div>' +
          '<div class="rf-daily-progress-pill ' + (dailyProg.pct === 100 ? 'done' : '') + '">' +
            dailyProg.doneEx + '/' + dailyProg.totalEx + ' Done' +
          '</div>' +
        '</div>' +
        '<div class="rf-day-bar-track" style="margin-bottom: 14px;">' +
          '<div class="rf-day-bar-fill rf-bar-daily" style="width: ' + dailyProg.pct + '%;"></div>' +
        '</div>' +
        '<div class="rf-exercises-list">' + dailyCardsHtml + '</div>' +
      '</div>' +

      // ============================================================
      // TIER 2: WEEKLY MUSCLE-SPLIT & RECOVERY SCHEDULE
      // ============================================================
      '<div class="rf-tier-section rf-weekly-section">' +
        '<div class="rf-tier-header" style="margin-bottom: 12px;">' +
          '<div>' +
            '<span class="rf-tier-badge rf-tier-badge-weekly">📅 TIER 2 • RECOVERY-BASED SPLIT</span>' +
            '<h3 class="rf-tier-title">Weekly Muscle-Split &amp; Rest Days</h3>' +
            '<p class="rf-tier-sub">Targeted overload with 48h muscle rest windows • Sunday dedicated to full recovery</p>' +
          '</div>' +
        '</div>' +

        // 7-Day Selector Strip
        '<div class="rf-days-strip">' + dayPillsHtml + '</div>' +

        // Day Protocol & Recovery Card
        '<div class="rf-day-header-card ' + (program.isRestDay ? 'rf-rest-day-card' : '') + '">' +
          '<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">' +
            '<div style="flex: 1; min-width: 0;">' +
              '<span class="rf-day-tag ' + (program.isRestDay ? 'rest' : '') + '">' + safeEscape(DAY_NAMES[activeDay].toUpperCase()) + (program.isRestDay ? ' • REST &amp; RECOVERY' : ' PROTOCOL') + '</span>' +
              '<h3 class="rf-day-title">' + safeEscape(program.title) + '</h3>' +
              '<p class="rf-day-focus">' + safeEscape(program.focus) + ' • ' + safeEscape(program.subtitle) + '</p>' +
            '</div>' +
            '<div class="rf-day-pct-circle ' + (program.isRestDay ? 'rest' : '') + '">' + weeklyProg.pct + '%</div>' +
          '</div>' +
          '<div class="rf-recovery-box ' + (program.isRestDay ? 'rest' : '') + '">' +
            '<div class="rf-recovery-pill">' + safeEscape(program.recoveryBadge) + '</div>' +
            '<p class="rf-recovery-note">' + safeEscape(program.recoveryNote) + '</p>' +
          '</div>' +
          '<div class="rf-day-bar-track"><div class="rf-day-bar-fill" style="width: ' + weeklyProg.pct + '%;"></div></div>' +
        '</div>' +

        // Exercises List for Selected Day
        '<div class="rf-exercises-list">' + weeklyCardsHtml + '</div>' +
      '</div>' +

      // Rest Timer Quick Widget
      '<div class="rf-rest-widget">' +
        '<div class="rf-rest-info">' +
          '<strong>Rest Between Sets:</strong>' +
          '<span>30–60s rest keeps muscle tension optimal</span>' +
        '</div>' +
        '<div class="rf-rest-buttons">' +
          '<button type="button" class="rf-rest-chip" onclick="startRoomRestTimer(30)">⏱️ 30s</button>' +
          '<button type="button" class="rf-rest-chip" onclick="startRoomRestTimer(45)">⏱️ 45s</button>' +
          '<button type="button" class="rf-rest-chip" onclick="startRoomRestTimer(60)">⏱️ 60s</button>' +
        '</div>' +
      '</div>' +

      // Footer
      '<div class="app-page-footer" style="margin-top: 24px;">' +
        'Room Fitness &amp; Bodyweight Engine • Powered by <strong>CodeByTushu</strong> • v0.05' +
      '</div>';
  }

  // ============================================================
  // 3. ACTION HANDLERS & DEMO MODAL BRIDGE
  // ============================================================
  global.openRoomFitnessView = function () {
    if (typeof global.switchView === 'function') {
      global.switchView('room-fitness');
    }
  };

  global.selectRoomDay = function (dayKey) {
    var state = loadRoomState();
    state.activeDayKey = dayKey;
    saveRoomState(state);
    renderRoomFitnessView();
  };

  global.setRoomFitnessLevel = function (levelId) {
    var state = loadRoomState();
    state.level = levelId;
    saveRoomState(state);
    renderRoomFitnessView();
    renderRoomFitnessHomeCard();
  };

  global.openRoomExerciseDemo = function (exId) {
    registerRoomExerciseGuides();
    if (typeof global.openExerciseDemoModal === 'function') {
      global.openExerciseDemoModal(exId);
    } else {
      global.showRoomExerciseGuide(exId);
    }
  };

  global.showRoomExerciseGuide = function (exId) {
    var ex = findRoomExerciseById(exId);
    if (!ex) return;

    if (typeof global.showAppAlert === 'function') {
      global.showAppAlert({
        title: ex.name,
        message: 'FORM & EXECUTION:\n' + ex.cue + '\n\nROOM SETUP TIP:\n' + ex.setupTip + '\n\nTARGET FOCUS:\n' + ex.focus,
        tone: 'info'
      });
    } else {
      alert(ex.name + '\n\n' + ex.cue + '\n\nRoom Tip: ' + ex.setupTip);
    }
  };

  global.startRoomRestTimer = function (seconds) {
    if (typeof global.startRestTimer === 'function') {
      global.startRestTimer(seconds);
    } else if (typeof global.startCustomTimer === 'function') {
      global.startCustomTimer(seconds);
    } else if (typeof global.toggleRestTimerQuick === 'function') {
      global.toggleRestTimerQuick();
    }
    if (typeof global.showToast === 'function') {
      global.showToast('Rest timer started: ' + seconds + 's');
    }
  };

  global.getRoomExerciseDetails = function (exId) {
    var raw = findRoomExerciseById(exId);
    if (!raw) return null;
    var state = loadRoomState();
    var ex = getResolvedExercise(state, raw);
    return {
      id: ex.id,
      name: ex.name,
      target: ex.focus || '',
      notes: ex.cue || ''
    };
  };

  global.updateRoomExerciseDetails = function (exId, updates) {
    var raw = findRoomExerciseById(exId);
    if (!raw) return false;
    var state = loadRoomState();
    if (!state.customDetails) state.customDetails = {};
    var existing = state.customDetails[exId] || {};
    state.customDetails[exId] = {
      name: (updates && updates.name) ? updates.name : (existing.name || raw.name),
      focus: (updates && updates.target) ? updates.target : (existing.focus || raw.focus),
      cue: (updates && updates.notes) ? updates.notes : (existing.cue || raw.cue)
    };
    saveRoomState(state);
    registerRoomExerciseGuides();
    renderRoomFitnessView();
    renderRoomFitnessHomeCard();
    return true;
  };

  global.toggleSetCompletion = toggleSetCompletion;
  global.toggleExerciseDoneDirect = toggleExerciseDoneDirect;
  global.adjustExerciseRep = adjustExerciseRep;
  global.renderRoomFitnessHomeCard = renderRoomFitnessHomeCard;
  global.renderRoomFitnessView = renderRoomFitnessView;

  // Auto-init on DOM ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        registerRoomExerciseGuides();
        renderRoomFitnessHomeCard();
        var v = document.getElementById('viewRoomFitness');
        if (v && v.classList.contains('active')) {
          renderRoomFitnessView();
        }
      });
    } else {
      registerRoomExerciseGuides();
      renderRoomFitnessHomeCard();
    }
  }

})(typeof window !== 'undefined' ? window : this);
