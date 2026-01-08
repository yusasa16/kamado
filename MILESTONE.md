# Milestone: v2.0.0

## Breaking Changes TODO

- [ ] `kamado/features` エクスポートを削除
  - `getBreadcrumbs` を `@kamado-io/page-compiler` に移動
  - `getNavTree` を `@kamado-io/page-compiler` に移動
  - `titleList` を `@kamado-io/page-compiler` に移動
  - `getTitle` を `@kamado-io/page-compiler` に移動
  - `getTitleFromStaticFile` を `@kamado-io/page-compiler` に移動
  - `CompilableFile` 型の再設計を検討

## Migration Guide

`kamado/features` からのインポートを `@kamado-io/page-compiler` に変更してください。

```diff
- import { getBreadcrumbs, getNavTree, titleList, getTitle } from 'kamado/features';
+ import { getBreadcrumbs, getNavTree, titleList, getTitle } from '@kamado-io/page-compiler';
```
