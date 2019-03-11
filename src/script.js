function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

chrome.contextMenus.create({
    id: "tumblrImage",
    title: "Open Large Image",
    contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId == "tumblrImage"){
        var imageUrl = clickData.srcUrl;

        if (imageUrl.includes('.media.tumblr.com/')) {
            var pieces = imageUrl.split('_');
            var last = pieces[pieces.length - 1];
            var lastPieces = last.split('.');

            if (isNumeric(lastPieces[0])) {
                if (lastPieces[1] === 'jpg' || lastPieces[1] === 'jpeg' || lastPieces[1] === 'png') {
                    lastPieces[0] = 1280;
                    pieces[pieces.length - 1] = lastPieces.join('.');
                    imageUrl = pieces.join('_');

                    chrome.tabs.create({
                        url: imageUrl
                    });
                }
            }
        }
    }
});
