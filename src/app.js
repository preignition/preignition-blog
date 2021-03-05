import { html, css, LitElement } from 'lit-element';
import { cache } from 'lit-html/directives/cache.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { Base } from './base.js';

import '@material/mwc-fab';
import routerMixin from '@preignition/preignition-router';
// import '@material/mwc-icon';

const ROUTES = [{
  path: 'articles',
  component: document.createElement('div'),
  render: function(info) {
    console.info('articles');
    this.page = 'articles';
  }
}, {
  path: 'article/:articleId',
  component: document.createElement('div'),
  render: function(info) {
      console.info('article', info.params.articleId);
      this.page = 'article';
      this.articleId = info.params.articleId;
    }
  }];

/*
  Blog App container

  root element containing Blog application
 */

class App extends routerMixin(Base, ROUTES) {
  static get styles() {
    return [
      super.styles,
      css `
      :host {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        margin: 0;
        color: var(--primary-text-color, #212121);
  
      }

      .sub-title {
        color: var(--secondary-text-color);
      }

     
      
      /* we used <div id="main"> instead of <main> 
       * because we want to keep main at appliction level.
       */
      #main {
        display: flex;
        flex: 1;
        box-sizing: border-box;
      }
      #main > * {
        box-sizing: border-box;
      }
      
      #main > section {
        flex: 1;
      }
      
      #main > nav, 
      #main > aside {
        flex: 0 0 20vw;
        max-width: 380px;  
      }
      
      #main > nav {
        order: -1;
      }
      
      header, footer {
        // background: var(--light-primary-color);
        height: 20vh;
      }

      header {
        text-align: center;
      }

      header .title {
        margin-top: 20px;
        font-size: 60px;
      }
      
      header, footer, article, nav, aside, section {
        padding: 1em;
      }
      
      #actions {
        position: fixed;
        right: 24px;
        bottom: 24px;
        --mdc-theme-secondary: var(--accent-color);
        -webkit-box-align: end;
        align-items: flex-end;
        display: flex;
        flex-direction: column;
        position: fixed;
        z-index: 100;
      }

      #actions > *  {
        margin-top: 20px;
      }

      #subscribe {
        --mdc-theme-secondary: var(--light-theme-background-color, #fff);
        --mdc-theme-on-secondary: var(--accent-color, $000);

      }

      
      @media screen and (max-width: 992px) {
        #main {
          display: block;
        }
        #main > nav, 
        #main > aside {
          max-width: initial;  
        }
      }
    `
    ];
  }

  render() {
    return html `
      <!-- <app-route .route="${this.route}" id="mainRoute" pattern="/:channel/:page" @data-changed="${this.onRouteData}"></app-route> -->
      <!-- <app-route .route="${this.route}" pattern="/:channel/article/:articleId" @data-changed="${this.onRouteDataArticle}"></app-route> -->
      <router-slot @changestate="${this.changestate}"></router-slot>
      ${this.page === 'articles' ? html `
      <header>
        <h1 class="title">${this.appTitle}</h1>
        <h3 class="sub-title">${this.appSubTitle}</h2>
      </header>` : ''}
      
      <div id="main">
        <section>
        ${cache(
          this.page === 'article' ?
            html`<pblog-article .language="${this.language}" .articleId="${this.articleId}"></pblog-article>` :
            this.page === 'articles' ?
              html`<pblog-articles 
                .path="${this.blogType === 'local' ? this.getLocalPath(this.channel, this.entityId) : this.getGlobalPath(this.channel)}" 
                .language="${this.language}" ></pblog-articles>` : ''
         )}
        </section>
        <!--aside>
           <h3>Aside</h3>
           <preignition-blog-aside></preigntion-blog-aside>
        </aside-->
      </div>

      <div id="actions">
        ${this.canEdit ? html `<mwc-fab ?extended=${!this.smallScreen} icon="edit" label="edit" @click="${this.onEdit}"></mwc-fab>` : ''}
        ${this.page === 'article' ? html `<mwc-fab ?extended=${!this.smallScreen} icon="share" label="share" @click="${this.onShare}"></mwc-fab>` : ''}
        <mwc-fab id="subscribe" ?extended=${!this.smallScreen} icon="mail_outline" label="subscribe" @click="${this.onSubscribe}"></mwc-fab>
      </div>
      
      <!--footer>
          <h3>Footer</h3>
      </footer-->    
  
    `;
  }

  static get properties() {
    return {
      ...super.properties,
      channel: { type: String },
      page: { type: String },
      pages: { type: Array },
      smallScreen: { type: Boolean },

      entityType: { type: String },
      entityId: { type: String, attribute: 'entity-id' },

      appTitle: {
        type: String,
        attribute: 'app-title',
        value: 'Ida-ta Blog'
      },

      appSubTitle: {
        type: String,
        value: 'Our latest news, updates, and stories about ida-ta',
        attribute: 'app-sub-title'
      },

      articleId: {
        type: String
      },
      /*
       * `baseURL`
       */
      baseURL: {
        type: String,
        attribute: 'base-url'
      },


      /*
       * `canEdit` true for users who can edit
       */
      canEdit: {
        type: Boolean,
        attribute: 'can-edit'
      },
    };
  }

  constructor() {
    super();
    // this.page = location.pathname === '/' ? 'articles' : location.pathname.replace('/', '');
    this.pages = ['articles', 'article', 'article-edit'];
    this.language = 'en';
    this.entityType = 'program';
    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  /*
   * @override router-mixin
   */
  changestate(e) {
    this.matchedRoute = e.detail.match;
    this.renderRoute(this.routes, this.matchedRoute);
  }

  getLocalPath(channel, id) {
     return `/${this.entityType}Data/channel/${id}/published/${channel}/byType/article`;
  }

  getGlobalPath(channel) {
    return `/channel/published/${channel}/byType/article`;
  }

  // get mainRoute() {
  //   const mainRoute = this.renderRoot.querySelector('#mainRoute')
  //   return mainRoute && mainRoute.route || {};
  // }

  // onRouteData(e) {
  //   this.updateComplete.then(() => {
  //     this.log && console.info('routeData', e.detail.value);
  //     this.routeData = e.detail.value;
  //     const {prefix} = this.mainRoute;
  //     const {page, channel} = this.routeData;
  //     if (!channel) {
  //       this.channel = this.channel || 'default';
  //       this.page = 'articles';
  //       window.history.pushState(window.history.state || {}, '',  `${prefix || ''}/${this.channel}/articles`);
  //       return
  //     }
  //     this.channel = channel;
  //     if (this.pages.indexOf(page) > -1) {
  //       this.page = page;
  //     } else {
  //       this.page = 'articles';
  //       window.history.pushState(window.history.state || {}, '',  `${prefix || ''}/${this.channel || 'default'}/articles`);
  //     }
  //   });
  // }

  // onRouteDataArticle(e) {
  //   this.updateComplete.then(() => {
  //     this.log && console.info('routeDataArticle', e.detail.value);
  //     const routeData = e.detail.value;
  //     if (routeData.articleId) {
  //       this.articleId = routeData.articleId;
  //     }
  //   })
  // }

  onShare(e) {
    console.info('not yet implemented');
  }

  onEdit(e) {
    console.info('not yet implemented');
  }

  onSubscribe(e) {
    console.info('not yet implemented');
  }
}

export default App;
