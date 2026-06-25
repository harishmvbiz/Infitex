# INFITEX GLOBAL ADVISORY — Website Guide (SEO + Leads edition)

Everything you need to publish the site, make it rank on Google, and capture leads. No coding background needed — most steps are copy/paste or drag-and-drop.

---

## 1. What's in the folder

| File | What it is |
|---|---|
| `index.html` | **Home** — both divisions (Outsourcing + Digitech) |
| `outsourcing.html` | **Accounting & compliance outsourcing** page |
| `digitech.html` | **Digitech** — websites, domains, hosting, SEO |
| `styles.css` | Shared look for all pages (don't rename) |
| `app.js` | Shared behaviour: theme, forms, WhatsApp/Email popups (don't rename) |
| `logo-infitex.png` | Logo for light backgrounds |
| `logo-infitex-light.png` | White logo for dark backgrounds |
| `sitemap.xml` | List of your pages for Google |
| `robots.txt` | Tells search engines they may crawl the site |

**Keep all files together in one folder.** Upload the whole folder.

---

## 2. The ONE thing to change first: your details

Open `app.js` in any text editor (Notepad/TextEdit). At the very top:

```js
var CONFIG = {
  whatsappNumber: "919000000000",          // intl format, no +, no spaces, no leading 0
  email:          "hello@infitexglobal.com"
};
```

Put your real WhatsApp number and email here. This powers the WhatsApp & Email pop-ups.

**Then do a Find & Replace across all files** (most editors: Ctrl/Cmd+Shift+H, "replace in folder") so the visible text and links match too. Replace each placeholder with your real value:

| Find this placeholder | Replace with |
|---|---|
| `919000000000` | your WhatsApp number, intl format (e.g. `9190000XXXXX`) |
| `+919000000000` | the same, with a leading `+` (used by phone/`tel:` links) |
| `+91 90000 00000` | the same, nicely spaced for display |
| `hello@infitexglobal.com` | your real email |

That's it — phone, WhatsApp, email, header "Call" link, footer and pop-ups all update.

---

## 3. Publish it free (~10 minutes)

**Easiest — Netlify Drop:** go to **app.netlify.com/drop** and drag the whole folder onto the page. You get a live link instantly. (Make a free account to keep & rename it.)

Alternatives: **Cloudflare Pages** (pages.cloudflare.com) or **Vercel** — same drag-the-folder idea. HTTPS/SSL is automatic and free on all of them.

---

## 4. Your own domain (the only real cost, ~A$10–35/yr)

- **`.com`** — recommended for you (works worldwide; no ABN needed).
- **`.com.au`** — needs an Australian ABN, so not suitable while India-based.

Buy from Cloudflare Registrar, Namecheap or GoDaddy, then use your host's "Add custom domain" step.

**IMPORTANT for SEO:** once you know your final web address, replace the placeholder domain **`https://www.infitexglobal.com`** everywhere it appears — in all 3 `.html` files (canonical + social tags), in `robots.txt`, and in `sitemap.xml`. A folder-wide Find & Replace does it in one go.

---

## 5. Google Search Console + SEO (this is the part you asked about)

The site is already built for SEO: unique titles & descriptions per page, social/share tags, structured data (so Google understands you're a business with services and an FAQ), a sitemap, robots.txt, mobile-friendly responsive layout, fast and lightweight, semantic headings and image alt text.

To register and get indexed:

1. **Publish the site first** (step 3) and connect your real domain (step 4).
2. Go to **search.google.com/search-console** and click **Add property** → choose **URL prefix** → enter your full site URL.
3. **Verify ownership** — two easy options:
   - **HTML tag method:** Google shows a tag like `<meta name="google-site-verification" content="abc123..." />`. Copy just the **content code** and paste it into each page where you see `REPLACE_WITH_GOOGLE_VERIFICATION_CODE` (3 files). Re-upload, then click Verify.
   - **DNS method (often easier):** add the TXT record Google gives you at your domain registrar. If you use this, the meta tag isn't needed (but it's harmless to leave).
4. **Submit your sitemap:** in Search Console → **Sitemaps** → enter `sitemap.xml` → Submit.
5. (Optional) Use **URL Inspection** → "Request indexing" for each page to speed things up.

**Keep ranking healthy over time:** add real content (FAQs, articles via the digest), get listed in directories, set up your **Google Business Profile** (your Digitech page sells this too), and earn links from partners. Re-submit the sitemap and bump the `<lastmod>` dates whenever you change pages.

> Tip: also create a free **Bing Webmaster Tools** account and submit the same sitemap — it covers Bing + others.

---

## 6. Make the contact form email you (free)

The form runs in **demo mode** until you connect a key:

1. Get a free **Access Key** at **web3forms.com** (just enter your email).
2. In `app.js`, find `var WEB3FORMS_KEY="YOUR_WEB3FORMS_ACCESS_KEY";`
3. Replace the placeholder with your key (keep the quotes). Save & re-upload.

The **same key** also powers the **Subscribe / digests** form — submissions (with the chosen Daily/Weekly/Monthly frequency) arrive in your inbox. Free tier = 250/month.

---

## 7. The floating buttons (WhatsApp + Email)

Bottom-right of every page you now have three round buttons: **back-to-top**, **Email**, and **WhatsApp**.

- **WhatsApp:** clicking it opens a small box that captures the visitor's **name, email, mobile, business, interest and message**. When they submit, it opens **WhatsApp** (app or web) with a tidy, structured message — including their email and mobile so you can follow up — pre-written and addressed to your number; they just press send.
- **Email:** same small box (name, email, mobile, business, interest, message); on submit it opens the visitor's **default email app** with the subject and a structured body already filled, addressed to your email.

Both require nothing on your side except your real number/email from step 2. If a visitor has JavaScript off, the buttons still fall back to a normal WhatsApp/email link.

---

## 8. Subscribe to digests

A "Get our practice & tax digests" box sits above the footer on every page: email + **Daily / Weekly / Monthly** choice. It collects subscribers through the same Web3Forms key (step 6). You can later export those addresses into a proper email tool (e.g. Mailchimp/Brevo free tiers) when you start sending the digests.

---

## 8b. Accessibility panel

The accessibility button (in the header) now opens its panel in the **top-right**, just under the header, with tidy aligned rows for text size, high contrast and theme.

## 9. Device optimisation (already done)

The layout automatically adapts to phone, tablet and desktop. To see it yourself: open the site, right-click → Inspect → click the phone/tablet icon to preview different screens. Nothing to configure.

---

## 10. Before you go live — checklist

- [ ] Real WhatsApp number, phone and email set (step 2)
- [ ] Web3Forms key added in `app.js` (step 6) — enables form + subscribe
- [ ] Real domain bought and connected (step 4)
- [ ] Placeholder domain replaced everywhere (step 4)
- [ ] Site verified in Google Search Console + sitemap submitted (step 5)
- [ ] LinkedIn URL added (footer link is currently `#`)
- [ ] (Optional) Privacy page — footer "Privacy" link is `#`

---

## 11. A note on accuracy & compliance

- The site correctly states INFITEX is **not** an Australian registered tax/BAS agent and that your practice clients keep sign-off. Keep it that way.
- Don't add fake testimonials or invented statistics (misleading under Australian Consumer Law). Add real client quotes only with permission.
- Don't claim security certifications you don't actually hold — the current wording is general and safe.

---

## 12. What's next

- LinkedIn company page + an advertising/content plan (the follow-up phase we discussed).
- Adding prices once you set them.
- Writing the first few digests so the subscribe box has something to send.

Keep this guide with the folder — it matches this version of the site.

## 13. New sections added (and what to edit)

The site now also includes: a **"tools we work in"** strip, an **engagement-models** section (dedicated / per-job / overflow), a **Data Security** section, an **indicative savings calculator**, a **key AU compliance dates** block, a **low-risk pilot** band, and **"Book a 15-min call"** buttons.

Two things to set:
- **Booking link:** replace the placeholder `https://calendly.com/infitex/intro` (Find & Replace across the .html files) with your real Calendly/scheduling URL. Free options: Calendly, Cal.com, or Zoho Bookings.
- **Calculator & dates are clearly marked "indicative."** The savings figure uses the visitor's own inputs (not a quote). The compliance dates are general — they already carry a note to confirm against the ATO calendar.

When you achieve **ISO 27001** (or any certification), update the "ISO 27001 roadmap" card in the Security section to say "certified".
