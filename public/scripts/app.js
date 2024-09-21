function submitURL() {
    let location = window.location.origin;
    let result = document.getElementById("shortUrlInput");
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
            } else {
                let slug = r.slug
                result.hidden = false;
                result.value = `${location}/${slug}`
            }
        })
        .catch(error => console.log('error', error));
}


function copyLink() {
    /* Get the input field */
    let copyText = document.getElementById("shortUrlInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    /* Optionally, show feedback to the user */
    let copyButton = document.getElementById("copyButton");
    copyButton.innerHTML = "Copied!";
}

