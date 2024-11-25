window.identities = [];
// function alert(value){
//     var popup = document.querySelector('.popup-content');
//     var close = document.getElementsByClassName('close')[0];
//     popup.style.display = "block";
//     popup.innerText = value;
//     close.onclick = function() {
//         popup.style.display = "none";
//     };
// }

function confirmIdentity(index) {
  const select = document.getElementById(`select${index}`);
  const confirmedIdentity = document.getElementById(`confirmedIdentity${index}`);
  const identity = document.getElementById(`identity${index}`);
  const role = select.value;
  if(window.identities.includes(role)){
      alert("有重复身份，请重新选择");
      window.location.reload();
  }
  window.identities.push(role);
  if (role) {
    confirmedIdentity.innerText = role; // Store the role in hidden div
    identity.innerText = `玩家${index}已选择身份`
    select.className = 'hidden'; // Hide the select element
    checkAllSelected();
  }
}

function checkAllSelected() {
  let allSelected = true;
  for (let i = 1; i <= 10; i++) {
    const confirmedIdentity = document.getElementById(`confirmedIdentity${i}`);
    if (!confirmedIdentity.innerText) {
      allSelected = false;
      break;
    }
  }

  if (allSelected) {
    const uniqueIdentities = new Set(identities);
    if (uniqueIdentities.size !== window.identities.length) {
      alert("有重复身份，请重新选择");
      window.location.reload(); // 重新加载页面
    } else {
      let button = document.querySelector('button[type="button"]')
      button.style.background = "#ff9900";
      button.style.color = "#0056ff"
      button.disabled = false; // Show the submit button
    }
  }
}

function storeHealthsInCookie(healths) {
    const inOneYear = new Date();
    inOneYear.setFullYear(inOneYear.getFullYear() + 1);
    localStorage.setItem("healths",encodeURIComponent(JSON.stringify(healths)))
}

function submitIdentities() {
  let identities = [];
  if(window.roles != undefined && window.roles!= []) identities = window.roles;
  else {
    for (let i = 1; i <= 10; i++) {
      const confirmedIdentity = document.getElementById(`confirmedIdentity${i}`);
      identities.push(confirmedIdentity.innerText);
    }
  }
  localStorage.setItem("identities",encodeURIComponent(JSON.stringify(identities)))
  const healths = identities.map(() => 20);
  storeHealthsInCookie(healths);
  alert("游戏开始！");
  localStorage.setItem("roundCount",1);
  localStorage.setItem("safe",JSON.stringify([]));
  localStorage.setItem("protection",JSON.stringify([]));
  window.location = "./game.html"

}

function randomIdentity(){
  let identities = [
                    {role:"♠J",value:13},
                    {role:"♠Q",value:23},
                    {role:"♠K",value:33},
                    {role:"♥J",value:12},
                    {role:"♥Q",value:22},
                    {role:"♥K",value:32},
                    {role:"♣J",value:11},
                    {role:"♣Q",value:21},
                    {role:"♣K",value:31},
                    {role:"JOKER",value:0}];
  let identity;
  window.roles = []
  let html = "";
  for(let i=0;i<10;i++){
    const index = Math.floor(Math.random() * identities.length);
    identity = identities.splice(index, 1)[0];
    window.roles.push(identity.value);
    html+=`<div class='role${i}' style="display: flex">
        <p style="color: #523608">玩家${i+1}身份：</p>
        <button onclick="checkClick(this.id)" id="${identity.role}" style="background: RGB(173, 216, 230);color:#523608;width: 80%">点击查看</button></div>`
  }
  let screen = document.querySelector("#form");

  screen.innerHTML = html;
  document.querySelector("#title").innerText = "森林之战——已随机生成身份"
  let button = document.querySelector('button[type="button"]')
      button.style.background = "#ff9900";
      button.style.color = "#0056ff"
      button.disabled = false;
  // localStorage.setItem("identities",encodeURIComponent(JSON.stringify(roles)))
  // const healths = roles.map(() => 20);
  // storeHealthsInCookie(healths);
  // alert("游戏开始！");
  // localStorage.setItem("roundCount",1);
  // localStorage.setItem("safe",JSON.stringify([]));
  // localStorage.setItem("protection",JSON.stringify([]));
  // window.location = "./game.html"
}

function checkClick(role){
    let button = document.querySelector(`#${role}`);
    button.innerText=='点击查看'?(button.innerHTML=role+"(查看完毕请再次点击)"):(button.innerHTML='已查看',button.disabled=true)
}
