import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ActivityIndicator,
    Button
} from "react-native";
import Logo from "../components/Logo";
import InputWithButton from "../components/InputWithButton";
import moment from "moment";
import Header from "../components/Header";
import * as actions from "../actions";
import { connect } from "react-redux";
// import { getSymbols } from "../api/listCurrencyApi";
import { listSymbol } from "../data";
import Modal from "../components/Modal";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSymbol: null
        };
    }
    async componentDidMount() {
        this.props.getRatesApi();
        this.setState({ listSymbol });

        // const data = [{ key: 0, section: true, label: "Currencies" }];
        // const listCurrency = await getSymbols();
        // if (listCurrency.success) {
        //     Object.keys(listCurrency.symbols).forEach((item, index) => {
        //         data.push({ key: index + 1, label: item });
        //     });
        //     this.setState({
        //         listCurrency: data
        //     });
        // }
    }
    handlePressDepartureCurrency = value => {
        this.props.getDepartureValue(value);
        this.props.getRatesApi();
    };
    handlePressArrivalCurrency = value => {
        this.props.getArrivalValue(value);
    };
    onChangeText = amount => {
        this.props.changeAmount(parseFloat(amount));
    };
    getTheme = value => {
        this.props.changeTheme(value);
    };

    render() {
        let {
            departureCurrency,
            arrivalCurrency,
            amount,
            rate,
            date,
            hex
        } = this.props;
        let arrivalValue = (amount * rate).toFixed(2);
        return (
            <View style={[styles.container, { backgroundColor: hex }]}>
                <Header openModal={() => this.refs.modal.openModal()} />
                <Modal ref={"modal"} getTheme={this.getTheme} />
                <KeyboardAvoidingView style={styles.main}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.main}>
                            <Logo theme={hex} />
                            <Text style={styles.text}>Currency Converter</Text>
                            {this.state.listSymbol === null ? (
                                <View style={{}}>
                                    <ActivityIndicator
                                        size="large"
                                        color="#ffffff"
                                    />
                                </View>
                            ) : (
                                <View>
                                    <InputWithButton
                                        listSymbol={this.state.listSymbol}
                                        buttonText={departureCurrency}
                                        getValueModal={
                                            this.handlePressDepartureCurrency
                                        }
                                        onChangeText={this.onChangeText}
                                        keyboardType="numeric"
                                        returnKeyType="done"
                                        placeholder={"0.00"}
                                        placeholderTextColor={hex}
                                        theme={hex}
                                    />

                                    <InputWithButton
                                        listSymbol={this.state.listSymbol}
                                        buttonText={arrivalCurrency}
                                        getValueModal={
                                            this.handlePressArrivalCurrency
                                        }
                                        editable={false}
                                        value={
                                            isNaN(arrivalValue.toString())
                                                ? "..."
                                                : arrivalValue.toString()
                                        }
                                        theme={hex}
                                    />
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontSize: 14,
                                                opacity: 0.5
                                            }}
                                        >
                                            1 {departureCurrency} = {rate}{" "}
                                            {arrivalCurrency} as of{" "}
                                            {moment(date).format("DD MM YYYY")}
                                        </Text>
                                        <TouchableOpacity
                                            style={styles.reverseButton}
                                            onPress={() => {
                                                this.props.swapCurrency();
                                                this.props.getRatesApi();
                                            }}
                                        >
                                            <Image
                                                source={require("../assets/icons/icon.png")}
                                            />
                                            <Text style={styles.reverseText}>
                                                Reverse Currencies
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { departureCurrency, arrivalCurrency, amount } = state.currencies;
    const convertionSelector = state.currencies.convertion || {};
    const rates = convertionSelector.rates || {};
    const hex = state.theme.hex;
    return {
        departureCurrency,
        arrivalCurrency,
        amount,
        rate: rates[arrivalCurrency],
        date: convertionSelector.date,
        hex
    };
};

export default connect(
    mapStateToProps,
    actions
)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    main: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: {
        marginTop: 15,
        fontWeight: "600",
        color: "white",
        fontSize: 24,
        paddingBottom: 5
    },
    reverseButton: {
        flexDirection: "row",
        paddingVertical: 15,
        opacity: 0.8
    },
    reverseText: {
        color: "white",
        fontSize: 18,
        paddingHorizontal: 5
    }
});
