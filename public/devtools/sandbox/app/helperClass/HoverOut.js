export class HoverOut {
    constructor() {
        var element = document.getElementById('Spyglass-ghost');

        if (element) {
            element.remove();
        }

        return {
            success: true,
        }
    }
}