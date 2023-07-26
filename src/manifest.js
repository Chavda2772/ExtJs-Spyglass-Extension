import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  name: 'ExtJS Component Inspector',
  version: '1.0.0',
  manifest_version: 3,
  description:
    'Chrome extension to inspect elements on a page; similar to Chrome DevTools',
  devtools_page: 'src/sidebarPanel/index.html',
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-32.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_title: 'Chrome Element Inspector',
    default_icon: 'img/logo-32.png',
    default_popup: '/src/popup/index.html',
  },
  background: {
    service_worker: '/src/background/index.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['/src/content/index.js'],
    },
  ],
  sandbox: {
    pages: ['/src/sidebarPanel/app.html'],
  },
  web_accessible_resources: [
    {
      resources: [
        'img/logo-16.png',
        'img/logo-32.png',
        'img/logo-48.png',
        'img/logo-128.png',
      ],
      matches: ['http://*/*', 'https://*/*'],
    },
  ],
  permissions: ['tabs', 'scripting', 'activeTab', 'devtools'],
  minimum_chrome_version: '69',
});
