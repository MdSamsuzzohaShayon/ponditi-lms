import { memo } from "react";

const VideoIcon = memo(() => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m9 8 6 4-6 4V8z" />
    </svg>
));

VideoIcon.displayName = 'VideoIcon';


export default VideoIcon;