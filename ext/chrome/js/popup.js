window.onload = function () {
      let input = document.querySelector('.uid');
      let btn = document.querySelector('.submit');
      let uid_text = '';
      btn.addEventListener('click', (e) => {
          uid_text = input.value;
          console.log(uid_text);
          chrome.storage.sync.set({
              uid:uid_text
          });
          alert("uid has been set");
      });
      chrome.storage.sync.get(['uid'],obj=>{
          input.value=obj.uid
      });
  }