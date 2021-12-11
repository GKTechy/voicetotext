import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,Button,SafeAreaView,Alert  } from 'react-native';

import Voice from '@react-native-voice/voice';

export default function App() {
  const [result,setResult]=useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    
    console.log("is avilable-->"+JSON.stringify(Voice.isAvailable()))
    return ()=>{
      Voice.destroy().then(Voice.removeAllListeners);
    }
  },[])

  const onSpeechStartHandler=(e)=>{
    console.log("onSpeechStartHandler-->"+e)
  }
  
  const onSpeechEndHandler=(e)=>{
       console.log("onSpeechEndHandler-->"+e)
  }
  
  const onSpeechResultsHandler=(e)=>{
    let text=e.value;
    setResult(text);
    console.log("onSpeechResultsHandler-->"+e)
  }

  const startRecording= async ()=>{
    try{
      console.log("Calling startRecording-->")
      await Voice.start('en-US');
    }catch(err){
      console.log("Error raised"+err)
    }
  }

  
  const stopRecording= async ()=>{
    try{
      console.log("Calling stopRecording-->")
      await Voice.stop();
    }catch(err){
      console.log("Error raised"+err)
    }
  }


  return (
    <View style={styles.container}>
       <Text>Voice to Text Conversion</Text>
          
          <View style={styles.fixToText}>
              <Button
                title="Start Recording"
                onPress={startRecording}
              />
              <Text>    </Text>
              <Button
                title="Stop Recording"
                onPress={stopRecording}
              />
          </View>
          <View>
            <Text>Result:  {result}
            
            {result.map((result, index) => {
						return (
							<Text
								key={`result-${index}`}>
								{result}
							</Text>
						);
					})}
          </Text>
          </View>
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
});
