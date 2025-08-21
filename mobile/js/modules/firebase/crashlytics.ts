import {
    getCrashlytics,
    log as crashlyticsLog,
    setUserId as crashlyticsSetUserId,
    setAttributes as crashlyticsSetAttributes,
    recordError as crashlyticsRecordError
} from '@react-native-firebase/crashlytics';

export const crashlytics = getCrashlytics();

export const log = (message: string) => {
    crashlyticsLog(crashlytics, message);
}

export const recordError = (error: Error) => {
    crashlyticsRecordError(crashlytics, error);
}

export const setUserId = (id: string) => {
    crashlyticsSetUserId(crashlytics, id);
}

export const setAttributes = (attributes: { [key: string]: string }) => {
    crashlyticsSetAttributes(crashlytics, attributes);
}

