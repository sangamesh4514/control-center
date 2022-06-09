import React, { useState } from "react";
import LogMe from "./components/Auth/Protected Route/LogMe";
import Login from "./components/Auth/Login";
import Verify from "./components/Auth/Login Verification/LoginVerification";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Content from "./components/layout/Content/Content";
import NotFound from "./components/NotFound";


const App = () => {

  const userLogged = localStorage.getItem("userToken");
  const history = useHistory();
  console.log('[App.JS]', userLogged);

  const [aidoState, setAidoState] = useState(null);
  const value = { aidoState, setAidoState };


  return (
    <>
      <aidoContext.Provider value={value}>
        <BrowserRouter>
          <Switch>
            <LogMe exact path="/" component={Login}>
              <Login />
            </LogMe>
            <LogMe exact path="/verify" component={Verify}>
              <Verify />
            </LogMe>
            <Content />
            <Route exact path="/*" component={NotFound} />
            {/* <SecureRoute exact path="/home" component={Layout}>

            <Layout />

          </SecureRoute> */}
          </Switch>
        </BrowserRouter>
      </aidoContext.Provider>
    </>
  );
};


export const aidoContext = React.createContext({
  aidoState: null,
  setAidoState: () => { }
});
// export default NetworkRadar(App);
export default App;
