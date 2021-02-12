import 'react-native-gesture-handler';
import * as React from 'react'
import {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Image, FlatList, ActivityIndicator, Button, Text, View, TextInput, TouchableOpacity } from 'react-native';




function SplashScreen({ navigation }){
  setTimeout(() => {
    navigation.navigate('Login')
  }, 2000);

  return(
    <View style={styles.container} >
    <TouchableOpacity
    onPress={() => navigation.navigate('Login')}
    style={styles.container}
    >
      <Image style={styles.image} source={require('./image/hi.png')}/>
    </TouchableOpacity>
    </View>
  )

}

function LoginScreen({ navigation }){

  const [email, setEmail] = useState('');

  function handleSubmit(){

    if(email.length !== 0 || email !== ''){
      navigation.navigate('Profile', {post:email})

      var myHeaders = new Headers();
      var formdata = new FormData();

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`https://jsonplaceholder.typicode.com/users?email=${email}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    } else{
      alert('You shall not pass! Check your credentials.')
    }
    setEmail('')
  }
  return(
    <View style={styles.container}>
    <Image style={styles.imageLogin} source={require('./image/hi.png')}/>
    <TextInput 
    placeholder="email"
    style={styles.input}
    value={email}
    onChangeText={setEmail}
    required
     />
    <TouchableOpacity
    onPress={handleSubmit}
    style={styles.button}
    >
    <Text style={styles.text}> Sign in</Text>
    </TouchableOpacity>
    </View>
  )
}

function ProfileScreen ({ route, navigation }){

  useEffect(() => {
      if(route.params?.post){
      }
  
    }, [route.params?.post]);
  
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri:`https://robohash.org/${route.params?.post}.png`}}/>
        
        <Text style={styles.text}>
          Email: {route.params?.post}
        </Text>
         <TouchableOpacity
            onPress={() => navigation.navigate('Menu')}
            style={styles.button}
            >
            <Text style={styles.text}> Menu</Text>
        </TouchableOpacity>
      </View>
    )
}

function MenuScreen({navigation}){

  return(
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Post')}
        >
        <Text style={styles.text}>Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
        >
        <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Album')}
        >
        <Text style={styles.text}>Album</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
        >
        <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
    </View>
  );
};

function PostScreen({navigation}){

  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

    useEffect(()=>{
      fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => response.json())
        .then(json => {
          console.log(json)
          setPosts(json)})
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false));
  }, [])

  return(
    <View >
      <TouchableOpacity
        style={styles.containerHeader}
        onPress={() => navigation.navigate('Menu')}>
          <Image style={styles.arrowimg} source={require('./image/arrow.png')}/>
      </TouchableOpacity>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
        data={posts}
        keyExtractor={({id}, index ) => id}
        renderItem={({item}) => (
          
          <TouchableOpacity 
          style={styles.item} 
          onPress={() => alert(`${item.id}) ${item.title} \n\n ${item.body}`)}>
            <Text style={styles.text}>{item.body}</Text>
          </TouchableOpacity>
        
        )}
        />
      )}
    </View>
  )
}

function AlbumScreen({navigation}){
  

  const [album, setAlbum] = useState([]);
  const [isLoading, setLoading] = useState(true)

    useEffect(()=>{
      fetch(`https://jsonplaceholder.typicode.com/albums`)
        .then(response => response.json())
        .then(json => {
          console.log(json)
          setAlbum(json)})
        .catch(error => console.log('error', error))
        .finally(() => setLoading(false));
  }, [])

  return(
    <View >
      <TouchableOpacity
        style={styles.containerHeader}
        onPress={() => navigation.navigate('Menu')}>
          <Image style={styles.arrowimg} source={require('./image/arrow.png')}/>
      </TouchableOpacity>

      {isLoading ? <ActivityIndicator/> : (
        
        <FlatList
        data={album}
        keyExtractor={({id}, index ) => id}
        renderItem={({item}) => (
          
          <TouchableOpacity
          style={styles.item}
          onPress={() => alert(`${item.id}) ${item.title}`)}>
            <Text style={styles.text}>{item.title}</Text>

          </TouchableOpacity>
        
        )}
        />
      )}
    </View>
  )
}

const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Album" component={AlbumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  arrowimg:{
    height: 20,
    width: 20,
    marginBottom:10
  },
  containerHeader: {
    justifycontent: 'flex-start',
    padding: 10,
    backgroundColor:'#0f2211',
    borderBottomWidth: 1,
    borderBottomColor: '#9DA6A7',
  },
  container: {
    flex: 1,
    justifycontent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor:'#0f2211'
  },
  image:{
    justifycontent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
    marginTop:100,
  },
  imageLogin:{
    justifycontent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    margin:100,
  },
  item:{
    backgroundColor:'#0f2211',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#9DA6A7',
  },
  button:{
    margin: 20,
    padding:15,
    backgroundColor: '#1d4921',
    height: 50,
    width: 150,
    justifycontent: 'center',
    alignItems: 'center',
    borderRadius:6,
    fontSize:50,
  },
  text:{
    color: 'white',
  },
  splashbutton:{
    padding:15,
    width: 150,
    justifycontent: 'center',
    alignItems: 'center',
    borderRadius:6,
  },
  splashcontainer: {
    flex: 1,
    justifycontent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 50,
    backgroundColor:'#0f2211'
  },
  splahstext:{
    marginTop:100,
    justifyContent:'center',
    alignItems:'center',
    color:'white',
    fontSize:200,
  },
  input:{
    height: 50,
    width: 300,
    padding: 10,
    backgroundColor:'white',
    borderColor: "#20232a",
    borderRadius: 6,
  }
});

export default App;