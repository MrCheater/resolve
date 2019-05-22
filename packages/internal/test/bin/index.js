#!/usr/bin/env node

const path = require('path')
const { execSync } = require('child_process')
const find = require('glob').sync

const { getResolveDir } = require('@internal/helpers')

for (const filePath of find('./packages/**/package.json', {
  cwd: getResolveDir(),
  absolute: true
})) {
  if (filePath.includes('node_modules')) {
    continue
  }
  if (
    filePath.includes('packages\\internal') ||
    filePath.includes('packages/internal')
  ) {
    continue
  }

  const directory = path.dirname(filePath)

  execSync(`yarn test`, {
    cwd: directory,
    stdio: 'inherit'
  })
}
