/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Faq } from 'Store/Faqs/Faqs.action';
import FetchGraphql from 'Helper/FetchGraphql';

export class FaqsQuery {
    getFaqsQuery(): string {
        return `
        query {
            faqs {
                locale
                content
            }
        }`;
    }

    getFaqs(updateFaqs: (faqs: Faq[]) => void): void {
        FetchGraphql.get(
            this.getFaqsQuery(),
            (response) => {
                response.json().then(({ data }) => {
                    const faqs = data?.faqs;

                    if (faqs) {
                        updateFaqs(faqs);
                    }
                });
            }
        );
    }
}

export default new FaqsQuery();
