import { expect } from 'chai';
import { assert } from 'chai';
import { Tags } from '../src/Tags';

let TagsUnderTest: Tags;

describe('Tags.', function () {
  beforeEach(function () {
    TagsUnderTest = new Tags();
  });

  describe('TagFiles()', function () {

    it('allows to add a tag to a file', function () {
      let file1 = "my/file1.txt"
      let file2 = "my/file2.txt"
      let tag1 = "mytag"
      let tag2 = "myothertag"

      TagsUnderTest.TagFiles(file1, tag1);
      TagsUnderTest.TagFiles(file2, tag2);
      assert.deepEqual(TagsUnderTest.GetTags(file1), [tag1])
      assert.deepEqual(TagsUnderTest.GetTags(file2), [tag2])
    });

    it('allows to add multiple tags to a file', function () {
      let file1 = "my/file1.txt"
      let file2 = "my/file2.txt"
      let tag1 = "myfirsttag"
      let tag2 = "mysecondtag"
      let tag3 = "mythirdtag"


      TagsUnderTest.TagFiles(file1, [tag1, tag2]);
      TagsUnderTest.TagFiles(file2, [tag1, tag3]);
      assert.deepEqual(TagsUnderTest.GetTags(file1), [tag1, tag2])
      assert.deepEqual(TagsUnderTest.GetTags(file2), [tag1, tag3])
    });

    it('does not add a tag more than once to a file', function () {
      let file = "my/file.txt"
      let tag1 = "myfirsttag"
      let tag2 = "mysecondtag"
      let tag3 = "mysecondtag"

      TagsUnderTest.TagFiles(file, [tag1, tag2, tag3]);
      assert.deepEqual(TagsUnderTest.GetTags(file), [tag1, tag2])
    });

    it('allows to tag multiple files with a tag', function () {
      let file1 = "my/first/file.txt"
      let file2 = "my/second/file.txt"
      let tag = "myfirsttag"

      TagsUnderTest.TagFiles([file1, file2], tag);
      assert.deepEqual(TagsUnderTest.GetTags(file1), [tag])
      assert.deepEqual(TagsUnderTest.GetTags(file2), [tag])
    })

    it('allows to tag multiple files with multiple tags', function () {
      let file1 = "my/first/file.txt"
      let file2 = "my/second/file.txt"
      let tag1 = "myfirsttag"
      let tag2 = "mysecondtag"
      let tag3 = "mythirdtag"
      let tag4 = "myfourthtag"

      TagsUnderTest.TagFiles([file1, file2], [tag1, tag2, tag3, tag4]);
      assert.deepEqual(TagsUnderTest.GetTags(file1), [tag1, tag2, tag3, tag4])
      assert.deepEqual(TagsUnderTest.GetTags(file2), [tag1, tag2, tag3, tag4])
    });

  });

  describe('GetFiles()', function () {
    it('returns empty array when no tagged files', function () {
      assert.deepEqual(TagsUnderTest.GetFiles(), [])
    });

    it('returns all tagged files', function () {
      let file1 = "my/file/1.txt"
      let file2 = "my/file/2.txt"
      let file3 = "my/file/3.txt"
      let tag = "mytag"

      TagsUnderTest.TagFiles(file1, tag);
      TagsUnderTest.TagFiles(file2, tag);
      TagsUnderTest.TagFiles(file3, tag);
      assert.deepEqual(TagsUnderTest.GetFiles(), [file1, file2, file3])
    });
  })

  describe('GetTags()', function () {
    it('returns empty array when no tags exist', function () {
      assert.deepEqual(TagsUnderTest.GetTags(), [])
    })

    it('returns all existing tags', function () {
      let file1 = "my/first/file.txt"
      let file2 = "my/second/file.txt"
      let tag1 = "myfirsttag"
      let tag2 = "mysecondtag"
      let tag3 = "mythirdtag"
      let tag4 = "myfourthtag"

      TagsUnderTest.TagFiles(file1, [tag1, tag2]);
      TagsUnderTest.TagFiles(file2, [tag2, tag3, tag4]);
      assert.deepEqual(TagsUnderTest.GetTags(), [tag1, tag2, tag3, tag4])
    })
  })

  describe('UntagFiles()', function () {
    it('does nothing when file does not exist', function () {
      let file = "my/file/1.txt"
      TagsUnderTest.UntagFiles(file)
    })

    it('can remove a tag from a file', function () {
      let file = "my/file/1.txt"
      let tag1 = "myfirsttag"
      let tag2 = "mysecondtag"

      TagsUnderTest.TagFiles(file, tag1)
      TagsUnderTest.TagFiles(file, tag2)
      TagsUnderTest.UntagFiles(file, tag2)

      assert.deepEqual(TagsUnderTest.GetTags(), [tag1])
    })

    it('can remove all tags from a file', function () {
      let file = "my/file/1.txt"
      let tag1 = "myfirsttag"
      let tag2 = "mysecondtag"

      TagsUnderTest.TagFiles(file, tag1)
      TagsUnderTest.TagFiles(file, tag2)
      TagsUnderTest.UntagFiles(file, tag1)
      TagsUnderTest.UntagFiles(file, tag2)

      assert.deepEqual(TagsUnderTest.GetTags(), [])
      assert.deepEqual(TagsUnderTest.GetFiles(), [])
    })
  })
})