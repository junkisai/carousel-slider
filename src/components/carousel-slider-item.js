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
        :host {
          border: solid 1px #0fdf75;
          flex-shrink: 0;
        }

        ::slotted(img), ::slotted(div) {
          width: 100%;
          height: 100%;
        }
      </style>
      <slot></slot>
    `;
  }
}

window.customElements.define('carousel-slider-item', CarouselSliderItem);
