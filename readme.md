# fuzzyhome

A new-tab page [hosted](https://fuzzyho.me/) on github pages
that lets you fuzzy find links and quickly navigate to the top result.

## Installation
On Firefox, unfortunately you can't choose a custom new-tab page,
so I opted to use [this addon](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override)
and choose `https://fuzzyho.me/` as the custom url.

## Usage

### Create
Create a new link by typing a name and a url separated by a space.
For example:
```
imba home page https://imba.io/
```
The last space-separated string will be used as the url for your link.

### Search
Search your links by focusing the search bar and typing.
The fuzzy sorting algorithm makes searching very fast,
as you can usually just type the first letter of each word to get to a link (`ihp` to get to `imba home page`, for example).

### Navigate
Navigate to the topmost search result by pretting `return`.

### Hotkeys
Hotkey | Action
-|-
Return | Navigate to the topmost link, if any.
Shift + Return | Perform a Google search with search bar text.
CMD + K | Focus search bar.
Esc | Blur search bar.

## FAQ

### Why Don't You Use A "Smarter" Algorithm Based On Frecency?
Having one result ranked highest when you expect
another can be really frustrating,
namely because you have to pay attention to the results
instead of just typing the same thing to get the same result
every single time and pressing enter without thinking about it.

What's the solution then? Just rename your links accordingly.
This way, it's **your** choice.

For example, I have one link named `mpv` which I've accessed `7` times,
and one link named `messenger` which I've accessed `106` times.
Under conventional wisdom, typing the query `m` should show
`messenger` at the top of the results because I access it way more
often, so it's probably what I want, right?

No. Instead, I should just rename `mpv` to something else,
such as `_mpv`. Now, typing `m` results in `messenger` showing up first,
and typing `mp` results in `mpv` showing up first.
This is what will happen **every single time**.
It doesn't matter what time of day it is,
how many times I accessed some other link recently,
or any other variable;
I type `m`, press enter, and that's it.
