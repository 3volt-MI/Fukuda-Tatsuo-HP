# FUKUDA TATSUO — Underwater Photography

Next.js 14 (App Router) + microCMS で構築した水中写真家の個人サイト。

---

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、値を埋めます。

```bash
cp .env.local.example .env.local
```

| 変数名 | 説明 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスドメイン（例: `your-name`） |
| `MICROCMS_API_KEY` | microCMS の API キー（読み取り専用キー推奨） |
| `REVALIDATE_SECRET` | Webhook 認証用の任意の秘密文字列 |

### 3. 開発サーバー起動

```bash
npm run dev
```

`http://localhost:3000` で確認できます。

---

## microCMS API の作成手順

[microCMS](https://microcms.io) にログインし、以下の API を順番に作成してください。

### exhibition（リスト形式）

| フィールドID | 種別 | 必須 | 備考 |
|---|---|---|---|
| `title` | テキスト | ○ | 展示タイトル |
| `year` | テキスト | — | 開催年 |
| `order` | 数値 | — | 並び順（昇順） |

### gallery（リスト形式）

| フィールドID | 種別 | 必須 | 備考 |
|---|---|---|---|
| `image` | 画像 | ○ | |
| `caption` | テキスト | — | キャプション |
| `exhibition` | コンテンツ参照 → exhibition | ○ | |
| `takenAt` | 日時 | — | 撮影日時 |

### journal（リスト形式）

| フィールドID | 種別 | 必須 | 備考 |
|---|---|---|---|
| `title` | テキスト | ○ | |
| `slug` | テキスト | ○ | URLスラッグ（英数字・ハイフン） |
| `publishedAt` | 日時 | ○ | |
| `thumbnail` | 画像 | ○ | |
| `heroImage` | 画像 | — | 省略時は thumbnail を使用 |
| `excerpt` | テキストエリア | ○ | 一覧の概要文 |
| `body` | リッチエディタ | ○ | 記事本文 |

### statement（オブジェクト形式）

| フィールドID | 種別 |
|---|---|
| `heroImage` | 画像 |
| `lead` | テキストエリア |
| `body` | リッチエディタ |
| `signature` | テキスト |

### biography（オブジェクト形式）

| フィールドID | 種別 | 備考 |
|---|---|---|
| `portrait` | 画像 | |
| `name` | テキスト | |
| `role` | テキスト | |
| `lede` | テキストエリア | |
| `exhibitions` | 繰り返し | カスタムフィールド: `year`(テキスト), `text`(テキスト) |
| `awards` | 繰り返し | 同上 |
| `publications` | 繰り返し | 同上 |

### settings（オブジェクト形式）

| フィールドID | 種別 |
|---|---|
| `siteName` | テキスト |
| `heroCopy` | テキスト |
| `heroImage` | 画像 |
| `email` | テキスト |
| `instagram` | テキスト（URL） |
| `x` | テキスト（URL） |
| `facebook` | テキスト（URL） |

---

## デプロイ（Vercel）

1. GitHub にリポジトリを push
2. [Vercel](https://vercel.com) で "Import Project" → GitHub リポジトリを選択
3. 環境変数（`MICROCMS_SERVICE_DOMAIN`, `MICROCMS_API_KEY`, `REVALIDATE_SECRET`）を追加
4. デプロイ

---

## ISR / Webhook 設定

コンテンツを更新したときに即座にサイトへ反映させるには、microCMS の Webhook を設定します。

### Revalidate API を使う方法（推奨）

1. Vercel でデプロイ後、サイトの URL（例: `https://your-site.vercel.app`）を確認
2. microCMS 管理画面 → 各 API の設定 → **Webhook** → 新規追加
3. 以下の設定を入力:
   - **URL**: `https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET`
   - **イベント**: コンテンツの公開・更新・削除
   - **HTTPメソッド**: `POST`
4. API ごと（gallery, journal, statement, biography, settings）に Webhook を追加

`YOUR_SECRET` は `.env.local` の `REVALIDATE_SECRET` と同じ値を設定してください。

### Vercel Deploy Hook を使う方法（シンプル）

毎回フルビルドになりますが、設定が簡単です。

1. Vercel → プロジェクト設定 → **Git** → **Deploy Hooks** → フック URL を生成
2. microCMS Webhook の URL にそのまま貼り付け（`secret` パラメータ不要）

---

## 画像について

すべての写真は microCMS の画像 API 経由で配信されます。
アップロード推奨サイズ:

| 用途 | 推奨サイズ |
|---|---|
| Home ヒーロー | 1920 × 1080 以上 |
| Gallery 写真 | 長辺 2000px 以上 |
| Journal サムネイル | 1120 × 840 以上 |
| Journal ヒーロー | 1600 × 900 以上 |
| Biography ポートレート | 800 × 1000 以上 |
| Statement ヒーロー | 1920 × 1200 以上 |

フォーマットは JPEG または WebP を推奨。画像 API が自動でリサイズ・WebP 変換を行います。
