window.identities = [];
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
  const identities = [];
  for (let i = 1; i <= 10; i++) {
    const confirmedIdentity = document.getElementById(`confirmedIdentity${i}`);
    identities.push(confirmedIdentity.innerText);
  }
  const inOneYear = new Date();
  inOneYear.setFullYear(inOneYear.getFullYear() + 1);
  localStorage.setItem("identities",encodeURIComponent(JSON.stringify(identities)))
  const healths = identities.map(() => 20);
  storeHealthsInCookie(healths);
  alert("游戏开始！");
  localStorage.setItem("roundCount",1);
  localStorage.setItem("safe",JSON.stringify([]));
  localStorage.setItem("protection",JSON.stringify([]));
  window.location = "./game.html"

}