document.addEventListener("DOMContentLoaded", function () {

    startGameButton.addEventListener("click", () => {
        setupBoard();
    });

    /* 初始化 */
    let gameStarted = false,
        win = false; // 游戏是否开始和是否赢了
    let score = 0,
        highScore = 0; // 初始化分数和最高分数

    let squares = Array.from(document.querySelectorAll(".grid-cell")); // 获取所有的格子
    let board = new Array(16).fill(0); // 初始化游戏板

    // 初始化游戏板并添加两个随机数字
    function setupBoard() {
        win = false;
        // 游戏正式开始
        gameStarted = true;
        document.getElementById("startGameButton").style.display = "none";
        // 重置分数
        score = 0;
        updateScore();
        // 重置游戏板
        board = new Array(16).fill(0);

        // 添加两个随机数字并开始游戏
        addNumber();
        addNumber();
        updateBoard();
    }

    // 在随机空位置添加一个新的数字
    function addNumber() {
        // 获取所有的空格
        let empty = board.reduce(
            (acc, curr, index) => (curr === 0 ? acc.concat(index) : acc),
            []
        );
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
                else if (board[i] === 1024)
                    squares[i].style.backgroundColor = "#edc53f";
                else if (board[i] === 2048)
                    squares[i].style.backgroundColor = "#edc22e";
                else if (board[i] === 4096)
                    squares[i].style.backgroundColor = "#3c3a32";
                else if (board[i] === 8192)
                    squares[i].style.backgroundColor = "#3c3a32";
                else if (board[i] === 16384)
                    squares[i].style.backgroundColor = "#3c3a32";
                else if (board[i] === 32768)
                    squares[i].style.backgroundColor = "#3c3a32";
                else if (board[i] === 65536)
                    squares[i].style.backgroundColor = "#3c3a32";
                else squares[i].style.backgroundColor = "#cdc1b4";
                // 调整字体大小
                adjustFontSize(squares[i]);
            } else {
                squares[i].innerHTML = "";
                squares[i].style.backgroundColor = "#cdc1b4";
            }
        }
    }

    // 调整字体大小以适应格子大小
    function adjustFontSize(square) {
        let size = square.offsetWidth; // 获取格子的宽度
        let fontSize = size / 2; // 字体大小为格子宽度的一半
        square.style.fontSize = `${fontSize}px`; // 设置字体大小
    }

    // 移动和合并逻辑
    function move(direction) {
        // 根据方向合并和移动数字
        let boardBeforeMove = [...board]; // 保存移动前的板状态

        if (direction === "down") {
            //下移
            for (let i = 0; i < 4; i++) {
                //  移动数字以确保没有空格
                let col = [board[i], board[i + 4], board[i + 8], board[i + 12]]; // 获取列
                let filteredCol = col.filter((num) => num); // 移除所有的0
                let missing = 4 - filteredCol.length; // 计算缺少的0的数量
                let zeros = Array(missing).fill(0); // 创建一个包含缺少0的数组
                let newCol = zeros.concat(filteredCol); // 将非0数字移动到列的底部

                // 合并操作
                for (let j = 3; j > 0; j--) {
                    if (newCol[j] === newCol[j - 1]) {
                        // 如果两个数字相同
                        newCol[j] = newCol[j] * 2; // 合并
                        score += newCol[j]; // 增加分数
                        newCol[j - 1] = 0; // 另一个数字设置为0
                    }
                }

                // 再次移动数字以确保没有空格
                let finalCol = newCol.filter((num) => num);
                missing = 4 - finalCol.length;
                zeros = Array(missing).fill(0);
                newCol = zeros.concat(finalCol);

                // 更新游戏板上的数字
                board[i] = newCol[0];
                board[i + 4] = newCol[1];
                board[i + 8] = newCol[2];
                board[i + 12] = newCol[3];
            }
        }
        //  其他方向
        else if (direction === "up") {
            for (let i = 0; i < 4; i++) {
                let col = [board[i], board[i + 4], board[i + 8], board[i + 12]];
                let filteredCol = col.filter((num) => num);
                let missing = 4 - filteredCol.length;
                let zeros = Array(missing).fill(0);
                let newCol = filteredCol.concat(zeros);

                for (let j = 0; j < 3; j++) {
                    if (newCol[j] === newCol[j + 1]) {
                        newCol[j] = newCol[j] * 2;
                        score += newCol[j];
                        newCol[j + 1] = 0;
                    }
                }

                let finalCol = newCol.filter((num) => num);
                missing = 4 - finalCol.length;
                zeros = Array(missing).fill(0);
                newCol = finalCol.concat(zeros);

                board[i] = newCol[0];
                board[i + 4] = newCol[1];
                board[i + 8] = newCol[2];
                board[i + 12] = newCol[3];
            }
        } else if (direction === "left") {
            for (let i = 0; i < 4; i++) {
                let row = [
                    board[i * 4],
                    board[i * 4 + 1],
                    board[i * 4 + 2],
                    board[i * 4 + 3],
                ];
                let filteredRow = row.filter((num) => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                for (let j = 0; j < 3; j++) {
                    if (newRow[j] === newRow[j + 1]) {
                        newRow[j] = newRow[j] * 2;
                        score += newRow[j];
                        newRow[j + 1] = 0;
                    }
                }

                // 再次移动数字以确保没有空格
                let finalRow = newRow.filter((num) => num);
                missing = 4 - finalRow.length;
                zeros = Array(missing).fill(0);
                newRow = finalRow.concat(zeros);

                // 更新板上的数字
                board[i * 4] = newRow[0];
                board[i * 4 + 1] = newRow[1];
                board[i * 4 + 2] = newRow[2];
                board[i * 4 + 3] = newRow[3];
            }
        } else if (direction === "right") {
            for (let i = 0; i < 4; i++) {
                let row = [
                    board[i * 4],
                    board[i * 4 + 1],
                    board[i * 4 + 2],
                    board[i * 4 + 3],
                ];
                let filteredRow = row.filter((num) => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                for (let j = 3; j > 0; j--) {
                    if (newRow[j] === newRow[j - 1]) {
                        newRow[j] = newRow[j] * 2;
                        score += newRow[j];
                        newRow[j - 1] = 0;
                    }
                }

                let finalRow = newRow.filter((num) => num);
                missing = 4 - finalRow.length;
                zeros = Array(missing).fill(0);
                newRow = zeros.concat(finalRow);

                board[i * 4] = newRow[0];
                board[i * 4 + 1] = newRow[1];
                board[i * 4 + 2] = newRow[2];
                board[i * 4 + 3] = newRow[3];
            }
        }

        if (boardBeforeMove.join("") !== board.join("")) {
            addNumber();
        }
        updateBoard();
        updateScore();

        checkWin(); // 检查是否出现2048
        checkLose(); // 检查游戏结束的情况
    }

    //检查2048是否已经出现
    function checkWin() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === 2048) {
                if (!win) {
                    // 先显示画面，再弹出提示框
                    setTimeout(function () {
                        alert("恭喜你！你赢了！继续玩或者重开，任君选择吧。(￣▽￣)ノ");
                    }, 5);
                    win = true;
                    document.getElementById("startGameButton").style.display = "";
                }
            }
        }
    }

    //检查游戏是否结束
    function checkLose() {
        if (isGameOver(board)) {
            // 先显示画面，再弹出提示框
            setTimeout(function () {
                alert("输赢什么的无所谓！再开一局吧！o(*≧▽≦)ツ┏━┓");
            }, 5);
            document.getElementById("startGameButton").style.display = "";
            gameStarted = false;
        }
    }

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
        if (!gameStarted) {
            return;
        }

        setTimeout(function () {
            playSound();
        }, 0);

        // 根据按键移动
        if (e.key === "ArrowLeft" || e.key === "a") {
            move("left");
        } else if (e.key === "ArrowRight" || e.key === "d") {
            move("right");
        } else if (e.key === "ArrowUp" || e.key === "w") {
            move("up");
        } else if (e.key === "ArrowDown" || e.key === "s") {
            move("down");
        }
    });

    // 在需要触发音效的函数中添加
    function playSound() {
        var sound = document.getElementById("act");
        sound.currentTime = 0; // 将音频回到开始
        sound.play(); // 播放音效
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
