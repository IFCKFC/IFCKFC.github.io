const sidebarContent = `
<!-- UI界面 -->
    <div class="containerAll">
        <!-- 分数板 -->
        <div class="scores-container">
            <div class="score-container">
                <span id="score" class="scores">0</span>
            </div>
            <div class="best-container">
                <span id="best" class="scores">0</span>
            </div>
        </div>

        <!-- 开始游戏按钮 -->
        <button id="startGameButton">开始游戏</button>

        <!-- 游戏容器，包含所有游戏格子 -->
        <div class="game-container">
            <!-- 第一行游戏格子 -->
            <div class="grid"></div>
            <div class="grid"></div>
            <div class="grid"></div>
            <div class="grid"></div>
            <!-- 第二行游戏格子 -->
            <div class="grid"></div>
            <div class="grid"></div>
            <div class="grid"></div>
            <div class="grid"></div>
            <!-- 第三行游戏格子 -->
            <div class="grid"></div>
            <div class="grid"></div>
            <div class="grid"></div>
            <div class="grid"></div>
            <!-- 第四行游戏格子 -->
            <div class="grid"></div>
            <div class="grid"></div>
            <div class="grid"></div>
            <div class="grid"></div>
        </div>

        <!-- 游戏背景，包含所有游戏格子 -->
        <div class="game-container-bg">
            <!-- 第一行游戏格子 -->
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <!-- 第二行游戏格子 -->
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <!-- 第三行游戏格子 -->
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <!-- 第四行游戏格子 -->
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
            <div class="grid-bg"></div>
        </div>

        <!-- 水印 -->
        <div id="tips">按Alt+T重置面板(最佳分数、排行榜)</div>

    </div>
    <nav class="shell close"> <!-- 侧边栏 -->
        <header>
            <div class="image-text">
                <span class="image">
                    <a href="index.html">
                        <img src="image/logo.png" alt="2048">
                    </a>
                </span>
                <div class="image logo-text">
                    <span class="text name">2048</span>
                    <span class=" text teamname">---有点不太队---</span>
                </div>
            </div>
            <i class="iconfont icon-ArrowRight toggle"></i>
        </header>
        <div class="menu-bar">
            <div class="menu">
                <ul class="menu-links">
                    <li class="nav-link">
                        <a href="#" id="introduction" class="shellBtn">
                            <i class="iconfont icon-TargetArrow icon"></i>
                            <span class="text nac-text">玩法介绍</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#" id="difficulty" class="shellBtn">
                            <i class="iconfont icon-ClassSquare icon"></i>
                            <span class="text nac-text">难度设置</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#" id="volume" class="shellBtn">
                            <i class="iconfont icon-Bell icon"></i>
                            <span class="text nac-text">音量控制</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#" id="skin" class="shellBtn">
                            <i class="iconfont icon-SettingSemicircle icon"></i>
                            <span class="text nac-text">主题切换</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#" id="modeChoice" class="shellBtn">
                            <i class="iconfont icon-ClickHand icon"></i>
                            <span class="text nac-text">模式选择</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#" id="advice" class="shellBtn">
                            <i class="iconfont icon-NotebookPencil icon"></i>
                            <span class="text nac-text">意见建议</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#" id="productionTeam" class="shellBtn">
                            <i class="iconfont icon-UserMore icon"></i>
                            <span class="text nac-text">制作团队</span>
                        </a>
                    </li>
                    <li class="nav-link">
                        <a href="#"  id="achievement" class="shellBtn">
                            <i class="iconfont icon-Star icon"></i>
                            <span class="text nac-text">成就</span>
                        </a>
                    </li>
                </ul>

                <!-- 难度设置弹出层 -->
                <div id="Pop-difficulty" class="popup-difficulty">
                    
                </div>

                <!-- 音量控制弹出层 -->
                <div id="Pop-volume" class="popup-volume">
                    <div id="Bgm-container" class="volumeContainer">
                        <div class="sliderValue">
                            <span id="sliderValueTextBgm" class="sliderValueText">10</span>
                        </div>
                        <div class="field">
                            <div class="value left">0</div>
                            <input type="range" id="bgm" class="volumeControl" value="10"></input>
                            <div class="value right">100</div>
                        </div>
                    </div>
                    <div id="nameBgm">音乐</div>
                    <div id="Act-container" class="volumeContainer">
                        <div class="sliderValue">
                            <span id="sliderValueTextAct" class="sliderValueText">10</span>
                        </div>
                        <div class="field">
                            <div class="value left">0</div>
                            <audio id="pop" src="audio/pop.mp3" preload="auto"></audio>
                            <input type="range" id="act" class="volumeControl" value="10"></input>
                            <div class="value right">100</div>
                        </div>
                    </div>  
                    <div id="nameAct">音效</div>
                </div>

                <!-- 主题切换弹出层 -->
                <div id="Pop-skin" class="popup-skin"> </div>

                <!-- 模式选择弹出层 -->
                <div id="Pop-modeChoice" class="popup-modeChoice">
                    <button id="toggleSwipeMode" class="fixed-top-right">启动滑动模式</button>
                </div>

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

    <!-- 玩法介绍弹出层 -->
    <div id="Pop-introduction" class="popup-introduction">
        <div id="Pop-introductionHeader">
            <i class="iconfont icon-TargetArrow icon" id="iconIntroduction"></i>
            <span id="textIntroduction">玩法介绍</span>
            <button id="closeBtnIntroduction" class="closePopup">
                <i class="iconfont icon-Close icon"></i>
            </button>
        </div>
        <div class="introduction-container">
            <a id="introductionNav" class="introductionNav">
                <i class="iconfont icon-ListDotLine icon" id="iconIntroductionNav"></i>
                <span id="introductionNavName">传送门</span>
            </a>
            <div id="introductionNav-container" class="introductionNav-container">
                <ul>
                    <li>
                        <h4><a href="#target" style="text-decoration: none; color: #2d2d2d">游戏目标</a></h4>
                    </li>
                    <li>
                        <h4><a href="#basic" style="text-decoration: none;  color: #2d2d2d">基本玩法</a></h4>
                    </li>
                    <li>
                        <h4><a href="#rule" style="text-decoration: none;  color: #2d2d2d">游戏规则</a></h4>
                    </li>
                    <li>
                        <h4><a href="#suggestion" style="text-decoration: none;  color: #2d2d2d">策略建议</a></h4>
                    </li>
                    <li>
                        <h4><a href='#more' style="text-decoration: none;  color: #2d2d2d">更多</a></h4>
                    </li>         
                </ul>
            </div>
            <a name="target"><h2>游戏目标</h2></a>
            <p>玩家的主要目标是在4x4的格子中通过合并相同的数字，最终合成数字<b>2048</b>。</p>
            <a name="basic"><h2>基本玩法</h2></a>
            <p>1.游戏开始时，棋盘内会随机出现两个数字，这些数字只能是<b>2</b>或<b>4</b>。</p>
            <img src="image/introduction/basic.png" alt="Basic" class="introduction-img">
            <p>2.玩家可以通过键盘的↑↓←→或wasd（或滑动屏幕，如果是在手机端的话），使棋盘内的数字发生位移或合并。</p>
            <p>3.若玩家选择的方向上有<b>相同</b>的数字，则这些数字会合并成一个新的数字，该数字为原来两个数字之和。</p>
            <p>4.每次<b>有效</b>移动后，棋盘的空位（无数字处）会随机出现一个数字，这个数字同样只能是2或4，出现2的概率为90%，出现4的概率为10%。</p>
            <img src="image/introduction/example.gif" alt="Example" class="introduction-img">
            <a name="rule"><h2>游戏规则</h2></a>
            <p>1.玩家需要尽量将相同的数字合并在一起，以便形成更大的数字。</p>
            <p>2.合并所得的所有新生成数字相加即为该步的有效得分。</p>
            <p>3.玩家需要时刻注意保持棋盘的整洁，避免让棋盘被数字填满而无法进行有效移动，这会导致游戏失败。</p>
            <img src="image/introduction/lose.png" alt="Lose" class="introduction-img">
            <p>4.当棋盘上出现数字2048时，玩家即获得胜利，游戏结束。此时，玩家可以选择继续游戏以挑战更高的分数，或者重新开始一局新的游戏。</p>
            <img src="image/introduction/win.png" alt="Win" class="introduction-img">
            <a name="suggestion"><h2>策略建议</h2></a>
            <p>1.在游戏初期，玩家可以随意按动按键（或滑动屏幕）以熟悉游戏规则和操作方法。</p>
            <p>2.随着游戏的进行，玩家需要更加注意数字的布局和合并顺序，以便更有效地合成更大的数字。</p>
            <p>3.一般来说，将最大的数字放在角落是一个不错的策略，因为这样可以减少该数字被其他数字阻挡的可能性。</p>
            <p>4.玩家还应该尽量保持数字的连续性，避免在棋盘上留下过多的空格，这样可以增加合成新数字的机会。</p>
            <p>5.在游戏后期，当棋盘上出现较大的数字时，玩家需要更加谨慎地操作，以免破坏已经形成的良好布局。</p>
            <a name="more"><h2>更多</h2></a>
            <h3>模式选择</h3>
            <p>我们可以启动一种流畅的滑动模式，该模式允许我们通过简单直观的上、下、左、右滑动动作，控制滑块的移动，实现对界面元素的精准操控与自由移动。 让每一次滑动都成为探索与互动的愉悦旅程。</p>
            <h3>排行榜</h3>
            <p>排行榜将精心记录着每一位玩家的卓越成就，以他们所取得的最高分数作为衡量标准，精准地排列出荣誉的阶梯。 这不仅仅是一个简单的数字排名，更是每位玩家智慧、技巧与不懈努力的辉煌见证。</p>
            <h3>成就</h3>
            <p>游戏含有丰富的成就系统，还有<b>隐藏成就</b>等你发现</p>
            <h3>主题选择</h3>
            <p>游戏提供多种主题供玩家选择，通过左下角按钮可快速切换<b>夜间模式</b></p>
            <img src="image/introduction/darkmode.png" alt="DarkMode" class="introduction-img">
            <h3>意见反馈</h3>
            <p>我们非常珍视每一位用户的宝贵意见与建议，它们是我们不断优化与进步的源动力 。因此，我们诚挚地邀请您，在特设的“<b>意见建议</b>”模块中，畅所欲言，分享您的真知灼见。 无论是对我们产品功能的改进建议、服务体验的提升想法，还是任何能够助力我们更加贴近您需求的创意点子， 我们都将满怀感激地倾听并认真考虑。 再次感谢您的关注与支持。<p>
        </div>
    </div>
    <!-- 意见建议弹出层 -->
    <div id="Pop-advice" class="popup-advice">
        <i class="iconfont icon-NotebookPencil icon" id="iconAdvice"></i>
        <span id="textAdvice">Contact us</span>
        <span id="textAdviceMain">有什么意见和想法就告诉我们吧……</span>
        <textarea id="contactUs" placeholder="请在这里输入："></textarea>
        <button id="submitBtn" class="submitBtn">提交</button>
        <button id="closeBtnAdvice" class="closePopup">
            <i class="iconfont icon-Close icon"></i>
        </button>
    </div>
    <!-- 意见建议反馈弹出层 -->
    <div id="Pop-feedback" class="popup-feedback">
        <span id="feedbackText">收到你的消息啦！o(*≧▽≦)ツ <br>
                                感谢反馈！
        </span>
        <button id="closeBtnFeedback" class="closePopup">
            <i class="iconfont icon-Close icon"></i>
        </button>
    </div>

    <!-- 制作团队弹出层 -->
    <div id="Pop-productionTeam" class="popup-productionTeam">
        <i class="iconfont icon-UserMore icon" id="iconProductionTeam"></i>
        <span id="textProductionTeam">制作团队</span>
        <div class="LYQ">
            <img src="image/member/LYQ.jpg" alt="Long">
            <strong>龍毅翹</strong>
            <p>2307010131</p>
            <i class="iconfont icon-UserHeart icon heart"></i>
        </div>
        <div class="XBN">
            <img src="image/member/XBN.jpg" alt="Xia">
            <strong>夏伯农</strong>
            <p>2307010420</p>
            <i class="iconfont icon-UserHeart icon heart"></i>
        </div>
        <div class="LZH">
            <img src="image/member/LZH.jpg" alt="Liu">
            <strong>刘子菡</strong>
            <p>2307010113</p>
            <i class="iconfont icon-UserHeart icon heart"></i>
        </div>
        <div class="WX">
            <img src="image/member/WX.jpg" alt="Wang">
            <strong>王檄</strong>
            <p>2307010215</p>
            <i class="iconfont icon-UserHeart icon heart"></i>
        </div>
        <div class="NX">
            <img src="image/member/NX.jpg" alt="Niu">
            <strong>牛翔</strong>
            <p>2307010310</p>
            <i class="iconfont icon-UserHeart icon heart"></i>
        </div>
        <button id="closeBtnProductionTeam" class="closePopup">
            <i class="iconfont icon-Close icon"></i>
        </button>
    </div>

    <!-- 成就弹出层 -->
    <div id="Pop-achievement" class="popup-achievement">
        <div id="Pop-achievementHeader">
            <i class="iconfont icon-Star icon" id="iconAchievement"></i>
            <span id="textAchievement">成就</span>
            <button id="closeBtnAchievement" class="closePopup">
                <i class="iconfont icon-Close icon"></i>
            </button>
        </div>
        <div class="achievement-list-container">  
            <ul class="achievement-list">  
                <!-- 成就列表项 -->  
                <li class="achievement-item">  
                    <h3>梦开始的地方</h3>  
                    <p>这是什么？点一下</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>前面的可是地狱啊</h3>  
                    <p>现在你已经学会2+2=4了，接下来让我们翻开高等数学……</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>初出茅庐</h3>  
                    <p>孺子可教也</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>小试牛刀</h3>  
                    <p>你也喜欢这种丝滑合并的感觉吧？</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>失败是成功他妈</h3>  
                    <p>这不会是最后一次…………吧？</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>键之力三段</h3>  
                    <p>三十年河东，三十年河西……</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>大键师</h3>  
                    <p>去吧，佛生气键盘莲花！</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>键宗强者，恐怖如斯</h3>  
                    <p>三年之期已到……</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>键帝</h3>  
                    <p>你的键盘还好吗？</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>终于等到你</h3>  
                    <p>还好你没放弃</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>爱要大声说出来</h3>  
                    <p>恨也是（第一次使用意见反馈）</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>耳膜破坏者</h3>  
                    <p>你不会在外放吧？</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>盲生，你发现了华点</h3>  
                    <p>好奇心害死猫，但咱是人</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>虔诚</h3>  
                    <p>你真的，我哭死</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>夜猫子</h3>  
                    <p>晚上更有感觉（确信）</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>名人</h3>  
                    <p>大佬给签个名~</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>听我说蟹蟹你</h3>  
                    <p>因为有你，温暖了四季</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>建议见意见议建</h3>  
                    <p>咋的，你意见很大啊（心虚）</p>  
                </li>  
                <!-- 隐藏成就 -->
                <li class="achievement-item">  
                    <h3>闪电侠</h3>  
                    <p>不是哥们，搁着放鞭炮呢</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>熊孩子</h3>  
                    <p>开关都给你玩坏了！</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>思考者</h3>  
                    <p>醒醒，月亮都晒屁股了</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>无他，唯手熟尔</h3>  
                    <p>啊？？？</p>  
                </li>  
                <li class="achievement-item">  
                    <h3>沉浸式小游戏</h3>  
                    <p>有这么好玩吗？（挠头）</p>  
                </li>  
            </ul>  
        </div>
    </div>


    <!-- 排行榜 -->
    <a id="rankingListBtn" class="rankingListBtn">
        <i class="iconfont icon-BarChart icon" id="rankingIcon"></i>
        <span id="rankingListName">排行榜</span>
    </a>
    <div id="Ranking-Btn" class="rankingList-container">
        <ol id="rankingList"></ol>
    </div>

    <!-- 游戏结束弹出层     -->
    <div id="gameOverBoard" class="gameOverBoard">
        <span id="loseText">输赢什么的无所谓！<br>
                            再开一局吧！<br>
                            o(*≧▽≦)ツ┏━┓
        <span id="loseTextTip">点击任意位置继续……</span>
    </div>

    <!-- 游戏胜利弹出层     -->
    <div id="gameWinBoard" class="gameWinBoard">
        <span id="winText">恭喜你！你赢了！<br> 
                           继续玩或者重开，任君选择吧~ <br> 
                           (￣▽￣)ノ</span>
        <span id="winTextTip">点击任意位置继续……</span>
    </div>
`;

// 初始化UI
document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML += sidebarContent;
    initUI();
    waterMark();
    closePopup();
    buttonEffect();
    showRanking();
    showIntroductionNav();
    volumeSync();
});


function initUI() {
    // 切换body元素的dark类
    const body = document.querySelector('body'),
        shell = body.querySelector('nav'),
        modeSwitch = body.querySelector(".toggle-switch"),
        modeText = body.querySelector(".mode-text"),
        toggle = body.querySelector('.toggle');
    shellBtns = body.querySelectorAll('.shellBtn');

    // 切换侧边栏
    toggle.addEventListener("click", () => {
        shell.classList.toggle("close");
        document.getElementById('Pop-introduction').classList.remove('active');
        document.getElementById('Pop-difficulty').classList.remove('active');
        document.getElementById('Pop-volume').classList.remove('active');
        document.getElementById('Pop-skin').classList.remove('active');
        document.getElementById('Pop-modeChoice').classList.remove('active');
        document.getElementById('Pop-advice').classList.remove('active');
        document.getElementById('Pop-productionTeam').classList.remove('active');
        document.getElementById('Pop-achievement').classList.remove('active');
    });
    shellBtns.forEach(shellBtn => {
        shellBtn.addEventListener("click", () => {
            if (shell.classList.contains('close')) {
                shell.classList.remove('close');
            }
        });
    });

    // 切换模式
    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) modeText.innerText = "白日模式";
        else modeText.innerText = "夜间模式";
    });
}

function waterMark() {
    // 水印
    const watermarkDiv = document.createElement('div');
    watermarkDiv.style.color = 'gray';
    watermarkDiv.style.position = 'fixed';
    watermarkDiv.style.bottom = '0';
    watermarkDiv.style.right = '0';
    watermarkDiv.style.margin = '10px';
    watermarkDiv.textContent = '创作by有点不太队';
    document.body.appendChild(watermarkDiv);
}

function closePopup() {
    // 弹出层（用于开启和关闭层）
    var popUp1 = document.getElementById('Pop-introduction');
    var popUp2 = document.getElementById('Pop-difficulty');
    var popUp3 = document.getElementById('Pop-volume');
    var popUp4 = document.getElementById('Pop-skin');
    var popUp5 = document.getElementById('Pop-modeChoice');
    var popUp6 = document.getElementById('Pop-advice');
    var popUp7 = document.getElementById('Pop-productionTeam');
    var popUp8 = document.getElementById('Pop-achievement');

    // 玩法介绍（popUp1）
    document.getElementById('introduction').addEventListener('click', function (event) {
        event.preventDefault();
        if (popUp1.classList.contains('active')) popUp1.classList.remove('active');
        else popUp1.classList.add('active');
        popUp2.classList.remove('active');
        popUp3.classList.remove('active');
        popUp4.classList.remove('active');
        popUp5.classList.remove('active');
        popUp6.classList.remove('active');
        popUp7.classList.remove('active');
        popUp8.classList.remove('active');
    });

    // 难度设置（popUp2）
    document.getElementById('difficulty').addEventListener('click', function (event) {
        event.preventDefault();
        if (popUp2.classList.contains('active')) popUp2.classList.remove('active');
        else popUp2.classList.add('active');
        popUp1.classList.remove('active');
        popUp3.classList.remove('active');
        popUp4.classList.remove('active');
        popUp5.classList.remove('active');
        popUp6.classList.remove('active');
        popUp7.classList.remove('active');
        popUp8.classList.remove('active');
    });

    // 音量控制（popUp3）
    document.getElementById('volume').addEventListener('click', function (event) {
        event.preventDefault();
        if (popUp3.classList.contains('active')) popUp3.classList.remove('active');
        else popUp3.classList.add('active');
        popUp1.classList.remove('active');
        popUp2.classList.remove('active');
        popUp4.classList.remove('active');
        popUp5.classList.remove('active');
        popUp6.classList.remove('active');
        popUp7.classList.remove('active');
        popUp8.classList.remove('active');
    });

    // 主题切换（popUp4）
    document.getElementById('skin').addEventListener('click', function (event) {
        event.preventDefault();
        if (popUp4.classList.contains('active')) popUp4.classList.remove('active');
        else popUp4.classList.add('active');
        popUp1.classList.remove('active');
        popUp2.classList.remove('active');
        popUp3.classList.remove('active');
        popUp5.classList.remove('active');
        popUp6.classList.remove('active');
        popUp7.classList.remove('active');
        popUp8.classList.remove('active');
    });

    // 模式选择（popUp5）
    document.getElementById('modeChoice').addEventListener('click', function (event) {
        event.preventDefault();
        if (popUp5.classList.contains('active')) popUp5.classList.remove('active');
        else popUp5.classList.add('active');
        popUp1.classList.remove('active');
        popUp2.classList.remove('active');
        popUp3.classList.remove('active');
        popUp4.classList.remove('active');
        popUp6.classList.remove('active');
        popUp7.classList.remove('active');
        popUp8.classList.remove('active');
    });

    // 意见建议（popUp6）
    document.getElementById('advice').addEventListener('click', function (event) {
        event.preventDefault();
        if (popUp6.classList.contains('active')) popUp6.classList.remove('active');
        else popUp6.classList.add('active');
        popUp1.classList.remove('active');
        popUp2.classList.remove('active');
        popUp3.classList.remove('active');
        popUp4.classList.remove('active');
        popUp5.classList.remove('active');
        popUp7.classList.remove('active');
        popUp8.classList.remove('active');
    });
    document.getElementById('submitBtn').addEventListener('click', function (event) {
        event.preventDefault();
        popUp6.classList.remove('active');
        document.getElementById('Pop-feedback').classList.add('active');
        document.getElementById("contactUs").value = "";
    });

    // 制作团队（popUp7）
    document.getElementById('productionTeam').addEventListener('click', function (event) {
        event.preventDefault();
        if (popUp7.classList.contains('active')) popUp7.classList.remove('active');
        else popUp7.classList.add('active');
        popUp1.classList.remove('active');
        popUp2.classList.remove('active');
        popUp3.classList.remove('active');
        popUp4.classList.remove('active');
        popUp5.classList.remove('active');
        popUp6.classList.remove('active');
        popUp8.classList.remove('active');
    });
    document.querySelectorAll('.heart').forEach(function (heart) {
        heart.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    });

    // 成就（popUp8）
    document.getElementById('achievement').addEventListener('click', function (event) {
        event.preventDefault();
        if (popUp8.classList.contains('active')) popUp8.classList.remove('active');
        else popUp8.classList.add('active');
        popUp1.classList.remove('active');
        popUp2.classList.remove('active');
        popUp3.classList.remove('active');
        popUp4.classList.remove('active');
        popUp5.classList.remove('active');
        popUp6.classList.remove('active');
        popUp7.classList.remove('active');
    });

    // 统一关闭弹出层
    var closeButton = document.getElementsByClassName('closePopup');
    for (var i = 0; i < closeButton.length; i++) {
        closeButton[i].addEventListener('click', function () {
            popUp1.classList.remove('active');
            popUp2.classList.remove('active');
            popUp3.classList.remove('active');
            popUp4.classList.remove('active');
            popUp5.classList.remove('active');
            popUp6.classList.remove('active');
            popUp7.classList.remove('active');
            popUp8.classList.remove('active');
            document.getElementById('Pop-feedback').classList.remove('active');
        });
    }

    // 点击开始按钮关闭侧边弹出层
    document.getElementById('startGameButton').addEventListener('click', function (event) {
        popUp2.classList.remove('active');
        popUp3.classList.remove('active');
        popUp4.classList.remove('active');
        popUp5.classList.remove('active');
        document.querySelector('nav').classList.add('close');
    });
}

function buttonEffect() {
    var sGB = document.querySelector('#startGameButton');
    var isAnimating = false;

    sGB.addEventListener('click', function () {
        if (!isAnimating) {
            isAnimating = true;
            sGB.classList.add('animate');

            setTimeout(() => {
                sGB.classList.remove('animate');
                isAnimating = false;
            }, 300);
        }
    });
}

function showRanking() {
    document.getElementById('rankingListBtn').addEventListener('click', function (event) {
        var rankingBtn = document.getElementById('Ranking-Btn');
        event.preventDefault(); // 阻止链接的默认行为  
        if (rankingBtn.classList.contains('active')) rankingBtn.classList.remove('active');
        else rankingBtn.classList.add('active');
    });
}

function showIntroductionNav() {
    document.getElementById('introductionNav').addEventListener('click', function (event) {
        var introductionNav = document.getElementById('introductionNav-container');
        event.preventDefault(); // 阻止链接的默认行为  
        if (introductionNav.classList.contains('active')) introductionNav.classList.remove('active');
        else introductionNav.classList.add('active');
    });
}

// 音量显示
function volumeSync() {
    // 初始化音量
    const pop = document.querySelector('#pop');
    pop.volume = 0.1;

    // BGM音量显示同步
    const inputSliderBgm = document.querySelector('#bgm');
    const sliderValueBgm = document.querySelector('#sliderValueTextBgm');
    inputSliderBgm.oninput = () => {
        let value1 = inputSliderBgm.value;
        sliderValueBgm.textContent = value1;
        sliderValueBgm.style.left = value1 / 2 + '%';
        sliderValueBgm.classList.add('show');
    }
    inputSliderBgm.onmouseleave = () => {
        sliderValueBgm.classList.remove('show');
    }

    // Q弹音效音量显示同步
    const inputSliderAct = document.querySelector('#act');
    const sliderValueAct = document.querySelector('#sliderValueTextAct');
    inputSliderAct.oninput = () => {
        let value2 = inputSliderAct.value;
        sliderValueAct.textContent = value2;
        sliderValueAct.style.left = value2 / 2 + '%';
        sliderValueAct.classList.add('show');
        pop.volume = act.value / 100;
    }
    inputSliderAct.onmouseleave = () => {
        sliderValueAct.classList.remove('show');
    }

    // 阻止方向键的默认行为  
    document.querySelectorAll('.volumeControl').forEach(function (volumeControl) {
        volumeControl.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
            }
        });
    });
}