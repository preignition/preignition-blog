import { LitElement, html, css } from 'lit-element';
import { Base } from './base.js';


class ArticleAuthor extends Base {

  static get styles() {
    return [
      super.styles,
      css `
      :host {
        display: block;
        --author-image-size: 40px;
      }

      img {
        border: solid white 2px;
        height: var(--author-image-size, 40px);
        width: var(--author-image-size, 40px);
        display: inline-block;
        background-color: #dadce0;
        border-radius: 50%;
        flex-shrink: 0;
        margin: 0 12px 0 0;
        object-fit: cover;
        overflow: hidden;
        max-width: 100%;
        vertical-align: middle;
      }

      .photo {
        border: solid white 2px;
        border-radius: 50%;
        height: var(--author-image-size, 40px);
        width: var(--author-image-size, 40px);
        margin-left: calc(-1 * var(--author-image-size, 40px) / 2);
        overflow: hidden;
        position: relative;
      }

      .photos {
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: reverse;
        -ms-flex-direction: row-reverse;
        flex-direction: row-reverse;
        margin: 0px calc(var(--author-image-size, 40px) / 4) 0px calc(var(--author-image-size, 40px) / 2);
      }

      .authors {
        display: flex;
        margin-bottom: 20px;
        font-size: 14px;
      }
      .names-date {
        flex: 1;
        margin-left: 15px;
      }

      .date {
        color: var(--secondary-text-color, #737373);
      }
      `


    ];
  }

  static get properties() {
    return {
      ...super.properties,

      /*
       * `articleID` 
       */
      articleID: {
        type: String,
        attribute: 'article-id'
      },

      /*
       * `editors` [{userId, displayName, photoURL}] array, the first item is the owner
       */
      editors: {
        type: Array,
      },

      /*
       * `timestamp` when was the article published
       */
      timestamp: {
        type: Number,
      },
    }
  }

  render() {
    return html `
      <lit-firebase-document log path="/access/resource/user/${this.articleID}/byType/article" @data-changed="${this.onUser}"></lit-firebase-document>
      <lit-firebase-document path="/resourceMeta/${this.articleID}/published/timestamp" @data-changed="${ e => {this.timestamp = e.detail.value}}"></lit-firebase-document>
      <div class="authors">
        <div class="photos">
          ${(this.editors || [] ).map(editor => html`<div class="photo"><img src="${editor.photoURL}" alt="${editor.displayName}"></div>`).reverse()}
        </div>
        <div class="names-date">
          <div class="names"><span>${(this.editors || [] ).map(editor => editor.displayName).join(', ')}</span>
          </div>
          <div class="date">${new Date(this.timestamp).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) }</div>
        </div>
      </div>
    
    `;
  }

  async onUser(e) {
    const users = e.detail.value;
    this.editors = await Promise.all(Object.keys(users)
      .sort((a, b) => users[a].owner ? -1 : 1)
      .map(async k => {
        const editor = await {
          userID: k,
          displayName: await firebase.database().ref(`/userData/profile/${k}/displayName`).once('value').then(snap => snap.val()),
          photoURL: await firebase.database().ref(`/userData/profile/${k}/photoURL`).once('value').then(snap => snap.val())
        }
        return editor;
      }))
  }
}

export default ArticleAuthor;
