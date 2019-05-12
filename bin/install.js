#!/usr/bin/env node
const yargs = require('yargs');
const main = require('tsc-util');
const argv = yargs
    .options({
        watch: {
            alias: 'w',
            describe: 'Incrementally compile the TypeScript files.',
            type: 'boolean',
            default: false
        },
        logLevel: {
            alias: 'l',
            describe: 'Specify the log level',
            choices: [ 'error', 'warn', 'info', 'debug', 'trace' ],
            default: 'info'
        }
    })
    .help()
    .argv;

main.run(argv)
