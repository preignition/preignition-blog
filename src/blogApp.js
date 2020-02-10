import { html, css, LitElement } from 'lit-element';
import { Router } from '@vaadin/router';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js'
import { Base } from './base.js';


/*
  Blog App container

  root element containing Blog application
 */


class BlogApp extends Base {
  static get styles() {
    return [
    super.styles, 
    css`
      :host {
        --paper-tabs-selection-bar-color: var(--accent-color);
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        margin: 0;
        color: var(--primary-text-color, #212121);
  
      }

      .sub-title {
        color: var(--secondary-text-color);
      }

     
      paper-tabs {
         background-color: var(--primary-color);
         color: #fff;
      }

      paper-tab[link] a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color: #fff;
        text-decoration: none;
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
      
      @media screen and (max-width: 992px) {
        #main {
          display: block;
        }
        #main > nav, 
        #main > aside {
          max-width: initial;  
        }
      }
    `];
  }

  render() {
    return html`
      ${this.activeTab === 'articles' ? html `
      <header>
        <h1 class="title">${this.appTitle}</h1>
        <h3 class="sub-title">${this.appSubTitle}</h2>
      </header>` : ''}
      
      
      <div id="main">
        <section>
          ${this.activeTab === 'article' ? html`<preignition-article .language="${this.language}" .articleID="${this.articleID}"></preigntion-article>` : ''}
          ${this.activeTab === 'articles' ? html`<preignition-articles .language="${this.language}" ></preigntion-articles>` : ''}
        </section>
        <!--aside>
           <h3>Aside</h3>
           <preignition-blog-aside></preigntion-blog-aside>
        </aside-->
      </div>

      <div id="actions"></div>
      
      <!--footer>
          <h3>Footer</h3>
      </footer-->    
  
      <div id="outlet">
      </div>
    `;
  }

  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean },

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

      /*
       * `blogName` give this blog a name
       * usefull for registering users
       */
      blogName: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    // this.activeTab = location.pathname === '/' ? 'articles' : location.pathname.replace('/', '');
    this.tabs = ['articles', 'article', 'article-edit'];
    // this.activeTab = 'articles';
    this.language = 'en';

    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  setRouter() {
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

  firstUpdated() {
    this.setRouter();
    if (location.pathname.startsWith(this.baseURL)) {
      Router.go(location.pathname);   
    } else {
      this.activeTab = "articles";
    }
    
  }

  onTabChanged(e) {
    this.log && console.info(e);
    const {selectedItem} = e.target;
    if (selectedItem && selectedItem.querySelector('[href]')) {
      const href = selectedItem.querySelector('[href]').getAttribute('href')
      Router.go(`${this.baseURL || ''}${href}`)
    }
  }

  switchRoute(route) {
    Router.go(`/${route}`); 
  }

}

export default BlogApp;

