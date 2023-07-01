import { dataObject } from "./systemReq.components";
const sectionData: Array<dataObject> = [
  {
    sectionCode: "sysreqos",
    sectionHeader: "Minimum Operating System Requirements",
    sectionReqs: [
      "Windows 10",
      "iOS: Support is limited to last 4 versions of iOS. ",
      "Android: Support is limited to last 4 versions of Android.",
    ],
  },
  {
    sectionCode: "sysreqbrowser",
    sectionHeader: "Minimum Browser Requirements",
    sectionReqs: [
      "Microsoft Edge - Version x.x",
      "Google Chrome - Version x.x",
      "Firefox - Version x.x",
      "Safari - Version x.x",
      "Popup Blocker turned off",
      "High-speed internet connection or 4G Mobile Network",
    ],
  },
  {
    sectionCode: "sysreqrecos",
    sectionHeader: "Recommended Operating System Requirements",
    sectionReqs: [
      "Windows 10/11",
      "iOS & iPad iOS 14.0/15.0",
      "Android 11.0 /12.0",
    ],
  },
  {
    sectionCode: "sysreqrecbrowser",
    sectionHeader: "Recommended Browser Requirements**",
    sectionReqs: [
      "Microsoft Edge - Version x.x",
      "Google Chrome - Version x.x",
      "Firefox - Version x.x",
      "Safari - Version x.x",
      "Popup Blocker turned off",
      "High-speed internet connection or 4G/5G Mobile Network",
    ],
  },
  {
    sectionCode: "sysreqext",
    sectionHeader:
      "3M externally-facing digital properties are not typically compatible with:",
    sectionReqs: [
      "Browsers older than the most recent three releases.",
      "Desktop operating systems older than the most recent three releases.",
      "Mobile operating systems more than three years old.",
    ],
  },
];

export default sectionData;
