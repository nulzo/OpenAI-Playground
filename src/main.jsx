import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/output.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import Root from "./Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from '@radix-ui/colors';

const queryClient = new QueryClient();

const theme = {
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
  },
};

const darkTheme = {
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Theme
      accentColor="indigo"
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
