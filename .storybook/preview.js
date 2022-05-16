import { ThemeProvider } from "emotion-theming";
import { dark } from '../src/theme/dark'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={dark}>
      <Story />
    </ThemeProvider>
  ),
];