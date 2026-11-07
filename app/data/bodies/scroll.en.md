The two notes above this one fit on a screen. This one does not. It is here so the bar beside the back link has a distance to travel.

Open it, do not touch the wheel yet, and look at the pill. A long note shows the share already in the window. It is not empty, and it is not full. A short stripe means most of the box is still below the window.

## What it measures

The meter watches the article box, not the words. Headings, lists, fences, and the cover all add height. A blank line does too. The fill does not know which paragraph you are reading. It knows how much of the box has entered the window, from the top of the box to the bottom of the window.

A note that already fits in the window is full. You have seen all of it. It does not sit at half because it occupies half the window.

When the article is taller, the value starts at that share. It hits 100 when the bottom of the box reaches the bottom of the window. Scroll back to the top and it returns to the share still in the window. It empties only when the box is entirely below the window.

```ts
const seen = Math.min(Math.max(viewHeight - top, 0), height)
const read = height > 0 ? seen / height : 0
```

The header is sticky, and the reader bar sticks under it. The formula uses the full window, so a line that has crossed the top still counts. Close is enough for a bar.

## Before you scroll

The cover sits in the article box, so it counts. The title and the excerpt count. If the first heading is on screen and the last heading is not, you are at the start. The pale part of the pill should still be most of the track.

A raw tag stays text, same as the other note: <script>alert(1)</script>. That line is short. It will not move the bar by itself. The paragraphs under it will.

Inline code looks like `read.value`. It does not change the height much. A fence does. The block above is taller than a sentence, and the meter treats that height like any other.

## The first stretch

Scroll a little. The pink back stamp should stay put, under the site header, not over it. The article should slide underneath. If the stamp jumps to the top of the window and covers the brand, the stick offset is short.

The stripe should grow by a small step, not jump to the end. If it jumps, the window is tall enough that this note already sits inside it. Shrink the window and try again. A short window is a better test than a long note on a cinema display.

Keep the pointer off the pill. It is not a control. The link next to it is the control, and it goes to the list, not through history. A direct visit has no history to walk back.

## Lists add height

The meter does not skip lists. Each item is a line. A long item wraps and adds another.

- The cover is inside the measured box.
- The missing-post banner is not. There is no article, so there is no pill.
- A French body can be taller or shorter than this one. The fill should follow the box, not the English number.
- A code fence is one block, even when it holds several lines.
- A heading is heavier than a paragraph, and still just height.

None of those items is a checkpoint. There is no mark at 25, 50, or 75. The track is one segment. If you want ticks, that is a different widget.

## Halfway, roughly

If this heading is near the middle of the window, the stripe should be near the middle of the pill. Not exact. The cover already passed. The header ate a strip of the window that the formula still counts as reading room. You are close when the pale cap and the purple fill are about the same length.

Do not trust a guess from the scrollbar either. The page scrollbar includes the header, the reader bar, and the footer. The meter ignores those. It can sit at 40 while the scrollbar thumb looks further along, or the other way around. That split is the point of measuring the article box.

Stop here and resize the window. Taller window, the stripe jumps ahead. Shorter window, it falls back. The fill follows the box. No reload.

## Pictures and late height

The cover image can arrive after the first paint. If it changes the box, the fill has to catch up without another scroll.

A broken image still occupies the cover frame. The plate is a square in the header of the article. Missing bytes should not collapse the box to zero, and should not throw the value to 100 by mistake.

## Locale

Switch the language. This note has a French body, not a fallback to English. The words are not the same length. A heading may wrap on one side and not the other. The box changes. The fill should be recomputed from the new box.

If the French page shows the empty-body notice, the file `scroll.fr.md` was not picked up. The catalog key is not enough. The body is a separate file, one per locale, and a missing file is a missing note.

Switch back. The English box returns. The value should move again, even if you did not scroll. A resize of the text is a resize of the box.

## A slower pass

Read this stretch without watching the pill. Then look up. The stripe should have moved by about the amount of text that left the window. If it has not moved at all, the box is not the one being measured. Empty means the box is entirely below the window. Full means the bottom has reached the bottom of the window, or the whole box already fits.

The back link should still work from here. It does not need the article. The list is the parent. Opening this note in a new tab and pressing the link should still land on the posts page.

Refresh on this section. The page returns to the top, and the value should return with it. A refresh that keeps a full pill while the first heading is on screen is a stale number, or a box that fits the window after all.

## Near the end

A few sections remain. The purple fill should own most of the track. A pale cap should still show, unless your window is tall enough to see the last line already. If you can see the last line and the start of the note at the same time, you are in the short-page case again. The value belongs at 100. Make the window shorter if you want to watch the last step.

The footer is outside the article box. Reaching it is not required for a full pill. The full value arrives when the bottom of the note meets the bottom of the window, which may be a little before the footer, or as the footer comes in. Either is fine. The footer is not part of the test.

## The last line

This is the last paragraph. When it sits at the bottom of the window, the pill should be full. Scroll back to the cover. The stripe should shrink to the share still in the window. It should not empty while the top of the note is on screen.

That is the test. A long note, a bar that moves, a link that leaves. The short notes stay short on purpose.
