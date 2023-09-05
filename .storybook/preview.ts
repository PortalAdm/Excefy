import "../src/global/styles/globals.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  globalTypes: {
    darkMode: {
      defaultValue: true,
    },
    className: {
      defaultValue: 'bg-dark',
    },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
