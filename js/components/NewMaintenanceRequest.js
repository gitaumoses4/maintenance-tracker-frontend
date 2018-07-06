import FormComponent from "./FormComponent.js";

export default class NewMaintenanceRequest extends FormComponent {

    constructor(id, edit = false) {
        super(id, edit ? "PUT" : "POST", API_BASE_URL + "/users/requests" + (edit ? "/" + getQueryParameter("id") : ""), getAuthHeaders());
        this.edit = edit && getQueryParameter("id");
        if (this.edit) {
            this.loadRequest();
        }
    }


    onDOMLoaded() {
        super.onDOMLoaded();
    }

    loadRequest() {
        this.loading();
        let that = this;
        fetch(this.link, {
            method: "GET",
            headers: this.headers
        }).then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    that.notLoading();
                    let form = that.element;
                    let request = data.data.request;
                    form.querySelector("#product-photo-img").setAttribute("src", request.photo);
                    form.querySelector("#new-request-product-name").value = request.product_name;
                    form.querySelector("#new-request-description").value = request.description
                    if (request.status.toLowerCase() !== "pending") {
                        that.data = {"message": ["A maintenance/repair request can only be edited if it's awaiting approval"]};
                        form.classList.add("disabled");
                        that.error();
                    }
                }
            });
    }

    success() {
        let success = this.element.querySelector(".mg.segment.success");
        success.innerHTML = `
                    <ul>
                        <li>Maintenance request ${ this.edit ? "edited" : "created" } successfully <a href="request.html?id=${this.data.data.request.id}">View Request</a> </li>
                    </ul>`;
        super.success();
    }


    onRender() {
        let product_photo = this.element.querySelector("#product-photo");
        let product_photo_img = this.element.querySelector("#product-photo-img");
        let remove_photo = this.element.querySelector("#product-photo-remove");
        let submit_request = this.element.querySelector("#submit-request");
        const productPhoto = this.element.querySelector("#product-photo-input");

        let that = this;
        this.product_photo_changed = false;
        product_photo.onchange = function () {
            that.product_photo_changed = true;
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

        submit_request.onclick = function () {
            if (that.product_photo_changed) {
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
            } else {
                productPhoto.value = product_photo_img.getAttribute("src");
                that.submit();
            }
        }
    }
}