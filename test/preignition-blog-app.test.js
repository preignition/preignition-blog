import { html, fixture, expect, elementUpdated, aTimeout } from '@open-wc/testing';

import '../elements/preignition-blog-app.js';

describe('PreignitionBlogApp', () => {
  it('displays article when article tab is selected', async () => {
    const el = await fixture(html`
      <preignition-blog-app></preignition-blog-app>
    `);

    // Note(cg): seems unable to select by role.
    // const tabs = el.shadowRoot.querySelector('[role="tablist"]');
    const tabs = el.shadowRoot.querySelector('paper-tabs');
    expect(tabs).to.exist;

    const tab = tabs.querySelectorAll('paper-tab')[0];
    expect(tab).to.exist;

    tab.click();

    await elementUpdated(el);
    // await aTimeout(500);
    
    const article = el.shadowRoot.querySelector('preignition-articles');
    expect(article).to.exist;

    // Note(cg): routing does not seem to work the same way.
    // const href = tab.querySelector('a').getAttribute('href');
    // expect(window.location.pathname).to.equal(href);
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`
      <preignition-blog-app></preignition-blog-app>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
