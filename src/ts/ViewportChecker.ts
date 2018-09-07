/**
 * Interface for options Object.
 */
interface IOptions {
  classToAdd?: string;
  offset?: number;
}

/**
 * ViewportChecker class to check the scrolling position and 
 * add the class to the element in the specified position.
 */
export default class ViewportChecker {
  public options: IOptions = {
    classToAdd: 'visible',
    offset: 100
  };
  private window: Window = window;
  private windowHeigth: number;
  public element: HTMLElement;

  /**
   * Constructor.
   * 
   * @param selector - Selector of element 
   * @param userOptions - Object for user options
   */
  constructor(selector: string, userOptions?: IOptions) {
    if (userOptions) {
      this.options = {...this.options, ...userOptions};
    }
    this.windowHeigth = this.getWindowHeight();
    this.element = document.querySelector(selector);

    // Event for scrolling.
    window.onscroll = () => {
      this.windowHeigth = this.getWindowHeight();
      this.checkElements(this.element);
    };

    // Call the method by onload event.
    this.checkElements(this.element);
  }

  /**
   * Allows to get window height.
   * 
   * @return Window height
   */
  private getWindowHeight(): number {

    return this.window.innerHeight;
  }

  /**
   * Main menthod with all logic.
   * 
   * @param element - Element to add class
   */
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
