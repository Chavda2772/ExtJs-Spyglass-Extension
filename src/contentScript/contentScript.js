import src from './logo.png';
import './content.css';

const html = `
<div class="crx">
  <img src="${chrome.runtime.getURL(src)}" />
</div>
`;

const doc = new DOMParser().parseFromString(html, 'text/html');
document.body.append(doc.body.firstElementChild);
