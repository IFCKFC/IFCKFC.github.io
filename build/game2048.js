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

    let acI = document.querySelectorAll('.achievement-item');  // 成就项

    // 成就用变量
    let step = 0;                                              // 步数
    let sugCnt = 0;                                            // 回馈次数
    let wasdCnt = 0;                                           // 步数（3秒内）
    let modeCnt = 0;                                           // 模式切换次数

    document.addEventListener('keydown', function (event) {
        // 检查是否同时按下了Alt键和F5键
        if (event.altKey && event.key === 't') {
            event.preventDefault(); // 阻止默认行为
            refreshJson();          // 调用刷新JSON数据的函数
        }
    });

    // 刷新JSON数据
    function refreshJson() {
        resetAchievement();                             // 重置成就
        reset();                                        // 重置保存系统
        initRanking();                                  // 重置排行榜
        gameStarted = false, win = false, lose = false; // 重置游戏状态
        score = 0, highScore = 0, scoreUpd = false;     // 重置分数
        board = new Array(16).fill(0);                  // 重置游戏版
        step = 0, sugCnt = 0, wasdCnt = 0, modeCnt = 0; // 重置成就用变量
        update();                                       // 更新游戏版及分数
        updateRanking();                                // 更新排行榜
    }

    // 重置保存系统
    function reset() {
        resetRanking();                               // 重置排行榜
        localStorage.removeItem('game2048Board');     // 重置游戏版
        localStorage.removeItem('game2048Score');     // 重置分数
        localStorage.removeItem('game2048HighScore'); // 重置最高分数
        localStorage.removeItem('step');              // 重置步数
        localStorage.removeItem('sugCnt');            // 重置回馈次数
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
        // 检查是否有保存的游戏版及分数
        const savedBoard = JSON.parse(localStorage.getItem('game2048Board')),
            savedScore = JSON.parse(localStorage.getItem('game2048Score')),
            savedHighScore = JSON.parse(localStorage.getItem('game2048HighScore')),
            savedRanking = JSON.parse(localStorage.getItem('rankingList')) || [];
        // 恢复游戏版及分数
        if (savedBoard) {
            gameStarted = true;
            board = savedBoard;
            score = savedScore;
            highScore = savedHighScore;
        }
        // 恢复排名
        savedRanking.forEach((item) => {
            if (item.id === gameID) scoreUpd = true;
        });

        // 恢复步数
        const savedStep = localStorage.getItem('step');
        if (savedStep) step = parseInt(savedStep, 10);

        // 恢复回馈次数
        const savedSugCnt = localStorage.getItem('sugCnt');
        if (savedSugCnt) parseInt(savedSugCnt, 10);

        restoreAchievements();

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

    // 保存步数
    function saveStep() {
        localStorage.setItem('step', JSON.stringify(step));
    }

    // 增加步数
    function addStep() {
        step++;
        saveStep();
    }

    // 保存回馈次数
    function saveSugCnt() {
        localStorage.setItem('sugCnt', JSON.stringify(sugCnt));
    }

    // 增加回馈次数
    function addSugCnt() {
        sugCnt++;
        saveSugCnt();
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
        //board[0] = 2;
        //for (let i = 1; i < board.length; i++)
        //board[i] = board[i - 1] * 2;

        // 胜利检查
        /*board[0] = 2;
        board[1] = 2;
        board[2] = 4;
        board[3] = 8;
        board[7] = 16;
        board[6] = 32;
        board[5] = 64;
        board[4] = 128;
        board[8] = 256;
        board[9] = 512;
        board[10] = 1024;
        board[11] = 2048;
        board[15] = 4096;
        board[14] = 8192;
        board[13] = 16384;
        board[12] = 32768;*/

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
                { score: 31588, id: 'LYQ' },
                { score: 13558, id: 'LZH' },
                { score: 15580, id: 'NX' },
                { score: 15558, id: 'WX' },
                { score: 36036, id: 'XBN' }
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
                li.textContent = `User558: ${item.score}`;
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
                else if (document.body.classList.contains("gold")) grid[i].style.backgroundColor = defaultColor(board[i]);
                else if (document.body.classList.contains("blue")) grid[i].style.backgroundColor = blueColor(board[i]);
                else if (document.body.classList.contains("pink")) grid[i].style.backgroundColor = pinkColor(board[i]);
                else if (document.body.classList.contains("macaroon")) grid[i].style.backgroundColor = macaroonColor(board[i]);
                else if (document.body.classList.contains("cyber")) grid[i].style.backgroundColor = cyberColor(board[i]);
                else grid[i].style.backgroundColor = defaultColor(board[i]);
                // 更新字体
                adjustFont(grid[i]);
            }
            else {
                // 清空数字
                grid[i].innerText = "";
                // 清空颜色
                grid[i].style.backgroundColor = "";
            }
        }
    }

    var modeSwitch = document.querySelector(".toggle-switch");
    modeSwitch.addEventListener("click", () => { updateBoard(); });
    goldBtn.addEventListener("click", () => { updateBoard(); });
    blueBtn.addEventListener("click", () => { updateBoard(); });
    pinkBtn.addEventListener("click", () => { updateBoard(); });
    macaroonBtn.addEventListener("click", () => { updateBoard(); });
    cyberBtn.addEventListener("click", () => { updateBoard(); });

    // 慕土金（预设）
    function defaultColor(num) {
        switch (num) {
            case 2: return "#dad8cf";
            case 4: return "#ede0c8";
            case 8: return "#f2b179";
            case 16: return "#f59563";
            case 32: return "#f67c5f";
            case 64: return "#f65e3b";
            case 128: return "#edcf72";
            case 256: return "#edcc61";
            case 512: return "#edc850";
            case 1024: return "#edc53f";
            case 2048: return "#edc22e";
            case 4096: return "#d4a017";
        }
        return "#b87430";
    }

    // 夜来香
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

    // 海湾蓝
    function blueColor(num) {
        switch (num) {
            case 2: return "#92f4f3";
            case 4: return "#00dcf4";
            case 8: return "#00a7f5";
            case 16: return "#73a0fd";
            case 32: return "#0079e2";
            case 64: return "#2f5093";
            case 128: return "#0442e5";
            case 256: return "#6155db";
            case 512: return "#9e5ede";
            case 1024: return "#8d54d2";
            case 2048: return "#931adf";
            case 4096: return "#d4a017";
        }
        return "#000";
    }

    // 梦幻粉
    function pinkColor(num) {
        switch (num) {
            case 2: return "#ffd1d9";
            case 4: return "#ffb0b0";
            case 8: return "#ffa0a0";
            case 16: return "#ff9090";
            case 32: return "#f0bbd9";
            case 64: return "#f48fb1";
            case 128: return "#f06292";
            case 256: return "#ec407a";
            case 512: return "#e91e63";
            case 1024: return "#c2185b";
            case 2048: return "#990e4f";
            case 4096: return "#770e4f";
        }
        return "#541029";
    }

    // 马卡龙
    function macaroonColor(num) {
        switch (num) {
            case 2: return "#f1f1b8";
            case 4: return "#ffe647";
            case 8: return "#f0b735";
            case 16: return "#df7a30";
            case 32: return "#e26538";
            case 64: return "#b8f1ed";
            case 128: return "#87CEFA";
            case 256: return "#00BFFF";
            case 512: return "#b8f1cc";
            case 1024: return "#ddff95";
            case 2048: return "#b8d38f";
            case 4096: return "#2E8B57";
        }
        return "#cb7799";
    }

    // 赛博风
    function cyberColor(num) {
        switch (num) {
            case 2: return "#00ffcc";     // 亮绿色
            case 4: return "#00ccff";     // 亮蓝色
            case 8: return "#ff00cc";     // 亮粉色
            case 16: return "#ff6600";    // 亮橙色
            case 32: return "#ffff00";    // 亮黄色
            case 64: return "#ff33cc";    // 亮紫色
            case 128: return "#00ffff";   // 亮青色
            case 256: return "#ff9900";   // 亮橙色
            case 512: return "#33cc33";   // 亮绿色
            case 1024: return "#cc00cc";  // 亮紫色
            case 2048: return "#ffcc00";  // 亮黄色
            case 4096: return "#0099cc";  // 亮蓝色
        }
        return "#cb7799";     // 默认颜色
    }

    // 更新字体
    function adjustFont(grid) {
        let size = grid.offsetWidth * 0.8,     // 获取格子宽度*调整比例
            fontSize = size / 2;               // 字体大小 = 格子宽度*调整比例/2
        grid.style.fontSize = fontSize + "px"; // 设置字体大小


        // 5位数特调
        if (grid.innerHTML.length > 4) grid.style.fontSize = `${fontSize * 0.75}px`;

        // grid.style.fontWeight = "bold";
        // 字体的参数
        // grid.style.color = "#F9F6F0";

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

    // 成就音效
    function playAcIS() {
        var acIS = document.getElementById("acIS"); // 获取音效
        acIS.currentTime = 0;                      // 重置音效
        acIS.play();                               // 播放音效
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
        if (document.body.classList.contains("dark")) sfromGrid.style.backgroundColor = darkColor(val);
        else if (document.body.classList.contains("gold")) fromGrid.style.backgroundColor = defaultColor(val);
        else if (document.body.classList.contains("blue")) fromGrid.style.backgroundColor = blueColor(val);
        else if (document.body.classList.contains("pink")) fromGrid.style.backgroundColor = pinkColor(val);
        else if (document.body.classList.contains("macaroon")) fromGrid.style.backgroundColor = macaroonColor(val);
        else if (document.body.classList.contains("cyber")) fromGrid.style.backgroundColor = cyberColor(val);
        else fromGrid.style.backgroundColor = defaultColor(val);

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
                if (preBoard.join("") !== board.join("")) {
                    addStep();                              // 有移动或合并操作才会增加步数
                    addNumber();
                }
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
        wasdCnt++; // 记录三秒内的步数
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

    let isSwipeModeEnabled = false;
    document.getElementById('toggleSwipeMode').addEventListener('click', function () {
        isSwipeModeEnabled = !isSwipeModeEnabled; // 切换滑动模式的状态
        // 更新按钮的文本和样式
        this.textContent = isSwipeModeEnabled ? "禁用滑动模式" : "启动滑动模式";
        this.style.backgroundColor = isSwipeModeEnabled ? "gray" : "";
        this.style.color = isSwipeModeEnabled ? "white" : "";

        if (isSwipeModeEnabled) {
            // 在启用滑动模式时添加监听器
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener("touchstart", handleTouchStart, false);
            document.addEventListener("touchend", handleTouchEnd, false);
            document.addEventListener("mousedown", handleMouseDown, false);
            document.addEventListener("mouseup", handleMouseUp, false);
        } else {
            // 在禁用滑动模式时移除监听器
            document.removeEventListener('touchmove', handleTouchMove, { passive: false });
            document.removeEventListener("touchstart", handleTouchStart, false);
            document.removeEventListener("touchend", handleTouchEnd, false);
            document.removeEventListener("mousedown", handleMouseDown, false);
            document.removeEventListener("mouseup", handleMouseUp, false);
        }
    });

    function handleTouchMove(e) {
        if (window.scrollY <= 50 || window.scrollX <= 50) e.preventDefault();
        // 获取视口宽度
        const viewportWidth = window.innerWidth;
        // 获取页面总宽度
        const totalWidth = document.documentElement.scrollWidth;
        // 计算当前滚动位置加上视口宽度，得到的是当前视口右边缘相对于页面左边缘的位置
        const currentRightPosition = window.scrollX + viewportWidth;

        // 如果当前右边缘位置接近页面总宽度（即接近右边界），阻止滑动
        // 这里的阈值（如50px）可以根据需要调整
        if (totalWidth - currentRightPosition <= 50) e.preventDefault();
    }

    // 触摸开始时的坐标
    let touchStartX = 0, touchStartY = 0;

    // 定义处理滑动开始和结束的函数
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX, touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e) {
        wasdCnt++; // 记录三秒内的步数
        const touchEndX = e.changedTouches[0].clientX, touchEndY = e.changedTouches[0].clientY;
        const dx = touchEndX - touchStartX, dy = touchEndY - touchStartY;

        dir = null;
        let minDis = 50; // 最小滑动距离
        if (Math.abs(dx) > minDis || Math.abs(dy) > minDis) {
            if (Math.abs(dx) > Math.abs(dy)) {
                // 水平滑动
                if (dx > 0) dir = "right";
                else dir = "left";
            } else {
                // 垂直滑动
                if (dy > 0) dir = "down";
                else dir = "up";
            }
        } else return;

        // 检查游戏是否开始 或 动画是否结束
        if (!gameStarted || isAnimating || dir === null) return;

        // 保存上一步面板
        preBoard = [...board];
        // 用于确保动画只播放一次
        upd = false;

        game2048();
    }

    // 电脑版
    let mouseStartX = 0, mouseStartY = 0;

    function handleMouseDown(e) {
        mouseStartX = e.clientX, mouseStartY = e.clientY;
    }

    function handleMouseUp(e) {
        wasdCnt++; // 记录三秒内的步数
        const mouseEndX = e.clientX, mouseEndY = e.clientY;
        const dx = mouseEndX - mouseStartX, dy = mouseEndY - mouseStartY;

        dir = null;
        let minDis = 50; // 最小滑动距离
        if (Math.abs(dx) > minDis || Math.abs(dy) > minDis) {
            if (Math.abs(dx) > Math.abs(dy)) {
                // 水平滑动
                if (dx > 0) dir = "right";
                else dir = "left";
            } else {
                // 垂直滑动
                if (dy > 0) dir = "down";
                else dir = "up";
            }
        } else return;

        // 检查游戏是否开始 或 动画是否结束
        if (!gameStarted || isAnimating || dir === null) return;

        // 保存上一步面板
        preBoard = [...board];
        // 用于确保动画只播放一次
        upd = false;

        game2048();
    }

    // 成就系统

    // 重置成就
    function resetAchievement() {
        document.getElementById('submitBtn').classList.remove('active'); // acI13特调
        document.getElementById('logo').classList.remove('active'); // acI18特调
        document.getElementById('like1').classList.remove('active'); // acI22特调
        document.getElementById('like2').classList.remove('active');
        document.getElementById('like3').classList.remove('active');
        document.getElementById('like4').classList.remove('active');
        document.getElementById('like5').classList.remove('active');

        let achievements = JSON.parse(localStorage.getItem('achievements') || '{}');
        for (let key in achievements) achievements[key] = false; // 将每个成就的完成状态设置为 false
        localStorage.setItem('achievements', JSON.stringify(achievements)); // 更新 localStorage 中的成就状态

        // 既有的 DOM 操作，移除所有成就的 'completed' 类
        acI.forEach((item) => {
            item.classList.remove('completed');
        });

        // 重新开始检查成就
        startChecking();
    }

    // 页面加载或游戏初始化时调用此函数
    function restoreAchievements() {
        const achievements = JSON.parse(localStorage.getItem('achievements')) || [];
        acI.forEach((item, index) => {
            if (achievements[index]) item.classList.add('completed');
        });
    }

    // 当成就项完成时调用此函数
    function completeAchievement(index) {
        const achievements = JSON.parse(localStorage.getItem('achievements')) || [];
        achievements[index] = true; // 标记为完成
        localStorage.setItem('achievements', JSON.stringify(achievements));
        acI[index].classList.add('completed');
    }

    // 用法（把第一个成就给显示完成）
    // acI[0].classList.add('completed');


    let acI0, acI1, acI2, acI3, acI4, acI5, acI6, acI7, acI8, acI9, acI10,
        acI11, acI12, acI13, acI14, acI15, acI16, acI17, acI18, acI19, acI20,
        acI21, acI22, acI23, acI24, acI25, acI26, acI27, acI28;
    // 首次检查成就
    startChecking();
    function startChecking() {
        const acI = JSON.parse(localStorage.getItem('achievements')) || [];
        if (!acI[0]) acI0_check();
        if (!acI[1]) acI1_check();
        if (!acI[2]) acI2_check();
        if (!acI[3]) acI3_check();
        if (!acI[4]) acI4_check();
        if (!acI[5]) acI5_check();
        if (!acI[6]) acI6_check();
        if (!acI[7]) acI7_check();
        if (!acI[8]) acI8_check();
        if (!acI[9]) acI9_check();
        if (!acI[10]) acI10_check();
        if (!acI[11]) acI11_check();
        if (!acI[12]) acI12_check();
        if (!acI[13]) acI13_check();
        if (!acI[14]) acI14_check();
        if (!acI[15]) acI15_check();
        if (!acI[16]) acI16_check();
        if (!acI[17]) acI17_check();
        if (!acI[18]) acI18_check();
        if (!acI[19]) acI19_check();
        if (!acI[20]) acI20_check();
        if (!acI[21]) acI21_check();
        if (!acI[22]) acI22_check();
        if (!acI[23]) acI23_check();
        if (!acI[24]) acI24_check();
        if (!acI[25]) acI25_check();
        if (!acI[26]) acI26_check();
        if (!acI[27]) acI27_check();
        if (!acI[28]) acI28_check();
    }

    // |成就一检查|梦开始的地方|达成条件：第一次点击“开始游戏·”|（0）|
    function acI0_check() {
        clearInterval(acI0);
        acI0 = setInterval(() => {
            // console.log('Checking Achievement 0...');
            if (gameStarted) {
                completeAchievement(0);
                clearInterval(acI0);
                playAcIS();
            }
        }, 1000);
    }

    // |成就二检查|前面的可是地狱啊|达成条件：第一次成功合成方块（第一次得到分数）|（1）|
    function acI1_check() {
        clearInterval(acI1);
        acI1 = setInterval(() => {
            // console.log('Checking Achievement 1...');
            if (highScore) {
                completeAchievement(1);
                clearInterval(acI1);
                playAcIS();
            }
        }, 1000);
    }

    // |成就三检查|初出茅庐|达成条件：分数第一次超过100|（2）|
    function acI2_check() {
        clearInterval(acI2);
        acI2 = setInterval(() => {
            // console.log('Checking Achievement 2...');
            if (highScore >= 100) {
                completeAchievement(2);
                clearInterval(acI2);
                playAcIS();
            }
        }, 1000);
    }

    // |成就四检查|呜呜伯|达成条件：分数第一次超过558|（3）|
    function acI3_check() {
        clearInterval(acI3);
        acI3 = setInterval(() => {
            // console.log('Checking Achievement 3...');
            if (highScore >= 558) {
                completeAchievement(3);
                clearInterval(acI3);
                playAcIS();
            }
        }, 1000);
    }

    // |成就五检查|小试牛刀|达成条件：分数第一次超过1000|（4）|
    function acI4_check() {
        clearInterval(acI4);
        acI4 = setInterval(() => {
            // console.log('Checking Achievement 4...');
            if (highScore >= 1000) {
                completeAchievement(4);
                clearInterval(acI4);
                playAcIS();
            }
        }, 1000);
    }

    // |成就六检查|炉火纯青|达成条件：分数第一次超过10000|（5）|
    function acI5_check() {
        clearInterval(acI5);
        acI5 = setInterval(() => {
            // console.log('Checking Achievement 5...');
            if (highScore >= 10000) {
                completeAchievement(5);
                clearInterval(acI5);
                playAcIS();
            }
        }, 1000);
    }

    // |成就七检查|独孤求败|达成条件：分数第一次超过20000|（6）|
    function acI6_check() {
        clearInterval(acI6);
        acI6 = setInterval(() => {
            // console.log('Checking Achievement 6...');
            if (highScore >= 20000) {
                completeAchievement(6);
                clearInterval(acI6);
                playAcIS();
            }
        }, 1000);
    }

    // |成就八检查|一代呜呜伯|达成条件：分数第一次超过25582|（7）|
    function acI7_check() {
        clearInterval(acI7);
        acI7 = setInterval(() => {
            // console.log('Checking Achievement 7...');
            if (highScore >= 25582) {
                completeAchievement(7);
                clearInterval(acI7);
                playAcIS();
            }
        }, 1000);
    }

    // |成就九检查|失败是成功他妈|达成条件：第一次失败|（8）|
    function acI8_check() {
        clearInterval(acI8);
        acI8 = setInterval(() => {
            // console.log('Checking Achievement 8...');
            if (lose) {
                completeAchievement(8);
                clearInterval(acI8);
                playAcIS();
            }
        }, 1000);
    }

    //  |成就十检查|键之力三段|达成条件：移动超过100次|（9）|
    function acI9_check() {
        clearInterval(acI9);
        acI9 = setInterval(() => {
            // console.log('Checking Achievement 9...');
            if (step >= 100) {
                completeAchievement(9);
                clearInterval(acI9);
                playAcIS();
            }
        }, 1000);
    }

    // |成就十一检查|呜呜伯累了.(´A`*)|达成条件：移动超过558次|（10）|
    function acI10_check() {
        clearInterval(acI10);
        acI10 = setInterval(() => {
            // console.log('Checking Achievement 10...');
            if (step >= 558) {
                completeAchievement(10);
                clearInterval(acI10);
                playAcIS();
            }
        }, 1000);
    }

    // |成就十二检查|大键师|达成条件：移动超过1000次|（11）|
    function acI11_check() {
        clearInterval(acI11);
        acI11 = setInterval(() => {
            // console.log('Checking Achievement 11...');
            if (step >= 1000) {
                completeAchievement(11);
                clearInterval(acI11);
                playAcIS();
            }
        }, 1000);
    }

    // |成就十三检查|键宗强者，恐怖如斯|达成条件：移动超过10000次|（12）|
    function acI12_check() {
        clearInterval(acI12);
        acI12 = setInterval(() => {
            // console.log('Checking Achievement 12...');
            if (step >= 10000) {
                completeAchievement(12);
                clearInterval(acI12);
                playAcIS();
            }
        }, 1000);
    }

    // |成就十四检查|键帝|达成条件：移动超过100000次|（13）|
    function acI13_check() {
        clearInterval(acI13);
        acI13 = setInterval(() => {
            // console.log('Checking Achievement 13...');
            if (step >= 100000) {
                completeAchievement(13);
                clearInterval(acI13);
                playAcIS();
            }
        }, 1000);
    }

    // |成就十五检查|键神|达成条件：移动超过1000000次|（14）|
    function acI14_check() {
        clearInterval(acI14);
        acI14 = setInterval(() => {
            // console.log('Checking Achievement 14...');
            if (step >= 1000000) {
                completeAchievement(14);
                clearInterval(acI14);
                playAcIS();
            }
        }, 1000);
    }

    // |成就十六检查|呜呜，终于赢了|达成条件：第一次合成2048|（15）|
    function acI15_check() {
        clearInterval(acI15);
        acI15 = setInterval(() => {
            // console.log('Checking Achievement 15...');
            if (win) {
                completeAchievement(15);
                clearInterval(acI15);
                playAcIS();
            }
        }, 1000);
    }

    // |成就十七检查|爱要大声说出来|达成条件：第一次使用意见反馈系统|（16）|
    function acI16_check() {
        clearInterval(acI16);
        acI16 = setInterval(() => {
            // console.log('Checking Achievement 16...');
            if (document.getElementById('submitBtn').classList.contains('active')) {
                completeAchievement(16);
                clearInterval(acI16);
                playAcIS();
            }
        }, 1000);
    }

    // |成就十八检查|耳膜破坏者|达成条件：把音效调到最大并进行一次合成|（17）|
    let preStep = step;
    function acI17_check() {
        clearInterval(acI17);
        acI17 = setInterval(() => {
            // console.log('Checking Achievement 17...');
            if (document.getElementById('act').value == 100 && preStep !== step) {
                completeAchievement(17);
                clearInterval(acI17);
                playAcIS();
            }
            preStep = step;
        }, 1000);
    }

    // |成就十九检查|盲生，你发现了华点|达成条件：首次点击LOGO|（18）|
    function acI18_check() {
        clearInterval(acI18);
        acI18 = setInterval(() => {
            // console.log('Checking Achievement 18...');
            if (document.getElementById('logo').classList.contains('active')) {
                completeAchievement(18);
                clearInterval(acI18);
                playAcIS();
            }
        }, 1000);
    }

    // |成就二十检查|虔诚|达成条件：你是来看呜呜伯的吗……(・∀・(・∀・(・∀・*)|（19）|
    function acI19_check() {
        clearInterval(acI19);
        let startTime = Date.now();
        acI19 = setInterval(() => {
            // console.log('Checking Achievement 19...');
            let currentTime = Date.now();
            if (document.getElementById('Pop-introduction').classList.contains('active')) {
                if (currentTime - startTime >= 120 * 1000) {
                    completeAchievement(19);
                    clearInterval(acI19);
                    playAcIS();
                }
            }
            else startTime = currentTime;
        }, 1000);
    }

    // |成就二十一检查|夜猫子|达成条件：在系统时间21:00后到05:00前开启夜间模式|（20）|
    function acI20_check() {
        clearInterval(acI20);
        acI20 = setInterval(() => {
            // console.log('Checking Achievement 20...');
            let currentTime = new Date().getHours();
            if (currentTime >= 21 || currentTime <= 5) {
                if (document.body.classList.contains("dark")) {
                    completeAchievement(20);
                    clearInterval(acI20);
                    playAcIS();
                }
            }
        }, 1000);
    }

    // |成就二十二检查|名人|达成条件：排行榜第一名|（21）|
    function acI21_check() {
        clearInterval(acI21);
        acI21 = setInterval(() => {
            // console.log('Checking Achievement 21...');
            if (highScore >= 36036) { // 创作者中玩过最高分的
                completeAchievement(21);
                clearInterval(acI21);
                playAcIS();
            }
        }, 1000);
    }

    // |成就二十三检查|听我说蟹蟹你|达成条件：在制作团队界面给所有人点满赞|（22）|
    function acI22_check() {
        clearInterval(acI22);
        acI22 = setInterval(() => {
            // console.log('Checking Achievement 22...');
            if (document.getElementById('like1').classList.contains('active') &&
                document.getElementById('like2').classList.contains('active') &&
                document.getElementById('like3').classList.contains('active') &&
                document.getElementById('like4').classList.contains('active') &&
                document.getElementById('like5').classList.contains('active')) {
                completeAchievement(22);
                clearInterval(acI22);
                playAcIS();
            }
        }, 1000);
    }

    // |成就二十四检查|建议见意见议建|达成条件：反馈超过十条建议|（23）|
    function acI23_check() {
        clearInterval(acI23);
        acI23 = setInterval(() => {
            // console.log('Checking Achievement 23...');
            if (document.getElementById('submitBtn').classList.contains('active')) {
                document.getElementById('submitBtn').classList.remove('active');
                addSugCnt();
                if (sugCnt >= 10) {
                    completeAchievement(23);
                    clearInterval(acI23);
                    playAcIS();
                }
            }
        }, 1000);
    }

    // |成就二十五检查|闪电侠|达成条件：两秒钟之内操作(wasd)移动超过15次|（24）|
    function acI24_check() {
        clearInterval(acI24);
        let startTime = Date.now();
        acI24 = setInterval(() => {
            // console.log('Checking Achievement 24...');
            let currentTime = Date.now();
            if (currentTime - startTime <= 2 * 1000) {
                if (wasdCnt >= 15) {
                    completeAchievement(24);
                    clearInterval(acI24);
                    playAcIS();
                }
            }
            else { wasdCnt = 0, startTime = currentTime; }
        }, 1000);
    }

    // |成就二十六检查|熊孩子|达成条件：两秒钟之内切换模式10次|（25）|
    function acI25_check() {
        clearInterval(acI25);
        let startTime = Date.now();
        acI25 = setInterval(() => {
            // console.log('Checking Achievement 25...');
            let currentTime = Date.now();
            if (currentTime - startTime <= 2 * 1000) {
                if (modeCnt >= 10) {
                    completeAchievement(25);
                    clearInterval(acI25);
                    playAcIS();
                }
            }
            else { modeCnt = 0, startTime = currentTime; }
        }, 1000);
    }
    document.body.querySelector('.toggle-switch').addEventListener('click', () => {
        modeCnt++;
    });

    // |成就二十七检查|思考者|达成条件：点击开始游戏后五分钟内无任何操作|（26）|
    function acI26_check() {
        clearInterval(acI26);
        let startTime = Date.now();
        acI26 = setInterval(() => {
            // console.log('Checking Achievement 26...');
            let currentTime = Date.now();
            if (dir !== null || !gameStarted) startTime = currentTime;
            if (currentTime - startTime >= 5 * 60 * 1000) {
                completeAchievement(26);
                clearInterval(acI26);
                playAcIS();
            }
            dir = null; // 每隔1秒种把方向清空1次
        }, 1000);
    }

    // |成就二十八检查|无他，为手熟尔|达成条件：在点击开始游戏后八分钟内通关游戏|（27）|
    function acI27_check() {
        clearInterval(acI27);
        let startTime = Date.now();
        acI27 = setInterval(() => {
            // console.log('Checking Achievement 27...');
            let currentTime = Date.now();
            startGameButton.addEventListener("click", () => { startTime = currentTime }); // 点击开始游戏后重置开始时间
            if (win && currentTime - startTime <= 8 * 60 * 1000) {
                completeAchievement(27);
                clearInterval(acI27);
                playAcIS();
            }
        }, 1000);
    }

    // |成就二十九检查|呜呜伯的沉浸式游戏日|达成条件：在系统时间23:00后到05:00期间，在夜间模式下，音量、音效都为10的情况下点击开始游戏|（28）|
    function acI28_check() {
        clearInterval(acI28);
        acI28 = setInterval(() => {
            // console.log('Checking Achievement 28...');
            let currentTime = new Date().getHours();
            if (currentTime >= 23 || currentTime <= 5) {
                if (document.body.classList.contains("dark") &&
                    document.getElementById('act').value == 10 && document.getElementById('bgm').value == 10) {
                    completeAchievement(28);
                    clearInterval(acI28);
                    playAcIS();
                }
            }
        }, 1000);
    }
});