/**
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
