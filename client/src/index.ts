const readline = require('readline');
const request = require('request');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'TBGE> '
});

var welcome = '\nWelcome to our game\n----THE BEST GAME EVER---\n';
var api_ep = "http://localhost:8080/api";
var game;

var options = [];

var waiting = false;

console.log(welcome);
request(api_ep+"/start", responseReceived);

rl.on('line',processAnswer)
.on('close', close);

function processAnswer(answer){
  if(answer)
  {
    switch (answer.trim()) {
      case 'exit':
        rl.close();
        break;
      default:
        try{
          var option = parseInt(answer);
          if(option < options.length && option >= 0)
          {
            optionSelected(answer);
            process.stdout.write('\x1Bc');
          }
          else{
            process.stdout.write('\x1Bc');
            console.log(`Say what? I might have heard '${answer.trim()}'`);
            printOptions();
          }      
        }
        catch(err){
          process.stdout.write('\x1Bc');
          console.log(`Say what? I might have heard '${answer.trim()}'`);
          printOptions();
        }      
        break;
    }
  }
}

function printOptions(){
  console.log("\nPlease select one of the given options (exit to quit)\n");
  for (let index = 0; index < options.length; index++) {
    const element = options[index];
    console.log(`${index} - ${element}`)
  }

  rl.prompt();
}

function optionSelected(option){
  request.post(api_ep+"/room/"+game.currentRoom.id+"/"+options[option],{form:JSON.stringify(game.player)}, responseReceived);
}


function responseReceived(erro, response, body){  
  waiting = false;
  game = JSON.parse(body);
  options = game.currentRoom.options;
  printOptions();  
}

function close(){
  console.log('Have a great day!');
  process.exit(0);
}