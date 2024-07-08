document.getElementById('fullscreenBtn').addEventListener('click', function() {
    if (!document.fullscreenElement) {
        // 请求进入全屏
        document.documentElement.requestFullscreen().catch((err) => {
            console.warn(`无法进入全屏模式: ${err.message}`);
        });
    } else {
        // 退出全屏
        document.exitFullscreen().catch((err) => {
            console.warn(`无法退出全屏模式: ${err.message}`);
        });
    }
});