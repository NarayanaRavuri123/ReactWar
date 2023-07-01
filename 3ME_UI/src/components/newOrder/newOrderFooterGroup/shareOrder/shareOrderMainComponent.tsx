import { ReactNode, useContext, useState } from "react";
import { Popup } from "../../../../core/popup/popup.component";
import { SharedOrderModal } from "./shareOrder.enum";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { ShareOrder } from "./shareOrder.component";
import "./shareOrder.css";
import { ShareOrderInvite } from "./shareOrderInvite/shareOrderInvite.component";
import { ShareSuccess } from "./shareSuccess.component";
import {
  defaultShareOrderInivte,
  IshareOrderInvite,
} from "./shareOrderInvite/shareOrderInvite.interface";
import { IOptionsProps } from "../../../../core/searchInput/searchInput.interface";

type IShareOrderProps = {
  handleSaveAndShare?: Function;
  vacOrderID?: string;
  isMyPatientFlow?: boolean;
};

export const ShareOrderInfo = ({
  handleSaveAndShare,
  vacOrderID,
  isMyPatientFlow,
}: IShareOrderProps) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [shareOrderInviteSucess, setShareOrderSuccessInvite] = useState(false);
  const [addshareOrderInvite, setAddShareOrderInvite] =
    useState<IshareOrderInvite>(defaultShareOrderInivte);
  const [searchInputVal, setSearchInputVal] = useState<string>("");
  const [showNoResults, setShowNoResults] = useState<boolean>(false);
  const [shareOrderOptions, setShareOrderOptions] = useState<
    Array<IOptionsProps>
  >([]);
  const [selectedUsers, setSelectedUsers] = useState<Array<IOptionsProps>>([]);
  const [noteForUsers, setNoteForUsers] = useState<string>("");
  const [noteError, setNoteError] = useState<boolean>(false);

  const closePopupHandler = () => {
    NewOrderObj?.setshareOrderPopup(false);
    setSearchInputVal("");
    setShareOrderOptions([]);
    setSelectedUsers([]);
    setNoteForUsers("");
    setNoteError(false);
    setShowNoResults(false);

    setAddShareOrderInvite(defaultShareOrderInivte);
    setShareOrderSuccessInvite(false);
  };

  const searchAddshareOrderSection = () => {
    let page: ReactNode;
    switch (NewOrderObj?.shareOrderAddPopUpSection) {
      case SharedOrderModal.SHARE_ORDER:
        page = (
          <ShareOrder
            setShareOrderOpen={NewOrderObj?.setshareOrderPopup}
            handleShareOrderType={handleShareOrderType}
            searchInputVal={searchInputVal}
            setSearchInputVal={setSearchInputVal}
            showNoResults={showNoResults}
            setShowNoResults={setShowNoResults}
            shareOrderOptions={shareOrderOptions}
            setShareOrderOptions={setShareOrderOptions}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
            noteForUsers={noteForUsers}
            setNoteForUsers={setNoteForUsers}
            noteError={noteError}
            setNoteError={setNoteError}
            handleSaveAndShare={handleSaveAndShare}
            vacOrderID={vacOrderID}
            isMyPatientFlow={isMyPatientFlow}
          />
        );
        break;
      case SharedOrderModal.SHARE_ORDER_INIVITE_3M:
        page = (
          <ShareOrderInvite
            handleShareOrderType={handleShareOrderType}
            setShareOrderSuccessInvite={setShareOrderSuccessInvite}
            addshareOrderInvite={addshareOrderInvite}
            setAddShareOrderInvite={setAddShareOrderInvite}
          />
        );
        break;
      case SharedOrderModal.SHARE_ORDER_INVITE_SUCESS:
        page = (
          <ShareSuccess
            isShareOrderInvite={shareOrderInviteSucess}
            addshareOrderInvite={addshareOrderInvite}
            closePopupHandler={closePopupHandler}
          />
        );
        setTimeout(() => {
          closePopupHandler();
        }, 5000);
        break;
    }
    return page;
  };

  const handleShareOrderType = (section: SharedOrderModal) => {
    NewOrderObj?.setshareOrderAddPopUpSection(section);
  };

  return (
    <div>
      <Popup
        openFlag={NewOrderObj?.shareOrderPopup}
        closeHandler={() => {
          closePopupHandler();
        }}
        dialogParentClass={NewOrderObj?.shareOrderAddPopUpSection}
      >
        {searchAddshareOrderSection()}
      </Popup>
    </div>
  );
};
