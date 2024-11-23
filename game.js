document.addEventListener("DOMContentLoaded", function() {

      if(+localStorage.getItem("roundCount") === 5) {
          document.querySelector(".show").disabled = false;
          document.querySelector(".start").disabled = true;
      }else{
          document.querySelector(".show").disabled = true;
          document.querySelector(".start").disabled = false;
      }
      updateDisplay();
      updateHealthDisplay();
});


function updateDisplay() {
    const displayElements = document.querySelector('.roundCount');
      displayElements.textContent = `当前轮数: ${localStorage.getItem("roundCount")}`;
  }
function updateHealthDisplay() {
        const healths = getCookie("healths");
        let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
        const healthList = document.getElementById('healthList');
        healthList.innerHTML = ''; // 清空当前显示
        healthsArray.forEach((health, index) => {
          const playerDiv = document.createElement('div');
          playerDiv.textContent = `玩家${index + 1} 身份:未知;状态:${health<=0?"淘汰":"存活"}`;
          healthList.appendChild(playerDiv);
        });
      }
function setCookie(name, value, days) {
    localStorage.setItem(name, value);
}
function getCookie(name) {
    return localStorage.getItem(name)
}
function setRoundCount(value) {
    localStorage.setItem("roundCount",value);
    updateDisplay();
  }


function showTradeHealth() {
  let element = document.querySelector(".trade")
  element.style.display = element.style.display==="none"?"block":"none";
}
function doTrade(){
    let sell = document.getElementById("sell").value;
    let buy = document.getElementById("buy").value;
    let health = document.getElementById("health").value;
    const healths = getCookie('healths');
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    if(health<=0){
        alert("参数非法");
        return;
    }
    if (sell <= healthsArray.length && buy <= healthsArray.length
      && healthsArray[sell-1]>0 && healthsArray[buy-1]>0 && buy!==sell) {
        if (healthsArray[sell - 1] >= health) {
          healthsArray[sell - 1] -= health;
          healthsArray[buy - 1] = (+healthsArray[buy - 1] + +health);
          if(+healthsArray[sell - 1]===0) alert("玩家" + (sell) + "血量不足，已被淘汰");
          setCookie('healths', JSON.stringify(healthsArray), 7); // 存储7天
          updateHealthDisplay();
        } else {
          alert("交易失败，卖家血量不足");
        }
    }
}


function predationResult(predator,prey){
        return (
            predator-prey===1 || predator-prey === -2 ||
            (Math.floor(predator/10)-Math.floor(prey/10))===1 ||
            (Math.floor(predator/10)-Math.floor(prey/10)) ===-2 ||
            predator*prey ===0
        )
    }
function showPredation() {
  let element = document.querySelector(".predation")
  element.style.display = element.style.display==="none"?"block":"none";
}
function doPredation(){
    let predator = document.getElementById("predator").value;
    let prey = document.getElementById("prey").value;
    const identities = getCookie('identities');
    const healths = getCookie("healths")

    let identitiesArray = identities ? JSON.parse(decodeURIComponent(identities)) : [];
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    if (predator <= identitiesArray.length && prey <= identitiesArray.length) {
      if(healthsArray[predator-1]>0 && healthsArray[prey-1]>0 && predator!==prey) {
          if(+localStorage.getItem("roundCount")<=2){
              let protection = JSON.parse(localStorage.getItem("protection"));
              if(protection.includes(prey)){
                  alert("猎物在自然保护区里，本轮不可以被捕食")
                  return;
              }else{
                  protection.push(prey);
                  localStorage.setItem("protection",JSON.stringify(protection));
              }
          }
          if (!predationResult(identitiesArray[predator - 1], identitiesArray[prey - 1])) {
              let buf = predator;
              predator = prey;
              prey = buf;
              alert("捕食失败")
          } else {
              alert("捕食成功")
          }
          healthsArray[predator - 1] = +healthsArray[predator - 1] + (+localStorage.getItem("roundCount") === 1 ? 2 : +localStorage.getItem("roundCount"));
          healthsArray[prey - 1] -= (+localStorage.getItem("roundCount") === 1 ? 2 : localStorage.getItem("roundCount"));
          // console.log(predator,prey);
          // console.log(healthsArray[predator - 1],healthsArray[prey - 1])
          if (healthsArray[prey - 1] <= 0) alert("玩家" + (prey) + "血量不足，已被淘汰");
          let safe = JSON.parse(localStorage.getItem("safe"));
          safe.push(predator - 1);
          safe.push(prey - 1);
          localStorage.setItem("safe", JSON.stringify(safe))
          alert("操作完成")
      }
    }
    // 更新cookie
    setCookie('healths', JSON.stringify(healthsArray), 7);
    updateHealthDisplay();
}


function startNextRound() {
    let unsafe = "";
    const healths = getCookie("healths");
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    if(+localStorage.getItem("roundCount")!==5) {
        for (let i = 0; i < healthsArray.length; i++) {
            if (!JSON.parse(localStorage.getItem("safe")).includes(i) && healthsArray[i] > 0) {
                unsafe += ((+i+1)+",");
                healthsArray[i] -= (+localStorage.getItem("roundCount") === 1 ? 2 : +localStorage.getItem("roundCount"));
                if (healthsArray[i] <= 0) alert("玩家" + (i + 1) + "血量不足，已被淘汰");
            }
        }
        setCookie('healths', JSON.stringify(healthsArray), 7);
        updateHealthDisplay()
    }
    localStorage.setItem("protection",JSON.stringify([]));
    setRoundCount(+localStorage.getItem("roundCount") <=4? +localStorage.getItem("roundCount") + 1:+localStorage.getItem("roundCount"));
    if(+localStorage.getItem("roundCount") ===5){
        document.querySelector(".show").disabled = false;
        document.querySelector(".start").disabled = true;
    }
    localStorage.setItem("safe",JSON.stringify([]))
    document.querySelector(".auctionButton").disabled = false
    alert("玩家"+unsafe.slice(0,-1)+"本轮未参与捕食，已被扣除对应血量。")
}

function showAuction(){
    let element = document.querySelector(".auction")
  element.style.display = element.style.display==="none"?"block":"none";
}
function doAuction(){
    let buyer = document.getElementById("buyer").value;
    let health = document.getElementById("price").value;
    const healths = getCookie('healths');
    if(health<=0){
        alert("参数非法");
        return;
    }
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    if (buyer <= healthsArray.length
      && healthsArray[buyer-1]>0) {
      if (healthsArray[buyer - 1] > health) {
          // sell项减去health
          healthsArray[buyer - 1] -= health;
          setCookie('healths', JSON.stringify(healthsArray), 7); // 存储7天
          alert("买入成功");
          updateHealthDisplay();
          document.querySelector(".auction").style.display = "none";
          document.querySelector(".auctionButton").disabled = true;
      } else {
          alert("买入失败，买家血量不足");
      }
    }
}

function showResult() {
    const roles = {13:"♠J",23:"♠Q",33:"♠K",12:"♥J",22:"♥Q",32:"♥K",11:"♣J",21:"♣Q",31:"♣K",0:"JOKER"};
    const healths = getCookie("healths");
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    const identities = getCookie('identities');
    let identitiesArray = identities ? JSON.parse(decodeURIComponent(identities)) : [];
    const healthList = document.getElementById('healthList');
    healthList.innerHTML = ''; // 清空当前显示
    healthsArray.forEach((health, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = `玩家${index + 1} 身份:${roles[identitiesArray[index]]};剩余血量:${health}`;
        healthList.appendChild(playerDiv);
    })
}



//测试用函数
function getData(){
    const roles = {13:"♠J",23:"♠Q",33:"♠K",12:"♥J",22:"♥Q",32:"♥K",11:"♣J",21:"♣Q",31:"♣K",0:"JOKER"}
    const identities = getCookie('identities');
    const healths = getCookie("healths")

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
    setCookie("healths",JSON.stringify(healths),7);
    updateDisplay();
    updateHealthDisplay();
    document.querySelector(".show").disabled = true;
    document.querySelector(".start").disabled = false;
    console.log("游戏状态已重置");
}

function alterHealth(user,health){
    const healths = getCookie("healths")
    let healthsArray = healths ? JSON.parse(decodeURIComponent(healths)) : [];
    healthsArray[+user-1] = +healthsArray[+user-1]+ +health;
    if(healthsArray[+user-1]<=0) alert(`玩家${user}血量不足，已被淘汰`);
    setCookie("healths",JSON.stringify(healthsArray),7);
    updateDisplay();
    updateHealthDisplay();
    getData();
}