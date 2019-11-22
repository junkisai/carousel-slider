import { LitElement, html } from '@polymer/lit-element';

class TestCard extends LitElement {
  static get properties() {
    return {
      src: { type: String, reflect: true },
      text: { type: String, reflect: true }
    };
  }
  
  constructor() {
    super();
    this.src = '';
    this.text = '';
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }

        div {
          position: relative;
          width: 100%;
          height: auto;
          padding-bottom: 75%;
          background-color: #eee;
        }

        img {
          position: absolute;
          width: 100%;
          height: 80%;
        }

        p {
          position: absolute;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          top: calc(75% + 14px);
          width: 100%;
          height: calc(25% - 14px);
          margin: 0;
          font-size: 20px;
        }
      </style>
      <div>
        <img src="${this.src}" />
        <p>${this.text}</p>
      </div>
    `;
  }
}

window.customElements.define('test-card', TestCard);
