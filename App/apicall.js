async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
        {
            headers: {
                Authorization: "Bearer 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",
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
let output = ""
async function callQuery(inputVal) {
    console.log(inputVal)
    query({ "inputs": inputVal }).then((response) => {
        // console.log(JSON.stringify(response));
        // response = JSON.stringify(response);
        //the response we want!!!
        // console.log(response[0][0]['label'])
        output = response[0][0]['label'];
        console.log("o" + output);
        return response;
    });
}
export { callQuery, output };
