/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export const CLOSE_BUTTON_CLASS = 'Popup-CloseButton';

/**
 * Makes it easier to work with generic modals
 * @class Popup
 */
export default class Popup {
    /**
     * @param {{ onClose: function,
     * onCloseClick: function,
     * selector: string,
     * popupNode: Element,
     * closeButton: Element,
     * content: string|Element
     * }} options
     */
    constructor(options = {}) {
        const {
            onClose,
            onCloseClick,
            selector,
            popupNode,
            content
        } = options;

        this.onClose = onClose;
        this.onCloseClick = onCloseClick;
        this.popupNode = popupNode || document.querySelector(selector);
        if (!this.popupNode) {
            this.popupNode = document.createElement('div');
            this.popupNode.innerHTML = this.getPopupHtml();
            document.body.appendChild(this.popupNode);
        }
        this.content = content;

        if (typeof content === 'string') {
            this.popupNode.querySelector('.Popup-Content').innerHTML = content;
        } else if (content instanceof Element) {
            this.popupNode.querySelector('.Popup-Content').innerHTML = '';
            this.popupNode.querySelector('.Popup-Content').appendChild(content);
        }

        this.setupListeners();
    }

    /**
     * @return {void}
     */
    setupListeners() {
        this.popupNode.querySelector(`.${CLOSE_BUTTON_CLASS}`)
            .addEventListener('click', this.onCloseClick || this.defaultOnCloseClick.bind(this));
    }

    /**
     * @return {void}
     */
    defaultOnCloseClick() {
        this.closePopup();
    }

    /**
     * @return {void}
     */
    closePopup() {
        this.popupNode.querySelector('.Popup').classList.add('Popup-Hidden');
        if (this.onClose) {
            this.onClose();
        }
    }

    /**
     * @return {void}
     */
    openPopup() {
        this.popupNode.querySelector('.Popup').classList.remove('Popup-Hidden');
    }

    destroy() {
        this.popupNode.parentNode.removeChild(this.popupNode);
    }

    /**
     * @return string
     */
    getPopupHtml() {
        return `
        <div class="Popup">
            <button class="${CLOSE_BUTTON_CLASS}">X</button>
            <div class="Popup-Content">
            </div>
        </div>
        `;
    }
}

/**
 *
 * @param {{ onClose: function,
 * onCloseClick: function,
 * selector: string,
 * popupNode: Element,
 * closeButton: Element,
 * content: string|Element
 * }} options
 * @return {Popup}
 */
window.createPopup = (options) => new Popup(options);
