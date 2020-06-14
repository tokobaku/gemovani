/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import { AudioAction, changeAudio } from 'Store/audio/Audio.action';
import { ReduxState } from 'Store';
import { TourPageContainerParams } from 'Route/TourPage/TourPage.container';
import { Tour } from 'Store/Tours/Tours.action';
import Asset from 'Helper/Asset';
import __ from 'Helper/__';

import 'Component/Audio/Audio.style';

export const mapDispatchToProps = (dispatch: React.Dispatch<AudioAction>): DispatchProps => ({
    changeAudio: (audio: string | null): void => dispatch(changeAudio(audio))
});

export const mapStateToProps = (state: ReduxState): StateProps => ({
    audio: state.AudioReducer.audio,
    tours: state.ToursReducer.tours,
    configAudio: state.ConfigReducer.config.gemovani_sound
});

export interface StateProps {
    audio: string | null;
    tours: Tour[];
    configAudio: string | null;
}

export interface DispatchProps {
    changeAudio: (audio: string | null) => void;
}

export interface AudioProps extends RouteComponentProps<TourPageContainerParams>, StateProps, DispatchProps {}

export interface AudioState {
    isPaused: boolean;
}

export class Audio extends React.PureComponent<AudioProps, AudioState> {
    audioRef = React.createRef<HTMLAudioElement>();

    constructor(props: AudioProps) {
        super(props);

        this.state = {
            isPaused: true
        };

        this.onAudioButtonClick = this.onAudioButtonClick.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<AudioProps>, prevState: Readonly<AudioState>): void {
        const { audio: prevAudio } = prevProps;
        const { audio: currentAudio } = this.props;
        const { isPaused: prevIsPaused } = prevState;
        const { isPaused } = this.state;

        if (prevAudio !== currentAudio && this.audioRef.current) {
            (this.audioRef.current as HTMLAudioElement).load();
            if (!isPaused) {
                (this.audioRef.current as HTMLAudioElement).play();
            }
        }

        if (prevIsPaused !== isPaused) {
            if (isPaused) {
                (this.audioRef.current as HTMLAudioElement).pause();
            } else {
                (this.audioRef.current as HTMLAudioElement).play();
            }
        }
    }

    onAudioButtonClick(): void {
        this.grantPermission();

        const { isPaused } = this.state;

        this.setState({ isPaused: !isPaused });
    }

    grantPermission(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (!window.permissionGranted) {
            const context = new AudioContext();
            context.resume()
                .then(() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    window.permissionGranted = true;
                });
        }
    }

    render(): React.ReactNode {
        const {
            location: { pathname },
            audio,
            configAudio,
            tours,
            changeAudio
        } = this.props;

        const { isPaused } = this.state;

        if (/^\/tour\/.*/.test(pathname) && tours) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            const { groups: { urlKey } } = /^\/tour\/(?<urlKey>[-\d\w]+)/.exec(location.pathname);
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            changeAudio(tours.find((tour) => tour.url_key === urlKey)?.audio);
        } else {
            changeAudio(configAudio);
        }

        if (audio) {
            return (
                <>
                    <Helmet>
                        <meta property="og:audio" content={`${location.hostname}${Asset.getAudioUrl(audio)}`} />
                    </Helmet>
                    <button
                        block="Audio"
                        mods={{ isPaused }}
                        onClick={this.onAudioButtonClick}
                        aria-label={__('Play audio')}
                    />
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <audio loop ref={this.audioRef}>
                        <source src={Asset.getAudioUrl(audio)} />
                    </audio>
                </>
            );
        }

        return <div />;
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Audio));
