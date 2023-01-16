import 'dotenv/config'
export default {
  "expo": {
    "owner": "pocketchange_loyalty_inc",
    "name": "PocketChange",
    "slug": "pocketchange_frontend",
    "version": "0.2.2",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "pocketchange",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "ca.pocketchangeapp.pocketchange",
      "buildNumber": "2",
      "associatedDomains": ["applinks:www.pocketchangeapp.ca", "applinks:pocketchangeapp.ca"]
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.eswilliams.pocketchange_frontend"
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      firebaseDatabaseURL: process.env.FIREBASE_REALTIME_DATABASE_URL,
      graphQLURL: process.env.GRAPHQL_URL,
      "eas": {
        "projectId": "6f2a3fd4-8dd0-4936-9afe-62388c3f7198"
      }
    },
    "plugins": [
      [
        "@stripe/stripe-react-native",
        {
          "merchantIdentifier": "merchant.ca.pocketchangeapp.pocketchange",
          "enableGooglePay": false
        },
      ],
      [
        "expo-build-properties",
        {
          "ios": {
            "deploymentTarget": "13.0"
          }
        }
      ]
    ],
  },

}