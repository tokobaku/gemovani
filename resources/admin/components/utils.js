/**
 * @author Tornike Bakuradze <tokobakuradze@gmail.com>
 */

export const VIDEO_ID_MATCH_INDEX = 7;

export const getVideoId = videoUrl => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = videoUrl.match(regExp);

    if (match && match[VIDEO_ID_MATCH_INDEX]) {
        return match[VIDEO_ID_MATCH_INDEX];
    }

    return null;
};

window.getVideoId = getVideoId;
