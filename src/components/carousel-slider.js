import { LitElement, html } from '@polymer/lit-element';

class CarouselSlider extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <style>
        .slider {
          width: 500px;
          height: 200px;
          overflow-y: hidden;
        }

        .slider .slideSet {
          display: flex;
          width: 2500px;
        }

        .slider .slide {
          width: 498px;
          height: 198px;
          border: solid 1px #f00;
        }
      </style>
      <div class="slider">
        <div class="slideSet" @track="${this.handleFlick}">
          <div class="slide">slide1</div>
          <div class="slide">slide2</div>
          <div class="slide">slide3</div>
          <div class="slide">slide4</div>
          <div class="slide">slide5</div>
        </div>
      </div>
    `;
  }

  handleFlick(e) {
    console.log(e);
  }

}

window.customElements.define('carousel-slider', CarouselSlider);
