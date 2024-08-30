const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  // Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  // Test 8
  it("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover(98382);
    let message = new Message('Test message', []);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message');
  });

  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });

  // Test 10
  it("responds correctly to status check command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Status check', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus).toEqual({mode: 'NORMAL', generatorWatts: 110, position: 98382});
  });

  // Test 11
  it("responds correctly to mode change command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Change mode', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toEqual('LOW_POWER');
  });

  // Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(98382);
    rover.mode = 'LOW_POWER';
    let commands = [new Command('MOVE', 12345)];
    let message = new Message('Move in LOW_POWER', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toEqual(98382);
  });

  // Test 13
  it("responds with position for move command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MOVE', 12345)];
    let message = new Message('Move', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toEqual(12345);
  });

});
