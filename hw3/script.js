// 定義變數
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = [0, canvas.width, 20], y =[ 0, 0, canvas.height], dx = [10, 5, 5], dy = [5, 5, 5], r = [30, 30, 10];
let color = [["#2828FF", "#7D7DFF", "#DDDDFF"], ["#D9006C", "#FF60AF", "#FFD9EC"], ["#01B468", "#4EFEB3", "#D7FFEE"]];
let cnt = [1, 1, 1]
let n = 3;

// 畫圓形
function drawBall(x, y, r, color)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // arc(圓心x, 圓心y, 半徑, 起始角, 結束角)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// 更新畫布
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < n; ++i){
		x[i] = x[i] + dx[i];
		y[i] = y[i] + dy[i];
	}

    // TODO: 如果發生碰撞(畫布寬canvas.width, 畫布高canvas.height)，則改變速度(dx, dy)和顏色(color)
	for(let i = 0; i < n; ++i){
		if(x[i] - r[i] <= 0 || x[i] + r[i] >= canvas.width){
			dx[i] = -dx[i];
			if(x[i] - r[i] <= 0) x[i] = r[i];
			else x[i] = canvas.width - r[i];
			cnt[i]++;
			if(cnt[i] >= 3) cnt[i] %= 3;
		}
		if(y[i] - r[i] <= 0 || y[i] + r[i] >= canvas.height){
			dy[i] = -dy[i];
			if(y[i] - r[i] <= 0) y[i] = r[i];
			else y[i] = canvas.height - r[i];
			cnt[i]++;
			if(cnt[i] >= 3) cnt[i] %= 3;
		}
	}
	for(let i = 0; i < n; ++i){
		for(let j = i+1; j < n; ++j){
			if((x[i] - x[j])*(x[i] - x[j]) + (y[i] - y[j]) * (y[i] - y[j]) < (r[i] + r[j]) * (r[i] + r[j])){
			[dx[i], dx[j]] = [dx[j], dx[i]];
			[dy[i], dy[j]] = [dy[j], dy[i]];
			cnt[i]++;
			if(cnt[i] >= 3) cnt[i] %= 3;
			}	
		}
	}
	for(let i = 0; i < n; ++i){
		drawBall(x[i], y[i], r[i], color[i][cnt[i]]);
	}
	requestAnimationFrame(draw);
}

draw();