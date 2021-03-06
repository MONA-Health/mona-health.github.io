async function loadFile() {
	console.log("image is in loadfile..");
  	var fileInputElement = document.getElementById("select-file-image");
  	console.log(fileInputElement.files[0]);
    renderImage(fileInputElement.files[0]);
    showPredBtn();
}

function renderImage(file) {
  var reader = new FileReader();
  console.log("image is here..");
  reader.onload = function(event) {
    img_url = event.target.result;
    console.log("image is here2..");
    document.getElementById("test-image").src = img_url;
  }
  reader.readAsDataURL(file);
}

function showPredBtn() {
    document.getElementById("predBtn").style.display = "inline";
}

function predBtn() {
    let image  = document.getElementById("test-image");
    console.log('xxxx')
    console.log(image)

    let _data = {
        input: [image.src]
    }
    
    postData(_data).then(data => document.getElementById("prediction").innerHTML = "Prediction: " + data['prediction'].toString() + "</b>")

//     fetch('https://doynj7ndmjy4ibntttu3zuhcji.apigateway.eu-frankfurt-1.oci.customer-oci.com/demo/pred', {
//             method: "POST",
//             body: JSON.stringify(_data),
//             headers: {"Content-type": "application/json"}
//         })
//         .then(response => response.json())  // convert to json
//         .then(json => console.log(json))    //print data to console
//         .catch(err => console.log('Request Failed', err)); // Catch errors
}

async function postData(data = {}) {
    // Default options are marked with *
    const response = await fetch('https://doynj7ndmjy4ibntttu3zuhcji.apigateway.eu-frankfurt-1.oci.customer-oci.com/demo/pred', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },      
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json();
    // console.log(jsonResp)
    // document.getElementById("prediction").innerHTML = "Prediction: " + jsonResp['prediction'].toString() + "</b>";
}