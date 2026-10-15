# 作品画廊封面

作品 frontmatter 的 `cover` 用于画廊封面，`hero` 用于详情页配图，`ogImage` 用于分享预览；未配置 `cover` 时回退 `hero`。替换素材时使用新的版本文件名，同步维护中英文内容与图片尺寸，并运行 `npm run build` 核对图片元数据。

## 当前素材与生成方式

- Yipa：`public/images/project-covers/yipa-v1.webp`，中英文共用，下方保留生成提示词。
- 泡泡留言板 / Huddle：`public/images/project-covers/bubbles-v1.webp`，中英文共用，下方保留生成提示词。
- 橘小记 / Tablow：`public/images/project-covers/tablow-2.1.1-last-time-{zh,en}.webp`，1200×600、WebP quality 94。
- Tablow 分享图：`public/images/projects/tablow-2.1.1-last-time-{zh,en}.png`，1200×600 PNG。

Tablow 使用与当前产品界面对应的商店横版素材（换床单记录卡片与日期回查承诺），当前来源为 `../production-management/products/tablow/assets/batches/2026-10-16-last-time-horizontal-v1/{zh,en}/google-play-1024x500.png`。画廊显示比例为 2:1：原图居中裁成 1000×500，再输出 1200×600 PNG 与 WebP，保留文案和真实记录卡片主体。

在项目根目录运行 `node scripts/render-tablow-project-artwork.mjs`；升级版本时先更新脚本的输入批次和输出文件名，再更新中英文项目 frontmatter 的 `hero`、`cover`、`ogImage` 及实际尺寸。其他站点与文章默认 OG 图由站点构建生成，尺寸为 1200×630。

## 完整生成提示词

### yipa

Use case: stylized-concept. Asset type: original cover image for a software project in a personal website gallery. Landscape 3:2 composition, approximately 1536x1024. A refined tactile studio still-life, photoreal materials, crisp but gentle diffuse daylight, subtle realistic shadows, airy composition with generous negative space. A single clear visual idea readable at thumbnail size. Camera looks diagonally down at the object, shallow three-quarter view. Cool neutral light backdrop, never beige, cream or warm paper. No room interior, desktop accessories, screens, phones, app interface, logos, typography, letters, numbers, badges, watermarks, framing border, or extra decoration. The project name and caption will be HTML outside this image. Primary request: depict moments gradually becoming visible when looked at together. Subject: five thin semi-translucent rectangular vellum sheets overlapping loosely in one small stack, slightly separated and offset. Each has a few fine blue-gray graphite strokes, quiet abstract marks resembling a fleeting observation but absolutely no legible writing. The overlapping translucent layers reveal a few small aligned strokes more clearly. The entire stack is centered and occupies about 60 percent of the composition. Palette: mist gray background with a very subtle cool lavender tint; sheets almost white with subtle pale lavender translucency, restrained slate-blue marks. Physically plausible thin paper, beautiful delicate sheet edges, no glossy generic blobs. Avoid notebook binding, rings, calendar grids, flowers, eyes and human figures.

### bubbles

Use case: stylized-concept. Asset type: original cover image for a software project in a personal website gallery. Landscape 3:2 composition, approximately 1536x1024. A refined tactile studio still-life, photoreal materials, crisp but gentle diffuse daylight, subtle realistic shadows, airy composition with generous negative space. A single clear visual idea readable at thumbnail size. Camera looks diagonally down at the object, shallow three-quarter view. Cool neutral light backdrop, never beige, cream or warm paper. No room interior, desktop accessories, screens, phones, app interface, logos, typography, letters, numbers, badges, watermarks, framing border, or extra decoration. The project name and caption will be HTML outside this image. Primary request: depict a few people sharing small everyday moments in their own space. Subject: three small square photographic prints with simple narrow white borders, loosely overlapping in a relaxed group at the center, attached with one small matte blue paper clip. The actual photographs show quiet ordinary details: blue sea ripples, green leaves in daylight, and window light falling across a plain wall. No people, no text on the prints. The prints sit on a seamless pale icy-blue backdrop. A natural small group of photographs, asymmetrical yet balanced composition, photo print surfaces with fine realistic photographic detail. Entire group occupies about 60 percent of the image. Avoid speech-bubble icons, chat UI, social network symbols and a collage filling the entire canvas.
