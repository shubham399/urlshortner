function submitURL() {
    let location = window.location.origin;
    let result = document.getElementById("shortUrlInput");
    let copyButton = document.getElementById("copyButton");
    let error = document.getElementById("error");
    let url = document.getElementById("url").value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "url": url
    });
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch(location + "/url", requestOptions)
        .then(response => response.json())
        .then(r => {
            if (r.error) {
                result.hidden = true;
                error.hidden = false;
                error.innerHTML = r.message
            } else {
                let slug = r.slug
              result.hidden = false;
                error.hidden = false;
                result.value = `${location}/${slug}`
            }
        })
        .catch(error => console.log('error', error));
}


function copyLink() {
    /* Get the text field */
    let copyText = document.getElementById("link")
    const range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().addRange(range);
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
}
