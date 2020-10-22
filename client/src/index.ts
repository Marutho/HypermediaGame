const readline = require('readline');
const request = require('request');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'TBGE> '
});

var welcome = '\nWelcome to our game\n----THE BEST GAME EVER---\n';

var options = [
  "https://google.com",
  "https://youtube.com",
  "https://reddit.com"
];

var waiting = false;

console.log(welcome);
printOptions();

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
          }
          else{
            console.log(`Say what? I might have heard '${answer.trim()}'`);
            printOptions();
          }      
        }
        catch(err){
          console.log(`Say what? I might have heard '${answer.trim()}'`);
          printOptions();
        }      
        break;
    }
  }
}

function printOptions(){
  console.log("\nPlease select one of the given options\n");
  for (let index = 0; index < options.length; index++) {
    const element = options[index];
    console.log(`${index} - ${element}`)
  }
  rl.prompt();
}

function optionSelected(option){
  waiting = true;
  request
  .get(options[option], {timeout : 1500}, timeoutReceived)
  .on('response', responseReceived)
  .on('error', errorReceived);
}


function responseReceived(response){
  if(!waiting)return;
  waiting = false;
  console.log(response.statusCode) // 200
  console.log(response.headers['content-type']) // 'image/png'
  printOptions();  
}

function errorReceived(err){
  if(!waiting)return;
  waiting = false;
  console.log("There has been an error, please try again\n");
  printOptions();
}

function timeoutReceived(err){
  if(!waiting)return;
  waiting = false;
  console.log("Server not responding, please try again\n");
  printOptions();
}

function close(){
  console.log('Have a great day!');
  process.exit(0);
}