let div = document.createElement('div');
div.id = 'spyglass-ext-details';
div.style.display = 'none';

div.innerHTML = JSON.stringify({
    isExtJs: !!window.Ext?.versions?.ext?.version,
    extJsVersion: window.Ext?.versions?.ext?.version ?? ''
});

document.body.appendChild(div);