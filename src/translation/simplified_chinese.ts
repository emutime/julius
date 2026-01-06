
import { translation_key, translation_string } from 'translation/translation';
import { Ref } from '../../ext/crt';
import { URL_EDITOR, URL_PATCHES } from './common';
import TR_NO_PATCH_TITLE = translation_key.TR_NO_PATCH_TITLE;
import TR_NO_PATCH_MESSAGE = translation_key.TR_NO_PATCH_MESSAGE;
import TR_MISSING_FONTS_TITLE = translation_key.TR_MISSING_FONTS_TITLE;
import TR_MISSING_FONTS_MESSAGE = translation_key.TR_MISSING_FONTS_MESSAGE;
import TR_NO_EDITOR_TITLE = translation_key.TR_NO_EDITOR_TITLE;
import TR_NO_EDITOR_MESSAGE = translation_key.TR_NO_EDITOR_MESSAGE;
import TR_INVALID_LANGUAGE_TITLE = translation_key.TR_INVALID_LANGUAGE_TITLE;
import TR_INVALID_LANGUAGE_MESSAGE = translation_key.TR_INVALID_LANGUAGE_MESSAGE;
import TR_BUILD_ALL_TEMPLES = translation_key.TR_BUILD_ALL_TEMPLES;
import TR_BUTTON_OK = translation_key.TR_BUTTON_OK;
import TR_BUTTON_CANCEL = translation_key.TR_BUTTON_CANCEL;
import TR_BUTTON_RESET_DEFAULTS = translation_key.TR_BUTTON_RESET_DEFAULTS;
import TR_BUTTON_CONFIGURE_HOTKEYS = translation_key.TR_BUTTON_CONFIGURE_HOTKEYS;
import TR_CONFIG_TITLE = translation_key.TR_CONFIG_TITLE;
import TR_CONFIG_LANGUAGE_LABEL = translation_key.TR_CONFIG_LANGUAGE_LABEL;
import TR_CONFIG_LANGUAGE_DEFAULT = translation_key.TR_CONFIG_LANGUAGE_DEFAULT;
import TR_CONFIG_DISPLAY_SCALE = translation_key.TR_CONFIG_DISPLAY_SCALE;
import TR_CONFIG_CURSOR_SCALE = translation_key.TR_CONFIG_CURSOR_SCALE;
import TR_CONFIG_HEADER_UI_CHANGES = translation_key.TR_CONFIG_HEADER_UI_CHANGES;
import TR_CONFIG_HEADER_GAMEPLAY_CHANGES = translation_key.TR_CONFIG_HEADER_GAMEPLAY_CHANGES;
import TR_CONFIG_SHOW_INTRO_VIDEO = translation_key.TR_CONFIG_SHOW_INTRO_VIDEO;
import TR_CONFIG_SIDEBAR_INFO = translation_key.TR_CONFIG_SIDEBAR_INFO;
import TR_CONFIG_SMOOTH_SCROLLING = translation_key.TR_CONFIG_SMOOTH_SCROLLING;
import TR_CONFIG_DISABLE_MOUSE_EDGE_SCROLLING = translation_key.TR_CONFIG_DISABLE_MOUSE_EDGE_SCROLLING;
import TR_CONFIG_DISABLE_RIGHT_CLICK_MAP_DRAG = translation_key.TR_CONFIG_DISABLE_RIGHT_CLICK_MAP_DRAG;
import TR_CONFIG_VISUAL_FEEDBACK_ON_DELETE = translation_key.TR_CONFIG_VISUAL_FEEDBACK_ON_DELETE;
import TR_CONFIG_ALLOW_CYCLING_TEMPLES = translation_key.TR_CONFIG_ALLOW_CYCLING_TEMPLES;
import TR_CONFIG_SHOW_WATER_STRUCTURE_RANGE = translation_key.TR_CONFIG_SHOW_WATER_STRUCTURE_RANGE;
import TR_CONFIG_SHOW_CONSTRUCTION_SIZE = translation_key.TR_CONFIG_SHOW_CONSTRUCTION_SIZE;
import TR_CONFIG_HIGHLIGHT_LEGIONS = translation_key.TR_CONFIG_HIGHLIGHT_LEGIONS;
import TR_CONFIG_SHOW_MILITARY_SIDEBAR = translation_key.TR_CONFIG_SHOW_MILITARY_SIDEBAR;
import TR_CONFIG_FIX_IMMIGRATION_BUG = translation_key.TR_CONFIG_FIX_IMMIGRATION_BUG;
import TR_CONFIG_FIX_100_YEAR_GHOSTS = translation_key.TR_CONFIG_FIX_100_YEAR_GHOSTS;
import TR_HOTKEY_TITLE = translation_key.TR_HOTKEY_TITLE;
import TR_HOTKEY_LABEL = translation_key.TR_HOTKEY_LABEL;
import TR_HOTKEY_ALTERNATIVE_LABEL = translation_key.TR_HOTKEY_ALTERNATIVE_LABEL;
import TR_HOTKEY_HEADER_ARROWS = translation_key.TR_HOTKEY_HEADER_ARROWS;
import TR_HOTKEY_HEADER_GLOBAL = translation_key.TR_HOTKEY_HEADER_GLOBAL;
import TR_HOTKEY_HEADER_CITY = translation_key.TR_HOTKEY_HEADER_CITY;
import TR_HOTKEY_HEADER_ADVISORS = translation_key.TR_HOTKEY_HEADER_ADVISORS;
import TR_HOTKEY_HEADER_OVERLAYS = translation_key.TR_HOTKEY_HEADER_OVERLAYS;
import TR_HOTKEY_HEADER_BOOKMARKS = translation_key.TR_HOTKEY_HEADER_BOOKMARKS;
import TR_HOTKEY_HEADER_EDITOR = translation_key.TR_HOTKEY_HEADER_EDITOR;
import TR_HOTKEY_HEADER_BUILD = translation_key.TR_HOTKEY_HEADER_BUILD;
import TR_HOTKEY_ARROW_UP = translation_key.TR_HOTKEY_ARROW_UP;
import TR_HOTKEY_ARROW_DOWN = translation_key.TR_HOTKEY_ARROW_DOWN;
import TR_HOTKEY_ARROW_LEFT = translation_key.TR_HOTKEY_ARROW_LEFT;
import TR_HOTKEY_ARROW_RIGHT = translation_key.TR_HOTKEY_ARROW_RIGHT;
import TR_HOTKEY_TOGGLE_FULLSCREEN = translation_key.TR_HOTKEY_TOGGLE_FULLSCREEN;
import TR_HOTKEY_CENTER_WINDOW = translation_key.TR_HOTKEY_CENTER_WINDOW;
import TR_HOTKEY_RESIZE_TO_640 = translation_key.TR_HOTKEY_RESIZE_TO_640;
import TR_HOTKEY_RESIZE_TO_800 = translation_key.TR_HOTKEY_RESIZE_TO_800;
import TR_HOTKEY_RESIZE_TO_1024 = translation_key.TR_HOTKEY_RESIZE_TO_1024;
import TR_HOTKEY_SAVE_SCREENSHOT = translation_key.TR_HOTKEY_SAVE_SCREENSHOT;
import TR_HOTKEY_SAVE_CITY_SCREENSHOT = translation_key.TR_HOTKEY_SAVE_CITY_SCREENSHOT;
import TR_HOTKEY_BUILD_CLONE = translation_key.TR_HOTKEY_BUILD_CLONE;
import TR_HOTKEY_LOAD_FILE = translation_key.TR_HOTKEY_LOAD_FILE;
import TR_HOTKEY_SAVE_FILE = translation_key.TR_HOTKEY_SAVE_FILE;
import TR_HOTKEY_INCREASE_GAME_SPEED = translation_key.TR_HOTKEY_INCREASE_GAME_SPEED;
import TR_HOTKEY_DECREASE_GAME_SPEED = translation_key.TR_HOTKEY_DECREASE_GAME_SPEED;
import TR_HOTKEY_TOGGLE_PAUSE = translation_key.TR_HOTKEY_TOGGLE_PAUSE;
import TR_HOTKEY_CYCLE_LEGION = translation_key.TR_HOTKEY_CYCLE_LEGION;
import TR_HOTKEY_ROTATE_MAP_LEFT = translation_key.TR_HOTKEY_ROTATE_MAP_LEFT;
import TR_HOTKEY_ROTATE_MAP_RIGHT = translation_key.TR_HOTKEY_ROTATE_MAP_RIGHT;
import TR_HOTKEY_SHOW_ADVISOR_LABOR = translation_key.TR_HOTKEY_SHOW_ADVISOR_LABOR;
import TR_HOTKEY_SHOW_ADVISOR_MILITARY = translation_key.TR_HOTKEY_SHOW_ADVISOR_MILITARY;
import TR_HOTKEY_SHOW_ADVISOR_IMPERIAL = translation_key.TR_HOTKEY_SHOW_ADVISOR_IMPERIAL;
import TR_HOTKEY_SHOW_ADVISOR_RATINGS = translation_key.TR_HOTKEY_SHOW_ADVISOR_RATINGS;
import TR_HOTKEY_SHOW_ADVISOR_TRADE = translation_key.TR_HOTKEY_SHOW_ADVISOR_TRADE;
import TR_HOTKEY_SHOW_ADVISOR_POPULATION = translation_key.TR_HOTKEY_SHOW_ADVISOR_POPULATION;
import TR_HOTKEY_SHOW_ADVISOR_HEALTH = translation_key.TR_HOTKEY_SHOW_ADVISOR_HEALTH;
import TR_HOTKEY_SHOW_ADVISOR_EDUCATION = translation_key.TR_HOTKEY_SHOW_ADVISOR_EDUCATION;
import TR_HOTKEY_SHOW_ADVISOR_ENTERTAINMENT = translation_key.TR_HOTKEY_SHOW_ADVISOR_ENTERTAINMENT;
import TR_HOTKEY_SHOW_ADVISOR_RELIGION = translation_key.TR_HOTKEY_SHOW_ADVISOR_RELIGION;
import TR_HOTKEY_SHOW_ADVISOR_FINANCIAL = translation_key.TR_HOTKEY_SHOW_ADVISOR_FINANCIAL;
import TR_HOTKEY_SHOW_ADVISOR_CHIEF = translation_key.TR_HOTKEY_SHOW_ADVISOR_CHIEF;
import TR_HOTKEY_TOGGLE_OVERLAY = translation_key.TR_HOTKEY_TOGGLE_OVERLAY;
import TR_HOTKEY_SHOW_OVERLAY_WATER = translation_key.TR_HOTKEY_SHOW_OVERLAY_WATER;
import TR_HOTKEY_SHOW_OVERLAY_FIRE = translation_key.TR_HOTKEY_SHOW_OVERLAY_FIRE;
import TR_HOTKEY_SHOW_OVERLAY_DAMAGE = translation_key.TR_HOTKEY_SHOW_OVERLAY_DAMAGE;
import TR_HOTKEY_SHOW_OVERLAY_CRIME = translation_key.TR_HOTKEY_SHOW_OVERLAY_CRIME;
import TR_HOTKEY_SHOW_OVERLAY_PROBLEMS = translation_key.TR_HOTKEY_SHOW_OVERLAY_PROBLEMS;
import TR_HOTKEY_GO_TO_BOOKMARK_1 = translation_key.TR_HOTKEY_GO_TO_BOOKMARK_1;
import TR_HOTKEY_GO_TO_BOOKMARK_2 = translation_key.TR_HOTKEY_GO_TO_BOOKMARK_2;
import TR_HOTKEY_GO_TO_BOOKMARK_3 = translation_key.TR_HOTKEY_GO_TO_BOOKMARK_3;
import TR_HOTKEY_GO_TO_BOOKMARK_4 = translation_key.TR_HOTKEY_GO_TO_BOOKMARK_4;
import TR_HOTKEY_SET_BOOKMARK_1 = translation_key.TR_HOTKEY_SET_BOOKMARK_1;
import TR_HOTKEY_SET_BOOKMARK_2 = translation_key.TR_HOTKEY_SET_BOOKMARK_2;
import TR_HOTKEY_SET_BOOKMARK_3 = translation_key.TR_HOTKEY_SET_BOOKMARK_3;
import TR_HOTKEY_SET_BOOKMARK_4 = translation_key.TR_HOTKEY_SET_BOOKMARK_4;
import TR_HOTKEY_EDITOR_TOGGLE_BATTLE_INFO = translation_key.TR_HOTKEY_EDITOR_TOGGLE_BATTLE_INFO;
import TR_HOTKEY_EDIT_TITLE = translation_key.TR_HOTKEY_EDIT_TITLE;
import TR_HOTKEY_DUPLICATE_TITLE = translation_key.TR_HOTKEY_DUPLICATE_TITLE;
import TR_HOTKEY_DUPLICATE_MESSAGE = translation_key.TR_HOTKEY_DUPLICATE_MESSAGE;
import TR_WARNING_SCREENSHOT_SAVED = translation_key.TR_WARNING_SCREENSHOT_SAVED;
let all_strings: translation_string[] = [
    new translation_string(TR_NO_PATCH_TITLE, "未安装1.0.1.0补丁"),
    new translation_string(
        TR_NO_PATCH_MESSAGE,
        "《凯撒大帝3》未安装1.0.1.0补丁。" +
        "补丁下载链接:\n" +
        URL_PATCHES + "\n" +
        "继续游戏风险自担。"
    ),
    new translation_string(TR_MISSING_FONTS_TITLE, "缺失字体"),
    new translation_string(
        TR_MISSING_FONTS_MESSAGE,
        "《凯撒大帝3》需要额外字体文件。" +
        "语言包下载链接:\n" +
        URL_PATCHES
    ),
    new translation_string(TR_NO_EDITOR_TITLE, "未安装地图编辑器"),
    new translation_string(
        TR_NO_EDITOR_MESSAGE,
        "《凯撒大帝3》未检测到地图编辑器文件。" +
        "地图编辑器下载链接:\n" +
        URL_EDITOR
    ),
    new translation_string(TR_INVALID_LANGUAGE_TITLE, "语言包路径无效"),
    new translation_string(
        TR_INVALID_LANGUAGE_MESSAGE,
        "指定路径未检测到有效语言包。" +
        "请检视日志查看错误。"
    ),
    new translation_string(TR_BUILD_ALL_TEMPLES, "全部"),
    new translation_string(TR_BUTTON_OK, "确定"),
    new translation_string(TR_BUTTON_CANCEL, "取消"),
    new translation_string(TR_BUTTON_RESET_DEFAULTS, "重置默认"),
    new translation_string(TR_BUTTON_CONFIGURE_HOTKEYS, "热键绑定"),
    new translation_string(TR_CONFIG_TITLE, "Julius 游戏配置"),
    new translation_string(TR_CONFIG_LANGUAGE_LABEL, "语言包:"),
    new translation_string(TR_CONFIG_LANGUAGE_DEFAULT, "默认"),
    new translation_string(TR_CONFIG_DISPLAY_SCALE, "显示比例:"),
    new translation_string(TR_CONFIG_CURSOR_SCALE, "鼠标比例:"),
    new translation_string(TR_CONFIG_HEADER_UI_CHANGES, "用户界面更变"),
    new translation_string(TR_CONFIG_HEADER_GAMEPLAY_CHANGES, "游戏内容更变"),
    new translation_string(TR_CONFIG_SHOW_INTRO_VIDEO, "播放开场动画"),
    new translation_string(TR_CONFIG_SIDEBAR_INFO, "控制面板更多信息"),
    new translation_string(TR_CONFIG_SMOOTH_SCROLLING, "平滑视角滚动"),
    new translation_string(TR_CONFIG_DISABLE_MOUSE_EDGE_SCROLLING, "禁用屏幕边缘滚动地图"),
    new translation_string(TR_CONFIG_DISABLE_RIGHT_CLICK_MAP_DRAG, "禁用鼠标右键拖动地图"),
    new translation_string(TR_CONFIG_VISUAL_FEEDBACK_ON_DELETE, "优化清理土地视觉效果"),
    new translation_string(TR_CONFIG_ALLOW_CYCLING_TEMPLES, "允许连续建造每种神庙"),
    new translation_string(TR_CONFIG_SHOW_WATER_STRUCTURE_RANGE, "建造时显示贮水池水泉及水井覆盖范围"),
    new translation_string(TR_CONFIG_SHOW_CONSTRUCTION_SIZE, "显示拖动建设大小"),
    new translation_string(TR_CONFIG_HIGHLIGHT_LEGIONS, "鼠标悬停时高亮军团"),
    new translation_string(TR_CONFIG_SHOW_MILITARY_SIDEBAR, "显示军队信息侧栏"),
    new translation_string(TR_CONFIG_FIX_IMMIGRATION_BUG, "修复非常困难不来人BUG"),
    new translation_string(TR_CONFIG_FIX_100_YEAR_GHOSTS, "修复人口百岁仍占房BUG"),
    new translation_string(TR_HOTKEY_TITLE, "Julius 热键绑定"),
    new translation_string(TR_HOTKEY_LABEL, "热键"),
    new translation_string(TR_HOTKEY_ALTERNATIVE_LABEL, "可替代键"),
    new translation_string(TR_HOTKEY_HEADER_ARROWS, "方向键"),
    new translation_string(TR_HOTKEY_HEADER_GLOBAL, "全局热键"),
    new translation_string(TR_HOTKEY_HEADER_CITY, "城市热键"),
    new translation_string(TR_HOTKEY_HEADER_ADVISORS, "顾问"),
    new translation_string(TR_HOTKEY_HEADER_OVERLAYS, "覆层"),
    new translation_string(TR_HOTKEY_HEADER_BOOKMARKS, "城市地图视角标签"),
    new translation_string(TR_HOTKEY_HEADER_EDITOR, "编辑器"),
    new translation_string(TR_HOTKEY_HEADER_BUILD, "建造热键"),
    new translation_string(TR_HOTKEY_ARROW_UP, "上"),
    new translation_string(TR_HOTKEY_ARROW_DOWN, "下"),
    new translation_string(TR_HOTKEY_ARROW_LEFT, "左"),
    new translation_string(TR_HOTKEY_ARROW_RIGHT, "右"),
    new translation_string(TR_HOTKEY_TOGGLE_FULLSCREEN, "全屏切换"),
    new translation_string(TR_HOTKEY_CENTER_WINDOW, "中心窗口化"),
    new translation_string(TR_HOTKEY_RESIZE_TO_640, "重置分辨率至640x480"),
    new translation_string(TR_HOTKEY_RESIZE_TO_800, "重置分辨率至800x600"),
    new translation_string(TR_HOTKEY_RESIZE_TO_1024, "重置分辨率至1024x768"),
    new translation_string(TR_HOTKEY_SAVE_SCREENSHOT, "保存截图"),
    new translation_string(TR_HOTKEY_SAVE_CITY_SCREENSHOT, "保存城市全景截图"),
    new translation_string(TR_HOTKEY_BUILD_CLONE, "复制鼠标下的建筑"),
    new translation_string(TR_HOTKEY_LOAD_FILE, "载入文件"),
    new translation_string(TR_HOTKEY_SAVE_FILE, "保存文件"),
    new translation_string(TR_HOTKEY_INCREASE_GAME_SPEED, "加快游戏速度"),
    new translation_string(TR_HOTKEY_DECREASE_GAME_SPEED, "减慢游戏速度"),
    new translation_string(TR_HOTKEY_TOGGLE_PAUSE, "暂停切换"),
    new translation_string(TR_HOTKEY_CYCLE_LEGION, "切换各军团所在视角"),
    new translation_string(TR_HOTKEY_ROTATE_MAP_LEFT, "顺时针旋转地图视角"),
    new translation_string(TR_HOTKEY_ROTATE_MAP_RIGHT, "逆时针旋转地图视角"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_LABOR, "劳工顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_MILITARY, "军事顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_IMPERIAL, "皇帝顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_RATINGS, "评比顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_TRADE, "贸易顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_POPULATION, "人口顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_HEALTH, "健康顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_EDUCATION, "教育顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_ENTERTAINMENT, "娱乐顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_RELIGION, "宗教顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_FINANCIAL, "财政顾问"),
    new translation_string(TR_HOTKEY_SHOW_ADVISOR_CHIEF, "首席顾问"),
    new translation_string(TR_HOTKEY_TOGGLE_OVERLAY, "当前覆层视角切换"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_WATER, "显示供水覆层"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_FIRE, "显示火灾覆层"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_DAMAGE, "显示损坏覆层"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_CRIME, "显示犯罪覆层"),
    new translation_string(TR_HOTKEY_SHOW_OVERLAY_PROBLEMS, "显示问题覆层"),
    new translation_string(TR_HOTKEY_GO_TO_BOOKMARK_1, "前往视角标签 1"),
    new translation_string(TR_HOTKEY_GO_TO_BOOKMARK_2, "前往视角标签 2"),
    new translation_string(TR_HOTKEY_GO_TO_BOOKMARK_3, "前往视角标签 3"),
    new translation_string(TR_HOTKEY_GO_TO_BOOKMARK_4, "前往视角标签 4"),
    new translation_string(TR_HOTKEY_SET_BOOKMARK_1, "设定视角标签 1"),
    new translation_string(TR_HOTKEY_SET_BOOKMARK_2, "设定视角标签 2"),
    new translation_string(TR_HOTKEY_SET_BOOKMARK_3, "设定视角标签 3"),
    new translation_string(TR_HOTKEY_SET_BOOKMARK_4, "设定视角标签 4"),
    new translation_string(TR_HOTKEY_EDITOR_TOGGLE_BATTLE_INFO, "战斗信息切换"),
    new translation_string(TR_HOTKEY_EDIT_TITLE, "按下新热键"),
    new translation_string(TR_HOTKEY_DUPLICATE_TITLE, "热键已占用"),
    new translation_string(TR_HOTKEY_DUPLICATE_MESSAGE, "该键位已设定为以下功能:"),
    new translation_string(TR_WARNING_SCREENSHOT_SAVED, "截图已保存: ") // TODO: Google translate
];

export function translation_simplified_chinese(strings: Ref<translation_string[]>, num_strings: Ref<number>) {
    strings.v = all_strings;
    num_strings.v = all_strings.length;
};