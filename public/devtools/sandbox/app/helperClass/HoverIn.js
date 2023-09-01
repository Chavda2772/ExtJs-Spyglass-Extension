export class HoverIn {
    constructor(id) {
        var element = document.getElementById(id);

        if (element) {
            // Element Details
            var cordinates = element.getBoundingClientRect();
            var parentDiv = document.createElement('div');

            parentDiv.id = 'Spyglass-ghost';
            parentDiv.style.height = cordinates.height + 'px';
            parentDiv.style.width = cordinates.width + 'px';
            parentDiv.style.top = cordinates.top + 'px';
            parentDiv.style.left = cordinates.left + 'px';
            parentDiv.style.backgroundColor = '#a0c5e8a8';
            parentDiv.style.border = '2px solid red';
            parentDiv.style.position = 'absolute';
            parentDiv.style.zIndex = '9999999';
            parentDiv.style.boxSizing = 'border-box';
            parentDiv.classList.add('Spyglass-hover-in');

            document.body.appendChild(parentDiv);
        }

        return {
            success: true
        }
    }
}