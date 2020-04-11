/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

const DELETE_FORM_ID = 'delete-form';
const DELETE_ALL_ACTION_ID = 'delete-all';
const ENTITIES_FIELD_ID = 'entities-field';
const MARK_ALL_CHECKBOX_ID = 'mark-all';

export default class Grid {
    constructor() {
        this.onMarkAllClick = this.onMarkAllClick.bind(this);
        this.onDeleteActionClick = this.onDeleteActionClick.bind(this);

        this.addEventListeners();
    }

    addEventListeners() {
        const markAll = document.querySelector(`#${MARK_ALL_CHECKBOX_ID}`);
        const deleteAction = document.querySelector(`#${DELETE_ALL_ACTION_ID}`);

        markAll.addEventListener('click', this.onMarkAllClick);
        deleteAction.addEventListener('click', this.onDeleteActionClick);
    }

    onMarkAllClick() {
        const markAll = document.querySelector(`#${MARK_ALL_CHECKBOX_ID}`);
        document.querySelectorAll('.MarkEntity').forEach((marker) => {
            marker.checked = markAll.checked;
        });
    }

    /**
     *
     * @param {Event} event
     */
    onDeleteActionClick(event) {
        const markedEntities = [];
        document.querySelectorAll('.MarkEntity')
            .forEach((markedEntity) => {
                if (markedEntity.checked) {
                    markedEntities.push(markedEntity.dataset.rowId);
                }
            });

        if (markedEntities.length && confirm(this.getConfirmDeleteMessage(markedEntities.length))) {
            const deleteForm = document.querySelector(`#${DELETE_FORM_ID}`);
            const entitiesValueInput = document.querySelector(`#${ENTITIES_FIELD_ID}`);

            entitiesValueInput.value = JSON.stringify(markedEntities);
            deleteForm.submit();
            return;
        }

        if (markedEntities.length === 0) {
            alert(this.getNothingToDeleteMessage());
        }
    }

    /**
     * @param {number} itemsCount
     * @return {string}
     */
    getConfirmDeleteMessage(itemsCount) {
        return `Are you sure you want to delete ${itemsCount} items? This can not be undone`;
    }

    getNothingToDeleteMessage() {
        return 'Please select items to delete';
    }
}

/**
 * @return {Grid}
 */
window.createGrid = () => new Grid();
