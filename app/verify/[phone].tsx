import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Link, useLocalSearchParams } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ViewBase, Alert } from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6

const Page =() => {
    const { phone, signin } = useLocalSearchParams<{phone: string, signin: string}>();
    const { signIn } = useSignIn();
    const { signUp, setActive } = useSignUp()
    const [code, setCode] = useState<string>('')
    const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

    useEffect(() => {
        if (code.length === 6) {
            if (signin === 'true') {
                verifySignIn();
            } else {
                verifyCode()
            }
        }
    }, [code])

    const verifyCode = async () => {
        try {
            await signUp?.attemptPhoneNumberVerification({
                code,
            });
            await setActive!({ session: signUp!.createdSessionId})
        } catch (err) {
            console.error('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };

    const verifySignIn = async () => {
        try {
            await signIn?.attemptFirstFactor({
                strategy: 'phone_code',
                code,
            });
            await setActive!({ session: signIn!.createdSessionId})
        } catch (err) {
            console.error('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    }
    return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>6-digit code</Text>
            <Text style={defaultStyles.descriptionText}>Code sent to {phone} unless you alerady have an account</Text>

             <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
                testID="my-code-input"
                renderCell={({index, symbol, isFocused}) => (
                    <Fragment key={index}>
                        <View
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                            <Text style={styles.cellText}>
                                {symbol || (isFocused ? <Cursor/> : null)}
                            </Text>
                        </View>
                        {index === 2 ? <View style={styles.separator} key={`separator-${index}`}/> : null}
                    </Fragment>
                )}
                />

            <Link href={'/login'} asChild replace>
                <TouchableOpacity>
                    <Text style={defaultStyles.textLink}>
                        Already have an account? Login
                    </Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
};

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginVertical: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 12,
    },
    cellRoot: {
        width: 45,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
    },
    cellText: {
        color: '#000',
        fontSize: 36,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
    separator: {
        height: 2,
        width: 10,
        backgroundColor: Colors.gray,
        alignSelf: 'center',
    }
});

export default Page