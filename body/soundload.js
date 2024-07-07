document.addEventListener('DOMContentLoaded', function() {
    const bgm = document.getElementById("bgm");
    const startGameButton = document.getElementById("startGameButton");

    // 设置棋盘并播放背景音乐的逻辑
    startGameButton.addEventListener("click", () => {
        bgm.play().catch((error) => console.error("音乐播放失败:", error)); // 尝试播放背景音乐
    });

    const volumeControlButton = document.getElementById("volumeControlButton");
    const bgmVolumeControl = document.getElementById("bgmVolumeControl");
    const actVolumeControl = document.getElementById("actVolumeControl");

    volumeControlButton.addEventListener("click", () => {
        // 切换音量控制条的显示和隐藏
        bgmVolumeControlLabel.style.display =
            bgmVolumeControlLabel.style.display === "block" ? "none" : "block";
        actVolumeControlLabel.style.display =
            actVolumeControlLabel.style.display === "block" ? "none" : "block";
        bgmVolumeControl.style.display =
            bgmVolumeControl.style.display === "block" ? "none" : "block";
        actVolumeControl.style.display =
            actVolumeControl.style.display === "block" ? "none" : "block";
    });

    // 为背景音乐音量控制添加事件监听器
    bgmVolumeControl.addEventListener("input", () => {
        bgm.volume = bgmVolumeControl.value; // 更新背景音乐的音量
    });

    // 为动作音效音量控制添加事件监听器
    actVolumeControl.addEventListener("input", () => {
        act.volume = actVolumeControl.value; // 更新动作音效的音量
    });
});