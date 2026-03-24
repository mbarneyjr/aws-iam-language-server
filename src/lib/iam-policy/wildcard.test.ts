import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { expandActionPattern, wildcardToRegExp } from './wildcard.ts';

describe('wildcardToRegExp', () => {
  it('matches exact string', () => {
    const re = wildcardToRegExp('s3:GetObject');
    assert.ok(re.test('s3:GetObject'));
    assert.ok(!re.test('s3:GetObjectAcl'));
  });

  it('matches * as any characters', () => {
    const re = wildcardToRegExp('s3:Get*');
    assert.ok(re.test('s3:GetObject'));
    assert.ok(re.test('s3:GetBucketPolicy'));
    assert.ok(!re.test('s3:PutObject'));
  });

  it('matches ? as single character', () => {
    const re = wildcardToRegExp('s3:Get?bject');
    assert.ok(re.test('s3:GetObject'));
    assert.ok(!re.test('s3:GetBucketPolicy'));
  });

  it('is case-insensitive', () => {
    const re = wildcardToRegExp('S3:getobject');
    assert.ok(re.test('s3:GetObject'));
  });

  it('escapes regex metacharacters', () => {
    const re = wildcardToRegExp('s3:Get.Object');
    assert.ok(!re.test('s3:GetXObject'));
    assert.ok(re.test('s3:Get.Object'));
  });
});

describe('expandActionPattern', () => {
  it('returns exact match for bare action', () => {
    const result = expandActionPattern('s3:GetObject');
    assert.deepEqual(result, ['s3:GetObject']);
  });

  it('returns [] for nonexistent bare action', () => {
    const result = expandActionPattern('nonexistent:Foo');
    assert.deepEqual(result, []);
  });

  it('expands s3:Get* to multiple actions', () => {
    const result = expandActionPattern('s3:Get*');
    assert.ok(result.length > 1);
    assert.ok(result.includes('s3:GetObject'));
    assert.ok(result.includes('s3:GetBucketPolicy'));
    assert.ok(!result.some((a) => !a.toLowerCase().startsWith('s3:get')));
  });

  it('expands s3:* to all s3 actions', () => {
    const result = expandActionPattern('s3:*');
    assert.ok(result.length > 10);
    assert.ok(result.every((a) => a.startsWith('s3:')));
  });

  it('expands * to all actions', () => {
    const result = expandActionPattern('*');
    assert.ok(result.length > 100);
  });

  it('handles ? wildcard', () => {
    const result = expandActionPattern('s3:Get?bject');
    assert.ok(result.includes('s3:GetObject'));
    assert.ok(!result.includes('s3:GetBucketPolicy'));
  });
});
