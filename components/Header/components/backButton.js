class CustomButton extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div>TEST</div>
        `;
      }
  }
  
customElements.define('custom-button', CustomButton);