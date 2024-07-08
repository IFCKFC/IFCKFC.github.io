document.addEventListener('DOMContentLoaded', function() {
    // 创建按钮元素
    const moveButton = document.createElement('button');
    const leftButton = document.createElement('button');
    const upButton = document.createElement('button');
    const rightButton = document.createElement('button');
    const downButton = document.createElement('button');

    // 设置按钮属性和文本
    moveButton.id = 'moveButton'; moveButton.textContent = '移动键';
    leftButton.id = 'leftButton'; leftButton.textContent = '⬅'; leftButton.className = 'leftButton';
    upButton.id = 'upButton'; upButton.textContent = '⬆'; upButton.className = 'upButton';
    rightButton.id = 'rightButton'; rightButton.textContent = '➡'; rightButton.className = 'rightButton';
    downButton.id = 'downButton'; downButton.textContent = '⬇'; downButton.className = 'downButton';

    // 设置初始不可见
    leftButton.style.display = 'none';
    upButton.style.display = 'none';
    rightButton.style.display = 'none';
    downButton.style.display = 'none';

    // 添加按钮到页面
    document.body.appendChild(moveButton);
    document.body.appendChild(leftButton);
    document.body.appendChild(upButton);
    document.body.appendChild(rightButton);
    document.body.appendChild(downButton);

    // 添加事件监听器以切换按钮显示状态
    moveButton.addEventListener('click', () => {
        upButton.style.display = upButton.style.display === 'none' ? '' : 'none';
        leftButton.style.display = leftButton.style.display === 'none' ? '' : 'none';
        rightButton.style.display = rightButton.style.display === 'none' ? '' : 'none';
        downButton.style.display = downButton.style.display === 'none' ? '' : 'none';
    });

    
});