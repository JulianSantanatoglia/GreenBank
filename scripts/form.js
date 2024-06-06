document.getElementById('loan-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const term = parseInt(document.getElementById('term').value);

    let interestRate;

    switch(term) {
        case 24:
            interestRate = 0.10;
            break;
        case 36:
            interestRate = 0.15;
            break;
        case 48:
            interestRate = 0.20;
            break;
        case 60:
            interestRate = 0.25;
            break;
        default:
            interestRate = 0;
    }

    const totalInterest = amount * interestRate;
    const totalPayment = amount + totalInterest;
    const monthlyPayment = totalPayment / term;

    document.getElementById('monthly-payment').textContent = `Pago mensual: $${monthlyPayment.toFixed(2)}`;
    document.getElementById('total-payment').textContent = `Pago total: $${totalPayment.toFixed(2)}`;
    document.getElementById('total-interest').textContent = `Intereses totales: $${totalInterest.toFixed(2)}`;
});



// ALERTA

document.getElementById('email-alert-button').addEventListener('click', function() {
    Swal.fire({
        title: 'Ingresa tu email',
        input: 'email',
        inputPlaceholder: 'example@domain.com',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes ingresar un email!';
            } else if (!validateEmail(value)) {
                return '¡Debes ingresar un email válido!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Email enviado!',
                `Hemos enviado la información a: ${result.value}`,
                'success'
            );
        }
    });
});


// Función de validación de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


// LOCALSTORAGE

document.getElementById('boton-calcularr').addEventListener('click', function() {
    let nombre = document.getElementById('amount').value;
    localStorage.setItem('nombre', nombre);
});


