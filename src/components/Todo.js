import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableOpacity,
    ToastAndroid
} from "react-native";

import { db } from "../firebase";

export default class Todo extends Component {
    static navigationOptions = {
        header: (
            <View style={{ height: 50, backgroundColor: "tomato", justifyContent: "center" }}>
                <Text style={{ color: "white", marginHorizontal: 20 }}>TODOS</Text>
            </View>
        )
    };
    state = {
        todos: [],
        todoItem: ""
    };
    componentDidMount() {
        this.fetchTodos();
    }
    fetchTodos = () => {
        db.collection("todos")
            .get()
            .then(querySnapshot => {
                const todos = [];
                querySnapshot.forEach(doc => {
                    todos.push({
                        id: doc.id,
                        todo: doc.data().todo,
                        completed: doc.data().completed
                    });
                });
                this.setState({
                    todos
                });
            })
            .catch(error => {
                console.log("Error getting todos: ", error);
            });
    };
    handleAddTodo = () => {
        const { todoItem } = this.state;
        db.collection("todos")
            .add({
                todo: todoItem
            })
            .then(docRef => {
                this.fetchTodos();
            })
            .catch(error => {
                console.log("Error adding todos: ", error);
            });
    };
    handleCompleted = (id, status) => {
        db.collection("todos")
            .doc(id)
            .update({
                completed: !status
            })
            .then(() => {
                this.fetchTodos();
                ToastAndroid.showWithGravityAndOffset(
                    "Item status changed sucessfully",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    };
    renderTodos = () => {
        const { todos } = this.state;
        if (todos.length > 0) {
            return todos.map(todo => {
                return (
                    <TouchableOpacity onPress={() => this.handleCompleted(todo.id, todo.completed)}>
                        <Text
                            key={todo.id}
                            style={[
                                styles.todoItem,
                                { textDecorationLine: todo.completed ? "line-through" : "none" }
                            ]}
                        >
                            {todo.todo}
                        </Text>
                    </TouchableOpacity>
                );
            });
        } else {
            return <Text style={styles.heading}>No Todos. Add One</Text>;
        }
    };
    renderAddTodoForm = () => {
        const { todoItem } = this.state;
        return (
            <View style={styles.form}>
                <View style={{ flex: 2 }}>
                    <TextInput
                        placeholder="Todo Item"
                        value={todoItem}
                        onChangeText={text => this.setState({ todoItem: text })}
                        style={{ borderColor: "gray", borderWidth: 1, height: 45 }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button color="tomato" title="ADD" onPress={this.handleAddTodo} />
                </View>
            </View>
        );
    };
    render() {
        return (
            <View style={styles.container}>
                {this.renderAddTodoForm()}
                {this.renderTodos()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    todoItem: {
        fontSize: 18,
        color: "dimgray",
        marginVertical: 5,
        paddingHorizontal: 20
    },
    heading: {
        fontSize: 20,
        color: "firebrick"
    },
    form: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }
});
