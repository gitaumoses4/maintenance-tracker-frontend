function displayImageChosen(input) {
    let path = input.files[0];
    let img = document.getElementById("product-photo-img");

    if (path) {
        const reader = new FileReader();

        reader.onload = function (e) {
            img.setAttribute("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        img.setAttribute("src", "../images/placeholder.png");
    }
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