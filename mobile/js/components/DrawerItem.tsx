import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types'
import { theme } from '../themes';

type DrawerItemProps = {
    item: {
        name: string;
        icon: string;
        screen: string;
        section?: string;
        subItems?: { name: string; screen: string }[];
    };
    selectedItem: string | null;
    onItemSelect?: (value: string) => void;
    expandedSection?: string | null;
    toggleSection: (section: string) => void;
};

const DrawerItem: React.FC<DrawerItemProps> = ({
    item,
    onItemSelect,
    expandedSection,
    toggleSection,
    selectedItem,
}) => {
    const handlePress = () => {
        if (item.section) {
            toggleSection(item.section);
        } else if (onItemSelect){
            onItemSelect(item.screen);
        }
    };

    return (
        <>
            <TouchableOpacity
                style={[styles.item, !item.subItems && selectedItem === item.screen && styles.selectedItem]}
                onPress={handlePress}
            >
                <View style={styles.itemContent}>
                    <MaterialDesignIcons name={item.icon} color={theme.lightColors?.white} style={styles.itemIcon} />
                    <Text style={styles.itemText}>{item.name}</Text>
                </View>
                {
                    item.section && (
                        <MaterialDesignIcons
                            name={expandedSection === item.section ? 'chevron-up' : 'chevron-down'}
                            color={theme.lightColors?.white}
                            style={styles.itemIcon}
                        />
                    )
                }
            </TouchableOpacity>
            {item.section && expandedSection === item.section && item.subItems && (
                <View style={[styles.subItems, selectedItem === item.screen && styles.selectedItem]}>
                    {item.subItems.map((subItem, subIndex) => (
                        <TouchableOpacity
                            key={subIndex}
                            style={styles.subItem}
                            onPress={() => {
                                if(onItemSelect) {
                                    onItemSelect(subItem.screen);
                                }
                            }}
                        >
                            <Text style={styles.subItemText}>{subItem.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        paddingLeft: 20
    },
    itemContent: {
        flex: 1,
        flexDirection: 'row'
    },
    itemIcon: {
        fontSize: 18,
        padding: 5,
        marginRight: 5,
    },
    itemText: {
        fontSize: 18,
        color: theme.lightColors?.white,
        fontWeight: 'bold',
    },
    subItems: {
        flexDirection: 'column',
        paddingLeft: 70,
    },
    subItem: {
        padding: 5,
    },
    subItemText: {
        fontSize: 16,
        color: theme.lightColors?.white,
    },
    selectedItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});

export default DrawerItem;
