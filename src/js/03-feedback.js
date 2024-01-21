import throttle from 'lodash.throttle';

const form = document.querySelector("form");
const {email, message} = form.elements;
const key = "feedback-form-state";
const formData = localStorage.getItem(key);

const saveFormData = _event => {
    localStorage.setItem(key, JSON.stringify({email: email.value, message: message.value}));
}

if (formData != null) {
    const parsedFormData = JSON.parse(formData);
    for (const key in parsedFormData) {
        form[key].value = parsedFormData[key];
    };
}

email.addEventListener("input", throttle(saveFormData, 500, {leading: false}));
message.addEventListener("input", throttle(saveFormData, 500, {leading: false}));

form.addEventListener("submit", event => {
    event.preventDefault();
    console.log(JSON.parse(localStorage.getItem(key)));
    localStorage.removeItem(key);
    form.reset();
})