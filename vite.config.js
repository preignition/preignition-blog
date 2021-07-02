
// import VitePluginHtmlEnv from 'vite-plugin-html-env';
// https://vitejs.dev/config/
export default {
  build: {
    // minify: false,
    // brotliSize: false
  },
  server: {
    // proxy: {
    //   '/bower_component': {
    //       rewrite: (path) => path
    //   },
    // }
  },
  plugins: [
    // VitePluginHtmlEnv()
  ],
  resolve: {
    dedupe: [
      '@collaborne/lit-flexbox-literals',
        '@lit-element-bootstrap/breadcrumb',
        '@lit-element-bootstrap',
        '@material/mwc-base',
        '@material/mwc-base/form-element.js',
        '@material/mwc-button',
        '@material/mwc-checkbox',
        '@material/mwc-circular-progress-four-color',
        '@material/mwc-circular-progress',
        '@material/mwc-dialog',
        '@material/mwc-drawer',
        '@material/mwc-fab',
        '@material/mwc-formfield',
        '@material/mwc-icon-button',
        '@material/mwc-icon',
        '@material/mwc-icon',
        '@material/mwc-linear-progress',
        '@material/mwc-list',
        '@material/mwc-menu',
        '@material/mwc-notched-outline',
        '@material/mwc-radio',
        '@material/mwc-ripple',
        '@material/mwc-ripple/ripple-directive.js',
        '@material/mwc-select',
        '@material/mwc-snackbar',
        '@material/mwc-switch',
        '@material/mwc-tab-bar',
        '@material/mwc-tab',
        '@material/mwc-textarea',
        '@material/mwc-textfield',
        '@material/mwc-top-app-bar',
        '@material/mwc-top-app-bar-fixed',
        '@preignition/lit-firebase',
        '@preignition/multi-chart',
        '@preignition/multi-geo',
        '@preignition/multi-verse',
        '@preignition/preignition-analytics',
        '@preignition/preignition-app',
        '@preignition/preignition-colors',
        '@preignition/preignition-config',
        '@preignition/preignition-form',
        '@preignition/preignition-router',
        '@preignition/preignition-blog',
        '@preignition/preignition-mixin',
        '@preignition/preignition-state',
        '@preignition/preignition-styles',
        '@preignition/preignition-widget',
        'cronstrue',
        'crossfilter',
        'd3-array',
        'd3-array',
        'd3-axis',
        'd3-brush',
        'd3-chord',
        'd3-collection',
        'd3-color',
        'd3-contour',
        'd3-dispatch',
        'd3-drag',
        'd3-dsv',
        'd3-ease',
        'd3-fetch',
        'd3-force',
        'd3-format',
        'd3-format',
        'd3-geo-projection',
        'd3-geo',
        'd3-hexbin',
        'd3-hierarchy',
        'd3-interpolate',
        'd3-path',
        'd3-polygon',
        'd3-quadtree',
        'd3-random',
        'd3-random',
        'd3-scale-chromatic',
        'd3-scale',
        'd3-scale',
        'd3-selection-multi',
        'd3-selection',
        'd3-selection',
        'd3-shape',
        'd3-svg-legend',
        'd3-time-format',
        'd3-time-format',
        'd3-time',
        'd3-timer',
        'd3-tip',
        'd3-transition',
        'd3-transition',
        'd3-voronoi',
        'd3-zoom',
        'dompurify',
        'lit-element-state',
        'lit-element',
        'lit-html',
        'lit-html/directives/cache.js',
        'lit-html/directives/class-map.js',
        'lit-html/directives/if-defined.js',
        'lit-html/directives/style-map.js',
        'lit-html/directives/unsafe-html.js',
        'lit-html/directives/until.js',
        'lit-translate',
        'lite-youtube-embed',
        'marked',
        'marked',
        'reductio',
        'router-slot',
        'universe',
        'tslib'
    ]
  }
};
