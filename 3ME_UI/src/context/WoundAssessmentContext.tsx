import { createContext, useState } from "react";
import { getDeepClone } from "../util/ObjectFunctions";
import { defaultAddWoundAssessment } from "../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/addWoundAssessment.model";
import { IAddWoundAssessment } from "../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/addWoundAssessment.interface";
import { IDropZoneDocumentSelect } from "../core/customDropZone/dropZoneDocumentSelect.interface";
import { WoundAssessmentPageSection } from "../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundAssessmentPageSection.enum";
import { IAttestationAndSign } from "../core/attestationAndSignature/attestationAndSign.interface";
import { woundAssessmentAttest } from "../components/myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/attestationAndSignature.model";

export type WoundAssessmentContextType = {
  addWoundAssessment: IAddWoundAssessment;
  setAddWoundAssessment: React.Dispatch<
    React.SetStateAction<IAddWoundAssessment>
  >;
  resetAddWoundAssessmentData: () => void;
  woundImagesUpload: IDropZoneDocumentSelect[];
  setwoundImagesUpload: React.Dispatch<
    React.SetStateAction<IDropZoneDocumentSelect[]>
  >;
  woundDocsUpload: IDropZoneDocumentSelect[];
  setwoundDocsUpload: React.Dispatch<
    React.SetStateAction<IDropZoneDocumentSelect[]>
  >;
  errorInImgUploadFiles: boolean;
  setErrorInImgUploadFiles: React.Dispatch<React.SetStateAction<boolean>>;
  errorInDocUploadFiles: boolean;
  setErrorInDocUploadFiles: React.Dispatch<React.SetStateAction<boolean>>;
  woundAssessmentPageSection: WoundAssessmentPageSection;
  setWoundAssessmentPageSection: React.Dispatch<
    React.SetStateAction<WoundAssessmentPageSection>
  >;
  woundAssessmentPageTitle: string;
  setWoundAssessmentPageTitle: React.Dispatch<React.SetStateAction<string>>;
  woundAssessmentProgress: number;
  setWoundAssessmentProgress: React.Dispatch<React.SetStateAction<number>>;
  directToWoundAssessment: boolean;
  setDirectToWoundAssessment: React.Dispatch<React.SetStateAction<boolean>>;
  isBackFromWoundPage: boolean;
  setIsBackFromWoundPage: React.Dispatch<React.SetStateAction<boolean>>;
  showDialogWA: boolean;
  setShowDialogWA: React.Dispatch<React.SetStateAction<boolean>>;
  WAPage: WoundAssessmentPageSection;
  setWAPage: React.Dispatch<React.SetStateAction<WoundAssessmentPageSection>>;
  isHandleChangeTriggered: boolean;
  setIsHandleChangeTriggered: React.Dispatch<React.SetStateAction<boolean>>;
  woundAssessAttestation: IAttestationAndSign;
  setWoundAssessAttestation: React.Dispatch<
    React.SetStateAction<IAttestationAndSign>
  >;
  scrollableComponentClassName: string | undefined;
  setScrollableComponentClassName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  saveWoundAssessmentLoader: boolean;
  setSaveWoundAssessmentLoader: React.Dispatch<React.SetStateAction<boolean>>;
  deletedWoundImagesDocuments: string[];
  setDeletedWoundImagesDocuments: React.Dispatch<
    React.SetStateAction<string[]>
  >;
  deletedWoundDocuments: string[];
  setDeletedWoundDocuments: React.Dispatch<React.SetStateAction<string[]>>;
  guid: string | null;
  setGuid: React.Dispatch<React.SetStateAction<string | null>>;
};

type WoundAssessmentContextProviderProps = {
  children: React.ReactNode;
};

export const WoundAssessmentContext =
  createContext<WoundAssessmentContextType | null>(null);

export const WoundAssessmentContextProvider = ({
  children,
}: WoundAssessmentContextProviderProps) => {
  const [addWoundAssessment, setAddWoundAssessment] =
    useState<IAddWoundAssessment>(getDeepClone(defaultAddWoundAssessment));
  const resetAddWoundAssessmentData = () => {
    setAddWoundAssessment(getDeepClone(defaultAddWoundAssessment));
    setWoundAssessmentPageSection(
      WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
    );
    setwoundImagesUpload([]);
    setwoundDocsUpload([]);
    setIsBackFromWoundPage(false);
    setWoundAssessmentProgress(20);
    setWoundAssessAttestation(woundAssessmentAttest);
    setScrollableComponentClassName(undefined);
    setSaveWoundAssessmentLoader(false);
  };
  const [showDialogWA, setShowDialogWA] = useState(false);
  const [woundImagesUpload, setwoundImagesUpload] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [woundDocsUpload, setwoundDocsUpload] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [errorInImgUploadFiles, setErrorInImgUploadFiles] = useState(false);
  const [errorInDocUploadFiles, setErrorInDocUploadFiles] = useState(false);
  const [woundAssessmentPageSection, setWoundAssessmentPageSection] =
    useState<WoundAssessmentPageSection>(
      WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
    );
  const [woundAssessmentPageTitle, setWoundAssessmentPageTitle] =
    useState("Wound Assessment");
  const [woundAssessmentProgress, setWoundAssessmentProgress] = useState(20);
  const [directToWoundAssessment, setDirectToWoundAssessment] = useState(false);
  const [isBackFromWoundPage, setIsBackFromWoundPage] = useState(false);
  const defaultWAPage = WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM;
  const [WAPage, setWAPage] =
    useState<WoundAssessmentPageSection>(defaultWAPage);
  const [isHandleChangeTriggered, setIsHandleChangeTriggered] = useState(false);
  const [woundAssessAttestation, setWoundAssessAttestation] =
    useState<IAttestationAndSign>(woundAssessmentAttest);
  const [scrollableComponentClassName, setScrollableComponentClassName] =
    useState<string | undefined>();
  const [saveWoundAssessmentLoader, setSaveWoundAssessmentLoader] =
    useState(false);
  const [deletedWoundImagesDocuments, setDeletedWoundImagesDocuments] =
    useState<string[]>([]);
  const [deletedWoundDocuments, setDeletedWoundDocuments] = useState<string[]>(
    []
  );
  const [guid, setGuid] = useState<string | null>(null);
  return (
    <WoundAssessmentContext.Provider
      value={{
        addWoundAssessment,
        setAddWoundAssessment,
        woundImagesUpload,
        setwoundImagesUpload,
        woundDocsUpload,
        setwoundDocsUpload,
        resetAddWoundAssessmentData,
        errorInImgUploadFiles,
        setErrorInImgUploadFiles,
        errorInDocUploadFiles,
        setErrorInDocUploadFiles,
        woundAssessmentPageSection,
        setWoundAssessmentPageSection,
        woundAssessmentPageTitle,
        setWoundAssessmentPageTitle,
        woundAssessmentProgress,
        setWoundAssessmentProgress,
        directToWoundAssessment,
        setDirectToWoundAssessment,
        isBackFromWoundPage,
        setIsBackFromWoundPage,
        showDialogWA,
        setShowDialogWA,
        WAPage,
        setWAPage,
        isHandleChangeTriggered,
        setIsHandleChangeTriggered,
        woundAssessAttestation,
        setWoundAssessAttestation,
        scrollableComponentClassName,
        setScrollableComponentClassName,
        saveWoundAssessmentLoader,
        setSaveWoundAssessmentLoader,
        deletedWoundImagesDocuments,
        setDeletedWoundImagesDocuments,
        deletedWoundDocuments,
        setDeletedWoundDocuments,
        guid,
        setGuid,
      }}
    >
      {children}
    </WoundAssessmentContext.Provider>
  );
};
