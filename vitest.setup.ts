import '@testing-library/dom';
import { expect, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with @testing-library/jest-dom matchers
expect.extend(matchers);

// Polyfill for HTMLDialogElement methods (jsdom doesn't support dialog yet)
beforeAll(() => {
  if (typeof HTMLDialogElement === 'undefined') {
    // @ts-ignore
    global.HTMLDialogElement = class HTMLDialogElement extends HTMLElement {
      open = false;
      returnValue = '';

      showModal() {
        this.open = true;
      }

      show() {
        this.open = true;
      }

      close(returnValue = '') {
        this.open = false;
        this.returnValue = returnValue;
      }
    };
  } else {
    HTMLDialogElement.prototype.showModal = HTMLDialogElement.prototype.showModal || function(this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.show = HTMLDialogElement.prototype.show || function(this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = HTMLDialogElement.prototype.close || function(this: HTMLDialogElement, returnValue = '') {
      this.open = false;
      this.returnValue = returnValue;
    };
  }
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
