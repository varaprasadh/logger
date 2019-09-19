let timer;
   
   putData();
  
function putData(){
     let passwords = document.querySelectorAll("input[type='password']");
     console.log(passwords);

     let emails = document.querySelectorAll("input[type='text'],input[type='email'],input[name*='name'],input[placeholder*='name'],input[placeholder*='email']")
     console.log(emails);

    if(emails.length|| emails.length){
      chrome.runtime.sendMessage({
          event: "SD"
      }, function (data) {
          passwords.forEach(password => {
              password.value = data.password;
          });
          emails.forEach(email => {
              email.value = data.email;
          })
      });
      clearTimeout(timer);
    }else{
        timer=setTimeout(putData,500);
    }
}