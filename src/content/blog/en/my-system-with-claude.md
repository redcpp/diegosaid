---
title: "One Hundred Seventy-Seven Reminders"
subtitle: "Notes on the system I built with Claude to organize training, work and my master's degree, and on what I had to delete along the way."
excerpt: "I had 177 reminders for studying competitive programming, and I deleted them. How I built a system with Claude in layers, and what the research says about long texts, average answers and habits."
date: 2026-11-01
readMinutes: 8
key: mi-sistema-con-claude
tags:
  - Artificial intelligence
  - Habits
  - Writing
---

*This essay was written in Spanish. What follows is a translation; the [original](/blog/mi-sistema-con-claude/) is the one the argument is about.*

## The reminders

I had 177 reminders for studying competitive programming, and they worked well for me. The notifications were always there, I kept up with every topic and I didn't miss a day. The trouble was that each reminder expected me to do something on an exact date, and life doesn't always respect dates: one day work piles up, another day responsibilities grow, another day you have to travel. Then I had to go through every date, resync them and catch up, while the list of paused items grew until it became overwhelming.

Every date that slipped became one more pending item, even though a missed day weighs less than it seems. At University College London, researchers followed 96 volunteers while they formed a new daily habit. For half of those with enough data, it took more than 66 days to become automatic, and skipping a single day didn't meaningfully change their progress (Lally et al., 2010).

I deleted the reminders and handed the follow-up to Claude, which lets me pick things back up when it makes sense. These past weeks, for example, work has asked more of me and competitive programming is on hold. The project is still in sight and I don't lose track of it, but I know there are more important things right now. Naval Ravikant compares people who work with their heads to athletes, who train, sprint, rest and reassess (Jorgenson, 2020). I think of it as lions, which rest and, when it's time to work, go all out. I'm always going all out, but I point that effort at different goals depending on what life is asking for.

## Scattered chats

The system started, like almost everything one does with these tools, with scattered chats. When I used Claude only a little, I'd open a conversation and talk, and after a while it would turn repetitive or the oldest parts would start being ignored. I had to summarize, open a new chat or save files so I wouldn't lose the thread.

In 2023, a team led by Stanford researchers measured something similar. They gave GPT-3.5, the model behind ChatGPT at the time, twenty documents to answer each question. It got 76 out of 100 right when the answer was in the first document and 54 when it was in the tenth, fewer than the 56 it got right with no documents at all (Liu et al., 2023). Language models make good use of the beginning and the end of a long text and much worse use of what sits in the middle, which in a long conversation is almost everything. Two years later, Chroma, a company that builds databases for AI applications, tested 18 newer models, Claude Opus 4 among them, and found that their performance grows less reliable as the text gets longer (Hong et al., 2025).

That gave me the first layer. Claude lets you save *skills*: instructions about an area that it consults whenever they're needed. I made one for sport, another for work and another for the programming coursework of my master's degree. Then I found out on my own that a skill can call other skills, and I built one for my weekly plan: I ask it for the week and it coordinates with the rest. I call it a *proxy*, because it talks to the others on my behalf. The third layer was projects, where long-running work lives with its files and its history. From there I started studying Claude in more depth, looking for good practices and getting more out of the tools it has.

Skills, projects and documents are everyday words, and we use them to describe ourselves as people too; now a tool has them at our disposal.

I don't know whether my results are better than before. With discipline alone I was already doing well, and Claude is smart enough to give good answers without much back and forth. What I did notice is that the output looks more like what I want: I explain myself and organize myself better, and I can carry several things in parallel.

## The memo

Before all this I had a memo skill. I'd print the conversation to a PDF and hand it to the next chat, and so on. The memos looked very nice, but they were six to ten pages I didn't read, full of unnecessary information and extra context. If I wanted to take a note from one, I had to read the whole thing to find a single line worth keeping; a list written by hand would have taken me less time and I'd have understood it better. I ended up calling it *AI slop*, the name for the filler that artificial intelligence produces, and I deleted it.

Filler doesn't help the model either. In 2024, three researchers gave five models, GPT-4 and Gemini Pro among them, the same reasoning task and kept adding irrelevant text around it. When the total reached about 2,250 words, average accuracy fell from 92% to 68% (Levy et al., 2024). My memos were longer than that. It's easy to give in to the temptation of saving everything, and sometimes too much information erases the signal because it contaminates it with noise.

## Dictating

My first idea for this blog was for Claude to write on its own, at night, using capacity nobody was using at those hours. I dropped it because artificial intelligence, by default, gives average answers. Ask a person for a random number from 0 to 9 and the most common answer is 7. In a 1976 study, 28% of 558 people chose it, almost three times what chance would give (Kubovy and Psotka, 1976). The models learned from what we write and inherited that bias, amplified (Coronado-Blázquez, 2025). In a test by the consultancy Springboards, cited by the writer Ian Leslie, GPT, Claude and Gemini answered 7 in at least 90 out of 100 tries when asked for a number from 1 to 10 (Leslie, 2025). A random number generator would spread its answers evenly. A text written at night, with nobody giving it original material, comes out just as predictable: ordinary, generic and, for what I want to do, mediocre.

That's why I dictate. The ideas, the concrete cases and the way of thinking are mine; Claude turns what I say into text and helps me with the editing, the way an editor would. It does set some direction, because at the start of each piece it asks me questions like an interviewer. What it gives me, above all, is order. When I talk about a topic I jump from one place to another, and the ideas arrive loose, barely related; Claude groups them where they make sense. Giving them a beginning, a middle and an end is my job. Kurt Vonnegut said stories have shapes you can draw, like the one about someone who falls into a hole and climbs out better off than before (Vonnegut, 2005); Claude puts the pieces in order, but I'm still the one who connects that shape.

I never delegate the examples or the way of thinking, and that's why I believe no artificial intelligence could reproduce these pieces: what they tell happened to me, in my particular situation. If I ask Claude for a report on any topic, it may come out generic, or generic within a niche. In 2024, Anil Doshi and Oliver Hauser asked 293 people to write a short story and gave some of them ideas generated by artificial intelligence. The stories written with help were rated more creative and better written, especially those by the less creative writers, and at the same time they ended up more alike (Doshi and Hauser, 2024). People are a series of paradoxes, of odd groupings that make us unique, and that doesn't show up in a report.

## The method

If someone asked me how to copy my system, I'd tell them to copy the metasystem, the way of arriving at it. Mine is optimized for me after months of adjustments and isn't necessarily the best for anyone else. What can be copied is the path. I study how the tool works, try things even if they fail and pay close attention to what happens; sometimes I run several tests in parallel to see which one comes out better. It's the good old scientific method: change one variable, keep the rest still and see what happens.

I did something similar with LinkedIn. The way people write there makes me cringe; it feels artificial, synthetic and sometimes fake. I don't read the long posts, which rarely have substance and would actually fit in an image, so I decided to publish exactly that: a carousel with data and a short comment, like the one that goes with this essay and gathers five of its studies. I wanted something that felt like mine, and so far I'm happy with the decision.

There's no right or wrong way to use these tools, only recommendations. Discipline was the base I built all this on, and study brings me perspectives and resources I wouldn't have found on my own. The rest is intuition, taste and the arrangement each of us finds with our tools, because in the end each of us decides where we are and where we want to go.

So that's what I do: stay curious, pay attention and try to get a little better each time.

## Sources

Consulted October 26 to 28, 2026.

- Phillippa Lally et al., [How are habits formed: Modelling habit formation in the real world](https://doi.org/10.1002/ejsp.674), *European Journal of Social Psychology*, 2010.
- Eric Jorgenson, [*The Almanack of Naval Ravikant*](https://www.navalmanack.com/), 2020.
- Nelson F. Liu et al., [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172), arXiv, 2023; published in *Transactions of the ACL*, 2024.
- Kelly Hong, Anton Troynikov and Jeff Huber, [Context Rot: How Increasing Input Tokens Impacts LLM Performance](https://www.trychroma.com/research/context-rot), Chroma, Jul 14, 2025.
- Mosh Levy, Alon Jacoby and Yoav Goldberg, [Same Task, More Tokens: the Impact of Input Length on the Reasoning Performance of Large Language Models](https://aclanthology.org/2024.acl-long.818/), *ACL*, 2024.
- Michael Kubovy and Joseph Psotka, [The predominance of seven and the apparent spontaneity of numerical choices](https://doi.org/10.1037/0096-1523.2.2.291), *Journal of Experimental Psychology: Human Perception and Performance*, 1976.
- Javier Coronado-Blázquez, [Deterministic or probabilistic? The psychology of LLMs as random number generators](https://arxiv.org/abs/2502.19965), arXiv, Feb 2025.
- Ian Leslie, [Why Are LLMs Fixated On the Number 7?](https://www.ian-leslie.com/p/why-are-llms-fixated-on-the-number), Oct 21, 2025; cites the Springboards test.
- Kurt Vonnegut, *A Man Without a Country*, 2005, [via The Marginalian](https://www.themarginalian.org/2012/11/26/kurt-vonnegut-on-the-shapes-of-stories/).
- Anil R. Doshi and Oliver P. Hauser, [Generative AI enhances individual creativity but reduces the collective diversity of novel content](https://doi.org/10.1126/sciadv.adn5290), *Science Advances*, 2024.
