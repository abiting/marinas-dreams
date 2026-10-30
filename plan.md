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
