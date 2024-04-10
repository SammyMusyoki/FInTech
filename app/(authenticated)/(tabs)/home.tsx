import { View, Text, ScrollView, StyleSheet, Button } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import RoundButton from '@/components/RoundButton';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
    const balance: number = 14200;
    const name = 'Sammy'
    const exchangeRate: number = 129;

    const onAddMoney = () => {}

  return (
    <ScrollView style={{ backgroundColor: Colors.primary_zinc[900], padding: 16, flex: 1}}>
        <View style={{ paddingVertical: 8, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', }}>
            <Text style={{ fontSize: 20, color: Colors.primary_zinc[100]}}>{getGreeting()},</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.primary_zinc[100]}}> {name}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}> 👋</Text>
        </View>
        <View style={styles.account}>
            <View style={styles.balanceContainer}>
                <View style={styles.balanceRow}>
                    <Text style={{ alignItems: 'center', color: Colors.primary_zinc[50], fontSize: 20, marginBottom: 4,}}>Balance</Text>
                    <View style={styles.balanceKsh}>
                        <Text style={styles.balanceText}>{formatCurrency(balance)}</Text>
                        <Text style={styles.currencyKsh}>Ksh</Text>
                    </View>
                    <View style={styles.balanceUsd}>
                        <Text style={styles.currencyUsd}>$</Text>
                        <Text style={styles.usdText}>{convertCurrency({balance, exchangeRate})}</Text>
                    </View>

                </View>

                <View style={styles.buttonRow}>
                    <RoundButton text={'Deposit'} icon={'arrow-down'} onPress={onAddMoney}/>
                    <RoundButton text={'Withdraw'} icon={'arrow-up'} onPress={onAddMoney}/>
                    <RoundButton text={'Send'} icon={'paper-plane'} onPress={onAddMoney}/>
                    <RoundButton text={'Request'} icon={'arrow-left'} onPress={onAddMoney}/>
                </View>
            </View>
        </View>
    </ScrollView>
  )
}

    const formatCurrency = (balance: number) => {
        let balanceStr: string = balance.toString()
        let parts: string[] = balanceStr.split('.')

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return parts.join('.')
    }
    const getGreeting = () => {
    const currTime: Date = new Date();
    const currHour: number = currTime.getHours();

    let greeting: string
    if (currHour >= 5 && currHour <= 12) {
      greeting = 'Good Morning';
    } else if (currHour >= 12 && currHour <= 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }

    return greeting
  }

  type convertCurrencyProps = {
    balance: number,
    exchangeRate: number,
}


const convertCurrency = ({ balance, exchangeRate }: convertCurrencyProps) => {
    const amountInUsd: number = balance / exchangeRate
    return Math.round(amountInUsd * 100) / 100
}

const styles = StyleSheet.create({
    account: {
        alignItems: 'center',
    },
    balanceContainer: {
        padding: 12,
        width: '100%',
        height: 224,
        backgroundColor: Colors.primary_zinc[800],
        borderRadius: 8,
        justifyContent: 'space-between'
    },
    balanceKsh: {
        alignItems: 'baseline',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    balanceUsd: {
        alignItems: 'baseline',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 3,
    },
    balanceRow: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: Colors.primary_zinc[700],
        padding: 8,
        borderRadius:6,
        paddingVertical: 12,
    },
    balanceText: {
        fontSize: 33,
        fontWeight: 'bold',
        color: Colors.primary_violet[400]
    },
    usdText: {
        fontSize: 20,
        color: Colors.primary_zinc[400]
    },
    currencyKsh: {
        fontSize: 20,
        fontWeight: '500',
        color: Colors.primary_zinc[400],
    },
    currencyUsd: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.primary_zinc[500],
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: '100%',
    }
});

export default Page