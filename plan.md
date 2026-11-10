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
- `src/content.json`：日文自介、累計 135 篇影評與每頁 metadata。
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

## 寶可夢相關的三條精確舊URL轉址（2026-10-29）
使用者指定文章舊路徑 `http://10e.org/mt/archives/200603/142154.php` 導向 `https://list.abitingpokedex.com`；第一張圖片 `https://10e.org/samcimg4/ainshuuma3.jpg` 導向 `https://abiting.cc/wp-content/uploads/2026/10/577bc2069f52728261b170214ee1423a_0.jpeg`；第二張圖片 `https://10e.org/samcimg3/iguananeko.jpg` 導向 `https://abitingpokedex.com/wp-content/uploads/2026/10/e88a75f2c608249c1116dc6b2207f254_0.jpeg`。第一張圖片目的網域依使用者更正使用 `abiting.cc`，第二張則依最新明確指示使用 `abitingpokedex.com`。三條規則均以精確 host/path 條件追加至既有 `http_request_dynamic_redirect` ruleset，回真正 HTTP 301、不保留 query，不覆寫原有三條、不使用通配符；所有其他未指定失效路徑仍須 404。

實作驗證：ruleset 從 version 3 增至 version 6，包含原三條與新增三條共 6 條啟用規則。三個來源的 HTTP／HTTPS 請求均直接回 301 並指向各自指定目標，query 不傳遞；三個目標在驗證時均回 200。`/mt/archives/200603/142155.php` 與 `/samcimg3/other.jpg` 等未指定控制路徑仍回 404；前三條舊轉址也逐一回歸測試正常。完成後以 Cloudflare MCP logout 清除 Manus 端 token；授權狀態為 unknown 且 stored token 為 no。若 Cloudflare Dashboard 仍列有 Manus app grant，使用者可另行撤銷；此操作不影響已建立的 6 條規則。

## 單一圖片舊路徑精確301（2026-10-29）
使用者指定 `http://10e.org/mt/archives/img2/catt2_8.jpg` 轉到 `https://abiting.cc/wp-content/uploads/2026/10/Bazaart_2026-10-18_132913.jpeg`。設定前來源HTTP／HTTPS均回404，目標圖片回200且為JPEG；唯讀 `whoami` 成功確認Cloudflare API可用。只在既有 `http_request_dynamic_redirect` ruleset 追加一條精確host/path的301規則，不保留query、不覆寫現有六條；其他未指定路徑維持404。

實作驗證：ruleset 從 version 6 增至 version 7，七條規則均啟用。來源 HTTP 回 301，HTTPS 含 query 也直接回 301 至完全指定的 `abiting.cc` 圖片且不帶 query；圖片目標回 200、`image/jpeg`。相鄰未指定路徑 `/mt/archives/img2/catt2_9.jpg` 仍回 404，先前圖片轉址仍正常。`auth.status` 初始回報 unauthenticated、stored token yes，但唯讀 `whoami` 成功，確認 API 可用。依使用者「一起做完再拿掉權限」的指示，暫時保留 Cloudflare token，待使用者確認舊URL清單已完整後再登出。

## 追加一條舊圖片精確301（2026-10-29）
使用者新增 `http://10e.org/samcimg/nekocat2.jpg` → `https://abitingpokedex.com/wp-content/uploads/2026/10/IMG_4611.jpg`。僅在既有 `http_request_dynamic_redirect` ruleset 追加一條精確host/path的HTTP 301，query不保留；保留原七條，不修改其餘規則，也不擴大到其他 `samcimg` 圖片。

實作驗證：ruleset 從 version 7 增至 version 8，含 8 條啟用規則。來源HTTP及HTTPS（含query）均直接回 301，Location 精確指向指定 `IMG_4611.jpg` 且不傳query；目標回 200、`image/jpeg`。未指定鄰近路徑 `/samcimg/nekocat3.jpg` 仍回 404，既有 `benders.gif` 規則仍回 301。依使用者先前「一起做完再拿掉權限」指示，Cloudflare授權暫時保留，待其確認舊URL清單完整後再清除。

## 再新增一條舊圖片精確301（2026-10-29）
使用者指定 `http://10e.org/mt/archives/img2/mitubishi.jpg` → `https://abiting.cc/wp-content/uploads/2026/10/image0083819.jpg`。只在既有 `http_request_dynamic_redirect` ruleset 追加一條精確 host/path 的 HTTP 301，query 不保留；保留原 8 條規則，不覆蓋或擴大其他路徑。設定前 HTTPS 來源回 404，HTTP 僅升級至同一 URL 的 HTTPS；目標圖片回 200、`image/jpeg`。

實作驗證：ruleset 從 version 8 增至 version 9，9 條規則全部啟用。HTTP、HTTPS 及含 query 的請求均直接回 301，Location 精確指向 `image0083819.jpg` 且不帶 query；目標回 200、`image/jpeg`。鄰近未指定的 `/mt/archives/img2/mitubishi2.jpg` 仍回 404，既有 `catt2_8.jpg` 規則仍正常。使用者仍在盤點舊 URL，因此依其先前指示保留 Cloudflare 授權，待其確認清單完整後再移除。

## 追加一條舊圖片精確301（2026-10-29）
使用者指定 `http://10e.org/samcimg3/macchomachomacho.jpg` → `https://abiting.cc/wp-content/uploads/2026/10/image9999810.jpeg`。只在既有 `http_request_dynamic_redirect` ruleset 追加精確 host/path 的 HTTP 301，query 不保留；保留原 9 條規則，不擴大到其他圖片路徑。設定前 HTTPS 來源回 404，HTTP 只升級到同一 URL 的 HTTPS；目標回 200、`image/jpeg`。

實作驗證：ruleset 從 version 9 增至 version 10，10 條規則全部啟用，原 9 條未變。HTTP、HTTPS 及帶 query 的請求都直接回 301，Location 精確指向指定 JPEG 且不帶 query；目標回 200、`image/jpeg`。未指定的 `/samcimg3/macchomachomacho2.jpg` 仍回 404，前一條 `mitubishi.jpg` 轉址仍正常。使用者仍在整理舊 URL，因此暫時保留 Cloudflare 授權，待其確認清單完整後再移除。

## 追加一條舊圖片精確301（2026-10-29）
已完成使用者指定的 `http://10e.org/samcimg/nekocat1.jpg` → `https://abiting.cc/wp-content/uploads/2026/10/IMG_4608.jpeg`。原zone-level `http_request_dynamic_redirect` 已達Free plan 10條上限，第11條dry-run回配額錯誤且未寫入。確認帳戶原本沒有Bulk Redirect list或account entrypoint；zone-level不允許`http_request_redirect` phase。保留Dynamic ruleset version 10並讀回確認仍為10條。新增redirect list `ten_e_exact_legacy_redirects`（ID `a71cfa967ef34b54b37235cebe066279`），只含單一 item（ID `bda9d9a768ae42b690789cda205b98c6`）：scheme-less精確來源 `10e.org/samcimg/nekocat1.jpg`、指定目標、301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`。通過`POST /accounts/{account_id}/rulesets?dry_run=true`後，建立 account-level root ruleset `10e.org exact legacy redirects`（ID `d7f89eee1bfd4202a63f8bed78ab0690`，phase `http_request_redirect`，version 1）；其中唯一啟用規則 ID `99038725ed1944269df8d9430636cddb`，expression 為 `http.host eq "10e.org" and http.request.full_uri in $ten_e_exact_legacy_redirects`。Live no-follow 驗收：HTTP／HTTPS原網址及兩者的`?check=1`均直接301至完全相同的目標Location，query不傳遞；鄰近未指定`/samcimg/nekocat1x.jpg`仍404；目標回200、`image/jpeg`；既有benders.gif及macchomachomacho.jpg仍回原301。Cloudflare OAuth依使用者先前指示保留，待使用者確認URL清單完整後才移除。

## 最後一條舊圖片精確301（2026-10-29）
Cloudflare官方文件確認Free方案有15條Bulk Redirect Rules、5個Bulk Redirect Lists、跨清單10,000個URL mappings；這些額度足以今天完成，不必等到次日。新增來源 `10e.org/samcimg3/wain12.jpg`（item ID `4f1769beb05f4204add68148f2b0e972`）→ `https://abiting.cc/wp-content/uploads/2026/10/sicilian.jpgLarge.jpg`，301，`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`。將mapping加入既有list `ten_e_exact_legacy_redirects`（ID `a71cfa967ef34b54b37235cebe066279`），未新增規則或清單；account-level Bulk Redirect維持一條rule，zone Dynamic Redirect維持10條。Live no-follow驗收：HTTP／HTTPS原網址及帶`?check=1`均直接301至指定target且不傳query；鄰近未指定`/samcimg3/wain12x.jpg`回404；target回200、`image/jpeg`。Cloudflare授權仍保留，待使用者確認URL清單完整後再移除。

## 新增知名日本動畫電影評論 5 篇（2026-10-30）
沿用既有日本語靜態影評站，不新增CMS或更動文章路由架構。從現有130篇片單排除重複後，新增『AKIRA』（1988）、『もののけ姫』（1997）、『時をかける少女』（2006）、『劇場版「鬼滅の刃」無限列車編』（2020）與『すずめの戸締まり』（2022）。每部作品的正式片名、導演、製作國與日本首次劇場公開年由獨立可靠來源核實；評論聚焦影像、聲音、敘事與主題，不虛構作者觀影經驗或評分。

每篇沿用六段、兩個小標及2–4個正文引註來源，篇幅500–800日文字；來源標題依來源頁原文保留。使用collection「日本アニメ映画名作5選」，提供原文／國際片名、年份依據、獨立SEO欄位與搜尋keywords。資料只新增到 `src/content.json`；同步更新影評索引SEO與`check.mjs`斷言。既有130篇的slug、正文及來源保持不變；新增後總數為135篇與138條公開路由，沿用現有Article／共用Person、canonical、OG、Twitter Card、banner、manifest及sitemap產生方式。

實作結果：已附加五個獨立slug，逐篇以日本官方／製作或發行方頁、電影資料庫與電影機構／影評來源交叉查證。年份分別採日本初次劇場公開：1988-07-16、1997-07-12、2006-07-15、2020-10-16、2022-11-11；未將《AKIRA》《時をかける少女》《無限列車編》的後期重映日期誤作初映。每篇有三個可讀來源及全部正文注碼，來源標題保留原頁可見原文；六段淨日文字數為694–756。`src/content.json`基線比較確認原有130個review object完全未變。`PUBLIC_ORIGIN=https://10e.org npm run build`、`PUBLIC_ORIGIN=https://10e.org npm run check`均通過；產物含135篇文章、138條route與138筆sitemap URL，新增頁的canonical、Article／Person JSON-LD、來源標題與URL均已另行讀回驗證。

## 指定一筆舊圖片URL精確301（2026-10-30）
新增使用者指定 `10e.org/mt2/archives/200712/230337.php` → `https://abiting.cc/wp-content/uploads/2026/10/mecca1da1.jpg`，Cloudflare Bulk Redirect list item ID `604c7b14c89a462bbf5d2b1cb8252697`，list `ten_e_exact_legacy_redirects` ID `a71cfa967ef34b54b37235cebe066279`。使用scheme-less精確來源以同時匹配HTTP／HTTPS，設定301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`。Bulk item operation `31fcff814a90435d960a4b7f8ebf9dbf`回報completed；讀回確認清單3個items。未新增list或Bulk rule；account-level `http_request_redirect`仍只有既有1條規則，zone Dynamic Redirect仍version 10／10條。Live no-follow驗收：HTTP與HTTPS來源（含`?check=1`）均直接301到同一個不帶query的指定Location；相鄰未指定路徑404；目標回200、`image/jpeg`；原有benders.gif及macchomachomacho.jpg轉址未變。Cloudflare授權依使用者先前指示保留。

## 指定一筆舊圖片URL精確301（2026-10-30）
新增 `10e.org/samcimg/no_hair_cat.jpg` → `https://abiting.cc/wp-content/uploads/2026/10/No-hair-cat-scaled.jpeg`，Bulk Redirect list item ID `99d34f79cab1453691d8e6e8d017f39b`，使用既有 `ten_e_exact_legacy_redirects` list ID `a71cfa967ef34b54b37235cebe066279`。scheme-less精確來源匹配HTTP／HTTPS；設定301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`。operation `d54a65e739bd4fa9a768f44d8fe14d5f`回報completed，清單讀回4筆。未新增list或Bulk rule；account-level `http_request_redirect`維持1條規則，zone Dynamic Redirect維持version 10／10條。Live no-follow驗收：HTTP／HTTPS原網址及`?check=1`均直接301至不帶query的指定Location；相鄰檔名與path suffix仍404；目標回200、`image/jpeg`；benders.gif及macchomachomacho.jpg仍轉到既有原目標。Cloudflare OAuth依使用者先前指示保留。

## 指定一個舊文章URL精確301（2026-10-30）
新增使用者指定 `10e.org/mt2/archives/200701/050537.php` → `https://scrabby.abiting.cc/archives/299`，Bulk Redirect list item ID `141a0bbfdf294be6a0ac2d308772e6b3`，共用既有 `ten_e_exact_legacy_redirects` list ID `a71cfa967ef34b54b37235cebe066279`。scheme-less精確來源匹配HTTP／HTTPS；設定301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`。operation `bd3506520d71471a8e4e464193048aa9`回報completed，清單讀回5筆。未新增list或Bulk rule；account-level `http_request_redirect`仍1條規則，zone Dynamic Redirect仍version 10／10條。Live no-follow驗收：HTTP／HTTPS來源及`?check=1`均直接301到指定Location且不帶query；相鄰路徑與path suffix仍404；目標回200、`text/html`；既有benders.gif及macchomachomacho.jpg仍導向原目標。Cloudflare OAuth依使用者先前指示保留。

## 10e.org square favicon（2026-10-31）
Google Search Central官方要求favicon為正方形、至少8×8 px，建議大於48×48 px；首頁HTML需有`rel="icon"`標籤，網站和圖示檔須可被Googlebot／Googlebot-Image抓取，且Google不保證一定在搜尋結果顯示。[Google Search Central favicon guidelines](https://developers.google.com/search/docs/appearance/favicon-in-search)。目前首頁把寬1925×817的同一張品牌banner JPG同時指定為Open Graph圖片與favicon，比例不符合Google要求。

依網站米白、咖啡棕和剪報／電影筆記美學，生成單一方形無字品牌符號：簡化的電影光圈／靜格標記配一點陶土玫瑰色，保留強輪廓以利小尺寸辨認；將最終PNG定為192×192。把源資產放在`assets/favicon.png`並於`src/site.json`明確設定；`scripts/build.mjs`將它複製到輸出根目錄`/favicon.png`，而每頁head只輸出一個same-host `rel="icon"` PNG連結。`src/content.json`中banner及`og:image`、Twitter image和文章banner皆維持原圖；`scripts/check.mjs`驗證PNG signature、192×192尺寸及輸出連結。

實作及驗收結果：已建立並視覺檢查無字192×192 PNG，實際使用於`assets/favicon.png`及編譯後`dist/favicon.png`。`app.config.ts`平台logo metadata同步使用穩定URL `https://10e.org/favicon.png`。`PUBLIC_ORIGIN=https://10e.org npm run build`與`npm run check`通過，並以本機HTTP確認圖檔回200、`image/png`、192×192，首頁僅有一個`rel="icon"`且OG banner未變。commit `5329536`（`Add square favicon for 10e.org`）觸發的GitHub Pages workflow [`41185501600`](https://github.com/abiting/marinas-dreams/actions/runs/41185501600)成功。正式站再次驗證：`https://10e.org/favicon.png`回200、`image/png`、PNG 192×192，內容SHA-256與建置產物相同；首頁只含此icon link並保留舊OG banner；Googlebot的`/robots.txt`和Googlebot-Image的`/favicon.png`均可讀取。Google實際何時更新搜尋結果仍取決於重新抓取，無法由站方保證。

## Favicon圖案比例修正（2026-11-01）
依使用者回饋「logo太小」，維持原始生成的電影光圈與配色，只裁除多餘米白外框並以高品質濾鏡放大中央符號；保持方形192×192、不裁切圖案本身，穩定URL仍為`/favicon.png`，Open Graph／Twitter banner不變。

實作及驗收結果：由保留的1920×1920原始圖以安全方形範圍`(234, 233, 1685, 1684)`重新裁切，而非放大原192px檔，再以Lanczos縮放成192×192 PNG。最終深棕／玫瑰符號的可見邊界為160×159 px，最小安全邊距16 px。`PUBLIC_ORIGIN=https://10e.org npm run build`與`npm run check`通過；本機HTTP圖檔回200、`image/png`且與source asset位元組相同。commit `3dc8767`（`Enlarge 10e.org favicon mark`）的GitHub Pages workflow [`41276754643`](https://github.com/abiting/marinas-dreams/actions/runs/41276754643)成功；正式`https://10e.org/favicon.png`在`Cache-Control: no-cache`請求下回200、PNG 192×192、主符號160×159，SHA-256與最新`dist/favicon.png`一致；首頁仍只含一個root favicon link，OG／Twitter banner未變。

## Favicon再放大（2026-11-01）
依使用者後續回饋「再大」，保留已接受的電影光圈圖案及配色，從1920×1920原始生成圖再安全縮小方形裁切範圍，使符號約180×178 px（約93%畫布），周圍留均勻約6 px安全邊距；繼續輸出192×192 PNG並使用原穩定URL`/favicon.png`，不改動favicon head標記或OG/Twitter banner。

實作及驗收：以原圖安全裁切`(315, 314, 1605, 1604)`並Lanczos縮放，正式產物`assets/favicon.png`／`dist/favicon.png`為192×192 PNG，符號邊界`(6, 7, 186, 185)`（180×178 px），四邊留白6–7 px。`PUBLIC_ORIGIN=https://10e.org npm run build`和`npm run check`通過；重啟本機開發伺服器後HTTP讀取favicon與首頁均通過。commit `b809956`（`Enlarge 10e favicon again`）的GitHub Pages workflow [`41285254656`](https://github.com/abiting/marinas-dreams/actions/runs/41285254656)成功。正式站`https://10e.org/favicon.png`在no-cache request下回200、`image/png`、192×192、180×178主符號，SHA-256與最新`dist/favicon.png`完全一致；首頁只有一個穩定favicon link，OG banner保持不變。

## Footer Abiting連結更新（2026-11-02）
使用者指定將全站共用footer中顯示為「Abiting」的網站製作／維護者連結，從`https://abiting.cc`改為`https://abitingdiscord.com`。變更只放在`scripts/build.mjs`的共用footer模板；保留日文footer文案、內部導覽、其他文章或引用的外部網址、Open Graph／Twitter／canonical與SEO metadata。同步修訂`scripts/check.mjs`，使所有輸出頁回歸檢查新的指定目的網址。

實作及驗收：`PUBLIC_ORIGIN=https://10e.org npm run build`及`npm run check`通過；138個生成HTML頁皆含`href="https://abitingdiscord.com"`，沒有任何footer保留`href="https://abiting.cc"`。commit `f490ee5`（`Update footer Abiting link`）已由GitHub Pages workflow [`41372989656`](https://github.com/abiting/marinas-dreams/actions/runs/41372989656)成功部署；以no-cache請求驗證正式首頁`/`、About頁`/about-10ekokoro/`及文章頁`/akira-1988-review/`皆回200，且各自唯一的Abiting文字連結均精確導至`https://abitingdiscord.com`。

## 魔女狩り電影與Manson紀錄片增補（2026-11-02）
使用者在同一請求中要求新增魔女狩り電影文章，以及`Chaos: The Manson Murders`（2025）與`Secret Life of Pearls`（2016）兩篇紀錄片介紹；三者均以日文寫入既有`src/content.json`，沿用靜態文章模板，新增slug `the-crucible-1996-review`、`chaos-the-manson-murders-2025-review`及`secret-life-of-pearls-2016-review`。研究筆記與來源原文標題保存在`/home/ubuntu/source-title-audit/witch-hunt-film-research-2026-11-02.md`。

片目與事實基礎：《クルーシブル》（The Crucible, 1996）是Nicholas Hytner執導、改編自Arthur Miller 1953年舞台劇、背景為1692年Salem魔女裁判的電影；allcinema記載日本公開日1997-04-26、124分鐘。以「改編／戲劇化」處理而非聲稱完整史料重建；UVA與Smithsonian對受控／死亡人數採用不同口徑，因此評論不寫單一總數。`Chaos: The Manson Murders`的Netflix日本頁維持英文片名；影片由Errol Morris執導，MoMA記錄2025-03-06世界首映，Netflix Tudum記載2025-03-07上線，取材自Tom O'Neill與Dan Piepenbring的2019年著作。文章須把紀錄片探討的替代理論與已證實史實分開，尤其不能把未證明的Manson／MKUltra因果連結當成事實。`Secret Life of Pearls`同樣保留英文片名；Northern Pictures記為2016年、1小時、為National Geographic製作，National Geographic的節目頁將內容定位為澳洲南洋珠的野生珍珠貝採集與養殖流程。珍珠文章不得把合作品牌的宣傳主張擴張為未核實的環境、勞動或市場事實。各片2–4項原文標題引用已另存於研究筆記。

轉址策略：現有Cloudflare Free帳戶的account Bulk Redirect list `ten_e_exact_legacy_redirects`（ID `a71cfa967ef34b54b37235cebe066279`）已有5筆精確mapping，且只有一條account-level `http_request_redirect`規則；zone `http_request_dynamic_redirect`已用滿10條。待三篇文章先正式發佈後，只向既有list追加三筆scheme-less exact host/path mapping，狀態301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`。來源分別是`10e.org/mt2/archives/200912/152304.php`、`10e.org/mt2/archives/200911/250337.php`及`10e.org/mt2/archives/200705/112333.php`，目的分別為上述三條10e.org文章URL；不更動既有Bulk rule或10條Dynamic rules。

實作及驗收：三篇文章已附加至`src/content.json`尾端，既有135篇內容經HEAD快照逐筆比較保持完全一致；文章總數為138、公開路由為141。每篇有六段、兩個小標、四項原文標題來源及500–800個日文字（依序727、670、796）。`scripts/check.mjs`新增三篇的存在、內容邊界、來源註碼、字數及metadata斷言；`src/site.json`的`publicOrigin`從過時的Manus預覽網址更新為正式`https://10e.org`，使預設建置／檢查和GitHub Pages的`PUBLIC_ORIGIN`一致。`npm run build`和`npm run check`均通過；commit `ce8f753`（`Add three researched documentary and film notes`）已由GitHub Pages workflow [`41386364307`](https://github.com/abiting/marinas-dreams/actions/runs/41386364307)成功發布，三頁在正式站均回200、含10e.org canonical及Article JSON-LD。

Cloudflare實作及驗收：在重新讀取5筆既有list item、唯一account Bulk rule及10條Dynamic Redirect後，初次單物件payload遭API以`filters.api.invalid_json`拒絕，未寫入任何項目；依OpenAPI確認`Create list items`需陣列payload，再以單一operation `d068709f439e45469debf80a56b8e30c`追加三筆並完成。新增item為`113555bc1df04edcb27b50042869e83e`（152304→Crucible）、`80923441b9334746bd5171ccaac9bd85`（250337→Chaos）、`30351e74e49846e5a4a824a63344bedf`（112333→Pearls）。讀回list共8筆、account rule仍1條，zone Dynamic version仍10、規則數仍10。以不跟隨redirect的HTTP請求驗證每個新來源在HTTP和HTTPS均direct 301、帶`?probe=1`仍丟棄query、每個10e.org目標回200；三個相鄰未指定`x.php`路徑皆回真正404，既有`/samcimg/benders.gif`與`/samcimg3/macchomachomacho.jpg`仍準確301至原先目標。


## 追加pia17566_2.jpg.webp舊網址301（2026-11-02；目標更正前的中間狀態）
使用者後續更正來源為`http://10e.org/mt2/archives/200903/310230.php`，目標仍是`https://abiting.cc/wp-content/uploads/2026/11/pia17566_2.jpg.webp`。最初誤植的`10e.org/mt2/archives/200904/072253.php` item `351cadcb7be84571b0ea420d3a47a614`已由delete operation `949ec71e4d844bc5acdb21cce4d4d534`移除；其HTTPS現回404，HTTP僅升級至同一路徑HTTPS後回404。正確來源item `30349a5f32cc43198a7bf5844269c0a9`由operation `0835dc62301c4298aa1ff0d7e4ae40db`新增並完成；規則為301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`。清單以8筆暫時移除舊項，之後回到9筆；account Bulk rule仍1條，zone Dynamic Redirect仍10條/version 10。正式HTTP及HTTPS正確來源均direct 301，`?probe=1`丟棄；目標200 `image/webp`；相鄰`310230x.php`與子路徑`310230.php/extra`維持404，既有`benders.gif`和`macchomachomacho.jpg`Dynamic 301不變。Cloudflare OAuth仍按先前指示保留。


## 最終目標更正（2026-11-02）
上段是更正過程中的中間狀態，使用者之後明確指定目標為`https://app.abiting.cc/archives/5371`，不是pia17566_2.jpg.webp。已刪除指向圖片的中間item `30349a5f32cc43198a7bf5844269c0a9`（operation `7b8b152d02ef4eaa8c609bdebe0e87aa`），以final item `b9f77d27eb3d402dbbf075be51b9b6e8`重新加入相同正確來源`10e.org/mt2/archives/200903/310230.php`，新增operation `c7f62f5fa8ea490181894df037a5e52f`已completed。最終來源HTTP／HTTPS均direct 301至app文章且丟棄query，目標回200 `text/html`；曾經誤植的`200904/072253.php`仍為HTTPS 404、HTTP僅升級至HTTPS後404，正確來源相鄰`310230x.php`與子路徑保持404。Bulk list 9筆、account rule 1條、zone Dynamic rules 10條/version 10，其他既有redirect未變。


## The Good, The Bad, The Hungry（2019）日文影評與精確轉址

ESPN Watch及Apple TV均將片名列為`The Good, The Bad, The Hungry`，並列導演Nicole Lucas Haimes；Apple TV標示2019年及約77分鐘。Washington Post的2019年同期評論與ESPN 2024年對Kobayashi的訪談補足內容脈絡：小林尊連續六次贏得Nathan's賽事，2007年Chestnut終止其連勝；文章可討論競食的訓練與媒體如何建構日美對抗敘事，但須將評論觀點和影片／史料事實分開。研究URL和各來源頁原文標題保存於`/home/ubuntu/source-title-audit/the-good-the-bad-the-hungry-2026-11-02.md`。

實作沿用`src/content.json`既有評論資料，使用原題slug `the-good-the-bad-the-hungry-2019-review`及單篇`スポーツドキュメンタリー映画ノート` collection；提供日文六段、兩個小標、500–800字正文、2–4個來源、合規SEO metadata和既有Article/Person／canonical／OG／Twitter Card／sitemap輸出。只需在`src/content.json`附加一筆並在`scripts/check.mjs`把138篇更新為139篇、路由141更新為142，並為新collection／原文英文片名加入精確斷言；既有review URL和內容保持不變。

文章目標先部署並確認正式`https://10e.org/the-good-the-bad-the-hungry-2019-review/`可用，再將指定舊來源`10e.org/mt/archives/200508/160103.php`以唯一Bulk Redirect item映射至該目標；使用現有Bulk list，按API所需陣列payload，只設status 301、精確host/path、不含subdomain／subpath／suffix且丟棄query。設定前讀回9筆現有項目、單一account-level Bulk rule與10條zone Dynamic rules，寫入後不更動後兩者。


### 實作與驗收結果（2026-11-02）

`src/content.json`已在既有138筆後附加第139篇，slug為`the-good-the-bad-the-hungry-2019-review`，內容為771字、六段和兩個由建置器輸出的`h2`小標；資料內重複的inline `<strong>`小標已在審核後移除。三個來源均直接查讀且以原文標題保存，正文引用全部對應。`scripts/check.mjs`同步補強尾端新增、來源原文、無評分／私人觀影措辭、非「小林為輸家」敘事，以及新slug在manifest與sitemap的精確斷言。`PUBLIC_ORIGIN=https://10e.org npm run build`和`npm run check`通過（139篇、142條路由）；獨立唯讀審核也通過。commit `9245c21`已推送，GitHub Pages run `41399476283`成功，正式文章HTTP 200且canonical、Article JSON-LD、來源均正確。

部署後才寫入Cloudflare：現有redirect list `a71cfa967ef34b54b37235cebe066279`先讀回9筆、account-level root ruleset `d7f89eee1bfd4202a63f8bed78ab0690`仍僅1條、zone Dynamic ruleset `f20f7eda0c24494aa29382a2fd4f97b7`仍10條/version 10。以陣列POST新增唯一item `842ea3fbcd0e4725a9c6630e3091adc9`：`10e.org/mt/archives/200508/160103.php` → `https://10e.org/the-good-the-bad-the-hungry-2019-review/`，旗標為301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`。operation `aa21379707be41b1abe86f4a99bfa86e`已completed。HTTP、HTTPS和帶`?check=1`的來源均direct 301到無query的目標；相鄰`160103x.php`和子路徑仍為HTTPS 404，目標頁200，既有Dynamic的benders和macchomachomacho mapping回歸正確。清單現為10筆，未改動其他規則。

## 臥虎藏龍／グリーン・デスティニー（2026-11-03）
核對發現現有 139 篇中已有 `crouching-tiger-review`，因此在原 slug 重寫研究型日文影評，不另外生成重複頁或改動已公開 URL，並保留原 publishedAt。使用者的英文拼字視為《臥虎藏龍》2000 年電影；正式英文為 Crouching Tiger, Hidden Dragon，日本院線名グリーン・デスティニー，日本公開日期 2000-11-03。片名／版本由映画.com及Sony Pictures Classics核實，Yale Film Archive補足武俠與女性角色、情感壓抑的脈絡，Academy官方記錄支持四項獲獎。重寫六段500–800字、兩小標和正文注碼；來源標題維持原文，不使用觀眾評分。只修改這一筆及相應check assertions，資料總數139、路由142不變。研究備忘置於 `/home/ubuntu/source-title-audit/crouching-tiger-hidden-dragon-2026-11-03.md`。
既有靜態生成器輸出文章、SEO及lastmod；先將更新文章部署至 `https://10e.org/crouching-tiger-review/` 並驗證，再向現有 account Bulk Redirect list 追加唯一 `10e.org/mt2/archives/200812/122337.php` → 該文章的301 item。精確host/path、無scheme匹配HTTP/HTTPS，四項matching/preserve旗標均false；不修改現有10條Dynamic或單一Bulk rule，不覆寫list，未指定路徑維持404。

### 實作與驗收結果
原 `crouching-tiger-review` 已更新為778字六段日文評論，兩個小標、四個已讀來源均有正文注碼，來源標題原文保留；既有 publishedAt `2026-10-17T09:18:45+08:00`、slug、其餘138篇資料與142條manifest不變。`PUBLIC_ORIGIN=https://10e.org npm run build`／`npm run check`和唯讀整合審核通過。內容 commit `929f8f5e582ebf193f479142c8c97285d1903deb`由Pages run `41575429248`成功部署。一般UA及Googlebot讀取正式更新頁皆200，canonical、Article日期、四個來源、正文、footer與sitemap正確。
先完成文章正式HTTP驗收，再以現有list `a71cfa967ef34b54b37235cebe066279`的單筆陣列POST新增item `753c959d12324673843f7446d35d10ba`：`10e.org/mt2/archives/200812/122337.php` → `https://10e.org/crouching-tiger-review/`。operation `ce5ecd7cd31848b28bd0daee2c073dbb`已completed；301、include_subdomains／subpath_matching／preserve_query_string／preserve_path_suffix全false。讀回確認其餘10筆Bulk項目未變，account ruleset仍1條/version1、zone Dynamic仍10條/version10。HTTP／HTTPS來源及帶query測試均direct301至exact目標且無query；相鄰122337x.php與子路徑仍404，既有benders Dynamic及小林尊Bulk轉址不變。授權依先前指示保留。

## 使用者提供的單張PNG靜態資產（2026-11-03）
將附件原樣納入 `assets/venusaur-weakness-evolution.png`，Build 明確複製到 `dist/assets/`，但不把圖片插入首頁、文章或其他HTML，因此只可透過穩定的10e.org靜態資產URL直接讀取。保留原始1780×708畫面，不轉檔或縮放；回歸檢查可比較來源與dist位元組並保證頁面HTML不引用檔名。

實作結果：PNG原樣公開於 `https://10e.org/assets/venusaur-weakness-evolution.png`，僅新增一個來源資產、一個dist資產及build複製與check斷言；全站139篇／142路由及既有dist檔案未變。commit `5254ce8`／Pages run `41608680394`成功；正式圖片200、image/png、183897 bytes，SHA256 `1d2ab1b94196eedd8a8acbbf06f6fd84d44d526e918d8e7b0399091648782d7e`與原檔相同。正式HTML與sitemap／manifest無圖片引用。

## 頁尾品牌名稱回首頁（2026-11-03）
頁尾上方 `.footer-brand` 已是回首頁連結；本次把版權列中的 `10eKokoro's Dream` 也包在 `href="/"` 的anchor內，沿用共用footer輸出及現有basePath重寫，不改文字、樣式或其他URL。重建全站HTML並補一條所有頁面的footer連首頁斷言，其他静態資產與內容保持原樣。

完成結果：共143個HTML（含404）只包入版權品牌回首頁anchor，其他dist資產逐位元組不變；build/check通過。commit `2b02086`由Pages run `41610237676`成功部署；正式 `/`、`/crouching-tiger-review/`與`/film-reviews/`驗收兩處footer品牌均連首頁，Abiting連至abitingdiscord.com保持不變。


## 2026-11-04 Scrabby article redirect

Added one exact item to the existing account Bulk Redirect list `ten_e_exact_legacy_redirects`: source `10e.org/mt2/archives/200612/210159.php`, target `https://scrabby.abiting.cc/archives/299`, status 301, `include_subdomains:false`, `subpath_matching:false`, `preserve_query_string:false`, `preserve_path_suffix:false`. Item ID `f71638dcfe614b1ea12017d78005030d`; operation `b725a38b6ab94242b1d5d428904eb216` completed. The source is same-host exact; HTTP, HTTPS, and query-bearing variants returned direct 301 with the exact target and no query. The adjacent path and suffix remained 404; the target returned 200. The list now has 12 items, the account phase remains one Bulk rule, and the zone Dynamic ruleset remains at 10 rules/version 10; previous Scrabby and benders redirects passed regression checks.


## Underwater影評與指定舊URL精確301（2026-11-04）

追加一筆《アンダーウォーター》（原題 `Underwater`，2020）日文影評；「深海終劫站」是使用者提供的中文辨識名稱，不替代日本正式片名。依映画.com、20th Century Studios、Variety及RogerEbert.com已查讀來源撰寫，引用標題依各來源原文保留。沿用`src/content.json`既有評論物件與靜態頁建置器，確認slug唯一後只追加一筆；`scripts/check.mjs`更新至140篇／143個公開路由並核對新頁的Article資料、原文來源標題、canonical、SEO、sitemap和route manifest，既有139篇及原URL不變。

使用者指定的 `http://10e.org/mt2/archives/200807/042305.php` 只在新文章先推送並正式部署、確認公開頁200後，才新增精確Cloudflare Bulk Redirect；同一路徑HTTPS亦直接301到該文章canonical，丟棄query。相鄰檔名與子路徑維持404，其他未指定舊路徑維持404。僅追加一筆item，不覆寫現有account Bulk規則或zone Dynamic Redirect ruleset。研究與標題查核筆記保存於repo外`/home/ubuntu/source-title-audit/underwater-2020-2026-11-04.md`。


## 後續影評請求：《Tremors》（2026-11-04）
使用者在Underwater進行中新增後續需求：待Underwater影評、上線和指定301完成後，再研究新增1990年《Tremors》（中文辨識名《從地心竄出》）日文影評。屆時先核實日本正式片名、年份和來源原文標題，單篇新增至既有生成器，不改先前文章URL；文章正式頁200後，才把精確指定的 `http://10e.org/mt2/archives/201007/270356.php`（含HTTPS）301至新文章canonical，丟棄query，鄰近及suffix路徑維持404，只加一個Bulk Redirect item。此階段排在Underwater部署及mapping驗收之後。


Underwater完成證據：commit `0441661a605ec30aeaf74286bb233b73bd5c57cb` 的 Pages run `41741644315` 成功部署；正式 `/underwater-2020-review/` 對一般訪客、Googlebot與Twitterbot均回200，原文來源標題、canonical、Article、143條manifest與143筆sitemap完整。正文711字（去HTML／注碼／空白）、140篇／840段，既有139篇資料完全相同。之後追加Bulk item `71e25e0e84a343a18292cf0b2108dc84`、operation `9f24514ed19b470d9c8ea0e64e4c5671` completed，指定200807/042305.php的HTTP／HTTPS與query變體均直接301到新canonical且query丟棄，相鄰x.php、suffix /extra及未指定/mt2/archives/xxx均404；Scrabby與benders舊轉址回歸正常。Bulk清單13筆／account規則1條version1；Dynamic規則10條version10未變。OAuth依使用者要求保留，接著才進行Tremors請求。


Tremors研究與實作決策：日本正式名「トレマーズ」、原題`Tremors`、ロン・アンダーウッド導演，採映画.com的日本首次院線公開日1990年6月15日；限定1990年第1作，版本片長依映画.com與Universal為96分。新增唯一slug `tremors-1990-review`，沿用Underwater剛新增的「SF・怪物映画ノート」collection，評論以地表恐怖、雙人喜劇、實體特效與居民合作為核心。來源為映画.com、Universal Pictures At Home、Set The Tape與Guardian，原文題名不翻譯。新增後141篇／144公開路由；內容只append而保留現有140篇，check補精確片名與引用／SEO斷言。先發布正式新頁並確認200，再只POST指定201007/270356.php精確301；研究筆記在repo外`/home/ubuntu/source-title-audit/tremors-1990-2026-11-04.md`。


Tremors完成證據：内容commit `854ac0a0eba6d26e5a00af3895b9bd51c6d33774`／Pages run `41742719260`成功部署。新文731字（去HTML／注碼／空白）、6段／2個section headings／4來源，既有140篇與top-level metadata完全不變；build/check和唯讀審核通過141篇／846段／144路由。正式 `/tremors-1990-review/` 對一般訪客、Googlebot與Twitterbot均200，原文來源題名、canonical、Article、manifest與sitemap核對完整。

正式頁公開後才POST新增精確item `f7864d6f685e4deaacbc9e0a29b4b377`，operation `2b20c223a04947bb97043ad9390e7f4e` completed，source `10e.org/mt2/archives/201007/270356.php` → `https://10e.org/tremors-1990-review/`，301且include_subdomains／subpath_matching／preserve_query_string／preserve_path_suffix均false。list14筆、原13筆ID保留；Bulk規則1條version1／Dynamic10條version10均未改。現場HTTP／HTTPS及兩者含query均direct301並丟棄query，x.php、/extra與未指定xxx均404，目標200；Scrabby和benders回歸正常。Cloudflare OAuth仍保留，不logout／撤銷。


## Quantumania影評與指定舊URL精確301（2026-11-04）
使用者要求再寫一篇《蟻人與黃蜂女：量子狂熱》，並將`http://10e.org/mt2/archives/200804/280059.php` 301至新文章。網站內容維持日文，正式片名／年份／導演及劇情需由日本電影資料與官方資料核實，評論再依專業來源補充類型分析；舊網址僅在新頁已發布且公開200後，才加入既有專用Bulk Redirect list的一筆精確mapping。保留HTTP／HTTPS雙scheme、query丟棄及相鄰／suffix 404，不改既有文章與Dynamic ruleset。

Quantumania研究決策：使用Marvel日本官方的「アントマン＆ワスプ：クアントマニア」（含全形冒號），原題 `Ant-Man and the Wasp: Quantumania`，2023年、ペイトン・リード導演、日本劇場公開日2023年2月17日。映画.com所列片長125分；引用官方與映画.com各自原文片名表記，另附RogerEbert.com與Guardian已查讀影評。獨立slug `ant-man-and-the-wasp-quantumania-2023-review`，新增合理collection「スーパーヒーロー映画ノート」，不改原有collection的文章。沿用builder，只append一筆並保護既有141篇與metadata；check更新至142篇／145路由、來源題名與新頁精確斷言。本日截至此請求新增3篇，符合每日最多5篇偏好。研究筆記保存在repo外`/home/ubuntu/source-title-audit/quantumania-2023-2026-11-04.md`。


Quantumania完成證據：commit `5283acd945bd946e5834406478d6ec7b0802d7ae`／Pages run `41744964049`成功部署。正文785字（去HTML／注碼／空白）、6段／2個section H2／4筆原文來源；既有141篇object与metadata不變，142篇／852段／145路由build/check及唯讀審核通過。正式`/ant-man-and-the-wasp-quantumania-2023-review/` 對一般訪客、Googlebot、Twitterbot皆200；原文來源題名、canonical、Article、manifest與sitemap確認完整。

正式頁200後才追加Bulk item `c350858a20e54c3488726af316e3be82`，operation `5332f956366e4a688cc4837f4adfb941` completed：`10e.org/mt2/archives/200804/280059.php` → `https://10e.org/ant-man-and-the-wasp-quantumania-2023-review/`，301且include_subdomains／subpath_matching／preserve_query_string／preserve_path_suffix均false。讀回15筆、原14筆ID保留，Bulk1條version1／Dynamic10條version10原樣。HTTPS（含query）direct301且query丟棄，x.php、/extra及未指定xxx404。主Sandbox HTTP驗收遇Trustpositif網路過濾頁200，連舊的已驗收HTTP映射也受影響；未改任何網路或Cloudflare規則。獨立雲端環境正常requests GET確認指定HTTP與含query皆直接由Cloudflare回301至新頁（無query），HTTPS也正確；Underwater HTTP對照和benders HTTPS回歸通過。另一路公共抽取也從舊HTTP URL讀到正確新影評。原始失敗及獨立成功證據均保留repo外，OAuth仍保留。


## Ghost in the Shell1995影評與指定舊URL 301（2026-11-04）
已確認既有142篇中無此片，故只追加1995年押井守動畫長片，不混同2008年2.0版本或2017年真人電影；本日新增第4篇，仍符合最多5篇偏好。核實日本正式名、年份與製作資料，查讀可靠評論以身體、記憶、城市和身份為主軸；維持6段500–800字／2個section H2與來源原文題名。以新collection區分於數量固定5篇的既有日本動漫電影選輯；builder不改，source只append且保留142篇，check更新143篇／146路由。先發布正式新頁200，再精確把200707/120351.php（HTTP／HTTPS、query丟棄）301到新canonical，只POST一筆既有Bulk list item，未指定／相鄰／suffix仍404。

研究與實作決策：日本正式名採 `GHOST IN THE SHELL / 攻殻機動隊`，原題 `Ghost in the Shell`、押井守導演、日本初公開1995年11月18日。movie資料頁的2025年是4K再上映，不改1995原年；edition明示1995劇場動畫版，80分僅依Production I.G／松竹表記。新增slug `ghost-in-the-shell-1995-review` 和collection「SFアニメーション映画ノート」，原有動漫5選數量不變。四引用為Production I.G、松竹、映画.com五所光太郎評論原文headline與RogerEbert30周年專文；研究筆記repo外`/home/ubuntu/source-title-audit/ghost-in-the-shell-1995-2026-11-04.md`。近期主Sandbox普通HTTP曾收到Trustpositif網路過濾，若仍有現場限制，用獨立環境普通請求驗收HTTP，不改DNS／網路或放寬規則。


## 使用者追加：里山與上海灘賭聖（2026-11-04 08:24）
先完成Ghost in the Shell的新頁與301，再依序發布《映像詩 里山 〜命めぐる水辺〜》和《賭俠2之上海灘賭聖》。後者需提「サルの桃盗み（猴子偷桃）」經典招式，以查證的非露骨喜劇分析呈現。用独立研究筆記準備題名／版本／年份與製作credit，避免把電視紀錄片當劇場長片，或把1991上海灘賭聖與其他賭俠混同；查不到具名導演不虛構。兩篇sourceappend、check新增精確斷言與數量，其他頁資料与URL不動。沿用main／Pages，毎頁先確認200才設精確Cloudflare301。
200904/072253.php曾是中間設定而後續更正撤回；plan第190行記錄當時已404，故必須唯讀查清現有list，不能依早期片段或記憶直接覆寫。200503/022253.php則先查是否已有精確項。最新明確追加兩篇為本次工作，不自動建立隔日排程，也不讓舊每日篇數偏好阻止本次使用者明確要求。所有未指定相鄰與suffix仍404，OAuth保留。


Ghost完成：commit `0fece236516fc65832c2748abd4790b92e9801e0`／Pages run `41747016909`成功，正式頁200及146路由／來源原題／Article／canonical／sitemap驗收通過。正文785字、6段、4來源，143篇／858段，舊142篇与metadata保持。第16筆item `9431607770c943d1b05aef8b166b13a0`，operation `6882ef28e4a6483b9e632939983c1ced` completed。HTTPS含query與独立環境普通HTTP含query皆direct301到新頁且丟棄query；x.php／extra／未指定xxx404，benders／Scrabby HTTPS與Quantumania HTTP回歸正常。Bulk原15筆保留且16筆、1條version1，Dynamic10條version10未改，OAuth保留。

里山研究：正式播出名「映像詩 里山 命めぐる水辺」，NHKスペシャル2004年4月3日初回放送（49分），不是1999年第一作，也不是2005再放送／里山II商品版。監督名官方未確認，放送ライブラリー明示制作NHK・NHKエンタープライズ，不把今森光彦企画或制作統括當導演。採slug `satoyama-water-2004-review`、collection「日本の自然・環境ドキュメンタリー」，將TVEpisode／制作会社／初回放送年作為單篇opt-in metadata；builder default維持既有Movie與監督欄，旧143頁输出必須逐頁byte不變，僅里山增加correctTVEpisode about schema和真实productionCompany，不创建假「監督名未確認」Person。正式頁200後才新增200904/072253.php精確301，該source現無mapping，不覆寫200903/310230.php→app映射。


里山完成：commit `97c609a4b086659a6559b007633bd0d55c7a902a`／Pages run `41748367416`成功；正文790字、6段、4來源，144篇／864段／147路由。旧143篇data與HTML逐頁byte相同；新頁以制作NHK・NHKエンタープライズ、初回放送年2004-04-03呈現，Article.about TVEpisode／Organization／TVSeries正確，不虛構導演。正式200與SEO／原文題名驗收後才新增200904/072253.php→`https://10e.org/satoyama-water-2004-review/`；item `d4e81bc51b0a463a82a87bd281c4895e`、operation `4e893340508c42a2ba71d224a68815c8`completed，四flagfalse。HTTPS與獨立環境普通HTTP含query皆direct301且query丟棄，x.php／extra／xxx404，原16筆以及App更正來源不變，Bulk1條version1／Dynamic10條version10不變、OAuth保留。

上海灘賭聖最終決策：日本題「ゴッド・ギャンブラー III」、原中文題「賭俠2之上海灘賭聖」，1991年香港電影，王晶（ウォン・ジン）導演、香港首次公開1991-08-22（HKMDB）。slug `god-of-gamblers-iii-back-to-shanghai-1991-review`、collection「香港コメディ映画ノート」，name／SEO日文、fullName／description／keywords保留中文辨識，正文必須含「サルの桃盗み（猴子偷桃）」非露骨身體笑點。不虛構台詞／时间碼／對打角色或提供真實攻擊操作。四來源採已查讀HKMDB、Apple TV JP、Bilibili片段原文標題和百度詞義；只修正初稿Apple US引用題名誤配的具體問題，原始研究筆記与最終修正repo外保留。里山完全驗收完成後才append此一篇，預期145篇／148路由，先正式200再新增200503/022253.php精確301。


上海灘賭聖完成：commit `ef6871f40bc4cf446889afa48c2fdc4e722fb3f5`／Pages run `41749434835`success，正文780字／6段／4來源，首屏包含指定「サルの桃盗み（猴子偷桃）」、name採核實日本題，原中文題保留。145篇／870段／148路由通過，全舊144篇data与HTML byte-identical；對比初始e54350e之139篇／metadata／articleHTML也全部byte-identical。正式新頁普通訪客／Googlebot／Twitterbot200、原文引用題名／canonical／Article／manifest／sitemap驗收後，POST唯一來源`10e.org/mt/archives/200503/022253.php`→`https://10e.org/god-of-gamblers-iii-back-to-shanghai-1991-review/`。item `5a750947f05148498851bf94e5da4697`，operation `481ef44b734444168dd672d2131b72a6`completed。獨立環境普通HTTP、含query與主環境HTTPS、含query均direct301到新頁，query丟棄；相鄰x.php／suffixextra／未指定xxx404，benders／Scrabby与里山HTTP回歸正確。清單18筆原17筆全保留、Bulk1條version1／Dynamic10條version10不變，未新增廣泛規則或mass redirect，OAuth依使用者指示保留。
本輪已依順序完成Ghost in the Shell1995→里山2004→上海灘賭聖1991，三個指定來源均只有精確301，其他失效來源404。


2026-11-04新需求《早安越南》：研究Good Morning, Vietnam（1987）與日本片名表記，著重Robin Williams的廣播喜劇、軍方資訊控制和笑聲面對戰爭的限制；避免把1988日本公開年誤作製作年。僅append一篇至src/content.json，沿用日文6段／500–800字、四筆以下已查讀原文sources與既有static HTML builder；check加入精確電影斷言和146篇／149路由。先安全推送main、Pages成功及正式頁200／SEO通過，再使用現有Bulk list唯一POST來源10e.org/mt2/archives/201005/040329.php到新文章；四旗標false，不動Dynamic10條或原18筆。文章slug與collection在核實題名和現有資料後確定；TODO完整條件已追加。Cloudflare本輪status顯示unauthenticated但有stored token，先依工具正常恢復OAuth，不撤銷權限，其他研究與文章工作可繼續。

早安越南核實決策：D23原題Good Morning, Vietnam (film)明示1987-12-23首映、1988-01-15全面發行；映画.com原題「グッドモーニング，ベトナム」1987美國製作、1988-10-08日本公開、Levinson；Roger Ebert原題Good Morning, Vietnam，1988-01-15影評，支持即興剪輯／主人公從話術掩護轉向人性關懷。片長119–121分差異不在正文硬寫。採slug `good-morning-vietnam-1987-review`、collection「戦争とユーモアの映画ノート」、日本題保留全形逗號，releaseYearBasis以米國1987初公開，edition註日本1988年公開；3筆已讀來源原題與URL完整保留。THR只得到307 nginx回應，不採snippet。本文評析笑聲／資訊審查與美國DJ視角的限度，不將鬆散改編稱忠實傳記、不宣稱私人觀影或自編評分。


2026-11-04 10:27追加《樹懶殺三小》（Slotherhouse, 2023）：在早安越南最後HTTP驗收期間平行研究，先核實日本正式題／官方製作與公開資料、恐怖喜劇與動物怪物設計，不用中文譯名自造日文。研究筆記与日文6段500–800字草稿repo外保存，3或4已查讀來源原文標題。早安越南全完成後才append此一篇、147篇／150路由；先Pages成功及正式200，再唯一精確POST200805/280244.php到新文，Cloudflare原19筆與Bulk1／Dynamic10不動。新明確需求不自行排到隔天、不建立排程。終稿slug／collection依研究結果和碰撞保護確定。


早安越南完成：commit `782c8de4992f07ba3b09a880c0dc5c7a281b9fd3`／Pages run `41760672768`success，正文784字、3原文來源、146篇／876段／149路由，原145篇data／metadata／articleHTML byte-identical，唯讀整合PASS。正式新頁訪客／Googlebot／Twitterbot200、sources／全文／canonical／Article／manifest／sitemap全部驗收後，唯一POST201005/040329.php→https://10e.org/good-morning-vietnam-1987-review/；item `62dcd66b9a4a44c28b9d4acb38ca4cfd`、operation `057d224c4584487ea838551ffa1a5ee2`completed。独立普通HTTP及HTTPS含query皆direct301、不帶query，x.php／extra／xxx404，既有benders／ScrabbyHTTPS／上海灘賭聖HTTP未變。原18筆保留且19items、Bulk1條version1／Dynamic10條version10不變。本輪authstatus一度未authenticated但login工具說已authenticated且既有token/API唯讀和寫入皆成功，未登出／撤銷，OAuth繼續保留。Slotherhouse只有平行研究和待辦，本篇全完成後才做新增。

Slotherhouse核實實作：日本題「キラー・ナマケモノ」、原題Slotherhouse、2023製作、日本2024-04-26公開、導演マシュー・グッドヒュー、93分。採slug `slotherhouse-2023-review`、collection「ホラーコメディ映画ノート」，原製作年2023與日本公開2024同時明示，沒有冒稱日本2023上映。四已查讀來源Cinematoday、Variety、RogerEbert、SLASH影展保留各自原題與URL；實體puppet、社交クラブ選挙與SNS／密猟風刺、後段失速均有來源支持。初稿plainbody是另寫短摘要非六段全文，已針對性一次精簡改為真正六段500–800字並移除plainbody／查证流程旁支／中文樹懶，不重做外部研究或引用變動。僅append一篇，147篇／150路由，原146篇data與HTML逐頁保留；先正式200才POST200805/280244.php。早安越南追蹤commit `c1dea46`／Pages run `41761020773`已success，該篇与第19筆301全完成。


Slotherhouse完成：實際6段正文795字（非另附摘要）、4已讀原題來源、147篇／882段／150路由，check與原146篇data／metadata／articleHTML byte比對通過。content commit `5e6ecdce5c7341e0a3a1fe10a036467555712dcf`／Pages run `41761532284`success，新頁普通訪客／Googlebot／Twitterbot200、四原題source／全文／canonical／Article／150manifest／sitemap通過後，唯一POST200805/280244.php→https://10e.org/slotherhouse-2023-review/。第20筆item `ce26782531d343849693e2cbb658983f`、operation `c24dd315e44045d9aaf06c462bbbf6ec`completed，四flagsfalse。独立普通HTTP與HTTPS含query皆direct301，query丟棄；相鄰x.php／suffixextra／未指定xxx404，benders／ScrabbyHTTPS与早安越南HTTP回歸通過。原19筆全保留，Bulk1條version1／20items，Dynamic10條version10未改，OAuth依指示保留。本輪早安越南與Slotherhouse兩篇已依先部署／真200後轉址順序完成，不massredirect或改舊articleURL。


2026-11-04指定目錄`/hackedpage2/`：Cloudflare官方Bulk Redirect參數文件確認subpath_matching=true會以source folder prefix比對子路徑；source保留尾斜線，故只匹配`10e.org/hackedpage2/`下的頁面，不匹配字元相似的`/hackedpage2x/`；preserve_path_suffix=false令所有層級suffix都丟棄並導到固定URL，preserve_query_string=false捨棄query，不帶scheme同時匹配HTTP與HTTPS，include_subdomains=false且account redirect root rule僅限host `10e.org`。唯一目標`https://10e.org/the-uninvited-1944-review/`已直接200/canonical驗收。先唯讀基線20 items／1 Bulk rule version1／10 Dynamic version10、無重疊prefix，再新增唯一list item；日後HTTP／HTTPS巢狀子路徑直接301，邊界相鄰路徑保持404。不增加Dynamic rule或覆寫任何existing item。


`hackedpage2/`前綴301完成：新增Bulk item `07f752b2ca424c65a49aa8255d27a9b7`／operation `1ae26909d1b1468eaf907f44ae23f36e` completed。source `10e.org/hackedpage2/`（尾斜線）→ `https://10e.org/the-uninvited-1944-review/`；subpath_matching=true、preserve_path_suffix=false、preserve_query_string=false、include_subdomains=false。Cloudflare官方reference確認prefix匹配語義。HTTPS目錄根、單層、巢狀與nested?probe=1均direct301到固定文章，不留suffix/query；獨立一般HTTP單層與nested query亦direct301。HTTPS近似prefix `/hackedpage2x/sample.php`、無尾slash `/hackedpage2`、`/hackedpage3/sample.php`及未指定`/mt2/archives/xxx`均404；HTTP對前兩者只執行zone原有scheme-upgrade301至自身HTTPS路徑，再最終404，沒有到評論頁。目標`/the-uninvited-1944-review/`200 canonical。Cloudflare list21 items，舊20 IDs全保留，Bulk1條version1、Dynamic10條version10未改；既有Vietnam HTTP、Scrabby HTTPS與benders redirect回歸正確。OAuth保留。


<h2>2026-11-04《熊貓計劃》（Panda Plan）</h2>
使用者明確追加此一篇日文影評及`10e.org/mt/archives/200512/050511.php`轉址。核實2024首部Panda Plan（原題／日本正式名／導演／上映版本），沿用網站日文6段500–800字、2H2、2–4已讀原文來源与中長尾keywords。研究稿／source audit存repo外；slug和collection待研究後確認、唯一碰撞保護，只append一筆，148篇／151路由。原147篇資料／metadata／文章URL和HTML逐頁保持，check只增加精確新片斷言。先push main→Pages成功→正式新頁200／SEO，再POST現有Bulk list唯一source，四flagsfalse且query丟棄；list21到22 items、Bulk1條version1／Dynamic10條version10不改，hackedpage2/前綴映射仍保留。此明確追加要求按目前授權處理，不自行建排程或改日文網站語言，Cloudflare OAuth保留。

Panda Plan核實決策：日本配給Twins／映画.com共同「パンダプラン」、directorチャン・ルアン、中國2024製作、日本2026-01-23公開、99分。slug `panda-plan-2024-review`、collection「アクションコメディ映画ノート」，四已查讀原題sources「パンダプラン」（配給元）、「パンダプラン」（映画.com）、「Panda Plan (2024) Review」（The Action Elite）、「MAAC Review: Panda Plan」。正文評析本人役Jackie自我諷刺、practical身體喜劇與CG熊貓／人物腳本限制；年份用2024製作basis，日本公開2026註明。初稿版次有未核實續集日本2026公開說法已刪，首段查證旁白與工場fight護熊貓細節精確去除，其餘採研究證據不重新搜尋。唯一append一篇並保護原147篇data／HTML／URL，148篇151路由，先正式200再精確POST舊source；hackedpage2prefix回歸必保留。


使用者在Panda Plan Pages發布等待期間追加下一筆Redirect工作：等Panda Plan影評正式200並完成 `10e.org/mt/archives/200512/050511.php` →新影評301後，才執行 `10e.org/mt/archives/200511/260117.php` → `https://app.abiting.cc/archives/3263` 的唯一精確301。HTTP／HTTPS命中、query／suffix丟棄、相鄰路徑404，保留現有list items／Bulk1／Dynamic10。此項只列後續TODO，不與Panda Plan mapping同時執行；不登出Cloudflare。


Panda Plan完成：commit `02ff4fb3c992b8acbeeebb5d2eadd70874671aca`／Pages run `41765986891`success；正文751字、4個已讀原文來源；148篇／888段／151路由check通過，原147篇data／metadata／HTML byte-identical。正式頁200，Googlebot／Twitterbot200，首屏／canonical／Article／151 manifest／sitemap通過。之後唯一新增item `86be7b2400004c23937ad7bec74f086f`，operation `1d002b382a094ea596ea66483e3f3a75`completed；source `10e.org/mt/archives/200512/050511.php`→`https://10e.org/panda-plan-2024-review/`，四flagsfalse。HTTP／HTTPS direct301含query，Location固定且query丟棄；x.php／extra／xxx404，原hackedpage2與21條舊mapping保留；list22items、Bulk1version1、Dynamic10version10。使用者指定的App URL 200511/260117已記在TODO；遵守「Panda Plan完成後再執行」，將待在本完成commit／Pages成功後開始處理。OAuth保留。


使用者追加《仲夏魘》（Midsommar，2019）影評，要求明確提到「生贄」。已列為後續TODO；獨立研究其日本正式名／發行版本及可信批評，6段500–800日文，不把2020日本上映或Director’s Cut誤作原作年份／版本；在完成當前指定App 301後整合並發布，不改其他舊URL。來源題名保持原文，論述需解釋生贄在故事／主題中的作用，不只塞入單詞。


使用者後續App轉址已依次完成：Panda Plan文章與指定source均部署／驗收完畢後才執行。app.abiting.cc/archives/3263目標200。只新增item `0131c4efcaae4744bfca1fd354b57aac`／operation `dca3128c1e5444678e456a18bc79fdfc` completed，`10e.org/mt/archives/200511/260117.php`→`https://app.abiting.cc/archives/3263`，四flagsfalse。HTTP／HTTPS直接301且丟棄query；HTTPS neighbor `260117x.php`、suffix `/extra`、unspecified `260118.php`均404；Panda Plan先前mapping保持。list23 items（舊22 IDs全保留）、Bulk1ruleversion1／Dynamic10rulesversion10不變；OAuth保留。下一個內容項是已研究的Midsommar影評。


Midsommar內容審核PASS：A24原始美國劇場公開日2019-07-03／作品年2019；日本正式片名『ミッドサマー』、日本上映2020-02-21，映画.com日本劇場版147分。A24另標明171分Director's Cut；不把該時長套用原劇場版。RogerEbert頁首140分與三方147／171版本資料衝突，不採用。Hårga寫成電影架空共同體，未代表真實瑞典民俗；日文評論明確分析「生贄」如何在共同體以秩序與歸屬為名把人身代價化。新review slug `midsommar-2019-review`、collection「フォークホラー映画ノート」、四筆來源標題／URL採原文，段落504字／6段／4 source IDs、兩H2；build/check PASS，149篇／894段／152 routes，原148篇data／metadata與已生成HTML逐篇byte-identical。只依使用者請求新增review，沒有指定任何舊URL，故不建Midsommar redirect；待Pages確認後完成TODO。

正式Midsommar頁已部署驗收：commit `b504c8f49b9e48b51abd01fbf2971ad4826cfac8`／Pages run `41768090956`success，`https://10e.org/midsommar-2019-review/`200。production verifier讀到正文、四原文source links、canonical／og:url／Article author 10eKokoro、Googlebot／Twitterbot初始內容、manifest／sitemap／robots全部200，routes152且含新頁；本篇無使用者指定舊source，未建任何Cloudflare redirect，其他未知舊路徑仍404。TODO標記完成前版本研究、147／171分支及Hårga文化限制均有原始來源支持。


2026-11-04 Midsommar完成後，使用者追加唯一redirect：`10e.org/mt2/archives/200709/100347.php`→`https://abiurl.me/sAAOui`。source限定完整pathname；scheme省略匹配HTTP／HTTPS，所有四個precision flags false（include_subdomains、subpath_matching、preserve_query_string、preserve_path_suffix），query丟棄。先確認abiurl目標可達與目前23筆Bulk items尚無此source，再增加一筆；保留目前的hackedpage2/ prefix、Panda Plan與App items，Bulk1／Dynamic10規則不變。HTTP／HTTPS直達301；x.php／suffix與其他未指定路徑404；不登出Cloudflare OAuth。


2026-11-04指定abiurl redirect現場驗收完成。item `d5aa7ca3a9ee43749f3bdc1eea3725c8`／operation `53e03fcef78d425d89ac24dc708920e2`completed，`10e.org/mt2/archives/200709/100347.php`→`https://abiurl.me/sAAOui`，301及四flagsfalse。HTTP／HTTPS exact、含query均直接回301且Location保留使用者指定短網址原樣、query丟棄；相鄰100347x.php、suffix extra、未指定100348.php404。已確認短網址自身下一跳為301至`https://10e.org/midsommar-2019-review/`（200）；故保留短網址作第一跳，無替換目標。App archive 3263與Panda Plan mapping HTTP／HTTPS回歸PASS。第24筆後list24、舊23 IDs全保留，Bulk1version1／Dynamic10version10不變；Cloudflare OAuth保留。


2026-11-04新增《喵的奇幻漂流》（Flow）任務：沿用現有靜態JSON review資料／HTML build，不重建框架。以已研究來源確認作品及日本正式題名、版本和製作credit；使用原文source titles，正文依本站6段500–800字／兩H2規格，新增唯一slug與最貼切既有collection（若無則使用準確窄分類），以`src/content.json`單筆append。`scripts/check.mjs`延續所有舊斷言並更新總數150 reviews／153 routes；生成SEO／JSON-LD／sitemap／manus-routes後檢查，不動既有149篇與URL。使用者明確指定舊路徑`/mt2/archives/200705/160244.php`→新Flow頁，按先部署後轉址；部署頁先正式200，Cloudflare目前已知list24 items、Bulk1／Dynamic10，只在唯讀基線再次核實且source不存在時新增一條exact mapping，四個include-subdomains／subpath／query／suffix flags全部false。HTTP／HTTPS連含querydirect 301；相鄰與suffix仍404；不覆寫／刪除既有24個項目或ruleset，保留OAuth。

Flow研究完成：日本正式題與英題都保留『Flow』、原題Straume（映画.com核對），作品年2024製作／85分／ラトビア・フランス・ベルギー合作，日本2025-03-14公開；導演ギンツ・ジルバロディス。日本發行方ファインフィルムズ，不用初查猜測GAGA；本片是團隊Blender製作，未誤稱單人製作或無聲電影。選唯一slug `flow-2024-review`、新collection「国際アニメーション映画ノート」，不加進日本固定動漫5選或SF collection。使用日本官方H1原文、映画.com「Flow」、Cannes「FLOW」、BFI已讀H1「Flow: charming animal odyssey turns its limited resources into strengths」（非search snippet改寫）；以低位鏡頭、動物非台詞式表情／行為、協作與水景的魅力／危險並置分析，不把洪水因由、宗教寓言／人類下落認作被影片說明的事實。

Flow內容新增整合：6段實際747字、4sources均有對應sourceIDs引用，SEO title符合30–60字／description符合50–160字範圍，build/checkPASS150篇／900段／153routes；JSsyntax/diffcheck通過。與HEAD相比原149篇JSON／metadata／每篇HTML逐頁byte-identical，只有新Flow與首頁、archive、manifest、sitemap必要變化及check/TODO/plan。TODO僅appendFlow新條件，不改歷史。先讀取newarticle整合review，確認正式Pages部署後才新增唯一Cloudflare exact mapping。

Flow唯讀審核內容／sources／H2／SEO／153routesPASS；未設定legacy mapping符合本任務「部署頁200後才新增」階段，沒有提前宣告301完成。審核識別新文原先缺publishedAt／modifiedAt使builderfallback到舊站日期；修正僅在Flow JSON加入2026-11-04本次實際timestamp兩欄，並增加datePublished／dateModified／visiblebyline／sitemap lastmod專屬assertions，不改builder或舊149篇日期。既有未知路徑仍按正式站404，不因agent提到本地fallback改寬鬆routing。

Flow完成：日文評論747字／6段／4sourceIDs、來源原文H1與URL、兩H2、個別published/modified2026-11-04T13:55:29+08:00；正式頁`https://10e.org/flow-2024-review/`200。文章commit `efbd7440a9050c3b0895734f93204bac33737253`／Pages `41782252445`success；regular、Googlebot、Twitterbot首屏及canonical／Article／Person／source／153routes／sitemap／robots全PASS，發布日期schema/byline一致。確認目標200後只新增item `3ecf4fea817e4385892d5e0065336751`／operation `e6d66d326e3640099883ffd203e93cd7`completed，source `10e.org/mt2/archives/200705/160244.php`→新頁，301四flagsfalse。HTTP／HTTPS（均含query測例）直接Location新頁、不帶query；相鄰160244x.php／suffixextra／未指定xxx404，benders.gif／Scrabby／abiurl／hackedpage2prefix回歸正確。list25、舊24IDs保留，Bulk1version1／Dynamic10version10未變；Cloudflare OAuth依要求保留。原149篇資料／metadata／URL／HTML均byte-identical；只有Flow和必要首頁／archive／manifest／sitemap變化，TODO兩項完成。

<h3>指定圖片舊URL：samcimg3/hairy.jpg</h3>
下一筆由使用者明確指定的精確Bulk Redirect：`10e.org/samcimg3/hairy.jpg` → `https://abiting.cc/archives/16830`。目標已檢查回200；Cloudflare OAuth保持原狀。正式操作前唯讀確認來源不存在、list與ruleset容量／現況不變；新增後以HTTP／HTTPS、query丟棄、相鄰404及既有映射回歸驗收；不動Dynamic ruleset或其他Bulk項目。

<h3>hairy.jpg精確轉址完成</h3>
`https://abiting.cc/archives/16830`目標200。Cloudflare Bulk list新增唯一item `08448963038b438dbf251c18f51b3577`／operation `d5c003e335234661910de86776ec16bc` completed：source `10e.org/samcimg3/hairy.jpg` direct301 target，四個false flags（不含subdomains／subpath、丟query、不保留suffix）。普通GET獨立環境HTTP／HTTPS含query Location完全相符；相鄰hairyx、suffixextra、hairy.jpgx均404。`iguananeko.jpg`、`wain12.jpg`原映射保留。list26筆（之前25 IDs全保留），Bulk1/version1，Dynamic10/version10；OAuth保留。

<h3>inago.jpg圖片精確轉址</h3>
使用者在hairy.jpg mapping完成後追加 `10e.org/samcimg/inago.jpg` → `https://abiting.cc/wp-content/uploads/2026/11/locust.jpg`。兩筆按獨立精確路徑處理；先核實圖片target與Cloudflare list無重複，再追加；HTTP／HTTPS直接301、query丟棄、suffix不保留，near miss維持404。

<h3>inago.jpg精確轉址完成</h3>
目標 `https://abiting.cc/wp-content/uploads/2026/11/locust.jpg` 回200 image/jpeg。Cloudflare單筆item `95d1d16f157f42ff8bc799388d493338`／operation `a4042103342c4cddbdd8d54d6264d23c` completed：`10e.org/samcimg/inago.jpg`→目標，301且不含子網域／子路徑／query／尾綴。獨立一般GET驗收HTTP／HTTPS（含query）全部精確Location；inago.jpgx／inago.jpg/extra／inagox.jpg均404，hairy.jpg前項回歸PASS。list27筆、原26 IDs保留；Bulk1/version1、Dynamic10/version10維持，OAuth保留。

<h3>zghost3精確路徑轉址</h3>
使用者明確指定 `/zghost3/` 僅此路徑301到既有House 1977 review `https://10e.org/house-1977-review/`；此非wildcard，子路徑與相鄰路徑保持404。目標經HTTP可達性確認後，唯讀重驗27筆list與Bulk／Dynamic基線，再新增單一item、直接驗收兩種scheme及404邊界。

<h3>zghost3精確301完成</h3>
目標 `https://10e.org/house-1977-review/` 已由獨立一般GET確認200。Cloudflare Bulk item `d10da0614a694b3abe25f09db0e2477e`／operation `1a7fcd2328eb4bf58c16f925a0ff443c` completed：`10e.org/zghost3/`→House頁，301，include_subdomains/subpath_matching/preserve_query_string/preserve_path_suffix皆false。HTTP／HTTPS含query direct Location正確且不傳query；子路徑`/zghost3/anything`與近似路徑`/zghost30/`均404。list28項、舊27 ID保留；Bulk1/version1／Dynamic10/version10不變；OAuth保留。

<h3>Diana圖片與Suspiria文章舊URL轉址</h3>
使用者明確指定兩筆單一路徑：`10e.org/samcimg3/diana3.jpg`→`https://10e.org/one-missed-call-2004-review/`、`10e.org/mt2/archives/200804/240055.php`→`https://abiurl.me/BKKWr5（該短網址檢查後會301到https://10e.org/suspiria-1977-review/）`。兩目標已由獨立一般GET確認200。按exact Bulk item執行，各自host限定、query丟棄、不保留suffix／subpath；唯讀複核28筆來源及規則基線後才新增，逐一驗收HTTP／HTTPS與404邊界。

<h3>Diana與Suspiria兩筆精確301完成</h3>
兩目標均200。Cloudflare一次bulk operation `7757337fd1c2494199ed678165aa42e8` completed，只新增兩筆：item `8089db5bcfae4f7daf94db460fc0bb02`，`10e.org/samcimg3/diana3.jpg`→`https://10e.org/one-missed-call-2004-review/`；item `12ac87e160da48c8b7ff5f46e31faeb5`，`10e.org/mt2/archives/200804/240055.php`→使用者最後指定的`https://abiurl.me/BKKWr5`。兩者HTTP／HTTPS含query皆直接301至精確Location且不傳query；近似／suffix四種邊界都404。獨立GET確認short URL本身301至`https://10e.org/suspiria-1977-review/`且該頁200。list30，舊28 items保留；Bulk1/version1、Dynamic10/version10不變；Cloudflare OAuth未登出或撤銷。


## 杉原千畝（2015）單篇與flashchiune指定舊URL
沿用src/content.json append-only及既有靜態builder，研究2015年日本傳記電影的官方版本、戲劇敘事與命のビザ史實，六段日文500–800字、來源原題、正式日期與中長尾SEO。候選slug `sugihara-chiune-2015-review`；只新增此篇，保留150篇及既有article URL。GitHub Pages指定commit成功且正式新頁200／SEO驗收後，才將 `/flashchiune/chiune.htm` 精確301到新頁，不擴大匹配子路徑；Cloudflare以30筆list基線append一筆，保留Bulk1與Dynamic10及OAuth。

杉原千畝定稿：正式題「杉原千畝 スギハラチウネ」、國際題PERSONA NON GRATA、2015年12月5日日本公開、チェリン・グラック執導、139分；新分類「歴史・伝記映画ノート」。四來源為JFDB、JACAR、FCCJ與Toho Kingdom，原題不翻寫。六段實際去標籤／引註／空白正文675字（研究員含引註的724字不是站內正文基準）。發布／修改日期2026-11-08T09:09:48+08:00。build/check通過151篇／154路由；前150篇JSON及逐頁HTML byte完全相同。尚待指定commit的Pages發布與正式200驗收後才設定301。

## 杉原千畝影評與精確301完成
內容commit `56da432c1a443688a5f59cc812f8c1e076fead46`、Pages工作 `42433232992` 成功；正式 `https://10e.org/sugihara-chiune-2015-review/` 的一般訪客／Googlebot／Twitterbot皆200，六段675字正文／四原文來源／canonical／Article／日期／154路由與sitemap PASS。Cloudflare於新頁發布後才新增唯一item `47d0660d7dfa40cc929e0779978d63bf`，operation `d9c5d1b0e3944da49415caf23a8a1207` completed，`10e.org/flashchiune/chiune.htm`精確301到新頁，四個匹配／保留旗標皆false。原30映射指紋`dcdcfdd9`、Bulk`c4ab4582`、Dynamic`c83ffe9e`新增前後一致（排除新項目後比較）；list31／Bulk1/version1／Dynamic10/version10。獨立一般GET驗收兩協定含query direct301、不傳query；chiunex.htm、chiune.html、chiune.htm/extra與未指定路徑404，Diana／Suspiria前項回歸PASS。所有前150篇資料與HTML保留；OAuth未撤銷。

## 新增三項指定工作（2026-11-08）
依使用者順序先驗證並新增兩筆精確舊路徑：`/mt2/archives/200608/210343.php`→`https://abiting.cc/archives/16830`，`/mt/archives/200605/260129.php`→`https://list.abitingpokedex.com/pokemon/buzzwole/`。目標須先確認可用，Bulk清單需唯讀檢查來源不存在及既有規則基線；HTTP／HTTPS直接301、query丟棄，邊界和未指定舊路徑404。

上述兩筆完成後，研究並新增《剪刀手愛德華》（Edward Scissorhands，1990）一篇日文影評，沿用現有靜態JSON生成器，確認日本正式片名、來源原文標題及文章metadata，slug先做碰撞檢查；六段、500–800字、兩個H2、2–4個已查讀來源。只append，不改既有151篇。跑build/check並驗收152篇／155路由、首頁與文章SEO、Article與sitemap，先推送並等待GitHub Pages，再驗收正式文章200；僅此時新增使用者指定`/mt2/archives/200904/012303.php`精確301至新頁，query丟棄，其他舊路徑維持404。保留所有既有Bulk／Dynamic規則及Cloudflare OAuth。

前兩筆舊URL轉址完成：operation `9fea9fdc1f524724b3a334804a1624ac` completed，清單31→33；item `12e806f5157f41e581d4b81b9c42b90f` 及 `6f0ef04d607f4caebc3cde04843705a3`。兩個新target先驗收200；HTTP／HTTPS及query均直接精確301且不傳query，五項近似、尾綴及相鄰路徑404；獨立普通GET 17項全PASS。既有Sugihara與hairy mappings回歸正常；Bulk1/version1、Dynamic10/version10未變，OAuth保留。接下來僅研究及新增《剪刀手愛德華》，其舊URL仍待新頁正式部署驗收後才轉址。

Edward定稿：日本正式題「シザーハンズ」、原題Edward Scissorhands、ティム・バートン執導；1990年按美國公開年，日本公開1991年7月13日。片長有104／105分來源表記差，文章不宣稱單一片長。新分類「ゴシック・ファンタジー映画ノート」、slug `edward-scissorhands-1990-review`，六段實際797字，四原文來源與5個中長尾SEO詞；publishedAt／modifiedAt `2026-11-08T09:26:16+08:00`。build/check152篇／155路由PASS，原151篇JSON／網址／逐頁HTML全保留。舊`/mt2/archives/200904/012303.php`尚未新增轉址，仍等新頁正式部署與200驗收。

## 追加兩篇需求（2026-11-08）
使用者要求本輪Edward完成後，依序新增Interstellar與《日日是好日》日文影評，來源原題／日期／版本需核實；《日日是好日》的2019需辨識上映地區，不能直接當日本初映年或作品製作年。兩篇研究可平行、各自獨立來源筆記與草稿，但文章發布和精確301依序操作，維持既有site資料模型與網址。Interstellar source `/mt2/archives/200811/150154.php`；日日是好日source `/mt/archives/200502/270305.php`。每篇六段500–800字、兩個正文H2、2–4已讀原文來源与中長尾SEO詞，只append；每篇先build/check→Pages部署→正式新頁200驗收，再僅新增其精確Bulk mapping，HTTP／HTTPS／query皆direct301、query丟棄；邊界及其他舊路徑404、原規則與OAuth保留。

Edward完成：內容commit `ae0af25030533fa68ee84d4ac3ce33bf0731d06d`／Pages `42434390703` 成功，正式新頁200與全文／原文來源／SEO／155路由PASS後才加第34筆item `0c67066521ea444996e583924965db75`，operation `3b1287248c604458bedeb466febb5991` completed。原33映射指紋`1ec1aa1c`及Bulk`c4ab4582`／Dynamic`c83ffe9e`完全保留；独立HTTP／HTTPS与query精確301、四邊界404與前兩筆／Sugihara回歸共12項PASS。原151篇及OAuth保留。
Interstellar查重發現既有 `/interstellar-review/`（2014）。改採重新研究、必要時僅修訂此篇，保留現有URL、原發表日期及SEO/source URL；不建立重複頁。其餘151篇資料不變；現有152篇／155路由不增加。再將使用者指定200811/150154.php 301至這個既有URL，必須先驗收修訂頁正式上線。日日是好日仍為新增一篇，完成後預期153篇／156路由。

日日是好日追加指定來源：`https://abiurl.me/LsmvAg` 必須保留為其中一筆sources.url，先查讀其展開頁內容，sources.title使用來源原文標題；不得擅自展開換URL或未讀虛構該頁內容。此筆計入2–4個來源總數。

Interstellar修訂定稿：六段681字；保留 `/interstellar-review/`、原title／seoTitle／description、原發表日2026-10-17T09:18:45+08:00與既有BFI／Paramount source URL。已讀正文來源為BFI與RogerEbert；Paramount舊URL目前轉至頂頁，HTML title確為`Paramount`，以原文題名保留並顯示未能讀取作品本文的註記，不用此不可讀連結作電影事實根據。新增SF・宇宙映画ノート與5個中長尾SEO詞，modifiedAt使用本次實際時間；其他151篇不變，全站仍152篇／155路由。修訂頁部署且正式200／正文驗收後才新增200811/150154.php精確301。

Interstellar完成：commit `7d938ca02d183ad6bba7869c95d7a1ef9f3f39a7`／Pages工作 `42435190053` 成功，既有URL的681字修訂正式200／原SEO／Source／Article／155路由PASS後才新增item `d0efca91108b4c64881aa35e657bf8a5`，operation `6292791f254a40b1add2b24c93b21dbf` completed。原34映射指紋cb954060与Bulk／Dynamic保持，list35／Bulk1/version1／Dynamic10/version10；独立9項HTTP／HTTPS／query301、邊界404與Edward回歸PASS。其餘151篇JSON与HTML不变、原發表日及SEO／URL保留。接下來新增日日是好日一篇，不把台灣2019當日本初映年。

日日是好日定稿：大森立嗣執導、日本2018年10月13日公開／台灣2019年2月1日公開；保留原日文題，fullName含Every Day a Good Day。六段實際688字，四原文來源（JFDB、開眼、Hollywood Reporter、指定`https://abiurl.me/LsmvAg`）。陶藝短網址精確保留，source edition明示茶碗／陶磁史背景、非電影制作公開資料；正文消除「短縮URL遷移先」查證旁白，以器物與感官的電影分析自然引用。publishedAt／modifiedAt2026-11-08T09:42:58+08:00；collection「日々の暮らしを描く映画ノート」。build/check153篇／156路由PASS，前152篇data／URL／HTML逐頁完全不變。待正式Pages部署／新頁200之後才新增200502/270305.php單筆精確301。

日日是好日完成：commit `f2f2305198390c27f63a0c0628c3d6b602aa286e`／Pages `42435537516` 成功，正式新頁200／688字全文／四原文來源與LsmvAg／Article／156路由PASS後，新增第36筆item `a6f2baad33d543de9d9bc94fe04f7224`，operation `7b91f7634384430894e79f391249fc7b` completed。原35映射fingerprint71dc39d4及Bulkc4ab4582／Dynamicc83ffe9e不變（1/version1、10/version10）。独立10項HTTP／HTTPS／query301、三近似／suffix404、新頁200及Interstellar／Edward回歸全PASS。日本2018／台湾2019正確區分，指定陶藝短網址保持，其他152篇data／HTML不變，OAuth未撤銷。

## 追加Beauty Water與Joy（2026-11-08）
查重確認當前153篇中沒有Beauty Water／整形水或Joy／ジョイ，兩篇各新增一頁。研究與原文來源筆記可平行處理，但先收尾日日是好日，再依序Beauty Water→Joy：每篇附加、全站build/check／舊文章byte保護、Pages指定commit部署、正式新頁200驗收後才增該片唯一Bulk item。原source分別 `/mt2/archives/200612/230051.php`、`/mt2/archives/200911/220650.php`，HTTP／HTTPS皆直接301，query丟棄、精確路徑不匹配subpath或subdomain，其餘404。沿用六段500–800字、來源原題／URL、實際發布日和原canonical/SEO結構，Cloudflare原36項及1Bulk／10Dynamic規則不變。

Beauty Water定稿：日本題「整形水」、原題기기괴괴 성형수 / Beauty Water、チョ・ギョンフン執導；韓國2020製作／日本2021年9月23日公開、85分PG12（日本版本）。六段635字，四原文來源／5個長尾詞，publishedAt／modifiedAt2026-11-08T09:54:08+08:00。不將主程序的非露骨描述要求誤寫成電影本身「非露骨」，改用來源確認的原作變形抑制；首次source相鄰sup間加空格。build/check154篇／157路由PASS，原153篇JSON／URL／HTML逐頁不變。check的硬編碼末尾offset合併為自Underwater以來所有新文完整順序assert，既有內容／來源／SEO斷言保留並加本篇版次／日期／source精確assert。
Joy局部修正：日本官方頁的2015-12-25「劇場公開日」未能證明地區為日本，year／releaseYearBasis採可確認的2015製作年；日本2017-11-22影音發行資訊保留，避免誤稱日本院線初映。兩篇seoTitle補本站brand，Joy正文原794字未改。

Beauty Water完成：commit `fb156af4055c24fc54f2a76f3d87a7bf03778e54`／Pages `42436272426` 成功，主環境連線無response中斷，独立網路普通GET確認正式新頁與Googlebot／Twitterbot都200，HTML SHA256與已發佈14170bytes完全匹配；157route、sitemap、robots也逐檔指紋匹配。通過後才增第37筆item `23247e47d4124a1c8607b1e90c3f2f55`／operation `c5eca27aa53e4d0da7a91308a43a4ef2` completed。原36映射e0894f2f、Bulkc4ab4582與Dynamicc83ffe9e維持（Bulk1version1／Dynamic10version10）；独立9項HTTP／HTTPS與query direct301、三邊界404、target200及日日是好日回歸全PASS。原153篇及OAuth保留，之後才整合Joy。

Joy定稿：日本題「ジョイ」、原題Joy，2015製作／デヴィッド・O・ラッセル執導；不將日本官方網站的通用2015-12-25劇場日期斷言為日本院線公開日，日本2017-11-22影音發行資訊另列。六段794字、四原文來源、6長尾詞、SEO51字，collection「労働と家族の映画ノート」；publishedAt／modifiedAt2026-11-08T10:00:11+08:00。原人物Joy Mangano與電影的合成人物／脚色界線清楚，不冒充紀錄片。build/check155篇／158路由PASS，原154篇JSON／URL／HTML逐頁完全不變。下一步正式Pages發布、新頁200驗收後才新增200911/220650.php精確301。

Joy完成：内容commit `7f2dd84c5f7111f1f69d562e2ab3b2630edfc912`／Pages `42436666328` 成功。正式新頁200／794字全文／四原文來源／Article／158路由／sitemap／robots全PASS後才增第38筆item `017c9612ff074bb5b53c3c9c88632f9c`，operation `d847ef56ec62464eb12661c606636714` completed。原37映射9f386122、Bulkc4ab4582／Dynamicc83ffe9e維持；Bulk1version1／Dynamic10version10未改。独立GET7項成功（兩協定含query direct301與query丟棄、suffix404、新頁200、Beauty Water回歸）；兩相鄰探針timeout後只補查220650x.php／220651.php，兩者404／無Location PASS，全部9項完成。這輪五篇（Edward新增、Interstellar保留既有URL修訂、日日是好日／Beauty Water／Joy新增）及另兩筆外部目標301均完成；網站155篇／158路由，除指定Interstellar修訂外舊資料／網址保留，OAuth未撤銷。

## 追加《明天過後》與圖片路徑redirect（2026-11-08）
查重檢查155篇既有影評是否已有《The Day After Tomorrow》；只新增一篇日文評論。先多來源查證日本正式片名／2004年版本／導演／氣候災難表現，再依現有review資料模型append，六段500–800字與2–4筆來源原題，保護所有舊內容／URL。完成build/check及日期、canonical、Article、sitemap／156篇與159路由檢查後發布，正式新頁200才為 `/mt/archives/200501/010244.php`新增精確301。圖片來源`/imgpage/1026head.htm`目標`https://abiting.cc/archives/16830`，目標可獨立預先驗收，且在遵守list／ruleset capacity基線後可先獨立新增；兩筆只作精確單筆Bulk mapping，query／suffix不保留，未指定路徑維持404。保留既有規則及Cloudflare OAuth。

圖片頁1026head.htm完成：目標200確認後以單筆POST新增item `6b802505758941b18545d37cff7f6d0a`／operation `3938f6e2916a4f49adbb356c8b18f0ab` completed。list38→39，原38映射6ee140fe與Bulkc4ab4582／Dynamicc83ffe9e不變；仍Bulk1version1／Dynamic10version10。獨立一般GET7項PASS（HTTP／HTTPS含query直接301至abiting.cc/archives/16830、query丟棄、近似／suffix404及target200）；OAuth保留。電影新頁尚待build/check與正式發布，先不建立010244.php轉址。

《明天過後》定稿：日本正式名「デイ・アフター・トゥモロー」、英文The Day After Tomorrow、ローランド・エメリッヒ執導、2004年美國劇場用電影124分／日本公開2004年6月5日；slug `the-day-after-tomorrow-2004-review`，新collection「気候と災害の映画ノート」。六段正文754字、四筆原文來源、6個中長尾SEO詞，實際publishedAt／modifiedAt2026-11-08T10:12:40+08:00。本文分析都市災難特效、圖書館求生、父子救援的類型公式、墨西哥避難的國境反轉，並明確不把劇中幾日冰封當科學預測。只append一筆並以本篇精確斷言更新check，舊155篇與URL不修改。

《明天過後》全部完成：commit `6dc8a5f88998dfb84d175f954dc4b476a5b42476`／Pages `42437687595` success；正式新頁一般／Googlebot／Twitterbot200、754字全文與四原文來源、canonical／Article、159路由／sitemap／robots全PASS後才以單筆POST增第40項item `3f5df519aff74c018b7f020df9d99c35`，operation `23e9b0db4ec04c48832f83a296e58044` completed。原39映射7640f52c、Bulkc4ab4582與Dynamicc83ffe9e不變（1version1／10version10）。獨立10項一般GET驗收全PASS：舊010244.php HTTP／HTTPS含query direct301至新canonical、query丟棄，三nearby／suffix404，新頁200，1026head.htm與benders.gif映射回歸。兩項使用者要求均完成，網站156篇／159路由、原155篇資料／URL／HTML保留，OAuth未撤銷。

## 《UFO離奇命案》日文影評與指定舊URL301（2026-11-10）
使用金馬影展與NYAFF均列的2025作品年，繁中原名「UFO離奇命案」並列英文「Unidentified Murder」；不臆造日文官方片名。香港／台灣於2026上映，不與作品年份混用。節展列86／87分不一致，文章避免將單一片長當定論。研究筆記：`/home/ubuntu/source-title-audit/unidentified-murder-2025-2026-11-10.md`。只追加一篇日文評論，引用保持四來源頁面原題，確認原156篇及其URL完全不變；預期157篇／160路由。新頁上線200且SEO驗收後，方新增`/mt2/archives/200705/082350.php`唯一精確301，query與suffix不保留；其他未指定路徑維持404，不修改既有redirect規則，保留Cloudflare OAuth。

整合決策：slug `unidentified-murder-2025-review`，沿用「香港コメディ映画ノート」分類；正文六段800字、4個已查讀原文來源、6個長尾keywords。保留中文原題與英文題，不另造日文名稱。兩位導演郭家禧／李振傑各為一個Movie.director Person；新增可選`directors`陣列僅本篇使用，所有舊電影仍走既有單一director處理，無需改舊資料。標題／摘要為自然日文，不宣稱親自觀影。正式頁驗收200前不建立指定082350.php轉址；Cloudflare唯讀基線40筆、原items93fde31b／Bulkc4ab4582／Dynamicc83ffe9e，Bulk1version1／Dynamic10version10且新source無重疊。

本地建置與check完成：157篇／160路由全部PASS，原156篇JSON、metadata和HTML逐頁byte-identical。實際publishedAt／modifiedAt為2026-11-10T11:38:42+08:00；雙導演Movie.director陣列精確驗證通過。原通用check的單導演假設只增可選directors分支，不放寬舊單導演或TV作品檢查。文章正式發佈與精確301仍待完成。
