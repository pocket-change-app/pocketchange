import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'metropolis regular': require('../assets/fonts/Metropolis-Regular.otf'),
          'metropolis regular italic': require('../assets/fonts/Metropolis-RegularItalic.otf'),
          'metropolis medium': require('../assets/fonts/Metropolis-Medium.otf'),
          'metropolis medium italic': require('../assets/fonts/Metropolis-MediumItalic.otf'),
          'metropolis bold': require('../assets/fonts/Metropolis-Bold.otf'),
          'metropolis bold italic': require('../assets/fonts/Metropolis-BoldItalic.otf'),
          'metropolis semibold': require('../assets/fonts/Metropolis-SemiBold.otf'),
          'metropolis semibold italic': require('../assets/fonts/Metropolis-SemiBoldItalic.otf'),
          'metropolis extrabold': require('../assets/fonts/Metropolis-ExtraBold.otf'),
          'metropolis extrabold italic': require('../assets/fonts/Metropolis-ExtraBoldItalic.otf'),
          'metropolis black': require('../assets/fonts/Metropolis-Black.otf'),
          'metropolis black italic': require('../assets/fonts/Metropolis-BlackItalic.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
