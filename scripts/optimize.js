#!/usr/bin/env node

/**
 * ACM Website Optimization Script
 * This script resolves merge conflicts and creates optimized versions of files
 */

const fs = require('fs');
const path = require('path');

const conflictFiles = [
  'src/AcmMitbApp.jsx',
  'src/firebase.js',
  'src/components/EventShowcase.jsx',
  'src/components/About.jsx',
  'src/components/PopupBanner.jsx',
  'src/components/Navbar.jsx',
  'src/SigSoftApp.jsx',
];

function resolveConflict(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove merge conflict markers and keep the HEAD version
    const resolved = content
      .replace(/<<<<<<< HEAD\n/g, '')
      .replace(/=======[\s\S]*?>>>>>>> [^\n]+\n/g, '');
    
    fs.writeFileSync(filePath, resolved, 'utf8');
    console.log(`✅ Resolved: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error resolving ${filePath}:`, error.message);
  }
}

console.log('🚀 Starting ACM Website Optimization...\n');

conflictFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    resolveConflict(fullPath);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('\n✨ Optimization complete!');
