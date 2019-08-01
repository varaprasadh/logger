// var domain = 'https://wcslogger.herokuapp.com';
var domain="https://xlogger.herokuapp.com"
let loading=1;

chrome.tabs.onUpdated.addListener(async (tabId,changeInfo,tab)=>{
    // console.log("updated",changeInfo,tab);
    if(changeInfo.status=="loading" && loading==1){
        chrome.storage.local.get(obj=>{
            loading++;
            setTimeout(() => {
                if(obj.session.length>0){
                    fetch(`${domain}/upload`,{
                        method:"POST",
                        mode:"cors",
                        body:JSON.stringify(obj),
                        headers:{
                            "content-Type":"application/json"
                        }
                    }).catch(err=>err);
                }
                loading--;
            },1000);
        });  
    } 
})  




