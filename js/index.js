document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const inputName = document.querySelector('#nombre');
    const inputLastName = document.querySelector('#apellido');
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    const form = document.querySelector('.form');

    inputName.addEventListener('blur', validar);
    inputLastName.addEventListener('blur', validar);
    inputEmail.addEventListener('blur', validar);
    inputPassword.addEventListener('blur', validar);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if ([inputName.value, inputLastName.value, inputEmail.value, inputPassword.value].includes('')) {
            validarEnvio(inputName);
            validarEnvio(inputLastName);
            validarEnvio(inputEmail);
            validarEnvio(inputPassword);
            return;
        }

        form.reset();
    });

    function validarEnvio(el) {
        limpiarAlerta(el.parentElement);
        limpiarImagen(el.parentElement);

        if (el.value.trim() === '') {
            alerta(`${el.placeholder} cannot be empty`, el.parentElement);
            el.classList.add('error-input');
            crearImagen(el.parentElement);
            return;
        }
    }

    function validar(e) {

        limpiarAlerta(e.target.parentElement);
        limpiarImagen(e.target.parentElement);

        if (e.target.value.trim() === '') {
            alerta(`${e.target.placeholder} cannot be empty`, e.target.parentElement);
            e.target.classList.add('error-input');
            crearImagen(e.target.parentElement);

            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            alerta('Looks like this is not an email', e.target.parentElement);
            e.target.classList.add('error-input');
            crearImagen(e.target.parentElement);

            return;
        }

        if (e.target.id === 'password' && e.target.value.length < 6) {
            alerta('Password will be more than 6 caracters', e.target.parentElement);
            e.target.classList.add('error-input');
            crearImagen(e.target.parentElement);

            return;
        }

        e.target.classList.remove('error-input');


    }

    function alerta(msg, ref) {

        limpiarAlerta(ref);

        const alerta = document.createElement('P');
        alerta.textContent = msg;
        alerta.classList.add('error');


        ref.appendChild(alerta);
    }

    function crearImagen(ref) {
        const img = document.createElement('IMG');
        img.src = './images/icon-error.svg';
        img.setAttribute('alt', 'Img logo error');
        img.classList.add('campo__img');

        ref.appendChild(img)
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const res = regex.test(email);

        return res;
    }

    function limpiarAlerta(ref) {
        const alerta = ref.querySelector('.error');
        if (alerta) {
            alerta.remove();
        }
    }

    function limpiarImagen(ref) {
        const imagen = ref.querySelector('.campo__img');
        if (imagen) {
            imagen.remove();
        }
    }
});