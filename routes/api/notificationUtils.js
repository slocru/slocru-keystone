var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.FCM_ACCOUNT_TYPE,
    "project_id": process.env.FCM_ACCOUNT_PROJECT_ID,
    "private_key_id": process.env.FCM_ACCOUNT_PRIVATE_KEY_ID,
    "private_key": process.env.FCM_ACCOUNT_PRIVATE_KEY,
    "client_email": process.env.FCM_ACCOUNT_CLIENT_EMAIL,
    "client_id": process.env.FCM_ACCOUNT_CLIENT_ID,
    "auth_uri": process.env.FCM_ACCOUNT_AUTH_URI,
    "token_uri": process.env.FCM_ACCOUNT_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FCM_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FCM_ACCOUNT_CLIENT_X509_CERT_URL
  }),
  databaseURL: "https://cru-central-coast-ios.firebaseio.com"
});

module.exports.sendToDevice = function(tokens, payload, callback) {
    payload.content_available = true;
    payload.priority = 'high';
    //payload.data.sound = 'default';

    admin.messaging().sendToDevice(tokens, payload).then(function(response) {
        console.log("Successfully sent message:", response);
        callback();
    })
    .catch(function(error) {
        console.log("Error sending message:", error);
        callback();
    });
}

module.exports.sendToTopic = function(topics, payload, callback) {
    admin.messaging().sendToTopic(topics, payload).then(function(response) {
        console.log("Successfully sent message:", response);
        callback();
    })
    .catch(function(error) {
        console.log("Error sending message:", error);
        callback();
    });
}
