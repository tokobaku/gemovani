/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import Popup from './popup';

export const ELFINDER_POPUP_URL = '/elfinder/popup';

export default class SelectImagePopup extends Popup {
    /**
     * @param {{ onClose: function,
     * onCloseClick: function,
     * selector: string,
     * popupNode: Element,
     * closeButton: Element,
     * content: string|Element,
     * inputId: string,
     * onFileSelected(file): function
     * }} options
     */
    constructor(options) {
        super(options);
        const { inputId, onFileSelected } = options;

        this.onFileSelectedCallback = onFileSelected;
        this.inputId = inputId;
        this.popupNode.querySelector('.Popup-Content').innerHTML = this.getContent();
        this.onFileSelected = this.onFileSelected.bind(this);
        window.openedPopups[inputId] = this;
    }

    openPopup() {
        super.openPopup();
        this.refreshIframe();
        window.openedPopups = {
            ...window.openedPopups,
            [this.inputId]: this
        };
    }

    closePopup() {
        this.removeIframe();
        super.closePopup();
    }

    onFileSelected(file) {
        const sanitizedFile = this.sanitizeFilePath(file);
        document.querySelector(`#${this.inputId}`).value = sanitizedFile;
        this.onFileSelectedCallback(sanitizedFile);
        this.closePopup();
    }

    removeIframe() {
        const selectImagePopupWrapper = this.popupNode.querySelector('.SelectImagePopup');
        const iframe = selectImagePopupWrapper.querySelector('iframe');
        if (iframe) {
            selectImagePopupWrapper.removeChild(iframe);
        }
    }

    refreshIframe() {
        this.removeIframe();
        const selectImagePopupWrapper = this.popupNode.querySelector('.SelectImagePopup');
        selectImagePopupWrapper.innerHTML = this.getIframeHtml();
    }

    /**
     * @return {string}
     */
    getContent() {
        return `
        <div class="SelectImagePopup">
            ${this.getIframeHtml()}
        </div>
        `;
    }

    /**
     * @return {string}
     */
    getIframeHtml() {
        return `<iframe src="${ELFINDER_POPUP_URL}/${this.inputId}"></iframe>`;
    }

    /**
     * @param {string} file
     * @return {string}
     */
    sanitizeFilePath(file) {
        return file.replace(/public\//g, '');
    }
}

window.addEventListener('load', () => {
    /**
     * @param {{ onClose: function,
     * onCloseClick: function,
     * selector: string,
     * popupNode: Element,
     * closeButton: Element,
     * content: string|Element,
     * inputId: string,
     * onFileSelected(file): function
     * }} options
     * @return {SelectImagePopup}
     */
    window.createGalleryPopup = options => new SelectImagePopup(options);
    window.openedPopups = {};

    window.processSelectedFile = (file, inputId) => {
        const popup = window.openedPopups[inputId];
        if (!popup) {
            return;
        }

        popup.onFileSelected(file);
    };
});
