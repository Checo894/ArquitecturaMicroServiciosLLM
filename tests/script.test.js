/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ Conversation: [{ content: 'Test response from bot' }] })
  })
);

describe('Chatbot Interface', () => {
  let addMessage;
  let chatBox;
  let userInput;
  let sendButton;
  let logoutButton;

  beforeAll(() => {
    // Mock localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
        removeItem: jest.fn((key) => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; })
      };
    })();
    Object.defineProperty(global, 'localStorage', { value: localStorageMock });
  });

  beforeEach(() => {
    document.body.innerHTML = html;

    const script = require('../public/js/script.js');
    addMessage = script.addMessage;
    chatBox = script.chatBox;
    userInput = script.userInput;
    sendButton = script.sendButton;
    logoutButton = script.logoutButton;

    // Mock window.location
    delete window.location;
    window.location = { href: '' };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('DOM elements should be present', () => {
    console.log('Verifying DOM elements presence');
    expect(chatBox).not.toBeNull();
    expect(userInput).not.toBeNull();
    expect(sendButton).not.toBeNull();
    expect(logoutButton).not.toBeNull();
  });

  test('addMessage function should add a message to the chat box', () => {
    console.log('Testing addMessage function');
    const message = 'Hello, this is a test message!';
    addMessage(message, 'user-message');

    const messageElement = chatBox.querySelector('.user-message');
    expect(messageElement).not.toBeNull();
    expect(messageElement.textContent).toBe(message);
  });

  test('sendButton click event should call fetch with correct parameters', async () => {
    console.log('Testing sendButton click event');
    const userMessage = 'Test message';
    userInput.value = userMessage;
    global.localStorage.getItem.mockReturnValue('12345');

    sendButton.click();

    await new Promise(process.nextTick); // Wait for async operations

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/chat', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: '12345', input: userMessage })
    }));
  });

  test('logoutButton click event should clear userId and redirect to login.html', () => {
    console.log('Testing logoutButton click event');
    global.localStorage.getItem.mockReturnValue('12345');

    logoutButton.click();

    expect(global.localStorage.removeItem).toHaveBeenCalledWith('userId');
    expect(window.location.href).toBe('login.html');
  });
});


// /**
//  * @jest-environment jsdom
//  */

// const fs = require('fs');
// const path = require('path');
// const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

// // Mock fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve({ Conversation: [{ content: 'Test response from bot' }] })
//   })
// );

// describe('Chatbot Interface', () => {
//   let addMessage;
//   let chatBox;
//   let userInput;
//   let sendButton;
//   let logoutButton;

//   beforeAll(() => {
//     // Mock localStorage
//     const localStorageMock = (() => {
//       let store = {};
//       return {
//         getItem: jest.fn((key) => store[key] || null),
//         setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
//         removeItem: jest.fn((key) => { delete store[key]; }),
//         clear: jest.fn(() => { store = {}; })
//       };
//     })();
//     Object.defineProperty(global, 'localStorage', { value: localStorageMock });
//   });

//   beforeEach(() => {
//     document.body.innerHTML = html;

//     const script = require('../public/js/script.js');
//     addMessage = script.addMessage;
//     chatBox = script.chatBox;
//     userInput = script.userInput;
//     sendButton = script.sendButton;
//     logoutButton = script.logoutButton;

//     // Mock window.location
//     delete window.location;
//     window.location = { href: '' };
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('DOM elements should be present', () => {
//     expect(chatBox).not.toBeNull();
//     expect(userInput).not.toBeNull();
//     expect(sendButton).not.toBeNull();
//     expect(logoutButton).not.toBeNull();
//   });

//   test('addMessage function should add a message to the chat box', () => {
//     const message = 'Hello, this is a test message!';
//     addMessage(message, 'user-message');

//     const messageElement = chatBox.querySelector('.user-message');
//     expect(messageElement).not.toBeNull();
//     expect(messageElement.textContent).toBe(message);
//   });

//   test('sendButton click event should call fetch with correct parameters', async () => {
//     const userMessage = 'Test message';
//     userInput.value = userMessage;
//     global.localStorage.getItem.mockReturnValue('12345');

//     sendButton.click();

//     await new Promise(process.nextTick); // Wait for async operations

//     expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/chat', expect.objectContaining({
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ userId: '12345', input: userMessage })
//     }));
//   });

//   test('logoutButton click event should clear userId and redirect to login.html', () => {
//     global.localStorage.getItem.mockReturnValue('12345');

//     logoutButton.click();

//     expect(global.localStorage.removeItem).toHaveBeenCalledWith('userId');
//     expect(window.location.href).toBe('login.html');
//   });
// });
