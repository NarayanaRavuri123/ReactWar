import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext, AuthContextType } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  let isLoggedIn: boolean = AuthObj?.isLoggedIn!;

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
