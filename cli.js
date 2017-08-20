const
    yargs = require('yargs'),
    game = require('./app')

const flags = yargs.usage('$0: usage --run')
    .options('h', {
        alias: 'help',
        describe: 'displays help'
    })
    .options('d', {
        alias: 'difficulty',
        describe: 'sets the difficulty of the game',
        choices: ['easy', 'hard']
    })
    .argv


if (flags.help)
    yargs.showHelp()

if (flags.difficulty.easy='easy')
    game.easy()
