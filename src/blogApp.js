import { html, css, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'
import { Base } from './base.js';
import '@vaadin/vaadin-tabs';
/*
  Blog App container

  root element containing Blog application
 */


class BlogApp extends Base {
  static get styles() {
    return css`
      :host {
      }
    `;
  }

  render() {
    return html`
      <h2>Blog App</h2>

      <vaadin-tabs class="${this.smallScreen ? 'nav' : ''}" orientation="${this.smallScreen ? 'vertical' : 'horizontal'}" selected=${this.tabs.indexOf(this.activeTab)} theme="${this.smallScreen ? '' : 'centered'}">
        <vaadin-tab><a href="posts">Posts</a></vaadin-tab>
        <vaadin-tab><a href="post/123">Post 123 Link</a></vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('post/123')}>Post</vaadin-tab>
      </vaadin-tabs>

      <div id="outlet">
      </div>
    `;
  }

  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean },

      /*
       * `baseURL` 
       */
      baseURL: {
        type: String,
        attribute: 'base-url'
      },
    };
  }

  constructor() {
    super();
    this.activeTab = location.pathname === '/' ? 'posts' : location.pathname.replace('/', '');
    this.tabs = ['posts', 'post', 'post-edit'];

    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'), {baseUrl: this.baseURL || '/'});
    router.setRoutes([
      {path: '/',     component: 'preignition-posts'},
      {path: '/posts',  component: 'preignition-posts'},
      {path: '/post/:postID',  component: 'preignition-post'},
      {path: '/post-edit/:postID',  component: 'preignition-post-edit'},
      {path: '(.*)', redirect: '/', action: () => {
        this.activeTab = 'posts';
        }
      }
    ]);
  }

  switchRoute(route) {
    this.activeTab = route;
    Router.go(`/${route}`); 
  }

}

export default BlogApp;

