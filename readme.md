<h1 align="center">
<a href="https://fuzzyho.me/">
fuzzyhome
</a>
</h1>

A power user oriented new-tab page that enables lightning speed navigation through the dark magic of fuzzy finding.

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

### Search
If there are no matching links, a search will be performed with your query.

### Bangs
There may be some websites you've created links for, such as amazon, where you almost always search for something.
This means you have to go to that website, click the search bar, and type in your query.
With fuzzyhome you can cut out the slow parts by prefixing your link name with `!` to create a "bank link":
```
!amazon amazon.com/s?k=
```
Notice the `/s?k=` at the end,
you'll likewise have to find the proper URL for your new bang link.
Typing instructions for that would be too verbose, so please see the video tutorial (coming soon).

When you click on or press return on a selected bang link,
instead of navigating directly to that link,
you'll be able to enter a search query for that link.
Pressing enter again will bring you to the link with your encoded search query appended to it.

**LIST OF BANGS FOR YOUR CONVENIENCE BELOW**

### Effective Names
After using fuzzyhome enough, you may come to realize
that there are some links you'd prefer be "hardcoded"
with certain names so to speak.
For example, perhaps you visit `instagram` extremely often
but also have a link named `indeed` which gets sorted above
`instagram` when you type `in` even though you visit it much less often.
You could change the `instagram` link's name to `in`,
but now it looks bad.
To solve this, fuzzyhome allows you to add an "effective name"
to a link:
```
instagram `in instagram.com
```
To add an effective name to a link,
simply add the name prefixed with a backtick right before the URL.

This also works for bang links.
Let's say we wanted `a` to correspond to `!amazon`:
```
!amazon `a amazon.com/s?k=
```
Now when you type `in` or `a`,
you can have confidence that your
intended link will be given priority every time.

Mind you, typing `am` will no longer show `amazon` in the results,
because that's just the display name for the link.
The actual name is `a`.
This might seem confusing but once you
get the hang of it won't matter to you at all.

### Delete
You can delete notes by clicking the purple `x` on the currently selected link.
You can also use the hotkey `shift+backspace` to delete the currently selected link.

### Edit
You can edit notes by clicking the edit icon.

### Move Selection
You can move your selection up and down with the arrow keys.

### Quick Search
If you paste while the input is empty, fuzzyhome will immediately make a search with your pasted query.

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
Change the effective name of the link.
Let's say you've been typing `in` for `instagram`, but recently added `indeed` as a link,
and `indeed` keeps showing up first.
Simply change the effective name of the `instagram` link to `in`:
```
instagram `in instagram.com
```

### A Link Is Blocking My Search
This happens very rarely if at all. Just throw some spaces at the end of your query.

### The Quick Search Function Is Stopping Me From Finishing My Query
Just type a single space before you paste in text.

### My Localhost Link Isn't Working
If you want to make a link that points to `localhost`, you likely need to specify the `http` protocol when creating your link.

## Bang List
Website | Bang Text
-|-
youtube | !youtube ~y https://www.youtube.com/results?search_query=
amazon | !amazon amazon.com/s?k=
google site:reddit.com | !google reddit https://www.google.com/search?q=site%3Areddit.com%20
google site:reddit.com | !google stackoverflow https://www.google.com/search?q=site%3Astackoverflow.com%20
