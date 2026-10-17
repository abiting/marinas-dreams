from pathlib import Path
from datetime import datetime, timezone, timedelta
import html
import json
import re

ROOT = Path(__file__).resolve().parent.parent
RAW = Path('/home/ubuntu/marina-review-batch/reviews-raw.json')
DELIVERABLE = Path('/home/ubuntu/Marinas-Dreams-50-English-Film-Reviews.md')

result = json.loads(RAW.read_text())
assert result['completedCount'] == 50 and not result['failures']
reviews = result['reviews']

# Keep search-facing names recognizable and use a consistent site spelling.
name_overrides = {
    'film-01': ('The Shawshank Redemption', 'The Shawshank Redemption Review | Marina’s Dreams', 'The Shawshank Redemption Review: Freedom as a Daily Practice'),
    'film-09': ('My Neighbor Totoro', 'My Neighbor Totoro Review | Marina’s Dreams', 'My Neighbor Totoro Review: Wonder in the Ordinary'),
    'film-21': ('The Legend of 1900', 'The Legend of 1900 Review | Marina’s Dreams', 'The Legend of 1900 Review: A Life Measured in Rooms'),
    'film-25': ('Crouching Tiger, Hidden Dragon', 'Crouching Tiger, Hidden Dragon Review | Marina’s Dreams', 'Crouching Tiger, Hidden Dragon Review: When Desire Defies Gravity'),
    'film-27': ('You Are the Apple of My Eye', 'You Are the Apple of My Eye Review | Marina’s Dreams', 'You Are the Apple of My Eye Review: Mischief and Unequal Memory'),
    'film-35': ('Harry Potter and the Philosopher’s Stone', 'Harry Potter: Sorcerer’s Stone Review | Marina’s Dreams', 'Harry Potter Review: The Magic of Thresholds'),
    'film-41': ('Mad Max: Fury Road', 'Mad Max: Fury Road Review | Marina’s Dreams', 'Mad Max: Fury Road Review: When Spectacle Learns to Cooperate'),
    'film-43': ('Everything Everywhere All at Once', 'Everything Everywhere All at Once Review | Marina’s Dreams', 'Everything Everywhere All at Once Review: Attention in the Infinite'),
    'film-48': ('Eternal Sunshine of the Spotless Mind', 'Eternal Sunshine Review (2004) | Marina’s Dreams', 'Eternal Sunshine Review: Memory Has Bad Architecture'),
}
for review in reviews:
    if review['id'] in name_overrides:
        review['name'], review['seoTitle'], review['title'] = name_overrides[review['id']]
    review['seoTitle'] = review['seoTitle'].replace("Marina's Dreams", 'Marina’s Dreams')
    for film_id, seo_title in {'film-38': 'Up Review (2009) | Marina’s Dreams', 'film-39': 'Coco Review (2017) | Marina’s Dreams', 'film-44': 'Jaws Review (1975) | Marina’s Dreams'}.items():
        if review['id'] == film_id:
            review['seoTitle'] = seo_title
    if review['id'] == 'film-04':
        review['paragraphs'] = [p.replace('Ellen Page’s Ariadne', 'Elliot Page’s Ariadne') for p in review['paragraphs']]
    if review['id'] == 'film-35':
        review['description'] = 'A review of Harry Potter and the Sorcerer’s Stone (Philosopher’s Stone), exploring Hogwarts, friendship, and the limits of its welcoming fantasy.'
        review['edition'] = '2001 film; US title: Harry Potter and the Sorcerer’s Stone'
    if review['id'] == 'film-40':
        review['description'] = 'Marina reviews Inside Out, praising its inventive mindscape and expressive performances while questioning the neatness of its emotional model.'
    if review['id'] == 'film-46':
        review['paragraphs'][0] = review['paragraphs'][0].replace('Ridley Scott’s 1982 film', 'Ridley Scott’s original 1982 theatrical version')
        review['edition'] = 'Original 1982 theatrical version'
    if review['id'] == 'film-36':
        review['edition'] = 'Original 1977 film, later titled Episode IV – A New Hope'
    # Remove a few unnecessary tail phrases; do not pad prose just to hit an exact word target.
    cleanups = {
        'film-11': ('proximity without belonging long after the credits.', 'proximity without belonging.'),
        'film-15': ('all at once in public.', 'all at once.'),
        'film-34': (' That balance feels quietly observant.', ''),
    }
    if review['id'] in cleanups:
        old, new = cleanups[review['id']]
        review['paragraphs'] = [p.replace(old, new) for p in review['paragraphs']]
    review['wordCount'] = len(' '.join(review['paragraphs']).split())
    assert 480 <= review['wordCount'] <= 560, (review['id'], review['wordCount'])
    assert len(review['description']) <= 160, (review['id'], len(review['description']))
    assert len(review['title']) <= 80, (review['id'], len(review['title']))

# Save cleaned editable data without internal research notes.
for review in reviews:
    review.pop('editorNote', None)
Path('/home/ubuntu/marina-review-batch/reviews-final.json').write_text(json.dumps(reviews, ensure_ascii=False, indent=2) + '\n')

content_path = ROOT / 'src/content.json'
content = json.loads(content_path.read_text())
existing = {review['slug'] for review in content['reviews']}
now = datetime.now(timezone(timedelta(hours=8))).isoformat(timespec='seconds')
added = 0
for review in reviews:
    if review['slug'] in existing:
        continue
    entry = {key: review[key] for key in ['slug', 'title', 'name', 'fullName', 'year', 'director', 'theme', 'seoTitle', 'description', 'sectionHeadings']}
    entry['paragraphs'] = [html.escape(p, quote=False) for p in review['paragraphs']]
    entry['sources'] = [dict(source, id=str(index + 1)) for index, source in enumerate(review['sources'])]
    entry['readMinutes'] = max(1, round(review['wordCount'] / 200))
    entry['publishedAt'] = now
    if review.get('edition'):
        entry['edition'] = review['edition']
    content['reviews'].append(entry)
    existing.add(review['slug'])
    added += 1
content_path.write_text(json.dumps(content, ensure_ascii=False, indent=2) + '\n')

# Build a single complete review manuscript with unique numeric reference IDs.
source_ids = {}
source_titles = {}
lines = ['# Marina’s Dreams — 50 English Film Reviews', '',
         'By Marina · Spoiler-light review drafts', '',
         'These 50 reviews follow the reflective style and approximate length of the first three articles. Each includes its SEO title, search description, and proposed website path.', '',
         '《刺激1995》 uses the original 1994 release year. “Star Wars” refers to the original 1977 film. The Harry Potter review covers the 2001 first film, known in the US as *Harry Potter and the Sorcerer’s Stone*. The Blade Runner review focuses on the original 1982 theatrical version.', '',
         '## Contents', '']
for index, review in enumerate(reviews, 1):
    lines.append(f'{index}. [{review["fullName"]} ({review["year"]})](#review-{index:02})')
for index, review in enumerate(reviews, 1):
    lines += ['', f'<a id="review-{index:02}"></a>', '', f'## {index:02}. {review["title"]}', '',
              f'**Film:** {review["fullName"]} ({review["year"]}) · **Director:** {review["director"]}', '',
              f'**SEO title:** {review["seoTitle"]}', '',
              f'**Meta description:** {review["description"]}', '',
              f'**URL path:** `/{review["slug"]}/` · **Length:** {review["wordCount"]} words', '']
    if review.get('edition'):
        lines += [f'**Version note:** {review["edition"]}', '']
    for paragraph_index, paragraph in enumerate(review['paragraphs']):
        if paragraph_index == 1:
            lines += [f'### {review["sectionHeadings"][0]}', '']
        elif paragraph_index == 4:
            lines += [f'### {review["sectionHeadings"][1]}', '']
        lines += [paragraph, '']
    refs = []
    for source in review['sources']:
        url = source['url']
        if url not in source_ids:
            source_ids[url] = len(source_ids) + 1
            source_titles[url] = source['title']
        refs.append(f'[{source_ids[url]}]')
    lines += ['**Film-detail references:** ' + ' '.join(refs), '']
lines += ['## References', '']
for url, number in source_ids.items():
    title = source_titles[url].replace('"', "'")
    lines.append(f'[{number}]: {url} "{title}"')
DELIVERABLE.write_text('\n'.join(lines) + '\n')
print(f'Added {added} reviews. Website now contains {len(content["reviews"])} reviews.')
print(f'New manuscripts: {len(reviews)}; word range: {min(r["wordCount"] for r in reviews)}–{max(r["wordCount"] for r in reviews)}')
print(f'Deliverable: {DELIVERABLE} ({DELIVERABLE.stat().st_size} bytes)')
