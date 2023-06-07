import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

    const [value , setValue] = useState("Hello")
    const [todo, setTodo] = useState([])
    const [loading , setLoading] = useState(true)

    useEffect(()=>{
        const getInitialData = async () => {
            const { data } = await axios.get('http://localhost:3000')
            data.map((item)=>(setTodo((prev)=>[...prev,item.task])))
            setLoading(false)
        }
        getInitialData()
    },[])

    const addTodo = async (e) => {
        e.preventDefault()
        setTodo((prev)=>[...prev,value])

        const { data } = await axios.post('http://localhost:3000/postTask',{
            task : value
        })
        console.log(data)

        setValue("")
    }

  return (
    <View style={styles.container}>
      <form onSubmit={(e)=>addTodo(e)}>
      { loading ?
        <Text>Loading</Text> :
        <div>
            <TextInput
                style={styles.text}
                value={value}
                onChangeText={(text)=>setValue(text)}
            />
            <Button
                type='submit'
                title='Add'
            />
          </div>
      }
      </form>
      {todo.map((item,idx)=>(<Text key={idx}>{item}</Text>))}
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    text : {
        width : '5cm',
        height : '1cm',
        padding : '0.3cm',
        borderWidth : 2,
        borderColor : '#000',
        borderRadius : '8px',
    }
});
