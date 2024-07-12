// Autor: 有点不太队 || 2048游戏
document.addEventListener("DOMContentLoaded", function () {
    // 开始游戏按钮
    startGameButton.addEventListener("click", setupBoard);

    /* 初始化 */
    let dir = null,                                            // 方向
        gameStarted = false, win = false, lose = false,        // 游戏状态 
        isAnimating = false, upd = false;                      // 动画状态

    let score = 0, highScore = 0;                              // 分数

    let grid = Array.from(document.querySelectorAll(".grid")), // 游戏格子
        board = new Array(16).fill(0),                         // 游戏面板
        preBoard = [...board];                                 // 上一步面板

    let move1 = [], merge = [], move2 = [],                    // 移动和合并动画组坐标位置记录
        animate1 = [], animate2 = [], animate3 = [];           // 可合并动画组坐标位置记录

    let gameID = 2048, scoreUpd = false;                       // 当前游戏id

    document.addEventListener('keydown', function (event) {
        // 检查是否同时按下了Alt键和F5键
        if (event.altKey && event.key === 't') {
            event.preventDefault(); // 阻止默认行为
            refreshJson(); // 调用刷新JSON数据的函数
        }
    });

    // 刷新JSON数据
    function refreshJson() {
        console.log("刷新JSON数据");
        reset();
        initRanking();
        score = 0, highScore = 0, board = new Array(16).fill(0), scoreUpd = false;
        update();
        updateRanking();
    }

    // 重置保存系统
    function reset() {
        resetRanking();
        localStorage.removeItem('game2048Board');
        localStorage.removeItem('game2048Score');
        localStorage.removeItem('game2048HighScore');
    }

    // 重置排行榜用（调试）（alt+t)
    function resetRanking() {
        localStorage.setItem("rankingList", JSON.stringify([]));
        displayRanking();
    }

    // 初始化游戏版及分数（保存系统）
    initBoard();
    function initBoard() {
        initRanking();
        const savedBoard = JSON.parse(localStorage.getItem('game2048Board')),
            savedScore = JSON.parse(localStorage.getItem('game2048Score')),
            savedHighScore = JSON.parse(localStorage.getItem('game2048HighScore')),
            savedRanking = JSON.parse(localStorage.getItem('rankingList')) || [];

        if (savedBoard) {
            gameStarted = true;
            board = savedBoard;
            score = savedScore;
            highScore = savedHighScore;
        }

        savedRanking.forEach((item) => {
            if (item.id === gameID) scoreUpd = true;
        });
        update();
    }

    // 保存游戏版及分数
    function save() {
        saveBoard();
        saveScore();
    }

    // 保存游戏版
    function saveBoard() {
        localStorage.setItem('game2048Board', JSON.stringify(board));
    }

    // 保存分数
    function saveScore() {
        localStorage.setItem('game2048Score', JSON.stringify(score));
        localStorage.setItem('game2048HighScore', JSON.stringify(highScore));
    }

    // 更新游戏版及分数
    function update() {
        updateBoard();
        updateScore();
        displayRanking();
    }

    /* 初始化游戏 */
    function setupBoard() {
        // 游戏正式开始
        gameStarted = true;
        win = false;

        // 重置分数及游戏版
        score = 0, board = new Array(16).fill(0);

        // 移除动画状态
        for (let i = 0; i < grid.length; i++) grid[i].style.transform = "scale(1)";
        anime.remove(grid);

        // 颜色检查（debugging）
        // board[0] = 2;
        // for (let i = 1; i < board.length; i++)
        // board[i] = board[i - 1] * 2;

        // 随机生成两个数字
        addNumber();
        addNumber();
        save();

        // 更新游戏版及分数
        update();
    }

    // 更新分数
    function updateScore() {
        document.querySelector('.score-container span').textContent = score;
        highScore = Math.max(score, highScore);
        document.querySelector('.best-container span').textContent = highScore;
    }

    // 初始化创作者的排行榜
    function initRanking() {
        let rank = JSON.parse(localStorage.getItem('rankingList')) || [];

        if (!rank.length) {
            rank = [
                { score: 0, id: 'LYQ' },
                { score: 0, id: 'LZH' },
                { score: 0, id: 'NX' },
                { score: 0, id: 'WX' },
                { score: 0, id: 'XBN' }
            ];
            localStorage.setItem('rankingList', JSON.stringify(rank));
        }
    }

    // 更新排行榜
    function updateRanking() {
        const rank = JSON.parse(localStorage.getItem('rankingList')) || [];
        if (!scoreUpd) {
            scoreUpd = true;
            rank.push({ score: score, id: gameID });
        }
        else for (let i = 0; i < rank.length; i++) if (rank[i].id === gameID && score > rank[i].score) rank[i].score = score;
        console.log("rank: ", rank);
        rank.sort((a, b) => b.score - a.score);
        localStorage.setItem('rankingList', JSON.stringify(rank));
        displayRanking();
    }

    // 显示排行榜（5+1）——（那个1是玩家）
    function displayRanking() {
        const rank = JSON.parse(localStorage.getItem('rankingList')) || [];
        const rankElement = document.getElementById('rankingList');
        rankElement.innerHTML = '';

        rank.forEach((item) => {
            const li = document.createElement('li')

            li.classList.add('ranking-item');

            if (item.id === gameID) {
                li.textContent = `呜呜伯: ${item.score}`;
                li.classList.add('ranking-item-sp');
            }
            else if (item.id === 'LYQ') li.textContent = `LYQ: ${item.score}`;
            else if (item.id === 'LZH') li.textContent = `LZH: ${item.score}`;
            else if (item.id === 'NX') li.textContent = `NX: ${item.score}`;
            else if (item.id === 'WX') li.textContent = `WX: ${item.score}`;
            else if (item.id === 'XBN') li.textContent = `XBN: ${item.score}`;

            rankElement.appendChild(li);
        });
    }

    // 在空白格子随机生成数字
    function addNumber() {
        // 获取所有的空格(0)
        let empty = board.reduce((acc, curr, index) => (curr === 0 ? acc.concat(index) : acc), []);
        // 如果有空格(0)，随机选择一个空格(0)添加数字
        if (empty.length) {
            // 随机选择一个空格(0)
            let rand = empty[Math.floor(Math.random() * empty.length)];
            // 90%的概率是2，10%的概率是4
            board[rand] = Math.random() > 0.1 ? 2 : 4;
            jumpAnimate2(rand);
        }
    }

    // 更新游戏版
    function updateBoard() {
        for (let i = 0; i < board.length; i++) {
            if (board[i]) {
                // 更新数字
                grid[i].innerText = board[i];
                // 更新颜色
                if (document.body.classList.contains("dark")) grid[i].style.backgroundColor = darkColor(board[i]);
                else grid[i].style.backgroundColor = getColor(board[i]);
                // 更新字体
                adjustFont(grid[i]);
            }
            else {
                // 清空数字
                grid[i].innerText = "";
                // 清空颜色
                if (document.body.classList.contains("dark")) grid[i].style.backgroundColor = "#3a3b3c";
                else grid[i].style.backgroundColor = "#eee5db";
            }
        }
    }

    var modeSwitch = document.querySelector(".toggle-switch");
    modeSwitch.addEventListener("click", () => {
        // 检查切换模式
        // console.log("mode: ", document.body.classList.contains("dark") ? "dark" : "light");
        updateBoard();
    });

    // 原版
    function getColor(num) {
        switch (num) {
            case 2: return "#dad8cf";    // 淡灰色
            case 4: return "#ede0c8";    // 淡棕色
            case 8: return "#f2b179";    // 橙色
            case 16: return "#f59563";   // 橙红色
            case 32: return "#f67c5f";   // 橙红色
            case 64: return "#f65e3b";   // 红色
            case 128: return "#edcf72";  // 黄色
            case 256: return "#edcc61";  // 黄色
            case 512: return "#edc850";  // 黄色
            case 1024: return "#edc53f"; // 黄色
            case 2048: return "#edc22e"; // 金色
            case 4096: return "#d4a017"; // 深金色
        }
        return "#b87430";                // 棕色
    }

    // 深色版
    function darkColor(num) {
        switch (num) {
            case 2: return "#333333";
            case 4: return "#555555";
            case 8: return "#777777";
            case 16: return "#999999";
            case 32: return "#B3B3B3";
            case 64: return "#CCCCCC";
            case 128: return "#E0E0E0";
            case 256: return "#D3D3FF";
            case 512: return "#ADD8E6";
            case 1024: return "#87CEEB";
            case 2048: return "#00BFFF";
            case 4096: return "#003CBA";
        }
        return "#0000CC";
    }

    // 更新其他颜色
    function getColor1(num) {
        const colors = {
            2: "#FCE8E6",
            4: "#E1F8C4",
            8: "#B9F8A6",
            16: "#A2FF9E",
            32: "#82FFB8",
            64: "#69FFCE",
            128: "#52F3E4",
            256: "#4BD6F2",
            512: "#33BFFA",
            1024: "#1A9BF0",
            2048: "#0057D9"
        };
        const defaultColor = "#003CBA";

        // 调暗函数
        function darken(color, amount) {
            let hex = color.replace('#', '');
            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);
            r = Math.max(0, r - amount);
            g = Math.max(0, g - amount);
            b = Math.max(0, b - amount);

            r = r.toString(16).padStart(2, '0');
            g = g.toString(16).padStart(2, '0');
            b = b.toString(16).padStart(2, '0');

            return `#${r}${g}${b}`;
        }

        // 调暗指定的颜色
        return darken(colors[num] || defaultColor, 0);
    }

    // 更新字体
    function adjustFont(grid) {
        let size = grid.offsetWidth * 0.8,     // 获取格子宽度*调整比例
            fontSize = size / 2;               // 字体大小 = 格子宽度*调整比例/2
        grid.style.fontSize = fontSize + "px"; // 设置字体大小


        // 5位数特调
        if (grid.innerHTML.length > 4) grid.style.fontSize = `${fontSize * 0.75}px`;

        grid.style.fontWeight = "bold";
        // 字体的参数
        grid.style.color = "#F9F6F0";

    }

    // Q弹动画及音效的使用
    function jump() {
        anime.remove(grid);
        for (let i = 0; i < grid.length; i++) grid[i].style.transform = "scale(1)";
        for (let i = 0; i < grid.length; i++) if (board[i]) jumpAnimate(grid[i]);
        // Q弹音效（同步播放）
        playSound();
    }

    // Q弹动画
    function jumpAnimate(grid) {
        anime({
            targets: grid,            // 目标元素
            scale: [1, 1.15, 1],      // 缩放比例    
            duration: 200,            // 持续时间
            easing: 'easeInOutQuad',  // 添加缓动效果
            transformOrigin: 'center' // 确保缩放中心在元素的中心
        }).finished;                  // 动画结束
    }

    // 新增数字动画
    function jumpAnimate2(idx) {
        anime({
            targets: grid[idx],       // 目标元素
            scale: [0, 1],            // 缩放比例    
            duration: 200,            // 持续时间
            easing: 'easeInOutQuad',  // 添加缓动效果
            transformOrigin: 'center' // 确保缩放中心在元素的中心
        }).finished;                  // 动画结束
    }

    // Q弹音效
    function playSound() {
        var pop = document.getElementById("pop"); // 获取音效
        pop.currentTime = 0;                      // 重置音效 
        pop.play();                               // 播放音效
    }

    // game2048
    function game2048() {
        move();

        animationMerge();
        // 检查动画组（debugging）
        /*console.log("move1", move1);
        console.log("merge", merge);
        console.log("move2", move2);
        console.log("animate1", animate1);
        console.log("animate2", animate2);
        console.log("animate3", animate3);*/

        animateDeploy();

        setTimeout(() => {
            isLose();
            isWin();
            isAnimating = false;
        }, 50);
    }

    // 根据方向处理移动和合并
    function move() {
        // 初始化动画组
        move1 = [], merge = [], move2 = [];

        // 根据方向处理
        switch (dir) {
            case "up":
                for (let i = 0; i <= 3; i++) {
                    let row = [board[i], board[i + 4], board[i + 8], board[i + 12]];
                    let newRow = moveAndMerge(row, i, move1, merge, move2);
                    for (let j = 0; j <= 3; j++) board[i + j * 4] = newRow[j];
                }
                break;
            case "down":
                for (let i = 12; i <= 15; i++) {
                    let row = [board[i], board[i - 4], board[i - 8], board[i - 12]];
                    let newRow = moveAndMerge(row, i, move1, merge, move2);
                    for (let j = 0; j <= 3; j++) board[i - j * 4] = newRow[j];
                }
                break;
            case "left":
                for (let i = 0; i <= 15; i += 4) {
                    let row = [board[i], board[i + 1], board[i + 2], board[i + 3]];
                    let newRow = moveAndMerge(row, i, move1, merge, move2);
                    for (let j = 0; j <= 3; j++) board[i + j] = newRow[j];
                }
                break;
            case "right":
                for (let i = 15; i >= 0; i -= 4) {
                    let row = [board[i], board[i - 1], board[i - 2], board[i - 3]];
                    let newRow = moveAndMerge(row, i, move1, merge, move2);
                    for (let j = 0; j <= 3; j++) board[i - j] = newRow[j];
                }
                break;
        }
    }

    // 移动和合并
    function moveAndMerge(row, preIdx, move1, merge, move2) {
        // 如果整行都是0，直接返回
        if (row.every(obj => obj === 0)) return row;

        // 将每个元素转换为（值，位置）的元组
        let preRow = [];
        switch (dir) {
            case "up":
                preRow = row.map((val, idx) => ({ val, pos: preIdx + idx * 4 }));
                break;
            case "down":
                preRow = row.map((val, idx) => ({ val, pos: preIdx - idx * 4 }));
                break;
            case "left":
                preRow = row.map((val, idx) => ({ val, pos: preIdx + idx }));
                break;
            case "right":
                preRow = row.map((val, idx) => ({ val, pos: preIdx - idx }));
                break;
        }

        // 移动（move1）即去0
        let newRow = preRow.filter(obj => obj.val !== 0);
        // 记录移动（move1）动画组坐标、移动距离、值
        for (let i = 0; i < newRow.length; i++)
            if (preRow[i].pos !== newRow[i].pos)
                move1.push({ from: newRow[i].pos, to: preRow[i].pos, dis: preRow[i].pos - newRow[i].pos, val: newRow[i].val });
        // 更新移动后的位置
        for (let i = 0; i < newRow.length; i++) newRow[i] = { val: newRow[i].val, pos: preRow[i].pos }
        // 复制一份，记录第二次移动（move2）动画组坐标、移动距离、值
        let tmp = [...newRow];

        // 合并（merge）并记录合并动画组坐标、移动距离、值
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i].val === newRow[i + 1].val) {
                merge.push({ from: newRow[i + 1].pos, to: newRow[i].pos, dis: newRow[i].pos - newRow[i + 1].pos, val: newRow[i + 1].val });
                newRow[i].val *= 2, newRow[i + 1].val = 0;
                score += newRow[i].val;
            }
        }

        // 移动（move2）即去0
        newRow = newRow.filter(obj => obj.val !== 0);
        // 记录第二次移动（move2）动画组坐标、移动距离、值
        for (let i = 0; i < newRow.length; i++)
            if (tmp[i].pos !== newRow[i].pos)
                move2.push({ from: newRow[i].pos, to: tmp[i].pos, dis: tmp[i].pos - newRow[i].pos, val: newRow[i].val });

        // 补0，位置无所谓了
        while (newRow.length < row.length) newRow.push({ val: 0, pos: null });

        // 仅返回值
        return newRow.map(obj => obj.val);
    }

    // 可合并动画组
    function animationMerge() {
        // 初始化可合并动画组
        animate1 = [], animate2 = [], animate3 = [];

        // 并移一体化不可删点(合并后移动)(merge->move2)(animate1)
        for (let i = 0; i < merge.length; i++)
            for (let j = 0; j < move2.length; j++)
                if (merge[i].to === move2[j].from)
                    animate2.push({ from: merge[i].from, to: move2[j].to, dis: move2[j].to - merge[i].from, val: merge[i].val });

        // 移并一体化可删点(移动后合并)(move1->merge)(animate1)
        for (let i = 0; i < move1.length; i++)
            for (let j = 0; j < merge.length; j++)
                if (move1[i].to === merge[j].from) {
                    animate1.push({ from: move1[i].from, to: merge[j].to, dis: merge[j].to - move1[i].from, val: move1[i].val });
                    move1.splice(i--, 1);
                    merge.splice(j, 1);
                    break;
                }

        // 移移一体化可删点(移动后移动)(move1->move2)(animate3)
        for (let i = 0; i < move1.length; i++)
            for (let j = 0; j < move2.length; j++)
                if (move1[i].to === move2[j].from) {
                    animate3.push({ from: move1[i].from, to: move2[j].to, dis: move2[j].to - move1[i].from, val: move1[i].val });
                    move1.splice(i--, 1);
                    move2.splice(j, 1);
                    break;
                }
    }

    // 动画运行
    function animateDeploy() {
        // 动画开始
        isAnimating = true;

        for (let i = 0; i < animate1.length; i++) animateRunPromise(animate1[i].from, animate1[i].dis, animate1[i].val);
        for (let i = 0; i < animate2.length; i++) animateRunPromise(animate2[i].from, animate2[i].dis, animate2[i].val);
        for (let i = 0; i < animate3.length; i++) animateRunPromise(animate3[i].from, animate3[i].dis, animate3[i].val);

        for (let i = 0; i < move1.length; i++) animateRun(move1[i].from, move1[i].dis, move1[i].val);
        for (let i = 0; i < merge.length; i++) animateRun(merge[i].from, merge[i].dis, merge[i].val);
        for (let i = 0; i < move2.length; i++) animateRun(move2[i].from, move2[i].dis, move2[i].val);
    }

    // 优先处理动画功能模组
    function animateRunPromise(from, dis, val) {
        return new Promise((resolve) => {
            setTimeout(() => {
                animateRun(from, dis, val);
                resolve();
            }, 2);
        });
    }

    // 运行动画
    function animateRun(from, dis, val) {
        // 获取需要建立动画的移动格
        const fromGrid = grid[from];
        // 更换颜色
        if (document.body.classList.contains("dark")) fromGrid.style.backgroundColor = darkColor(val);
        else fromGrid.style.backgroundColor = getColor(val);

        // 设置移动距离
        let animateDis = dis * 100;
        // 按（方向）设置动画
        switch (dir) {
            case "up":
                animateDis /= 4;
                fromGrid.style.setProperty('--y', `${animateDis}px`);
                fromGrid.style.animation = `moveUp 0.05s forwards`;
                break;
            case "down":
                animateDis /= 4;
                fromGrid.style.setProperty('--y', `${animateDis}px`);
                fromGrid.style.animation = `moveDown 0.05s forwards`;
                break;
            case "left":
                fromGrid.style.setProperty('--x', `${animateDis}px`);
                fromGrid.style.animation = `moveLeft 0.05s forwards`;
                break;
            case "right":
                fromGrid.style.setProperty('--x', `${animateDis}px`);
                fromGrid.style.animation = `moveRight 0.05s forwards`;
                break;
        }
        // 提升z轴让动画必定显示在顶层
        fromGrid.style.zIndex = 1000;

        // 动画结束后重置动画
        fromGrid.addEventListener("animationend", () => {
            // 确保动画只播放一次
            if (!upd) {
                upd = true;
                jump();
                if (preBoard.join("") !== board.join("")) addNumber();
                update();
                updateRanking(score);
                save();
            }
            fromGrid.style.animation = '';
            fromGrid.style.zIndex = '';
        });
    }

    // 检查游戏是否输了
    function checkLose() {
        // 检查是否有空格
        if (board.includes(0)) return lose = false;

        // 检查是否有相邻的相同数字（能否合并）
        for (let i = 0; i < board.length; i++) {
            if (i % 4 !== 3 && board[i] === board[i + 1]) return lose = false;
            if (i < 12 && board[i] === board[i + 4]) return lose = false;
        }

        return lose = true;
    }

    // 输了
    function isLose() {
        if (checkLose(board)) {
            // 游戏结束
            gameStarted = false;
            // 弹窗提示
            document.getElementById('gameOverBoard').classList.add('active');
            document.addEventListener('click', function () { document.getElementById('gameOverBoard').classList.remove('active'); });
        }
    }

    // 赢了
    function isWin() {
        if (board.includes(2048) && !win) {
            // 游戏可以选择性结束
            win = true;
            // 弹窗提示
            document.getElementById('gameWinBoard').classList.add('active');
            document.addEventListener('click', function () { document.getElementById('gameWinBoard').classList.remove('active'); });
        }
    }

    // 键盘事件
    document.addEventListener("keyup", (e) => {
        dir = null;
        // 检查游戏是否开始 或 动画是否结束
        if (!gameStarted || isAnimating) return;

        // 保存上一步面板
        preBoard = [...board];
        // 用于确保动画只播放一次
        upd = false;

        // 将WASD和箭头键转换为方向
        switch (e.key) {
            case "ArrowUp":
            case "W":
            case "w":
                dir = "up";
                break;
            case "ArrowDown":
            case "S":
            case "s":
                dir = "down";
                break;
            case "ArrowLeft":
            case "A":
            case "a":
                dir = "left";
                break;
            case "ArrowRight":
            case "D":
            case "d":
                dir = "right";
                break;
        }
        if (dir !== null) game2048();
    });

    let startX, startY; // 开始触摸或点击的坐标
    let isTouching = false, isSwipeModeEnabled = false; // 标记是否正在触摸或点击

    // 为按钮添加点击事件监听器来切换滑动模式
    document.getElementById('toggleSwipeMode').addEventListener('click', function () {
        const body = document.body;
        isSwipeModeEnabled = !isSwipeModeEnabled; // 切换滑动模式的状态
        this.textContent = isSwipeModeEnabled ? "禁用滑动模式" : "启动滑动模式"; // 更新按钮文本
        this.style.backgroundColor = isSwipeModeEnabled ? "gray" : "";
        this.style.color = isSwipeModeEnabled ? "white" : "";

        if (isSwipeModeEnabled) {
            body.classList.add('no-scroll'); // 添加类来禁止滚动和文本选择
            document.addEventListener('mousedown', preventScroll, false);
        } else {
            body.classList.remove('no-scroll'); // 移除类来恢复滚动和文本选择
            document.removeEventListener('mousedown', preventScroll, false);
        }
    });

    function preventScroll(e) {
        e.preventDefault();
    }

    // 触摸开始或鼠标按下
    function handleStart(event) {
        if (!isSwipeModeEnabled) return; // 如果没有启用滑动模式，则不执行
        isTouching = true;
        // 兼容触摸事件和鼠标事件
        const touch = event.touches ? event.touches[0] : event;
        startX = touch.clientX;
        startY = touch.clientY;
    }

    // 触摸结束或鼠标释放
    function handleEnd(event) {
        if (!isTouching || !isSwipeModeEnabled) return; // 如果没有开始触摸或点击，则不执行
        isTouching = false;

        // 兼容触摸事件和鼠标事件
        const touch = event.changedTouches ? event.changedTouches[0] : event;
        const moveEndX = touch.clientX;
        const moveEndY = touch.clientY;
        const X = moveEndX - startX;
        const Y = moveEndY - startY;

        if (!gameStarted || isAnimating) return;
        upd = false, dir = null;

        const MIN_DISTANCE = 10; // 设置最小滑动距离
        if (Math.abs(X) > Math.abs(Y) && Math.abs(X) > MIN_DISTANCE) {
            // 判断左右滑动
            if (X > 0) dir = "right";
            else dir = "left";
        } else if (Math.abs(Y) > Math.abs(X) && Math.abs(Y) > MIN_DISTANCE) {
            // 判断上下滑动
            if (Y > 0) dir = "down";
            else dir = "up";
        }

        if (dir !== null) game2048();
    }

    // 添加触摸事件监听器
    document.addEventListener('touchstart', handleStart, false);
    document.addEventListener('touchend', handleEnd, false);

    // 添加鼠标事件监听器
    document.addEventListener('mousedown', handleStart, false);
    document.addEventListener('mouseup', handleEnd, false);
});
