/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export enum SortOrder {
    DESC = 'DESC',
    ASC = 'ASC'
}

export class OrderByClause {
    public field: string;

    public sortOrder: SortOrder;

    constructor(field: string, sortOrder: SortOrder) {
        this.field = field;
        this.sortOrder = sortOrder;
    }

    public build(): string {
        return `{ field: "${this.field}" order: ${this.sortOrder} }`;
    }
}
