/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export class ConfigQuery {
    getConfig(): string {
        return `
        query {
            config {
                title
                gemovani_logo
                about_us {
                    locale
                    content
                }
            }
        }
        `;
    }
}

export default new ConfigQuery();
