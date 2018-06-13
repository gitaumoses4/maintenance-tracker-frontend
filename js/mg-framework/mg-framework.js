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
}/**
 *  @author Moses Gitau
 *
 *  -----------------
 *  Modal
 *  -----------------
 *
 *  Listen for trigger events and display modal appropriately
 */

let modals = document.getElementsByClassName("mg modal");

for (let i = 0; i < modals.length; i++) {
    let modal = modals[i];
    let triggerId = modal.dataset.trigger;
    let modalBody = modal.getElementsByClassName("body")[0];

    let trigger = document.getElementById(triggerId);
    if (trigger) {
        trigger.addEventListener("click", function () {
            showModal(modal, modalBody);
        })
    }
    // document.body.appendChild(modal);

    let close = modal.getElementsByClassName("close")[0];
    close.addEventListener("click", function () {
        hideModal(modal, modalBody);
    });

    let buttons = modal.getElementsByTagName("button");
    for (let j = 0; j < buttons.length; j++) {
        buttons[j].addEventListener("click", function () {
            hideModal(modal, modalBody);
        })
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            hideModal(modal, modalBody)
        }
    }
}

function hideModal(modal, modalBody) {
    modal.style.backgroundColor = "rgba(0,0,0,0)";
    modalBody.style.transform = "translate(-50%, -100px)";
    document.body.style.overflow = "auto";
    modalBody.style.opacity = "0";
    window.setTimeout(function () {
        modal.style.display = "none";
    }, 300);
}

function showModal(modal, modalBody) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    window.setTimeout(function () {
        modal.style.backgroundColor = "rgba(0,0,0,.9)";
        modalBody.style.transform = "translate(-50%, -50%)";
        modalBody.style.opacity = "1";
    }, 100);
}
/**
 * @author Moses Gitau
 *
 * Control structure for the navigation components
 *  1. Sidebar
 *  2. Navbar
 *
 *  To ensure responsiveness for mobile devices
 */

let sidebar = document.getElementsByClassName("mg sidebar")[0];

let triggerId = sidebar.dataset.trigger;

let trigger = document.getElementById(triggerId);
if (trigger) {
    trigger.addEventListener("click", function () {
        toggleSideBar()
    });

    document.addEventListener("click", function (event) {
        if (event.target == sidebar) {
            sidebar.classList.remove("hidden");
            document.body.style.overflow = "auto";
        }
    });

    let menuItems = sidebar.getElementsByClassName("item");
    for (let j = 0; j < menuItems.length; j++) {
        menuItems[j].addEventListener("click", function () {
            sidebar.classList.remove("hidden");
        });
    }
}


function toggleSideBar() {
    sidebar.classList.toggle("hidden");
    if (sidebar.classList.contains("hidden") && document.documentElement.clientWidth <= 767) {
        document.body.style.overflow = "hidden";
    }
}

