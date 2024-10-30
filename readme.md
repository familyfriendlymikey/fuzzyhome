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

2. Go to:

	```
	chrome://extensions/
	```

3. Click `Load unpacked`.

4. Select the `chrome` folder.

Then you're good to go. With the dev server running, any change you save will
be built, and all you need to do is refresh Chrome with `mod+r`.

## Publishing

This is just for me to remember 😛

1. Run:

	```
	npm run build
	```

2. Upload the newly created `chrome.zip` to the Chrome store.

### Notes

1. Sandboxed iframes for running eval had to be placed in the same folder as
	the manifest. I wish Chrome's docs had been clear about that.

2. We're loading the sandbox.html file due to a bundling quirk, if I put
	`/sandbox.html` that *should* refer to a file in the `/public/` folder which
	will be automatically bundled, but in this case `/sandbox.html` appears to
	actually refer to the folder that the chrome manifest is in, which is where we
	place the sandbox.html file. Anyways, it works fine.

3. For now, to use Imba's devlogs (`L`) feature, the production flag cannot be set.
	Meaning if you happen to build with `npm run build`, the logs won't show up.
	`npm run dev` specifies the `-d` flag for this purpose.
