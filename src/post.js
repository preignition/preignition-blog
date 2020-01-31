import { html } from 'lit-element';
import { Base } from './base.js';

class PreignitionPost extends Base {

  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    return html`
      <!-- template content -->
      <p>Post ${this.location.params.postID}</p>
    `;
  }

  static get properties () {
    return {

      ...super.properties, 

      postID: {
        type: String, 
        attribute: 'post-id'
      },

      location: {
        type: Object
      }
    }
  }
}

export default PreignitionPost;
