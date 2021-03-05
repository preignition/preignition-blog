import { html, css } from 'lit-element';
import { parse } from '@preignition/preignition-util';
import { Base } from './base.js';

import '@lit-element-bootstrap/breadcrumb';

/**
 *  Display in individual blog article
 *
 * @element pblog-article
 */
class PreignitionArticle extends Base {
   static get styles() {
    return [
    super.styles,
    css `
      :host {
        display: block;
        border-sizing: border-box;
        position:relative;
      }

      .hero {
        object-fit: cover;
        display: block;
        margin: 0 auto;
        max-height: 480px;
        width: 100%;
        height: auto;
        max-width: 100%;
        vertical-align: middle;
        margin-bottom: 50px;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        margin: auto;
      }

      pblog-article-author {
        --author-image-size: 60px;
        margin-top: 50px;
        margin-bottom: 50px;
      }

      article.main {
        max-width: 920px;
        margin: auto;
      }

      .summary {
        color: var(--secondary-text-color);
      }

      bs-breadcrumb {
        background-color: inherit;
        --breadcrumb-padding-left: 0;
        --breadcrumb-item-link-color: var(--secondary-text-color);
        --breadcrumb-item-divider-content: "›";
      }

       @media screen and (max-width: 992px) {
        article.main {
            margin: 0 5vw;
          }
       }

      `];
   }


  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    return html`
      <lif-document .log="${this.log}" path="/resources/${this.state}/article/${this.articleId}" @data-changed="${e => {this.article = e.detail.value;}}"></lif-document>
      <lif-document .log="${this.log}" path="/locale/${this.state}/article/${this.articleId}/${this.language}" @data-changed="${e => {this.localeArticle = e.detail.value;}}"></lif-document>
      
      ${this.article && this.article.hero ? html `<img class="hero" src="${this.article && this.article.hero.url}" alt='${this.localeArticle && this.localeArticle.heroAlt}'>` : ''}  
      <article class="main">
        
         <nav>
          <bs-breadcrumb>
            <bs-breadcrumb-item title="Home" href="/"></bs-breadcrumb-item>
            <bs-breadcrumb-item title="All Articles" href="../articles" ></bs-breadcrumb-item>
          </bs-breadcrumb>
        </nav>

        ${this.localeArticle ?
          html `
            <h1 class="title">${this.localeArticle.title}</h1>
            <h3 class="summary">${parse(this.localeArticle.summary)}</h3>
            <pblog-article-author .articleId="${this.articleId}"></pblog-article-author>
            <div class="content">${parse(this.localeArticle.content)}</div>
            ` :
          html `<h3>Loading article ...</h3>`
        }
     </article>

    `;
  }

  static get properties() {
    return {

      ...super.properties,

      /**
       * the id of article
       * @type {String}
       */
      articleId: {
        type: String,
        attribute: 'article-id'
      },

      /**
       * article state to fetch
       * @type {'published'|'draft'}
       */
      state: {
        type: String,
        value: 'published'
      },

      article: {
        type: Object
      },

       localeArticle: {
        type: Object
      },

      language: {
        type: String
      }
    };
  }
}

export default PreignitionArticle;
