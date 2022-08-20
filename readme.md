<h1 align="center">
<a href="https://fuzzyho.me/">
fuzzyhome
</a>
</h1>

test

A lightweight new-tab page that lets you very quickly fuzzy find links and navigate to a result.

## Installation
1. Copy this link: `https://fuzzyho.me/`:
1. Change your homepage in your browser settings.
1. Install a browser extension that lets you change your new-tab page url. These have worked fine for me:
	- Firefox: [New Tab Override](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override)
	- Chrome: [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna)

	If the extension has an option for setting focus to the webpage instead of the address bar, be sure to enable it.

## Usage

### Create
Create a new link by typing a name and a url separated by a space.
For example:
```
imba home page https://imba.io/
```
The last space-separated string will be used as the url for your link.
In most cases if you do not specify a protocol, `https` will be used.

You can also use the hotkey `shift+return` to create a new link.

### Fuzzy Find
Search for a link by typing.
The fuzzy sorting algorithm makes searching very fast,
as you can usually just type the first letter of each word to get to a link (`ihp` to get to `imba home page`, for example).

### Navigate
Navigate to the currently selected search result by pressing `return`.
You can also click on a link to navigate to it.
You can also press the up or down arrow keys to move your selection up and down.

### Move Selection
You can move your selection up and down with the arrow keys.

### Search
If there are no matching links, a search will be performed with your query.

### Quick Search
If you paste while the input is empty, fuzzyhome will immediately make a search with your pasted query.

### Bangs
You can easily append queries to arbitrary links, and as such use them in a similar manner as the "bang" feature from some search engines.
Just get the query link for a website and create a link with that url. For example:
```
y https://www.youtube.com/results?search_query=
```
This will create a link named `y`.
Now all you have to do is press `tab` when the `y` link is selected.
In practice you'll just type `y<tab>`.
This will allow you to start typing a query which will be appended onto the url of that link.
To navigate to the link, just press `return` or click the link.
To cancel, just press `tab` again.

### Delete
You can delete notes by clicking the purple `x` on the currently selected link.
You can also use the hotkey `shift+backspace` to delete the currently selected link.

### Customize Search Engine
The default search engine is Google Search, however you can customize it by clicking the three dots to go to settings,
clicking `config`, and pasting in your search engine url, such as `https://search.brave.com/search?q=`.
Your search query simply gets encoded and pasted to the end of your configured search engine url.

### Importing / Exporting Links
If you want to export your links to use them on another computer, go to the settings menu and click `EXPORT`.
This downloads a `.json` file, which you can then send to your other computer and import by clicking the `IMPORT` button
and selecting your file.

### Reset Everything To Default
Not sure why anyone except me would do this, but if for some reason you want to delete everything and restore the default config,
you can do so by bringing up your developer console and running the function `_fuzzyhome_delete_everything()`,
and confirming that you do indeed want to delete all your links on the prompt that pops up.

## Hotkeys
Hotkey | Action
-|-
Return | Navigate to the currently selected link, or perform a search if there are no matching links.
Up Arrow | Move selection up.
Down Arrow | Move selection down.
Paste | If input is empty, immediately search with pasted query.
Shift + Return | Create new link.
Shift + Backspace | Delete currently selected link.

## FAQ

### The Link I Want Is Showing Up Last
TLDR either rename the desired link to something shorter or the undesired link to something longer.

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

### A Link Is Blocking My Search
This happens very rarely if at all. Just throw some spaces at the end of your query.

### The Quick Search Function Is Stopping Me From Finishing My Query
Just type a single space before you paste in text.

### My Localhost Link Isn't Working
If you want to make a link that points to `localhost`, you likely need to specify the `http` protocol when creating your link.
