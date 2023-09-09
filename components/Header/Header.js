class Header extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="header_left">
                <money-panel/>
            </div>
            <div class="header_right">
                <div class="header_button" onclick="displayScene('museum')">
                    Back to gallery
                </div>
            </div>
        `;
      }
  }
  
customElements.define('custom-header', Header);