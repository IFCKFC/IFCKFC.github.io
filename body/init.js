document.addEventListener('DOMContentLoaded', function() {
    // 创建游戏图标及玩法详情跳转
    const a = document.createElement('a');
    a.href = "tutorial.html";
    a.title = "玩法详情";
    const img = document.createElement('img');
    img.src = "image/logo.jpg";
    img.style = "width:80px; position:relative; top:10px;";
    img.alt = "2048";
    a.appendChild(img);
    document.body.appendChild(a);
    document.body.insertAdjacentHTML('beforeend', '<br><h4>点logo可进入玩法详情哦o(*￣▽￣*)ブ</h4>');

    // 创建排行榜显示
    const rankingContainer = document.createElement('div');
    rankingContainer.id = "rankingContainer";
    rankingContainer.style = "position: absolute; left: 20px; top: 100px;";
    rankingContainer.innerHTML = `
        <h4>排行榜</h4>
        <ul id="ranking"></ul>
    `;
    document.body.appendChild(rankingContainer);
    // 在排行榜后添加重置排行榜的按钮
    const resetRankingButton = document.createElement('button');
    resetRankingButton.id = "resetRankingButton";
    resetRankingButton.textContent = "重置";
    // 设置按钮固定在排行榜左边
    resetRankingButton.style = "position: absolute; left: 10px; top: 123px; background-color: antiquewhite; border: 1px solid black; border-radius: 5px; padding: 5px 10";
    document.body.appendChild(resetRankingButton);

    // 创建分数和最高分数的显示
    const scoreContainer = document.createElement('div');
    scoreContainer.className = "score-container";
    scoreContainer.style = "text-align:center; margin-bottom:20px;";
    scoreContainer.innerHTML = `
        <div id="score"><h5>分数 <br>0</h5></div>
        <div id="highScore"><h5>最高分数 <br>0</h5></div>
    `;
    document.body.appendChild(scoreContainer);

    // 创建游戏板1显示
    const gameContainer = document.createElement('div');
    gameContainer.className = "game-container";
    const gridContainer = document.createElement('div');
    gridContainer.className = "grid-container";
    for (let i = 0; i < 16; i++) {
        const gridCell = document.createElement('div');
        gridCell.className = "grid-cell";
        gridContainer.appendChild(gridCell);
    }
    gameContainer.appendChild(gridContainer);
    document.body.appendChild(gameContainer);

    // 创建游戏板2显示
    const gameContainer2 = document.createElement('div');
    gameContainer2.className = "game-container2";
    const gridContainer2 = document.createElement('div');
    gridContainer2.className = "grid-container2";
    for (let i = 0; i < 16; i++) {
        const gridCell2 = document.createElement('div');
        gridCell2.className = "grid-cell2";
        gridContainer2.appendChild(gridCell2);
    }
    gameContainer2.appendChild(gridContainer2);
    document.body.appendChild(gameContainer2);

    // 创建开始游戏按钮
    const gameButton = document.createElement('div');
    gameButton.className = "gameButton";
    gameButton.innerHTML = `<button id="startGameButton">开始游戏</button>`;
    document.body.appendChild(gameButton);
    document.getElementById('startGameButton').style.position = 'absolute';
    document.getElementById('startGameButton').style.top = '135px';
    document.getElementById('startGameButton').style.left = '648px'; 

    // 创建音乐和音效的显示及控制
    const bgm = document.createElement('audio');
    bgm.id = "bgm";
    bgm.src = "sound/bgm.mp3";
    bgm.preload = "true";
    bgm.loop = "true";
    bgm.volume = 0.025;
    document.body.appendChild(bgm);

    const act = document.createElement('audio');
    act.id = "act";
    act.src = "sound/act.mp3";
    act.preload = "true";
    act.volume = 0.025;
    document.body.appendChild(act);

    document.body.insertAdjacentHTML('beforeend', `
        <button id="volumeControlButton"><i class="fas fa-volume-up"></i></button>
        <label for="bgmVolumeControl" id="bgmVolumeControlLabel">音乐</label>
        <label for="actVolumeControl" id="actVolumeControlLabel">音效</label>
        <input type="range" id="bgmVolumeControl" min="0" max="1" step="0.001" value="0.025">
        <input type="range" id="actVolumeControl" min="0" max="1" step="0.001" value="0.025">
    `);
});
