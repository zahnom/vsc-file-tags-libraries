export class Tags {
    private tags: Record<string, string[]> = {};

    TagFile(file: string, tags: string | string[]) {
        if (typeof tags == "string") {
            this.AddTag(file, tags)
        }
        else {
            tags.forEach(t => this.AddTag(file, t))
        }
    }

    GetTags(file: string): string[] {
        if (this.tags[file] === undefined) {
            return [];
        }
        return this.tags[file]
    }

    private AddTag(file: string, tag: string) {
        if (this.tags[file] === undefined) {
            this.tags[file] = [];
        }
        if (!this.tags[file].includes(tag)) {
            this.tags[file].push(tag);
        }
    }
}