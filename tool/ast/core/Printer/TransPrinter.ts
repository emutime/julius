

export default class TransPrinter {
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

    public printStr(str: string): void {
        if (this.m_content.length === 0) {
            this.m_content.push(' '.repeat(4 * this.m_advance));
        }
        this.m_content[this.m_content.length - 1] += str;
    }

    public getContent(): string {
        return this.m_content.join('\n');
    }
}