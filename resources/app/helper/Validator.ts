/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export default class Validator {
    private readonly input: string;

    public constructor(input: string) {
        this.input = input;
    }

    public isEmail(): boolean {
        // eslint-disable-next-line max-len
        return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
            .test(this.input);
    }

    public isNotEmpty(): boolean {
        return Boolean(this.input.trim());
    }
}
