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

    UntagFiles(file: string, tag: void | string) {
        if (!this.IsFileTagged(file)) return

        if (typeof tag == "string") {
            this.RemoveTagFromFile(file, tag)
        }
    }

    private AddTagToFile(file: string, tag: string) {
        if (!this.IsFileTagged(file)) {
            this.tags[file] = [];
        }
        if (!this.tags[file].includes(tag)) {
            this.tags[file].push(tag);
        }
    }
    private RemoveTagFromFile(file: string, tag: string) {
        if (!this.IsFileTagged(file)) return

        const index = this.tags[file].indexOf(tag, 0);
        if (index > -1) {
            this.tags[file].splice(index, 1);
        }

        if (this.tags[file].length == 0) {
            delete this.tags[file]
        }
    }
    private IsFileTagged(file: string): boolean {
        if (this.tags[file] === undefined) return false
        else if (this.tags[file].length == 0) return false
        else return true
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