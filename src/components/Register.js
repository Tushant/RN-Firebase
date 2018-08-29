import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { auth } from "../firebase";

export default class Register extends Component {
    state = {
        email: "",
        password: "",
        cpassword: "",
        error: false,
        message: ""
    };
    handleRegistration = () => {
        const { email, password, cpassword } = this.state;
        if (email && password && cpassword) {
            if (password === cpassword) {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(response => {
                        const res = response.data;
                        console.log("Register Succesfull: ", res);
                    })
                    .catch(error => {
                        this.setState({
                            error: true,
                            message: error.message
                        });
                    });
            } else {
                this.setState({
                    error: true,
                    message: "Both password must match"
                });
            }
        } else {
            this.setState({
                error: true,
                message: "All fields are required"
            });
        }
    };
    render() {
        const { email, password, cpassword, error, message } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={email => this.setState({ email })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={password => this.setState({ password })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={cpassword}
                        onChangeText={cpassword => this.setState({ cpassword })}
                        style={styles.input}
                    />
                    {error && <Text style={styles.error}>{message}</Text>}
                    <Button color="tomato" onPress={this.handleRegistration} title="REGISTER" />
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
    },
    error: {
        color: "red",
        padding: 10
    }
});
