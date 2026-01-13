#!/usr/bin/env node

import { execSync } from 'child_process';

function getLatestTag() {
  try {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function getCommitsSinceTag(tag) {
  if (!tag) {
    return execSync('git log --pretty=format:"%s"', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .slice(0, 50);
  }

  return execSync(`git log ${tag}..HEAD --pretty=format:"%s"`, { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);
}

function categorizeCommits(commits) {
  const features = [];
  const fixes = [];
  const docs = [];
  const chore = [];
  const breaking = [];

  for (const commit of commits) {
    const lower = commit.toLowerCase();

    if (lower.includes('breaking') || lower.includes('!:')) {
      breaking.push(commit);
    } else if (lower.startsWith('feat') || lower.includes('feature') || lower.includes('add')) {
      features.push(commit);
    } else if (lower.startsWith('fix') || lower.includes('bug') || lower.includes('issue')) {
      fixes.push(commit);
    } else if (lower.startsWith('docs') || lower.includes('readme') || lower.includes('documentation')) {
      docs.push(commit);
    } else {
      chore.push(commit);
    }
  }

  return { features, fixes, docs, chore, breaking };
}

function formatCommitMessage(commit) {
  // Remove type prefix if present (feat:, fix:, etc.)
  return commit.replace(/^(feat|fix|docs|chore|refactor|style|test|build|ci|perf|revert)(\(.+\))?:\s*/i, '').trim();
}

function generateReleaseNotes(version, previousTag = null) {
  const commits = getCommitsSinceTag(previousTag);
  const { features, fixes, docs, chore, breaking } = categorizeCommits(commits);

  let notes = `🚀 **Mikey Pro Style Guide v${version}**\n\n`;

  if (breaking.length > 0) {
    notes += '## ⚠️ Breaking Changes\n\n';
    for (const commit of breaking) {
      notes += `- ${formatCommitMessage(commit)}\n`;
    }
    notes += '\n';
  }

  if (features.length > 0) {
    notes += '## ✨ Features\n\n';
    for (const commit of features) {
      notes += `- ${formatCommitMessage(commit)}\n`;
    }
    notes += '\n';
  }

  if (fixes.length > 0) {
    notes += '## 🐛 Fixes\n\n';
    for (const commit of fixes) {
      notes += `- ${formatCommitMessage(commit)}\n`;
    }
    notes += '\n';
  }

  if (docs.length > 0) {
    notes += '## 📚 Documentation\n\n';
    for (const commit of docs) {
      notes += `- ${formatCommitMessage(commit)}\n`;
    }
    notes += '\n';
  }

  if (chore.length > 0 && chore.length <= 10) {
    notes += '## 🔧 Other Changes\n\n';
    for (const commit of chore.slice(0, 10)) {
      notes += `- ${formatCommitMessage(commit)}\n`;
    }
    notes += '\n';
  }

  notes += '## 📦 Packages Published\n\n';
  notes += `- \`@mikey-pro/eslint-config@${version}\`\n`;
  notes += `- \`@mikey-pro/eslint-config-react@${version}\`\n`;
  notes += `- \`@mikey-pro/eslint-config-vue@${version}\`\n`;
  notes += `- \`@mikey-pro/eslint-config-svelte@${version}\`\n`;
  notes += `- \`@mikey-pro/eslint-config-angular@${version}\`\n`;
  notes += `- \`@mikey-pro/prettier-config@${version}\`\n`;
  notes += `- \`@mikey-pro/stylelint-config@${version}\`\n`;
  notes += `- \`mikey-pro@${version}\`\n`;

  return notes;
}

async function main() {
  const version = process.argv[2];

  if (!version) {
    console.error('Usage: node generate-release-notes.js <version>');
    process.exit(1);
  }

  const previousTag = getLatestTag();
  const notes = generateReleaseNotes(version, previousTag);

  console.log(notes);

  // Output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    const { appendFile } = await import('fs/promises');
    // Use heredoc format for multiline output
    await appendFile(process.env.GITHUB_OUTPUT, `release_notes<<EOF\n${notes}\nEOF\n`);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
