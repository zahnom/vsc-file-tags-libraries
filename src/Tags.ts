export class Tags {
    private tags: Record<string, string[]> = {};

    TagFiles(files: void | string | string[], tags: string | string[]) {
        let _files: string[]
        let _tags: string[]

        if (typeof files === "undefined") {
            _files = this.GetTaggedFiles();
        } else if (typeof files === "string") {
            _files = [files]
        } else if (Array.isArray(files)) {
            _files = files
        } else {
            _files = []
        }

        if (typeof tags === "string") {
            _tags = [tags]
        }
        else if (Array.isArray(tags)) {
            _tags = tags
        }
        else {
            _tags = []
        }

        this.AddTagsToFiles(_files, _tags)
    }

    GetTaggedFiles(tags: void | string | string[]): string[] {
        if (typeof tags === "undefined") {
            return this.GetAllTaggedFiles();
        } else if (typeof tags === "string") {
            return this.GetFilesWithTag(tags)
        } else if (Array.isArray(tags)) {
            return this.GetFilesWithTags(tags)
        } else {
            return []
        }
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

    private AddTagsToFiles(files: string[], tags: string[]) {
        files.forEach(f => {
            if (!this.IsFileTagged(f)) {
                this.tags[f] = [];
            }
            tags.forEach(t => {
                if (!this.tags[f].includes(t)) {
                    this.tags[f].push(t);
                }
            })
        })
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
    private GetFilesWithTag(tag: string): string[] {
        return this.GetFilesWithTags([tag])
    }
    private GetFilesWithTags(tags: string[]): string[] {
        let files: Set<string> = new Set()
        tags.forEach(tag => {
            Object.entries(this.tags).forEach(([file, tags]) => {
                const index = tags.indexOf(tag, 0);
                if (index > -1) {
                    files.add(file)
                }
            })
        });
        return Array.from(files);
    }
    private GetAllTaggedFiles(): string[] {
        let files: string[] = [];
        Object.entries(this.tags).forEach(([key, value]) => {
            files.push(key)
        })
        return files
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