<h1 align="center">
<a href="https://fuzzyho.me/">
fuzzyhome
</a>
</h1>

A lightweight new-tab page that lets you very quickly fuzzy find links and navigate to a result.

## Installation
1. Copy this link: `https://fuzzyho.me/`:
1. Change your homepage in your browser settings.
1. Install a browser extension that lets you change your new-tab page url. These have worked fine for me:
	- Firefox: [New Tab Override](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override)
	- Chrome: [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna)

## Usage

### Create
Create a new link by typing a name and a url separated by a space.
For example:
```
imba home page https://imba.io/
```
The last space-separated string will be used as the url for your link.

### Fuzzy Find
Search for a link by typing.
The fuzzy sorting algorithm makes searching very fast,
as you can usually just type the first letter of each word to get to a link (`ihp` to get to `imba home page`, for example).

### Navigate
Navigate to the currently selected search result by pressing `return`.
You can also click on a link to navigate to it.
You can also press the up or down arrow keys to move your selection up and down.

### Search
If there are no matching links, a search will be performed with your query.
The default search engine is Google Search, however you can customize it by clicking the three dots to go to settings,
clicking `config`, and pasting in your search engine url, such as `https://search.brave.com/search?q=`.
Your search query simply gets encoded and pasted to the end of your configured search engine url.

### Quick Search
If you paste while the input is empty, fuzzyhome will immediately make a search with your pasted query.

### Hotkeys
Hotkey | Action
-|-
Return | Navigate to the currently selected link, or perform a search if there are no matching links.
Up Arrow | Move selection up.
Down Arrow | Move selection down.
Paste | If input is empty, immediately search with pasted query.

### Tips
Fuzzyhome doesn't use an algorithm that attempts to be intelligent about which links it ranks first because
having a more predictable behavior lets you work faster since you know it will do the same thing every single time.

The search results are first filtered on character order.
If the characters of a given link name are not in the same order as the query, that link will be excluded from the results.
So if I have a link named `messenger` and I type `mgs`,
`messenger` will be excluded from the results because the `g` does not come before the `s`.

The fuzzy search [algorithm](https://github.com/jhawthorn/fzy/blob/master/ALGORITHM.md)
prioritizes shorter strings and strings whose words begin with the letters of the query.

With those factors in mind, if you encounter a situation where a certain link you access less often is showing up in search results on top of
a link you access much more often, such as `mpv` showing up on top of a desired link `messenger`,
either lengthen `mpv`'s name to something like `_mpv`, or shorten `messenger`'s name to something like `m`.

With either of these solutions, typing `m` will always result in the desired link showing up first.
That will be the behavior every single time, regardless of which link you accessed more recently,
what time of day it is, or some other random variable.
