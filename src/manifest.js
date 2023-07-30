import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  name: 'ExtJS Component Inspector',
  version: '1.0.0',
  manifest_version: 3,
  description:
    'Chrome extension to inspect elements on a page; similar to Chrome DevTools',
  devtools_page: 'public/sidebarPanel/index.html',
  host_permissions: ['scripting'],
  permissions: ['tabs', 'scripting', 'activeTab', 'devtools', 'offscreen'],
  minimum_chrome_version: '69',
  icons: {
    16: 'public/assets/img/logo-16.png',
    32: 'public/assets/img/logo-32.png',
    48: 'public/assets/img/logo-48.png',
    128: 'public/assets/img/logo-128.png',
  },
  action: {
    default_title: 'Chrome Element Inspector',
    default_icon: 'public/assets/img/logo-32.png',
    default_popup: 'public/popup/index.html',
  },
  background: {
    service_worker: 'public/background/index.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['public/content/index.js'],
    },
  ],
  sandbox: {
    pages: ['public/sidebarPanel/app.html'],
  },
  web_accessible_resources: [
    {
      resources: [
        'public/assets/img/logo-16.png',
        'public/assets/img/logo-32.png',
        'public/assets/img/logo-48.png',
        'public/assets/img/logo-128.png',
      ],
      matches: ['http://*/*', 'https://*/*'],
    },
  ],
});
