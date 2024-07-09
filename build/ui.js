const sidebarContent = `
<div class="ui">  
    <nav class="shell close">  <!-- 侧边栏 -->
        <header>
            <div class="image-text">
                <span class="image">
                    <img src="image/logo.png" alt="">
                </span>
                <div class="image logo-text">
                    <span class="text name">2048</span>
                    <span class=" text teamname">--有点不太队--</span>
                </div>
            </div>
            <i class="iconfont icon-ArrowRight toggle"></i>
        </header>
        <div class="menu-bar">
            <div class="menu">
                <ul class="menu-links">
                    <li class="nav-link">
                        <a href="#">
                            <i class="iconfont icon-TargetArrow icon"></i>
                            <span class="text nac-text">玩法介绍</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#">
                            <i class="iconfont icon-ClassSquare icon"></i>
                            <span class="text nac-text">难度设置</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#">
                            <i class="iconfont icon-Bell icon"></i>
                            <span class="text nac-text">音量控制</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#">
                            <i class="iconfont icon-BarChart icon"></i>
                            <span class="text nac-text">排行榜</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#">
                            <i class="iconfont icon-NotebookPencil icon"></i>
                            <span class="text nac-text">意见建议</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#">
                            <i class="iconfont icon-UserMore icon"></i>
                            <span class="text nac-text">制作团队</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#">
                            <i class="iconfont icon-ClickHand icon"></i>
                            <span class="text nac-text">模式选择</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="bottom-content">
                <li class="mode">
                    <div class="sun-moon">
                        <i class="iconfont icon-View icon sun"></i>
                        <i class="iconfont icon-Hide icon moon"></i>
                    </div>
                    <span class="mode-text text">夜间模式</span>
                    <div class="toggle-switch">
                        <span class="switch"></span>
                    </div>
                </li>
            </div>
        </div>
    </nav>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML += sidebarContent;
    initUI();
});

function initUI() {
    const body = document.querySelector('body'),
        shell = body.querySelector('nav'),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text"),
        toggle = body.querySelector('.toggle');

    toggle.addEventListener("click", () => {
        shell.classList.toggle("close");
    });

    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
        if (body.classList.contains("dark")) {
            modeText.innerText = "白日模式";
        } else {
            modeText.innerText = "夜间模式";
        }
    });

    const watermarkDiv = document.createElement('div');
    watermarkDiv.style.color = 'gray';
    watermarkDiv.style.position = 'fixed';
    watermarkDiv.style.bottom = '0';
    watermarkDiv.style.right = '0';
    watermarkDiv.style.margin = '10px';
    watermarkDiv.textContent = '创作by有点不太队';
    document.body.appendChild(watermarkDiv);
}