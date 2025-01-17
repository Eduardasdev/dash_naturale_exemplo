import React from "react";

import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";

import { Header } from "./header";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ThemedLayoutV2
        Header={Header}
        Title={(titleProps) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "8px",
                }}
              />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>Naturalle</span>
            </div>
          );
        }}
      >
        {children}
      </ThemedLayoutV2>
    </>
  );
};
