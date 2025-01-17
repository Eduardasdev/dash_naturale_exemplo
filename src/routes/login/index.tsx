import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";

import { authCredentials } from "@/providers";

export const LoginPage = () => {
  return (
    <AuthPage
      type="login"
      registerLink={true}
      forgotPasswordLink={false}
      title={
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/public/logo.png"
            alt="Logo"
            style={{
              width: "30px",
              height: "30px",
              marginRight: "8px",
            }}
          />
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>naturalle</span>
        </div>
      }
      formProps={{
        initialValues: authCredentials,
      }}
    />
  );
};

