# C 源码结构与阅读建议

本文只覆盖 `.c/.h`，忽略同名 `.ts`。

## 入口与主循环

- 运行入口：`src/platform/julius.c` 的 `main()`。
- 主流程：解析参数 -> `setup()` 初始化 -> `run_and_draw()` 与 `main_loop()` 驱动游戏循环。
- 测试入口：`test/` 下有独立的 `main()`（如 `test/sav/`、`test/translation/`），与正式运行入口无关。

## 顶层目录（与 C 代码相关）

- `src/` 主要 C 业务代码（核心与玩法/UI/平台等）。
- `ext/` 三方库与依赖源码（如 `zlib`、`png`、`tinyfiledialogs` 等）。
- `cmake/` CMake 查找模块。
- `gen/` 生成模板（如版本信息），由 CMake 生成进 `src/platform/` 等目录。
- `res/` 资源与平台配置文件（图标、平台描述、版本信息等）。
- `test/` C 相关测试与对比工具。
- `android/` 平台工程（含 Java/Gradle，不是核心 C 代码）。

## `src/` 目录功能概要

以下为 `.c/.h` 维度的模块划分：

- `platform/` 平台层与启动入口，窗口/输入/文件/声音设备等抽象。
- `core/` 通用基础设施（配置、编码、时间、文件、日志、计算等）。
- `game/` 游戏系统与主流程（初始化、帧循环、系统状态等）。
- `graphics/` 渲染与图形系统（纹理、字体、绘制、屏幕等）。
- `sound/` 音频系统（音乐、语音、音效、声道等）。
- `input/` 输入处理（鼠标、触控等）。
- `window/` UI 窗口与界面逻辑（大量对话框与菜单）。
- `widget/` UI 组件与城市视图部件（侧边栏、地图控件等）。
- `map/` 地图系统与路径/地形/瓦片相关逻辑。
- `city/` 城市运行逻辑（人口、劳工等城市状态）。
- `building/` 建筑体系与建筑行为。
- `figure/` 角色/行人/单位等个体逻辑。
- `figuretype/` 角色类型定义与分类。
- `scenario/` 关卡/事件/剧情/编辑器数据。
- `editor/` 关卡编辑器逻辑。
- `empire/` 帝国层相关逻辑（贸易/关系等）。
- `translation/` 语言与翻译资源加载。

## 建议阅读顺序（快速熟悉）

1. 入口与主循环：`src/platform/julius.c`
2. 平台层初始化与参数：`src/platform/` + `src/platform/arguments.c`
3. 游戏主流程：`src/game/`（初始化、帧循环、系统状态）
4. 基础设施：`src/core/`（配置、文件、时间、编码、日志）
5. 画面与交互：`src/graphics/` + `src/window/` + `src/widget/`
6. 玩法与世界：`src/map/`、`src/city/`、`src/building/`、`src/figure/`
7. 内容驱动：`src/scenario/` + `src/translation/`
8. 音频与输入：`src/sound/` + `src/input/`

## 入口代码指引（示例）

`src/platform/julius.c` 中的 `main()` 是程序启动点，建议先读：

- 参数解析：`platform_parse_arguments()`
- 初始化：`setup()`
- 主循环：`run_and_draw()` 与 `main_loop()`（包含 `game_run()`/`game_draw()`）

