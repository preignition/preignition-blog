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

      <vaadin-tabs @selected-change="${this.tabChanged}" class="${this.smallScreen ? 'nav' : ''}" orientation="${this.smallScreen ? 'vertical' : 'horizontal'}" selected=${this.tabs.indexOf(this.activeTab)} theme="${this.smallScreen ? '' : 'centered'}">
        <vaadin-tab><a href="articles">articles</a></vaadin-tab>
        <vaadin-tab><a href="article/123">article 123 Link</a></vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('article/123')}>article</vaadin-tab>
      </vaadin-tabs>

      ${this.activeTab === 'articles'? html`<preignition-articles></preigntion-articles>` : ''}
      ${this.activeTab === 'article'? html`<preignition-article .articleID="${this.articleID}"></preigntion-article>` : ''}
      
      <div id="outlet">
      </div>
    `;
  }

  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean },

      articleID: {
        type: String
      },
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
    this.activeTab = location.pathname === '/' ? 'articles' : location.pathname.replace('/', '');
    this.tabs = ['articles', 'article', 'article-edit'];

    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'), {baseUrl: this.baseURL || '/'});
    router.setRoutes([
      {path: '/',  action: () => {
        this.articleID = '';
        this.activeTab = 'articles';
      },   _component: 'preignition-articles'},
      {path: '/articles', action: (context,commands) => {
        this.articleID = '';
        this.activeTab = 'articles';
        return commands.component('div') 
      }, _component: 'preignition-articles'},
      // Note(cg): below route (with action) does not worlk. See 
      {path: '/article/:articleID', action: (context, commands) =>  {
        console.info(context, commands);  
        this.articleID = context.params.articleID;
        this.activeTab = 'article';
        return commands.component('div') 
        // return context.next();
        // return html`<div>You've tried to access ${context.pathname}, but alas there is nothing there.</div>`
        }
      },
      {path: '/article-edit/:articleID',  component: 'preignition-article-edit'},
      {path: '(.*)', redirect: '/', action: () => {
        this.activeTab = 'articles';
        }
      }
    ], true);
  }

  tabChanged(e) {
    console.info('tabChanged', e.details);
  }

  switchRoute(route) {
    this.activeTab = route;
    Router.go(`/${route}`); 
  }

}

export default BlogApp;

