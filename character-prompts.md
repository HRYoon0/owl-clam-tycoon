# 조개 껍데기 이미지 생성 프롬프트 (붙여넣기용)

ChatGPT 이미지 생성에 **그대로 복사해서 붙여넣으면 되는** 프롬프트 14개입니다. 고칠 곳 없습니다.

## 쓰는 법

1. 한 단계씩, **위 껍데기 → 아래 껍데기** 순서로 붙여넣습니다.
2. 아래 껍데기를 요청할 때 **방금 받은 위 껍데기 이미지를 첨부**하세요. 첨부하지 않아도 동작하지만,
   첨부하면 두 조각의 색과 선 굵기가 정확히 맞습니다.
3. 받은 PNG는 초록 배경을 지우고 `assets/shell/1-top.png` 형식으로 저장합니다.

> **1단계 재첩 두 장만 먼저 만들어 보세요.** 게임에 끼워 보고 판단한 뒤 나머지를 만드는 편이
> 안전합니다. 14장을 다 만든 뒤 안 어울리는 걸 발견하면 전부 다시 해야 합니다.

## 공통 규칙 (프롬프트마다 이미 포함돼 있음)

- 외곽선 `#083c4d`, 배경 키 컬러 `#00FF00`(전 단계 동일), 얼굴·눈·입 없음
- 위 껍데기는 **아래 모서리**가, 아래 껍데기는 **위 모서리**가 완벽한 수평 직선
  — 이게 응원 애니메이션의 회전 경첩입니다
- 실루엣은 7단계 전부 동일. 단계 차이는 껍데기 **무늬와 테두리 두께**로만 냅니다

---

# 1단계 · 재첩 `#f6c66e`

## 위 껍데기

```
Draw ONLY the upper shell half of a cartoon clam. This is a single game asset piece, not a character.

Subject: the top shell of a very small round baby clam, smooth surface with no ribs.

Shape (obey exactly):
- A wide dome, rounded across the top, tapering to the two lower corners. About twice as wide as tall.
- The BOTTOM EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is a hinge: it must not curve, sag, bulge, tilt,
  or round off at the corners.
- The dark outline runs around the curved top, down both sides, and along the flat bottom edge at a
  uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #f6c66e
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one lighter highlight band near the top. No gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. A lower shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

## 아래 껍데기

```
Draw ONLY the lower shell half of a cartoon clam. This is a single game asset piece, not a character.
If a reference image is attached, match its shell color, outline weight and rendering style exactly.

Subject: the bottom shell of a very small round baby clam, smooth surface with no ribs.

Shape (obey exactly):
- The TOP EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is the seam where the two shells meet: it must
  not curve, sag, bulge, tilt, or round off at the corners.
- Below that flat top edge the shape bulges outward and rounds off into a wide shallow bowl.
- The same width as the upper shell but shorter — about three quarters of its height, reading as
  roughly two and a half times as wide as tall.
- The dark outline runs along the flat top edge and around the rounded bottom at a uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #f6c66e
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one darker shadow band near the bottom. No gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. An upper shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

---

# 2단계 · 바지락 `#f0a76d`

## 위 껍데기

```
Draw ONLY the upper shell half of a cartoon clam. This is a single game asset piece, not a character.

Subject: the top shell of a small clam with faint concentric growth lines running parallel to the rim.

Shape (obey exactly):
- A wide dome, rounded across the top, tapering to the two lower corners. About twice as wide as tall.
- The BOTTOM EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is a hinge: it must not curve, sag, bulge, tilt,
  or round off at the corners.
- The dark outline runs around the curved top, down both sides, and along the flat bottom edge at a
  uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #f0a76d
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one lighter highlight band near the top. No gradient.
- Growth lines are thin darker strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. A lower shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

## 아래 껍데기

```
Draw ONLY the lower shell half of a cartoon clam. This is a single game asset piece, not a character.
If a reference image is attached, match its shell color, outline weight and rendering style exactly.

Subject: the bottom shell of a small clam with faint concentric growth lines running parallel to the rim.

Shape (obey exactly):
- The TOP EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is the seam where the two shells meet: it must
  not curve, sag, bulge, tilt, or round off at the corners.
- Below that flat top edge the shape bulges outward and rounds off into a wide shallow bowl.
- The same width as the upper shell but shorter — about three quarters of its height, reading as
  roughly two and a half times as wide as tall.
- The dark outline runs along the flat top edge and around the rounded bottom at a uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #f0a76d
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one darker shadow band near the bottom. No gradient.
- Growth lines are thin darker strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. An upper shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

---

# 3단계 · 동죽 `#d9ad7c`

## 위 껍데기

```
Draw ONLY the upper shell half of a cartoon clam. This is a single game asset piece, not a character.

Subject: the top shell of a plump thick-walled clam with subtle concentric bands.

Shape (obey exactly):
- A wide dome, rounded across the top, tapering to the two lower corners. About twice as wide as tall.
- The BOTTOM EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is a hinge: it must not curve, sag, bulge, tilt,
  or round off at the corners.
- The dark outline runs around the curved top, down both sides, and along the flat bottom edge at a
  uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #d9ad7c
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one lighter highlight band near the top. No gradient.
- Concentric bands are broad darker strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. A lower shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

## 아래 껍데기

```
Draw ONLY the lower shell half of a cartoon clam. This is a single game asset piece, not a character.
If a reference image is attached, match its shell color, outline weight and rendering style exactly.

Subject: the bottom shell of a plump thick-walled clam with subtle concentric bands.

Shape (obey exactly):
- The TOP EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is the seam where the two shells meet: it must
  not curve, sag, bulge, tilt, or round off at the corners.
- Below that flat top edge the shape bulges outward and rounds off into a wide shallow bowl.
- The same width as the upper shell but shorter — about three quarters of its height, reading as
  roughly two and a half times as wide as tall.
- The dark outline runs along the flat top edge and around the rounded bottom at a uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #d9ad7c
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one darker shadow band near the bottom. No gradient.
- Concentric bands are broad darker strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. An upper shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

---

# 4단계 · 맛조개 `#e19268`

## 위 껍데기

```
Draw ONLY the upper shell half of a cartoon clam. This is a single game asset piece, not a character.

Subject: the top shell of a clam with neat evenly spaced vertical ribs.

Shape (obey exactly):
- A wide dome, rounded across the top, tapering to the two lower corners. About twice as wide as tall.
- The BOTTOM EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is a hinge: it must not curve, sag, bulge, tilt,
  or round off at the corners.
- The dark outline runs around the curved top, down both sides, and along the flat bottom edge at a
  uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #e19268
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one lighter highlight band near the top. No gradient.
- Ribs are evenly spaced hard-edged strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. A lower shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

## 아래 껍데기

```
Draw ONLY the lower shell half of a cartoon clam. This is a single game asset piece, not a character.
If a reference image is attached, match its shell color, outline weight and rendering style exactly.

Subject: the bottom shell of a clam with neat evenly spaced vertical ribs.

Shape (obey exactly):
- The TOP EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is the seam where the two shells meet: it must
  not curve, sag, bulge, tilt, or round off at the corners.
- Below that flat top edge the shape bulges outward and rounds off into a wide shallow bowl.
- The same width as the upper shell but shorter — about three quarters of its height, reading as
  roughly two and a half times as wide as tall.
- The dark outline runs along the flat top edge and around the rounded bottom at a uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #e19268
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one darker shadow band near the bottom. No gradient.
- Ribs are evenly spaced hard-edged strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. An upper shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

---

# 5단계 · 키조개 `#bf8cc7`

## 위 껍데기

```
Draw ONLY the upper shell half of a cartoon clam. This is a single game asset piece, not a character.

Subject: the top shell of a clam with bold wide fan ribs radiating from the hinge.

Shape (obey exactly):
- A wide dome, rounded across the top, tapering to the two lower corners. About twice as wide as tall.
- The BOTTOM EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is a hinge: it must not curve, sag, bulge, tilt,
  or round off at the corners.
- The dark outline runs around the curved top, down both sides, and along the flat bottom edge at a
  uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #bf8cc7
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one lighter highlight band near the top. No gradient.
- Fan ribs are bold hard-edged strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. A lower shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

## 아래 껍데기

```
Draw ONLY the lower shell half of a cartoon clam. This is a single game asset piece, not a character.
If a reference image is attached, match its shell color, outline weight and rendering style exactly.

Subject: the bottom shell of a clam with bold wide fan ribs radiating from the seam.

Shape (obey exactly):
- The TOP EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is the seam where the two shells meet: it must
  not curve, sag, bulge, tilt, or round off at the corners.
- Below that flat top edge the shape bulges outward and rounds off into a wide shallow bowl.
- The same width as the upper shell but shorter — about three quarters of its height, reading as
  roughly two and a half times as wide as tall.
- The dark outline runs along the flat top edge and around the rounded bottom at a uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #bf8cc7
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one darker shadow band near the bottom. No gradient.
- Fan ribs are bold hard-edged strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. An upper shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

---

# 6단계 · 가리비 `#ef7891`

## 위 껍데기

```
Draw ONLY the upper shell half of a cartoon scallop. This is a single game asset piece, not a character.

Subject: the top shell of a classic scallop with deep radiating fan ribs and a scalloped wavy rim.

Shape (obey exactly):
- A wide fan dome, rounded across the top with a gently scalloped wavy rim, tapering to the two lower
  corners. About twice as wide as tall.
- The BOTTOM EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is a hinge: it must not curve, sag, bulge, tilt,
  or round off at the corners. The wavy rim applies only to the curved top, never to this edge.
- The dark outline runs around the curved top, down both sides, and along the flat bottom edge at a
  uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #ef7891
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one lighter highlight band near the top. No gradient.
- Fan ribs are deep hard-edged strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. A lower shell, a second
shell, or a complete scallop. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

## 아래 껍데기

```
Draw ONLY the lower shell half of a cartoon scallop. This is a single game asset piece, not a character.
If a reference image is attached, match its shell color, outline weight and rendering style exactly.

Subject: the bottom shell of a classic scallop with deep radiating fan ribs and a scalloped wavy rim.

Shape (obey exactly):
- The TOP EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is the seam where the two shells meet: it must
  not curve, sag, bulge, tilt, or round off at the corners. The wavy rim applies only to the rounded
  bottom, never to this edge.
- Below that flat top edge the shape bulges outward and rounds off into a wide shallow bowl with a
  gently scalloped wavy rim.
- The same width as the upper shell but shorter — about three quarters of its height, reading as
  roughly two and a half times as wide as tall.
- The dark outline runs along the flat top edge and around the rounded bottom at a uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #ef7891
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one darker shadow band near the bottom. No gradient.
- Fan ribs are deep hard-edged strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. An upper shell, a second
shell, or a complete scallop. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI.
```

---

# 7단계 · 대왕조개 `#d9a520`

> 원래 지정색은 `#ffd34e`였으나 **1단계 재첩 실측색(`#fdcc49`)과 색 거리가 8.8**로 사실상 같은 색이라
> 짙은 앤티크 골드로 옮겼습니다. 재첩과의 거리가 67로 벌어집니다.

## 위 껍데기

```
Draw ONLY the upper shell half of a cartoon giant clam. This is a single game asset piece, not a character.

Subject: the top shell of a majestic giant clam in deep antique gold, with a thick heavy rim and
bold deep ribs.

Shape (obey exactly):
- A wide dome, rounded across the top with a thick heavy rim, tapering to the two lower corners.
  About twice as wide as tall.
- The BOTTOM EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is a hinge: it must not curve, sag, bulge, tilt,
  or round off at the corners. The heavy rim applies only to the curved top, never to this edge.
- The dark outline runs around the curved top, down both sides, and along the flat bottom edge at a
  uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #d9a520
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one lighter highlight band near the top. No gradient.
- Ribs are bold deep hard-edged strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. A lower shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI. No crown, no
jewels, no gold trim.
```

## 아래 껍데기

```
Draw ONLY the lower shell half of a cartoon giant clam. This is a single game asset piece, not a character.
If a reference image is attached, match its shell color, outline weight and rendering style exactly.

Subject: the bottom shell of a majestic giant clam in deep antique gold, with a thick heavy rim and
bold deep ribs.

Shape (obey exactly):
- The TOP EDGE MUST BE ONE PERFECTLY STRAIGHT HORIZONTAL LINE running the full width of the shape,
  flat from the left corner to the right corner. It is the seam where the two shells meet: it must
  not curve, sag, bulge, tilt, or round off at the corners. The heavy rim applies only to the
  rounded bottom, never to this edge.
- Below that flat top edge the shape bulges outward and rounds off into a wide shallow bowl with a
  thick heavy rim.
- The same width as the upper shell but shorter — about three quarters of its height, reading as
  roughly two and a half times as wide as tall.
- The dark outline runs along the flat top edge and around the rounded bottom at a uniform thickness.

Palette (binding — use these exact values, do not re-tint or re-light):
- Shell body: #d9a520
- Outline: #083c4d, uniform thick dark outline
- Flat fill only, at most one darker shadow band near the bottom. No gradient.
- Ribs are bold deep hard-edged strokes of the same hue, not a texture or gradient.

Style: clean 2D cartoon game sprite, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Framing: one single shape, centered, seen straight from the front in a flat 2D game-sprite view,
filling about three quarters of the canvas width with even margins. One continuous silhouette.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The shell must avoid green entirely. Drop every shadow.

Do NOT draw: a face, eyes, mouth, tongue, pearl, or any creature part. An upper shell, a second
shell, or a complete clam. Any frame, border, outline box or vignette around the image. Sparkles,
stars, bubbles, dust, water drops, icons. Text, numbers, captions, watermarks, UI. No crown, no
jewels, no gold trim.
```

---

# 조개의 옷장 · 요리 아이템 8개

상점·비밀 도감·조개 주변 궤도에 쓰이는 아이콘입니다. 지금은 이모지라 **윈도우에서 맥과 다른 그림이
나옵니다**(Segoe UI Emoji). 이미지로 바꾸면 어느 PC에서나 같아집니다.

**정사각형(1024×1024)으로 요청하세요.** 실제 표시 크기는 26~30px이라, 프롬프트마다
`readable at 30 pixels` 조항을 넣어 디테일보다 실루엣을 우선하게 했습니다.

## ⚠️ 품목마다 배경 키 색이 다릅니다

| 품목 | 키 색 | 이유 |
|---|---|---|
| 피클, 청양고추 | **마젠타 `#FF00FF`** | 음식 자체가 초록이라 초록 키에 지워짐 |
| 나머지 6개 | 초록 `#00FF00` | 김치는 붉은색이라 마젠타와 겹침 |

각 프롬프트에 이미 맞는 색이 들어 있으니 그대로 붙여넣으면 됩니다.

## 공통 규칙 (프롬프트마다 이미 포함)

- 외곽선 `#083c4d` — 조개 껍데기와 같은 남색, 굵기도 동일
- 평평한 단색 채움 + 밝은 단계 1개까지. 그라디언트 없음
- 접시·젓가락·김·반짝임·글자 없음 (그릇에 담기는 음식은 그릇이 곧 아이템)

---

## 1. 봉골레 파스타 (`pasta`)

```
Draw ONE piece of food as a game item icon. This is a single object, not a scene.

Subject: a small shallow white bowl holding a neat nest of spaghetti with two or three small closed
clam shells resting on top.

Shape (obey exactly):
- One single object, centered, seen from a slight three-quarter angle above, filling about 75% of
  the canvas with even margins on all sides.
- Bold readable silhouette: the shape must still be recognizable when shrunk to 30 pixels wide.
  Favour a few big clear shapes over many small ones.

Palette (binding):
- Outline: #083c4d, uniform thick dark outline around every shape.
- Noodles pale warm cream, bowl white, clam shells soft tan.
- Flat fill only, at most one lighter highlight and one darker shadow step. No gradient.

Style: clean 2D cartoon game item icon, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The food must avoid green entirely — no herbs, no parsley, no
green garnish. Drop every shadow and contact patch.

Do NOT draw: text, numbers, labels, price tags, steam, sparkles, motion lines, hands, chopsticks,
forks, spoons, people, tables, placemats, frames, borders, watermarks, ground shadows.
```

## 2. 피클 (`pickle`) — 마젠타 키

```
Draw ONE piece of food as a game item icon. This is a single object, not a scene.

Subject: a short stack of three round cucumber pickle slices, seen from a slight three-quarter angle,
each slice showing its pale seedy centre and darker green rind.

Shape (obey exactly):
- One single object, centered, filling about 75% of the canvas with even margins on all sides.
- Bold readable silhouette: recognizable when shrunk to 30 pixels wide. Favour a few big clear
  shapes over many small ones.

Palette (binding):
- Outline: #083c4d, uniform thick dark outline around every shape.
- Rind deep green, flesh pale yellow-green.
- Flat fill only, at most one lighter highlight and one darker shadow step. No gradient.

Style: clean 2D cartoon game item icon, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Background: fill the ENTIRE background, edge to edge, with pure keying magenta (#FF00FF), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The food must avoid magenta, pink and purple entirely. Drop
every shadow and contact patch.

Do NOT draw: text, numbers, labels, price tags, steam, sparkles, motion lines, hands, chopsticks,
forks, spoons, people, tables, placemats, frames, borders, watermarks, ground shadows.
```

## 3. 30cm 칼국수 (`kalguksu`)

```
Draw ONE piece of food as a game item icon. This is a single object, not a scene.

Subject: a deep white bowl of Korean knife-cut noodle soup — thick flat pale noodles piled above a
light broth.

Shape (obey exactly):
- One single object, centered, seen from a slight three-quarter angle above, filling about 75% of
  the canvas with even margins on all sides.
- Bold readable silhouette: recognizable when shrunk to 30 pixels wide. Favour a few big clear
  shapes over many small ones.

Palette (binding):
- Outline: #083c4d, uniform thick dark outline around every shape.
- Noodles pale cream, broth warm off-white, bowl white.
- Flat fill only, at most one lighter highlight and one darker shadow step. No gradient.

Style: clean 2D cartoon game item icon, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The food must avoid green entirely — no spring onion, no herbs,
no green garnish. Drop every shadow and contact patch.

Do NOT draw: text, numbers, labels, price tags, steam, sparkles, motion lines, hands, chopsticks,
forks, spoons, people, tables, placemats, frames, borders, watermarks, ground shadows.
```

## 4. 실비김치 (`kimchi`)

```
Draw ONE piece of food as a game item icon. This is a single object, not a scene.

Subject: a small neat heap of Korean red kimchi — folded leaves coated in red seasoning.

Shape (obey exactly):
- One single object, centered, filling about 75% of the canvas with even margins on all sides.
- Bold readable silhouette: recognizable when shrunk to 30 pixels wide. Favour a few big clear
  shapes over many small ones.

Palette (binding):
- Outline: #083c4d, uniform thick dark outline around every shape.
- Deep warm red seasoning with pale cream leaf stems showing at the folds.
- Flat fill only, at most one lighter highlight and one darker shadow step. No gradient.

Style: clean 2D cartoon game item icon, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The food must avoid green entirely. Drop every shadow and
contact patch.

Do NOT draw: text, numbers, labels, price tags, steam, sparkles, motion lines, hands, chopsticks,
forks, spoons, people, tables, placemats, frames, borders, watermarks, ground shadows.
```

## 5. 바지락 술찜 (`steamed`)

```
Draw ONE piece of food as a game item icon. This is a single object, not a scene.

Subject: a wide shallow cooking pot holding several open clam shells in a shallow broth.

Shape (obey exactly):
- One single object, centered, seen from a slight three-quarter angle above, filling about 75% of
  the canvas with even margins on all sides.
- Bold readable silhouette: recognizable when shrunk to 30 pixels wide. Show only three or four
  clams, large and clearly separated, not a crowd of small ones.

Palette (binding):
- Outline: #083c4d, uniform thick dark outline around every shape.
- Pot warm grey, clam shells soft tan with pale cream interiors, broth light golden.
- Flat fill only, at most one lighter highlight and one darker shadow step. No gradient.

Style: clean 2D cartoon game item icon, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The food must avoid green entirely — no spring onion, no herbs,
no green garnish. Drop every shadow and contact patch.

Do NOT draw: text, numbers, labels, price tags, steam, sparkles, motion lines, hands, chopsticks,
forks, spoons, people, tables, placemats, frames, borders, watermarks, ground shadows.
```

## 6. 마늘 토핑 (`garlic`)

```
Draw ONE piece of food as a game item icon. This is a single object, not a scene.

Subject: a small pile of three peeled garlic cloves.

Shape (obey exactly):
- One single object group, centered, filling about 75% of the canvas with even margins on all sides.
- Bold readable silhouette: recognizable when shrunk to 30 pixels wide. Three large cloves, clearly
  separated, not a crowd of small ones.

Palette (binding):
- Outline: #083c4d, uniform thick dark outline around every shape.
- Cloves warm ivory with a faint cream shadow side.
- Flat fill only, at most one lighter highlight and one darker shadow step. No gradient.

Style: clean 2D cartoon game item icon, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The food must avoid green entirely — no green sprout, no
leaves, no stem. Drop every shadow and contact patch.

Do NOT draw: text, numbers, labels, price tags, steam, sparkles, motion lines, hands, chopsticks,
forks, spoons, people, tables, placemats, frames, borders, watermarks, ground shadows.
```

## 7. 청양고추 (`chili`) — 마젠타 키

```
Draw ONE piece of food as a game item icon. This is a single object, not a scene.

Subject: two whole fresh green Korean chili peppers lying crossed, each with a short stem.

Shape (obey exactly):
- One single object group, centered, filling about 75% of the canvas with even margins on all sides.
- Bold readable silhouette: recognizable when shrunk to 30 pixels wide. Two large peppers only.

Palette (binding):
- Outline: #083c4d, uniform thick dark outline around every shape.
- Peppers vivid green with a darker green shadow side, stems deeper green.
- Flat fill only, at most one lighter highlight and one darker shadow step. No gradient.

Style: clean 2D cartoon game item icon, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Background: fill the ENTIRE background, edge to edge, with pure keying magenta (#FF00FF), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The food must avoid magenta, pink and purple entirely. Drop
every shadow and contact patch.

Do NOT draw: text, numbers, labels, price tags, steam, sparkles, motion lines, hands, chopsticks,
forks, spoons, people, tables, placemats, frames, borders, watermarks, ground shadows.
```

## 8. 모짜렐라 치즈 (`cheese`)

```
Draw ONE piece of food as a game item icon. This is a single object, not a scene.

Subject: one thick wedge of pale mozzarella cheese with a soft rounded corner, next to a smaller
cube of the same cheese.

Shape (obey exactly):
- One single object group, centered, filling about 75% of the canvas with even margins on all sides.
- Bold readable silhouette: recognizable when shrunk to 30 pixels wide. Two simple blocks only.

Palette (binding):
- Outline: #083c4d, uniform thick dark outline around every shape.
- Cheese pale creamy ivory with a slightly warmer yellow shadow side.
- Flat fill only, at most one lighter highlight and one darker shadow step. No gradient.

Style: clean 2D cartoon game item icon, bold uniform outline, flat vivid colors, simple two-tone cel
shading, smooth rounded shapes. Never use pixelation, gradients, photo textures, airbrush shading,
glossy lighting, or 3D rendering.

Background: fill the ENTIRE background, edge to edge, with pure keying green (#00FF00), perfectly
uniform, a single flat color touching all four image borders. No gradient, texture, scenery, floor,
panel, frame, or border of any kind. The food must avoid green entirely. Drop every shadow and
contact patch.

Do NOT draw: text, numbers, labels, price tags, steam, sparkles, motion lines, hands, chopsticks,
forks, spoons, people, tables, placemats, frames, borders, watermarks, melting drips, ground shadows.
```

받으면 `assets/item/pasta.png` 처럼 **품목 id**로 저장합니다
(`pasta` `pickle` `kalguksu` `kimchi` `steamed` `garlic` `chili` `cheese`).

> **비밀 도감(레시피 4종)은 따로 만들 필요 없습니다.** 레시피 데이터에 이미 `needs: ["pasta", "pickle"]`
> 처럼 재료 목록이 있어서, 재료 아이콘을 나란히 보여주면 됩니다. 이모지 조합(`🍝🥒`)을 대체할
> 그림을 4개 더 만들 이유가 없습니다.

---

# 배경 · 바닷속 (선택)

조개 뒤 수조(`.specimen`)에 깔 배경입니다. 지금은 CSS 그라디언트 + 격자 무늬이고,
그 위에 **빛줄기·방울·부유 입자는 CSS 애니메이션으로 이미 얹혀 있습니다.**
그래서 이미지에는 그 효과들을 **넣지 않습니다**(겹치면 지저분해집니다).

**정사각형(1024×1024)으로 요청하세요.** 이 영역은 데스크톱에서 거의 정사각, 위젯에서 세로로 긴
직사각, 모바일에서 가로로 긴 직사각이 되며 `background-size: cover`로 잘려 들어갑니다.
정사각으로 받아 가운데를 비워두는 것이 세 경우 모두에서 안전합니다.

```
Draw an underwater background plate for a 2D game. No characters, no creatures, no text.

Scene: looking into calm shallow sea water. The top is bright turquoise where sunlight enters, and
it deepens smoothly downward into deep teal, then into dark blue-teal at the very bottom. The mood
is quiet and clean. The middle of the image sits behind a character, so it must stay nearly empty.

Palette (binding — use these exact values as the anchors of the vertical gradient):
- Top water: #43bab5
- Middle water: #168994
- Bottom water: #07566d
Stay inside this turquoise to deep-teal family. No warm colors, no purple, no neon, no black.

Composition (obey exactly):
- A smooth vertical gradient is the backbone: brightest at the top, darkest at the bottom.
- Keep the central 60% of the canvas nearly empty — gradient only, with at most a very faint haze.
- Put quiet detail only along the bottom edge and the lower corners: soft silhouettes of seaweed
  fronds and one low rounded sea-floor mound, drawn in a darker shade of the same teal, flat and
  unlit. Keep them low and simple so they survive being cropped.
- A few faint, blurry pale-teal shapes far in the distance for depth. Nothing sharp anywhere.
- The bottom 15% must stay dark and even, so white text placed over it stays readable.

Style: flat 2D game background, soft airbrushed gradient with simple shapes, gentle and clean, like
a calm mobile game menu screen. No hard outlines, no black cel-shading lines, no pixelation, no
photo texture, no 3D rendering.

Do NOT draw: any clam, shell, fish, crab, jellyfish, coral, bubbles, light beams, god rays, caustic
light patterns, sparkles, boats, divers, treasure, text, numbers, watermarks, UI, frames or borders.
```

받으면 `assets/bg-sea.png`로 저장하시면 됩니다. 배경은 투명이 필요 없으니 **초록 배경 제거 과정이
없습니다** — 받은 파일을 그대로 쓰면 됩니다. 연결은 `style.css` 한 줄입니다.

```css
.specimen { background: url("assets/bg-sea.png") center / cover no-repeat,
                       radial-gradient(circle at 50% 42%, #43bab5 0, #168994 40%, #07566d 76%); }
```

> 그라디언트를 뒤에 남겨두는 이유: 이미지가 로드되기 전이나 실패했을 때 수조가 흰색으로 비지 않습니다.

---

## 파일 배치

받은 PNG는 초록 배경을 지우고 여백을 잘라낸 뒤 이렇게 둡니다.

```
assets/shell/1-top.png   assets/shell/1-bottom.png
assets/shell/2-top.png   assets/shell/2-bottom.png
...
assets/shell/7-top.png   assets/shell/7-bottom.png
```

## 그 다음 코드 변경 (참고)

`style.css`에서 껍데기 두 줄의 채움만 바뀝니다. 응원 애니메이션·회전축·눈 깜빡임은 손대지 않습니다.

```css
/* 지금 */
.clam__top, .clam__bottom { background: var(--shell, #f6c66e); border: 7px solid #083c4d; }

/* 바뀔 모습 */
.clam__top, .clam__bottom { background: center / contain no-repeat; border: 0; }
.clam__top    { background-image: var(--shell-top); }
.clam__bottom { background-image: var(--shell-bottom); }
```

단계가 바뀔 때 `app.js`가 `--shell` 색을 갈아끼우던 자리(`render()` 안 한 줄)에서
`--shell-top` / `--shell-bottom` 이미지 경로를 갈아끼우게 됩니다.
