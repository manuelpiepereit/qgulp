#!/usr/bin/env node

/**
 * Main installer file for QGulp
 * @package QGulp
 * @version 0.1.0
 */

'use strict';

global.__basedir = __dirname;

const install = require('./install/installer');

install();
