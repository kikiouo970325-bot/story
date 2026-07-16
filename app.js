
const mailScene=document.getElementById("mailScene");
const mailPaper=document.getElementById("mailPaper");
const mailEnvelope=document.getElementById("mailEnvelope");
const mailStatusText=document.getElementById("mailStatusText");
const mailPreviewText=document.getElementById("mailPreviewText");
const mailPreviewFrom=document.getElementById("mailPreviewFrom");
const mailWait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

function setMailStatus(text){
  mailStatusText.classList.remove("visible");
  setTimeout(()=>{
    mailStatusText.textContent=text;
    mailStatusText.classList.add("visible");
  },120);
}

async function playMailAnimation(nickname,message){
  mailPreviewText.textContent=message||"今天沒有留下文字，但我按下了「我願意」。";
  mailPreviewFrom.textContent=`FROM：${nickname||"寶寶"}`;
  mailScene.classList.add("show");
  mailPaper.classList.remove("folded");
  mailEnvelope.classList.remove("show","closed","sealed");
  setMailStatus("正在摺好這封信……");
  await mailWait(1100);
  mailPaper.classList.add("folded");
  mailEnvelope.classList.add("show");
  await mailWait(850);
  mailEnvelope.classList.add("closed");
  setMailStatus("正在封好這封信……");
  await mailWait(800);
  mailEnvelope.classList.add("sealed");
  setMailStatus("正在寄給穆雪……");
  await mailWait(900);
}

async function finishMailAnimation(){
  setMailStatus("你的心意，\n已經送到穆雪那裡了。♡");
  await mailWait(1400);
  mailScene.classList.remove("show");
  await mailWait(350);
}


const intro=document.getElementById("intro");
document.getElementById("introBtn").onclick=()=>intro.classList.add("fade");
setTimeout(()=>{},100);

const envelope=document.getElementById("envelope");
const openBook=document.getElementById("openBook");
const cover=document.getElementById("cover");
const book=document.getElementById("book");
const bottom=document.getElementById("bottom");
function openLoveBook(){
  envelope.classList.add("open");
  setTimeout(()=>{
    cover.classList.add("hidden");
    book.classList.remove("hidden");
    bottom.classList.remove("hidden");
    document.getElementById("topBookmark").classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
    burst(18);
  },450);
}
envelope.onclick=openLoveBook;openBook.onclick=openLoveBook;

document.querySelectorAll(".items").forEach(box=>{
  const arr=JSON.parse(box.dataset.items);
  box.innerHTML=arr.map(([icon,text])=>`
    <label class="item">
      <input type="checkbox" required>
      <span class="icon">${icon}</span>
      <span class="copy">${text}</span>
      <span class="check"></span>
    </label>`).join("");
});

const checks=[...document.querySelectorAll('input[type="checkbox"]')];
const total=checks.length;
const bar=document.getElementById("bar");
const countText=document.getElementById("countText");
const heartsRow=document.getElementById("heartsRow");
const center=document.getElementById("center");

function update(){
  const done=checks.filter(x=>x.checked).length;
  const pct=Math.round(done/total*100);
  bar.style.width=pct+"%";
  countText.textContent=`目前收集到 ${done} 顆愛心`;
  center.childNodes[0].nodeValue=pct+"%";
  const bookmarkCount=document.getElementById("bookmarkCount");
  const bookmarkSub=document.getElementById("bookmarkSub");
  bookmarkSub.textContent=`${done} / ${total}`;
  document.getElementById("bookmarkFill").style.width=pct+"%";

  if(done===total){
    bookmarkCount.textContent="幸福收集完畢。";
    document.getElementById("topBookmark").classList.add("complete");
    clearTimeout(window.__futureProgressTimer);
    window.__futureProgressTimer=setTimeout(()=>{
      bookmarkCount.textContent="從今天開始，我們一起走下去。";
    },1500);
  }else{
    bookmarkCount.textContent="偷偷收集幸福中……";
    document.getElementById("topBookmark").classList.remove("complete");
  }
  const full=Math.round(done/total*5);
  heartsRow.textContent=Array.from({length:5},(_,i)=>i<full?"♥":"♡").join(" ");
}
function flyHeartsFrom(item){
  const start=item.getBoundingClientRect();
  const target=document.getElementById("bookmarkHeart").getBoundingClientRect();
  const amount=3+Math.floor(Math.random()*3);

  for(let i=0;i<amount;i++){
    const h=document.createElement("span");
    h.className="heart-flight";
    h.textContent=Math.random()>.22?"♥":"♡";
    const sx=start.right-35+(Math.random()*24-12);
    const sy=start.top+start.height/2+(Math.random()*18-9);
    const tx=target.left+target.width/2;
    const ty=target.top+target.height/2;

    h.style.left=sx+"px";
    h.style.top=sy+"px";
    h.style.fontSize=(13+Math.random()*10)+"px";
    h.style.setProperty("--dx",(tx-sx+(Math.random()*22-11))+"px");
    h.style.setProperty("--dy",(ty-sy+(Math.random()*14-7))+"px");
    h.style.setProperty("--rot",(Math.random()*80-40)+"deg");
    h.style.setProperty("--duration",(0.72+Math.random()*.34)+"s");
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1200);
  }

  setTimeout(()=>{
    const bh=document.getElementById("bookmarkHeart");
    bh.classList.remove("bump");
    void bh.offsetWidth;
    bh.classList.add("bump");
  },620);
}

checks.forEach(c=>c.onchange=()=>{
  update();
  if(c.checked){
    const item=c.closest(".item");
    const r=item.getBoundingClientRect();
    const t=document.createElement("span");
    t.className="pluslove";t.textContent="+1 Love";
    t.style.left=(r.left+r.width*.60)+"px";t.style.top=(r.top+16)+"px";
    document.body.appendChild(t);
    setTimeout(()=>t.remove(),1200);
    flyHeartsFrom(item);
  }
});
update();

function petal(){
  const p=document.createElement("span");p.className="petal";
  p.textContent=Math.random()>.52?"♥":"🌸";
  p.style.left=Math.random()*100+"vw";p.style.fontSize=(12+Math.random()*17)+"px";
  p.style.setProperty("--drift",(Math.random()*140-70)+"px");
  p.style.animationDuration=(5+Math.random()*5)+"s";
  document.getElementById("petals").appendChild(p);setTimeout(()=>p.remove(),11000);
}
setInterval(petal,850);
function burst(n){
  for(let i=0;i<n;i++)setTimeout(petal,i*45);
}

const chapters=[...document.querySelectorAll(".chapter")];
function current(){
  const y=scrollY+innerHeight*.4;let idx=0;
  chapters.forEach((c,i)=>{if(c.offsetTop<=y)idx=i});return idx;
}
document.getElementById("prev").onclick=()=>chapters[Math.max(0,current()-1)].scrollIntoView({behavior:"smooth"});
document.getElementById("next").onclick=()=>chapters[Math.min(chapters.length-1,current()+1)].scrollIntoView({behavior:"smooth"});
center.onclick=()=>document.querySelector(".hearts-count").scrollIntoView({behavior:"smooth",block:"center"});

document.getElementById("date").value=new Date().toISOString().slice(0,10);
const form=document.getElementById("form");


const cinematicEnding=document.getElementById("cinematicEnding");
const endingSpeech=document.getElementById("endingSpeech");
const endingHug=document.getElementById("endingHug");
const endingFinalCard=document.getElementById("endingFinalCard");
const endingBloom=document.getElementById("endingBloom");

const endingLines=[
  "我愛你，沒有任何目的。",
  "如果一定要說有的話，",
  "那我希望，\n你也一樣愛著我。",
  "我想對你好。",
  "想看到你臉上開心的笑容。",
  "因為，\n那也是我獲得幸福的方式。"
];

const endingWait=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function showEndingText(text,hold=1650){
  endingSpeech.classList.remove("visible");
  await endingWait(380);
  endingSpeech.textContent=text;
  endingSpeech.classList.add("visible");
  await endingWait(hold);
}

async function startCinematicEnding(){
  document.body.classList.add("ending-locked");
  cinematicEnding.classList.add("show");
  cinematicEnding.setAttribute("aria-hidden","false");

  endingFinalCard.classList.remove("show");
  endingHug.classList.remove("show");
  endingBloom.classList.remove("active");

  endingSpeech.style.display="grid";
  endingSpeech.className="ending-prelude";
  endingSpeech.textContent="幸福收集完畢。";
  endingSpeech.classList.add("visible");
  await endingWait(1500);

  endingSpeech.classList.remove("visible");
  await endingWait(520);
  endingSpeech.textContent="從今天開始，\n我們一起走下去。";
  endingSpeech.classList.add("visible");
  await endingWait(2200);

  endingSpeech.classList.remove("visible");
  await endingWait(700);
  endingSpeech.style.display="none";
  endingHug.classList.add("show");
}

async function playConfession(){
  endingSpeech.className="ending-speech";
  endingSpeech.style.display="grid";
  endingSpeech.textContent="";

  for(const text of endingLines){
    await showEndingText(text);
  }

  endingSpeech.classList.remove("visible");
  await endingWait(750);
  endingSpeech.style.display="none";
  endingFinalCard.classList.add("show");
}

endingHug.addEventListener("click",async()=>{
  endingHug.classList.remove("show");
  endingBloom.classList.remove("active");
  void endingBloom.offsetWidth;
  endingBloom.classList.add("active");

  if(navigator.vibrate){
    navigator.vibrate([45,35,70]);
  }

  await endingWait(1450);
  await playConfession();
});




const memoriesScene=document.getElementById("memoriesScene");
const openMemories=document.getElementById("openMemories");
const closeMemories=document.getElementById("closeMemories");

openMemories.addEventListener("click",()=>{
  memoriesScene.classList.add("show");
  memoriesScene.setAttribute("aria-hidden","false");

  requestAnimationFrame(()=>{
    cinematicEnding.classList.remove("show");
    cinematicEnding.setAttribute("aria-hidden","true");
  });
});

closeMemories.addEventListener("click",()=>{
  cinematicEnding.classList.add("show");
  cinematicEnding.setAttribute("aria-hidden","false");

  requestAnimationFrame(()=>{
    memoriesScene.classList.remove("show");
    memoriesScene.setAttribute("aria-hidden","true");
  });
});

const sendStatus = document.getElementById("sendStatus");
const agreeButton = document.getElementById("agreeButton");

form.addEventListener("submit", async event => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const checkedCount = checks.filter(item => item.checked).length;
  if (checkedCount !== checks.length) {
    sendStatus.textContent = "還有小約定沒有確認完成喔。";
    sendStatus.classList.add("error");
    return;
  }

  agreeButton.disabled = true;
  sendStatus.classList.remove("error");
  sendStatus.textContent = "正在準備這封信…";

  const nickname = document.getElementById("name").value.trim();
  const memoryDate = document.getElementById("date").value;
  const message = document.getElementById("message").value.trim();
  const displayDate = memoryDate ? memoryDate.replaceAll("-", "/") : "未填寫";

  const webhookPayload = {
    username: `${nickname || "寶寶"}寄來了一封信`,
    embeds: [{
      title: `💌 ${nickname || "寶寶"}寄來了一封信`,
      description:
        `**To：穆雪**\n\n` +
        `> ${message || "今天沒有留下文字，但他按下了「我願意」。"}\n\n` +
        `**From：${nickname || "寶寶"}**`,
      color: 0xD96B8B,
      fields: [
        { name: "📅 記住的日子", value: `\`${displayDate}\``, inline: true },
        { name: "💗 幸福確認", value: `**${checkedCount} / ${checks.length}**`, inline: true }
      ],
      footer: { text: "謝謝你，把這一頁交給穆雪收藏。♡" },
      timestamp: new Date().toISOString()
    }]
  };

  try {
    await playMailAnimation(nickname,message);

    const response = await fetch(
      `${window.OUR_FUTURE_CONFIG.discordWebhook}?wait=true`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload)
      }
    );

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Discord ${response.status}: ${detail}`);
    }

    sendStatus.textContent = "已經好好收藏起來了 ♡";
    await finishMailAnimation();
    startCinematicEnding();
  } catch (error) {
    console.error(error);
    mailScene.classList.remove("show");
    sendStatus.textContent =
      "沒有送成功。請使用 WebCode 的 ▶ 預覽開啟，不要直接從檔案總管點 HTML。";
    sendStatus.classList.add("error");
    agreeButton.disabled = false;
  }
});

const addMemoryButton=document.getElementById("addMemoryButton");
const memoryForm=document.getElementById("memoryForm");
const cancelMemoryButton=document.getElementById("cancelMemoryButton");
const memoryImage=document.getElementById("memoryImage");
const memoryDateInput=document.getElementById("memoryDateInput");
const memoryTitleInput=document.getElementById("memoryTitleInput");
const memoryTextInput=document.getElementById("memoryTextInput");
const memorySaveStatus=document.getElementById("memorySaveStatus");
const memoryList=document.getElementById("memoryList");

const MEMORY_STORAGE_KEY="ourFutureMemories";

function getSavedMemories(){
  try{
    return JSON.parse(localStorage.getItem(MEMORY_STORAGE_KEY)||"[]");
  }catch{
    return [];
  }
}

function saveMemories(memories){
  localStorage.setItem(MEMORY_STORAGE_KEY,JSON.stringify(memories));
}

function escapeMemoryText(value){
  return String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}

function renderMemories(){
  const memories=getSavedMemories();

  if(!memories.length){
    memoryList.innerHTML="";
    return;
  }

  memoryList.innerHTML=memories.map(memory=>{
    const imageMarkup=memory.imageData
      ? `<img src="${memory.imageData}" alt="${escapeMemoryText(memory.title)}">`
      : "";

    return `
      <article class="saved-memory-card ${memory.imageData?"":"no-image"}">
        ${imageMarkup}
        <div class="saved-memory-content">
          <time>${escapeMemoryText(memory.date.replaceAll("-"," / "))}</time>
          <h4>${escapeMemoryText(memory.title)}</h4>
          <p>${escapeMemoryText(memory.text)}</p>
          <div class="saved-memory-actions">
            <button class="delete-memory-button" type="button" data-memory-id="${memory.id}">
              刪除
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function readImageAsDataUrl(file){
  return new Promise((resolve,reject)=>{
    if(!file){
      resolve("");
      return;
    }

    const reader=new FileReader();
    reader.onload=()=>resolve(String(reader.result||""));
    reader.onerror=()=>reject(new Error("圖片讀取失敗"));
    reader.readAsDataURL(file);
  });
}

addMemoryButton.addEventListener("click",()=>{
  memoryForm.hidden=false;
  addMemoryButton.hidden=true;

  if(!memoryDateInput.value){
    memoryDateInput.value=new Date().toISOString().slice(0,10);
  }
});

cancelMemoryButton.addEventListener("click",()=>{
  memoryForm.reset();
  memoryForm.hidden=true;
  addMemoryButton.hidden=false;
  memorySaveStatus.textContent="";
});

memoryForm.addEventListener("submit",async event=>{
  event.preventDefault();

  if(!memoryForm.checkValidity()){
    memoryForm.reportValidity();
    return;
  }

  memorySaveStatus.textContent="正在保存…";

  try{
    const imageData=await readImageAsDataUrl(memoryImage.files[0]);

    const memories=getSavedMemories();
    memories.unshift({
      id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),
      date:memoryDateInput.value,
      title:memoryTitleInput.value.trim(),
      text:memoryTextInput.value.trim(),
      imageData
    });

    saveMemories(memories);
    renderMemories();

    memoryForm.reset();
    memoryForm.hidden=true;
    addMemoryButton.hidden=false;
    memorySaveStatus.textContent="";
  }catch(error){
    console.error(error);
    memorySaveStatus.textContent="儲存失敗，請換一張較小的照片再試一次。";
  }
});

memoryList.addEventListener("click",event=>{
  const button=event.target.closest(".delete-memory-button");
  if(!button) return;

  const memories=getSavedMemories().filter(memory=>memory.id!==button.dataset.memoryId);
  saveMemories(memories);
  renderMemories();
});

renderMemories();



// ===== Our Future：自動記憶與備份 =====
const OF_STORAGE = {
  checks: "ourfuture_checks_v1",
  nickname: "ourfuture_nickname_v1",
  date: "ourfuture_date_v1",
  message: "ourfuture_message_v1"
};

function safeParseJson(value, fallback){
  try{
    return value ? JSON.parse(value) : fallback;
  }catch{
    return fallback;
  }
}

function restoreOurFutureState(){
  const savedChecks = safeParseJson(localStorage.getItem(OF_STORAGE.checks), []);
  checks.forEach((checkbox, index)=>{
    checkbox.checked = Boolean(savedChecks[index]);
  });

  const nameInput = document.getElementById("name");
  const dateInput = document.getElementById("date");
  const messageInput = document.getElementById("message");

  if(nameInput){
    nameInput.value = localStorage.getItem(OF_STORAGE.nickname) || nameInput.value || "";
  }

  if(dateInput){
    const savedDate = localStorage.getItem(OF_STORAGE.date);
    if(savedDate){
      dateInput.value = savedDate;
    }else if(!dateInput.value){
      dateInput.value = new Date().toISOString().slice(0,10);
    }
  }

  if(messageInput){
    messageInput.value = localStorage.getItem(OF_STORAGE.message) || "";
  }

  if(typeof update === "function"){
    update();
  }
}

checks.forEach((checkbox)=>{
  checkbox.addEventListener("change",()=>{
    localStorage.setItem(
      OF_STORAGE.checks,
      JSON.stringify(checks.map(item=>item.checked))
    );
  });
});

const rememberedNameInput = document.getElementById("name");
const rememberedDateInput = document.getElementById("date");
const rememberedMessageInput = document.getElementById("message");

rememberedNameInput?.addEventListener("input",()=>{
  localStorage.setItem(OF_STORAGE.nickname, rememberedNameInput.value);
});

rememberedDateInput?.addEventListener("change",()=>{
  localStorage.setItem(OF_STORAGE.date, rememberedDateInput.value);
});

rememberedMessageInput?.addEventListener("input",()=>{
  localStorage.setItem(OF_STORAGE.message, rememberedMessageInput.value);
});

const exportMemoriesButton = document.getElementById("exportMemoriesButton");
const importMemoriesInput = document.getElementById("importMemoriesInput");
const memoryBackupStatus = document.getElementById("memoryBackupStatus");

exportMemoriesButton?.addEventListener("click",()=>{
  const backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    memories: getSavedMemories(),
    checks: safeParseJson(localStorage.getItem(OF_STORAGE.checks), []),
    nickname: localStorage.getItem(OF_STORAGE.nickname) || "",
    date: localStorage.getItem(OF_STORAGE.date) || "",
    message: localStorage.getItem(OF_STORAGE.message) || ""
  };

  const blob = new Blob(
    [JSON.stringify(backup, null, 2)],
    {type:"application/json"}
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `our-future-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);

  if(memoryBackupStatus){
    memoryBackupStatus.textContent = "備份檔已匯出，記得留在安全的位置 ♡";
  }
});

importMemoriesInput?.addEventListener("change",async()=>{
  const file = importMemoriesInput.files?.[0];
  if(!file) return;

  try{
    const backup = JSON.parse(await file.text());

    if(!backup || !Array.isArray(backup.memories)){
      throw new Error("備份格式不正確");
    }

    saveMemories(backup.memories);
    localStorage.setItem(OF_STORAGE.checks, JSON.stringify(backup.checks || []));
    localStorage.setItem(OF_STORAGE.nickname, backup.nickname || "");
    localStorage.setItem(OF_STORAGE.date, backup.date || "");
    localStorage.setItem(OF_STORAGE.message, backup.message || "");

    restoreOurFutureState();
    renderMemories();

    if(memoryBackupStatus){
      memoryBackupStatus.textContent = "回憶已經還原回來了 ♡";
    }
  }catch(error){
    console.error(error);
    if(memoryBackupStatus){
      memoryBackupStatus.textContent = "這個備份檔無法讀取，請確認檔案是否正確。";
    }
  }finally{
    importMemoriesInput.value = "";
  }
});

restoreOurFutureState();

