import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { auth } from "../firebase";

export default class ForgotPassword extends Component {
    state = {
        email: ""
    };
    handleForgotPassword = () => {
        const { email } = this.state;
        auth.sendPasswordResetEmail(email)
            .then(response => {
                this.setState({
                    error: true,
                    message: "Check your email address"
                });
                this.props.navigation.navigate("Login");
            })
            .catch(error => {
                this.setState({
                    error: true,
                    message: "error"
                });
            });
    };
    render() {
        const { email } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={email => this.setState({ email })}
                        style={styles.input}
                    />
                    <Button
                        color="tomato"
                        onPress={this.handleForgotPassword}
                        title="FORGOT PASSWORD"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        width: "80%",
        backgroundColor: "white",
        elevation: 1,
        padding: 15
    },
    input: {
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        marginVertical: 5
    }
});
