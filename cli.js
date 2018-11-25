#!/usr/bin/env node
/**
 * Main installer file for QGulp
 */

'use strict';

global.__basedir = __dirname;

const install = require('./install/installer');

install();
