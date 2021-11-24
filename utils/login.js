import InAppBrowser from 'react-native-inappbrowser-reborn';
import {Linking} from 'react-native';
import {
  KakaoOAuthToken,
  login,
  getProfile,
} from '@react-native-seoul/kakao-login';
export async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });
  if (type === 'success') {
    await Linking.openURL(newUrl).catch(e => console.log(e));
  }
}
