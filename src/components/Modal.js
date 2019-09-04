import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modalize from "react-native-modalize";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";

const themes = [
    { name: "DarkGreen", hex: "#005f00" },
    { name: "SpringGreen", hex: "#00875f" },
    { name: "DarkRed", hex: "#5f0000" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Purple", hex: "#800080" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "Bisque", hex: "#ffe4c4" },
    { name: "Black", hex: "#000000" },
    { name: "Blanchedalmond", hex: "#ffebcd" },
    { name: "Blue", hex: "#0000ff" },
    { name: "Blueviolet", hex: "#8a2be2" },
    { name: "Brown", hex: "#a52a2a" },
    { name: "NavyBlue", hex: "#12213b" }
];

export default class Modal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.myModal = React.createRef();
    }

    renderHeader = () => (
        <View style={styles.modal__header}>
            <Text style={styles.modal__headerText}>Themes</Text>
        </View>
    );

    renderContent = () => {
        return (
            <View style={styles.content}>
                {themes.map((item, index) => {
                    return (
                        <View key={index}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.getTheme(item);
                                    this.myModal.current.close();
                                }}
                                style={styles.content__row}
                            >
                                <View
                                    style={[
                                        styles.content__avatar,
                                        {
                                            backgroundColor: item.hex
                                        }
                                    ]}
                                />
                                <Text style={styles.content__name}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
                <View style={styles.content__button}>
                    <TouchableOpacity onPress={this.scrollToTop}>
                        <Icon name="upcircleo" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    onClosed = () => {
        const { onClosed } = this.props;

        if (onClosed) {
            onClosed();
        }
    };

    openModal = () => {
        if (this.myModal.current) {
            this.myModal.current.open();
        }
    };

    scrollToTop = () => {
        if (this.myModal.current) {
            this.myModal.current.scrollTo({
                y: 0,
                animated: true
            });
        }
    };

    render() {
        return (
            <Modalize
                ref={this.myModal}
                HeaderComponent={this.renderHeader}
                height={350}
                onClosed={this.onClosed}
            >
                {this.renderContent()}
            </Modalize>
        );
    }
}

const styles = StyleSheet.create({
    modal__header: {
        paddingVertical: 15,
        marginHorizontal: 15,

        borderBottomColor: "#eee",
        borderBottomWidth: 1
    },

    modal__headerText: {
        fontSize: 15,
        fontWeight: "200"
    },

    content: {
        paddingHorizontal: 15
    },

    content__row: {
        flexDirection: "row",
        alignItems: "center",

        paddingVertical: 15,

        borderBottomColor: "#f9f9f9",
        borderBottomWidth: 1
    },

    content__avatar: {
        width: 38,
        height: 38,

        marginRight: 15,

        overflow: "hidden",

        backgroundColor: "#eee",
        borderRadius: 19
    },

    content__name: {
        fontSize: 16
    },

    content__button: {
        alignItems: "center",
        justifyContent: "center",

        marginVertical: 20
    }
});
