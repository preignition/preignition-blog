import { html } from 'lit-element';
import { Base } from './base.js';

class PreignitionArticle extends Base {

  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    return html`
      <!-- template content -->
      <p>article ${this.articleID}</p>
    `;
  }

  static get properties () {
    return {

      ...super.properties, 

      articleID: {
        type: String, 
        attribute: 'article-id'
      },

      location: {
        type: Object
      }
    }
  }
}

export default PreignitionArticle;
