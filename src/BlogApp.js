import { html, css, LitElement } from 'lit-element';

/*
  Blog App container

  root element containing Blog application
 */

export default class BlogApp extends LitElement {
  static get styles() {
    return css`
      :host {
      }
    `;
  }

  render() {
    return html`
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.counter = 5;
  }

  __increment() {
    this.counter += 1;
  }
}
