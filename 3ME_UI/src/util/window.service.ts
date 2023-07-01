export class WindowService {
  private _window;
  constructor(_window = window) {
    this._window = _window;
  }
  scrollToTop() {
    return this._window.scrollTo(0, 0);
  }
  resize(resizeCallback: () => void) {
    this._window.onresize = resizeCallback;
  }
  getWidth() {
    return this._window.innerWidth;
  }
  openPdf(pdf: string | URL) {
    this._window.open(pdf, "_blank");
  }
}
