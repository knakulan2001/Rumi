import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const validateAuthTokens = () => {
        if (Cookies.get("logged")) {
            return Cookies.get("logged");
        } else {
            return false;
        }
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                validateAuthTokens() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
            }
        />
    );
};

export default ProtectedRoute;
