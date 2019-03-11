function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isTumblrImage(imageUrl)
{
    console.log('url', imageUrl);

    if (imageUrl && imageUrl.length > 0 && imageUrl.includes('.media.tumblr.com/')) {
        var pieces = imageUrl.split('_');
        var last = pieces[pieces.length - 1];
        var lastPieces = last.split('.');

        if (isNumeric(lastPieces[0])) {
            if (lastPieces[1] === 'jpg' || lastPieces[1] === 'jpeg' || lastPieces[1] === 'png') {
                lastPieces[0] = 1280;
                pieces[pieces.length - 1] = lastPieces.join('.');
                imageUrl = pieces.join('_');

                return imageUrl;
            }
        }
    }

    return false;
}

chrome.contextMenus.create({
    id: "tumblrImage",
    title: "Open Large Image",
    contexts: ["page", "image"]
});

chrome.contextMenus.onClicked.addListener(function(clickData, tab) {
    if (clickData.menuItemId == "tumblrImage"){
        var isValidImageTag = isTumblrImage(clickData.srcUrl);

        if (isValidImageTag) {
            chrome.tabs.create({
                url: isValidImageTag
            });
        } else {
             chrome.tabs.sendMessage(tab.id, "getClickedDivImageUrl", function(clickedDivImageUrl) {
                isValidImageTag = isTumblrImage(clickedDivImageUrl.value);

                if (isValidImageTag) {
                    chrome.tabs.create({
                        url: isValidImageTag
                    });
                }
            });
        }
    }
});
