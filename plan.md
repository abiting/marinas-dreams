# 10eKokoro's Dream — 日文化與品牌更新

## 本次已確認需求
- 全站內容改為日文，包含既有 53 篇影評、首頁、自介、導覽、互動訊息、無障礙標籤與 SEO 欄位。
- 站名改為 `10eKokoro's Dream`；更新頁首、頁尾、圖片中的舊站名、搜尋分享 metadata 和結構化資料。
- 移除先前指定藝術家相關內容、名字由來及免責聲明，不把該段翻譯帶回網站。
- 保留現有影評頁網址；新版不存在的歷史頁面路徑 301 到首頁，不將有效文章轉址。
- 為未來 `https://10e.org/` 準備設定，但該網域尚未連接，不提前宣稱轉址或 canonical 已在該網域生效。

## 實作方式
使用既有 Node.js 無依賴靜態產生器與輕量 HTTP 伺服器；不加入資料庫、登入或額外 CMS。批次翻譯在 Sandbox 執行，使用結構化 JSON、適度並行、逐篇結果保存與段落數檢查；網站部署本身不呼叫模型。保留每篇六段正文、來源 URL、既有 slug、影片年份與原有立場。影片顯示名稱和導演名稱日文化，必要時保留原文名作搜尋匹配；不新增電影評分。

原有作者是使用者本人，日文顯示為「マリナ」。僅移除指定藝術家內容，不編造作者的新姓名、國籍或經歷。About 寫成日文並保留台灣、咖啡師、電影和創作筆記本的真實設定。頁尾 Abiting 連結保持 `https://abiting.cc`。

沿用米白、咖啡棕和剪報式排版；加上適合日文的明朝體與無襯線字型、日文斷行和行距，保留原攝影構圖，將橫幅舊站名替換為新品牌。

HTTP 伺服器對有效頁面回傳 200；未知公開頁面路徑回傳單跳 301 `Location: /`，清除歷史 query。站內靜態素材和系統端點的缺失仍回傳正確錯誤，以免把 API 或壞掉的素材當成成功頁面。可將 `.html`、WordPress 文章、舊資料夾等前站路徑導至首頁。

## 網域與部署限制
- 現在已發布的正式來源仍為 Manus 網域；`10e.org` 是待啟用的明確目標，而不是目前已接通的 canonical。
- 自訂網域接通後，用明確的 `PUBLIC_ORIGIN=https://10e.org` 建置選項或 `src/site.json` 的確認網域設定產生正式 canonical、og:url、schema ID、sitemap 和 robots。
- 已整合並保留使用者新增的 `.github/workflows/deploy.yml`，會將 `dist` 部署至 GitHub Pages。Pages 只能提供靜態檔案，不能自行回傳應用程式的真正 HTTP 301；若 `10e.org` 最後接到 Pages，需在 DNS/CDN/其他 HTTP 邊界實作相同轉址規則，而不是宣称 404 HTML 或 JavaScript 是 301。
- 不修改 DNS、不替使用者選擇未確認的網域供應商、不停用其部署流程。

## 專案結構
- `src/content.json`：日文自介、53 篇影評與每頁 metadata。
- `src/site.json`：目前確認的 canonical 来源、待啟用自訂網域與轉址設定。
- `scripts/build.mjs`：完整初始 HTML、日文 JSON-LD、路由清單與 SEO 文件。
- `scripts/serve.mjs`：200、301、400/404/405 等正確 HTTP 回應。
- `assets/styles.css`、`assets/main.js`：日文響應式排版、全文索引搜尋和分享訊息。
- `assets/banner.jpg`：保留原檔；新品牌橫幅另存，建置改用新檔。
- `scripts/check.mjs`：本次內容、SEO、轉址與品牌要求的現有檢查延伸。
- `README.md`：日文版編輯、建置與 `10e.org` 接通後切換說明。

## 實際部署後的必要修正

GitHub Pages 的實際來源目前是 `https://abiting.github.io/marinas-dreams/`，不是自訂網域根目錄。已確認原 root-relative CSS 與文章連結在此來源會回傳 404，因此建置增加明確 `BASE_PATH`，统一處理 HTML href/src、canonical、OG URL、作者 ID、route manifest 與 sitemap。GitHub Actions 在尚未指定自訂網域時使用 GitHub Pages origin 和 `/marinas-dreams`；未來接通 `10e.org`、設定 `PUBLIC_ORIGIN` 後，base path 为空。Webdev／本機仍採預設根路徑，不變動原影評 slugs 或 Node 301 規則。
