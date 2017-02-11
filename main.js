
/*<button id="related-post-btn">Load More Related Posts</button>
<div id="related-post-container"></div>*/

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

//Quick blog post AJAX

/*<?php if(current_user_can('administrator')):?>
 <div class="admin-quick-add">
 <h3>Quick Add Post</h3>
 <input type="text" name="title" placeholder="Title">
 <textarea name="content" placeholder="Content"></textarea>
 <button id="quick-add-button">Create Post</button>
 </div>
 <?php endif; ?>*/

var quickAddBtn=document.querySelector('#quick-add-button');
if(quickAddBtn){

    quickAddBtn.addEventListener('click',function () {
        var ourPostData={
            'title':document.querySelector('.admin-quick-add [name="title"]').value,
            'content':document.querySelector('.admin-quick-add [name="content"]').value,
            'status':'publish'

        }

        var createPost=new XMLHttpRequest();
        createPost.open('POST','http://localhost/plugintest/wp-json/wp/v2/posts');
        createPost.setRequestHeader('X-WP-Nonce' , magicalData.nonce);
        createPost.setRequestHeader('Content-Type','application/json;Charset=UTF-8');
        createPost.send(JSON.stringify(ourPostData));

        createPost.onreadystatechange=function () {
            if (createPost.readyState==4){
                if (createPost.status==201){
                    document.querySelector('.admin-quick-add [name="title"]').value='';
                    document.querySelector('.admin-quick-add [name="content"]').value='';
                }
                else {
                    alert('Error - Please Try again later!');
                }
            }
        }
    });
}


