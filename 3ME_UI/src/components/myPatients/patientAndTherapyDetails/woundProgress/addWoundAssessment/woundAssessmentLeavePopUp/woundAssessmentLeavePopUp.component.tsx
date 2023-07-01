import { Location } from "history";
import { useContext, useEffect, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../../../../../context/WoundAssessmentContext";
import { LeaveWoundAssessment } from "../LeaveWoundAssessment/leaveWoundAssessment.component";
interface Props {
  when?: boolean | undefined;
  navigate?: (path: string) => void;
  shouldBlockNavigation: (location: Location) => boolean;
}
const WoundAssessmentLeavePopUp = ({
  when,
  navigate,
  shouldBlockNavigation,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const history = useHistory();
  const WoundAssessmentObj = useContext<WoundAssessmentContextType | null>(
    WoundAssessmentContext
  );
  const handleBlockedNavigation = (nextLocation: Location): boolean => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setModalVisible(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };
  const handleCancelLeavePopUp = async () => {
    setModalVisible(false);
  };
  const callHandlePageChange = () => {
    setConfirmedNavigation(true);
    WoundAssessmentObj?.setShowDialogWA(false);
    return true;
  };
  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      navigate!(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation]);
  return (
    <div data-testid="popupConfirm-div">
      <Prompt when={when} message={handleBlockedNavigation} />
      <LeaveWoundAssessment
        title={"Are you sure you want to leave this assessment?"}
        buttonTitle={"Leave Assessment"}
        handleCancelLeavePopUp={handleCancelLeavePopUp}
        cancelLeaveOpen={modalVisible}
        cancelConfirmText={"All changes will be lost"}
        backBtnText={"Back"}
        WoundAssessmentObj={WoundAssessmentObj}
        handlePageChange={callHandlePageChange}
      />
    </div>
  );
};
export default WoundAssessmentLeavePopUp;
