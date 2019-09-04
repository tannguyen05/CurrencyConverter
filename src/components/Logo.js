import React, { Component } from "react";
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    Keyboard,
    Animated
} from "react-native";

const imageWidth = Dimensions.get("window").width / 2;
export default class Logo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            containerImageWidth: new Animated.Value(imageWidth),
            imageWidth: new Animated.Value(imageWidth / 2)
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this._keyboardDidShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            this._keyboardDidHide
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        Animated.parallel([
            Animated.timing(this.state.containerImageWidth, {
                toValue: imageWidth / 2,
                duration: 250
            }),
            Animated.timing(this.state.imageWidth, {
                toValue: imageWidth / 4,
                duration: 250
            })
        ]).start();
    };

    _keyboardDidHide = () => {
        Animated.parallel([
            Animated.timing(this.state.containerImageWidth, {
                toValue: imageWidth,
                duration: 250
            }),
            Animated.timing(this.state.imageWidth, {
                toValue: imageWidth / 2,
                duration: 250
            })
        ]).start();
    };

    render() {
        let { containerImageWidth, imageWidth } = this.state;
        return (
            <View style={styles.container}>
                <Animated.Image
                    resizeMode="contain"
                    source={require("../assets/logo/background.png")}
                    style={[
                        styles.container,
                        {
                            width: containerImageWidth,
                            height: containerImageWidth
                        }
                    ]}
                />
                <Animated.Image
                    resizeMode="contain"
                    source={require("../assets/logo/logo.png")}
                    style={{
                        width: imageWidth,
                        position: "absolute",
                        tintColor: this.props.theme
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    }
});
