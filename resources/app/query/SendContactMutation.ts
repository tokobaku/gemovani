/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { FetchGraphql } from 'Helper/FetchGraphql';

export interface OnSuccess {
    (response: Response): void;
}

/**
 * Get query strings for slides queries
 */
export class SendContactMutation {
    /**
     * get query string for querying all slides sorted by sortOrder
     */
    getSendEmailQuery(email: string, message: string): string {
        return `
        mutation {
            sendContact(email: "${email}", message: "${message}") {
                result
                message
            }
        }
        `;
    }

    sendEmailQuery(email: string, message: string, onSuccess: OnSuccess): void {
        new FetchGraphql().get(
            this.getSendEmailQuery(email, message),
            onSuccess
        );
    }
}

export default new SendContactMutation();
