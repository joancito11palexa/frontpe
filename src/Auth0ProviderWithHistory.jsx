import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const domain = "dev-6tss1b7wf5huiury.us.auth0.com";
  const clientId = "PBixrNlybCXao7YBiGirapBSAAcab1CL";

  const onRedirectCallback = (appState) => {
    navigate("/mi-cuenta");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-6tss1b7wf5huiury.us.auth0.com/api/v2/",
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback} // Se pasa la función de redirección
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
