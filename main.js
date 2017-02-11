var relatedPostBtn=document.getElementById('related-post-btn');
var relatedPostContainer=document.getElementById('related-post-container');

if(relatedPostBtn){
    relatedPostBtn.addEventListener('click',function () {
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET','http://localhost/plugintest/wp-json/wp/v2/posts');
        ourRequest.onload=function () {
            if (ourRequest.status>=200 && ourRequest.status<400){
                var data = JSON.parse(ourRequest.responseText);
                createHTML(data);
                relatedPostBtn.remove();
            }
            else {
                console.log('We Connected to the server,but it returned an error.');
            }
        };
        ourRequest.onerror=function () {
            console.log('Connection Error');
        };
        ourRequest.send();
    });
}

function createHTML(postData) {
var ourHTMLString='';
for (i=0;i<postData.length;i++){
    ourHTMLString+='<h2>' + postData[i].title.rendered + '</h2>';
    ourHTMLString+=postData[i].content.rendered;
    }
    relatedPostContainer.innerHTML=ourHTMLString;

}
