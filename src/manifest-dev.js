import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  name: 'ExtJS Component Inspector',
  version: '1.0.0',
  manifest_version: 3,
  description:
    'Chrome extension to inspect elements on a page; similar to Chrome DevTools',
  devtools_page: 'sidebarPanel/index.html',
  host_permissions: ['scripting'],
  permissions: ['tabs', 'scripting', 'activeTab', 'devtools', 'offscreen'],
  minimum_chrome_version: '69',
  icons: {
    16: 'assets/img/logo-16.png',
    32: 'assets/img/logo-32.png',
    48: 'assets/img/logo-48.png',
    128: 'assets/img/logo-128.png',
  },
  action: {
    default_title: 'Chrome Element Inspector',
    default_icon: 'assets/img/logo-32.png',
    default_popup: 'popup/index.html',
  },
  background: {
    service_worker: 'background/index.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['content/index.js'],
    },
  ],
  sandbox: {
    pages: ['sidebarPanel/app.html'],
  },
  web_accessible_resources: [
    {
      resources: [
        'assets/img/logo-16.png',
        'assets/img/logo-32.png',
        'assets/img/logo-48.png',
        'assets/img/logo-128.png',
      ],
      matches: ['http://*/*', 'https://*/*'],
    },
  ],
});
