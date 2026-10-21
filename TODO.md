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
- [x] 日文自介仍使用作者原有身分：台灣出身、熱愛電影的咖啡師「マリナ」，不編造新的作者經歷。
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
- [x] 所有 20 篇維持網站的日文影評語調，避免只寫劇情摘要；不虛構 Marina 的私人觀影經驗、評分、獎項或個人背景。
- [x] 保留所有現有 53 篇 slug、網址、正文、SEO 與來源；共用 `Person` author、新增 `Article`、canonical、Open Graph、Twitter Card、route manifest、sitemap、日期隨新增頁一致更新；新增「日本ホラー名作20選」可見標籤與搜尋關鍵字。
- [x] 確認 GitHub Pages 正式來源 `/marinas-dreams/` 已發布 73 篇影評與 76 個可索引頁；網站未掛上 10e.org 前不更換 canonical。

## 日本成人電影評論 20 篇新增系列
- [x] 新增 20 部日本成人向藝術電影、粉紅電影與 Roman Porno 的日文電影評論；核實日本片名、年份、導演與作品版本。不得把「三級」寫成日本统一分級，沒有可靠分級來源時不宣稱 Eirin／香港等級。
- [x] 每篇約 1,500–2,100 日文字符，六段與兩個不同小標，具有獨立日文 title、description（50–160 字）、副題、長尾關鍵字與 2–3 個已閱讀的可靠來源，註腳 ID 一一對應。
- [x] 文字是非露骨的電影史、審美與社會批評；不加入情色性行為描寫、成人圖像、觀看／下載成人片連結、不虛構 Marina 的觀影經驗；涉及暴力或強迫時非圖像化、批判性處理。
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
