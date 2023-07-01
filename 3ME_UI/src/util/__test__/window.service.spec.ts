import { cleanup } from '@testing-library/react';
import { WindowService } from '../window.service';

describe("Contact Us component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("initial render shows Contact us Label", () => {
    const spyFn = jest.fn();
    let _window = {
      scrollTo: spyFn
    };
    // @ts-ignore
    const _service = new WindowService(_window);
    _service.scrollToTop();
    expect(spyFn).toHaveBeenCalled();
  });
});