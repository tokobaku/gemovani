/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import { AudioAction } from 'Store/audio/Audio.action';

export interface AudioReducerInterface {
    audio: string | null;
}

export const initialState: AudioReducerInterface = {
    audio: null
};

const AudioReducer = (state = initialState, action: AudioAction): AudioReducerInterface => {
    if (action.type === 'AUDIO_ACTION') {
        return {
            audio: action.audio
        };
    }

    return state;
};

export default AudioReducer;
