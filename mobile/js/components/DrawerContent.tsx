import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types'
import DrawerItem from './DrawerItem';
import { useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/base';
import { theme } from '../themes';

type DrawerContentProps = {
    appName: string;
    logoSource: any;
    drawerItems: {
        name: string;
        icon: string;
        screen: string;
        section?: string;
        subItems?: { name: string; screen: string }[];
    }[];
};

export default function DrawerContent(props: DrawerContentProps) {
    const navigation = useNavigation();
    const [expandedSection, setExpandedSection] = useState<string|null>(null);
    const [selectedItem, setSelectedItem] = useState<string|null>(null);

    const toggleSection = (section: string) => {
        if (section === expandedSection) {
            setExpandedSection(null);
        } else {
            setExpandedSection(section);
        }
    };

    const getNavigationScreen = (nav) => {
        if (!nav) {
            return null;
        }
        const parentState = nav.getState();
        if (parentState && parentState.routes && parentState.routes.length > 0) {
            return parentState.routes[parentState.index].name;
        }
    }

    const onItemSelect = (screen: string) => {
        console.log('screen:', screen);
        let to:any = { screen: screen };
        setSelectedItem(screen);
        const drawerName = getNavigationScreen(navigation);
        let parent = navigation.getParent();
        let parentScreen = getNavigationScreen(parent);
        if (!parent || !parentScreen) {
            navigation.navigate(drawerName, to);
        } else {
            let rootScreen = parentScreen;
            parent = parent.getParent();
            parentScreen = getNavigationScreen(parent);
            to = {
                screen: drawerName,
                params: {
                    screen: screen,
                }
            };
            while (parent && parentScreen) {
                to = {
                    screen: rootScreen,
                    params: to
                };
                rootScreen = parentScreen;
                parent = parent.getParent();
                parentScreen = getNavigationScreen(parent);
            };
            console.log('rootScreen:', rootScreen, 'to:\n', to);
            navigation.navigate(rootScreen, to);
        }
    };

    return (
        <DrawerContentScrollView style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
                <View style={styles.logoContainer}>
                    <Image source={props.logoSource} style={styles.logo} />
                </View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{props.appName}</Text>
                </View>
            </View>
            <Divider style={styles.divider} />
            <ScrollView style={styles.container}>
                {props.drawerItems.map((item, index) => (
                    <DrawerItem
                        key={index}
                        item={item}
                        onItemSelect={onItemSelect}
                        expandedSection={expandedSection}
                        toggleSection={toggleSection}
                        selectedItem={selectedItem}                    />
                ))}
            </ScrollView>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: theme.lightColors?.primary,
    },
    drawerHeader: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    logo: {
        width: 100,
        height: 80,
    },
    divider: {
        borderBottomWidth: 1,
    },
    container: {
        flexGrow: 1,
        marginTop: 20,
    },
    header: {
        padding: 10,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        color: theme.lightColors?.white,
    },
});
