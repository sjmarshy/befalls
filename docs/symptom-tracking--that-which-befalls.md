# [If I Could design my perfect Symptom Tracker](http://apievangelist.com/2014/06/25/if-i-could-design-my-perfect-api-design-editor/)
## or - my attempt at doing just that.

I have a vested interest in tracking my own symptoms, or I wouldn't even begin down this path. Several years ago now, I woke up dizzy - and I'm still there now. It comes and goes, and the first 6-10 weeks was worse than it ever was again, but that's hardly the point. At the time I was diagnosed with [labrynthitis](https://en.wikipedia.org/wiki/Labyrinthitis?oldformat=true) which affects the vestibular system, and my GP said that the reason it was sticking around was that the virus that caused the initial infection had probably caused some damage while running it's course.

I have days where it's worse, and I have days where it's better. Understandably, I think, I'd like to know if there's either rhyme or reason to this, if anything I do or experience affects these swings of dizziness - maybe I could stop it, if only I ate more carrots, or if only I did x, y or z. Now I'm aware it's unlikely I'll find any of this out in reality, but isn't it worth a go?

At this point, you'd expect me, no doubt, to list tools that attempt to do what I want, and explain why they were no good. I can't do this, because I haven't tried any. I'm on a short budget, with high standards. Maybe this is a poor combination, but I'm not going to apologise. Everything I could find already out there was either expensive, or immediately looked terrible or unbearable. Maybe I'm wrong, and should have at least tried something else. Maybe I've missed or overlooked the perfect solution, maybe I should just write stuff on a piece of paper. But no, I'm going to give this a go.

I'm going to start by listing what I want to be able to do with this tool, how I'd like to use it, what I want to track. I think this organic aproach might lead to the best design across interface, software and usefullness. 

Okay, so let's dive in.

## Why the stupid name?

## How things would be tracked


I see two ways to sample symptoms over time -

First, the voluntary addition of symptoms as they are experienced. This may well be the primary mode of usage. Using myself as an example, when I felt a wave of dizziness wash over me, I could pull up twb and enter a new symptom for now. It would record the time automatically, possibly even the location, though there's no real need for this to be automatic and it may be just as well to let a human do this. It would record the symptom I was feeling, the intensity, and any notes. Possibly it would record things like how long ago I ate last, what it was that I ate, when I drank last, what it was that I drank, or anything else relevant. Perhaps these questions would be configured by the user, based on what was relevent to them at the time.

Secondly, I believe that a random sampling of data may be useful. For this, the tracker could ask how you feel, what you're eating or doing or whatever, at random intervals of time. It would just pop up and ask. Again, using myself as an example (I am, afterall, the target audience for this tool), being always dizzy to some extent it might be useful to know what's going on when I'm not feeling inclined to add an entry of my own volition. Perhaps more can be gleaned from when I feel no or few symptoms, as when I feel many.

Initially, I think constructing the core, simplest state of things would be best - get something working quickly. As to what the core would be could be an excercise later for this document

# How would this be stored? Handled across devices?

Of course, it would be more useful if this tool was on me at all times. While to most this may suggest a phone, for me as a developer I frequently (if not more frequently than not) set my phone aside and focus strongly on a laptop screen. For this reason, the format chosen will likely be a desktop/web/[electron](http://electron.atom.io/) app (even more likely the latter two, as I'm a web developer).

I do, however, work across multiple devices, and it would be best if I could have a way of accessing the same data on different platforms. It would also be pretty sweet to eventually have the afore-dismissed phone application, so some kind of client-server architecture seems ideal. The form that this architecture takes should be shaped by a few things. Firstly, as highly personal data, it should be either not be sent across the wire or sent across the wire in a highly secure manner. Secondly, it should be consistent across devices; maintain a permenant history, and be difficult (if not impossible) to loose data from the system.

This basically writes out traditional server-client architecture. As previously mentioned, budget is a factor (I'd also like it to be usable by others, preferably non-technical people too) - so setting up a Digital Ocean server, installing a SSL Certificate and running an API to connect to wouldn't be ideal. 

This doesn't seem to leave much of an option, perhaps a robust sync system based around git-style merges could be developed? Some form of over-the-wire data-transfer looks like it will be required. If I was more technically savvy, I would suggest a direct peer-to-peer connection and some kind of distributed graph to track the data. As it is, it may be more useful to keep it simple and, rather than rely on the application itself dealing with these issues straight away, simply referring to a save-file which can be Dropboxed, BitTorrent Synced or just USB'd around between computers, and allow configuration and backup of save files. 

Having said this, although the data wouldn't be tied in to the client-server architecture, one would still exist - the main application would run in the background, headless, and the interface would be presented via an electron window, or a web browser. Perhaps the imagined phone application could store it's data locally until on the same network as an application, and simply send it's accrued data to the server as a series of timestamped additions? 

This may be the simplest way of handling the problem.

As to how we should store this, at first for simplicitys sake a flat file-system based approach may be preferable, with the possibility of a custom binary format down the line. I'd also like to take backups and at least have the option for export/import of human readable data. Where possible this would be executed in a pluggable way.

## What would/could be tracked

Although I have specific things I'd wish to track in mind I would like this to be usable by others too, as previously mentioned. Although I'll start simple with date/time, symptom + severity and mood, I'll add in food and drink and last time experienced, and ideas are already begining to form about allowing configuration of what the user could track, custom metrics of certain types, that could be collected and expanded upon by the user. This would come later, however. I'll make it work for me, first, and move on to others once I'd managed that.

## how would this collected data be displayed?

Various means. While it would be excellent if my skills with data were good enough that, given time and a brain, I could create an algorythm to analyse all data and deivse the best way to display it. As it is, I'm pretty rudimentary with data and hoping to learn as I get on with it. With this in mind, at first I'm thinking d3 style/d3 actual graphs of various and user-selectable form. Mainly focusing on the time-series data collected and how they pertain to events. For example, a graph displaying calories consumed over time vs. symptoms + severity over time may be useful for some people, for others amount of sleep vs. mood, or amount of excersize vs amount of calories. Who knows? We'll play with it. Ideally, however, it'd be sweet if you could build up 'views' on your data, which you could return to over time and see the change. Set up the aforementioned calories vs. severity of symptoms, save it, and watch it grow and increase in resolution over time.

## What would be built, and in what order?

I'm a man of limited time, and frankly limited effort. This would leave me to build this in little, simple parts leading to greater complexity and, indeed, usefulness later. While each of the separate pieces discussed here deserves and may eventually have it's own design document, I'll try and outline how I see this coming together.

Firstly, the tools used here would be node 4+, the previously mentioned electron, express, socket.io, react, probably redux and probably something like d3 (or react bindings to d3).

Where possible, I'd like to keep things modular and as functional as JS gets, so there's a good chance we'll throw in Ramda. I'd also like to stick to the principal "build lots of small things that work, and stick them together". I forget who said this, or what exactly they said, but the gist is there. If this ends up in multiple packages, cool. If it ends up in one package with lots of small files each doing one thing, also cool. couldn't mind which.

Ideally, I'd like to have some good tests. I say this every time, however, and it either falls by the wayside or kills the project. I know, I'm a terrible person, but I grew up in a world of sticking stuff together until it worked - it's lucky I value functional, expressive code as it is.

Now, onto answering the actual question.

I see the following, in the order given

* basic server to start the electron app (immediately at first)
* basic way of adding entries to a file
* redux reducer w/ an action for doing the above
* socket endpoint for accepting args and triggering above action
* design + build electron form for publishing to this endpoint
* basic, textual view on this data
* basic, graph-based view on this data.

We'll get this far and see how it goes. This is the stuff I'd like to have done for the first release. Any further than that, and I'll be more pleased than I've ever been. Well, maybe not, but hey. Let's get on with it.