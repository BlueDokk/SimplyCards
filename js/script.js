var p = {

    btnToggler: document.querySelector('.navbar__toggler'),
    navbar: document.querySelector('.navbar'),
    btnUp: document.getElementById("btn-up")

}

var m = {

    startApp: () => {
        m.collapseMenu(p.btnToggler, p.navbar);
        m.scroll();
    },

    collapseMenu: (element, target) => {
        element.addEventListener("click", () => {
            target.classList.toggle("collapsible--expanded");
        })
    },

    scrollUp: () => {
        var currentScroll = document.documentElement.scrollTop;

        if (currentScroll > 0) {
            window.requestAnimationFrame(m.scrollUp);
            window.scrollTo(0, currentScroll - (currentScroll / 10));
        }
    },
    scroll: () => {
        var scroll = document.documentElement.scrollTop;
        if (p.btnUp != null) {
            if (scroll > 100) {
                p.btnUp.style.transform = 'scale(1)';
            } else if (scroll < 100) {
                p.btnUp.style.transform = 'scale(0)';
            }
        }
    }
}

m.startApp();
window.onscroll = m.scroll;

document.getElementById("btn-up").addEventListener("click", m.scrollUp);