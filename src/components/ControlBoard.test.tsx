import React from 'react';
import {render} from 'react-dom';
import {act} from 'react-dom/test-utils';
import ControlBoard from './ControlBoard';
import fakeSample from '../__fixtures__/sample';

let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  container.remove();
  container = null;
});

it('gets samples with fake API', async () => {
  const fakeFetch = () => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeSample),
    });
  };

  jest.spyOn(global, 'fetch').mockImplementation(fakeFetch);

  act(() => {
    render(<ControlBoard />, container);
  });

  const input: HTMLInputElement | null = document.querySelector(
    "[data-testid='name']",
  );

  act( ()  => {
    if (input) {
      input.value = 'test';
    } else {
      throw Error("No input");
    }
  })

  const submit: HTMLInputElement | null = document.querySelector(
    "[data-testid='submit']",
  );
  act(() => {
    if (submit) {
        submit.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    } else {
      throw Error("No input");
    }
  });

  global.fetch.mockRestore();
});
