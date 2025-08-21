import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TimeTrackingStackParamList = {
    TimekeeperDevices: undefined;
    TimekeeperDevice: {id: string; editing: boolean} | undefined;
};

export type TimekeeperDevicesScreenProps = NativeStackScreenProps<
    TimeTrackingStackParamList,
    'TimekeeperDevices'
>;

export type TimekeeperDeviceScreenProps = NativeStackScreenProps<
    TimeTrackingStackParamList,
    'TimekeeperDevice'
>;