// animation.ts

import { time_get_millis } from './core/time'; // 假设有一个时间模块

const MAX_ANIM_TIMERS = 51; // 最大动画计时器数量

// 定义计时器的结构
interface Timer {
    last_update: number; // 上次更新时间
    should_update: number; // 是否需要更新
}

// 创建计时器数组
const timers: Timer[] = Array.from({ length: MAX_ANIM_TIMERS }, () => ({
    last_update: 0,
    should_update: 0,
}));

// 初始化动画
export function game_animation_init(): void {
    for (let i = 0; i < MAX_ANIM_TIMERS; i++) {
        timers[i].last_update = 0; // 初始化上次更新时间为0
        timers[i].should_update = 0; // 初始化更新标志为0
    }
}

// 更新动画
export function game_animation_update(): void {
    const now_millis = time_get_millis(); // 获取当前时间（毫秒）

    // 重置所有计时器的更新标志
    for (let i = 0; i < MAX_ANIM_TIMERS; i++) {
        timers[i].should_update = 0;
    }

    let delay_millis = 0; // 延迟时间初始化
    // 遍历所有计时器
    for (let i = 0; i < MAX_ANIM_TIMERS; i++) {
        // 检查当前时间与上次更新时间的差值是否大于等于延迟时间
        if (now_millis - timers[i].last_update >= delay_millis) {
            timers[i].should_update = 1; // 设置更新标志为1
            timers[i].last_update = now_millis; // 更新上次更新时间
        }
        delay_millis += 20; // 每个计时器的延迟时间增加20毫秒
    }
}

// 检查动画是否应该前进
export function game_animation_should_advance(speed: number): number {
    return timers[speed].should_update; // 返回指定速度的计时器的更新标志
}