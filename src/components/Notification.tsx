import { MessageType } from "../App"


export default function Notification({ msgType, content }: MessageType) {
    if (content === null) return null
    return (
        <div className={msgType}>
            <p>{content}</p>
        </div>
    )
}