/*!
 * TypeHelpers 1.1.0 (https://github.com/moisseev/TypeHelpers)
 * Copyright (c) 2018 Alexander Moisseev, Nov 24 2009 Zoltan Hawryluk, MIT
 */

/*
 * Works for
 *   - IE6+ (Windows),
 *   - Firefox 3.5 - 20.0.1, 51.0+ (Windows, Mac, Linux),
 *   - Safari 4+ (Windows, Mac OS X),
 *   - Chrome 3.0+ (Windows).
 * Opera 10.10 and under reports unknown support for font-smoothing.
 *
 *
 * METHODS
 * -------
 *
 * hasSmoothing() returns:
 *     true if font smoothing is enabled
 *     false if font smoothing isn't enabled
 *     null if it cannot detect if it's on or not.
 *
 * addClasses() adds the following classes to the html tag:
 *     "hasFontSmoothing-true" if font smoothing is enabled
 *     "hasFontSmoothing-false" if it isn't
 *     "hasFontSmoothing-unknown" if it cannot detect it.
 */

"use strict";

var TypeHelpers = {
    hasSmoothing: function hasSmoothing() {
        try {
            // Cannot detect font smoothing
            // since Firefox 21.0 - 50.1.0 always smooth canvas images (tested on Windows XP)
            var ff = (/Firefox\/(\d+\.\d+)/).exec(navigator.userAgent);
            if (ff && ff[1] >= 21 && ff[1] < 51) return null;

            // Create a 35x35 Canvas block.
            var canvasNode = document.createElement("canvas");
            canvasNode.width = "35";
            canvasNode.height = "35";

            // We must put this node into the body, otherwise
            // Safari Windows does not report correctly.
            canvasNode.style.display = "none";
            document.body.appendChild(canvasNode);
            var ctx = canvasNode.getContext("2d");

            // Draw a black letter "O", 32px Arial.
            ctx.textBaseline = "top";
            ctx.font = "32px Arial";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";

            ctx.fillText("O", 0, 0);

            // Start at (8,1) and search the canvas from left to right,
            // top to bottom to see if we can find a non-black pixel.
            // If so we return true.
            for (var j = 8; j <= 32; j++) {
                for (var i = 1; i <= 32; i++) {
                    var imageData = ctx.getImageData(i, j, 1, 1).data;
                    var alpha = imageData[3];
                    if (alpha !== 255 && alpha !== 0) {
                        return true;
                    }
                }
            }

            // Didn't find any non-black pixels - return false.
            return false;
        // Something went wrong (for example, Opera cannot use the canvas fillText() method).
        } catch (ex) {
            // Detect IE6-9 version.
            var ie = window.ActiveXObject ? Number(/msie\s(\d+)/i.exec(navigator.userAgent)[1]) : NaN;
            // Fall back to registry settings check (for IE6 - IE8).
            if (ie < 9 && typeof (screen.fontSmoothingEnabled) !== "undefined")
                return screen.fontSmoothingEnabled;
            // Cannot detect font smoothing.
            return null;
        }
    },
    insertClasses: function insertClasses() {
        var result = TypeHelpers.hasSmoothing();
        var htmlNode = document.getElementsByTagName("html")[0];
        if (htmlNode.className) {
            htmlNode.className += " ";
        }
        if (result === true) {
            htmlNode.className += "hasFontSmoothing-true";
        } else if (result === false) {
            htmlNode.className += "hasFontSmoothing-false";
        } else {
            htmlNode.className += "hasFontSmoothing-unknown";
        }
    }
};
