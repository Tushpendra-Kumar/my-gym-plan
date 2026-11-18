// ============================================================
// 1-Command Live OTA Release Publisher
// Usage: node publish-ota.js "Your update description here"
// Automatically bumps buildNumber & version in ota-manifest.json
// and syncs all web assets to Android www/
// ============================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const manifestPath = path.join(__dirname, 'ota-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const customNotes = process.argv.slice(2).join(' ').trim();
const nextBuild = Number(manifest.buildNumber || 8) + 1;

// Auto-increment patch segment (e.g. 0.05.1 -> 0.05.2)
const parts = String(manifest.version || '0.05.1').split('.');
if (parts.length === 3) {
  parts[2] = String(Number(parts[2] || 0) + 1);
} else {
  parts.push('1');
}
const nextVersion = parts.join('.');

const now = new Date();
const todayIso = now.getFullYear() + '-' +
  String(now.getMonth() + 1).padStart(2, '0') + '-' +
  String(now.getDate()).padStart(2, '0');

manifest.version = nextVersion;
manifest.buildNumber = nextBuild;
manifest.releasedAt = todayIso;
if (customNotes) {
  manifest.notes = customNotes;
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`✅ Updated ota-manifest.json -> v${nextVersion} (build #${nextBuild})`);

// Sync updated files to Android assets/www/
execSync('node sync-assets.js', { stdio: 'inherit' });

console.log('\n🚀 Next Step: Push to GitHub so all phones get this Live OTA update in 1 click:');
console.log(`   git add -A && git commit -m "ota: v${nextVersion} - ${manifest.notes}" && git push origin main`);
