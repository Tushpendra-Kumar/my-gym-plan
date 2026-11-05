const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const assetsTarget = path.join(rootDir, 'android', 'app', 'src', 'main', 'assets', 'www');
const resTarget = path.join(rootDir, 'android', 'app', 'src', 'main', 'res');

// Create destination directories
if (!fs.existsSync(assetsTarget)) {
  fs.mkdirSync(assetsTarget, { recursive: true });
}

// Copy web files
const filesToCopy = ['index.html', 'style.css', 'visual-guides.js', 'app.js', 'manifest.json'];
filesToCopy.forEach(file => {
  const src = path.join(rootDir, file);
  const dest = path.join(assetsTarget, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${file} -> assets/www/`);
  }
});

// Copy icons directory to assets/www/icons/
const iconsSrcDir = path.join(rootDir, 'icons');
const iconsDestDir = path.join(assetsTarget, 'icons');
if (!fs.existsSync(iconsDestDir)) {
  fs.mkdirSync(iconsDestDir, { recursive: true });
}
if (fs.existsSync(iconsSrcDir)) {
  fs.readdirSync(iconsSrcDir).forEach(f => {
    fs.copyFileSync(path.join(iconsSrcDir, f), path.join(iconsDestDir, f));
    console.log(`Copied icon: ${f}`);
  });
}

// Also copy icon as Android launcher icon
const mipmapDirs = [
  'mipmap-mdpi',
  'mipmap-hdpi',
  'mipmap-xhdpi',
  'mipmap-xxhdpi',
  'mipmap-xxxhdpi'
];

mipmapDirs.forEach(dir => {
  const fullDir = path.join(resTarget, dir);
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
  }
  // Copy 192 icon as ic_launcher.png
  const srcIcon = path.join(iconsSrcDir, 'icon-192.png');
  if (fs.existsSync(srcIcon)) {
    fs.copyFileSync(srcIcon, path.join(fullDir, 'ic_launcher.png'));
  }
});

console.log('✅ All Android assets & app icons synced successfully!');
