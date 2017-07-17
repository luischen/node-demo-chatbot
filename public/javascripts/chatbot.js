function FinishInput(){
    if(window.event && window.event.keyCode == 13){
        GetData();
    }
}
function GetData(){
    var question = document.getElementById("question").value;
    if(!question){
        return;
    }
    var txt = "您说："+question;
    appendText(txt);
    document.getElementById("question").value="";

    var xhr=new XMLHttpRequest();
    xhr.open("GET","/chat/send?question="+question,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                var tex_answer = "小橙子说："+ xhr.responseText;
                appendText(tex_answer);
            }
        }
    }
    xhr.send(null);

}

function appendText(txt){
    var container = document.getElementById("chat_content");
    var html_node = document.createElement("li");
    var text_node=document.createTextNode(txt);
    html_node.appendChild(text_node);
    container.appendChild(html_node)
}