import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';

import Btn from './Components/Btn';
import { Dimensions } from 'react-native';
import { callQuery, output } from './apicall';
import EmotionRow from './Components/EmotionRow';
// import EmotionRow from './Components/EmotionRow';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const bg = '#FFCABD';
let run = false;

export default function App() {
  let [started, setStarted] = useState(false);
  let [results, setResults] = useState([]);
  let [currEmotion, setCurrEmotion] = useState("joy");
  let [bgColor, setBgColor] = useState('#ffe058');
  let [emoji, setEmoji] = useState("😀");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const handleClick = () => {
    // 👇️ toggle
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };
  const startSpeechToText = async () => {
    setResults([]);
    console.log(results)
    await Voice.start("en-NZ");
    setStarted(true);
    // let emotion;
    // await callQuery();
    // let emotion = await output
    // console.log(emotion);
    // setCurrEmotion(callQuery());

  };

  const determineEmotion = (currEmotion) => {
    switch (currEmotion) {
      case "joy":
        // console.log('run')
        setBgColor("#F9E458");
        setEmoji("😀");

        break;
      case "anger":
        // console.log('run')
        setBgColor("#FA5959");
        setEmoji("🤬");
        // bg = "#FA5959";
        break;
      case "disgust":
        setBgColor("#EA5AF1");
        setEmoji("🤢");
        break;
      case "fear":
        setBgColor("#039953");
        setEmoji("😨");
        break;
      case "neutral":
        console.log('run');
        setBgColor("#FFCABD");
        setEmoji("😐");
        break;
      case "sadness":
        setBgColor("#5E7DFF");
        setEmoji("😭");
        break;
      case "surprise":
        setBgColor("#59CCFA");
        setEmoji("😲");
        break;
    }
  }

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
    // await callQuery(results[0]);
    // let emotion = await output;
    // await determineEmotion(emotion);
    // await setCurrEmotion(emotion);
    // console.log(currEmotion);

    // await callQuery(results[0]);


  };
  const onSpeechResults = async (result) => {
    setResults(result.value);
    // console.log(results);
    handleClick();

    // // await callQuery(results[0]);
    // let emotion = findEmotionEmergency(results[0]);
    // determineEmotion(emotion);
    // // setCurrEmotion(emotion)
    // setCurrEmotion(emotion);

    setTimeout(() => {
      let emotion = findEmotionEmergency(results[0]);
      determineEmotion(emotion);
      // setCurrEmotion(emotion)
      setCurrEmotion(emotion);
      console.log(emotion)
      console.log(bgColor)
      console.log(results)
    }, 500);
    // setTimeout(() => {
    //   // emotion = output;
    //   // console.log("a" + emotion);
    //   // determineEmotion('joy');
    //   // // setCurrEmotion(emotion)
    //   // setCurrEmotion('joy');
    //   // run = true;
    // }, 500);

    // console.log(emotion)

    // console.log(emoji)
    // await setCurrEmotion(emotion);
    // console.log(currEmotion);

  };

  const getBgColor = () => {
    return bgColor;
  }
  const neutral = ["hello", "hi", "interesting"];
  const anger = ["frustrated", "angry", "annoyed"];
  const joy = ["happy", "joy", "great", "fun"];
  const disgust = ["disgusting", "dirty"];
  const sadness = ["sad", "upset", "cry", "mean"];
  const surprise = ["shocked", "surprise", "unexpected"];
  const fear = ["scared", "frightened"]
  const findEmotionEmergency = (value) => {
    let myArr = value.split(" ");
    for (let i = 0; i < myArr.length; i++) {
      if (neutral.includes(myArr[i])) {
        return "neutral"
      }
      if (anger.includes(myArr[i])) {
        return "anger"
      }
      if (sadness.includes(myArr[i])) {
        return "sadness"
      }
      if (disgust.includes(myArr[i])) {
        return "disgust"
      }
      if (fear.includes(myArr[i])) {
        return "fear"
      }
      if (surprise.includes(myArr[i])) {
        return "surprise"
      }
      if (joy.includes(myArr[i])) {
        console.log(myArr[i])
        return "joy"
      }

    }
    return "neutral";
  }
  const onSpeechError = (error) => {
    console.log(error);
  };

  return (
    <View style={[styles.container, {
      // backgroundColor: '#ffe058',
      // backgroundColor: isActive ? '#21a0a1' : '#757678',
      backgroundColor: bgColor,


    }]}>
      {/* <TouchableOpacity onPress={startSpeechToText}>
        <Btn />
      </TouchableOpacity> */}
      <Text style={styles.txt}>{results[0]}</Text>
      {/* <Text style={styles.txt}>I love Colormotion</Text> */}
      {!started ?
        <TouchableOpacity onPress={startSpeechToText}>
          <Btn text="START" />
        </TouchableOpacity> :
        undefined
      }
      {started ?
        <TouchableOpacity onPress={stopSpeechToText}>
          <Btn text="STOP" />
        </TouchableOpacity> :
        undefined
      }
      {/* {!started ? <Button title='Start Speech to Text' onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Stop Speech to Text' onPress={stopSpeechToText} /> : undefined} */}
      {/* {results.map((result, index) => <Text key={index} style={styles.txt}>{result}</Text>)} */}
      <EmotionRow text={currEmotion} emoji={emoji} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F9E458",

    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: windowHeight / 25,
    paddingBottom: windowHeight / 20
  }
});
