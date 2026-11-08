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

## 方形 favicon 圖案放大（2026-11-01）
- [x] 已保留目前電影光圈圖案、配色與192×192正方形畫布，裁除多餘外圍留白並等比例放大中央符號，不切到圖案邊緣。實測符號邊界為160×159 px，最小安全邊距為16 px。
- [x] 已以同一穩定URL `/favicon.png` 重新部署；正式檔維持192×192 `image/png`。GitHub Pages workflow `41276754643`成功部署commit `3dc8767`；正式圖檔回200，SHA-256與最新建置產物一致，首頁唯一favicon link與Open Graph/Twitter banner均不變。

## 方形 favicon 再放大（2026-11-01）
- [x] 已保留目前圖案、配色與192×192畫布，再縮減外圍留白，電影光圈符號實測180×178 px，仍完整不切邊，四邊安全距離6–7 px。
- [x] 已以原穩定URL `/favicon.png` 重新建置部署；正式站提供最新192×192 `image/png`。GitHub Pages workflow `41285254656`成功部署commit `b809956`；正式圖檔回200、SHA-256與最新build產物一致，首頁favicon標記和OG/Twitter banner不變。

## Footer Abiting 超連結（2026-11-02）
- [x] 已將所有公開頁footer顯示文字「Abiting」的目的網址由 `https://abiting.cc` 精確替換為 `https://abitingdiscord.com`；未更改其他內容中的外部連結、footer文字、版面或SEO metadata。
- [x] 已重新建置與檢查，138個生成頁皆含新網址且無footer舊網址。GitHub Pages workflow `41372989656`成功部署commit `f490ee5`；正式首頁、About頁和文章頁均直接驗證「Abiting」連向新目的網址。

## 魔女狩り影評、兩篇紀錄片介紹與精確舊URL轉址（2026-11-02）
- [x] 已新增三篇研究型日文影評／介紹，既有135篇未被改寫：代表性魔女狩り電影『クルーシブル』（The Crucible，作品年1996；日本院線首映1997-04-26，導演ニコラス・ハイトナー），官方日本Netflix頁未譯名的紀錄片Chaos: The Manson Murders（2025，導演Errol Morris；Netflix於2025-03-07上線），以及官方頁未譯名的`Secret Life of Pearls`（2016，為National Geographic製作）。前者明確區分戲劇改編與史料；Manson文章明示CIA／MKUltra因果未獲證明；珍珠文章把品牌／節目宣傳說法限制為宣傳語境。
- [x] 每篇均為日文六段正文、兩個小標、無虛構評分或作者私人觀影經驗；正文長度依序727、670、796個日文字，各有4項已查讀來源且所有來源ID均在正文註碼、來源標題維持原文。三頁皆有獨立slug、原題／公開年份依據／版次、4個keywords、合規SEO title／description、Article與共用Person、canonical、OG、Twitter Card、manus-routes和sitemap。`src/site.json`的預設`publicOrigin`亦已同步為正式`https://10e.org`，故不帶環境變數的建置和檢查同樣輸出正確canonical。
- [x] GitHub Pages workflow `41386364307`已成功部署commit `ce8f753`；Googlebot UA直接讀取三篇正式文章皆回200，並含10e.org canonical和Article JSON-LD。全站`npm run build`與`npm run check`通過，總數為138篇評論與141條公開路由。
- [x] 已將 `http://10e.org/mt2/archives/200912/152304.php` 精確HTTP 301至 `https://10e.org/the-crucible-1996-review/`，`http://10e.org/mt2/archives/200911/250337.php` 精確HTTP 301至 `https://10e.org/chaos-the-manson-murders-2025-review/`，`http://10e.org/mt2/archives/200705/112333.php` 精確HTTP 301至 `https://10e.org/secret-life-of-pearls-2016-review/`。三筆均在既有Bulk list中設為無scheme的exact host/path、301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`；item IDs依序為`113555bc1df04edcb27b50042869e83e`、`80923441b9334746bd5171ccaac9bd85`、`30351e74e49846e5a4a824a63344bedf`，批次operation `d068709f439e45469debf80a56b8e30c`已completed。HTTP／HTTPS與`?probe=1`均回direct 301且Location不含query，三個目標皆回200；相鄰未指定路徑均為真404，既有Dynamic Redirect仍是10條且兩條回歸轉址保持正確。

## 指定圖片檔精確301（2026-11-02）
- [x] 最終更正為 `http://10e.org/mt2/archives/200903/310230.php` 以真正HTTP 301導向 `https://app.abiting.cc/archives/5371`；只匹配此精確host/path，HTTP與HTTPS皆direct 301、不傳遞query。`?probe=1`的Location不含query；相鄰`310230x.php`及子路徑`310230.php/extra`仍404；新目標回200、`text/html`。兩次誤植來源`200904/072253.php`在HTTPS均恢復404，HTTP僅升級至同一路徑HTTPS後回404。
- [x] 依序移除最初誤植來源item `351cadcb7be84571b0ea420d3a47a614`（delete `949ec71e4d844bc5acdb21cce4d4d534`）、移除錯誤圖片目標item `30349a5f32cc43198a7bf5844269c0a9`（delete `7b8b152d02ef4eaa8c609bdebe0e87aa`），並新增最終item `b9f77d27eb3d402dbbf075be51b9b6e8`（create `c7f62f5fa8ea490181894df037a5e52f`）。最終status 301、`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`；list仍9筆、account Bulk rule 1條、zone Dynamic Redirect 10條/version 10。既有`benders.gif`與`macchomachomacho.jpg`回歸正常；Cloudflare OAuth依先前指示暫留。


## The Good, The Bad, The Hungry（2019）日文影評與舊URL 301（2026-11-02）
- [x] 新增一篇不覆寫既有138篇的日文評論，官方英文片名按ESPN原文記為`The Good, The Bad, The Hungry`，年份2019、導演Nicole Lucas Haimes；以小林尊六連霸、2007年Chestnut終止其連勝與影片對競食／媒體包裝的呈現為主題，避免把賽事宣傳詞當成史實或將小林簡化成「輸家」。既有138篇前綴保持不變，新篇為第139篇尾端資料；Git commit `9245c21`與GitHub Pages run `41399476283`均已成功。
- [x] 正文500–800個日文字、六段、兩個小標；無虛構評分或私人觀影經驗。以2–4個已查讀可靠來源支援片名／導演／年份及小林故事，正文注碼對應來源ID，來源標題保留來源頁原文。新頁具獨立slug、原題／公開年份依據／版次、4個keywords、55字SEO title、87字description，沿用Article與共用Person、canonical、OG、Twitter Card、manus-routes及sitemap；正式頁與獨立唯讀審核均通過，正文為771字且重複inline小標已移除。
- [x] 將 `http://10e.org/mt/archives/200508/160103.php` 以精確HTTP 301轉至 `https://10e.org/the-good-the-bad-the-hungry-2019-review/`；HTTP與HTTPS均命中同一新頁、不傳query，只匹配指定host/path。Bulk list item `842ea3fbcd0e4725a9c6630e3091adc9`（operation `aa21379707be41b1abe86f4a99bfa86e`）已completed；HTTP／HTTPS與`?check=1`均為direct 301，兩個相鄰／子路徑為404，Bulk list為10筆、account Bulk rule為1條、zone Dynamic rules仍為10條/version 10。

## 臥虎藏龍／グリーン・デスティニー影評與舊 URL 301（2026-11-03）
- [x] 依使用者指定的《臥虎藏龍》（正式英文片名 Crouching Tiger, Hidden Dragon）撰寫查證後的日文影評。已有同片文章，更新 `crouching-tiger-review` 而不建立重複評論，保留既有網址及 publishedAt；其他 138 篇資料、全站 favicon、banner 與 footer 不變。本文六段、兩小標，沿用日文 500–800 字規格，正確辨識日本片名グリーン・デスティニー、2000 年、アン・リー與日本公開依據；來源按來源頁原文標題並有正文注碼，無虛構評分或私人觀影經驗。
- [x] 更新頁沿用既有 Article／Person、獨立 SEO title／description／keywords、10e.org canonical、OG／Twitter Card、manifest 與 sitemap。正式頁部署後回 200，評論維持 139 篇、公開路由 142 條。
- [x] `http://10e.org/mt2/archives/200812/122337.php` 精確 HTTP 301 至 `https://10e.org/crouching-tiger-review/`，HTTP／HTTPS 均命中且不傳 query；只追加此 mapping，其他 Bulk／Dynamic 規則不更動，相鄰與子路徑維持真正 404。Cloudflare 授權按先前指示保留。

完成證據：778 字六段日文影評及四來源引註通過完整 build/check 與唯讀整合審核，139 篇／142 路由不變、其他 138 篇資料與原 publishedAt 不變。內容 commit `929f8f5` 由 Pages run `41575429248` 成功部署；一般 UA 與 Googlebot 讀取更新頁回 200，正文、四個原文来源標題、canonical、Article、footer 和 sitemap 正確。Cloudflare 新 item `753c959d12324673843f7446d35d10ba`／operation `ce5ecd7cd31848b28bd0daee2c073dbb` 已 completed；HTTP／HTTPS 與 `?check=1` 全部 direct 301 至無 query 的文章，`122337x.php` 與 `122337.php/extra` 為 404。Bulk 清單為 11 筆、Bulk rule 1 條/version 1、Dynamic 10 條/version 10；benders 與小林尊轉址回歸不變，OAuth 暫留。

## 使用者提供的圖片作為靜態網站資產（2026-11-03）
- [x] 將使用者提供的PNG原樣放入網站可公開的靜態資產目錄，命名為 `assets/venusaur-weakness-evolution.png`；不裁切、不重新繪製，也不放進首頁、文章或任何可視版面。
- [x] Build 將原始檔複製至 `dist/assets/venusaur-weakness-evolution.png`，不產生HTML `<img>`或頁面引用；部署後直接網址 `https://10e.org/assets/venusaur-weakness-evolution.png`回200、`image/png`且圖檔位元組不變。既有文章數、路由和其他內容不變。

本機驗收：原PNG與assets／dist完全相同（1780×708、183897 bytes、SHA256 `1d2ab1b94196eedd8a8acbbf06f6fd84d44d526e918d8e7b0399091648782d7e`）；build/check通過，139篇／142路由不变，既有dist檔案逐筆與HEAD相同，HTML／manifest／sitemap無圖片引用。正式發布亦已驗收。

正式驗收：commit `5254ce8`由Pages run `41608680394`成功部署。`https://10e.org/assets/venusaur-weakness-evolution.png`回200／image/png，183897 bytes且SHA256與原附件完全相同；正式首頁、影評、文章索引、sitemap及manifest均無圖檔引用。

## 頁尾品牌名稱回首頁（2026-11-03）
- [x] 全站頁尾 `© 2026 10eKokoro's Dream` 中的品牌名稱加上回首頁的連結 `href="/"`，保留文字與樣式、原有頁尾大品牌連結及 Abiting 指向 `https://abitingdiscord.com` 的連結。其他內容、SEO、路由、favicon與靜態圖片不變；完整build/check通過並在正式首頁與影評頁驗收。

完成證據：143個HTML（含404）僅版權品牌新增anchor，其他dist檔案原樣；139篇／142路由及完整build/check通過。commit `2b02086`／Pages run `41610237676`成功，正式首頁、影評及索引頁200，版權品牌和原大品牌均連首頁，Abiting原目的網址不變。

## 指定Scrabby文章舊URL精確301（2026-11-04）
- [x] 將 `http://10e.org/mt2/archives/200612/210159.php` 及HTTPS同路徑直接301至 `https://scrabby.abiting.cc/archives/299`；HTTP／HTTPS含`?probe=1`皆命中相同Location且query已丟棄，只匹配指定host/path。鄰近`210159x.php`及`210159.php/extra`回404，目標文章回200。
- [x] 新增Bulk list item `f71638dcfe614b1ea12017d78005030d`；清單由11筆增至12筆、account Bulk rule仍1條、zone Dynamic Redirect仍10條/version 10。既有`200701/050537.php` Scrabby mapping與`benders.gif`回歸正常，未改動其他規則。

## 《Underwater／深海終劫站》影評與指定舊URL精確301（2026-11-04）
- [x] 新增一篇 2020 年電影《アンダーウォーター》（原題 `Underwater`）的日文影評；中文「深海終劫站」只供辨識，不誤當日文正式片名。僅新增一篇，不修改既有 139 篇評論或既有文章URL。內容依查證來源撰寫，約 500–800 個日文字元、6 個段落、2 個 H2；不虛構評分或資料。新增唯一安全slug／文章URL、2–4 個來源引用，保留各來源的原文標題和原始 URL。新頁須維持既有 SEO、正式 canonical、Open Graph、Twitter Card、Article JSON-LD、sitemap 與 `dist/manus-routes.json` 規格；全站總數應精確增加至 140 篇／143 個公開路由，build/check 通過。
- [x] 新頁先部署並在正式站確認回應 200、canonical、Article 結構化資料及來源標題正確，再將使用者指定的 `http://10e.org/mt2/archives/200807/042305.php` 精確 HTTP 301 至該新文章正式 URL；同一路徑 HTTPS 亦須直接 301。query 不傳遞；相鄰 `042305x.php`、`042305.php/extra` 必須維持真正 404，其他未指定舊路徑保持 404。只新增此一筆 Cloudflare Bulk Redirect，不修改或刪除任何既有 Bulk/Dynamic 規則。


Underwater完成證據：內容commit `0441661`／Pages run `41741644315`成功，正式 `/underwater-2020-review/` 回200且原文來源、canonical、Article、143路由／sitemap核對通過。Bulk item `71e25e0e84a343a18292cf0b2108dc84`，operation `9f24514ed19b470d9c8ea0e64e4c5671` completed；HTTP／HTTPS含query皆direct301至新頁並丟棄query，x.php和/extra及未指定xxx均404，Scrabby和benders回歸正常。清單13筆／Bulk1條version1／Dynamic10條version10；未改既有mapping，OAuth仍保留。

## 後續：《從地心竄出》影評與指定舊URL精確301（2026-11-04）
- [x] 待《アンダーウォーター》影評正式上線、其指定301完成驗收後，再研究並新增一篇 1990 年電影《Tremors》（使用者中文辨識名《從地心竄出》）的日文影評。使用核實日本正式片名「トレマーズ」、原題 `Tremors`、導演ロン・アンダーウッド與日本劇場公開日1990年6月15日；來源保留原文標題／URL，6段日文正文500–800字、2個section H2、2–4個已查讀來源且注碼完整，不虚構評分或私人觀影經驗。只新增此片一篇，不改既有140篇文章或URL，維持既有SEO、canonical、OG／Twitter、Article／Person、sitemap與route manifest，共141篇／144個公開路由，build/check通過；正式頁先發布並確認200。
- [x] 將使用者指定的 `http://10e.org/mt2/archives/201007/270356.php` 和 HTTPS 同路徑精確直接301至該新文章正式URL；query 不傳遞，僅新增單一Bulk Redirect item。相鄰檔名與子路徑、其他未指定舊路徑均維持真正404；不改其他Bulk/Dynamic規則。

Tremors完成證據：正文731字、六段與4個原文來源；既有140篇object及metadata不變，build/check與唯讀審核通過，141篇／846段／144路由。commit `854ac0a`／Pages run `41742719260`成功，正式 `/tremors-1990-review/` 一般訪客／Googlebot／Twitterbot皆200，來源、canonical、Article與144筆sitemap核對通過。之後新增Bulk item `f7864d6f685e4deaacbc9e0a29b4b377`，operation `2b20c223a04947bb97043ad9390e7f4e` completed；指定201007/270356.php的HTTP／HTTPS和query變體皆direct301到新文章，query丟棄，x.php、/extra及未指定xxx均404。清單只從13增至14筆，原13筆ID全保留，Bulk1條version1／Dynamic10條version10未变，Scrabby和benders回歸正常。OAuth依使用者要求保留。


## 《蟻人與黃蜂女：量子狂熱》日文影評與精確舊URL 301（2026-11-04）
- [x] 研究後新增一篇2023年《蟻人與黃蜂女：量子狂熱》日文影評，使用已查證的日本正式片名及原題；約500–800日文字元、6段、2個H2、2–4個已閱讀來源和完整注碼，保留來源原文標題與URL，不虛構評分、私人觀影經驗或未查證事實。僅新增一篇，既有141篇與其URL／內容不變；沿用全站SEO、canonical、OG、Twitter Card、Article／Person schema、sitemap與route manifest。新文章通過build/check後先推送並確認正式頁200；總數預期142篇／145個公開路由。
- [x] 文章正式上線後，將使用者指定 `http://10e.org/mt2/archives/200804/280059.php`（同路徑HTTPS亦命中）精確直接301至新文章canonical URL。HTTP／HTTPS含query的Location一致且丟棄query；相鄰 `280059x.php`、`280059.php/extra` 和其他未指定舊路徑仍為真正404。只新增一筆既有Cloudflare Bulk Redirect list item，不更動既有Bulk/Dynamic規則；保留Cloudflare OAuth。

完成證據：正文785字、6段、2個section H2、4個已查讀原文來源；既有141篇object與metadata完全不變。build/check與唯讀整合審核通過142篇／852段／145公開路由。内容commit `5283acd`／Pages run `41744964049`成功，正式新頁對一般訪客、Googlebot與Twitterbot回200，canonical、Article、原文來源、145條manifest／sitemap完整。新頁上線後才新增Bulk item `c350858a20e54c3488726af316e3be82`，operation `5332f956366e4a688cc4837f4adfb941` completed。HTTPS含query直接301，x.php／extra／未指定xxx404；主環境HTTP測試收到Trustpositif網路過濾頁，獨立環境普通GET另確認HTTP及含query均為Cloudflare direct301至新頁且query丟棄，既有Underwater HTTP301與benders HTTPS301回歸正常。清單15筆、原14筆ID全保留，Bulk1條version1、Dynamic10條version10未變；OAuth保留。


## 《攻殼機動隊》（Ghost in the Shell, 1995）影評與指定舊URL 301（2026-11-04）
- [x] 研究後新增一篇1995年押井守動畫電影《攻殼機動隊》日文影評，明確區別2008年2.0重製與2017年真人版。使用核實的日本正式片名／原題／公開年和導演，正文500–800日文字元、6段、2個H2，2–4個已查讀來源且注碼完整、引用題名和URL保留原文。不虛構評分／私人觀影經驗；只新增一篇，既有142篇與文章URL／metadata不變，不更動既有「日本アニメ映画名作5選」的5篇數量。沿用SEO、canonical、OG／Twitter、Article／Person、sitemap與route manifest，build/check通過；預期143篇／146個公開路由，正式新頁先發布確認200。
- [x] 新文章正式上線後，將 `http://10e.org/mt2/archives/200707/120351.php` 與HTTPS同路徑精確直接301至新頁canonical。HTTP／HTTPS含query皆相同Location且query丟棄；相鄰 `120351x.php`、`120351.php/extra`及其他未指定舊路徑仍為真正404。只追加一筆既有Cloudflare Bulk list item，不修改／刪除其他Bulk或Dynamic規則；OAuth依使用者指示保留。


完成證據：正文785字／6段／4來源；143篇／858段／146路由build/check及唯讀審核通過，既有142篇與metadata原樣。內容commit `0fece23`／Pages run `41747016909`成功，正式新頁200（普通訪客／Googlebot／Twitterbot）、來源原文題名、canonical／Article／146路由／sitemap完整。Bulk item `9431607770c943d1b05aef8b166b13a0`，operation `6882ef28e4a6483b9e632939983c1ced` completed；原15筆ID保留、現16筆，Bulk1條version1／Dynamic10條version10未變。HTTPS含query301、x.php／extra／xxx404、benders／Scrabby回歸通過；獨立環境普通GET確認HTTP及含query由Cloudflare直接301且query丟棄，Quantumania HTTP对照正確。OAuth保留。

## 後續一：《映像詩 里山 〜命めぐる水辺〜》與200904/072253.php（2026-11-04追加）
- [x] 完成1995年《攻殻機動隊》後新增日文《映像詩 里山 〜命めぐる水辺〜》影評。查核正式題名、首播／公開年、紀錄片或電視版身分與製作credit，不虛構導演或劇場上映資訊。正文500–800字、6段、2個section H2、2–4筆已查讀來源、原文標題／URL與注碼保留。只新增或若已有同版則完善該篇，保留其餘文章與URL／metadata；SEO、canonical、OG／Twitter、Article／Person、sitemap／manifest完整，先正式新頁200再轉址。
- [x] 按使用者本次明確指定，使 `http://10e.org/mt2/archives/200904/072253.php` 及HTTPS同路徑直接301至里山新頁；query丟棄，x.php／extra與未指定舊路徑404。此來源曾有中間設定與撤回更正，先唯讀查明目前是否存在；若仍404僅新增一筆，若确有既有項則只更新此項目，保留所有其他Bulk／Dynamic規則，不改ruleset與OAuth。

完成證據：正文790字／6段／4筆原文來源，2004-04-03初回放送NHKスペシャル版，制作NHK・NHKエンタープライズ，Article.about正確TVEpisode／Organization／TVSeries，無假導演。build/check通過144篇／864段／147路由，原143篇data與articleHTML逐篇byte原樣。内容commit `97c609a`／Pages run `41748367416`成功，正式新頁普通訪客／Googlebot／Twitterbot皆200、canonical／來源原題／schema／manifest／sitemap通過。第17筆item `d4e81bc51b0a463a82a87bd281c4895e`，operation `4e893340508c42a2ba71d224a68815c8` completed；HTTP（獨立普通GET）及HTTPS含query direct301、query丟棄，x.php／extra／xxx404，benders／Scrabby與Ghost HTTP回歸正確。原16筆全保留，更正App來源200903/310230.php不變；Bulk1條version1／Dynamic10條version10不變，OAuth保留。

## 後續二：《賭俠2之上海灘賭聖》與200503/022253.php（2026-11-04追加）
- [x] 里山完成後新增日文《賭俠2之上海灘賭聖》影評，查核原題／英題／日本正式片名、1991年版本和製作資料。必須提到使用者指定的經典「サルの桃盗み（猴子偷桃）」招式，查核其電影脈絡，僅以非露骨的喜劇笑點評論，不描寫實際攻擊操作，也不編造台詞、時間碼或未查證角色。正文500–800字、6段、2個section H2、2–4筆已查讀來源、原文標題／URL及完整注碼；不虛構評分／私人觀影聲稱。只新增一篇（已有同版則保留URL修訂），其他文章與URL／metadata不變，沿用完整SEO、Article／Person、sitemap／manifest並先確認正式新頁200。
- [x] 新文章上線後將 `http://10e.org/mt/archives/200503/022253.php` 與HTTPS同路徑精確直接301至該新頁。HTTP／HTTPS含query皆相同Location且query丟棄，x.php／extra和未指定路徑真正404；只增加或更新這一個精確來源，保留其他Bulk／Dynamic規則及OAuth。

完成證據：1991年香港電影、日本題ゴッド・ギャンブラー III、原中文題保留，正文780字／6段／4原文來源，指定「サルの桃盗み（猴子偷桃）」已於首屏HTML正文呈現，未編造台詞／時間碼。145篇／870段／148路由build/check通過，舊144篇data與HTML逐頁byte不變；最初e54350e的139篇、metadata與articleHTML亦逐頁原樣。內容commit `ef6871f`／Pages run `41749434835`成功，新頁普通訪客／Googlebot／Twitterbot200，來源原題／canonical／Article／manifest／sitemap通過後才新增第18筆item `5a750947f05148498851bf94e5da4697`、operation `481ef44b734444168dd672d2131b72a6`completed。來源是/mt/archives/200503/022253.php（不是/mt2），HTTP（獨立普通GET）及HTTPS含query direct301至新頁、query丟棄；x.php／extra／xxx404，benders／Scrabby HTTPS及里山HTTP回歸正確。原17筆ID全保留，Bulk1條version1／Dynamic10條version10不變，OAuth保留。


## 《早安越南》日文影評與指定舊URL精確301（2026-11-04）
- [x] 新增《Good Morning, Vietnam》（1987）一篇日文影評，核實日本正式片名、製作／初公開年與導演；6段正文500–800字、2個由builder產生的H2、2–4筆已查讀來源，來源題名保留原文。只append一篇，不改既有145篇內容／metadata／URL；完整首屏SEO、canonical https://10e.org、OG／Twitter／Article、manifest與sitemap。預期146篇／149路由，不虛構評分或私人觀影經歷。
- [x] 先發布並確認新文章正式200與SEO，再只將 `http://10e.org/mt2/archives/201005/040329.php`（及HTTPS）精確HTTP301到新文章正式URL。query丟棄、include_subdomains／subpath_matching／preserve_query_string／preserve_path_suffix全部false，相鄰`040329x.php`／`040329.php/extra`與其他未指定失效路徑保持真正404。新增前核對Bulk18筆來源不存在、Bulk1條version1與Dynamic10條version10不變，不覆寫／刪除任何ruleset或舊mapping。保留Cloudflare OAuth；文章新需求立即依序完成，不自動建立排程。


完成證據：日文正文784字／6段／2H2／3原文來源，D23核實1987-12-23首映、映画.com日本1988-10-08公開。146篇／876段／149路由build/check通過，原145篇data／metadata／articleHTML逐頁byte不變，唯讀整合審核PASS。內容commit `782c8de`／Pages run `41760672768`success，新頁正常訪客／Googlebot／Twitterbot200，原文引用題名／完整正文／canonical／Article／149manifest與sitemap驗收後，新增第19筆item `62dcd66b9a4a44c28b9d4acb38ca4cfd`、operation `057d224c4584487ea838551ffa1a5ee2`completed。HTTP獨立normalGET及HTTPS含query均direct301至https://10e.org/good-morning-vietnam-1987-review/，query丟棄；x.php／extra／xxx404，benders／ScrabbyHTTPS、上海灘賭聖HTTP回歸正確。原18筆ID全保留，Bulk1條version1／Dynamic10條version10不變，OAuth保留。

## 後續：《樹懶殺三小》（Slotherhouse, 2023）日文影評與精確301
- [x] 仔細研究2023年Slotherhouse的正式日本片名（如無日本正式名則用核實原題，不亂譯）、導演、年份／版本與恐怖喜劇脈絡；新增一篇日文影評6段／500–800字／2H2、2–4筆已查讀來源，引用題名保留原文，長尾關鍵字、首屏SEO／canonical／OG／Twitter／Article／sitemap／manifest完整。只append此一篇，不改目前146篇或metadata與既有URL；預期147篇／150路由。無虛构評分／私人觀影經歷、不得把《樹懶殺三小》中文譯名當日本正式片名。
- [x] 《早安越南》全部完成後發布此新頁，確認正式200與SEO後，將 `http://10e.org/mt2/archives/200805/280244.php`（及HTTPS、含query）direct HTTP301到Slotherhouse新文正式URL。query丟棄、四旗標false，280244x.php／280244.php/extra與未指定路徑仍真正404。新增前核對Bulk19筆且來源不存在、Bulk1條version1／Dynamic10條version10保留；原19筆不覆寫或刪除，不擴張host／不mass redirect，OAuth保留。

完成證據：日本題キラー・ナマケモノ、原題Slotherhouse、2023製作／2024-04-26日本公開分開，實際6paragraphs去HTML／註碼／空白795字，四已讀原文來源。147篇／882段／150路由build/check通過，原146篇data／metadata／articleHTML逐頁byte不變。內容commit `5e6ecdc`／Pages run `41761532284`success，新頁訪客／Googlebot／Twitterbot200，四source原題／全文／canonical／Article／manifest／sitemap通過後，唯一POST200805/280244.php到https://10e.org/slotherhouse-2023-review/；item `ce26782531d343849693e2cbb658983f`、operation `c24dd315e44045d9aaf06c462bbbf6ec`completed。HTTP獨立normalGET与HTTPS含query都是direct301、query丟棄；x.php／extra／xxx404，benders／ScrabbyHTTPS、早安越南HTTP回歸正確。原19筆ID全保留，Bulk20items／1條version1、Dynamic10條version10不變，OAuth保留。


## 指定目錄：`10e.org/hackedpage2/` 全部子頁精確301
- [x] 對 `10e.org/hackedpage2/` 使用Cloudflare Bulk Redirect的子路徑比對，所有該目錄下的頁面（包括多層路徑）均直接301到《呪いの家》（The Uninvited，1944）影評 `https://10e.org/the-uninvited-1944-review/`。`subpath_matching=true`、`preserve_path_suffix=false`，所有子頁suffix丟棄而導向同一篇評論；scheme省略以匹配HTTP與HTTPS；query不保留；`include_subdomains=false`。不要影響不帶尾斜線的其他path／相鄰`/hackedpage2x/`、其他host／子網域或未指定舊頁。既有Bulk list/rule及Dynamic rules保持，Cloudflare OAuth保留；操作後驗證目錄根、單層及巢狀子路徑／query都是精確301、目標200，邊界相鄰路徑維持404，原指定301回歸不變。

完成證據：Cloudflare官方文件確認`subpath_matching=true`對`/hackedpage2/`folder匹配所有子路徑；source保留尾斜線、`preserve_path_suffix=false`及`preserve_query_string=false`，`include_subdomains=false`。唯一新增item `07f752b2ca424c65a49aa8255d27a9b7`，operation `1ae26909d1b1468eaf907f44ae23f36e` completed；原20筆全保留，list21項、Bulk1條version1、Dynamic10條version10。目標《呪いの家》正式canonical 200。HTTP／HTTPS的`/hackedpage2/`目錄根、單層、巢狀頁均direct301至`https://10e.org/the-uninvited-1944-review/`；巢狀query丟棄、suffix亦丟棄。HTTPS `/hackedpage2x/sample.php`、`/hackedpage2`（無尾斜線）、`/hackedpage3/sample.php`及未指定`/mt2/archives/xxx`皆404。相同兩個非匹配HTTP URL先受既有HTTP→HTTPS升級301至同一路徑，再於HTTPS最終404；沒有導向影評。早安越南HTTP、Scrabby HTTPS、benders GIF轉址回歸正常。Cloudflare OAuth保留。


<h2>《熊貓計劃》（Panda Plan）日文影評與指定舊URL精確301</h2>
- [x] 核實Panda Plan首部2024電影版本、日本正式片名、導演與公開資料，新增一篇日文影評：6段正文500–800字、builder兩個H2、2–4筆實際查讀來源且source標題保留原文、3–8中長尾keywords，完整初始HTML SEO／canonical https://10e.org／OG／Twitter／Article／sitemap／manifest。只append此一篇，不改原147篇data／metadata／articleURL；預期148篇／151路由。日本片名使用核實正式題，不把中文《熊貓計劃》自譯當官方日文名，不能混入續集或自造評分／私人觀影經歷。
- [x] 先發布新影評、Pages成功並確認正式200與SEO，再只將 `10e.org/mt/archives/200512/050511.php`（HTTP／HTTPS含query）direct301到新影評URL。include_subdomains／subpath_matching／preserve_query_string／preserve_path_suffix全false；query丟棄、相鄰050511x.php／050511.php/extra和未指定路徑仍404。新增前核對Bulk21筆且source不存在，保留原21筆（含hackedpage2/目錄前綴）、Bulk1條version1／Dynamic10條version10，不覆寫ruleset／不massredirect／不擴host。OAuth依前指示保留，完成紀錄安全提交既有main。


完成證據：日本片名パンダプラン、製作年2024／日本上映2026-01-23分開；日文正文751字／6段、4筆來源原文題名。148篇／888段／151路由build/check通過，原147篇data／metadata／HTML byte-identical。文章commit `02ff4fb`／Pages run `41765986891`success；正式頁200，normal／Googlebot／Twitterbot、來源／canonical／Article／manifest／sitemap驗收通過。其後僅新增item `86be7b2400004c23937ad7bec74f086f`、operation `1d002b382a094ea596ea66483e3f3a75`completed：`10e.org/mt/archives/200512/050511.php` → `https://10e.org/panda-plan-2024-review/`，四flagsfalse。HTTP/HTTPS direct301、query丟棄；x.php／extra／未指定xxx404，原有redirect及hackedpage2 prefix保持。Cloudflare原21筆ID全保留，22 items、Bulk1條version1、Dynamic10條version10。

<h2>後續：指定App頁200511/260117精確301（Panda Plan完成後）</h2>
- [x] 僅在本次Panda Plan新文章先正式上線、`/mt/archives/200512/050511.php`→新文章的精確301完成後，再將使用者指定 `10e.org/mt/archives/200511/260117.php`（HTTP與HTTPS）直接301至 `https://app.abiting.cc/archives/3263`。query與路徑suffix不保留；相鄰260117x.php、260117.php/extra與其他未指定路徑仍404。執行前確認目標合理可達、Cloudflare list現有所有mapping保留，只新增一筆精確source，Bulk1條version1／Dynamic10條version10不變；不得提前執行，不修改其他mapping，OAuth保留。


完成證據：目標 `https://app.abiting.cc/archives/3263` 200。Panda Plan先正式部署並301驗收完成後，新增item `0131c4efcaae4744bfca1fd354b57aac`、operation `dca3128c1e5444678e456a18bc79fdfc` completed：`10e.org/mt/archives/200511/260117.php`→`https://app.abiting.cc/archives/3263`，四flagsfalse。HTTP／HTTPS直達301，含query的Location不帶query；HTTPS相鄰`260117x.php`、suffix `/extra`、未指定`260118.php`皆404，既有Panda Plan與hackedpage2 prefix回歸正常。原22筆全保留，list23 items、Bulk1條version1、Dynamic10條version10；Cloudflare OAuth保留。

<h2>後續：《仲夏魘》（Midsommar，2019）研究影評</h2>
- [x] 研究2019年《Midsommar》的日本正式片名／原題、導演、年份、發行版本與民俗恐怖脈絡；新增一篇日文評論（6段500–800字、2個H2、2–4筆已查讀來源及來源原文題名），正文必須明確含「生贄」，分析其敘事／主題作用，不僅列詞。只append一篇、不改其他文章URL／內容，保持初始SEO/canonical/OG/Twitter/Article/sitemap/manifest與無虛構評分或觀影經驗。年份依2019原始版，不混淆2020年日本上映或Director’s Cut；slug在查重後確定。
完成證據：日本正式題『ミッドサマー』；2019年美國劇場版（147分），日本2020-02-21公開，另版171分Director’s Cut分清。日文正文504字／6段並明確以「生贄」分析共同體秩序與犠牲；4來源標題保留原文，Hårga為架空教團。149篇／894段／152路由build/check通過，原148篇data／metadata／文章HTML byte-identical；唯讀整合review PASS。文章commit `b504c8f49b9e48b51abd01fbf2971ad4826cfac8`／Pages run `41768090956`success；正式頁200，爬蟲首屏、canonical、source links、Article／Person、sitemap／robots與152 routes驗收通過。未新增任何legacy redirect；未指定舊路徑維持404。


<h2>指定舊URL：200709/100347.php精確301</h2>
- [x] 將使用者明確指定 `10e.org/mt2/archives/200709/100347.php`（HTTP／HTTPS）直接301至 `https://abiurl.me/sAAOui`；不保留query、路徑suffix、子網域或其他host。先確認目標可達及Bulk清單/source不存在，只新增一筆唯一mapping，保留現有23筆（含hackedpage2 prefix、Panda Plan與App mapping），Bulk仍1條version1、Dynamic仍10條version10。驗證HTTP／HTTPS含query的Location完全等於指定短網址；相鄰 `100347x.php`、`100347.php/extra` 和其他未指定舊路徑維持404。保持Cloudflare OAuth，不覆寫任何existing rule/list。
完成證據：新增item `d5aa7ca3a9ee43749f3bdc1eea3725c8`、operation `53e03fcef78d425d89ac24dc708920e2` completed：`10e.org/mt2/archives/200709/100347.php`→`https://abiurl.me/sAAOui`，四flagsfalse。HTTP與HTTPS、含query皆direct301，Location完全等於短網址且不傳query；近似100347x.php、suffix `/extra`、未指定100348.php均404。HTTPS回歸App與Panda mapping通過，獨立HTTP也回歸二者。短網址本身另回301至`https://10e.org/midsommar-2019-review/`（頁面200），保留使用者指定的短網址作第一跳。原23items ID全保留，list24items、Bulk1條version1、Dynamic10條version10；OAuth保留。


<h2>《喵的奇幻漂流》（Flow）日文影評與指定舊URL精確301</h2>
- [x] 查證Flow作品原題與日本正式片名、年份／導演／製作來源及值得分析的視聽設計，新增一篇日文影評：正文6段、500–800字、2個H2、2–4筆已讀來源；來源標題一律保留來源原文。只新增一篇，不改原有149篇、既有文章URL／metadata；無虛構分數或私人觀影經驗。保留完整首頁／detail HTML SEO、canonical／OG／Twitter、Person／Article schema、sitemap與manus-routes；更新全站精確檢查為150篇／153條路由。
- [x] 新頁先部署，確認正式目標URL HTTP 200與正文／SEO／來源／Article／canonical／sitemap／route manifest後，才將使用者指定 `http://10e.org/mt2/archives/200705/160244.php`（HTTP及HTTPS）直接301到新頁正式URL。只新增唯一的exact-path Bulk Redirect，`include_subdomains:false`、`subpath_matching:false`、`preserve_query_string:false`、`preserve_path_suffix:false`；丟棄query。其他24筆Cloudflare mapping、含hackedpage2目錄prefix及既有電影／App項目皆保留；account Bulk規則1條／version1、zone Dynamic規則10條／version10不變；不得使用PUT或覆寫既有ruleset/list。HTTP／HTTPS及帶query都直接回301、Location正確；相鄰 `160244x.php`、suffix `/extra` 與其他未指定舊路徑維持真正404。保留Cloudflare OAuth。
完成證據：『Flow』／原題Straume，2024年製作、ギンツ・ジルバロディス、85分、ラトビア・フランス・ベルギー合作；日本2025-03-14公開。日文正文747字／6段／4筆來源原文H1；collection国際アニメーション映画ノート，不改日本動畫固定5選。Flow個別publishedAt／modifiedAt為2026-11-04T13:55:29+08:00，byline／Article／sitemap一致。build/check150篇／900段／153路由PASS，原149篇data／metadata／URL／HTML逐頁byte-identical；內容審核PASS。文章commit `efbd7440a9050c3b0895734f93204bac33737253`，Pages run `41782252445`success；正式新頁200，normal／Googlebot／Twitterbot、4來源／canonical／Article／153routes／sitemap／robots驗收通過。然後只新增Cloudflare item `3ecf4fea817e4385892d5e0065336751`，operation `e6d66d326e3640099883ffd203e93cd7` completed：`10e.org/mt2/archives/200705/160244.php`→`https://10e.org/flow-2024-review/`，301、四flagsfalse。HTTP／HTTPS含query皆direct301且Location不帶query；相鄰160244x.php、suffix `/extra`、未指定xxx404。舊benders.gif／Scrabby／abiurl／hackedpage2 prefix回歸PASS；原24items IDs全保留，list25items、Bulk1條version1／Dynamic10條version10不變；OAuth保留。

<h2>指定圖片舊URL：/samcimg3/hairy.jpg 精確301</h2>
- [x] 將使用者指定的 `https://10e.org/samcimg3/hairy.jpg`（同host HTTP也命中）直接301至 `https://abiting.cc/archives/16830`。丟棄query、不保留路徑後綴、不匹配子網域或相鄰路徑；`hairy.jpg/extra`、`hairyx.jpg`及未指定路徑維持真正404。只新增一筆Cloudflare Bulk Redirect item，保留其他mapping與規則，OAuth保持授權。
- [x] 新增後確認operation完成、list只增加此唯一item、HTTP／HTTPS含query Location精確且不帶query，目標200，邊界404，既有mapping回歸正常。

完成證據：目標 `https://abiting.cc/archives/16830` 回200。Cloudflare item `08448963038b438dbf251c18f51b3577`、operation `d5c003e335234661910de86776ec16bc` completed，list 25→26，既有25個ID全保留；唯一Bulk rule仍1條/version1，Dynamic仍10條/version10。獨立一般GET確認HTTP及HTTPS（含`?probe=1`）均直接301到精確目標且不傳query；`hairyx.jpg`、`hairy.jpg/extra`、`hairy.jpgx`為真正404。既有 `/samcimg3/iguananeko.jpg` 和 `/samcimg3/wain12.jpg`兩筆仍各自轉到原目標。Cloudflare OAuth保持授權。

先前驗收完成：item `08448963038b438dbf251c18f51b3577`／operation `d5c003e335234661910de86776ec16bc`，26筆清單與原25 ID保留；HTTP／HTTPS query／404邊界均PASS。

<h2>指定圖片舊URL：/samcimg/inago.jpg 精確301</h2>
- [x] 將使用者指定 `http://10e.org/samcimg/inago.jpg` 精確直接301至 `https://abiting.cc/wp-content/uploads/2026/11/locust.jpg`；同host HTTPS命中、query丟棄、不保留路徑尾綴、不匹配子網域或相鄰路徑；近似及未指定舊路徑維持真正404。只新增一筆Cloudflare Bulk Redirect item，保留hairy與所有既有映射，OAuth不撤銷。
- [x] 驗收operation完成、HTTP／HTTPS含query Location精確、目標200、相鄰／suffix404、既有mapping回歸及清單／規則數。

完成證據：目標 `https://abiting.cc/wp-content/uploads/2026/11/locust.jpg` 為200 image/jpeg。item `95d1d16f157f42ff8bc799388d493338`／operation `a4042103342c4cddbdd8d54d6264d23c` completed，list 26→27且原26項ID全保留；Bulk 1/version1、Dynamic 10/version10不變。獨立GET驗收HTTP／HTTPS含query均直接301至精確目標、query丟棄；`inago.jpgx`、`inago.jpg/extra`、`inagox.jpg`為真正404；之前hairy.jpg mapping回歸PASS。Cloudflare OAuth未登出或撤銷。

<h2>指定路徑：/zghost3/ 精確301</h2>
- [x] 將使用者指定 `http://10e.org/zghost3/`（同host HTTPS亦命中）精確直接301至 `https://10e.org/house-1977-review/`；僅該路徑，不啟用子路徑匹配、不保留query或path suffix、不匹配子網域。`/zghost3/anything`、`/zghost30/`及未指定舊路徑維持真正404。只新增一筆Bulk Redirect，保留所有既有mapping及Dynamic rules，Cloudflare OAuth維持授權。
- [x] 操作完成後確認operation completed、HTTP／HTTPS含query Location精確並丟棄query，目標200，邊界404、list只增一筆且既有映射／規則基線不變。

完成證據：目標 `https://10e.org/house-1977-review/` 獨立一般GET回200。Cloudflare item `d10da0614a694b3abe25f09db0e2477e`／operation `1a7fcd2328eb4bf58c16f925a0ff443c` completed；list 27→28且原27項保留，Bulk rule仍1條／version1，Dynamic仍10條／version10。HTTP／HTTPS對 `/zghost3/` 及含query請求均直接301至精確目標、不傳query；`/zghost3/anything`及`/zghost30/`為真正404。Cloudflare OAuth未登出或撤銷。

<h2>兩筆指定舊URL：Diana圖片與Suspiria影評精確301</h2>
- [x] `10e.org/samcimg3/diana3.jpg` 精確直接301至 `https://10e.org/one-missed-call-2004-review/`；HTTP／HTTPS均命中、丟棄query、不匹配子路徑／相鄰路徑。只新增一筆item。
- [x] `10e.org/mt2/archives/200804/240055.php` 精確直接301至 `https://abiurl.me/BKKWr5`；HTTP／HTTPS均命中、丟棄query、不匹配suffix／相鄰路徑。只新增一筆item。
- [x] 兩目標已由獨立網路確認200；核對Cloudflare 28筆基線、兩source不存在、Dynamic不重疊。操作後確認operation完成、恰新增兩筆、HTTP／HTTPS含query Location正確、未指定路徑404、Bulk／Dynamic規則不變並保留OAuth。

完成證據：兩個目標均200，短網址 `https://abiurl.me/BKKWr5` 第一跳後301到 `https://10e.org/suspiria-1977-review/` 並200。Cloudflare bulk operation `7757337fd1c2494199ed678165aa42e8` completed，只新增Diana item `8089db5bcfae4f7daf94db460fc0bb02` 與Suspiria item `12ac87e160da48c8b7ff5f46e31faeb5`；list 28→30，原28項全保留，Bulk 1/version1、Dynamic 10/version10未變。普通GET獨立驗收兩來源HTTP／HTTPS含query皆直接301至各自精確目標且query丟棄；Diana近似／suffix及Suspiria近似／suffix皆404。Cloudflare OAuth未登出或撤銷。


## 《杉原千畝》（2015）日文影評與指定舊URL精確301
- [x] 研究並新增2015年電影《杉原千畝 スギハラチウネ》一篇日文影評，六段正文總長500–800字、2–4筆已查讀來源保留原文題名／URL，查核導演／上映版本並區分電影敘事與歷史史實。不虛構評分或觀影經歷，使用相關中長尾SEO關鍵字。只append一篇，不改既有150篇資料／網址；使用實際本次發布日期，首屏HTML／canonical／OG／Twitter／Article schema／sitemap／154路由完整。
- [x] 新文章正式發布並驗收200後，才將使用者指定 `http://10e.org/flashchiune/chiune.htm`（同host HTTPS亦命中）精確直接301至新文章https正式URL；query丟棄，子網域／子路徑／尾綴不匹配，相鄰及未指定舊路徑維持真正404。只新增一筆Cloudflare Bulk Redirect，原30項／Bulk1條及Dynamic10條均保留，不撤銷OAuth。

完成證據：內容commit `56da432c1a443688a5f59cc812f8c1e076fead46` 的Pages工作 `42433232992` 成功；正式 `https://10e.org/sugihara-chiune-2015-review/` 回200且初始HTML／Googlebot／Twitterbot／四原文來源／Article／canonical／154路由與sitemap全部通過。六段實際正文675字，前150篇JSON与HTML全部不變，日期2026-11-08T09:09:48+08:00。Cloudflare item `47d0660d7dfa40cc929e0779978d63bf`／operation `d9c5d1b0e3944da49415caf23a8a1207` completed，list30→31；指紋比對原30映射及Bulk／Dynamic規則保留，仍Bulk1/version1、Dynamic10/version10。独立普通GET共11組PASS：HTTP／HTTPS含query皆直接301且query丟棄；chiunex.htm、chiune.htm/extra、chiune.html、未指定/mt2/archives/xxx皆404，新頁200；Diana與Suspiria既有映射回歸PASS。OAuth未登出／撤銷。


<h2>兩筆指定舊URL精確301</h2>
- [x] 將 `http://10e.org/mt2/archives/200608/210343.php`（HTTPS同一路徑亦命中）直接301至 `https://abiting.cc/archives/16830`；query不保留，只匹配該完整路徑。
- [x] 將 `http://10e.org/mt/archives/200605/260129.php`（HTTPS同一路徑亦命中）直接301至 `https://list.abitingpokedex.com/pokemon/buzzwole/`；query不保留，只匹配該完整路徑。兩筆不得改變任何既有Bulk或Dynamic mapping；近似路徑、尾綴及未指定舊路徑仍須404。

完成證據：Cloudflare bulk operation `9fea9fdc1f524724b3a334804a1624ac` completed，原清單31筆增為33筆。新增item `12e806f5157f41e581d4b81b9c42b90f`（200608/210343.php→abiting.cc/archives/16830）及 `6f0ef04d607f4caebc3cde04843705a3`（200605/260129.php→Buzzwole），只精確匹配、不保留query／path suffix。Bulk仍1條/version1；Dynamic仍10條/version10。兩個目的頁均200。獨立普通GET 17項全部PASS：兩來源HTTP／HTTPS含query皆301到精確Location，query丟棄，五條近似／尾綴／相鄰路徑404，先前Sugihara與hairy映射回歸正常。Cloudflare OAuth保留。

<h2>《剪刀手愛德華》（Edward Scissorhands）研究影評與指定301</h2>
- [x] 研究後新增一篇《剪刀手愛德華》（Edward Scissorhands，1990）日文影評；採核實的日本正式片名與版本資訊，六段、正文約500–800字、2個H2、2–4筆已查讀來源並保留來源原文標題／URL，使用中長尾SEO詞，不虛構評分或個人觀影經驗。只新增一篇，不改既有151篇及其網址；文章使用本次發布日期，SEO／canonical／OG／Twitter／Article／Person／sitemap／route manifest完整，build/check預期152篇／155路由。
- [x] 新頁正式部署並驗收200後，才將 `http://10e.org/mt2/archives/200904/012303.php`（HTTPS同路徑亦命中）精確直接301至新頁canonical URL；query不保留。相鄰路徑、尾綴、子路徑及其他未指定失效舊URL維持真正404；只新增一筆Cloudflare Bulk item、不覆寫其他規則並保留OAuth。


完成證據：Edward内容commit `ae0af25030533fa68ee84d4ac3ce33bf0731d06d`／Pages工作 `42434390703` 成功。正式新頁 `https://10e.org/edward-scissorhands-1990-review/` 回200，一般／Googlebot／Twitterbot正文与四原文來源、canonical／Article／155路由／sitemap PASS。六段實際797字，日期2026-11-08T09:26:16+08:00，原151篇資料及HTML保留。之後才新增item `0c67066521ea444996e583924965db75`，operation `3b1287248c604458bedeb466febb5991` completed，list33→34，原33映射及Bulk1/version1、Dynamic10/version10指紋不變。獨立GET 12項PASS：兩協定含query direct301、query丟棄；四條近似／尾綴／未指定404、新頁200及本輪前兩筆与Sugihara回歸正常。OAuth保留。

<h2>後續：《星際效應》（Interstellar）日文影評與指定301</h2>
- [x] 已發現既有 `/interstellar-review/`；研究並修訂該篇日文影評，不建立重複頁或變更既有URL：核實日本正式題名、導演與首映／製作年，六段500–800字、2個正文H2、2–4笔已查讀來源，引用原文標題與URL、中長尾SEO詞，不虛構評分／觀影經歷。只修訂此篇，保持其餘151篇資料／URL不變，保留既有發表日與SEO並使用實際本次修改日期，canonical／OG／Twitter／Article／Person／sitemap／route manifest完整。
- [x] 本轮Edward全部驗收完成後才開始其發布；先部署新文章並驗收正式200，再將 `http://10e.org/mt2/archives/200811/150154.php`（同路徑HTTPS亦命中）精確直接301至新頁；query不保留、不匹配subdomain／subpath／suffix，相鄰及未指定路徑仍真正404。只新增一筆Bulk item，保留既有規則及OAuth。

完成證據：Interstellar保留既有 `/interstellar-review/`、SEO、原發表日及原BFI／Paramount URL，修訂為六段681字；Paramount現轉頂頁，source原題以直接HTML確認的Paramount顯示，並註記作品正文未確認、不作根據。內容commit `7d938ca02d183ad6bba7869c95d7a1ef9f3f39a7`、Pages工作 `42435190053` 成功。正式修訂頁200／一般及bot／正文來源／Article／155路由PASS後才新增item `d0efca91108b4c64881aa35e657bf8a5`，operation `6292791f254a40b1add2b24c93b21dbf` completed；list34→35，原34映射指紋cb954060與Bulk／Dynamic不變。獨立9項PASS：兩協定含query direct301、query丟棄、三邊界404、目標200与Edward回歸正常。其餘151篇／URL／HTML保留，OAuth保留。

<h2>後續：《日日是好日》日文研究影評與指定301</h2>
- [x] 研究後新增《日日是好日》一篇日文影評；其中一個參考連結必須保留使用者指定 `https://abiurl.me/LsmvAg`，查讀其目的頁、引用原文題名，不自行展開替換短網址；核實使用者提到2019所對應上映地區、日文正式題名和作品原始年份／版本，不把不同地區公開年混為製作年。六段500–800字、2個正文H2、2–4笔已查讀原文來源、中長尾SEO詞，不虛構評分／观影；只append、保留當時全站既有文章URL与資料，實際發布日及完整SEO／Article／Person／canonical／sitemap／route manifest。
- [x] Interstellar完成後依序發布本篇，正式新文章200後才將 `http://10e.org/mt/archives/200502/270305.php`（HTTPS同路徑亦命中）精確直接301至新頁；query丟棄，不匹配子網域／子路徑／尾綴。相鄰及其他未指定舊路徑仍404，只append一筆Bulk mapping，保留全部原規則和OAuth。

完成證據：日本2018年10月13日／台灣2019年2月1日、六段688字、四原文來源（含使用者指定https://abiurl.me/LsmvAg，作茶碗／陶磁史背景，非電影公開資料）與發布日2026-11-08T09:42:58+08:00。內容commit `f2f2305198390c27f63a0c0628c3d6b602aa286e`／Pages `42435537516` 成功。新頁 `https://10e.org/every-day-a-good-day-2018-review/` 正式200／全文／原文來源／Article／156路由與sitemap PASS後，才新增item `a6f2baad33d543de9d9bc94fe04f7224`，operation `7b91f7634384430894e79f391249fc7b` completed；list35→36、原35指紋71dc39d4、Bulk1/version1與Dynamic10/version10保留。独立10項PASS：兩協定含query直接301／query丟棄、三近似或尾綴404、新頁200与Interstellar／Edward回歸。原152篇JSON／URL／HTML不變，OAuth保留。


<h2>後續：《整容液》（Beauty Water，2020）日文影評與指定301</h2>
- [x] 研究後新增韓國電影Beauty Water（2020）一篇日文影評，核實日本正式題名、導演、韓國原始年份及日本公開年份／版本。六段正文500–800字、2個正文H2、2–4筆已查讀原文來源、3–8個中長尾SEO詞，不虛構評分或觀影經歷；只append一篇、保護當時所有舊文章資料／URL。使用實際發布日，canonical／OG／Twitter／Article／Person／sitemap／route manifest完整。
- [x] 日日是好日這輪完成後依序部署本篇，新文章正式200後才將 `http://10e.org/mt2/archives/200612/230051.php`（同路徑HTTPS亦命中）精確direct301至新頁；query丟棄、子網域／子路徑／尾綴不匹配，相鄰及未指定路徑真正404，只append唯一Bulk item，原規則及OAuth保留。

完成證據：日本題整形水、韓國2020／日本2021公開、六段635字、四原文來源／5長尾詞；内容commit `fb156af4055c24fc54f2a76f3d87a7bf03778e54`，Pages `42436272426` 成功。主環境first GET無HTTP狀態而RemoteDisconnected；改用獨立網路確認新頁／Googlebot／Twitterbot200且HTML SHA256 `1c9f99fa4b6213649f88389d75d50641c4fb78c18dc9583d6b6fa532c71dd663`完全匹配；157route／sitemap／robots SHA全部一致後才增item `23247e47d4124a1c8607b1e90c3f2f55`，operation `c5eca27aa53e4d0da7a91308a43a4ef2` completed。list36→37、原36映射e0894f2f及Bulk1version1／Dynamic10version10指紋不變。独立9項PASS：HTTP／HTTPS含query精確301、query丟棄、三近似／尾綴404、新頁200与日日是好日回歸。原153篇data／URL／HTML與OAuth保留。

<h2>後續：《翻轉幸福》（Joy）日文影評與指定301</h2>
- [ ] 研究後新增Joy一篇日文影評，核實日本正式題名、原作品年與導演，區分電影改編與真實人物经历，不寫成未查證紀錄片。六段500–800字、2個正文H2、2–4筆已查讀來源保留原文題名／URL、3–8個中長尾SEO詞，不虛構評分或觀影；只append一篇，保護原文章資料與URL，使用實際發布日，完整SEO／Article／Person／canonical／sitemap／route manifest。
- [ ] Beauty Water完成後發布本篇，先驗收正式新文章200再将 `http://10e.org/mt2/archives/200911/220650.php`（同路徑HTTPS亦命中）精確direct301至新頁；query丟棄、不匹配subdomain／subpath／suffix，近似及未指定路徑404。只append一筆Bulk mapping，保留原規則和OAuth。
