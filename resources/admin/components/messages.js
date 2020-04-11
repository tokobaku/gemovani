/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

/**
 * Time in ms to wait before removing messages
 * @type {number}
 */
const TIME_TO_REMOVE_MESSAGES_AFTER = 5000;

window.addEventListener('load', () => {
    setTimeout(
        () => {
            const messagesElement = document.querySelector('.Messages');
            if (messagesElement) {
                messagesElement.parentNode.removeChild(messagesElement);
            }
        },
        TIME_TO_REMOVE_MESSAGES_AFTER
    );
});
