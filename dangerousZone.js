function showAlterZone(){
    let element = document.querySelector(".alter")
    element.style.display = element.style.display==="none"?"block":"none";
}
function doAlter(){
    let method = document.querySelector('input[name="choice"]:checked').value;
    let num = document.querySelector('#alterNum').value;
    let gamer = document.querySelector('#gamer').value;
    const healths = getCookie("healths");
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    if(method == 0){
        healthsArray[gamer-1]= +num + +healthsArray[gamer-1];
    }else{
        healthsArray[gamer-1]= +num;
    }
    if(healthsArray[gamer-1]<=0) alert("玩家" + (gamer) + "血量不足，已被淘汰")
    setCookie('healths', JSON.stringify(healthsArray), 7);
    alert("更新血量完成");
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let log = localStorage.getItem("log");
    log+=`<p>时间：${hours}:${minutes}:${seconds}；操作：改变血量；玩家${gamer}血量${method==0?'增加了':'改变至'}${num}点</p>`
    localStorage.setItem("log",log);
    document.querySelector("#logInfo").innerHTML=log;
}