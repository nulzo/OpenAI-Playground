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
import { ThemeProvider } from "./components/fields/ThemeProvider";

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
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Theme appearance="dark" accentColor="cyan" grayColor="mauve" radius="small">
        <Root />
      </Theme>
    </ThemeProvider>
  </QueryClientProvider>
);
