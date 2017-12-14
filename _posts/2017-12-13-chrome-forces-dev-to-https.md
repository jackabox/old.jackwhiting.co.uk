---
title: Chrome 63 Forces .dev to HTTPS
layout: post
permalink: /chrome-63-forces-dev-to-https
excerpt: "Chrome 63 now forces all domains ending in .dev to be redirected to HTTPS and directly killed my local domains overnight."
tags:
  - Chrome
  - Local Stack
  - Valet
  - Web Development
  - redirect
---
> Chrome 63 (out since December 2017), will force all domains ending on .dev (and .foo) to be redirected to HTTPS via a preloaded HTTP Strict Transport Security (HSTS) header.

As a long time user of .dev as a domain of choice for development work, waking up to find all my sites are being redirected to https:// caused me a massive pain. Thankfully, using Laravel Valet I was able to change the dnsmasq with ease to another domain (.test) by running

```
valet domain test
```

You can find out more about this change at [https://ma.ttias.be/chrome-force-dev-domains-https-via-preloaded-hsts/](https://ma.ttias.be/chrome-force-dev-domains-https-via-preloaded-hsts/)