console.log("App Loaded");

function submitURL() {
    let location = window.location.origin;
    console.log("Submitting form from", location);
    let result = document.getElementById("result");
    let error = document.getElementById("error");
    let url = document.getElementById("url").value;
    console.log(url);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "url": url
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    fetch(location + "/url", requestOptions)
        .then(response => response.json())
        .then(r => {
          if(r.error){
          result.hidden = true;
          error.hidden = false;
          error.innerHTML = r.message
          }
          else{
          let slug = r.slug
          let link = `<a href="${slug}">${location}/${slug}</a>`
          // console.log(link);
          error.hidden = true;
          result.hidden = false;
          result.innerHTML = link
        }
        })
        .catch(error => console.log('error', error));
}
