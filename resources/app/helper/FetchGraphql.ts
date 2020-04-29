/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export interface FetchGraphqlCallback {
    (response: Response): void;
}

export const GRAPHQL_ENDPOINT = '/graphql';

export class FetchGraphql {
    get(query: string, onSuccess: FetchGraphqlCallback, onFailure: FetchGraphqlCallback|null = null): void {
        fetch('/graphql', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ query })
        }).then(onSuccess, onFailure);
    }
}

export default new FetchGraphql();
