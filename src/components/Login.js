import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { auth } from "../firebase";

export default class Login extends Component {
    state = {
        email: "",
        password: "",
        error: false,
        message: ""
    };
    componentDidMount() {
        this.getUserInfo();
    }
    getUserInfo = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                // this.props.navigation.navigate("Todo");
            }
        });
    };
    handleLogin = () => {
        const { email, password } = this.state;
        if (email && password) {
            auth.signInWithEmailAndPassword(email, password)
                .then(respose => {
                    this.props.navigation.navigate("Todo");
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
                message: "All fields are required"
            });
        }
    };
    render() {
        const { email, password, error, message } = this.state;
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
                    {error && <Text style={styles.error}>{message}</Text>}
                    <View style={styles.btn}>
                        <Button color="tomato" onPress={this.handleLogin} title="LOGIN" />
                    </View>
                    <View style={styles.btn}>
                        <Button
                            color="dimgray"
                            onPress={() => this.props.navigation.navigate("Register")}
                            title="Register"
                        />
                    </View>
                    <View style={styles.btn}>
                        <Button
                            color="firebrick"
                            onPress={() => this.props.navigation.navigate("ForgotPassword")}
                            title="Forgot Password"
                        />
                    </View>
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
    btn: {
        marginVertical: 10
    },
    error: {
        color: "red",
        padding: 10
    }
});
