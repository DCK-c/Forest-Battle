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
function checkIdentity(){
    let user = document.querySelector("#checkIdentity").value;
    let identities = JSON.parse(decodeURIComponent(getCookie("identities")));
    let roles = {13:"♠J",23:"♠Q",33:"♠K",12:"♥J",22:"♥Q",32:"♥K",11:"♣J",21:"♣Q",31:"♣K",0:"JOKER"};
    alert(`玩家${user}身份：${roles[identities[+user -1]]}`);
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let log = localStorage.getItem("log");
    log+=`<p>时间：${hours}:${minutes}:${seconds}；操作：查看身份；查看了玩家${user}的身份</p>`
    localStorage.setItem("log",log);
    document.querySelector("#logInfo").innerHTML=log;
}
function checkHealth(){
    let user = document.querySelector("#checkHealth").value;
    const healths = getCookie("healths");
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    alert(`玩家${user}剩余血量：${healthsArray[+user -1]}`);
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let log = localStorage.getItem("log");
    log+=`<p>时间：${hours}:${minutes}:${seconds}；操作：查看血量；查看了玩家${user}的剩余血量</p>`
    localStorage.setItem("log",log);
    document.querySelector("#logInfo").innerHTML=log;
}