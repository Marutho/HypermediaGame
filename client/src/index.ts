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

process.stdout.write('\x1Bc');
console.log(welcome);
request(api_ep+"/start", (erro, response, body) => {
  if(response.statusCode != 200){
    console.log("There has been an error, please try again\n");
  }
  else{
    game = JSON.parse(body);
  }
  
  printOptions();  
});

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
          if(option < game.options.length && option >= 0)
          {
            optionSelected(option);
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
  console.clear();
  console.log(game.message);
  console.log("\nPlease select one of the given options (exit to quit)\n");
  var index = 0;
  for( let key of game.options){    
    console.log(`${index} - ${key}`);
    index++;
  }

  rl.prompt();
}

function optionSelected(option){
  let options = {
    url : api_ep+game.endpoints[option],
    method: game.methods[option],
    json : true,
    body : game.player
  }
  request(options, responseReceived);  
}


function responseReceived(erro, response, body){  
  if(response.statusCode != 200){
    console.log("There has been an error, please try again\n");
  }
  else{
    if(body.options.length > 0)
      {
        game = body;
      }
      else{
        game.message = body.message;
      }
  }  
  printOptions();  
}

function close(){
  console.log('Have a great day!');
  process.exit(0);
}