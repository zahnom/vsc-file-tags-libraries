export class Tags {
    private tags: Record<string, string[]> = {};

    TagFile(file: string, tags: string | string[]) {
        if (typeof tags == "string") {
            this.AddTagToFile(file, tags)
        }
        else {
            tags.forEach(t => this.AddTagToFile(file, t))
        }
    }

    GetFiles(): string[] {
        let allFiles: string[] = [];
        Object.entries(this.tags).forEach(([key, value]) => {
            allFiles.push(key)
        })
        return allFiles
    }

    GetTags(file: void | string): string[] {
        if (typeof file == "undefined") {
            return this.GetAllExistingTags()
        }
        else {
            return this.GetTagsOfFile(file)
        }
    }

    private AddTagToFile(file: string, tag: string) {
        if (this.tags[file] === undefined) {
            this.tags[file] = [];
        }
        if (!this.tags[file].includes(tag)) {
            this.tags[file].push(tag);
        }
    }
    private GetTagsOfFile(file: string): string[] {
        if (this.tags[file] === undefined) {
            return [];
        }
        return this.tags[file]
    }
    private GetAllExistingTags(): string[] {
        let allTags: string[] = [];
        Object.entries(this.tags).forEach(([key, value]) => {
            if (value.length > 0) {
                value.forEach(v => {
                    if (!allTags.includes(v)) { allTags.push(v); }
                });
            }
        });
        return allTags;
    }
}