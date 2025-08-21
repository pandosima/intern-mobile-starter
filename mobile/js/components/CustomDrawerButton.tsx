import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { theme } from '../themes';

const CustomDrawerToggleButton = () => {
    const navigation = useNavigation(); // Access the navigation object

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <TouchableOpacity onPress={toggleDrawer} style={styles.button}>
            <MaterialDesignIcons name="menu" size={24} color={theme.lightColors?.white} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginLeft: 15,
    },
});

export default CustomDrawerToggleButton;