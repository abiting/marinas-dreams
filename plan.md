# 10eKokoro's Dream — 日文化與品牌更新

## 本次已確認需求
- 全站內容改為日文，包含既有 53 篇影評、首頁、自介、導覽、互動訊息、無障礙標籤與 SEO 欄位。
- 站名改為 `10eKokoro's Dream`；更新頁首、頁尾、圖片中的舊站名、搜尋分享 metadata 和結構化資料。
- 移除先前指定藝術家相關內容、名字由來及免責聲明，不把該段翻譯帶回網站。
- 保留現有影評頁網址；新版不存在的歷史頁面路徑在 Node HTTP 伺服器中 301 到首頁，不將有效文章轉址。
- 為未來 `https://10e.org/` 準備設定，但該網域尚未連接，不提前宣稱轉址或 canonical 已在該網域生效。

## 實作方式
使用既有 Node.js 無依賴靜態產生器與輕量 HTTP 伺服器；不加入資料庫、登入或額外 CMS。保留既有 53 篇日文影評的六段正文、來源 URL、既有 slug、影片年份與原有立場。影片顯示名稱和導演名稱日文化，必要時保留原文名作搜尋匹配；不新增電影評分。

作者公開顯示名依使用者後續指示為「10eKokoro」。About 寫成日文並保留已提供的台灣出身、咖啡師、電影和創作筆記本設定；不增添其他個人資料。頁尾 Abiting 連結保持 `https://abiting.cc`。

沿用米白、咖啡棕和剪報式排版；加上適合日文的明朝體與無襯線字型、日文斷行和行距，保留原攝影構圖，將橫幅舊站名替換為新品牌。

HTTP 伺服器對有效頁面回傳 200；未知公開頁面路徑回傳單跳 301 `Location: /`，清除歷史 query。站內靜態素材和系統端點的缺失仍回傳正確錯誤，以免把 API 或壞掉的素材當成成功頁面。可將 `.html`、WordPress 文章、舊資料夾等前站路徑導至首頁。

## 網域與部署限制
- 現在已發布的正式來源仍為 Manus 網域；`10e.org` 是待啟用的明確目標，而不是目前已接通的 canonical。
- 自訂網域接通後，用明確的 `PUBLIC_ORIGIN=https://10e.org` 建置選項或 `src/site.json` 的確認網域設定產生正式 canonical、og:url、schema ID、sitemap 和 robots。
- GitHub Pages 的既有部署流程會將 `dist` 部署成靜態檔案，不能自行回傳真正 HTTP 301。若 `10e.org` 最後接到 Pages，需在 DNS/CDN／其他 HTTP 邊界實作相同轉址規則，而不是宣稱 404 HTML 或 JavaScript 是 301。
- 不修改 DNS、不替使用者選擇未確認的網域供應商、不停用其部署流程。

## 專案結構
- `src/content.json`：日文自介、累計 130 篇影評與每頁 metadata。
- `src/site.json`：目前確認的 canonical 来源、待啟用自訂網域與轉址設定。
- `scripts/build.mjs`：完整初始 HTML、日文 JSON-LD、路由清單與 SEO 文件。
- `scripts/serve.mjs`：200、301、400/404/405 等正確 HTTP 回應。
- `assets/styles.css`、`assets/main.js`：日文響應式排版、全文索引搜尋和分享訊息。
- `assets/banner.jpg`：保留原檔；新品牌橫幅另存，建置改用新檔。
- `scripts/check.mjs`：內容、SEO、轉址與品牌要求的自動檢查。
- `README.md`：日文版編輯、建置與 `10e.org` 接通後切換說明。

## 實際部署後的必要修正
GitHub Pages 的來源為 `https://abiting.github.io/marinas-dreams/`，不是自訂網域根目錄。建置流程使用明確 `BASE_PATH` 統一處理 HTML href/src、canonical、OG URL、作者 ID、route manifest 與 sitemap。GitHub Actions 在尚未指定自訂網域時使用 GitHub Pages origin 和 `/marinas-dreams`；未來接通 `10e.org`、設定 `PUBLIC_ORIGIN` 後，base path 為空。Webdev／本機仍採預設根路徑，不變動原影評 slugs 或 Node 301 規則。

## 新增日本經典恐怖電影影評系列（本次請求）
新增 20 篇自然日文、獨立資料查證的長篇影評，涵蓋日本怪談／幽靈電影、怪獸科幻恐怖、身體與實驗電影、1990 年代末 J-horror、心理恐怖與偽紀錄片。片單涵蓋 1953–2005 年；年份統一使用來源確認的日本首次劇場公開年份。部分作品的常見製作年／國際上映年不同，研究紀錄保留差異理由，新 slug 使用已核實的日本院線年。每篇有獨立 SEO、一個副題、兩個不同的 section heading、六段約 1,500–2,100 日文字符評論及 2–4 條能支援正文的來源。創作重點為影像、聲音、節奏、恐怖方法和主題詮釋，不虛構作者本人的私人觀影經歷、評分、未獲來源支持的細節或劇透。

保留原有 53 篇、恐怖系列 20 篇與其所有 slug／正文；成人電影系列另加 20 個獨立 slug，按核實後日本公開年排列，總數現為 93 篇。首頁精選、可搜尋影評索引與可見的「日本ホラー名作20選」系列標籤、每篇 canonical／Open Graph／Twitter metadata、共同的 `Person`（10eKokoro）與 `Article` JSON-LD、`manus-routes.json`、sitemap 對新增頁同步擴充。保留目前 Pages `/marinas-dreams/` base path 與網站將來切換 10e.org 根路徑的做法；新長內容仍使用完整 HTML，網站不新增資料庫或 CMS。

## 新增日本成人電影評論 20 篇（2026-10-21）
使用者要求再增加 20 部經典日本成人三級片。本次以日本成人電影史及藝術電影評論處理，涵蓋成人向藝術電影、粉紅電影與日活 Roman Porno；不把香港「三級」誤當日本的統一分級，不編造 Eirin／香港分級或各地合法性。評論保持分析性、非露骨，不加入情色圖像、性行為細節、觀看或下載成人影片的連結；涉及暴力或強迫情节時，以批判性、非圖像化方式討論。

網站仍使用日文；每篇約 1,500–2,100 日文字符、六段、兩個小標與 2–3 個可靠來源，著重構圖、聲音、敘事、權力、社會背景及電影史。片名、導演、版本和年份採查核後日本首次劇場公開資料，分類依資料來源。新增獨立 slug，保留所有既有 73 篇資料不變；Article 共用 Person、canonical、OG、Twitter、路由及 sitemap 隨新增內容更新。新系列標籤為「日本の成人向け映画史20選」，文章附非露骨的成人題材提醒；不額外新增成人片圖像。全站每篇文章的最下方顯示現有網站 banner，提供描述性日文 alt、影像原始寬高、響應式寬度與 lazy loading。沿用 GitHub Pages 原有工作流程與子目錄，完成後預期為 93 篇評論與 96 個公開頁。10e.org 仍為待啟用網域，不改 DNS 或既有轉址邏輯。

## 《黑鐵的魚影》與歐美鬼片 11 篇（2026-10-21）
新增一篇 2023 年《名探偵コナン 黒鉄の魚影》日文影評，參考資料必須包含並在正文適當引用 `https://coai.abiting.cc/archives/1190`，另以官方或可靠電影來源核對劇情、導演與上映資料。使用者提供的文章作為有署名的參考觀點，不照抄、不把其主張寫成官方定論。

另增十篇歐美經典鬼片，選片重點為幽靈、鬼屋、靈異感知和怪談，包含《The Uninvited》（1944）、《The Innocents》（1961）、《The Haunting》（1963 原版）、《The Changeling》（1980 加拿大鬼片）、《The Shining》（1980）、《Poltergeist》（1982 原版）、《The Sixth Sense》（1999）、《The Others》（2001）、《The Devil's Backbone》（2001）和《The Orphanage》（2007）。日文正式片名、導演、版本及最初本國院線公開年由獨立研究核實，避免與日本上映年、影展年、重拍年混用；《黑鐵的魚影》使用日本首次公開年。系列名為「欧米ゴースト映画10選」。

每篇沿用現有六段、兩個小標、約 1,500–2,100 日文字符、獨立 SEO title、50–160 字摘要、主題、副標與 2–4 個全文讀取來源；評論以影像、聲音、情緒、電影史和主題為核心，不披露重要反轉或犯人，不虛構作者私人經歷。保留既有 93 篇所有內容欄位與網址。新增十一篇後共 104 篇影評、107 個公開頁，每篇保留文章尾端 banner、共用 Person 與 Article、canonical、OG、Twitter、manifest 和 sitemap。仍以 GitHub Pages `/marinas-dreams/` 發布，不修改 DNS、不提前切換 10e.org。


## 《無界之界》（2023）單篇紀錄片評論
- 延續現有日文完整 HTML、Article／Person 結構化資料、SEO、canonical、OG、Twitter、manifest、sitemap、共用文章尾端 banner 和 GitHub Pages 子路徑。
- 新增一篇日文評論，影評對象為德化白瓷紀錄電影《無界之界》（原名「无界之界」）。官方資料記載2023-09-25殺青、2025年在中國正式上映；文章以2025年作公映年，並明確提及2023年拍攝完成。
- 使用官方德化縣政府、福建東南網與中新網福建來源核實拍攝完成年、導演與2025年上映；博物館／陶瓷背景來源只用於通史觀點；文章為原創分析，不假裝曾觀看無法取得的影片，不編造場景。
- 陶瓷延伸閱讀目前使用 https://cpaceramics.com/blog/chinese-ceramics/，標題為 Ceramics Practice Alliance「Chinese ceramics: the reason we call it china」；使用者於2026-10-29更正先前URL中多打一個 m，標題保持英文原文。
- 影評以日文約 1,500–2,100 字、六段與兩個小標撰寫，提供符合既有品牌與 SEO 的日文題目、副題、摘要、關鍵字；舊有104篇文章和slug不變。


## 作者公開名更新
將全站作者可見名稱及 `Person.name` 設為「10eKokoro」，同步 About、首頁、導覽、文章署名及作者卡片；About新URL為 `/about-10ekokoro/`，舊 `/about-marina/` 從 route manifest、canonical 和 sitemap 移除，105篇影評 URL 保持不變；GitHub Pages 無法設定真實HTTP301，Node/Webdev未知舊路徑仍依既有規則301至首頁。重新產生每頁初始 HTML、Person/Article JSON-LD、網站地圖及route manifest，透過既有 GitHub Pages 工作流程發布。


## Inception BFI 引用網址更新
只修改 `inception-review` 的 BFI 來源網址：由 `https://www.bfi.org.uk/film/7666aa5b-0e00-50bc-8814-0028479d8767/inception` 改為使用者指定的 `https://abiurl.me/VdCbIO`；保留來源標題、來源ID、影評正文、其他來源、路由與網站SEO設定。重新建置靜態頁面，更新內容檢查並透過既有 GitHub Pages 工作流程發布。


## 歐洲電影三系列新增評論
新增10篇歐洲大陸鬼／超自然怪異電影、5篇歐洲大陸愛情電影及5篇歐洲大陸限制級動作電影，逐篇獨立核實片名、年份、導演與製作國，先排除現有105篇重複作品。每篇以日文撰寫，沿用六段、兩個小標及約1,400–1,650字、與現有影評相當的文章格式，提供逐頁SEO、3–8個中長尾關鍵字和2–4個可追溯來源。成人限制級系列需引用國家／地區分級機構，記錄確切版次與年齡分級；國別分級不一律等同美國R級或其他單一制度。歐洲範圍以歐洲大陸製作為主，排除英國、愛爾蘭主導作品。維持日文網站與既有105篇文章內容及slug；新增三個系列標籤和簡短分級差異提示，最後預期為125篇評論、128個公開路由，沿用現有GitHub Pages子路徑發布。


## 台灣角頭／幫派電影新增5篇（2026-10-29）
延續網站日文內容，先以電影史與台灣影視資料來源選出5部具代表性的台灣角頭／幫派電影，逐片核對正式片名、年份、導演及是否取材真人真事，排除現有125篇重複作品。每篇依現有格式撰寫約500–800日文字、六段與兩個小標，附2–4個可追溯來源、獨立SEO標題與中長尾關鍵字。對真人原型與虛構角色作清楚區分，不把電影橋段當成史實、不浪漫化犯罪或提供實務犯罪資訊。以系列「台湾ギャング映画名作5選」加入索引和搜尋；保留既有文章與網址，新增後為130篇評論、133個公開頁，沿用現有GitHub Pages自訂網域發布。

目前部署狀態補充：使用者已接通 `https://10e.org/`，GitHub Pages 工作流程以 `PUBLIC_ORIGIN=https://10e.org` 與根路徑建置，覆蓋上述歷史階段的待連接／子目錄說明。無新內容可對應的舊 `/mt2/archives/*` 在正式 Pages 站維持真正404；本次不修改部署流程、DNS或舊Node的轉址程式。新影評沿用每篇獨立的修改日期，避免Article.dateModified早於datePublished。


## 全站參考資料標題原文化（2026-10-29）
使用者要求參考資料顯示來源頁本身的原文標題，不再把中文或其他語言題名翻成日文。更正《名偵探柯南 黑鐵的魚影》影評中的柯哀論壇來源標題，並以有界並行方式盤點全部 130 篇評論中的來源 URL 及現存 title 標籤／og:title／頁面標題；逐一檢視語言疑似不符項目，只依可讀到的來源頁原文修正，無法讀取時保留原資料並註明未核實，不猜測，不改來源 URL、文章內容、引用 ID 或既有文章 slug。網站維持日本語內容，分享／參考資料標題依來源原文語言呈現。

實作結果：檢查 343 筆引用列、342 個唯一來源 URL；將 318 個有直接可歸屬頁面標題差異的 URL 修正為原頁標題，共變更 319 筆 `sources[].title`。17 個無法由頁面直接確認標題的來源維持原標籤；其中陶瓷文章 URL 先前為 `cpaceramics.comm`，於後續依使用者更正為 `.com`，其標題維持英文原文。workflow 的 99 個補查項目全部按 index／URL 重新對位，其中 96 項直接核實、3 項未核實；兩筆錯配結果不採用，改由預期來源頁直接核實。回歸檢查覆蓋繁中 CoAi、簡中《無界之界》、英文 Inception、德文 FSK 來源；基線比較確認來源 URL、ID、正文、slug、metadata 等非 title 資料完全不變。以 `PUBLIC_ORIGIN=https://10e.org` 建置並執行 `npm run check`，130 篇影評、133 條 route manifest 與 133 筆 sitemap 均通過。GitHub Pages commit `09222b7` 由 workflow `40807054519` 成功部署；正式 `10e.org` 上直接驗證 CoAi、《無界之界》、Inception、Sisu FSK 頁面與指定引用均正確，130 篇評論 route 及 3 個工具 route 共 133 條，sitemap 的 133 筆 URL 與 manifest 完全一致，robots／canonical 均使用 `https://10e.org`。

## 舊 iTunes 頁面單一路徑 HTTP 301 與陶瓷引用 URL 更正（2026-10-29）
使用者最初指定只把 `http://10e.org/mt2/archives/201002/282300.php` 導向 `https://app.abiting.cc/archives/tag/apple-music`，因為舊頁內容是 iTunes、與 Apple Music 有關；當時所有其他失效頁必須繼續回 HTTP 404，之後只有使用者明確指定的第二條路徑例外。`10e.org` 經 Cloudflare proxy，原站由 GitHub Pages 靜態提供。Cloudflare 官方 [Single Redirects API 文件](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-api/) 說明規則可設靜態目標與 301，且需要 Cloudflare proxy；[Single Redirects settings 文件](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/)列出 redirect 設定，另有 [dashboard 指引](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-dashboard/)。

Cloudflare 原本沒有 `http_request_dynamic_redirect` entrypoint ruleset。只新增一個 zone-level ruleset 及一條啟用中的規則，不修改既有 managed rulesets。表達式精確限定 `http.host eq "10e.org" and http.request.uri.path eq "/mt2/archives/201002/282300.php"`；靜態目標為指定的 `app.abiting.cc` 頁面，狀態碼 301，`preserve_query_string=false`，不使用通配符。以 dry run 驗證後建立。建立前目標及相鄰舊頁均為 404；建立後，HTTP 與 HTTPS 來源各回 301 且 Location 正確，query 測試不傳遞，相鄰頁與尾斜線變體仍回 404，redirect 目標回應 200。Cloudflare Full Access OAuth 在全部轉址完成後已由 Manus logout 清除 token；若 Cloudflare 的 Manage OAuth authorizations 仍列有 Manus app grant，使用者可另外撤銷；撤銷不會刪除已建立的規則。

`.com` 引用修正已完成：`src/content.json` 的 source 4 只更改 URL，原英文標題與 ID 不變；`npm run build`、`npm run check` 通過。GitHub Pages commit `7aef60f` 由 workflow `40808420362` 部署成功；正式《無界之界》頁回應 200，顯示 `.com` 且沒有 `.comm`。單頁 301 規則已完成並以直接 HTTP 請求驗證；來源 URL 修正和規則設定均符合本次需求。

## 第二條舊頁單一路徑 HTTP 301（2026-10-29）
使用者新增指定來源 `http://10e.org/mt2/archives/200808/170209.php`，目標為 `https://app.abiting.cc`。已核對來源原 HTTPS 回 404、HTTP 原先只升級到同路徑的 HTTPS，目標首頁回 200；接著在現有 `http_request_dynamic_redirect` zone ruleset 中追加一條精確 `host`＋`path` 規則，狀態碼 301、不保留 query，沒有覆寫第一條 iTunes→Apple Music 規則，也未使用通配符。在第三條新增前，當時只有前兩條使用者指定舊頁會轉址，其餘失效頁仍為 404。Cloudflare Full Access 依使用者指示保留到最後一條完成。

實作驗證：既有 ruleset 從 version 1 增至 version 2，GET 確認兩條啟用中的精確規則均存在。新來源 HTTP 與 HTTPS 請求都直接回 301，Location 為首頁標準形式 `https://app.abiting.cc/`；query 不保留。相鄰未指定舊頁仍回 404，原先 Apple Music 標籤轉址仍回 301 並指向原目標。

## 第三條、最後一條指定舊資源單頁 HTTP 301（2026-10-29）
使用者指定 `http://10e.org/samcimg/benders.gif` 永久轉到 `https://coai.abiting.cc/archives/838`，並說這是最後一條。來源原 HTTPS 回 404，HTTP 原先只升級到相同路徑的 HTTPS；目標頁回 200。已用精確 `host`＋`path` 條件把規則追加到現有 `http_request_dynamic_redirect` ruleset，沒有覆寫前兩條規則，不加通配符，設定真正 HTTP 301 且不保留 query；所有未指定失效路徑繼續 404。

實作驗證：ruleset 從 version 2 增至 version 3，GET 確認三條啟用中的精確規則均存在。指定來源 HTTP／HTTPS 都直接回 301，Location 為 `https://coai.abiting.cc/archives/838`；query 不保留，相鄰未指定路徑回 404，前兩條轉址仍正常。最後清除 Manus 保存的 Cloudflare OAuth token，狀態確認為 unauthenticated；若需移除 Cloudflare 帳戶端留下的 Manus application grant，使用者可在 Manage OAuth authorizations 另行撤銷，規則仍會繼續生效。
