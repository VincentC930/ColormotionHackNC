//NLP model call
async function queryNLP(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
        {
            headers: {
                Authorization: "Bearer XYZ",
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
//Voice classification model call
async function queryVoiceClassification(voiceData) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/harshit345/xlsr-wav2vec-speech-emotion-recognition",
        {
            headers: {
                Authorization: "Bearer XYZ",
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
async function weightOutputs(NLP, VC) {
    let arr = [];
    let maxLabel = "";
    let maxValue = -1;
    const finalOutput = "";
    for (let i = 0; i < NLP.length; i++) {
        for (let j = 0; j < NLP.length; j++) {
            if (VC[i][j]['value'] > 0.8) {
                return VC[i][j]['label']
            }
            arr[i] = VC[0][j]['value'] * 0.3 + NLP[0][j]['value'] * 0.7;
            if (arr[i] > maxValue) {
                maxLabel = VC[0][j]['label'];
            }
        }

    }
    return maxLabel;

}
let output = ""
async function callQuery(inputVal, voice) {
    console.log(inputVal)
    let outputNLP;
    let outputVoice;
    queryNLP({ "inputs": inputVal }).then((response) => {
        // console.log(JSON.stringify(response));
        // response = JSON.stringify(response);
        //the response we want!!!
        // console.log(response[0][0]['label'])
        // output = response[0][0]['label'];
        // console.log("o" + output);
        // return response;
        outputNLP = response;
    });
    queryVoiceClassification({ "inputs": voice }).then((response) => {
        // output = response[0][0]['label'];
        // console.log("o" + output);
        // return response;
        outputVoice = response;
    });
    output = weightOutputs(outputNLP, outputVoice);
}
export { callQuery, output };
