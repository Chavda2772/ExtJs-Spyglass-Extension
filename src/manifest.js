import { defineManifest } from '@crxjs/vite-plugin';

export default defineManifest({
    "name": "ExtJS Spyglass",
    "version": "1.0.0",
    "manifest_version": 3,
    "description": "Empower Sencha Ext JS developers with the ExtJS Spyglass Chrome extension. Easily inspect and debug Ext JS applications, navigate component hierarchies, modify properties in real-time, and gain deep insights into application behavior.",
    "devtools_page": "src/devtools/devtools.html",
    "minimum_chrome_version": "88",
    "permissions": ["tabs", "scripting", "activeTab", "offscreen"],
    "icons": {
        "16": "assets/img/icon16.png",
        "32": "assets/img/icon32.png",
        "48": "assets/img/icon48.png",
        "128": "assets/img/icon128.png"
    },
    "action": {
        "default_title": "ExtJS Spyglass",
        "default_icon": "assets/img/icon128.png",
        "default_popup": "src/popup/popup.html"
    },
    "background": {
        "service_worker": "src/backgroundService/backgroundService.js",
        "type": "module"
    },
    "content_scripts": [
        {
            "matches": ["http://*/*", "https://*/*"],
            "js": ["src/contentScript/contentScript.js"]
        }
    ],
    "sandbox": {
        "pages": ["src/devtools/sandbox/sandbox.html"]
    },
    "web_accessible_resources": [
        {
            "resources": [
                "public/assets/img/icon16.png",
                "public/assets/img/icon32.png",
                "public/assets/img/icon48.png",
                "public/assets/img/icon128.png",
                "public/assets/icon128-red.png",
                "public/assets/icon128-green.png"
            ],
            "matches": ["http://*/*", "https://*/*"]
        }
    ]
});
