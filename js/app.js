const stage = new createjs.Stage("test");
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", stage);
const side = new createjs.Shape();
const rect = new createjs.Shape();
let soundOK = "ok";
let soundNO = "no";
let soundClick = "click";
let soundStart = "start";
let soundCountDown = "countdown";
let soundVictory = "victory";
let score = 0;
let rec = 0;
let time = 0;
let finalrec = 0;
let finaltime = 0;
let randimg = [];
let timerID = null;
let arr = [
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[],
	[]
];

function setupManifest() {
	manifest = [{
			src: "img/un.png"
		},
		{
			src: "img/cglogo.png"
		},
		{
			src: "img/webteam.png"
		},
		{
			src: "img/h5+.png"
		},
		{
			src: "img/ok.png"
		},
		{
			src: "img/help1.jpg"
		},
		{
			src: "img/help2.jpg"
		},
		{
			src: "img/common/ball.png"
		},
		{
			src: "img/common/car.png"
		},
		{
			src: "img/common/heart.png"
		},
		{
			src: "img/common/leave.png"
		},
		{
			src: "img/common/lemon.png"
		},
		{
			src: "img/common/light.png"
		},
		{
			src: "img/common/like.png"
		},
		{
			src: "img/common/n95.png"
		},
		{
			src: "img/common/phone.png"
		},
		{
			src: "img/common/plane.png"
		},
		{
			src: "assets/click.wav"
		},
		{
			src: "assets/ok.wav"
		},
		{
			src: "assets/start.wav"
		},
		{
			src: "assets/victory.wav"
		},
		{
			src: "assets/wrong.wav"
		},
		{
			src: "assets/createjs.svg"
		},
		{
			src: "assets/countdown.wav"
		},
	];
}

function showCreateJSLogo() {
	setTimeout(function() {
		$(document).ready(function(){
			$("#logo1").fadeIn(1500, function(){
				setTimeout(function(){
					$("#logo1").fadeOut(1500,function(){
						$("#logo2").fadeIn(1500,function(){
							setTimeout(function(){
								$("#logo2").fadeOut(1500,function(){
									$("#logo3").fadeIn(1500,function(){
										setTimeout(function(){
											$("#logo3").fadeOut(1500,function(){
												$("#logo4").fadeIn(1500,function(){
													setTimeout(function(){
														$("#logo4").fadeOut(1500);
														$("#menu").fadeIn(1500);
													},1000);
												});
											})
										},1000);
									});
								})
							},1000)
						});
					});
				},1000);
			});
		});
	},1000);
}

function handleFileProgress(event) {
	document.getElementById("progress").innerText = "loading..." + Math.ceil(event.loaded * 100) + "%";
	document.getElementById("progress").style.width = Math.ceil(event.loaded * 100) + "%"
}

function loadComplete(event) {
	document.getElementById("loadingtext").innerHTML = "正在进入游戏..";
	setTimeout(function() {
		$(document).ready(function(){
			$("#loading").fadeOut(2000, showCreateJSLogo);
		});
	}, 1000);

}

function loadSource() {
	setupManifest();
	let preload = new createjs.LoadQueue();
	preload.installPlugin(createjs.SOUND);
	preload.addEventListener("progress", handleFileProgress);
	preload.addEventListener("complete", loadComplete);
	preload.setMaxConnections(1);
	preload.loadManifest(manifest);

	createjs.Sound.registerSound("assets/ok.wav", soundOK);
	createjs.Sound.registerSound("assets/wrong.wav", soundNO);
	createjs.Sound.registerSound("assets/click.wav", soundClick);
	createjs.Sound.registerSound("assets/start.wav", soundStart);
	createjs.Sound.registerSound("assets/countdown.wav", soundCountDown);
	createjs.Sound.registerSound("assets/victory.wav", soundVictory);

}


function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1;
	//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

function startTimer() {
	time++;
	document.getElementById("time").innerHTML = time;

}

function randomNum(minNum, maxNum) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * minNum + 1, 10);
			break;
		case 2:
			return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
			break;
		default:
			return 0;
			break;
	}
}


let status = 0;
let nowopen = -1;
let nowx = -1;
let nowy = -1;

function getimgpath(imgid, mode) {
	let path = "";
	if (mode == "common") {
		switch (imgid) {
			case 0:
				path = "img/common/ball.png";
				break;
			case 1:
				path = "img/common/car.png";
				break;
			case 2:
				path = "img/common/heart.png";
				break;
			case 3:
				path = "img/common/leave.png";
				break;
			case 4:
				path = "img/common/lemon.png";
				break;
			case 5:
				path = "img/common/light.png";
				break;
			case 6:
				path = "img/common/like.png";
				break;
			case 7:
				path = "img/common/n95.png";
				break;
			case 8:
				path = "img/common/phone.png";
				break;
			case 9:
				path = "img/common/plane.png";
				break;
		}
	} else if (mode == "allstar") {
		switch (imgid) {
			case 0:
				path = "img/allstar/8.jpg";
				break;
			case 1:
				path = "img/allstar/24.jpg";
				break;
			case 2:
				path = "img/allstar/aoerjia.jpg";
				break;
			case 3:
				path = "img/allstar/aoligei.jpg";
				break;
			case 4:
				path = "img/allstar/cxk.jpg";
				break;
			case 5:
				path = "img/allstar/dsm.jpg";
				break;
			case 6:
				path = "img/allstar/jiege.jpg";
				break;
			case 7:
				path = "img/allstar/lbw.jpg";
				break;
			case 8:
				path = "img/allstar/sun.jpg";
				break;
			case 9:
				path = "img/allstar/ylzz.jpg";
				break;
		}
	}
	return path;
}
let clickCnt = 0;

function btnClick() {
	clickCnt++;

	let coord = event || window.event;
	let coordx = coord.clientX;
	let coordy = coord.clientY;
	createjs.Sound.play(soundClick);
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if ((15 + 70 * i) <= coordx && coordx <= 70 * (i + 1) + 5) {
				if ((15 + 70 * j) <= coordy && coordy <= 70 * (j + 1) + 5) {
					if (clickCnt > 2) {
						// 你点的太快了
						// console.log("test");
						setTimeout(function() {
							clickCnt = 0;
						}, 200);
						return;
					}
					// 定位到翻牌子的坐标和位置
					// document.getElementById("debug").innerHTML = i + "," + j;
					if (arr[i][j].solved) {

					} else if (arr[i][j].isOpen) {
						// 点击一个已经被打开的
						// console.log(1);
						status = 0;
						let unknown = new createjs.Bitmap("img/un.png");
						let unimg = new createjs.Container();
						unknown.x = 10 + 70 * i;
						unknown.y = 10 + 70 * j;
						unimg.addChild(unknown);
						stage.addChild(unimg);
						arr[i][j].isOpen = false;
					} else {
						// 点击一个未被打开的
						// document.getElementById("debug2").innerHTML = "点击了一个未被打开的";
						rec++;
						document.getElementById("rec").innerHTML = rec;
						if (status == 0 && !arr[i][j].solved) {
							// stat是0,此时没有被翻开的牌子,直接翻开
							status = 1;
							nowx = i;
							nowy = j;
							let imgid = arr[i][j].imgid;
							nowopen = randimg[imgid];
							// nowopen代表当前打开的图片的编号(0-9)
							let path = getimgpath(nowopen, "common");
							// console.log(path);
							let map = new createjs.Bitmap(path);
							let testimg = new createjs.Container();
							map.x = 10 + 70 * i;
							map.y = 10 + 70 * j;
							testimg.addChild(map);
							stage.addChild(testimg);
							arr[i][j].isOpen = true;
							// console.log(nowx, nowy);
						} else {
							// status是1,此时已经有一个被翻开的牌子了,判断是否相同
							let imgid = arr[i][j].imgid;
							let newopen = randimg[imgid];
							let path = getimgpath(nowopen, "common");
							let map = new createjs.Bitmap(path);
							let testimg = new createjs.Container();
							map.x = 10 + 70 * i;
							map.y = 10 + 70 * j;
							testimg.addChild(map);
							stage.addChild(testimg);
							arr[i][j].isOpen = true;
							// 这时候翻开了第二个牌子,需要判断是否相同

							if (nowopen == newopen) {
								// 说明翻开相同的内容
								let imgid = arr[i][j].imgid;
								let newopen = randimg[imgid];
								let path = getimgpath(nowopen, "common");
								let map = new createjs.Bitmap(path);
								let testimg = new createjs.Container();
								map.x = 10 + 70 * i;
								map.y = 10 + 70 * j;
								testimg.addChild(map);
								stage.addChild(testimg);

								setTimeout(function() {
									let ok1 = new createjs.Bitmap("img/ok.png");
									let ok2 = new createjs.Bitmap("img/ok.png");
									let nowok = new createjs.Container();
									let newok = new createjs.Container();

									ok1.x = 10 + 70 * nowx;
									ok1.y = 10 + 70 * nowy;
									nowok.addChild(ok1);
									stage.addChild(nowok);

									ok2.x = 10 + 70 * i;
									ok2.y = 10 + 70 * j;
									newok.addChild(ok2);
									stage.addChild(newok);
									arr[i][j].solved = true;
									arr[nowx][nowy].solved = true;
									status = 0;
									nowopen = -1;
									nowx = -1;
									nowy = -1;
									// document.getElementById("debug2").innerHTML = "配对成功";
									createjs.Sound.play(soundOK);
									score++;
									document.getElementById("score").innerHTML = score;
									clickCnt = 0;
									if (score == 50) {
										finaltime = time;
										finalrec = rec;
										setTimeout(win, 100);
									}
								}, 200);

							} else {
								// 说明翻开不同的内容
								let imgid = arr[i][j].imgid;
								let newopen = randimg[imgid];
								let path = getimgpath(newopen, "common");
								let map = new createjs.Bitmap(path);
								let testimg = new createjs.Container();
								map.x = 10 + 70 * i;
								map.y = 10 + 70 * j;
								testimg.addChild(map);
								stage.addChild(testimg);

								setTimeout(function() {
									let unknown = new createjs.Bitmap("img/un.png");
									let unknown2 = new createjs.Bitmap("img/un.png");
									let unimg = new createjs.Container();
									let unnewimg = new createjs.Container();
									unknown.x = 10 + 70 * nowx;
									unknown.y = 10 + 70 * nowy;
									unimg.addChild(unknown);
									stage.addChild(unimg);

									unknown2.x = 10 + 70 * i;
									unknown2.y = 10 + 70 * j;
									unnewimg.addChild(unknown2);
									stage.addChild(unnewimg);

									arr[i][j].isOpen = false;
									arr[nowx][nowy].isOpen = false;
									// alert(status);
									// 翻太快导致的bug记得解决一下
									// document.getElementById("debug2").innerHTML = "配对失败" + i + " " + j;
									createjs.Sound.play(soundNO);
									status = 0;
									nowopen = -1;
									nowx = -1;
									nowy = -1;
									clickCnt = 0;
								}, 500);
							}
						}
					}
				}
			}
		}
	}
}


function init() {
	if (timerID != null)
		clearInterval(timerID);
	document.removeEventListener("click", btnClick);
	time = 0;
	rec = 0;
	score = 0;
	finalrec = 0;
	finaltime = 0;
	document.getElementById("time").innerHTML = time;
	document.getElementById("rec").innerHTML = rec;
	document.getElementById("score").innerHTML = score;
	for (let i = 0; i < 100; i++) {
		randimg[i] = i / 10;
		randimg[i] >>= 0;
	}
	randimg.sort(randomsort);
	for (let i = 0; i <= 10; i++) {
		side.graphics.beginFill("rgb(0,0,0)").drawRect(0, 70 * i, 710, 10);
		side.graphics.beginFill("rgb(0,0,0)").drawRect(70 * i, 0, 10, 710);
		stage.addChild(side);
	}
	let cnt = 0;
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			arr[i][j] = {
				isOpen: false,
				imgid: cnt,
				solved: false,
			};
			cnt++;
			let imgid = arr[i][j].imgid;
			let path = getimgpath(randimg[imgid], "common");
			let map = new createjs.Bitmap(path);
			let testimg = new createjs.Container();
			map.x = 10 + 70 * i;
			map.y = 10 + 70 * j;
			testimg.addChild(map);
			stage.addChild(testimg);
		}
	}
	setTimeout(function() {
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				let unknown = new createjs.Bitmap("img/un.png");
				let unimg = new createjs.Container();
				unknown.x = 10 + 70 * i;
				unknown.y = 10 + 70 * j;
				unimg.addChild(unknown);
				stage.addChild(unimg);
			}
		}
		createjs.Sound.play(soundStart);
		document.addEventListener("click", btnClick);
		timerID = setInterval(startTimer, 1000);
		document.getElementById("restart").disabled = false;
		document.getElementById("back").disabled = false;
	}, 10000);

}

function openGamePanel() {
	document.getElementById("restart").disabled = true;
	document.getElementById("back").disabled = true;
	init();
	createjs.Sound.play(soundCountDown);
}

function win() {
	if (timerID != null)
		clearInterval(timerID);
	document.removeEventListener("click", btnClick);
	document.getElementById("finalrec").innerHTML = finalrec;
	document.getElementById("finaltime").innerHTML = finaltime;
	document.getElementById("menu").style.display = "none";
	document.getElementById("help").style.display = "none";
	document.getElementById("game").style.display = "none";
	document.getElementById("win").style.display = "block";
	createjs.Sound.play(soundVictory);
}

function start() {
	document.getElementById("menu").style.display = "none";
	document.getElementById("help").style.display = "none";
	document.getElementById("win").style.display = "none";
	document.getElementById("game").style.display = "inline-block";
	createjs.Sound.play(soundClick);
	openGamePanel();
}

function help() {
	document.getElementById("menu").style.display = "none";
	document.getElementById("win").style.display = "none";
	document.getElementById("help").style.display = "block";
	createjs.Sound.play(soundClick);
}

function back() {
	document.getElementById("help").style.display = "none";
	document.getElementById("game").style.display = "none";
	document.getElementById("win").style.display = "none";
	document.getElementById("menu").style.display = "block";
	createjs.Sound.play(soundClick);
}

	
function restart() {
	mui.confirm('确定要重新开始游戏吗?','提示',['取消','确认'],function (e) {
		if (e.index == 1)
			start();
	},'div')
}