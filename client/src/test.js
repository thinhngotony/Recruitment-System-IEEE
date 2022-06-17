const admin = require('firebase-admin')
const serviceAccount = ('./client_secrets.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

function getQuote() {
    const quoteData = {
    quote: "random",
    author: "String"
    };
    return db.collection("sampleData").doc("inspiration").set(quoteData).then(() => {
    console.log("new quote was written to the database");})
    }
    // getQuote();
    
