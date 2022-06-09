import OT from '@opentok/client'


 /** * Represents Session Creation of Video Call
 * @module {function} Session Creation  */


let session;

export const createSession=(sessionData)=>{session=OT.initSession(sessionData.api_key,sessionData.session_id)}

let stream;
var connectionCount = 0;
export const endSession=()=>{ 
  session.disconnect();
  connectionCount=0
}

const handleError = (error) => {
  if (error) {
    alert(error.message);
  }
};


export const initializeSession = (token) => {
  
  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
   stream=event.stream 
  // console.log(session.getSubscribersForStream(event.stream))
  });

  // Create a publisher
  // const publisher = OT.initPublisher(
  //   "publisher",
  //   {
  //     insertMode: "append",
  //     width: "100%",
  //     height: "100%",
  //   },
  //   handleError
  // );
  
  session.on("connectionCreated", function (event) {
  connectionCount++;
  console.log(connectionCount)
});

  session.on("connectionDestroyed", function (event) {
  connectionCount--;
   console.log(connectionCount);

 if(connectionCount<2){
    //  session.disconnect()
    endSession()
     alert("Call was disconnected.")
 }
}); 

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      // session.publish(publisher, handleError);
    }
  });
};

export const sessionMembers=()=>{
  return stream
}














