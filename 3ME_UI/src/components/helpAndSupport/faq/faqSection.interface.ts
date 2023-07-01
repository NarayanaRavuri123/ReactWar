import { IFAQContent } from "./faqContent.interface";

export interface IFAQSection {
    title: string,
    description: string,
    resources: Array<IFAQContent>
}