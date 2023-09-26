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
            parentDiv.classList.add('Spyglass-hover-in');

            document.body.appendChild(parentDiv);
        }
        else {
            return {
                success: false,
                message: 'Element not found!!'
            }
        }

        return {
            success: true
        }
    }
}