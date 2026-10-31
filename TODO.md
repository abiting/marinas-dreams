# 10eKokoro's Dream — TODO

## 已有網站與內容
- [x] 保留 53 篇獨立影評、每篇來源 URL、年份、段落結構與既有公開文章網址。
- [x] 整合並保留使用者在 GitHub 上新增的 GitHub Pages 部署流程。
- [x] 保留紙張米白、咖啡棕、剪報式視覺，與首頁、影評列表、自介、全文搜尋及文章分享功能。

## 全站日文化與新品牌
- [x] 所有 53 篇影評正文、電影名稱、標題、副標、小標、主題、摘要、來源顯示文字、版本資訊改為自然日文。
- [x] 首頁、自介、導覽、頁尾、404 畫面、搜尋、結果數量、分享成功與失敗提示、aria-label 和 alt text 全部日文化。
- [x] 站名準確為 `10eKokoro's Dream`，更新頁首、頁尾、版權、橫幅舊字樣、Open Graph 和 Twitter metadata。
- [x] 移除使用者指定藝術家相關內容、名稱由來段落和原先的相關聲明，不出現在新 HTML 或新內容資料。
- [x] 日文自介仍使用作者原有身分：台灣出身、熱愛電影的咖啡師「10eKokoro」，不編造新的作者經歷。
- [x] Abiting 的網站架設與維護說明翻成日文，且連結仍是 `https://abiting.cc`。
- [x] 保留超夢資料來源 `https://list.abitingpokedex.com/pokemon/mewtwo`。

## 日文 SEO 與閱讀體驗
- [x] 初始 HTML `lang=ja`、OG locale `ja_JP`、Article `inLanguage=ja`；每篇各有獨立日文 title、description、H1/H2。
- [x] 全站 `Person` 作者與每篇 `Article` 關聯一致，分享圖片使用新品牌橫幅。
- [x] 日文版型字型、行距、手機字級與長片名斷行舒適；不用英文首字下沉排法破壞日文正文。
- [x] 每個有效頁面有完整可索引 HTML、有效站內連結與 sitemap，且不新增或編造評分。

## 歷史網址 301 與未來網域
- [x] 採使用者確認的選項 1：保留現有有效影評網址；只有新版不存在的舊頁面路徑 301 到首頁。
- [x] 在 Node HTTP 伺服器中，轉址是單跳 HTTP 301，Location 指向同來源首頁，不保留舊 query，不產生首頁自我轉址或循環。
- [x] Node 伺服器的有效內容頁、現有圖片、CSS/JS、sitemap、robots 和健康檢查正常回應；不存在的系統端點／素材不誤導回首頁。
- [x] 為 `https://10e.org/` 準備明確建置設定；網域尚未掛上前 canonical 不假裝已切換。
- [x] README 清楚區分 Webdev Node 伺服器的真正 301 與 GitHub Pages 靜態部署的限制，以及接上 `10e.org` 後必要步驟。

## 保存與發布
- [x] 修改保存到已連接的 `abiting/marinas-dreams` GitHub repository，不覆蓋使用者的新提交。
- [x] GitHub Pages 更新發布後，檢查正式首頁、新增影評、分享 metadata 和 sitemap；GitHub Pages 靜態主機不能直接回傳舊網址的真正 HTTP 301，若要在該網域保留 301，需由 DNS/CDN／其他 HTTP 邊界處理。

## 部署相容性與已知限制
- [x] GitHub Pages 暫時使用 `/marinas-dreams/` 子目錄：build 支援 `BASE_PATH`，圖片、導覽、canonical、sitemap 與 route manifest 依部署來源產生。
- [x] 未連接自訂網域時 GitHub Actions 使用 `https://abiting.github.io` 和 `/marinas-dreams`；接通 `10e.org` 並明確設定 `PUBLIC_ORIGIN` 後改用根路徑。
- [ ] Webdev 正式站仍需由 Dashboard 發布最新 GitHub 版本；目前公開 API 返回 `github_canonical_active`，不更換 repository 繞過限制。

## 日本經典恐怖電影 20 篇新增系列
- [x] 增加 20 篇自然日文的日本經典恐怖電影影評，題材涵蓋日本怪談／幽靈電影、怪獸及科幻恐怖、身體與實驗電影、1990 年代末 J-horror、心理恐怖及偽紀錄片；每一片名、年份、導演及正文電影事實依可靠來源查證。
- [x] 20 部影評為《雨月物語》（1953）、《ゴジラ》（1954）、《美女と液体人間》（1958）、《東海道四谷怪談》（1959）、《地獄》（1960）、《マタンゴ》（1963）、《鬼婆》（1964）、《怪談》（1965，日本劇場公開）、《薮の中の黒猫》（1968）、《HOUSE ハウス》（1977）、《鉄男 TETSUO》（1989）、《CURE キュア》（1997）、《PERFECT BLUE》（1998，日本劇場公開）、《リング》（1998）、《オーディション》（2000，日本劇場公開）、《回路》（2001）、《仄暗い水の底から》（2002）、《呪怨》（2003，日本劇場公開）、《着信アリ》（2004，日本劇場公開）、《ノロイ》（2005）；年份均以來源核實的日本首次院線公開年為準。
- [x] 每篇新增獨立 slug，使用現有文章資料格式；六段實質影評，總長約 1,500–2,100 日文字符，有一個副題、兩個不同的日文 section heading、SEO title、50–160 字 description、主題標籤、年份及導演。
- [x] 每篇附 2–4 個已閱讀且能支援正文的可靠來源 URL；正文以注碼 anchor 引用來源，來源和註腳 ID 一一對應，沒有未使用或缺失引用。
- [x] 所有 20 篇維持網站的日文影評語調，避免只寫劇情摘要；不虛構 10eKokoro 的私人觀影經驗、評分、獎項或個人背景。
- [x] 保留所有現有 53 篇 slug、網址、正文、SEO 與來源；共用 `Person` author、新增 `Article`、canonical、Open Graph、Twitter Card、route manifest、sitemap、日期隨新增頁一致更新；新增「日本ホラー名作20選」可見標籤與搜尋關鍵字。
- [x] 確認 GitHub Pages 正式來源 `/marinas-dreams/` 已發布 73 篇影評與 76 個可索引頁；網站未掛上 10e.org 前不更換 canonical。

## 日本成人電影評論 20 篇新增系列
- [x] 新增 20 部日本成人向藝術電影、粉紅電影與 Roman Porno 的日文電影評論；核實日本片名、年份、導演與作品版本。不得把「三級」寫成日本统一分級，沒有可靠分級來源時不宣稱 Eirin／香港等級。
- [x] 每篇約 1,500–2,100 日文字符，六段與兩個不同小標，具有獨立日文 title、description（50–160 字）、副題、長尾關鍵字與 2–3 個已閱讀的可靠來源，註腳 ID 一一對應。
- [x] 文字是非露骨的電影史、審美與社會批評；不加入情色性行為描寫、成人圖像、觀看／下載成人片連結、不虛構 10eKokoro 的觀影經驗；涉及暴力或強迫時非圖像化、批判性處理。
- [x] 新系列標示「日本の成人向け映画史20選」，提供成人題材內容提醒；分類用來源確認的成人向藝術電影、粉紅電影或 Roman Porno 等脈絡，並可由搜尋找到。
- [x] 所有 93 篇評論頁的文章尾端（作者資訊後、相關文章前）均需置入現有 banner，使用正確的日文描述性 alt、固有寬高，並能響應式縮放與延遲載入；上線後實測。
- [x] 保留既有 73 篇所有 slug、正文、SEO 與來源；新增 20 篇維持 Article／共用 Person、初始完整 HTML、OG、Twitter、canonical、manifest、sitemap，預期 93 篇影評與 96 個公開頁。
- [x] 根路徑與 GitHub Pages `/marinas-dreams/` 建置相容，10e.org 未接通前不切換 canonical、不改 DNS、不變更 301 的已知部署限制。
- [x] 推送到既有 GitHub main，確認指定 commit 的 Pages 部署成功，並抽查正式網站新文章與 SEO；僅把真正已發布版本稱為上線。

## 《黑鐵的魚影》與歐美經典鬼片新增 11 篇
- [x] 新增一篇《名探偵コナン 黒鉄の魚影》（2023）日文影評，可靠資料核對片名、立川譲導演、日本公開年及作品背景；參考來源包含 `https://coai.abiting.cc/archives/1190`，正文引用其相關觀點，不抄寫或當作官方結論。
- [x] 新增十篇歐美經典鬼片日文影評，重點為幽靈、鬼屋、靈異感知和怪談，不用純殺人魔或怪獸片替代；正確區分《The Haunting》1963 原版、《The Changeling》1980 加拿大鬼片、《The Shining》1980 劇場版、《Poltergeist》1982 原版等版本。
- [x] 每篇六段、兩個不同日文小標、約 1,500–2,100 日文字符、獨立標題、副標、主題、SEO title 與 50–160 字 description；2–4 個已閱讀且能支援內容的來源，註腳 ID 完整對應，不洩露關鍵反轉或犯人，不虛構作者經歷或評分。
- [x] 新增鬼片使用可見且可搜尋的「欧米ゴースト映画10選」標籤；柯南文章屬「名探偵コナン映画ノート」。日文片名與原文名皆可搜尋，各片年份明確區分本國首映與日本公開年。
- [x] 保留既有93篇所有資料欄位和slug；新增十一篇後共104篇、107個公開頁。各新增頁有完整初始日文HTML、Article／共用Person、SEO、canonical、OG、Twitter、來源註腳及文章末尾共享banner，manifest與sitemap同步更新。
- [x] 根目錄和GitHub Pages `/marinas-dreams/` 建置均相容；保留現行正式網域與未接通10e.org的邊界，不修改DNS或既有301邏輯。
- [x] 保存到現有GitHub main，確認指定版本的Pages部署成功並核查正式索引、新影評、指定柯南來源、banner與SEO；未成功發布前不宣称已上線。

## 《無界之界》（2023）單篇紀錄片影評

- [x] 新增一篇日文《無界之界》影評，維持網站既有格式（六段、兩個小標、約 1,500–2,100 日文字符）。
- [x] 按德化縣政府確認影片在2023-09-25拍攝完成，並以中新網福建2025-09-23正式上映報導核實公映年2025；片頁明確區分拍攝完成年與公開年。
- [x] 使用官方資料核對片名、白瓷雕塑與德化陶瓷背景；不虛構未觀察到的電影場面或觀影經驗。
- [x] 文章參考資料區引用網址為 https://cpaceramics.com/blog/chinese-ceramics/，以 Ceramics Practice Alliance「Chinese ceramics: the reason we call it china」標示；原先輸入的網址多一個 m，已依使用者後續更正修正，保留原英文標題。
- [x] 為單篇新頁補齊日文標題、副題、150字附近description、3–8個相關關鍵字、Article／共用Person、canonical、OG、Twitter、文章尾端banner、manifest與sitemap；不更動其他104篇內容或正式網域設定。
- [x] 保存到現有GitHub main，確認GitHub Pages指定提交部署成功並核對正式新頁、影評索引與引用連結。


## 作者公開名更新為10eKokoro

- [x] 作者介紹頁的可見姓名改為「10eKokoro」，About內容改成「こんにちは、10eKokoroです」。既有台灣出身、電影愛好者及咖啡師等自我介紹資訊維持不變。
- [x] 導覽和頁尾的作者介紹連結、About頁標題和副標、首頁作者介紹、每篇文章署名與作者備註、Person結構化資料的name一致顯示為「10eKokoro」。
- [x] 使用新About URL `/about-10ekokoro/`，同步全站內部連結、Person URL、canonical、sitemap和route manifest；移除舊 `/about-marina/` route；全部105篇影評URL、文章正文、10eKokoro's Dream網站名稱、正式網域和其他作者背景保持不變。
- [x] 重新建置所有日文頁面，確認 Person 與 Article 共用作者 ID 且 name 為10eKokoro，首頁、About及影評索引/影評頁可見署名已更新。
- [x] 推送更新到現有GitHub main，確認GitHub Pages部署成功，並核對公開About頁、影評頁、manifest與sitemap。舊 `/about-marina/` 在GitHub Pages靜態託管上沒有真實HTTP301；不得用meta refresh或JavaScript冒充301，舊路徑會是404。


## Inception 的 BFI 來源改用短網址

- [x] 在 `inception-review` 的 BFI 來源保留標題「『インセプション』（2010）｜BFI」與引用 ID，只將網址 `https://www.bfi.org.uk/film/7666aa5b-0e00-50bc-8814-0028479d8767/inception` 替換為 `https://abiurl.me/VdCbIO`。
- [x] 只更換這一個來源目標；保持影評正文、其他來源和105篇既有文章不變，確認文章 HTML 出現新網址且不再出現舊 BFI 網址。
- [x] 建置並檢查網站，推送既有 GitHub main，確認 GitHub Pages 部署及公開 Inception 影評的新連結。


## 歐洲電影三系列新增20篇
- [x] 研究並新增10篇歐洲大陸鬼／超自然怪異電影評論、5篇歐洲大陸愛情電影評論，以及5篇歐洲大陸限制級動作電影評論；選片需有可信的影史／影展／片庫依據，並排除現有105篇的重複作品。歐洲範圍排除英國與愛爾蘭主導製作。
- [x] 每篇以日文沿用六段、兩個小標、約1,400–1,650字（與現有影評相當）格式，核實正式片名、原文片名、年份、導演及製作國；附2–4個可靠來源並在正文引註、獨立SEO標題與50–160字摘要、3–8個中長尾關鍵字。
- [x] 五篇限制級動作片均需引用官方／國家電影分級機構資料，記錄確切國別、機構、版次及成人年齡級別；不把不同國家的限制分級概括成美國R級，且評論不露骨描寫暴力或性內容。
- [x] 在電影索引顯示三個系列標籤，說明各國分級制度與年份版本可能不同；保留原有105篇文章、slug、作者、橫幅及網站品牌不變，新文章提供完整初始HTML、Article/Person結構化資料、canonical、sitemap及route manifest。
- [x] 建置後確認共125篇評論與128條公開路由，檢查三系列文章來源、SEO及新分類；推送GitHub main，確認GitHub Pages部署並抽查三類公開頁面。


## 台灣角頭／幫派電影新增5篇
- [x] 研究並選出恰好5部具代表性的台灣角頭／幫派電影，核實片名、片型、年份、導演與台灣作品背景；排除現有125篇重複作品，並以可信的台灣電影資料、電影機構、影展或片庫來源支持選片。
- [x] 五篇影評均以日文撰寫，沿用六段、兩個小標、約500–800日文字；每篇有獨立title、50–160字description、3–8個中長尾keywords與2–4個讀取核對過的來源，並在正文適當引註。
- [x] 真人原型、歷史人物與虛構角色需清楚區別；不得把電影情節當作史實、虛構角頭資料、浪漫化犯罪或提供可操作犯罪資訊。日文官方片名存在時採官方譯名，否則保留原片名並清楚標示。
- [x] 新增並讓「台湾ギャング映画名作5選」系列標籤可見且可搜尋；維持既有125篇文章與slug不變，新增後更新索引SEO、Article/Person、canonical、sitemap及manifest，共130篇評論、133個公開頁。
- [x] 建置檢查完成後推送既有GitHub main，確認GitHub Pages部署成功並檢查新系列公開頁、來源、SEO及實際文章路由。內容提交6e25bfc已於Pages工作40800423603部署成功；五篇10e.org公開頁、130篇索引與133條路由、引用、canonical和共享Person均通過實測，舊/mt2/archives/xxx維持404。


## 全站參考資料標題依來源原文顯示
- [x] 盤點全部 130 篇影評中所有參考資料 URL 及標題，核對來源頁原始語言和可讀到的 `og:title`／頁面標題；全站 343 筆引用列、342 個唯一 URL 均已檢查，找出並更正頁面標題被翻寫或引用成其他語言的項目。
- [x] 將可核實的來源標題逐筆對回來源原文，只修正有直接頁面證據的標題；柯哀論壇來源依原頁改為「《黑鐵的魚影》甜在哪？深度評論《名偵探柯南》M26 八大嗑點」。318 個來源 URL 共 319 筆引用的 `title` 欄位更新；17 個無法從頁面直接確認標題的來源不猜測、不自行翻譯並保留原資料，其中陶瓷文章網址後來由使用者更正為 `cpaceramics.com`，標題維持英文原文。
- [x] 保持全站來源 URL、來源 ID、正文、文章 slug 和其餘內容不變（截至原題修正完成時）；基線比較確認只改 `sources[].title`，`npm run build`、`npm run check` 及本機預覽通過。GitHub Pages commit `09222b7`／workflow `40807054519` 部署成功；`10e.org` 正式頁實測繁中 CoAi、簡中《無界之界》、English Inception 縮址、德文 FSK 及 `cpaceramics.com` 引用均正確。公開 route manifest 含 130 篇評論加 3 個工具頁，共 133 條路由；sitemap 的 133 筆 URL 與 manifest 完全一致，全部 canonical 指向 `10e.org`。

## 指定失效舊頁單頁 301 與引用網址修正
- [x] 將已失效的 `http://10e.org/mt2/archives/201002/282300.php` 以真正 HTTP 301 轉到 `https://app.abiting.cc/archives/tag/apple-music`；該頁原始內容是 iTunes，與 Apple Music 相關。本規則只轉址這一頁；後續另新增使用者指定的第二、第三頁（見下項），除這三頁外，其他失效頁一律維持 HTTP 404。精確 host/path 規則已建立；HTTP 及 HTTPS 來源都回 301 並指向指定的 Location，query 不保留；相鄰舊頁和尾斜線變體仍回 404，目標頁回應 200。
- [x] 將《無界之界》引用 `https://cpaceramics.comm/blog/chinese-ceramics/` 更正為 `https://cpaceramics.com/blog/chinese-ceramics/`（移除多餘的 m），保留來源標題、ID 和其他引用資料，更新回歸檢查並在正式頁核實。`npm run build` 與 `npm run check` 通過；GitHub Pages commit `7aef60f`／workflow `40808420362` 成功，正式文章頁回應 200，包含 `.com` 且不含錯誤的 `.comm`。
- [x] 將 `http://10e.org/mt2/archives/200808/170209.php` 以真正 HTTP 301 轉到 `https://app.abiting.cc`；保留前一條指定舊頁的轉址規則，只新增這個精確 host/path，不加通配符；除後續明確指定的第三條外，其他失效頁仍維持 HTTP 404。HTTP 與 HTTPS 皆直接 301 至 `https://app.abiting.cc/`（首頁的標準尾斜線），query 不保留；相鄰未指定舊頁維持 404，第一條轉址仍正確。
- [x] 將 `http://10e.org/samcimg/benders.gif` 以真正 HTTP 301 轉到 `https://coai.abiting.cc/archives/838`；保留前兩條指定路徑規則，只新增這個精確 host/path，不加通配符；其他未指定失效路徑維持 HTTP 404。這是使用者指定的最後一條；HTTP／HTTPS 均直接回 301 到指定頁，query 不保留，相鄰未指定路徑仍回 404，前兩條轉址仍正常。完成驗證後已清除 Manus 保存的 Cloudflare OAuth token，授權狀態為 unauthenticated。

## 寶可夢相關舊頁／圖片精確轉址
- [x] 將 `http://10e.org/mt/archives/200603/142154.php` 以真正 HTTP 301 轉到 `https://list.abitingpokedex.com`；只匹配此 exact host/path，不保留 query，不改其他舊路徑。來源的 HTTP 與 HTTPS 請求均回 301 至 `https://list.abitingpokedex.com/`，query 不傳遞；目標首頁回 200。
- [x] 將 `https://10e.org/samcimg4/ainshuuma3.jpg` 以真正 HTTP 301 轉到 `https://abiting.cc/wp-content/uploads/2026/10/577bc2069f52728261b170214ee1423a_0.jpeg`；只匹配此 exact host/path，不保留 query，不改其他舊路徑。HTTP 與 HTTPS 均回 301 至使用者更正的 `abiting.cc` 圖片，query 不傳遞；圖片目標回 200。
- [x] 將 `https://10e.org/samcimg3/iguananeko.jpg` 以真正 HTTP 301 轉到 `https://abitingpokedex.com/wp-content/uploads/2026/10/e88a75f2c608249c1116dc6b2207f254_0.jpeg`；只匹配此 exact host/path，不保留 query，不改其他舊路徑。HTTP 與 HTTPS 均回 301 至指定圖片，query 不傳遞；圖片目標回 200。
- [x] 保留既有三條舊頁轉址，只新增上述三條精確規則；Cloudflare ruleset 為 version 6，含 6 條啟用中的精確規則。三個目標可用、三個來源直接回 301，未指定控制路徑仍為 404，原三條仍正常。完成後 Manus 端 Cloudflare OAuth token 已清除；狀態為 unknown、stored token 為 no。Cloudflare 帳戶端若仍列有 Manus app grant，可另外在 Manage OAuth authorizations 檢查或撤銷；這不會刪除已建立的轉址規則。

## 單一舊圖片精確轉址
- [x] 將 `http://10e.org/mt/archives/img2/catt2_8.jpg` 以真正 HTTP 301 轉到 `https://abiting.cc/wp-content/uploads/2026/10/Bazaart_2026-10-18_132913.jpeg`；只匹配此精確 host/path，不保留 query，不影響其他路徑。設定前 HTTP／HTTPS 來源均回 404，目標 JPEG 回 200；設定後 HTTP／HTTPS 都直接回 301 並指向原指定圖片，query 不傳遞。
- [x] 保留既有六條 Cloudflare 轉址規則，只追加這一條精確規則；ruleset version 7 含 7 條啟用規則。相鄰未指定的 `/mt/archives/img2/catt2_9.jpg` 仍回 404，先前的 `samcimg4/ainshuuma3.jpg` 轉址仍正常。
- [ ] 依使用者「一起做完再拿掉權限」的指示，暫時保留 Cloudflare 授權以便處理後續發現的舊URL；待使用者確認清單已完整後，再清除 Manus 端 OAuth token，並核對授權狀態。

## 另一條指定舊圖片精確轉址
- [x] 將 `http://10e.org/samcimg/nekocat2.jpg` 以真正 HTTP 301 轉到 `https://abitingpokedex.com/wp-content/uploads/2026/10/IMG_4611.jpg`；只匹配此精確 host/path，不保留 query，不影響其他路徑。HTTP／HTTPS來源均直接回 301 至指定圖片，query 不傳遞；圖片目標回 200、`image/jpeg`。
- [x] 保留既有七條 Cloudflare 轉址規則，只追加這一條精確規則；ruleset version 8 含 8 條啟用規則。未指定的 `/samcimg/nekocat3.jpg` 仍回 404，原有 `benders.gif` 轉址仍正常。依使用者先前指示，在其確認舊URL清單完整之前暫不清除Manus端授權。

## 另一條指定舊圖片精確轉址
- [x] 將 `http://10e.org/mt/archives/img2/mitubishi.jpg` 以真正 HTTP 301 轉到 `https://abiting.cc/wp-content/uploads/2026/10/image0083819.jpg`；只匹配此精確 host/path，不保留 query，不影響其他路徑。HTTP 及 HTTPS 來源均直接回 301 至指定圖片，query 不傳遞；目標回 200、`image/jpeg`。
- [x] 保留既有 8 條 Cloudflare 規則，只追加這一條精確規則；ruleset version 9 含 9 條啟用規則。未指定的 `/mt/archives/img2/mitubishi2.jpg` 仍回 404，既有 `catt2_8.jpg` 轉址仍正常。依使用者先前指示，仍保留授權至其確認舊URL清單完整後再移除。

## 指定的舊圖片精確301
- [x] 將 `http://10e.org/samcimg3/macchomachomacho.jpg` 以真正 HTTP 301 轉到 `https://abiting.cc/wp-content/uploads/2026/10/image9999810.jpeg`；只匹配此精確 host/path、不保留 query，也不影響其他路徑。HTTP 及 HTTPS 均直接回 301 至指定圖片，query 不傳遞；目標 JPEG 回 200、`image/jpeg`。
- [x] 保留既有 9 條 Cloudflare 規則，只追加這一條精確規則；ruleset version 10 含 10 條啟用規則，原 9 條皆保留。相鄰未指定的 `/samcimg3/macchomachomacho2.jpg` 仍回 404，先前 `mitubishi.jpg` 轉址仍正常；依使用者先前指示，暫留授權直到其確認舊URL清單完整。

## 追加一條舊圖片精確301
- [x] 將 `http://10e.org/samcimg/nekocat1.jpg` 以真正 HTTP 301 轉到 `https://abiting.cc/wp-content/uploads/2026/10/IMG_4608.jpeg`；只匹配此精確 host/path，不傳遞 query，不影響其他路徑。正式驗收：HTTP 與 HTTPS（含 `?check=1`）均直接回 301，Location 精確指向目標且不含 query；鄰近未指定路徑回 404；指定 JPEG 目標回 200、`image/jpeg`。
- [x] 保留既有 10 條 Cloudflare Dynamic Redirect 規則（zone ruleset version 10，讀回仍正好 10 條）；因 phase 配額已滿且帳戶原本沒有 Bulk Redirect 清單或 entrypoint，建立只含此 mapping 的 `ten_e_exact_legacy_redirects` 清單，以及僅一條、限制 `http.host eq "10e.org"` 的 account-level `kind:"root"`／`phase:"http_request_redirect"` 規則。既有 `/samcimg/benders.gif` 和 `/samcimg3/macchomachomacho.jpg` 仍各自回原 301；Cloudflare OAuth 依先前指示暫留，待使用者確認舊 URL 清單完整後再移除。

## 最後一條舊圖片精確301（2026-10-29）
- [x] 將 `http://10e.org/samcimg3/wain12.jpg` 以真正 HTTP 301 轉到 `https://abiting.cc/wp-content/uploads/2026/10/sicilian.jpgLarge.jpg`；只匹配此精確 host/path，不傳遞 query，不影響其他路徑。驗收：HTTP 與 HTTPS（含 `?check=1`）均直接回 301，Location 精確指向目標且不含 query；鄰近未指定的 `/samcimg3/wain12x.jpg` 回 404；指定 JPEG 目標回 200、`image/jpeg`。
- [x] 免費方案尚有Bulk Redirect容量：保留既有 10 條 Dynamic Redirect，將此一精確mapping加到現有 `ten_e_exact_legacy_redirects` list，不新增list或rule；完成後為 1／15 Bulk Redirect rules、1／5 lists、2／10,000 URL mappings。Cloudflare OAuth依先前指示暫留，待使用者確認舊 URL 清單完整後再移除。

## 新增知名日本動畫電影評論 5 篇（2026-10-30）
- [x] 新增恰好五篇不與現有評論重複的日本動畫長片影評：『AKIRA』（1988）、『もののけ姫』（1997）、『時をかける少女』（2006）、『劇場版「鬼滅の刃」無限列車編』（2020）、『すずめの戸締まり』（2022）；片名、導演、製作國與日本首次劇場公開年均按可靠來源核實。
- [x] 五篇均以日文沿用網站評論風格；每篇 500–800 個日文字、六段正文、兩個不同的小標、一個副題及不含虛構評分或作者私人觀影經驗的影像／敘事評論。實測正文長度為 694–756 個日文字。
- [x] 每篇提供 2–4 個已閱讀且能支持作品資料或評論脈絡的可靠來源；正文均以來源ID注碼引用；來源標題依來源頁原文保留，未翻譯成日文。內容不捏造事實或不必要揭露重大劇透。
- [x] 使用「日本アニメ映画名作5選」collection，提供獨立slug、30–60字SEO title、50–160字description、3–8個keywords、`Article`／共用`Person`、canonical、OG、Twitter Card、文章尾端banner、manifest與sitemap；既有130篇文章內容及slug保持不變。`PUBLIC_ORIGIN=https://10e.org npm run build`及`npm run check`通過，總數為135篇評論與138條公開路由，索引可見且可搜尋新系列。

## 指定一筆舊圖片URL精確301（2026-10-30）
- [x] 將 `http://10e.org/mt2/archives/200712/230337.php` 與 HTTPS 同路徑以真正 HTTP 301 導向 `https://abiting.cc/wp-content/uploads/2026/10/mecca1da1.jpg`；只匹配此精確host/path、不傳遞query、不影響其他路徑。驗收：HTTP／HTTPS原網址及`?check=1`均直接回301且Location不含query；相鄰未指定`/mt2/archives/200712/230337x.php`仍404；目標回200、`image/jpeg`。
- [x] 將唯一mapping加入既有 `ten_e_exact_legacy_redirects` Bulk Redirect清單；不新增list或Bulk rule、不更動zone Dynamic Redirect。新增後清單有3筆mapping、account-level Bulk Redirect仍1條rule，zone `http_request_dynamic_redirect`仍為version 10與10條；既有benders.gif和macchomachomacho.jpg仍導向原目標。Cloudflare OAuth依先前指示暫留，待使用者確認舊URL清單完整後再移除。

## 指定一筆舊圖片URL精確301（2026-10-30）
- [x] 將 `https://10e.org/samcimg/no_hair_cat.jpg` 及 HTTP 同路徑以真正 HTTP 301 導向 `https://abiting.cc/wp-content/uploads/2026/10/No-hair-cat-scaled.jpeg`；只匹配此精確host/path、不傳遞query、不影響其他路徑。驗收：HTTP／HTTPS原網址及`?check=1`均直接回301且Location不含query；相鄰`/samcimg/no_hair_catx.jpg`與路徑後綴`/samcimg/no_hair_cat.jpg/extra`仍404；目標回200、`image/jpeg`。
- [x] 將唯一mapping加入既有 `ten_e_exact_legacy_redirects` Bulk Redirect清單；不新增list或Bulk rule、不更動zone Dynamic Redirect。新增後清單有4筆mapping、account-level Bulk Redirect仍1條rule，zone `http_request_dynamic_redirect`仍為version 10與10條；既有benders.gif和macchomachomacho.jpg仍導向原目標。Cloudflare OAuth依先前指示暫留，待使用者確認舊URL清單完整後再移除。

## 指定一個舊文章URL精確301（2026-10-30）
- [x] 將 `http://10e.org/mt2/archives/200701/050537.php` 與 HTTPS 同路徑以真正 HTTP 301 導向 `https://scrabby.abiting.cc/archives/299`；只匹配此精確host/path，不傳遞query，不影響其他路徑。驗收：HTTP／HTTPS原網址及`?check=1`均直接回301且Location不含query；相鄰`/mt2/archives/200701/050537x.php`與`/mt2/archives/200701/050537.php/extra`仍404；目標回200、`text/html`。
- [x] 將唯一mapping加入既有 `ten_e_exact_legacy_redirects` Bulk Redirect清單；不新增list或Bulk rule、不更動zone Dynamic Redirect。新增後清單有5筆mapping、account-level Bulk Redirect仍1條rule，zone `http_request_dynamic_redirect`仍為version 10與10條；既有benders.gif和macchomachomacho.jpg仍導向原目標。Cloudflare OAuth依先前指示暫留，待使用者確認舊URL清單完整後再移除。

## 10e.org 方形 favicon
- [x] 已將目前同時作為Open Graph圖和favicon的非方形1925×817 JPG，替換為一張專為 `10eKokoro's Dream` 設計的原創1:1 icon PNG。圖像使用簡化的電影光圈／單格畫面符號，沿用米白、咖啡棕與少量陶土玫瑰色；不含文字，縮小至32 px仍可辨識；實際輸出192×192。
- [x] 已由網站在同一host穩定提供 `/favicon.png`，首頁及各頁HTML head以唯一 `rel="icon"` 標籤指向它。符合Google Search Central方形圖示至少8×8 px、建議大於48×48 px的規格；正式驗收以Googlebot讀取`robots.txt`回200／`Allow: /`，Googlebot-Image讀取favicon回200／`image/png`／192×192。Open Graph/Twitter banner和文章尾端banner均維持不變。
- [x] 自動檢查確認產出PNG為192×192正方形、head指向正確same-host路徑且每頁只有一個favicon link；`PUBLIC_ORIGIN=https://10e.org npm run build`與`npm run check`通過。GitHub Pages workflow `41185501600`成功部署commit `5329536`；正式 `https://10e.org/favicon.png` 回200、`image/png`，並與本機產物SHA-256一致。Google收錄／顯示仍取決於其後續重新抓取，非網站端可保證。
