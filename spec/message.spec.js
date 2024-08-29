const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {
  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect(function() {
      new Message();
    }).toThrow(new Error("Name required."));
  });

  it("constructor sets name", function() {
    let message = new Message('New message');
    expect(message.name).toBe('New message');
  });

  it("contains a commands array passed into the constructor as the 2nd argument", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    expect(message.commands).toEqual(commands);
  });
});
