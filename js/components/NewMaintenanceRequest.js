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

    render() {
        return `
             <div class="status">
                <div class="mg segment error">
                </div>
                <div class="mg segment success">
                </div>
            </div>
            <div class="field">
                <label>Photo</label>
                <div class="fields">
                    <div class="four-large four-medium six-small field">
                        <img src="../images/placeholder.png" class="mg image" id="product-photo-img"
                             style="width: 100%"/>
                    </div>
                    <div class="eight-large eight-medium six-small field">
                        <label for="product-photo">Choose Photo
                            <input type="file" size="10" id="product-photo" required
                                   accept="image/png, image/jpeg"/>
                            <input type="hidden" name="photo" id="product-photo-input">
                        </label>
                        <button class="mg danger button"
                                type="button" id="product-photo-remove">Remove
                        </button>
                    </div>
                </div>
            </div>
            <div class="field">
                <label>Product Name</label>
                <input type="text" name="product_name" id="new-request-product-name" required
                       placeholder="Product Name"/>
            </div>
            <div class="field">
                <label>Description</label>
                <textarea rows="10" name="description" required id="new-request-description"></textarea>
            </div>
            <div class="field">
                <div class="fields">
                    <div class="field">
                        <button class="mg button" id="cancel-request" type="reset">Clear</button>
                    </div>
                    <div class="field">
                        <button class="mg primary button" id="submit-request" type="button">Submit</button>
                    </div>
                </div>
            </div>
        `
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
            product_photo_img.setAttribute("src", '../images/placeholder.img');
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
                        that.success();
                    } else if (data.secure_url !== '') {
                        that.element.classList.remove("loading");

                        productPhoto.value = data.secure_url;

                        that.submit();
                    }
                });
        }
    }
}