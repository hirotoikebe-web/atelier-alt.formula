# atelier alt.formula Official Website
Silent Archive / Material Archaeology / Cinematic Motion Edition

このフォルダは、GitHub Pages でそのまま公開できる HTML / CSS / Vanilla JavaScript のポートフォリオサイトです。React、Next.js、Vue、WordPress は使っていません。

## 1. ファイル構成

```
/
├── index.html
├── about.html
├── archives.html
├── projects.html
├── research.html
├── news.html
├── contact.html
├── style.css
├── main.js
├── content.js
├── README.md
├── sitemap.xml
├── robots.txt
└── assets/
    ├── images/
    ├── videos/
    ├── icons/
    └── logos/
```

## 2. GitHub Pages で公開する方法

1. GitHub にログインします。
2. 新しいリポジトリを作成します。例：`atelier-alt-formula.github.io`。
3. このフォルダ内のファイルをすべてリポジトリ直下にアップロードします。
4. GitHub の `Settings` → `Pages` を開きます。
5. `Build and deployment` の `Source` を `Deploy from a branch` にします。
6. `Branch` を `main`、フォルダを `/root` にします。
7. `Save` を押します。
8. 数分後に `https://ユーザー名.github.io/リポジトリ名/` で公開されます。

## 3. 画像の追加方法

画像はすべて `assets/images/` に入れてください。

推奨設定：

- 横長画像：幅 2000px 以下
- 縦長画像：高さ 2400px 以下
- WebP または圧縮 JPEG 推奨
- 1枚あたり 300KB〜800KB 程度
- ファイル名は半角英数字、小文字、ハイフン推奨

例：

```
technofossil-01.jpg
technofossil-02.jpg
technofossil-03.jpg
```

## 4. 10枚以上の画像を追加する方法

`content.js` を開き、追加したいプロジェクトの `images` 配列に画像パスを追加します。

```js
images: [
  "assets/images/technofossil-01.jpg",
  "assets/images/technofossil-02.jpg",
  "assets/images/technofossil-03.jpg"
]
```

20枚、30枚に増えても表示できます。スマホでは自動的に1カラムになります。

## 5. 文章やプロジェクトを更新する方法

`content.js` の中に、下記の配列があります。

- `projects`：Projects ページ
- `archives`：Archives ページ
- `research`：Research ページ
- `news`：News ページ
- `specimens`：Technofossil Archive の標本カード
- `members`：Technofossil Archive のチーム
- `publications`：Press / Awards / Publications

不明な情報は推測で埋めず、`TBD` または空欄のままにしてください。

## 6. News の追加方法

`content.js` の `news` 配列に以下の形式で追加します。

```js
{
  titleEN: "News title in English",
  titleJP: "日本語タイトル",
  media: "Media Name",
  project: "Related Project",
  related: ["Press"],
  year: "2026",
  bodyEN: "English body text.",
  bodyJP: "日本語本文。",
  link: ""
}
```

リンクが不明な場合は `link: ""` のままで大丈夫です。

## 7. Research の追加方法

`research` 配列に追加します。参考文献が未確認の場合は `TBD` にしてください。

```js
{
  title: "Research Title",
  category: "Material Study",
  image: "assets/images/research-01.jpg",
  descriptionEN: "English description.",
  descriptionJP: "日本語説明。",
  references: ["TBD"],
  related: ["Technofossil Archive"]
}
```

## 8. Specimen の追加方法

Technofossil Archive の標本は `specimens` 配列に追加します。

```js
{
  archiveCode: "TA-2026-003",
  objectName: "Object Name",
  image: "assets/images/technofossil-03.jpg",
  material: "TBD",
  size: "TBD",
  weight: "TBD",
  collectionSite: "TBD",
  collectionDate: "TBD",
  processingMethod: "Heat Shrink Encapsulation / Flocking",
  preservationStatus: "Prototype",
  estimatedDecomposition: "Under Research",
  carbonFootprint: "Under Research",
  relatedMemory: "TBD",
  notes: ""
}
```

炭素排出量や推定分解年数は、根拠のある数値がない限り `Under Research` のままにしてください。

## 9. モーションを弱くする方法

`style.css` の `.reveal` や `.image-mask` の `transition-duration` を短くします。

例：

```css
.reveal { transition-duration: .8s; }
```

## 10. モーションを完全にオフにする方法

`style.css` の最後にある `@media (prefers-reduced-motion: reduce)` が、OS 側で「視差効果を減らす」を設定した人向けに自動でモーションを止めます。

全員に対して完全に止めたい場合は、以下を `style.css` の最後に追加します。

```css
.reveal,
.reveal-text,
.reveal-title,
.reveal-image,
.reveal-caption,
.stagger-item,
.image-mask,
.slow-fade,
.motion-word,
.motion-line {
  opacity: 1 !important;
  transform: none !important;
  filter: none !important;
  clip-path: none !important;
}
```

## 11. Lightbox の使い方

ギャラリー画像をクリックすると拡大表示されます。

- 画面右上の `Close` で閉じる
- 背景をクリックして閉じる
- キーボードの `ESC` で閉じる

## 12. SEO 設定方法

各 HTML の `<title>` と `<meta name="description">` を編集してください。
公開URLが決まったら `sitemap.xml` 内の URL も実際のURLに置き換えてください。

## 13. よくあるエラーと対処法

### 画像が表示されない
- `assets/images/` に画像が入っているか確認
- `content.js` のファイル名と実際のファイル名が一致しているか確認
- 大文字小文字の違いに注意

### GitHub Pages でCSSが反映されない
- `style.css` がリポジトリ直下にあるか確認
- HTML の `<link rel="stylesheet" href="style.css">` が消えていないか確認

### News の日本語切り替えが動かない
- `main.js` と `content.js` が読み込まれているか確認
- ブラウザの開発者ツールでエラーを確認

### スマホで重い
- 画像サイズを圧縮してください
- 1枚300KB〜800KB程度を目安にしてください
- 使わない画像を `content.js` の `images` 配列から外してください

## 14. 個人情報について

旧ポートフォリオに含まれていた住所・電話番号などは、このサイトには掲載していません。Contact には Email と Instagram のみを掲載しています。
