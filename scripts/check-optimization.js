#!/usr/bin/env node

/**
 * Post-Optimization Helper Script
 * Run this after the main optimizations to complete setup
 */

const fs = require('fs');
const path = require('path');

console.log('\n🚀 ACM Website Post-Optimization Helper\n');
console.log('This script will help complete your optimization setup.\n');

const tasks = [
  {
    name: 'Update Navbar imports',
    check: () => {
      const files = [
        'src/App.jsx',
        'src/AboutPageApp.jsx',
        'src/AcmMitbApp.jsx',
        'src/AcmWApp.jsx',
        'src/NewsApp.jsx',
        'src/MembershipApp.jsx',
        'src/SigAiApp.jsx',
        'src/SigSoftApp.jsx',
        'src/TownhallApp.jsx',
      ];
      
      let needsUpdate = false;
      files.forEach(file => {
        const fullPath = path.join(process.cwd(), file);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes("import Navbar from './components/Navbar'")) {
            console.log(`   ⚠️  ${file} needs Navbar update`);
            needsUpdate = true;
          }
        }
      });
      
      return !needsUpdate;
    },
    action: 'Replace Navbar imports with NavbarOptimized in all page components',
  },
  {
    name: 'Check for .html links',
    check: () => {
      // This would need to scan JSX files for .html links
      return false; // Manual check required
    },
    action: 'Search for .html in href attributes and update to React Router paths',
  },
  {
    name: 'Verify build configuration',
    check: () => {
      const configPath = path.join(process.cwd(), 'vite.config.js');
      if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf8');
        return content.includes('manualChunks');
      }
      return false;
    },
    action: 'vite.config.js should have manual chunks configuration',
  },
];

console.log('📋 Checking optimization status...\n');

let allComplete = true;
tasks.forEach((task, index) => {
  const status = task.check();
  const icon = status ? '✅' : '❌';
  console.log(`${icon} ${task.name}`);
  if (!status) {
    console.log(`   → ${task.action}\n`);
    allComplete = false;
  }
});

console.log('\n' + '='.repeat(60));

if (allComplete) {
  console.log('\n🎉 All optimizations complete! Ready to build.\n');
  console.log('Next steps:');
  console.log('  1. npm run build');
  console.log('  2. npm run preview');
  console.log('  3. Test all routes');
  console.log('  4. Deploy to production\n');
} else {
  console.log('\n⚠️  Some tasks still need attention. See above for details.\n');
  console.log('After completing manual tasks:');
  console.log('  1. Run this script again to verify');
  console.log('  2. npm run build');
  console.log('  3. npm run preview\n');
}

console.log('📚 For detailed information, see:');
console.log('  - OPTIMIZATION_REPORT.md');
console.log('  - OPTIMIZATION_CHECKLIST.md');
console.log('  - SETUP_GUIDE.md\n');
