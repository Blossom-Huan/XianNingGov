//封装tab
function tab(tabName) {
  let selectedTab = document.querySelector(tabName)
  let contentNavLeft = selectedTab.querySelectorAll(".contents-nav>li");
  let contentBox = selectedTab.querySelectorAll(".contents-box");
  // console.log(contentBox);
  let contentNavActiveLeft = selectedTab.querySelector(".contents-nav .contents-nav-active");

  let contentBoxActive = selectedTab.querySelector(".contents-active");
  contentNavLeft.forEach(function (item,index) {
    item.onmouseover = function () {

      contentNavActiveLeft.className = "";
      this.className = "contents-nav-active";
      contentNavActiveLeft = this;

      contentBoxActive.className = "contents-box";
      contentBox[index].className = "contents-active contents-box";
      contentBoxActive = contentBox[index];
    }
  })
}
tab(".left-bottom");
tab(".center-top");
tab(".right-bottom");
tab(".right-top .news");


//封装wrap
function wrap(wrapName) {
  let selected = document.querySelector(wrapName);
  let items = selected.querySelectorAll("ul>li");
  let itemActive = selected.querySelector("wrap-active");

  let index = 0;

  function clearActive() {
    for(let i = 0;i<items.length;i++){
      items[i].className = "";
    }
  }
  function goIndex() {
    clearActive();
    items[index].className = "wrap-active";
  }
  let timer = setInterval(function () {
    // clearInterval(timer)
    if(index<items.length){
      index++;
      if(index>items.length-1){
        index = 0
      };
      goIndex();
    };
    // console.log(1);
    // clearInterval(timer);
  },3000)
}
wrap(".top-slideshow");
// wrap(".center-bottom");
// setTimeout('wrap(".left-top")',1000);


//左上轮播图
let selected = document.querySelector(".left-top");
let items = selected.querySelectorAll("ul>li");
let itemActive = selected.querySelector("wrap-active");
let pointList = selected.querySelectorAll(".point a");
let buttons = selected.querySelector(".buttons");
let turnNext = selected.querySelector(".left-top .goNext");
let turnpre = selected.querySelector(".left-top .goPre");
let spans = selected.querySelectorAll("span");
// console.log(pointList);
// console.log(spans);
let reference = 0;

function clearActive() {
  for(let i = 0;i<items.length;i++){
    items[i].className = "";
    pointList[i].className = "";
    spans[i].className = "spans";
  }
}
function goIndex() {
  clearActive();
  // changeBottom();
  items[reference].className = "wrap-active";
  pointList[reference].className = "point-active";
  spans[reference].className = "spans span-active"
}
let timer = setInterval(function () {
  next();
},3000)

//span
// function changeBottom() {
//   spans[reference].style.opacity = "1";
//   spans[reference].style.bottom = "25px";
//   spans[reference].style.transition = "0.5s ease";
// }

//小圆点
for (let i = 0; i < pointList.length; i++) {
  pointList[i].onmousemove = function () {
    // clearInterval(timer);
    reference = i;
    goIndex();
  }
}
//左右按钮
function next() {
  if(reference<items.length){
    reference++;
    if(reference>items.length-1){
      reference = 0
    };
    goIndex();
  };
}
turnNext.onclick = function () {
  next();
}
turnpre.onclick = function () {
  if(reference<items.length){
    reference--;
    if(reference<0){
      reference = items.length-1;
    };
    goIndex();
  };
}
//移入停止轮播
selected.onmouseenter = function () {
  clearInterval(timer);
  buttons.className = "button-active";
}
//移出继续轮播
selected.onmouseleave = function () {
  clearInterval(timer);
  timer = setInterval(function () {
    next();
  },3000);
  buttons.className = "buttons";
}


/**************************政法轮播图********************************/
//按钮
let goPre = document.querySelector(".center-bottom .goPre");
let goNext = document.querySelector(".center-bottom .goNext");
// console.log(goNext);
let wrapImage = document.querySelector(".center-bottom .last-wrap");
// console.log(wrapImage);
let imges = document.querySelectorAll(".last-wrap img");
// console.log(imges);
let cloneImage = wrapImage.firstElementChild.cloneNode(true);
wrapImage.appendChild(cloneImage);
// console.log(cloneImage);

let index = 0;
goPre.onclick = function () {
  index--;
  if(index<0){
    wrapImage.style.left = -imges.length * 330 + "px";
    wrapImage.style.transition = "none";
    setTimeout(()=>{
      index = imges.length-1;
      wrapImage.style.left = -index * 330 + "px";
      wrapImage.style.transition = "0.5s ease";
    },0)
  }else {
    index--;
    wrapImage.style.left = -index * 330 + "px";
  }
}
function toNext() {
  index++;
  wrapImage.style.left = -index * 330 + "px";
  wrapImage.style.transition = "0.5s ease";
  if(index>imges.length-1){
    setTimeout(()=>{
      index = 0;
      wrapImage.style.left = 0;
      wrapImage.style.transition = "none";
    },500)
  }
}
goNext.onclick =function (){
  toNext();
}
let autoplay = setInterval(toNext,3000);
let wrapBox = document.querySelector(".wrap-box");
wrapBox.onmouseenter = function () {
  clearInterval(autoplay);
};
wrapBox.onmouseleave = function () {
  clearInterval(autoplay);
  autoplay = setInterval(toNext,3000)
}
