export const CHANNEL_FILENAME_MAX = 32;

export function sound_device_open(): void {}
export function sound_device_close(): void {}

export function sound_device_init_channels(num_channels: number, filenames: string[][]): void {}
export function sound_device_is_channel_playing(channel: number): number { return 0; }

export function sound_device_set_music_volume(volume_pct: number): void {}
export function sound_device_set_channel_volume(channel: number, volume_pct: number): void {}

export function sound_device_play_music(filename: string, volume_pct: number): number { return 0; }
export function sound_device_play_file_on_channel(filename: string, channel: number, volume_pct: number): void {}
export function sound_device_play_channel(channel: number, volume_pct: number): void {}
export function sound_device_play_channel_panned(channel: number, volume_pct: number, left_pct: number, right_pct: number): void {}
export function sound_device_stop_music(): void {}
export function sound_device_stop_channel(channel: number): void {}

/**
 * Use a custom music player, for external music data (e.g. videos)
 * @param bitdepth Bitdepth, either 8 or 16
 * @param num_channels Number of channels, 1 = mono, 2 = stereo
 * @param rate Frequency, usually 22050 or 44100
 * @param data First chunk of music data
 * @param len Length of data
 */
export function sound_device_use_custom_music_player(bitdepth: number, num_channels: number, rate: number, data: number[], len: number): void {}

/**
 * Writes custom music data
 * @param data Music data
 * @param len Length
 */
export function sound_device_write_custom_music_data(data: number[], len: number): void {}

export function sound_device_use_default_music_player(): void {}
