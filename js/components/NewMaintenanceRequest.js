import FormComponent from "./FormComponent.js";

export default class NewMaintenanceRequest extends FormComponent {

    constructor(id) {
        super(id, "POST", API_BASE_URL + "/users/requests", getAuthHeaders());
    }

    success() {
        let success = this.element.querySelector(".mg.segment.success");
        success.innerHTML = `
                    <ul>
                        <li>Maintenance Requested successfully <a href="request.html?id=${this.data.data.request.id}">View Request</a> </li>
                    </ul>`;
        super.success();
    }


    onRender() {
        let product_photo = this.element.querySelector("#product-photo");
        let product_photo_img = this.element.querySelector("#product-photo-img");
        let remove_photo = this.element.querySelector("#product-photo-remove");
        let submit_request = this.element.querySelector("#submit-request");
        const productPhoto = this.element.querySelector("#product-photo-input");

        product_photo.onchange = function () {
            let path = product_photo.files[0];
            if (path) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    product_photo_img.setAttribute("src", e.target.result);
                };

                reader.readAsDataURL(product_photo.files[0]);
            } else {
                product_photo_img.setAttribute("src", "../images/placeholder.png");
            }
        };

        remove_photo.onclick = function () {
            product_photo.value = '';
            product_photo_img.setAttribute("src", '../images/placeholder.png');
        };

        let that = this;
        submit_request.onclick = function () {
            that.element.classList.add("loading");

            const formData = new FormData();
            formData.append("file", product_photo.files[0]);
            formData.append("upload_preset", "axu7o5ip");

            fetch("https://api.cloudinary.com/v1_1/dldhztrbs/image/upload", {
                method: "POST",
                body: formData
            }).then(response => response.json())
                .then(data => {
                    if (data.error) {
                        that.data = {"status": "error", "message": ["Error uploading maintenance/request photo"]};
                        that.error();
                    } else if (data.secure_url !== '') {
                        that.element.classList.remove("loading");

                        productPhoto.value = data.secure_url;

                        that.submit();
                    }
                });
        }
    }
}