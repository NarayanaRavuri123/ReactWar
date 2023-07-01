import { IVideoContent } from "./videoContent.interface";

export interface IVideoSection {
    title: string,
    videos: Array<IVideoContent>
}