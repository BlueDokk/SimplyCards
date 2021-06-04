var cardsSection = {

    cardsContainer: document.getElementById('cards-container'),
    form: document.getElementById('contact-form'),
    myCardsSection: document.getElementById('my-cards'),
    btnAddCard: document.getElementById('add-card'),
    fields: [],
    expressions: {
        name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        lastname: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        phone: /^[0-9]{5,15}$/
    },
    contact: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        gender: "",
        image: "",
        id: ""
    },

    startCards(){

        this.readFields();
        this.btnAddCard.addEventListener('click', this.validateForm);

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

                this.fields[field] = true;

                if (Object.values(this.fields).includes(false)) {
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
                this.fields[field] = false;
            }
        }
    },

    validateFields(e) {

        switch (e.target.id) {
            case 'name':
                cardsSection.validateField(cardsSection.expressions.name, e.target, e.target.id);
                break;
            case 'lastname':
                cardsSection.validateField(cardsSection.expressions.lastname, e.target, e.target.id);
                break;
            case 'email':
                cardsSection.validateField(cardsSection.expressions.email, e.target, e.target.id);
                break;
            case 'phone':
                cardsSection.validateField(cardsSection.expressions.phone, e.target, e.target.id);
                break;
        }
    },

    validateForm() {

        let gender = document.contactForm.gender.value;

        if (Object.keys(cardsSection.fields).length == 4) {
            if (cardsSection.fields.name && cardsSection.fields.lastname && cardsSection.fields.email && cardsSection.fields.phone && gender) {
                cardsSection.getInputs();
                cardsSection.addCard();
                cardsSection.resetFields();
                cardsSection.addFunctionRemoveCard();
                cardsSection.myCardsSection.scrollIntoView();
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
    },

    readFields() {
        let inputs = document.querySelectorAll('.form__input');

        inputs.forEach(input => {
            input.addEventListener('keyup', this.validateFields);
            input.addEventListener('blur', this.validateFields);
        });
    },

    resetFields() {

        let formInputsGroup = document.querySelectorAll('.form__group-input');

        formInputsGroup.forEach((group) => {
            group.classList.remove('form__group-incorrect');
            group.classList.remove('form__group-correct');
        })

        this.form.reset();

    },

    getInputs() {
        this.contact.name = document.getElementById('name').value;
        this.contact.lastname = document.getElementById('lastname').value;
        this.contact.email = document.getElementById('email').value;
        this.contact.phone = document.getElementById('phone').value;
        this.contact.gender = document.contactForm.gender.value;
        this.contact.id = Math.floor(Math.random() * (10000 + 1));

        if (this.contact.gender === 'female') {
            this.contact.image = './images/icon-female.svg';
        } else {
            this.contact.image = './images/icon-male.svg';
        }


    },

    addCard() {
        this.cardsContainer.innerHTML += `<div id="${this.contact.id}" class="card grid grid--1x2" data-aos="zoom-in">
        <div class="card__image">
            <img src="${this.contact.image}" alt="Icon male">
        </div>
        <div class="card__body">
            <h3>${this.contact.name} ${this.contact.lastname}</h3>
            <p>Email:${this.contact.email}</p>
            <p>Phone: ${this.contact.phone}</p>
            <button value="${this.contact.id}" type="button" href="#" class="btn btn--large btn--accent">Remove card</button>
        </div>
    </div>`
    },

    addFunctionRemoveCard() {
        let btnRemove = document.querySelectorAll('.card .btn');
        btnRemove.forEach((buttonRemove) => {
            buttonRemove.addEventListener('click', (e) => {
                let idRemove = e.target.value;
                elementRemove = document.getElementById(`${Number(idRemove)}`);
                elementRemove.remove();
            })
        })
    }

}

var p = {

    btnToggler: document.querySelector('.navbar__toggler'),
    navbar: document.querySelector('.navbar'),
    btnUp: document.getElementById("btn-up"),

}

var m = {

    startApp: () => {
        m.collapseMenu(p.btnToggler, p.navbar);
        m.scroll();
        document.getElementById("btn-up").addEventListener("click", m.scrollUp);;

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
cardsSection.startCards();
window.onscroll = m.scroll;


