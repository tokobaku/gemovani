/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { AudioAction, changeAudio } from 'Store/audio/Audio.action';
import { ReduxState } from 'Store';
import { VillagePageUrlParams } from 'Route/VillagePage/VillagePage.container';
import { Village } from 'Store/Villages/Villages.action';
import Asset from 'Helper/Asset';

export const mapDispatchToProps = (dispatch: React.Dispatch<AudioAction>): DispatchProps => ({
    changeAudio: (audio: string | null): void => dispatch(changeAudio(audio))
});

export const mapStateToProps = (state: ReduxState): StateProps => ({
    audio: state.AudioReducer.audio,
    villages: state.VillagesReducer.villages,
    configAudio: state.ConfigReducer.config.gemovani_sound
});

export interface StateProps {
    audio: string | null;
    villages: Village[];
    configAudio: string | null;
}

export interface DispatchProps {
    changeAudio: (audio: string | null) => void;
}

export interface AudioProps extends RouteComponentProps<VillagePageUrlParams>, StateProps, DispatchProps {}

export class Audio extends React.PureComponent<AudioProps> {
    audioRef = React.createRef<HTMLAudioElement>();

    componentDidUpdate(prevProps: Readonly<AudioProps>): void {
        const { audio: prevAudio } = prevProps;
        const { audio: currentAudio } = this.props;

        document.addEventListener('click', () => {
            if (prevAudio !== currentAudio && this.audioRef.current && !window.permissionGranted) {
                const context = new AudioContext();
                context.resume()
                    .then(() => { window.permissionGranted = true; });

                (this.audioRef.current as HTMLAudioElement).load();
                (this.audioRef.current as HTMLAudioElement).play();
            }
        });
    }

    render(): React.ReactNode {
        const {
            location: { pathname },
            audio,
            configAudio,
            villages,
            changeAudio
        } = this.props;

        if (/^\/village\/.*/.test(pathname) && villages) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const { groups: { urlKey } } = /^\/village\/(?<urlKey>[-\d\w]+)/.exec(location.pathname);
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            changeAudio(villages.find((village) => village.url_key === urlKey)?.audio);
        } else {
            changeAudio(configAudio);
        }

        if (audio) {
            return (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <audio autoPlay loop ref={this.audioRef}>
                    <source src={Asset.getAudioUrl(audio)} />
                </audio>
            );
        }

        return '';
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Audio));
