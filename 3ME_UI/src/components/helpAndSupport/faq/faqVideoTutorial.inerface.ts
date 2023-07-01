import { IFAQSection } from "./faqSection.interface";
import { IMainSection } from "./mainSection.interface";
import { IVideoSection } from "./videoSection.interface";

export interface IFAQVideoTutorial {
    main: IMainSection,
    faq: IFAQSection,
    videoTutorial: IVideoSection
}