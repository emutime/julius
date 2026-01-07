
export class map_data_t {
    public width: number = 0;
    public height: number = 0;
    public start_offset: number = 0;
    public border_size: number = 0;
    public constructor(...args: any[]) {
        args.length >= 1 && (this.width = args[0]);
        args.length >= 2 && (this.height = args[1]);
        args.length >= 3 && (this.start_offset = args[2]);
        args.length >= 4 && (this.border_size = args[3]);
    }
}

export const map_data: map_data_t = new map_data_t();