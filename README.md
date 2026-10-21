# 10eKokoro's Dream

台湾の映画好きのバリスタ「マリナ」による、日本語の映画・映像・アートノートです。既存の 53 本の映画レビューと URL を保ったまま、日本語に翻訳し、サイト名と共有画像を更新しています。紙のようなアイボリー、コーヒーブラウン、スクラップブックの雰囲気は引き継いでいます。

## 開発・ビルド

Node.js 22 以上を使用します。実行・ビルドに外部パッケージは不要です。

```sh
npm run dev
npm run build
npm run check
```

開発サーバーは `0.0.0.0:3000` で待ち受けます。`dist/` は各ページの本文を含む静的 HTML で、JavaScript を実行しなくても記事を読めます。

## コンテンツと構成

`src/content.json` に日本語のプロフィール、104 本のレビュー、タイトル、説明、参照資料の表示名を保存しています。各レビューは 6 段落で、元の記事 URL、映画の年、参照 URL は維持しています。`subtitle` は一覧や見出しに使う日本語の副題です。`originalTitle` は検索補助として原題を保持しますが、英語の旧本文は公開しません。

`scripts/build.mjs` は日本語のページ、`Person` と `Article` の JSON-LD、Open Graph / Twitter metadata、`manus-routes.json`、sitemap と robots を生成します。`assets/styles.css` は日本語の組版、`assets/main.js` は検索とリンク共有を担当します。元の写真は `assets/banner.jpg` に保持し、新ブランド画像は `assets/banner-kokoro.jpg` を使用します。

## 公開 URL と 10e.org

現在の確定済み公開 origin は `src/site.json` の `publicOrigin` です。`pendingOrigin` の `https://10e.org` は今後接続する予定のドメインであり、この設定だけでは DNS、HTTPS 証明書、ドメイン接続は変更されません。未接続のドメインを、現在の canonical として使用しません。

`10e.org` を実際に接続し、DNS と HTTPS が確認できた後で、次の明示的な設定を使ってビルドします。

```sh
PUBLIC_ORIGIN=https://10e.org npm run build
PUBLIC_ORIGIN=https://10e.org npm run check
```

または `src/site.json` の `publicOrigin` を確認済みの `https://10e.org` に変更します。その後、GitHub にチェックポイントを保存し、対象ホスティングへ公開します。canonical、og:url、作者 ID、sitemap、robots は設定された同じ origin で作成されます。実行時の内部 Host から SEO 用 URL を推測しません。

## 旧リンクの HTTP 301

ユーザーが確認した方針は、「既存の有効なレビュー URL は残し、新しいサイトに存在しない旧 URL をトップページへ転送する」です。`scripts/serve.mjs` を使う Webdev / Node 公開では、存在しない公開ページや旧ファイル URL は 1 回の HTTP 301 と `Location: /` でトップへ移動します。旧 URL の query は引き継ぎません。トップ自身と既存ページは 200 を返し、ループを作りません。

新サイトの静的アセット、API、プラットフォーム用パス、SEO 文書、health は通常の処理を維持します。アセットや API の不足を「ページ移動」として隠しません。転送の有効・無効は `src/site.json` の `legacyRedirects.enabled` で指定します。

## GitHub Pages を使う場合の重要な制約

ユーザーが追加した `.github/workflows/deploy.yml` は保持しており、`dist/` を GitHub Pages に配置します。GitHub Pages は静的ホスティングなので、Node の HTTP 301 処理は実行しません。`404.html` や JavaScript / meta refresh は、本物の HTTP 301 の代わりにはなりません。

`10e.org` を GitHub Pages に向ける場合は、Cloudflare Worker などの HTTP エッジ、または転送を設定できる別のホストで同じルールを実装してください。その場合も、有効なレビュー、アセット、sitemap、robots を除外し、存在しない旧 URL だけを `https://10e.org/` に 301 で送ります。DNS/CDN 管理権限と実際のホスティング先を確認してから適用します。

このリポジトリを更新しただけで、`10e.org` の 301 が有効になったとは見なしません。Webdev 公開と GitHub Pages 公開は別の配置先です。

## ページと参照

トップ `/`、レビュー一覧 `/film-reviews/`、プロフィール `/about-marina/`、53 本の記事 URL を維持しています。全ページは日本語で、作者は共有の `Person`、各レビューはその作者を参照する `Article` です。架空の評価点は加えません。Abiting への制作・運営クレジットと、ミュウツーの指定資料 URL は保持しています。

## GitHub Actions の origin 設定

既存の Pages ワークフローには Repository variable `PUBLIC_ORIGIN` を読む設定を追加しています。`10e.org` の接続と HTTPS が確認できた後、その変数を `https://10e.org` に設定すると、次のビルドからそのドメインの canonical と sitemap を生成できます。未設定時は `src/site.json` の確定済み origin を使用します。この変数は DNS 接続や HTTP 301 を自動設定するものではありません。

## Pages のサブディレクトリ

自前のドメインが未接続の場合、GitHub Pages は `https://abiting.github.io/marinas-dreams/` に公開します。ワークフローは `PUBLIC_ORIGIN=https://abiting.github.io` と `BASE_PATH=/marinas-dreams` を使用し、リンク、画像、作者 ID、canonical、sitemap、route manifest をその配置先に合わせます。ローカルと Webdev のビルドはデフォルトで根パスです。

Repository variable `PUBLIC_ORIGIN` を接続確認済みの `https://10e.org` に設定すると、Pages の次のビルドでは `BASE_PATH` を空にし、カスタムドメインの根パスを使用します。これだけでドメイン接続や 301 が設定されるわけではありません。GitHub canonical のプロジェクトは現在 Webdev 公開 API では publish できないため、Webdev の公開更新は Dashboard から行います。

## コナンと欧米ゴースト映画の追加

2026年10月21日、劇場版『名探偵コナン 黒鉄の魚影』と欧米の幽霊・怪談映画10本を追加し、計104本・107公開ページになりました。コナンのレビューは指定の柯哀フォーラム記事を参考資料として明記し、公式作品資料と監督インタビューも参照しています。鬼映画は「欧米ゴースト映画10選」、コナンは「名探偵コナン映画ノート」のラベルで検索できます。

新しい欧米作品の年は日本公開年ではなく、本国での原版初公開年です。作品情報の「公開年」と「版」に基準を示しています。既存93本のデータとURLは維持し、すべてのレビューに記事末尾のサイトバナーがあります。
