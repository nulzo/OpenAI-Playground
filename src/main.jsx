import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/output.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Root from "./Root";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
      <Theme
        accentColor="orange"
        grayColor="slate"
        panelBackground="solid"
        scaling="100%"
        radius="medium"
        appearance="dark"
      >
        <Root />
      </Theme>
    </QueryClientProvider>
);
