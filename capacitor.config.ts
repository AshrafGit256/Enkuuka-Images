import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.enkuuka.cbsfestival',
  appName: 'Enkuuka Yomwaka',
  webDir: 'build',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2800,
      backgroundColor: '#1A5276',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#1A5276',
    },
  },
};

export default config;
