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

    // 创建分数和最高分数的显示
    const scoreContainer = document.createElement('div');
    scoreContainer.className = "score-container";
    scoreContainer.style = "text-align:center; margin-bottom:20px;";
    scoreContainer.innerHTML = `
        <div id="score"><h5>分数 <br>0</h5></div>
        <div id="highScore"><h5>最高分数 <br>0</h5></div>
    `;
    document.body.appendChild(scoreContainer);

    // 创建游戏板显示
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

    // 创建开始游戏按钮
    const gameButton = document.createElement('div');
    gameButton.className = "gameButton";
    gameButton.innerHTML = `<button id="startGameButton">开始游戏</button>`;
    document.body.appendChild(gameButton);

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