/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export interface AudioAction {
    type: 'AUDIO_ACTION';
    audio: string | null;
}

export const changeAudio = (audio: string | null): AudioAction => ({
    type: 'AUDIO_ACTION',
    audio
});
