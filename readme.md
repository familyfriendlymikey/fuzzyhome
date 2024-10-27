# Fuzzyhome

This is a Chrome extension that turns your new tab page into a fuzzy finding command palette.

I find that it is a significant productivity booster.

## Installation

Download on the Chrome [extension page](https://chrome.google.com/webstore/detail/fuzzyhome/lbnndgaohjkpbaekakcdfeiacagfcinf).

## Usage

Please see the [tutorial video](https://www.youtube.com/watch?v=Q1TB2W61QCg) for usage instructions.

## Contributing

Feel free to make a PR. Though I will only merge changes I agree with. If you
don't know Imba, consider learning it, it's extremely powerful.

## Development

1. Run:

	```
	npm run dev
	```

2. Go to

	```
	chrome://extensions/
	```

3. Click `Load unpacked`

4. Select the `chrome` folder

Then you're good to go. With the dev server running, any change you save will
be built, and all you need to do is refresh with `mod+r`.

## Publishing

This is just for me to remember 😛

1. Run

	```
	npm run build
	```

2. Upload the newly created `chrome.zip` to the Chrome store
