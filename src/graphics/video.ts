import { dir_get_file, localized } from 'core/dir';
import { file_open } from 'core/file';
import { smacker, smacker_close, smacker_first_frame, smacker_frame_status, smacker_get_audio_info, smacker_get_frame_audio, smacker_get_frame_audio_size, smacker_get_frame_palette, smacker_get_frame_video, smacker_get_frames_info, smacker_get_video_info, smacker_next_frame, smacker_open, smacker_y_scale } from 'core/smacker';
import { time_get_millis, time_millis } from 'core/time';
import { set_sound_type, setting_sound } from 'game/settings';
import { ALPHA_OPAQUE, color_t } from 'graphics/color';
import { clip_info, graphics_get_clip_info, graphics_get_pixel } from 'graphics/graphics';
import { screen_height, screen_width } from 'graphics/screen';
import { sound_device_use_custom_music_player, sound_device_use_default_music_player, sound_device_write_custom_music_data } from 'sound/device';
import { sound_music_stop, sound_music_update } from 'sound/music';
import { sound_speech_stop } from 'sound/speech';
import { string_from_bytes } from 'core/string';
import { Ref } from '../../ext/crt';
import MAY_BE_LOCALIZED = localized.MAY_BE_LOCALIZED;
import SMACKER_Y_SCALE_NONE = smacker_y_scale.SMACKER_Y_SCALE_NONE;
import SMACKER_FRAME_OK = smacker_frame_status.SMACKER_FRAME_OK;
import SOUND_EFFECTS = set_sound_type.SOUND_EFFECTS;
class video {
    public width: number = 0;
    public height: number = 0;
    public y_scale: number = 0;
    public micros_per_frame: number = 0;
    public start_render_millis: time_millis = null;
    public current_frame: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width = args[0]);
        args.length >= 2 && (this.height = args[1]);
        args.length >= 3 && (this.y_scale = args[2]);
        args.length >= 4 && (this.micros_per_frame = args[3]);
        args.length >= 5 && (this.start_render_millis = args[4]);
        args.length >= 6 && (this.current_frame = args[5]);
    }
}
class audio {
    public has_audio: number = 0;
    public bitdepth: number = 0;
    public channels: number = 0;
    public rate: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.has_audio = args[0]);
        args.length >= 2 && (this.bitdepth = args[1]);
        args.length >= 3 && (this.channels = args[2]);
        args.length >= 4 && (this.rate = args[3]);
    }
}
export class unnamed14_8 {
    public is_playing: number = 0;
    public is_ended: number = 0;
    public s: smacker = null;
    public video: video = null;
    public audio: audio = null;
    public restart_music: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.is_playing = args[0]);
        args.length >= 2 && (this.is_ended = args[1]);
        args.length >= 3 && (this.s = args[2]);
        args.length >= 4 && (this.video = args[3]);
        args.length >= 5 && (this.audio = args[4]);
        args.length >= 6 && (this.restart_music = args[5]);
    }
}
let data: unnamed14_8 = new unnamed14_8();
function close_smk() {
    if (data.s) {
        smacker_close(data.s);
        data.s = null;
    }
}
function load_smk(filename: string) {
    let path: string = dir_get_file(filename, MAY_BE_LOCALIZED);
    if (!path) {
        return 0;
    }
    let fp = file_open(path, "rb");
    data.s = smacker_open(fp);
    if (!data.s) {
        return 0;
    }
    let width: number
    let height: number
    let y_scale: number
    let micros_per_frame: number;
    smacker_get_frames_info(data.s, 0, micros_per_frame);
    smacker_get_video_info(data.s, width, height, y_scale);
    data.video.width = width;
    data.video.height = y_scale == SMACKER_Y_SCALE_NONE ? height : height * 2;
    data.video.y_scale = y_scale;
    data.video.current_frame = 0;
    data.video.micros_per_frame = micros_per_frame;
    data.audio.has_audio = 0;
    if (setting_sound(SOUND_EFFECTS).enabled) {
        let has_track: number
        let channels: number
        let bitdepth: number
        let rate: number;
        smacker_get_audio_info(data.s, 0, has_track, channels, bitdepth, rate);
        if (has_track) {
            data.audio.has_audio = 1;
            data.audio.bitdepth = bitdepth;
            data.audio.channels = channels;
            data.audio.rate = rate;
        }
    }
    if (smacker_first_frame(data.s) != SMACKER_FRAME_OK) {
        close_smk();
        return 0;
    }
    return 1;
}
function end_video() {
    sound_device_use_default_music_player();
    if (data.restart_music) {
        sound_music_update(1);
    }
}
export function video_start(filename: string | ArrayLike<number>) {
    const filenameStr = typeof filename === "string" ? filename : string_from_bytes(filename);
    data.is_playing = 0;
    data.is_ended = 0;
    if (load_smk(filenameStr)) {
        sound_music_stop();
        sound_speech_stop();
        data.is_playing = 1;
        return 1;
    } else {
        return 0;
    }
}
export function video_size(width: Ref<number>, height: Ref<number>) {
    width.v = data.video.width;
    height.v = data.video.y_scale == SMACKER_Y_SCALE_NONE ? data.video.height : 2 * data.video.height;
}
export function video_init(restart_music: number) {
    data.video.start_render_millis = time_get_millis();
    data.restart_music = restart_music;
    if (data.audio.has_audio) {
        let audio_len: number = smacker_get_frame_audio_size(data.s, 0);
        if (audio_len > 0) {
            sound_device_use_custom_music_player(
                data.audio.bitdepth, data.audio.channels, data.audio.rate,
                smacker_get_frame_audio(data.s, 0), audio_len
            );
        }
    }
}
export function video_is_finished() {
    return data.is_ended;
}
export function video_stop() {
    if (data.is_playing) {
        if (!data.is_ended) {
            end_video();
        }
        close_smk();
        data.is_playing = 0;
    }
}
export function video_shutdown() {
    if (data.is_playing) {
        close_smk();
        data.is_playing = 0;
    }
}
function get_next_frame() {
    if (!data.s) {
        return 0;
    }
    let now_millis: time_millis = time_get_millis();
    let frame_no: number = (now_millis - data.video.start_render_millis) * 1000 / data.video.micros_per_frame;
    let draw_frame: boolean = data.video.current_frame == 0;
    while (frame_no > data.video.current_frame) {
        if (smacker_next_frame(data.s) != SMACKER_FRAME_OK) {
            close_smk();
            data.is_ended = 1;
            data.is_playing = 0;
            end_video();
            return 0;
        }
        data.video.current_frame++;
        draw_frame = true;

        if (data.audio.has_audio) {
            let audio_len: number = smacker_get_frame_audio_size(data.s, 0);
            if (audio_len > 0) {
                sound_device_write_custom_music_data(smacker_get_frame_audio(data.s, 0), audio_len);
            }
        }
    }
    return draw_frame;
}
export function video_draw(x_offset: number, y_offset: number) {
    if (!get_next_frame()) {
        return;
    }
    let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, data.video.width, data.video.height);
    if (!clip.is_visible) {
        return;
    }
    let frame: number = smacker_get_frame_video(data.s);
    let pal = smacker_get_frame_palette(data.s);
    if (frame && pal) {
        for (let y: number = clip.clipped_pixels_top; y < clip.visible_pixels_y; y++) {
            let pixel: color_t = graphics_get_pixel(
                x_offset + clip.clipped_pixels_left, y + y_offset + clip.clipped_pixels_top);
            let video_y: number = data.video.y_scale == SMACKER_Y_SCALE_NONE ? y : y / 2;
            let line: number = frame + (video_y * data.video.width);
            for (let x: number = clip.clipped_pixels_left; x < clip.visible_pixels_x; x++) {
                pixel = ALPHA_OPAQUE | pal[line[x]];
                ++pixel;
            }
        }
    }
}
export function video_draw_fullscreen() {
    if (!get_next_frame()) {
        return;
    }
    let s_width: number = screen_width();
    let s_height: number = screen_height();
    let frame: number = smacker_get_frame_video(data.s);
    let pal = smacker_get_frame_palette(data.s);
    if (frame && pal) {
        let scale_w: number = s_width / data.video.width;
        let scale_h: number = s_height / data.video.height * (data.video.y_scale == SMACKER_Y_SCALE_NONE ? 1 : 2);
        let scale: number = scale_w < scale_h ? scale_w : scale_h;
        let video_width: number = Math.floor(scale * data.video.width);
        let video_height: number = Math.floor(scale * data.video.height);
        let x_offset: number = (s_width - video_width) / 2;
        let y_offset: number = (s_height - video_height) / 2;
        let clip: clip_info = graphics_get_clip_info(x_offset, y_offset, video_width, video_height);
        if (!clip.is_visible) {
            return;
        }
        for (let y: number = clip.clipped_pixels_top; y < video_height - clip.clipped_pixels_bottom; y++) {
            let pixel: color_t = graphics_get_pixel(x_offset + clip.clipped_pixels_left, y_offset + y);
            let x_max: number = video_width - clip.clipped_pixels_right;
            let video_y: number = Math.floor((data.video.y_scale == SMACKER_Y_SCALE_NONE ? y : y / 2) / scale);
            let line: number = frame + (video_y * data.video.width);
            for (let x: number = clip.clipped_pixels_left; x < x_max; x++) {
                pixel = ALPHA_OPAQUE | pal[line[Math.floor(x / scale)]];
                ++pixel;
            }
        }
    }
}
