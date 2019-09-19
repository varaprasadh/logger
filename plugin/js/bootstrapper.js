let login_btns=[];
let loader=document.querySelector('.loading');
let timer;
window.onload=function(){
      getButtons();
}

function getButtons(){
    if(loader.style.display!="none"){
        timer=setTimeout(getButtons,500);
    }else{
        login_btns = document.querySelectorAll(".login");
        console.log(login_btns);
        addListeners();
        clearTimeout(timer);
       
    }
}
function addListeners(){
    login_btns.forEach(btn=>{
        btn.addEventListener('click',e=>{
            data=JSON.parse(btn.dataset.data);
            let {email,password,hostURL,host}=data;
            chrome.runtime.sendMessage({event:"newStack",data:{email,password}});
            url=getparsedUrl(host);
            window.location.href=url;
        })
    })
}
function getparsedUrl(url){
if (!/^http?:\/\//i.test(url)) {
   return 'http://' + url;
}
return url;
}