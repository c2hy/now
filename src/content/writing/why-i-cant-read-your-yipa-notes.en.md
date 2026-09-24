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

I froze for a moment when I heard that. To me, this was exactly what Yipa needed to do.

Yipa is an app for keeping track of emotions, thoughts, and the state of everyday life. It has no community, likes, comments, or private messages. Users are entirely separate from one another; what you write is meant for you alone. From the beginning, I wanted it to feel as private as possible. So when I later added cloud sync, I chose end-to-end encryption. A record is encrypted before it is uploaded, and the server stores only ciphertext. Under normal circumstances, I have no way to know what it says.

This wasn’t a “privacy feature” added for marketing. To me, it was closer to a boundary the product should have. If an app holds someone’s most private feelings, relationships, anxieties, and details of daily life, its developers shouldn’t have the ability to look at them whenever they want. At least, I don’t want that ability myself.

Things became complicated when I went through Yipa’s cybersecurity filing.

At first, I assumed the process would mostly concern server security, data security, and the app’s features. After all, Yipa isn’t a content platform. Users can’t publish anything publicly or show their records to other people. In theory, it would be difficult even to use it as a conventional communication tool.

So I was surprised when I was told that user input also needed to be reviewable.

I tried to explain several times. I said it was a personal journaling app with no community features, where people wrote about their feelings and their lives. I also explained Yipa’s end-to-end encryption: the server receives only ciphertext, and I can’t read what users write. Then the other person asked me:

“Why would you go out of your way to encrypt things for your users?”

That was the first time I realized we might be approaching the question from entirely different starting points.

I’ve always thought the best outcome for a privacy-focused product isn’t “Trust me, I won’t look at your data.” It’s “Even if you don’t trust me, I can’t see your data.”

There’s a real difference between the two. The first depends on a promise. A developer tells users that the company won’t look at, misuse, or sell their data. Those promises matter, of course. But if a server keeps content in a form that can be read directly, users still have to trust the people running the service. They have to trust the developer, the administrators, the permission system, that no account will be compromised, that nothing will be misconfigured, and that whoever takes over the product in the future will honor the promises made today.

End-to-end encryption is trying to solve a different problem. It isn’t about proving that a developer deserves trust; it’s about reducing how much trust users have to place in one. If the system never stores the plaintext, many problems don’t have to be solved by relying on people’s good intentions. A developer can’t open the admin panel out of curiosity and read what someone wrote. A misconfigured permission can’t expose a trove of private records stored in plaintext.

That’s not because everyone is perfectly restrained. It’s because the product doesn’t give them the opportunity.

That’s a kind of design I’ve always liked. A system is often most reliable not because the people in it will never make mistakes, but because it makes some mistakes impossible in the first place.

Later, another person spent a long time talking this through with me. He tried to explain it from a different angle. One comparison, roughly speaking, was that people give up some privacy in public places because of the realities of being there; the internet is similar. Once information travels over the internet, it can be difficult to treat it as entirely outside public oversight.

At first, I couldn’t quite understand the comparison. To me, what someone writes in a private journaling app is very different from what they post publicly on an internet platform.

Then he gave another example: cloud drives. They can hold many photos, videos, and files, some of them deeply personal. After that, he raised a more specific question. Yipa syncs across multiple devices, but what if one account were shared by several people rather than used by one person on several devices? In theory, they could exchange messages by writing to records and syncing them. And because those records are end-to-end encrypted, the server itself couldn’t read them.

That was when I began to understand where the conflict really was.

At least in this filing conversation, the question on the other person’s mind was whether a service that can carry information should retain some ability to govern its content. My question was whether a product that holds someone’s most private records should be designed so that its provider cannot read them.

Those two goals don’t point in quite the same direction.

Once I understood that, I felt less inclined to keep arguing. This wasn’t simply a matter of changing a feature.

If I wanted to meet the requirement, I could give Yipa’s server the ability to read users’ records again. I could remove end-to-end encryption, keep a mechanism that lets the server decrypt the content, or design some process for intervening in what users write. From an engineering perspective, none of that would be impossible.

The real question was: after doing that, would it still be the Yipa I wanted to build?

If I were making a public community, content moderation would naturally be part of the product. If I were building an instant messaging tool, I would have a different set of security questions to address. But from the beginning, Yipa was meant to be a space for keeping records as privately as possible. Someone might write down what they ate that day, keep notes about work, or record something they had never told anyone else.

If users have to assume that a developer can look at those things whenever they want, then, at least to me, the product has moved away from what it was meant to be.

So in the end, I stopped trying to get this filing approved.

Not because I thought one side had to be wrong, but because I had finally understood that this was a conflict I couldn’t resolve by “changing the product a little more.” So I chose to step away.

That experience made me think for a long time about what privacy really means.

When we talk about whether an internet service protects privacy, we often ask: Will the platform look at my data? Use it to train a model? Sell it to advertisers? Let it leak? These are all important questions. But now I think there’s a more basic one to ask first: does the platform have the ability to see my data at all?

“We won’t look” is a rule. “We can’t see it” is an architectural choice. Rules can constrain behavior, but architecture can limit what a service is capable of doing.

For especially private information, I’m increasingly drawn to the latter. I don’t want a service to keep reassuring me, “Don’t worry, no one here will open it.” I’d rather it be able to say from the start, “Even if we wanted to, we couldn’t read it.”

Since that filing experience, I’ve paid more attention to this when using other products, too. I still use cloud sync; it’s very convenient. What matters to me now isn’t just whether data is uploaded to a server, but what the server receives: content it can read directly, or data only my devices can decrypt. I also look at how much access the service provider has, and whether those limits come from company policy or from the technology itself.

For ordinary data, the difference may not matter very much. But if a service holds years of journal entries, private feelings, relationship notes, or anything you’d never want a stranger to see, the distinction starts to matter. What you really need to trust may not be the people running the product today, but that no part of the system will fail at any point over the years to come.

I’d rather remove some unnecessary capabilities than trust every part of the system to always get things right.

Yipa will continue to use end-to-end encryption. The server can help you sync your data, but it shouldn’t know what you’ve written. Neither should I.

That isn’t because I want to prove to users that I’m a developer worth trusting.

It’s because I’ve come to believe that good privacy design shouldn’t ask users to trust the developer first. It should make that trust as unnecessary as possible.
