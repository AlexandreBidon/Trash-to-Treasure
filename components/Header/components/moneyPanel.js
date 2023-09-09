class MoneyPanel extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
        <div id="money_panel" style="
        display: flex;
        align-items: center;
        height: 100%;
        margin-left: 1vw;
        ">
            <div class="money_data" style="
            font-size: 3vw;
            ">
            </div>
            <img src="./img/menu/coin.png" style="
            height: 60%;
            aspect-ratio: 1;
            margin-left: 0.5vw;
            "/>
        </div>
      `;
    }
  }
  
  customElements.define('money-panel', MoneyPanel);