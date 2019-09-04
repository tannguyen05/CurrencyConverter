import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ModalSelector from "react-native-modal-selector";

const HEIGHT_INPUT = 48;
const BORDER_RADIUS = 5;
export default class InputWithButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { buttonText, getValueModal, listSymbol, theme } = this.props;
        return (
            <View style={styles.container}>
                <ModalSelector
                    data={listSymbol}
                    supportedOrientations={["landscape"]}
                    accessible={true}
                    scrollViewAccessibilityLabel={"Scrollable options"}
                    cancelButtonAccessibilityLabel={"Cancel Button"}
                    onChange={option => {
                        getValueModal(option.label);
                    }}
                    style={styles.button}
                    optionContainerStyle={{ backgroundColor: "white" }}
                    cancelStyle={{ backgroundColor: "white" }}
                >
                    <Text style={[styles.buttonText, { color: theme }]}>
                        {buttonText}
                    </Text>
                </ModalSelector>
                <TextInput
                    style={[styles.input, { color: theme }]}
                    {...this.props}
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: "90%",
        flexDirection: "row",
        height: HEIGHT_INPUT,
        borderRadius: BORDER_RADIUS,
        marginVertical: 15
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: HEIGHT_INPUT,
        width: "20%",
        borderTopLeftRadius: BORDER_RADIUS,
        borderBottomLeftRadius: BORDER_RADIUS,
        paddingHorizontal: 10
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600"
    },
    input: {
        backgroundColor: "white",
        borderTopRightRadius: BORDER_RADIUS,
        borderBottomRightRadius: BORDER_RADIUS,
        borderLeftWidth: 0.4,
        paddingHorizontal: 10,
        borderLeftColor: "gray",
        fontSize: 18,
        flex: 1
    }
});
