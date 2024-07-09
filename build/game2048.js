// Autor: 有点不太队 || 2048游戏
document.addEventListener("DOMContentLoaded", function () {

    // 首次显示排行榜
    // displayRanking();

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

    /* 初始化游戏 */
    function setupBoard() {
        if (win) {
            // 重置游戏状态
            win = false;
            // 更新排行榜（待做）
            // updateScore();
            // displayRanking();
        }

        // 游戏正式开始
        gameStarted = true;

        // 重置分数
        score = 0;
        // updateScore();

        // 重置游戏版
        board = new Array(16).fill(0);

        // 随机生成两个数字
        addNumber();
        addNumber();

        // 更新游戏版（Q弹特效）
        updateBoard();
        jump();
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
        }
    }

    // 更新游戏版
    function updateBoard() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] > 0) {
                // 更新数字
                grid[i].innerText = board[i];
                // 更新颜色
                grid[i].style.backgroundColor = getColor(board[i]);
                // 更新字体大小
                adjustFontSize(grid[i]);
            }
            else {
                // 清空数字
                grid[i].innerText = "";
                // 清空颜色
                grid[i].style.backgroundColor = "#cdc1b4";
            }
        }
    }

    // 原版
    function getColor1(num) {
        switch (num) {
            case 2: return "#eee4da"; // 浅橙色
            case 4: return "#ede0c8"; // 淡橙色
            case 8: return "#f2b179"; // 橙色
            case 16: return "#f59563"; // 深橙色
            case 32: return "#f67c5f"; // 红橙色
            case 64: return "#f65e3b"; // 深红橙色
            case 128: return "#edcf72"; // 黄色
            case 256: return "#edcc61"; // 深黄色
            case 512: return "#edc850"; // 更深黄色
            case 1024: return "#edc53f"; // 暗黄色
            case 2048: return "#edc22e"; // 最深黄色
        }
        return "#cdc1b4";
    }

    // 更新颜色
    function getColor(num) {
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
        return darken(colors[num] || defaultColor,  15);
    }

    // 更新字体大小
    function adjustFontSize(grid) {
        let size = grid.offsetWidth * 0.8,     // 获取格子宽度*调整比例
            fontSize = size / 2;               // 字体大小 = 格子宽度*调整比例/2
        grid.style.fontSize = fontSize + "px"; // 设置字体大小
        grid.style.lineHeight = size + "px";   // 设置行高

        // 5位数特调
        if (grid.innerHTML.length > 4) grid.style.fontSize = `${fontSize * 0.75}px`;

        // 字体的参数
        grid.style.color = "#281F1B";
        grid.style.fontWeight = "bold";
    }

    // Q弹动画及音效的使用
    function jump() {
        anime.remove(grid);
        for (let i = 0; i < grid.length; i++) grid[i].style.transform = "scale(1)";
        for (let i = 0; i < grid.length; i++) if (board[i]) jumpAnimate(grid[i]);
        // Q弹音效（同步播放）（待做）
        // playSound();
    }

    // Q弹动画
    function jumpAnimate(grid) {
        anime({
            targets: grid,            // 目标元素
            scale: [1, 1.35, 1],      // 缩放比例    
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
        console.log("move1", move1);
        console.log("merge", merge);
        console.log("move2", move2);
        console.log("animate1", animate1);
        console.log("animate2", animate2);
        console.log("animate3", animate3);

        animateDeploy();

        setTimeout(() => {
            isLose();
            isWin();
            setTimeout(() => {
                isAnimating = false;
            }, 50);
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
            }, 10);
        });
    }

    // 运行动画
    function animateRun(from, dis, val) {
        // 获取需要建立动画的移动格
        const fromGrid = grid[from];
        // 更换颜色
        fromGrid.style.backgroundColor = getColor(val);

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
                if (preBoard.join("") !== board.join("")) addNumber();
                updateBoard();
                // updateScore(); 待做
                // jump();
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
            // 游戏结束（显示开始按钮）
            gameStarted = false;
            // 更新排行榜（待做）
            // updateLastScore();
            // displayRanking();
            // 先显示画面，再弹出提示框
            setTimeout(() => {
                alert("输赢什么的无所谓！再开一局吧！o(*≧▽≦)ツ┏━┓");
            }, 300);
        }
    }

    // 赢了
    function isWin() {
        if (board.includes(2048) && !win) {
            // 游戏可以选择性结束（显示开始按钮）
            win = true;
            // 先显示画面，再弹出提示框
            isAnimating = true; // 卡操作
            setTimeout(function () {
                alert("恭喜你！你赢了！继续玩或者重开，任君选择吧。(￣▽￣)ノ");
            }, 300);
            isAnimating = false;
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



});