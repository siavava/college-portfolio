---
date: 2023-12-04
title: 'Discite'
url: 'https://discite-website.vercel.app/'
repo: 'https://github.com/lostflux/discite-frontend'
tech:
  - Swift
  - TypeScript
  - Node
  - MongoDB
  - Python
featured: true
navigation: false
tag: design / web
---

**Discite** turns idle screen time into learning — a short-form video app that
teaches computer science fundamentals through bite-sized, swipeable clips.
_Discite optimizes learning for the modern attention span._ Built as my
Dartmouth [CS98 senior capstone][article], it is a full platform: a SwiftUI
[iOS app][frontend], a TypeScript / Express [backend][backend] on MongoDB, a
Python [machine-learning service][ml], and a vector-search
[recommendation engine][recs].

**How the frontend and backend connect.** The iOS app is a pure client of a
stateless REST API — every call is an HTTPS request to a JSON route under
`/api/`, and every endpoint is guarded by a **JWT** the app obtains from
`POST /auth/signup` or `POST /auth/signin` and then attaches to subsequent
requests. The API splits into three concerns: auth and users (profiles,
friends), video engagement (`GET /videos/queue`, likes, dislikes, comments,
shares), and affinity scoring. The backend follows Express's
model–controller layout and is covered by 50+ Cypress integration tests.

**Streaming the video.** Rather than serving bytes straight from the database,
clips live on Amazon S3 and are delivered over HLS through CloudFront. When the
app wants a clip it asks the API for a signed `.m3u8` manifest; a Lambda fetches
and caches the CloudFront private key, authorizes the request, and signs the URL
— appending signed params to each `.ts` segment — so video loads progressively
as the user watches.

**Choosing what to play.** A machine-learning pipeline extracts atomic concepts
from long-form YouTube lectures, and a change-detection algorithm over the
resulting topic time-series finds clip boundaries automatically. The
recommendation engine then ranks clips by **affinity** (interest),
**complexity** (difficulty), and **relationship** (topic similarity), nudging
those scores from every watch, like, and dislike so the feed adapts as you
learn.

Read more in the [Medium write-up][article] and the project's
[architecture docs][docs].

[article]: https://medium.com/dartmouth-cs98/upgrade-your-screen-time-learn-cs-fundamentals-with-discite-14c3337cb074
[docs]: https://discite-website.vercel.app/docs/architecture
[frontend]: https://github.com/lostflux/discite-frontend
[backend]: https://github.com/lostflux/discite-backend
[ml]: https://github.com/lostflux/discite-ml
[recs]: https://github.com/lostflux/discite-recs
