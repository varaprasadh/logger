let data;

chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if(request.event=="SD"){
             sendResponse(data);
            }
            if (request.event == "newStack"){
               data=request.data;     
            } 
        });