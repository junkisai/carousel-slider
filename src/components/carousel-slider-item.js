import { LitElement, html } from '@polymer/lit-element';

class CarouselSliderItem extends LitElement {
  static get properties() {
    return {};
  }
  
  constructor() {
    super();
  }

  render() {
    return html`
      <style>
      </style>
      <div></div>
    `;
  }
}

window.customElements.define('carousel-slider-item', CarouselSliderItem);
