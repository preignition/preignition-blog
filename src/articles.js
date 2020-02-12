import { html, css } from 'lit-element';
import { Base } from './base.js';

import '@preignition/lit-firebase'

class PreignitionArticles extends Base {

  static get styles() {
    return [
    super.styles,
    css `
      :host {
      
      }
      .grid {
        padding: 0 32px 64px;
        grid-template-columns: 1fr 1fr 1fr;  
        max-width: 1550px;
        -webkit-box-align: stretch;
        -webkit-box-direction: normal;
        -webkit-box-orient: horizontal;
        display: grid;
        -ms-flex-flow: row wrap;
        flex-flow: row wrap;
        grid-column-gap: 16px;
        grid-row-gap: 16px;
        margin: 0 auto;
     }

     .grid-item {
        overflow: hidden;
        padding: 4px;
        margin: -4px;
     }

      @media screen and (max-width: 992px) {
        .grid {
          padding: 0 0 32px;
          grid-template-columns: 1fr 1fr;  
          max-width: 940px;
        }        
      }

      @media screen and (max-width: 768px) {
        .grid {
          padding: 0 0 16px;
          grid-template-columns: 1fr;  
          max-width: 512px;
        }        
      }
    `
    ];
  };

  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    return html `
      <lit-firebase-query path="/resources/published/article" @data-changed="${this.onDataChanged}"></lit-firebase-query>
      <section class="grid">
          ${this.isLoading 
             ? html`<h3>Loading Blog articles...</h3>`
             : (this.articles.length === 0 || !this.articles)
               ?  `<h3>No articles yet!</h3>`
               : (this.articles).map( article => html`
                    <preignition-article-card .language="${this.language}" class='grid-item' .articleID="${article.$key}"></preignition-article-card>
                 `)
          }
       </section>
    `;
  }

  static get properties() {
    return {

      ...super.properties,

      articles: {
        type: Array
      },

      isLoading: {
        type: Boolean, 
        value: true
      },

      language: {
        type: String
      }

    }
  }

  onDataChanged(e) {
    this.log && console.info('onDataChanged', e.detail);
    this.isLoading = false;
    this.articles = e.detail.value;
  }

}

export default PreignitionArticles;
