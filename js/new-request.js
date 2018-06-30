function displayImageChosen(input) {

}

function removePhoto() {
    document.getElementById('product-photo').value = '';
    document.getElementById('product-photo-img').setAttribute('src', '../images/placeholder.png')
}

function clearRequestForm() {
    removePhoto();

    const productName = document.getElementById("new-request-product-name");
    productName.value = "";

    const productDescription = document.getElementById("new-request-description");
    productDescription.value = "";
}


function submitMaintenanceRequest() {
    const form = document.getElementById("new-request-form");
    form.classList.add("loading");
    const image = document.getElementById("product-photo");


    const formData = new FormData();
    formData.append("file", image.files[0]);
    formData.append("upload_preset", "axu7o5ip");

    fetch("https://api.cloudinary.com/v1_1/dldhztrbs/image/upload", {
        method: "POST",
        body: formData
    }).then(response => response.json())
        .then(data => {
            if (data.secure_url !== '') {
                form.classList.remove("loading");

                const productPhoto = document.getElementById("product-photo-input");
                productPhoto.value = data.secure_url;

                const formComponent = new Component({
                    id: "new-request-form",
                    method: "POST",
                    url: API_BASE_URL + "/users/requests",
                    headers: getAuthHeaders(),
                    success: function (data) {
                        console.log(data)
                        window.location.href = "request.html?id=" + data.data.request.id;
                    },
                    error: function () {
                    }
                });
                formComponent.submit();
            }
        });
}
