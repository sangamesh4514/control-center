importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyDFX9z-9EKHzd1ZPy-vz1pmZq7quV-MAfU",
  authDomain: "aido-f8658.firebaseapp.com",
  projectId: "aido-f8658",
  storageBucket: "aido-f8658.appspot.com",
  messagingSenderId: "940305599907",
  appId: "1:940305599907:web:e13d3ab307f4727e8e5e16",
  measurementId: "G-3014YYRBRQ",
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
  // do what you want
  // ...
});
// this.importScripts("https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js");
// this.importScripts("https://www.gstatic.com/firebasejs/7.0.0/firebase-messaging.js");

// firebase.initializeApp({
//   apiKey: "AIzaSyCJf-cN8o0US2a7-mpIqMyIM3y_w2GDRBA",
//   authDomain: "fir-aido.firebaseapp.com",
//   projectId: "fir-aido",
//   storageBucket: "fir-aido.appspot.com",
//   messagingSenderId: "123816678353",
//   appId: "1:123816678353:web:7a3c918a45b67e098046f0",
// });

// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler((payload)=>{
//   const title='message'
//   const options=payload
//   return this.ServiceWorkerRegistration.showNotification(title,options)
// })