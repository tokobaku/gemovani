/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { OrderByClause, SortOrder } from 'Query/Types/OrderByClause';

/**
 * Get query strings for slides queries
 */
export class SlidesQuery {
    /**
     * get query string for querying all slides sorted by sortOrder
     */
    getAllSlides(orderByClause: OrderByClause = new OrderByClause('sortOrder', SortOrder.ASC)): string {
        return `
        query {
            slides(orderBy: ${orderByClause.build()}) {
                sortOrder
                image
                translations {
                    content
                    locale
                }
            }
        }
        `;
    }
};

export default new SlidesQuery();
