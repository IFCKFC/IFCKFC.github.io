const gridContent = `
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
`

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML += gridContent;
});