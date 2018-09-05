interface IOptions {
  classToAdd: string;
  offset: number;
}


export default class ViewportChecker {
  public options: IOptions = {
    classToAdd: 'visible',
    offset: 100
  };
  private window: Window = window;
  private windowHeigth: number;
  public element: HTMLElement;

  constructor(selector: string, userOptions?: IOptions) {
    this.options = {...this.options, ...userOptions};
    this.windowHeigth = this.getWindowHeight();
    this.element = document.querySelector(selector);

    window.onscroll = () => {
      this.windowHeigth = this.getWindowHeight();
      this.checkElements(this.element);
    };

    this.checkElements(this.element);
  }

  private getWindowHeight(): number {

    return this.window.innerHeight;
  }

  private checkElements(element: HTMLElement): void {
    const viewportStart: number = Math.max(
      document.body.scrollTop,
      document.querySelector('html').scrollTop,
      window.scrollY
    );
    const viewportEnd: number = (viewportStart + this.windowHeigth);
    
    const elementStart = Math.round(element.offsetTop) + this.options.offset;
    const elementEnd = elementStart + element.clientHeight;

    if ((elementStart < viewportEnd) && (elementEnd > viewportStart)) {
      element.classList.add(this.options.classToAdd);
    }
  }
}
