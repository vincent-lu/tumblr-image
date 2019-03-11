var _divImageUrl = null;

document.addEventListener('mousedown', function(event) {
    if (event.button === 2 && event.target.style && event.target.style.backgroundImage && event.target.style.backgroundImage.length > 0) {
        var pieces = event.target.style.backgroundImage.split('"');

        if (pieces.length === 3) {
            _divImageUrl = pieces[1];
        } else {
            _divImageUrl = null;
        }
    }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request === "getClickedDivImageUrl") {
        sendResponse({value: _divImageUrl});
    }
});
