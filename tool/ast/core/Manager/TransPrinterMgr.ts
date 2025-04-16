

export class TransPrinterMgr {
    public static instance: TransPrinterMgr = new TransPrinterMgr();
    public m_advance: number = 0;
    public m_content: string[] = [];

    public addAdvance(advance: number): void {
        this.m_advance += advance;
    }

    public subAdvance(advance: number): void {
        this.m_advance -= advance;
    }

    public resetAdvance(): void {
        this.m_advance = 0;
    }

    public print(content: string): void {
        content.split('\n').forEach(line => {
            this.println(line);
        });
    }

    public println(line: string): void {
        this.m_content.push(' '.repeat(4 * this.m_advance) + line);
    }

    public getContent(): string {
        return this.m_content.join('\n');
    }
}