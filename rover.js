class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
 
   receiveMessage(message) {
     let response = {
       message: message.name,
       results: []
     };
 
     for (let command of message.commands) {
       let result = {completed: false};
 
       switch(command.commandType) {
         case 'STATUS_CHECK':
           result.completed = true;
           result.roverStatus = {
             mode: this.mode,
             generatorWatts: this.generatorWatts,
             position: this.position
           };
           break;
         case 'MODE_CHANGE':
           this.mode = command.value;
           result.completed = true;
           break;
         case 'MOVE':
           if (this.mode === 'NORMAL') {
             this.position = command.value;
             result.completed = true;
           }
           break;
       }
 
       response.results.push(result);
     }
 
     return response;
   }
 }
 
 module.exports = Rover;
 
