---
title: 'Why Even I Can’t Read What You Write in Yipa'
seoTitle: 'Why Even I Can’t Read What You Write in Yipa | Will.OPC'
description: 'A conversation during Yipa’s security filing made me reconsider privacy, end-to-end encryption, and what a service provider should be able to do.'
publishedAt: '2026-09-24'
featured: true
category: 'product-building'
locale: 'en'
slug: 'why-i-cant-read-your-yipa-notes'
translationKey: 'why-i-cant-read-your-yipa-notes'
---

“Why would you go out of your way to encrypt things for your users?”

I froze for a moment when I heard that. To me, this was exactly what Yipa had to do.

Yipa is an app for recording emotions, thoughts, and the state of everyday life. No community, no likes, no comments, no direct messages; users are entirely separate from one another, and what you write is meant for you alone. From the start I wanted it to feel like a truly private thing, so when I added cloud sync I chose end-to-end encryption: a record is encrypted before upload, and the server stores only ciphertext. Under normal circumstances, I have no way to know what anything says.

That wasn't a "privacy feature" added for the marketing page. To me it was closer to a boundary the product should have. If an app holds someone's most private feelings, relationships, anxieties, and daily details, its developers shouldn't have the ability to read them at will. At the very least, I didn't want that ability.

Things got complicated when Yipa went through its cybersecurity filing.

At first I assumed the process would be about server security, data security, and features. Yipa isn't a content platform; users can't publish anything or show their records to anyone. In theory it would be hard even to use as an ordinary messaging tool. So I was surprised to be told that user input also needed to be reviewable.

I explained, more than once: this is a personal journaling app with no community features; people write about their feelings and their lives; the server only ever receives ciphertext, and I can't read it either. Then the other person asked:

"Why would you go out of your way to encrypt things for your users?"

That was when I realized our starting points might be entirely different.

I've always thought the best state for a privacy product isn't "trust me, I won't look at your data." It's "even if you don't trust me, I can't see it." The two sound similar; they work very differently. The first runs on promises. The company won't look, won't misuse, won't sell—those promises matter, but as long as the server holds directly readable content, what users are really trusting is people: the developers, the admins, the permission system, the hope that no account gets compromised, nothing gets misconfigured, and whoever inherits the product years from now still honors today's promises.

End-to-end encryption isn't trying to prove a developer deserves trust. It's trying to shrink how much trust the user has to hand over. If the system never stores plaintext, a whole class of problems never reaches the point where anyone's good intentions matter. A developer can't open the admin panel one curious afternoon and read what someone wrote. A misconfigured permission can't expose a trove of private records. Not because everyone is perfectly restrained—because the product never offers the opportunity. I've always liked that kind of design: rather than hoping the people inside never err, make some errors impossible to commit.

Later, another person talked it through with me at length, from a different angle. People give up some privacy in public places, he said, because of the realities of being there; the internet is similar, and once information travels across it, it's hard to treat it as entirely outside public oversight.

At first I didn't accept the comparison. What someone writes in a private journaling app and what someone posts on a platform seemed like different things to me.

Then he brought up cloud drives, which hold photos, videos, files—plenty of it deeply personal. And he asked a more specific question. Yipa syncs across devices; what if one account were shared by several people instead of one person on several devices? In theory they could pass messages by writing and syncing records, and because everything is end-to-end encrypted, the server couldn't read any of it.

That was when I understood where the conflict actually sat. In that conversation, the question on his side was: if a service can carry information, should its provider retain some ability to govern the content? The question on mine was: if a product holds someone's most private records, should its provider be architecturally unable to read them? Those two goals don't point in the same direction.

Once I saw that, I felt less like arguing. This wasn't going to be solved by "changing the product a little."

If I wanted the filing approved, I could give the server the ability to read users' records again. Remove end-to-end encryption, keep a server-side decryption path, design a review process that can step into user content. None of that is technically hard.

The real question was whether the result would still be the Yipa I wanted to build.

If I were making a public community, moderation would be part of the product. If I were making a messenger, there'd be a different set of security questions to answer. But Yipa was meant, from day one, to be a space for records as private as possible. Someone writes down what they ate today; someone keeps notes about work; someone writes things they've never told anyone. If users have to assume a developer can look at any of that whenever they want, the product has already drifted away from what it was for.

So in the end I stopped trying to get the filing approved. Not because I was sure one side was wrong, but because I finally understood the conflict wouldn't bend, and I chose to step away.

The experience kept me thinking for a long time about what privacy actually is.

We used to ask, of any online service: will it peek at my data, use it to train a model, sell it to advertisers, leak it? All fair questions. But the one I now ask first is more basic: can it see my data at all? "We won't look" is a rule. "We can't see" is an architecture. For especially private information, I increasingly prefer the second. I don't want a service to keep assuring me that no one here will open it. I'd rather it be able to say, from day one: even if we wanted to, we couldn't.

Since then I've paid attention to this with other products too. I still use cloud sync; it's genuinely convenient. What I look at now isn't just whether data goes up to a server, but what the server actually receives—content it can read, or data only my devices can decrypt—and whether the limits come from company policy or from the technology itself. For ordinary data the difference may not matter much. But if a service holds years of journal entries, private feelings, relationship notes, things you'd never want a stranger to see, the difference gets large. What you're really betting on isn't that today's operators are decent people. It's that no part of the system will go wrong at any point in the years ahead.

Rather than bet on every part staying correct forever, I'd rather delete some unnecessary capabilities outright.

Yipa will keep end-to-end encryption. The server helps you sync your data, but it doesn't know what you wrote, and neither do I. Not because I want to prove I'm a developer worth trusting, but because I've come to think good privacy design shouldn't ask users to trust anyone in the first place. The less trust it demands, the better.
