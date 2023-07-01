import { IVideoContent } from "./videoContent.interface";

export interface IMainSection {
    title: string,
    image: string,
    text : string,
    video: IVideoContent
}