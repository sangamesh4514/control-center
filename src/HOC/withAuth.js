import { Redirect } from "react-router-dom";

const withAuth = (Component) => {
    const AuthRoute = () => {
        const isAuth = localStorage.getItem("userToken");
        console.log(isAuth, Component);
        if (isAuth) {
            return <Component />;
        } else {
            return <Redirect to="/" />;
        }
    };

    return AuthRoute;
};

export default withAuth;