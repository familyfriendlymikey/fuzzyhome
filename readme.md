# fuzzyhome

A new-tab page [hosted](https://bread.quest/fuzzyhome/) on github pages
that lets you fuzzy find links and quickly navigate to the top result.

## Installation
On Firefox, unfortunately you can't choose a custom new-tab page,
so I opted to use [this addon](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override)
and chose `https://bread.quest/fuzzyhome/` as the custom url.

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
