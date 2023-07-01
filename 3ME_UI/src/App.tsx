import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppWithRouterAccess from "./AppWithRouterAccess";
import Footer from "./components/footer/footer.component";
import { AuthContextProvider } from "./context/AuthContext";
import { DischargeRequestContextProvider } from "./context/DischargeRequestContext";
import { FacilitySettingsProvider } from "./context/FacilitySettingsContext";
import { MobileDisplayContextProvider } from "./context/MobileDisplayContext";
import { NewOrderContextProvider } from "./context/NewOrderContext";
import { PickUpRequestContextProvider } from "./context/PickUpRequestContext";
import { ProfileFormContextProvider } from "./context/ProfileFormContext";
import { RolesPermissionContextProvider } from "./context/RolesPermissionContext";
import { SendNoteContextProvider } from "./context/SendNoteContext";
import { SupplyOrderContextProvider } from "./context/SupplyOrderContext";
import { WoundAssessmentContextProvider } from "./context/WoundAssessmentContext";
import { InventoryContextProvider } from "./context/InventoryContext";
import { OrderDetailContextProvider } from "./context/OrderDetailsContext";
import { AdminRolesPermissionsContextProvider } from "./context/AdminRolesPermissionsContext";
import { SubmitProofOfDeliveryContextProvider } from "./context/submitProofOfDeliveryContext";
import { useEffect } from "react";
import { UserProfileContextProvider } from "./context/UserProfileContext";

const newTheme = createTheme({
  typography: {
    fontFamily: "3MCircularTT",
  },
});

function App() {
  const handleBeforeUnload = (e: any) => {
    localStorage.clear();
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []);
  return (
    <ThemeProvider theme={newTheme}>
      <MobileDisplayContextProvider>
        <div className="App">
          <AuthContextProvider>
            <RolesPermissionContextProvider>
              <SubmitProofOfDeliveryContextProvider>
                <ProfileFormContextProvider>
                  <PickUpRequestContextProvider>
                    <OrderDetailContextProvider>
                      <DischargeRequestContextProvider>
                        <SupplyOrderContextProvider>
                          <NewOrderContextProvider>
                            <FacilitySettingsProvider>
                              <AdminRolesPermissionsContextProvider>
                                <SendNoteContextProvider>
                                  <UserProfileContextProvider>
                                    <WoundAssessmentContextProvider>
                                      <InventoryContextProvider>
                                        <Router>
                                          <AppWithRouterAccess />
                                          <Footer />
                                        </Router>
                                      </InventoryContextProvider>
                                    </WoundAssessmentContextProvider>
                                  </UserProfileContextProvider>
                                </SendNoteContextProvider>
                              </AdminRolesPermissionsContextProvider>
                            </FacilitySettingsProvider>
                          </NewOrderContextProvider>
                        </SupplyOrderContextProvider>
                      </DischargeRequestContextProvider>
                    </OrderDetailContextProvider>
                  </PickUpRequestContextProvider>
                </ProfileFormContextProvider>
              </SubmitProofOfDeliveryContextProvider>
            </RolesPermissionContextProvider>
          </AuthContextProvider>
        </div>
      </MobileDisplayContextProvider>
    </ThemeProvider>
  );
}

export default App;
