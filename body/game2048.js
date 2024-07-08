document.addEventListener("DOMContentLoaded", function () {

    displayRanking(); // 首次显示排行榜
    startGameButton.addEventListener("click", () => {
        setupBoard();
    });
    

    /* 初始化 */
    let direction = null,       // 移动方向
        gameStarted = false,    // 游戏是否开始
        win = false;            // 游戏是否开始和是否赢了
        isAnimating = false;    // 动画是否进行中
    let score = 0,              // 分数
        highScore = 0;          // 最高分数

    let squares = Array.from(document.querySelectorAll(".grid-cell")); // 获取所有的格子
    let board = new Array(16).fill(0);                                 // 初始化游戏板

    // 初始化游戏板并添加两个随机数字
    function setupBoard() {
        if (win) {
            win = false;
            // 更新排行榜
            updateLastScore();
            displayRanking();
        }
        // 游戏正式开始
        gameStarted = true;
        document.getElementById("startGameButton").style.display = "none";
        // 重置分数
        score = 0;
        updateScore();
        // 重置游戏板
        board = new Array(16).fill(0);

        // 添加两个随机数字并开始游戏
        //checking: (please change after debugging)
        addNumber();
        addNumber();
        
        // debugging only
        /*board[3] = 1024;
        //board[2] = 65536;
        //board[1] = 512;
        
        board[4] = 2;
        board[5] = 2;
        board[6] = 2;
        board[7] = 2;

        board[9] = 4;
        board[10] = 4;

        board[13] = 8;
        board[15] = 8;*/

        updateBoard();
        lpA();
    }

    // 在随机空位置添加一个新的数字
    function addNumber() {
        // 获取所有的空格
        let empty = board.reduce((acc, curr, index) => (curr === 0 ? acc.concat(index) : acc), []);
        // 如果有空格，随机选择一个空格添加数字
        if (empty.length > 0) {
            // 随机选择一个空格
            let randomIndex = empty[Math.floor(Math.random() * empty.length)];
            // 90%的概率是2，10%的概率是4
            board[randomIndex] = Math.random() > 0.1 ? 2 : 4;
        }
    }

    // 更新游戏板显示
    function updateBoard() {
        // 更新每个格子的数字和颜色
        for (let i = 0; i < squares.length; i++) {
            if (board[i] > 0) {
                // 更新数字
                squares[i].innerHTML = board[i];
                // 更换不同颜色
                if (board[i] === 2) squares[i].style.backgroundColor = "#eee4da";
                else if (board[i] === 4) squares[i].style.backgroundColor = "#ede0c8";
                else if (board[i] === 8) squares[i].style.backgroundColor = "#f2b179";
                else if (board[i] === 16) squares[i].style.backgroundColor = "#f59563";
                else if (board[i] === 32) squares[i].style.backgroundColor = "#f67c5f";
                else if (board[i] === 64) squares[i].style.backgroundColor = "#f65e3b";
                else if (board[i] === 128) squares[i].style.backgroundColor = "#edcf72";
                else if (board[i] === 256) squares[i].style.backgroundColor = "#edcc61";
                else if (board[i] === 512) squares[i].style.backgroundColor = "#edc850";
                else if (board[i] === 1024) squares[i].style.backgroundColor = "#edc53f";
                else if (board[i] === 2048) squares[i].style.backgroundColor = "#edc22e";
                else if (board[i] === 4096) squares[i].style.backgroundColor = "#3c3a32";
                else if (board[i] === 8192) squares[i].style.backgroundColor = "#3c3a32";
                else if (board[i] === 16384) squares[i].style.backgroundColor = "#3c3a32";
                else if (board[i] === 32768) squares[i].style.backgroundColor = "#3c3a32";
                else if (board[i] === 65536) squares[i].style.backgroundColor = "#3c3a32";
                else squares[i].style.backgroundColor = "#cdc1b4";
                // 调整字体大小
                adjustFontSize(squares[i]);
            } else {
                squares[i].innerHTML = "";
                squares[i].style.backgroundColor = "#cdc1b4";
            }
        }
    }

    // 使用（Q弹）
    function lpA() {
        for (let i = 0; i < squares.length; i++) {
            if (board[i] > 0) animateAppearance(squares[i]);
        }
    }

    // 添加动画显示（Q弹）
    function animateAppearance(square) {
        anime({
            targets: square,
            scale: [0.75, 1], // 从0.75缩放到1
            duration: 125,    // 动画持续时间
            easing: 'easeInOutQuad', // 添加缓动效果
            transformOrigin: 'center' // 确保缩放中心在元素的中心
        }).finished;
    }

    // 调整字体大小以适应格子大小
    function adjustFontSize(square) {
        let size = square.offsetWidth * 0.9;     // 获取格子的宽度
        let fontSize = size / 2;                 // 字体大小为格子宽度的一半
        square.style.fontSize = `${fontSize}px`; // 设置字体大小
        square.style.lineHeight = `${size}px`;   // 行高设置为格子高度
        
        // 5位数需要更小一点
        if (square.innerHTML.length > 4) square.style.fontSize = `${fontSize * 0.75}px`;
        //粗体
        square.style.fontWeight = "bold";
    }

    // 根据方向处理移动和合并逻辑
    function move(direction) {
        // 保存移动前的板状态
        let boardBeforeMove = [...board];
        let move1 = [], move2 = [], merge = [];

        switch (direction) {
            case "up":
                for (let i = 0; i <= 3; i++) {
                    let row = [board[i], board[i + 4], board[i + 8], board[i + 12]];
                    let newRow = moveAndMergeRow(row, i, move1, move2, merge);
                    for (let j = 0; j < 4; j++) board[i + j * 4] = newRow[j];
                }
                break;
            case "down":
                for (let i = 12; i <= 15; i++) {
                    let row = [board[i], board[i - 4], board[i - 8], board[i - 12]];
                    let newRow = moveAndMergeRow(row, i, move1, move2, merge);
                    for (let j = 0; j < 4; j++) board[i - j * 4] = newRow[j];
                }
                break;
            case "left":
                for (let i = 0; i <= 15; i += 4) {
                    let row = [board[i], board[i + 1], board[i + 2], board[i + 3]];
                    let newRow = moveAndMergeRow(row, i, move1, move2, merge);
                    for (let j = 0; j < 4; j++) board[i + j] = newRow[j];
                    
                }
                break;
            case "right":
                for (let i = 15; i >= 0; i -= 4) {
                    let row = [board[i], board[i - 1], board[i - 2], board[i - 3]];
                    let newRow = moveAndMergeRow(row, i, move1, move2, merge);
                    for (let j = 0; j < 4; j++) board[i - j] = newRow[j];
                }
                break;
        }

        let animate1 = [], animate2 = [], animate3 = [];
        pointerMerge(animate1, animate2, move1, move2, merge);

        
        // debugging only
        /*console.log(boardBeforeMove);
        console.log(board);

        // debugging only (for animation)
        console.log(move1);
        console.log(merge);
        console.log(move2);
        
        console.log(animate1);
        console.log(animate2);*/
        
        // 优先处理动画组
        isAnimating = true; // 持保留意见 
        for (let i = 0; i < animate1.length; i++) animateMovePromise(animate1[i].from, animate1[i].dis, animate1[i].val);
        for (let i = 0; i < animate2.length; i++) animateMovePromise(animate2[i].from, animate2[i].dis, animate2[i].val);
        
        // 剩余动画组
        for (let i = 0; i < move1.length; i++) animateMove(move1[i].from, move1[i].dis, move1[i].val);
        for (let i = 0; i < merge.length; i++) animateMove(merge[i].from, merge[i].dis, merge[i].val);
        for (let i = 0; i < move2.length; i++) animateMove(move2[i].from, move2[i].dis, move2[i].val);
        
        // 循环逻辑
        setTimeout(function () {
            updateBoard();
            updateScore();
            checkWin();
            checkLose();
            isAnimating = false;
            setTimeout(function () {
                if (boardBeforeMove.join("") !== board.join("")) addNumber();
                updateBoard();
                lpA();
            }, 25);
        }, 225);
    }

    // 优先处理动画功能模组
    function animateMovePromise(from, dis, val) {
        return new Promise(resolve => {
            setTimeout(() => {
                animateMove(from, dis, val);
                resolve();   
            }, 50);
        });
    }

    // 建立坐标可合并的动画（注意先别删点，可能影响运算）
    function pointerMerge(animate1, animate2, move1, move2, merge) {
        // 移并一体化
        for (let i = 0; i < move1.length; i++) 
            for (let j = 0; j < merge.length; j++) 
                if (move1[i].to === merge[j].from) 
                    animate1.push({from: move1[i].from, to: merge[j].to, dis: merge[j].to - move1[i].from, val: move1[i].val});
        // 并移一体化
        for (let i = 0; i < merge.length; i++) 
            for (let j = 0; j < move2.length; j++) 
                if (merge[i].to === move2[j].from) 
                    animate2.push({from: merge[i].from, to: move2[j].to, dis: move2[j].to - merge[i].from, val: merge[i].val});
    }

    // 移动和合并（移动，合并，再次移动）且记录其移动坐标、距离、值
    function moveAndMergeRow(row, startIndex, move1, move2, merge) {
        // 如果整行都是0，直接返回
        if (row.every(val => val === 0)) return row;
        
        // 将每个元素转换为包含值和原始位置的对象
        let oldRow = [];
        if (direction === "up") oldRow = row.map((val, index) => ({ val, pos: startIndex + index * 4 }));
        else if (direction === "down") oldRow = row.map((val, index) => ({ val, pos: startIndex - index * 4 }));
        else if (direction === "left") oldRow = row.map((val, index) => ({ val, pos: startIndex + index }));
        else if (direction === "right") oldRow = row.map((val, index) => ({ val, pos: startIndex - index }));
        // 去0，保留位置信息
        let newRow = oldRow.filter(item => item.val !== 0);
        // 记录首次移动的坐标、距离、值
        for (let i = 0; i < newRow.length; i++) 
            if (newRow[i].pos !== oldRow[i].pos) 
                move1.push({from: newRow[i].pos, to: oldRow[i].pos, dis: oldRow[i].pos - newRow[i].pos, val: newRow[i].val});
        // 更新位置信息
        for (let i = 0; i < newRow.length; i++) 
            newRow[i] = {val: newRow[i].val, pos: oldRow[i].pos};
        
        // 复制一份，用于比较
        let recNewRow = [...newRow];

        // 合并相同元素，坐标记录，更新位置信息
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i].val === newRow[i + 1].val) {
                merge.push({from: newRow[i + 1].pos, to: newRow[i].pos, dis: newRow[i].pos - newRow[i + 1].pos, val: newRow[i + 1].val});
                newRow[i] = {val: newRow[i].val * 2, pos: newRow[i].pos};
                newRow[i + 1] = {val: 0, pos: newRow[i].pos};
            }
        }

        // 再次移动，第二次坐标移动记录
        newRow = newRow.filter(item => item.val !== 0);
        for (let i = 0; i < newRow.length; i++) {
            if (newRow[i].pos !== recNewRow[i].pos) {
                move2.push({from: newRow[i].pos, to: recNewRow[i].pos, dis: recNewRow[i].pos - newRow[i].pos, val: newRow[i].val});
            }
        }

        // 补零，位置信息在这一步不再重要
        while (newRow.length < 4) {
            newRow.push({ val: 0, pos: null });
        }

        // 仅返回值
        return newRow.map(item => item.val);
    }

    // 动画移动
    function animateMove(from, dis, val) {
        // 获取需要建立动画的移动格
        const fromSquare = squares[from];
        // 更换颜色
        if (val === 2) squares[from].style.backgroundColor = "#eee4da";
                else if (val === 4) squares[from].style.backgroundColor = "#ede0c8";
                else if (val === 8) squares[from].style.backgroundColor = "#f2b179";
                else if (val === 16) squares[from].style.backgroundColor = "#f59563";
                else if (val === 32) squares[from].style.backgroundColor = "#f67c5f";
                else if (val === 64) squares[from].style.backgroundColor = "#f65e3b";
                else if (val === 128) squares[from].style.backgroundColor = "#edcf72";
                else if (val === 256) squares[from].style.backgroundColor = "#edcc61";
                else if (val === 512) squares[from].style.backgroundColor = "#edc850";
                else if (val === 1024) squares[from].style.backgroundColor = "#edc53f";
                else if (val === 2048) squares[from].style.backgroundColor = "#edc22e";
                else if (val === 4096) squares[from].style.backgroundColor = "#3c3a32";
                else if (val === 8192) squares[from].style.backgroundColor = "#3c3a32";
                else if (val === 16384) squares[from].style.backgroundColor = "#3c3a32";
                else if (val === 32768) squares[from].style.backgroundColor = "#3c3a32";
                else if (val === 65536) squares[from].style.backgroundColor = "#3c3a32";
                else squares[from].style.backgroundColor = "#cdc1b4";

        // 设置移动距离
        let setting = dis * 130;
        // 动画移动方向
        switch (direction) {
            case "up":
                setting /= 4;
                fromSquare.style.setProperty('--translate-value', `${setting}px`);
                fromSquare.style.animation = `moveUp 0.25s forwards`;
                break;
            case "down":
                setting /= 4;
                fromSquare.style.setProperty('--translate-value', `${setting}px`);
                fromSquare.style.animation = `moveDown 0.25s forwards`;
                break;
            case "left":
                fromSquare.style.setProperty('--translate-value', `${setting}px`);
                fromSquare.style.animation = `moveLeft 0.25s forwards`;
                break;
            case "right":
                fromSquare.style.setProperty('--translate-value', `${setting}px`);
                fromSquare.style.animation = `moveRight 0.25s forwards`;
                break;
        }

        // 在动画开始前提升 z-index
        fromSquare.style.zIndex = 1000;

        // 动画结束后重置动画
        fromSquare.addEventListener("animationend", () => {
            fromSquare.style.animation = '';
            fromSquare.style.zIndex = ''; // 重置 z-index 为默认值或者可以设置为特定值
        });
    }

    //检查2048是否已经出现
    function checkWin() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === 2048) {
                if (!win) {
                    win = true;
                    document.getElementById("startGameButton").style.display = "";
                    // 先显示画面，再弹出提示框
                    setTimeout(function () {
                        alert("恭喜你！你赢了！继续玩或者重开，任君选择吧。(￣▽￣)ノ");
                    }, 225);
                }
            }
        }
    }

    //检查游戏是否结束
    function checkLose() {
        if (isGameOver(board)) {
            // 游戏结束
            document.getElementById("startGameButton").style.display = "";
            gameStarted = false;
            // 更新排行榜
            updateLastScore();
            displayRanking();
            // 先显示画面，再弹出提示框
            setTimeout(function () {
                alert("输赢什么的无所谓！再开一局吧！o(*≧▽≦)ツ┏━┓");
            }, 225);
        }
    }
    
    // 更新最高分数
    function updateLastScore() {
        let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
        ranking.push(score);
        ranking.sort((a, b) => b - a);
        ranking = ranking.slice(0, 5);
        localStorage.setItem("ranking", JSON.stringify(ranking));
    }

    // 显示排行榜
    function displayRanking() {
        const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
        const rankingElement = document.getElementById("ranking");
        rankingElement.innerHTML = ' ';

        ranking.forEach((score, index) => {
            const rank = document.createElement("div");
            rank.className = "rank-item";
            rank.innerHTML = `<span style="color: rgb(30, 25, 16);">第${index + 1}名</span>: <strong>${score}</strong>`;
            rankingElement.appendChild(rank);
        });
    }

    // 重置排行榜
    function resetRanking() {
        localStorage.setItem("ranking", JSON.stringify([]));
        displayRanking();
    }
    document.getElementById("resetRankingButton").addEventListener("click", resetRanking);

    // 更新分数
    function updateScore() {
        // 检查是否更新最高分数
        if (score > highScore) {
            highScore = score;
            document.getElementById("highScore").innerHTML = "<h5>最高分数: <br>" + score + "</h5>";
        }
        document.getElementById("score").innerHTML = "<h5>分数 <br>" + score + "</h5>";
    }

    // 监听键盘事件来移动
    document.addEventListener("keyup", (e) => {
        // 检查游戏是否开始
        if (!gameStarted || isAnimating) return;
    
        setTimeout(function () {
            playSound();
        }, 0);

        direction = null; // 重置方向记录
        // 根据按键移动
        if (e.key === "ArrowUp" || e.key === "w") {
            direction = "up";
            move("up");
        } if (e.key === "ArrowDown" || e.key === "s") {
            direction = "down";
            move("down");
        } else if (e.key === "ArrowLeft" || e.key === "a") {
            direction = "left";
            move("left");
        } else if (e.key === "ArrowRight" || e.key === "d") {
            direction = "right";
            move("right");
        }
    });

    // 在需要触发音效的函数中添加
    function playSound() {
        var sound = document.getElementById("act");
        sound.currentTime = 0; // 将音频回到开始
        sound.play();          // 播放音效
    }

    // 检查游戏需要结束的情况
    function isGameOver(board) {
        // 检查是否有空格
        for (let i = 0; i < board.length; i++) {
            if (board[i] === 0) {
                // 还有空格，即可生成数字，游戏未结束
                return false;
            }
        }

        // 检查是否有相邻的相同数字可以合并
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let current = board[i * 4 + j];
                // 检查水平方向
                if (j < 3) {
                    let right = board[i * 4 + j + 1];
                    if (current === right) return false; // 可以合并，游戏未结束
                }
                // 检查垂直方向
                if (i < 3) {
                    let down = board[(i + 1) * 4 + j];
                    if (current === down) return false; // 可以合并，游戏未结束
                }
            }
        }

        // 没有空格且没有可合并的格子，游戏结束
        return true;
    }
});
