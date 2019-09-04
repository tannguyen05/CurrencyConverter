import React, { Component } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
export default class Header extends Component {
    openUrl = () => {
        const url = "https://www.xe.com/currencyconverter/";
        Linking.openURL(url).catch(() =>
            alert("An error occurred, please try again later")
        );
    };
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.openUrl}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <AntDesign name="link" color="white" size={20} />
                    <Text style={{ color: "white", paddingLeft: 5 }}>
                        Live Rates
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.openModal}>
                    <MaterialIcons name="color-lens" size={40} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
    }
});
