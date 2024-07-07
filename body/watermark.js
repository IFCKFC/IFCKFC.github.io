document.addEventListener('DOMContentLoaded', function() {
    // 创建div元素
    const watermarkDiv = document.createElement('div');
    // 设置样式
    watermarkDiv.style.color = 'gray';
    watermarkDiv.style.position = 'fixed';
    watermarkDiv.style.bottom = '0';
    watermarkDiv.style.right = '0';
    watermarkDiv.style.margin = '10px';
    // 设置文本内容
    watermarkDiv.textContent = '创作by有点不太队';
    // 将div添加到body的末尾
    document.body.appendChild(watermarkDiv);
});