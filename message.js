class Message {
   constructor(name, commands) {
     if (typeof name === 'undefined' || name === null) {
       throw Error('Name required.');
     }
     this.name = name;
     this.commands = commands;
   }
 }
 
 module.exports = Message;
 
