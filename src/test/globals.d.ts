import type { Expectation, mockFunction, spyOn } from './setup.js';

declare global {
  function expect(actual: unknown): Expectation;
  const mock: {
    fn: typeof mockFunction;
    spyOn: typeof spyOn;
  };
}

export {};
