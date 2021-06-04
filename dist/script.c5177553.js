// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"L4bL":[function(require,module,exports) {
var p = {
  btnToggler: document.querySelector('.navbar__toggler'),
  navbar: document.querySelector('.navbar'),
  btnUp: document.getElementById("btn-up"),
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
  }
};
var m = {
  startApp: function startApp() {
    m.collapseMenu(p.btnToggler, p.navbar);
    m.scroll();
    m.readFields();
    document.getElementById("btn-up").addEventListener("click", m.scrollUp);
    p.btnAddCard.addEventListener('click', m.validateForm);
  },
  collapseMenu: function collapseMenu(element, target) {
    element.addEventListener("click", function () {
      target.classList.toggle("collapsible--expanded");
    });
  },
  scrollUp: function scrollUp() {
    var currentScroll = document.documentElement.scrollTop;

    if (currentScroll > 0) {
      window.requestAnimationFrame(m.scrollUp);
      window.scrollTo(0, currentScroll - currentScroll / 10);
    }
  },
  scroll: function scroll() {
    var scroll = document.documentElement.scrollTop;

    if (p.btnUp != null) {
      if (scroll > 100) {
        p.btnUp.style.transform = 'scale(1)';
      } else if (scroll < 100) {
        p.btnUp.style.transform = 'scale(0)';
      }
    }
  },
  validateField: function validateField(expresion, input, field) {
    var formGroup = document.getElementById("group__".concat(field));
    var formIcon = document.querySelector("#group__".concat(field, " i"));
    var formMessage = document.querySelector("#error-".concat(field, " p"));
    var errorMessage = document.getElementById('error-message');

    if (formGroup !== null && formIcon !== null && formMessage !== null && errorMessage !== null) {
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
  validateFields: function validateFields(e) {
    switch (e.target.id) {
      case 'name':
        m.validateField(p.expressions.name, e.target, e.target.id);
        break;

      case 'lastname':
        m.validateField(p.expressions.lastname, e.target, e.target.id);
        break;

      case 'email':
        m.validateField(p.expressions.email, e.target, e.target.id);
        break;

      case 'phone':
        m.validateField(p.expressions.phone, e.target, e.target.id);
        break;
    }
  },
  validateForm: function validateForm() {
    var gender = document.contactForm.gender.value;

    if (Object.keys(p.fields).length == 4) {
      if (p.fields.name && p.fields.lastname && p.fields.email && p.fields.phone && gender) {
        m.getInputs();
        m.addCard();
        m.resetFields();
        m.addFunctionRemoveCard();
        p.myCardsSection.scrollIntoView();
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
  readFields: function readFields() {
    var inputs = document.querySelectorAll('.form__input');
    inputs.forEach(function (input) {
      input.addEventListener('keyup', m.validateFields);
      input.addEventListener('blur', m.validateFields);
    });
  },
  resetFields: function resetFields() {
    var formInputsGroup = document.querySelectorAll('.form__group-input');
    formInputsGroup.forEach(function (group) {
      group.classList.remove('form__group-incorrect');
      group.classList.remove('form__group-correct');
    });
    p.form.reset();
  },
  getInputs: function getInputs() {
    contact.name = document.getElementById('name').value;
    contact.lastname = document.getElementById('lastname').value;
    contact.email = document.getElementById('email').value;
    contact.phone = document.getElementById('phone').value;
    contact.gender = document.contactForm.gender.value;
    contact.id = Math.floor(Math.random() * (10000 + 1));

    if (contact.gender === 'female') {
      contact.image = './images/icon-female.svg';
    } else {
      contact.image = './images/icon-male.svg';
    }
  },
  addCard: function addCard() {
    p.cardsContainer.innerHTML += "<div id=\"".concat(contact.id, "\" class=\"card grid grid--1x2\" data-aos=\"zoom-in\">\n        <div class=\"card__image\">\n            <img src=\"").concat(contact.image, "\" alt=\"Icon male\">\n        </div>\n        <div class=\"card__body\">\n            <h3>").concat(contact.name, " ").concat(contact.lastname, "</h3>\n            <p>Email:").concat(contact.email, "</p>\n            <p>Phone: ").concat(contact.phone, "</p>\n            <button value=\"").concat(contact.id, "\" type=\"button\" href=\"#\" class=\"btn btn--large btn--accent\">Remove card</button>\n        </div>\n    </div>");
  },
  addFunctionRemoveCard: function addFunctionRemoveCard() {
    var btnRemove = document.querySelectorAll('.card .btn');
    btnRemove.forEach(function (buttonRemove) {
      buttonRemove.addEventListener('click', function (e) {
        var idRemove = e.target.value;
        elementRemove = document.getElementById("".concat(Number(idRemove)));
        elementRemove.remove();
      });
    });
  }
};
var contact = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  gender: "",
  image: "",
  id: ""
};
m.startApp();
window.onscroll = m.scroll;
},{}]},{},["L4bL"], null)
//# sourceMappingURL=/script.c5177553.js.map