import { createTheme } from '@rneui/themed';

// Use this tool to design theme: https://m3.material.io/theme-builder
// Read more about them object at: https://reactnativeelements.com/docs/customization/theme_object
// Read more about cusstomize theme at: https://reactnativeelements.com/docs/customizing
export const theme = createTheme({
  lightColors: {
    primary: '#b62132',
    secondary: '#b61362',
    background: 'white',
    error: '#ba1a1a',
  },
  darkColors: {
    primary: '#ffb3b2',
    secondary: '#ffb1c8',
    background: '#141f00',
    error: '#ffb4ab',
  },
  components: {
    Button: {
      raised: true,
    },
  },
});
