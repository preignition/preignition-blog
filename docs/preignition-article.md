# preignition-article

**Mixins:** LitNotify, DefaultValueMixin, DoNotSetUndefinedValue

## Properties

| Property        | Attribute       | Type                   | Default     | Description             |
|-----------------|-----------------|------------------------|-------------|-------------------------|
| `article`       | `article`       | `object`               |             |                         |
| `articleId`     | `article-id`    | `String`               |             | the id of article       |
| `language`      | `language`      | `string`               |             |                         |
| `localeArticle` | `localeArticle` | `object`               |             |                         |
| `log`           | `log`           | `boolean`              |             | `log`  true to show log |
| `state`         | `state`         | `'published'\|'draft'` | "published" | article state to fetch  |

## Methods

| Method     | Type                           |
|------------|--------------------------------|
| `dispatch` | `(name: any): void`            |
| `get`      | `(path: any): any`             |
| `set`      | `(path: any, value: any): any` |
