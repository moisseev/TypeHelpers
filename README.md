# TypeHelpers
A JavaScript routine that can detect whether you have a font-smoothing technology activated on your browser.

Live demos are available at:
* JavaScript - http://moisseev.github.io/TypeHelpers/
* CSS - http://moisseev.github.io/TypeHelpers/cssExample.html

## Compatible browsers

* Internet Explorer `6+` (Windows XP+),
* Firefox `3.5` - `20.0.1`, `51.0+` (Windows XP+, Mac, Linux),
* Safari `4.0.3+` (Windows XP+, Mac OS X),
* Chrome `3.0+` (Windows XP+).

This script cannot detect font-smoothing in:
* Firefox versions `21.0` - `50.1.0`, since they are always smoothing images on canvas regardless of anti-aliasing settings;
* any version of Opera, since it cannot write text inside the canvas element in a way we can poll the pixels afterwards.

## Installing

You can download files or load files directly using [RawGit](https://rawgit.com/).

For production usage link a specific tag or commit. For example:
```html
<script src="//cdn.rawgit.com/moisseev/TypeHelpers/1.1.0/TypeHelpers.min.js"></script>
```
For development you can also use links to the latest version. Do not use these links in production, excessive traffic will be throttled and blacklisted by RawGit. For example:
```html
<script src="//cdn.rawgit.com/moisseev/TypeHelpers/master/TypeHelpers.js"></script>
```

## Methods

* `hasSmoothing()` returns:
  * **true** if font smoothing is being used;
  * **false** if it is not;
  * **null** if it cannot be detected if font smoothing is on or not.

* `addClasses()` adds the following classes to the `<html>` tag:
  * **hasFontSmoothing-true** if font smoothing is being used;
  * **hasFontSmoothing-false** if it is not;
  * **hasFontSmoothing-unknown** if it cannot be detected if font smoothing is on or not.

## See also

[The price of smooth looks: Anti-aliased fonts hurt eyes and damage eyesight](http://annystudio.com/misc/anti-aliased-fonts-hurt/)

[How to Detect Font-Smoothing Using JavaScript](http://www.useragentman.com/blog/2009/11/29/how-to-detect-font-smoothing-using-javascript/)
