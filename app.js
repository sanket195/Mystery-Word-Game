const inquirer = require('inquirer')
const chalk = require('chalk')
const msg = require('./hw4_words.js');


module.exports.run = () => {
    const games = new MysteryWordGame()
    games.init()
}

let word = ''
const word1 = [];
let counter = 0; 
let guessword = []; 
let life = 4;  

module.exports.easy = () => {

    word = msg.easy[Math.floor(Math.random() * msg.easy.length)]

    for(let i=0; i<word.length; i++)
    {
        word1[i] = "_";
    }

    console.log(chalk.yellow('\n--------MYSTERY WORD GAME-------------------------\n\n'))
    console.log('\t',word1.join(" "));
    console.log(chalk.yellow('\n\n---------------------------------------'))
    const games = new MysteryWordGame()
    games.init()

}

module.exports.hard = () => {
    word = msg.hard[Math.floor(Math.random() * msg.hard.length)]
    for(let i=0; i<word.length; i++)
    {
        word1[i] = '_';
    }
    console.log(chalk.yellow('\n--------MYSTERY WORD GAME----------------------------\n\n'))
    console.log('\t',word1.join(" "));
    console.log(chalk.yellow('\n\n---------------------------------------'))
    const games = new MysteryWordGame()
    games.init()
}

class MysteryWordGame {
   
    init() {
        this.displayGame()
    }

    displayGame() {
        console.log('\n\n')
        inquirer.prompt([{
            name: 'question',
            message: 'What would you like to do?',
            type: 'list',
            choices: ['Guess a letter.', 'Get a hint.', 'View guessed letter.'],
            filter: (input) =>{
                return input;
            }        
        }]).then((input) => {
            if(input.question === 'Guess a letter.')
                this.guessLetter(input)
            else if(input.question === 'Get a hint.')
                this.getHint()
            else if(input.question === 'View guessed letter.')
                this.viewLetter()
        })

    }

guessLetter(input){
    const word2 = word.toLowerCase().split('')

    //console.log(word)
    console.log('\n')
    inquirer.prompt([{
            type: 'input',
            name: 'answer',
            message: 'Guess a letter.',
            filter: (input1) => {
                return input1
            }
        }]).then((input1) => {
            
            guessword += input1.answer.toUpperCase();
            if(word2.indexOf(input1.answer) > -1)
                for(let i=0; i<word2.length; i++)
                    {
                        if(word2[i] == input1.answer)
                        {
                            word1[i] = input1.answer;
                        }    
                    }    
                else
                {
                    counter++;
                    life--;
                    
                }
            
            console.log(chalk.yellow('\n--------MYSTERY WORD GAME---------------\n\n'))
            console.log('\n\t',word1.join(" ").toUpperCase());
            console.log(chalk.cyan('\n\nGuess remaining: ', life)) 
            console.log(chalk.yellow('---------------------------------------')) 

            
            if(word.toUpperCase() === word1.join('').toUpperCase())
            {
                console.log(chalk.green('\nYou won'))
                process.exit()
            }  
            
            if(counter==4){
                console.log(chalk.red('\nYou lost the game..'))
                console.log(chalk.yellow('correct word is: ',word.toUpperCase()))

            }
            else
             this.displayGame()  
        })

    
   
}

getHint(){

let temp={}

    for (let i=0;i<word.length;i++)
    {
        if (word[i] in temp)
        {
            temp[word[i]]=temp[word[i]]+1
        }
        else
        {
            temp[word[i]]=1
        }
    }

for(let i=0; i<word1.length; i++)
    {
        if(word1[i] === '_' && temp[word[i]]==1)
        {
            word1[i] = word[i]
            console.log(chalk.yellow('\n--------MYSTERY WORD GAME---------------\n\n'))
            console.log('\n\t',word1.join(" ").toUpperCase()); 
            console.log(chalk.cyan('\n\nGuess remaining: ', life))
            console.log(chalk.yellow('---------------------------------------'))
            if(word.toUpperCase() === word1.join('').toUpperCase())
            {
                console.log(chalk.green('\nYou won'))
                process.exit()
            }
            return this.displayGame()
        }
    }
for(let i=0; i<word1.length; i++)
    {
        if(word1[i] === '_' && temp[word[i]]>=2)
        {
            word1[i] = word[i]
            console.log(chalk.yellow('\n--------MYSTERY WORD GAME---------------\n\n'))
            console.log('\n\t',word1.join(" ").toUpperCase()); 
            console.log(chalk.cyan('\n\nGuess remaining: ', life))
            console.log(chalk.yellow('---------------------------------------'))
            if(word.toUpperCase() === word1.join('').toUpperCase())
            {
                console.log(chalk.green('\nYou won'))
                process.exit()
            }
            return this.displayGame()
        }
    }
    

    
return this.displayGame()
        
    
}

viewLetter(){

    console.log(chalk.blue('\n--------GUESSED LETTERS---------------\n\n'))
    console.log(chalk.blue('\t',guessword))
    console.log(chalk.blue('\n----------------------------------'))
    this.displayGame()
        
    }

}