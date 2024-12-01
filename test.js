//测试用函数
function getData(){
    const roles = {13:"♠J",23:"♠Q",33:"♠K",12:"♥J",22:"♥Q",32:"♥K",11:"♣J",21:"♣Q",31:"♣K",0:"JOKER"}
    const identities = getStorage('identities');
    const healths = getStorage("healths")

    let identitiesArray = identities ? JSON.parse(decodeURIComponent(identities)) : [];
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    for(let i=0;i<10;i++){
      console.log("玩家"+(i+1)+"剩余血量："+healthsArray[i]+"，身份："+roles[identitiesArray[i]])
    }
    console.log("快去学技术！")
    console.log("未响应你是我找bug的神")
}
function resetGame(){
    const healths = [20,20,20,20,20,20,20,20,20,20];
    localStorage.setItem("roundCount","1");
    localStorage.setItem("safe",JSON.stringify([]));
    setStorage("healths",JSON.stringify(healths));
    updateDisplay();
    updateHealthDisplay();
    document.querySelector(".show").disabled = true;
    document.querySelector(".start").disabled = false;
    console.log("游戏状态已重置");
}

function alterHealth(user,health){
    const healths = getStorage("healths")
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    healthsArray[+user-1] = +healthsArray[+user-1]+ +health;
    if(healthsArray[+user-1]<=0) alert(`玩家${user}血量不足，已被淘汰`);
    setStorage("healths",JSON.stringify(healthsArray));
    updateDisplay();
    updateHealthDisplay();
    getData();
}