import { Location } from "history";
import { useContext, useEffect, useState } from "react";
import { Prompt } from "react-router-dom";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { Popup } from "../../../core/popup/popup.component";
import "./userConfirmation.css";
import UserConfirmationDialogue from "./userConfirmationDialogue.component";

interface Props {
  when?: boolean | undefined;
  navigate?: (path: string) => void;
  shouldBlockNavigation: (location: Location) => boolean;
  handleSaveExit?: Function;
  handleUnloacVacOrder?: Function;
}
const UserConfirmation = ({
  when,
  navigate,
  shouldBlockNavigation,
  handleSaveExit,
  handleUnloacVacOrder,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleBlockedNavigation = (nextLocation: Location): boolean => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setModalVisible(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };
  const handleConfirmNavigationClick = async () => {
    setModalVisible(false);
    NewOrderObj?.setIsHandleChangeTriggered(false);
    NewOrderObj?.resetNewOrderForm();
    const responseObj = await handleUnloacVacOrder!();
    setConfirmedNavigation(responseObj);
  };
  const handleSaveExitNavigationClick = async () => {
    setModalVisible(false);
    const responseObj = await handleSaveExit!();
    setConfirmedNavigation(responseObj);
  };
  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      navigate!(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation]);

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      <Popup
        closeIconClass="closeIcon"
        closeHandler={() => closeModal()}
        openFlag={modalVisible}
      >
        <UserConfirmationDialogue
          closeModal={closeModal}
          handleConfirmNavigationClick={handleConfirmNavigationClick}
          handleSaveExitNavigationClick={handleSaveExitNavigationClick}
        />
      </Popup>
    </>
  );
};
export default UserConfirmation;
