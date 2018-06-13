/**
 * @author Moses Gitau
 *
 * --------------------
 * Dropdown
 * --------------------
 *
 * Javascript implementation for the dropdown component
 *
 *
 */

let dropdowns = document.getElementsByClassName("mg dropdown");

for (let i = 0; i < dropdowns.length; i++) {
    let dropdown = dropdowns[i];
    let trigger, menu;
    for (let j = 0; j < dropdown.childNodes.length; j++) {
        let child = dropdown.childNodes[j];
        if (child.className === "trigger") {
            trigger = child;
        } else if (child.className === "menu") {
            menu = child;
        }
    }
    if (trigger && menu) {
        trigger.addEventListener("click", function () {
            if (menu.style.maxHeight) {
                menu.style.maxHeight = null;
            } else {
                menu.style.maxHeight = menu.scrollHeight + "px";
            }
            menu.classList.toggle("visible");
        });

        document.addEventListener("click", function (event) {
            if (!event.target.closest(".mg.dropdown")) {
                menu.style.maxHeight = null;
                menu.classList.remove("visible");
            }
        });
        for (let k = 0; k < menu.childNodes.length; k++) {
            let item = menu.childNodes[k];
            item.addEventListener("click", function () {
                menu.style.maxHeight = null;
                menu.classList.remove("visible");
            });
        }
    }
}