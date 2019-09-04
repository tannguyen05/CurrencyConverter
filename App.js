/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import RootNavigation from "./src/navigator/RootNavigation";
import { Provider } from "react-redux";
import store from "./src/store";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <RootNavigation />
                </View>
            </Provider>
        );
    }
}
