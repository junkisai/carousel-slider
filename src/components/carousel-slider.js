import { LitElement, html } from '@polymer/lit-element';
import { addListener, removeListener } from '@polymer/polymer/lib/utils/gestures';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

const emptyHandler = () => {};

/**
 * 求められる機能
 * - スワイプイベントでアイテムをスライド
 * - ループするカルーセル
 * 前提条件
 * - 内包するcarousel-slider-itemは等幅
 */
class CarouselSlider extends GestureEventListeners(LitElement) {
  static get properties() {
    return {
      loop: { type: Boolean, reflect: true },
      /**
       * 現在の表示アイテムidx
       */
      __idx: { type: Number },
      /**
       * Carouselのスクロール座標
       */
      __dx: { type: Number },
      /**
       * sliderさせる子コンポーネント群
       */
      __items: { type: Array },
      /**
       * ループを表現するために__itemsを拡張
       */
      __virtualItems: { type: Array },
    };
  }

  constructor() {
    super();
    this.loop = false;
    this.__idx = 0;
    this.__dx = 0;
    this.__items = [];
  }

  connectedCallback(...args) {
    super.connectedCallback(...args);
    addListener(this, 'track', emptyHandler);
  }

  disconnectedCallback(...args) {
    super.disconnectedCallback(...args);
    removeListener(this, 'track', emptyHandler);
  }

  firstUpdated() {
    this.__items = this.shadowRoot
      .querySelector('slot')
      .assignedNodes()
      .filter(elm => elm.tagName === 'CAROUSEL-SLIDER-ITEM');
    this.setVirtualItems();
  }

  setVirtualItems() {
    const newlist = this.loop ? [...this.__items.slice(this.__items.length - 1), ...this.__items, ...this.__items.slice(0, 1)] : [...this.__items];
    const list = this.shadowRoot.querySelector('.list');
    // <slot>タグ除去
    list.innerHTML = '';
    for (const dom of newlist) {
      const clone = dom.cloneNode(true);
      list.appendChild(clone);
    }
    this.__virtualItems = list.childNodes;
    console.log(this.__virtualItems[0].getBoundingClientRect());
    if (this.loop) {
      this.__idx = this.__items.length;
      this.__move(this.__idx);
    }
  }

  render() {
    return html`
      <style>
        .container {
          overflow: hidden;
        }

        .container .list {
          display: flex;
        }

        carousel-slider-item {
          margin: 8px;
        }

        @media screen and (max-width: 480px) {
          carousel-slider-item {
            width: calc(100% - 16px);
          }
        }

        @media screen and (min-width: 481px) {
          carousel-slider-item {
            width: 464px;
          }
        }
      </style>
      <div
        class="container"
        @track="${this.handleTrack}"
      >
        <div class="list" style="transform: translateX(${this.__dx}px)">
          <slot></slot>
        </div>
      </div>
    `;
  }

  /**
   * 
   * @param {CustomEvent} e 
   */
  handleTrack(e) {
    const { state, ddx } = e.detail;
    switch (state) {
      case 'start':
        break;
      case 'track':
        this.__dx = this.__dx + ddx;
        break;
      case 'end':
        const elm = this.shadowRoot.querySelector('.container');
        const domRect = elm.getBoundingClientRect();
        console.log(domRect);
        const baseCenterX = domRect.x + domRect.width / 2;
        let targetIdx = 0;
        let diffX = Number.MAX_VALUE;
        this.__virtualItems.forEach((elm, idx) => {
          const rect = elm.getBoundingClientRect();
          const centerX = rect.x + rect.width / 2;
          const _diffX = Math.abs(baseCenterX - centerX);
          if (_diffX < diffX) {
            diffX = _diffX;
            targetIdx = idx;
          }
        });
        if (this.loop) {
          if (targetIdx < 1) {
            targetIdx += this.__items.length;
          } else if (targetIdx > this.__items.length) {
            targetIdx -= this.__items.length
          }
        }
        this.__idx = targetIdx;
        this.__move(this.__idx);
        break;
    }
  }

  /**
   * carouselの座標をindexから計算して更新
   * @param {number} targetIdx
   * @private
   */
  __move(targetIdx) {
    const $itemElms = this.__virtualItems;
    if ($itemElms.length < 2) {
      return;
    }
    console.log($itemElms[0]);
    console.log($itemElms[0].getBoundingClientRect());
    const width = $itemElms[0].getBoundingClientRect().width;
    console.log(width);
    const margin =
      $itemElms[1].getBoundingClientRect().x -
      ($itemElms[0].getBoundingClientRect().x +
        $itemElms[0].getBoundingClientRect().width);
    console.log(margin);
    console.log(targetIdx);
    this.__dx = (width + margin) * targetIdx * -1;
  }
}

window.customElements.define('carousel-slider', CarouselSlider);
