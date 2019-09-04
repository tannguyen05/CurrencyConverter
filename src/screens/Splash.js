import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import Logo from "../components/Logo";

export default class Splash extends Component {
    constructor(props) {
        super(props);
        setTimeout(() => {
            props.navigation.navigate("Home");
        }, 3000);
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#12213b" barStyle="light-content" />
                <Logo />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12213b",
        justifyContent: "center",
        alignItems: "center"
    }
});
