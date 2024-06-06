document.getElementById('loan-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtiene valores de los inputs
    const amount = parseFloat(document.getElementById('amount').value);
    const term = parseInt(document.getElementById('term').value);

    let interestRate;

    // Determina la tasa de interés según el plazo
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

    // Calcula el interés total
    const totalInterest = amount * interestRate;
    const totalPayment = amount + totalInterest;
    const monthlyPayment = totalPayment / term;

    // Muestra los resultados
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
            // Validar que el email no esté vacío y tenga un formato válido
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







// PROBANDO

document.addEventListener("DOMContentLoaded", function() {
    // Recupera y establece el valor del monto del préstamo del localStorage
    const savedAmount = localStorage.getItem('loanAmount');
    if (savedAmount) {
        document.getElementById('amount').value = savedAmount;
    }

    // Manejar el envío del formulario
    document.getElementById('loan-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtiene los valores de entrada
        const amount = parseFloat(document.getElementById('amount').value);
        const term = parseInt(document.getElementById('term').value);

        // Valida el monto
        if (isNaN(amount) || amount <= 0) {
            Swal.fire('Error', 'Por favor, ingresa un monto válido', 'error');
            return;
        }

        // Guarda el monto del préstamo en localStorage
        localStorage.setItem('loanAmount', amount);

        // Muestra el spinner
        const spinner = document.getElementById('calc-spinner');
        spinner.style.display = 'block';

        // Oculta el resultado anterior
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '';
        
        // Espera 2 segundos antes de calcular y mostrar el resultado
        setTimeout(() => {
            let interestRate;

            // Determina la tasa de interés según el plazo
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

            // Calcula el interés total
            const totalInterest = amount * interestRate;
            const totalPayment = amount + totalInterest;
            const monthlyPayment = totalPayment / term;

            // Oculta el spinner
            spinner.style.display = 'none';

            // Crea el componente de resultado
            const resultHTML = `
                <h2>Resultado del Préstamo</h2>
                <p>Monto del préstamo: $${amount.toFixed(2)}</p>
                <p>Plazo: ${term} meses</p>
                <p>Pago mensual: $${monthlyPayment.toFixed(2)}</p>
                <p>Pago total: $${totalPayment.toFixed(2)}</p>
                <p>Intereses totales: $${totalInterest.toFixed(2)}</p>
            `;
            resultContainer.innerHTML = resultHTML;

        }, 2000); // 2000 milisegundos = 2 segundos
    });
});