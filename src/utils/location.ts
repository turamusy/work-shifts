import { Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { TEXTS } from '../constants/texts';

export async function requestAndGetLocation(): Promise<{ lat: number; lon: number }> {
  const perm = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  });

  if (!perm) throw new Error(TEXTS.LOCATION_PLATFORM_PERMITION_ERROR);

  const status = await request(perm);
  if (status !== RESULTS.GRANTED) {
    throw new Error(TEXTS.LOCATION_PERMITION_ERROR);
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        resolve({ lat: latitude, lon: longitude });
      },
      err => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  });
}
