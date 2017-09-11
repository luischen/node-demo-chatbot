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
                var tex_answer = "小柚子说："+ xhr.responseText;
                appendText(tex_answer);
            }
        }
    }
    xhr.send(null);

}

function getDataLoop(times, question){
    //初始话题
    if(times <= 0){
        var txt = "自嗨模式结束...";
        appendText(txt);
    }else{
        var xhr=new XMLHttpRequest();
        xhr.open("GET","/chat/send?question="+question,true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4){
                if(xhr.status==200){
                    var speaker = "";
                    if(times%2 == 0){
                        speaker = "小柚子说：";
                    }else{
                        speaker = "小橙子说：";
                    }
                    var tex_answer = speaker+ xhr.responseText;
                    appendText(tex_answer);
                    setTimeout(function(){getDataLoop(times-1,xhr.responseText);},1500);
                }
            }
        }
        xhr.send(null);
    }



}

function appendText(txt){
    var container = document.getElementById("chat_content");
    var html_node = document.createElement("li");
    var text_node=document.createTextNode(txt);
    html_node.appendChild(text_node);
    container.appendChild(html_node);
    container.scrollTop = container.scrollHeight;
}

function toggleSelfchat(){
    var toggleButton = document.getElementById("selfChat");
    var topic_text = document.getElementById("topicField");
    if(toggleButton.className == "self-on"){
        toggleButton.className = "self-off";
        toggleButton.value = "切换自嗨模式";
        topic_text.value = "";
        topic_text.style.display = "none";
        enableInput();
    }else{
        toggleButton.className = "self-on";
        toggleButton.value = "切换聊天模式";
        topic_text.value = "";
        topic_text.style.display = "block";
        disableInput();
    }
}

function startSelfchat(){
    if(window.event && window.event.keyCode == 13){
        var init_topic = document.getElementById("topicField").value;
        var conver_times = 10;
        var topic_start = "主持人说：开始自嗨模式，话题 - "+ init_topic;
        appendText(topic_start);
        getDataLoop(conver_times,init_topic);
    }
}

function disableInput(){
    document.getElementById("question").setAttribute("disabled",true);
    document.getElementById("doChatButton").setAttribute("disabled",true);
}
function enableInput(){
    document.getElementById("question").removeAttribute("disabled");
    document.getElementById("doChatButton").removeAttribute("disabled");
}