#!/usr/bin/env node

const path = require('path');
const spawn = require('child_process').spawn;
const exec = path.join(__dirname, 'deploy.sh');
const cp = spawn(exec, [], {
  cwd: process.cwd(),
  stdio: 'inherit'
});

cp.on('close', code => process.exit(code));
