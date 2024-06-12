/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../public/login.html'), 'utf8');

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, userId: '12345' })
  })
);

describe('Login Interface', () => {
  let emailInput;
  let passwordInput;
  let loginButton;
  let registerButton;
  let handleAuth;

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

    emailInput = document.getElementById('email');
    passwordInput = document.getElementById('password');
    loginButton = document.getElementById('login-button');
    registerButton = document.getElementById('register-button');

    // Mock window.location
    delete window.location;
    window.location = { href: '' };

    const loginScript = require('../public/js/login.js');
    handleAuth = loginScript.handleAuth;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('DOM elements should be present', () => {
    console.log('Verifying DOM elements presence');
    expect(emailInput).not.toBeNull();
    expect(passwordInput).not.toBeNull();
    expect(loginButton).not.toBeNull();
    expect(registerButton).not.toBeNull();
  });

  test('handleAuth should call fetch with correct parameters for login', async () => {
    console.log('Testing handleAuth for login');
    const email = 'test@example.com';
    const password = 'password';
    emailInput.value = email;
    passwordInput.value = password;

    await handleAuth('login');

    await new Promise(process.nextTick); // Wait for async operations

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/login', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }));
    expect(global.localStorage.setItem).toHaveBeenCalledWith('userId', '12345');
    expect(window.location.href).toBe('index.html');
  });

  test('handleAuth should call fetch with correct parameters for register', async () => {
    console.log('Testing handleAuth for register');
    const email = 'test@example.com';
    const password = 'password';
    emailInput.value = email;
    passwordInput.value = password;

    await handleAuth('register');

    await new Promise(process.nextTick); // Wait for async operations

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/register', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }));
    expect(global.localStorage.setItem).toHaveBeenCalledWith('userId', '12345');
    expect(window.location.href).toBe('index.html');
  });
});
