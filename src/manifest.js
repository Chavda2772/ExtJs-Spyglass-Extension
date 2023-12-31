import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
  name: 'ExtJS Spyglass',
  version: '1.0.0',
  manifest_version: 3,
  description:
    'Empower Sencha Ext JS developers with the ExtJS Spyglass Chrome extension. Easily inspect and debug Ext JS applications, navigate component hierarchies, modify properties in real-time, and gain deep insights into application behavior.',
  devtools_page: '/public/devtools/devtools.html',
  host_permissions: ['scripting'],
  permissions: [
    'tabs',
    'scripting',
    'activeTab',
    'devtools',
    'offscreen',
    '<all_urls>',
  ],
  minimum_chrome_version: '69',
  icons: {
    16: 'assets/img/logo-16.png',
    32: 'assets/img/logo-32.png',
    48: 'assets/img/logo-48.png',
    128: 'assets/img/logo-128.png',
  },
  action: {
    default_title: 'ExtJS Spyglass',
    default_icon: 'assets/img/logo-32.png',
    default_popup: '/public/popup/popup.html',
  },
  background: {
    service_worker: '/public/backgroundService/backgroundService.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['/public/contentScript/contentScript.js'],
    },
  ],
  sandbox: {
    pages: ['/public/devtools/sandbox/sandbox.html'],
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
