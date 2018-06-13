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

