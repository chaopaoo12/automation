// 导入 AutoJS 的相关模块
var windowWidth = 135; // 设置悬浮窗的宽度
var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="80" h="40" bg="#50ffffff" />
        <button id="exit" text="退出" w="50" h="40" bg="#50ffffff" marginLeft="85" />
    </frame>
);

// 设置悬浮窗位置为屏幕顶部居中
window.setPosition(0, device.height / 2);

var packageName = "com.ss.android.ugc.aweme"; // 视频App的包名
// 打开视频App
launch(packageName);
// 等待视频App加载完成
waitForPackage(packageName);

setInterval(() => {}, 1000);
var execution = null;
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            // 记录按键被按下时的触摸坐标
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            // 移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            // 如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            // 手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});

window.exit.setOnClickListener(function() {
    engines.stopAll();
});

function onClick() {
    if (window.action.getText() == '开始运行') {
        execution = threads.start(function() {
            // 监听按钮
            while (true) {
                autoSwipe()
            }
        });

        window.action.setText('停止运行');
    } else {
        if (execution) {
            execution.interrupt();
        }
        window.action.setText('开始运行');
    }
}

// 自动刷视频函数
function autoSwipe() {
    while (true) {
      // 模拟向下滑动操作
      swipe(
        device.width / 2,
        device.height * 0.8,
        device.width / 2,
        device.height * 0.2,
        1000
      );
      // 等待一段时间，模拟观看视频
      sleep(5000); // 可以根据实际情况调整等待时间
    }
  }
