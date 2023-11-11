import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';


function Main(props) {
    // Variáveis de estado
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    
    // Função  utilizada para adicionar uma tarefa
    const handleAddTask = () => {
        if (task) {
            if (editIndex !== -1 ) {
                const updatedTasks = [...tasks]; 
                updatedTasks[editIndex] = task; 
                setTasks(updatedTasks); 
                setEditIndex(-1); 
            } else {
                setTasks([...tasks, task]);
            }
            setTask("");
        }
    }

    // Função  utilizada para editar uma tarefa
    const handleEditTask = (index) => {
        const taskToEdit = tasks[index];
        setTask(taskToEdit);
        setEditIndex(index);
    }

    // Função  utilizada para deletar uma tarefa
    const handleDeleteTaskt = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    }

    // Função para renderizar cada item da lista Ela retorna um componente View contendo o texto da tarefa e botões "Edit" e "Excluir"
    const renderItem = ({ item, index }) => (
        <View style={styles.task}>
            <Text style={styles.itemList}>{item}</Text>
            <View style={styles.taskButtons}>
                <TouchableOpacity onPress={() => handleEditTask(index)}>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTaskt(index)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ToDoList APP by joão carlos</Text>
            <TextInput
                style={styles.input}
                placeholder='Escreva uma lista de tarefas'
                value={task}
                onChangeText={(text) => setTask(text)}
            />  
            <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddTask}> 
                <Text style={styles.addButtonText}> 
                    {editIndex !== -1 ? "Update Task" : "Adicione tarefa"} 
                </Text>
            </TouchableOpacity>
            <FlatList 
                data={tasks} 
                renderItem={renderItem} 
                keyExtractor={(item, index) => index.toString()} 
            />
        </View>
    );
}

export default Main;

// Estilos dos elementos da interface
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        top: 100,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkblue'
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'darkblue',
        borderWidth: 1,
        borderRadius: 7,
        padding: 10,
        top: 120
    },
    addButton: { 
        backgroundColor: "darkblue", 
        height: 40,
        width: 300,
        padding: 7, 
        borderRadius: 5, 
        marginBottom: 10, 
        top: 130
    }, 
    addButtonText: { 
        color: "white", 
        fontWeight: "bold", 
        textAlign: "center", 
        fontSize: 18, 
    }, 
    task: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        height: 40,
        width: 300,
        fontSize: 18, 
        top: 170
    }, 
    itemList: { 
        fontSize: 19, 
    }, 
    taskButtons: { 
        flexDirection: "row", 
    }, 
    editButton: { 
        marginRight: 10, 
        color: "darkblue", 
        fontWeight: "bold", 
        fontSize: 18, 
    }, 
    deleteButton: { 
        color: "darkred", 
        fontWeight: "bold", 
        fontSize: 18, 
    },
})