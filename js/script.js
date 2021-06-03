var p = {

    btnToggler: document.querySelector('.navbar__toggler'),
    navbar: document.querySelector('.navbar'),
    btnUp: document.getElementById("btn-up"),
    fields: [],

    expressions: {
        name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        lastname: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        phone: /^[0-9]{5,15}$/
    }
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
    },



    validateField(expresion, input, field) {

        let formGroup = document.getElementById(`group__${field}`);
        let formIcon = document.querySelector(`#group__${field} i`);
        let formMessage = document.querySelector(`#error-${field} p`);
        let errorMessage = document.getElementById('error-message');

        if ((formGroup !== null) && (formIcon !== null) && (formMessage !== null) && (errorMessage !== null)) {

            if (expresion.test(input.value)) {

                formGroup.classList.remove('form__group-incorrect');
                formGroup.classList.add('form__group-correct');
                formIcon.classList.remove('fa-times-circle');
                formIcon.classList.add('fa-check-circle');
                formMessage.classList.remove('form__input-error-active');

                p.fields[field] = true;

                if (Object.values(p.fields).includes(false)) {
                    errorMessage.style.display = 'block';
                } else {
                    errorMessage.style.display = 'none';
                }
            } else {
                formGroup.classList.add('form__group-incorrect');
                formGroup.classList.remove('form__group-correct');
                formIcon.classList.add('fa-times-circle');
                formIcon.classList.remove('fa-check-circle');
                formMessage.classList.add('form__input-error-active');
                errorMessage.style.display = 'block';
                p.fields[field] = false;
            }
        }
    },

    validateFields(e) {

        switch (e.target.id) {
            case 'name':
                m.validateField(p.expressions.name, e.target, 'name');
                break;
            case 'lastname':
                m.validateField(p.expressions.lastname, e.target, 'lastname');
                break;
            case 'email':
                m.validateField(p.expressions.email, e.target, 'email');
                break;
            case 'phone':
                m.validateField(p.expressions.phone, e.target, 'phone');
                break;
        }
    },

    validateForm() {


        if (Object.keys(p.fields).length == 4) {
            if ((p.fields.name && p.fields.lastname) && p.fields.email && p.fields.phone) {
                setTimeout(() => { window.location.reload(); }, 1000)
                // window.scrollTo(0, 0);
                alert("Card added successfully");
                return true;
            } else {
                alert("The card could not be added");
                return false;
            }
        } else {
            alert("The card could not be added");
            return false;
        }
    }




}

m.startApp();
window.onscroll = m.scroll;

document.getElementById("btn-up").addEventListener("click", m.scrollUp);

var inputs = document.querySelectorAll('.form__input');

inputs.forEach(input => {
    input.addEventListener('keyup', m.validateFields);
    input.addEventListener('blur', m.validateFields);
});