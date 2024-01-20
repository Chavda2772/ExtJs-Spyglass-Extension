let labelEl = document.getElementById('lblExtVersion');

window.addEventListener("load", (event) => {
    // Get Current active tab execute code
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        // execute script to current tab
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: function () {
                let detailsEl = document.getElementById('spyglass-ext-details');

                if (detailsEl) {
                    let resString = detailsEl.innerHTML;
                    try {
                        return {
                            isSuccess: true,
                            ...JSON.parse(resString)
                        }
                    } catch (e) {
                        console.error(e);
                        return {
                            isSuccess: false,
                            message: e.message
                        };
                    }
                }

                return {
                    isSuccess: false,
                    message: 'Detail element not found !!!'
                };
            },
        }).then((response) => {
            let data = response[0].result;
            if (data.isSuccess) {
                let { isExtJs, extJsVersion } = data;
                let innerHtml = 'Site is not using ExtJS Framework';

                if (isExtJs) innerHtml = `Site is using ExtJS Version ${extJsVersion}`
                else console.error(data.message)

                labelEl.innerHTML = innerHtml;

                // Setting badge
                //chrome.action.setBadgeText({
                //    text: isExtJs ? 'On' : 'Off'
                //});

                // Setting background color
                //chrome.action.setBadgeBackgroundColor({
                //    color: isExtJs ? 'green' : 'red'
                //});
            }
        });
    });

});