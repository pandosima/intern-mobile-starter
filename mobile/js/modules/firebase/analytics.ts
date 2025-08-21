import {
    getAnalytics,
    logScreenView as analyticsLogScreenView,
    logEvent as analyticsLogEvent,
    FirebaseAnalyticsTypes,
} from '@react-native-firebase/analytics';
import { app } from './app';

export const analytics = getAnalytics(app);

export const logScreenView = (params: FirebaseAnalyticsTypes.ScreenViewParameters) => {
    analyticsLogScreenView(analytics, params);
}

export const logEvent = (
    name: 'add_to_cart' | 'add_to_wishlist' | 'remove_from_cart',
    params?: {
        currency?: FirebaseAnalyticsTypes.EventParams['currency'];
        value?: FirebaseAnalyticsTypes.EventParams['value'];
        items?: FirebaseAnalyticsTypes.EventParams['items'];
        [key: string]: any;
    },
    options?: FirebaseAnalyticsTypes.AnalyticsCallOptions,
) => {
    analyticsLogEvent(analytics, params, options);
}
