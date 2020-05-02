/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { Config, ConfigAction, ConfigActionEnum } from 'Store/Config/Config.action';

export const DEFAULT_TITLE = 'Gemovani Villa';
export const DEFAULT_GEMOVANI_LOGO = '';

const initialState = {
    config: {
        title: DEFAULT_TITLE,
        // eslint-disable-next-line @typescript-eslint/camelcase
        gemovani_logo: DEFAULT_GEMOVANI_LOGO
    }
};

const ConfigReducer = (state: Config = initialState, action: ConfigAction): Config => {
    const { type, data } = action;

    if (type === ConfigActionEnum.UPDATE_CONFIG) {
        return {
            ...state,
            config: {
                ...data?.config,
                title: data?.config?.title || DEFAULT_TITLE
            }
        };
    }

    return state;
};

export default ConfigReducer;
