import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { Route } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { authService, authState } = useOktaAuth();

  if (!authState.isAuthenticated) {
    if (!authState.isPending) {
      const fromUri = window.location.href;
      authService.login(fromUri);
    }
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

const SecureRoute = ({ element, ...props }) => {
  const WrappedComponent = (wrappedProps) => (
    <RequireAuth>{element}</RequireAuth>
  );
  return <Route {...props} element={<WrappedComponent />} />;
};

export default SecureRoute;
