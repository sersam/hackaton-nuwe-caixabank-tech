import '@testing-library/jest-dom/extend-expect';

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn();

global.ResizeObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };