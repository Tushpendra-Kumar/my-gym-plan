// ==============================================================================
// CodeByTushu Automated App & Website Sync Pipeline
// 1-Command build, sync & stage for My GYM Plan and CodeByTushu Website
// ==============================================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const gymDir = 'E:\\My GYM Plan';
const websiteDir = 'E:\\Codebytushu';

console.log('🚀 [Pipeline] Starting Gym Plan to CodeByTushu Website Sync...');

// 1. Read Gym Plan manifest
const manifestPath = path.join(gymDir, 'ota-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ ota-manifest.json not found in ' + gymDir);
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const versionStr = 'v' + manifest.version;
const rawNotes = manifest.notes || 'Latest performance and UI improvements';

console.log(`📦 App Version: ${versionStr} (Build #${manifest.buildNumber})`);

// 2. Sync web assets into Android project
console.log('🔄 Syncing web assets to android/app/src/main/assets/www/ ...');
try {
  execSync('node sync-assets.js', { cwd: gymDir, stdio: 'inherit' });
} catch (e) {
  console.warn('⚠️ Asset sync warning:', e.message);
}

// 3. Build APK with Gradle if available
const gradlewBat = path.join(gymDir, 'android', 'gradlew.bat');
const debugApk = path.join(gymDir, 'android', 'app', 'build', 'outputs', 'apk', 'debug', 'GymPlan.apk');

if (fs.existsSync(gradlewBat)) {
  console.log('🔨 Compiling latest APK with Gradle...');
  try {
    execSync('cmd.exe /c gradlew.bat assembleDebug --no-daemon', { cwd: path.join(gymDir, 'android'), stdio: 'inherit' });
    console.log('✅ Gradle build successful!');
  } catch (err) {
    console.warn('⚠️ Gradle build returned code:', err.status || err.message);
  }
}

// 4. Locate the fresh APK
let sourceApk = null;
if (fs.existsSync(debugApk)) {
  sourceApk = debugApk;
} else if (fs.existsSync(path.join(gymDir, 'GymPlan.apk'))) {
  sourceApk = path.join(gymDir, 'GymPlan.apk');
}

if (!sourceApk) {
  console.error('❌ No APK found to copy!');
  process.exit(1);
}

// Copy to E:\My GYM Plan\GymPlan.apk
const targetGymApk = path.join(gymDir, 'GymPlan.apk');
if (sourceApk !== targetGymApk) {
  fs.copyFileSync(sourceApk, targetGymApk);
  console.log(`✅ Copied to ${targetGymApk}`);
}

const stats = fs.statSync(targetGymApk);
const sizeMb = (stats.size / (1024 * 1024)).toFixed(1) + ' MB';
console.log(`📊 APK Size: ${sizeMb} (${stats.size} bytes)`);

// 5. Copy to CodeByTushu website uploads
if (fs.existsSync(websiteDir)) {
  const websiteApkDir = path.join(websiteDir, 'uploads', 'apps', 'apks');
  if (!fs.existsSync(websiteApkDir)) {
    fs.mkdirSync(websiteApkDir, { recursive: true });
  }

  // GymPlan.apk & IronTracker alias
  const targetWebApk = path.join(websiteApkDir, 'GymPlan.apk');
  const targetIronApk = path.join(websiteApkDir, 'IronTracker-v1.1.0.apk');
  fs.copyFileSync(targetGymApk, targetWebApk);
  fs.copyFileSync(targetGymApk, targetIronApk);
  console.log(`✅ Copied APK to ${targetWebApk}`);
  console.log(`✅ Copied APK to ${targetIronApk}`);

  // 6. Update website files: apps/index.php, api/apps/list.php, api/apps/check-update.php
  const filesToUpdate = [
    {
      file: path.join(websiteDir, 'apps', 'index.php'),
      updates: [
        { regex: /'version'\s*=>\s*'v[\d\.]+',/, repl: `'version' => '${versionStr}',` },
        { regex: /'file_size'\s*=>\s*'[0-9\.]+\s*MB',/, repl: `'file_size' => '${sizeMb}',` },
        { regex: /'changelog'\s*=>\s*'v[\d\.]+:[^']+',/, repl: `'changelog' => '${versionStr}: ${rawNotes.replace(/'/g, "\\'")}',` }
      ]
    },
    {
      file: path.join(websiteDir, 'api', 'apps', 'list.php'),
      updates: [
        { regex: /'version'\s*=>\s*'v[\d\.]+',/, repl: `'version' => '${versionStr}',` },
        { regex: /'file_size'\s*=>\s*'[0-9\.]+\s*MB',/, repl: `'file_size' => '${sizeMb}',` },
        { regex: /'changelog'\s*=>\s*'v[\d\.]+:[^']+',/, repl: `'changelog' => '${versionStr}: ${rawNotes.replace(/'/g, "\\'")}',` }
      ]
    },
    {
      file: path.join(websiteDir, 'api', 'apps', 'check-update.php'),
      updates: [
        { regex: /'latest_version'\s*=>\s*'v[\d\.]+',/, repl: `'latest_version' => '${versionStr}',` },
        { regex: /'file_size'\s*=>\s*'[0-9\.]+\s*MB',/, repl: `'file_size' => '${sizeMb}',` }
      ]
    }
  ];

  filesToUpdate.forEach(({ file, updates }) => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      updates.forEach(({ regex, repl }) => {
        content = content.replace(regex, repl);
      });
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Updated metadata in ${path.relative(websiteDir, file)}`);
    }
  });

  // 7. Stage & commit in CodeByTushu
  try {
    execSync('git add uploads/apps/apks/GymPlan.apk uploads/apps/apks/IronTracker-v1.1.0.apk apps/index.php api/apps/list.php api/apps/check-update.php includes/apps_schema.php', { cwd: websiteDir });
    const diff = execSync('git status --porcelain', { cwd: websiteDir }).toString().trim();
    if (diff) {
      execSync(`git commit -m "feat(apps): update GymPlan to ${versionStr} (${sizeMb})"`, { cwd: websiteDir });
      console.log('✅ Committed updates in CodeByTushu repository!');
    } else {
      console.log('ℹ️ CodeByTushu already up-to-date with this version.');
    }
  } catch (err) {
    console.warn('⚠️ Git commit warning in CodeByTushu:', err.message);
  }
}

// 8. Stage & commit in My GYM Plan
try {
  execSync('git add GymPlan.apk ota-manifest.json android/app/src/main/assets/www', { cwd: gymDir });
  const diffGym = execSync('git status --porcelain', { cwd: gymDir }).toString().trim();
  if (diffGym) {
    execSync(`git commit -m "release: ${versionStr} - ${rawNotes}"`, { cwd: gymDir });
    console.log('✅ Committed updates in My GYM Plan repository!');
  } else {
    console.log('ℹ️ My GYM Plan already committed.');
  }
} catch (err) {
  console.warn('⚠️ Git commit warning in My GYM Plan:', err.message);
}

console.log('\n🎉 ========================================================');
console.log('🎉 PIPELINE SYNC COMPLETE!');
console.log(`🎉 1. My GYM Plan has latest APK (${sizeMb}) & OTA files.`);
console.log('🎉 2. CodeByTushu website has latest APK & version badges.');
console.log('🎉 3. Both repositories have ready commits on branch main.');
console.log('👉 Final Step: In VS Code, just do "git push" (or sync) in both folders!');
console.log('👉 Hostinger will automatically pull and redeploy the latest website.');
console.log('========================================================\n');
