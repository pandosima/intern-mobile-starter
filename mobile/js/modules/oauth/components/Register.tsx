import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { Card, Text, makeStyles, Button } from '@rneui/themed';
import Localization from '../../../localization';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { register } from '../store/actions';
import { RegisterScreenProps } from '../types';
import { Dropdown } from 'react-native-element-dropdown';

import {recordError} from '../../firebase/crashlytics';

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        justifyContent: 'center',
        ...Platform.select({
            android: {},
            ios: {
                alignItems: 'center',
            }
        }),
        backgroundColor: theme.colors.primary,
    },
    cardContent: {
        backgroundColor: '#FAFFE5',
        borderRadius: 10,
        marginHorizontal: 40,
        height: 400,
    },
    errorPanel: {
        margin: 5,
    },
    errorText: {
        textAlign: 'left',
        margin: 5,
        color: theme.colors.error,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#857372",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    registerTitle: {
        paddingHorizontal: 20
    },
    cardText: {
        color: "#D7347B",
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 14,
        marginTop: 20,
        alignSelf: 'center'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#857372",
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdown: {
        flex: 1,
        marginStart: 10,
        height: 40,
    },
    icon: {
        marginRight: 10,
        fontSize: 16,
        color: "#857372",
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
}));

const Register: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedPlan, setSelectedPlan] = useState<string>();
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const registering = useAppSelector(state => state.oauth.registering);
    const styles = useStyles();

    const validate = () => {
        let validateErrors: string[] = [];
        if (!firstName.trim()) {
            validateErrors.push('First name is required');
        }
        else if (!lastName.trim()) {
            validateErrors.push('Last name is required');
        }
        else if (!email.trim()) {
            validateErrors.push('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validateErrors.push('Invalid email address');
        }
        else if (!selectedPlan) {
            validateErrors.push('Please select a plan');
        }
        setErrors(validateErrors);
        return validateErrors.length === 0;
    };

    const handleRegister = async () => {
        if (validate()) {
            try {
                await dispatch(
                    register({
                        firstname: firstName,
                        lastname: lastName,
                        email,
                        plan: selectedPlan as "starter" | "premium" | "standard",
                    })
                );
                Alert.alert('Success', 'The invitation has been sent.', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') }
                ]);
            } catch (error) {
                recordError(error as Error);
                console.error('Registration failed:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.cardContent}>
                <View style={[styles.inputContainer, { marginTop: 30 }]}>
                    <TextInput
                        placeholder={Localization.first_name}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder={Localization.last_name}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder={Localization.Email}
                        autoCorrect={false}
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.pickerContainer}>
                    <Text style={styles.icon}>Plan</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={[
                            { label: 'Starter', value: 'starter' },
                            { label: 'Premium', value: 'premium' },
                            { label: 'Standard', value: 'standard' },
                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select plan"
                        value={selectedPlan}
                        onChange={item => setSelectedPlan(item.value as string)}
                    />
                </View>
                <Button
                    title={Localization.Register}
                    onPress={handleRegister}
                    loading={registering}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.cardText}>{Localization.have_an_account}</Text>
                </TouchableOpacity>
                {errors.length > 0 && (
                    <View style={styles.errorPanel}>
                        {errors.map((item, index) => (
                            <Text style={styles.errorText} key={index}>
                                {item}
                            </Text>
                        ))}
                    </View>
                )}
            </Card>
        </View>
    );
};

export default Register;