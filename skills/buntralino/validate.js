// Validation script for Buntralino skill
// This script validates that the skill structure is correct

import { existsSync } from 'fs';
import { join } from 'path';

const skillDir = process.cwd();
const requiredFiles = [
  'SKILL.md',
  'references/client-api.md',
  'references/server-api.md',
  'references/examples.md',
  'references/error-handling.md',
  'scripts/basic-integration.js',
  'scripts/file-processing.js',
  'scripts/realtime-dashboard.js',
  'scripts/authentication.js'
];

console.log('🔍 Validating Buntralino skill structure...\n');

let allValid = true;

for (const file of requiredFiles) {
  const filePath = join(skillDir, file);
  const exists = existsSync(filePath);
  
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  
  if (!exists) {
    allValid = false;
  }
}

console.log('\n📋 Validation Results:');
if (allValid) {
  console.log('✅ All required files are present!');
  console.log('✅ Skill structure is valid');
  console.log('\n🎉 Buntralino skill is ready for use!');
} else {
  console.log('❌ Some required files are missing');
  console.log('❌ Please check the skill structure');
  process.exit(1);
}

// Check SKILL.md frontmatter
import { readFileSync } from 'fs';

try {
  const skillContent = readFileSync(join(skillDir, 'SKILL.md'), 'utf8');
  
  if (skillContent.includes('---') && skillContent.includes('name: buntralino')) {
    console.log('✅ SKILL.md has valid frontmatter');
  } else {
    console.log('❌ SKILL.md missing valid frontmatter');
    allValid = false;
  }
  
  if (skillContent.includes('buntralino.run') && skillContent.includes('buntralino.registerMethod')) {
    console.log('✅ SKILL.md contains core API examples');
  } else {
    console.log('❌ SKILL.md missing core API examples');
    allValid = false;
  }
  
} catch (error) {
  console.log('❌ Could not read SKILL.md:', error.message);
  allValid = false;
}

if (allValid) {
  console.log('\n🚀 Skill validation completed successfully!');
} else {
  console.log('\n❌ Skill validation failed');
  process.exit(1);
}