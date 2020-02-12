import { LitElement, html, css } from 'lit-element';
import  { default as marked}  from 'marked';
import { Base } from './base.js';

import { default as cardCss} from './styles/card.js';
import '@preignition/lit-firebase'


class  ArticleCard extends Base {

  static get styles() {
    return [
    super.styles, 
    cardCss,
    css `
      :host {
        display: block;
        border-sizing: border-box;
        position:relative;
      }

       a, :link, :visited {
        color: inherit;
        text-decoration: none;
      }

      .card {
        min-height: 100%;
        overflow: hidden;
      }

      .post-card {
        padding: 32px;
        position: relative;
      }

      .cover {
         margin: 0 0 12px;
      }


      .cover.no-image {
         margin-top: 32px;
      }

      .cover.with-image{
        margin-top: -3px;
      }

      .cover::before {
        background-color: var(--primary-color);
        content: '';
        display: block;
        height: 2px;
        position: absolute;
        top: 32px;
        width: 64px;
        z-index: -1;
      }

      .figure {
        align-items: center;
        background-color: var(--material--google-grey-100);
        display: flex;
        justify-content: center;
        margin: 0 0 16px;
        overflow: hidden;
        padding: 0;
        position: relative;
      }
  
      .image {
        height: 240px;
        max-width: 100%;
        min-width: 100%;
        object-fit: cover;
        border-radius: 5px;
      }

      .headline {
        margin-bottom: 20px;
        margin-top: 0;
      }

      .headline.with-image {
         font-weight: 200;
         font-size: 28px;
         line-height: 32px;
       }

      .desc {
        display: block;
        color: var(--secondary-text-color);
      }
    

      @media screen and (max-width: 768px) {
        .post-card {
          padding: 24px;
        }
        .cover.no-image::before {
          top: 24px;
        }

        .cover.with-image{
          margin-top: 32px;
        }


        .headline.with-image {
           font-size: 24px;
           line-height: 28px;
         }

         .headline.no-image {
           font-size: 28px;
           line-height: 32px;
         }  
      }


    `];
  }

  static get properties() {
    return {
      ...super.properties,

      /*
       * `articleId` 
       */
      articleId: {
        type: String,
        attribute: 'article-id'
      },

      /*
       * `language` 
       */
      language: {
        type: String
      },

      /*
       * `article` 
       */
      article: {
        type: Object,
      },


      /*
       * `thumbnail` 
       */
      thumbnail: {
        type: String,
      },

      /*
       * `alt` 
       */
      alt: {
        type: String,
      },

      /*
       * `title` 
       */
      title: {
        type: String,
      },

      /*
       * `summary` 
       */
      summary: {
        type: String,
      },
    }
  }

  render() {
    return html`
    <lit-firebase-document .log="${this.log}" path="/resources/published/article/${this.articleId}" @data-changed="${this.onPostChanged}"></lit-firebase-document>
    <lit-firebase-document .log="${this.log}" path="/locale/published/article/${this.articleId}/${this.language}/title" @data-changed="${e => {this.title = e.detail.value}}"></lit-firebase-document>
    <lit-firebase-document .log="${this.log}" path="/locale/published/article/${this.articleId}/${this.language}/summary" @data-changed="${e => {this.summary = e.detail.value}}"></lit-firebase-document>
    <lit-firebase-document .log="${this.log}" path="/locale/published/article/${this.articleId}/${this.language}/articleMainImageAlt" @data-changed="${e => {this.alt = e.detail.value}}"></lit-firebase-document>
    <a href="./article/${this.articleId}" class="card" title="">
       <article class="post-card">
        <div class="cover ${this.thumbnail ? ' with-image' : 'no-image'}">
          ${this.thumbnail && this.renderThumbnail(this.thumbnail, this.alt)}
          <h2 class="headline ${this.thumbnail ? ' with-image' : 'no-image'}">${this.title}</h2>
        </div>
          <preignition-article-author .articleId="${this.articleId}"></preignition-article-author>
          <div class="desc">
             ${html([marked(this.summary || '')])}
         </div>
      </article>
     </a>
    `;
  }

  renderThumbnail(thumbnail, alt) {
     return html`
      <figure class="figure">
        <img class="image"
          sizes="365px"
          src="${this.thumbnail}"
          alt="${this.alt}"
          width="100%"
          height="240"
          loading="lazy"
        />
      </figure>
    `;
  }

  onPostChanged(e) {
    const article = e.detail.value;
    this.thumbnail = article && article.articleMainImage && article.articleMainImage.url;
  }
}

export default ArticleCard;
