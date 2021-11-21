# Blog cross-posting tool

This is a little CLI I've developed to help me post my articles on multiple platforms.

The features it has at the moment are to:
- replace text
- convert root-relative URLs to absolute URLs

The tool allows you to generate different versions of an article, while running processing on it to replace text and root-relative URLs from the original version.

One example of why you'd want to do this is to cross-post your article on multiple platforms. Different platforms require different syntax for certain things, such as video embeds. Instead of manually creating different versions, this tool can generate them for you. To do so, it takes input from a "map.json" file where you specify which text should be different and such.

This is especially useful if you want to update your article. Using this tool, you only have to update the original version. Then you can use the tool to generate the versions for the other platforms. Without it, you'd have to manually update multiple versions of your article for different platforms, which would be slow and error-prone.


## Getting started

- NPM

Installation requires [NPM](https://www.npmjs.com/) which is included with [Node](https://nodejs.org/). You can install Node by downloading the installer from the website.

To update NPM to the latest version:

```
npm install -g npm@latest
```


### Installation

1. Clone the repo

```
git clone https://github.com/sargalias/blog-cross-posting-tool.git
```

2. Install NPM packages

```
npm install
```


## Usage

Open a terminal and go to the project directory.

Here are the commands to type:

- Run tests: `npm run test`
- Help command: `npm run start -- --help`
- Create new mock mapper: `npm run start new-mapper`
- Transform command: `npm run start transform <source> [destination] --transformers platform1 [--mapper=mapper.json]`

