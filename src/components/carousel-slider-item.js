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
          flex-shrink: 0;
        }

        ::slotted(:host) {
          width: 100%;
          height: 100%;
        }
      </style>
      <slot></slot>
    `;
  }
}

window.customElements.define('carousel-slider-item', CarouselSliderItem);
