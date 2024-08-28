const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

});

describe('Command', () => {
// This test checks if the constructor correctly sets the command type:It creates a Command with a type 'TEST_COMMAND' 
// It expects the commandType property of the created command to match 'TEST_COMMAND'

  test('constructor sets command type', () => {
    const commandType = 'TEST_COMMAND';
    const command = new Command(commandType);
    expect(command.commandType).toBe(commandType);
  });
});
//This test checks if the constructor correctly sets a second argument as a value:It creates a Command with type 'TEST_COMMAND' and a sample value { key: 'someValue' }
//It expects the value property of the created command to match the sample value

test('constructor sets a value passed in as the 2nd argument', () => {
  const commandType = 'TEST_COMMAND';
  const sampleValue = { key: 'someValue' };
  const command = new Command(commandType, sampleValue);
  expect(command.value).toBe(sampleValue);
});

