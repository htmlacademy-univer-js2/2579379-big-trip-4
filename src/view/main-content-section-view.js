export class MainContentSectionView {
  section = document.querySelector('.trip-events');

  getElement() {
    if(!this.element) {
      this.element = this.section;
    }
    return this.element;
  }

  deleteElement() {
    this.element = null;
  }
}
