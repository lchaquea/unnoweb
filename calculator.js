document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('calculator-form');
    const countrySelect = document.getElementById('country');
    const countryFlag = document.getElementById('country-flag');
    const rateDisplay = document.getElementById('rate');
    const finalAmountDisplay = document.getElementById('final-amount');
    const resultCurrencyFlag = document.querySelector('.amount-result .currency-indicator img');
    const resultCurrencyText = document.querySelector('.amount-result .currency-indicator span');

    // Configuración de países y monedas
    const countries = {
        'MX': {
            currency: 'MXN',
            rate: 17.50,
            flag: 'assets/flags/mx.svg'
        },
        'CO': {
            currency: 'COP',
            rate: 4000,
            flag: 'assets/flags/co.svg'
        },
        'AR': {
            currency: 'ARS',
            rate: 350,
            flag: 'assets/flags/ar.svg'
        },
        'CL': {
            currency: 'CLP',
            rate: 850,
            flag: 'assets/flags/cl.svg'
        },
        'VE': {
            currency: 'VES',
            rate: 36,
            flag: 'assets/flags/ve.svg'
        },
        'BO': {
            currency: 'BOB',
            rate: 6.90,
            flag: 'assets/flags/bo.svg'
        },
        'PE': {
            currency: 'PEN',
            rate: 3.70,
            flag: 'assets/flags/pe.svg'
        },
        'DO': {
            currency: 'DOP',
            rate: 56.50,
            flag: 'assets/flags/do.svg'
        }
    };

    // Inicializar con Colombia como país predeterminado
    const defaultCountry = 'CO';
    const countryData = countries[defaultCountry];
    
    // Actualizar bandera del país
    countryFlag.src = countryData.flag;
    
    // Actualizar moneda en el resultado
    resultCurrencyFlag.src = countryData.flag;
    resultCurrencyText.textContent = countryData.currency;
    
    // Actualizar tasa de cambio
    updateRateDisplay(countryData);
    
    // Inicializar cálculo
    calculateAmount();

    // Manejar cambio de país
    countrySelect.addEventListener('change', function() {
        const country = this.value;
        const countryData = countries[country];
        
        // Actualizar bandera del país
        countryFlag.src = countryData.flag;
        
        // Actualizar moneda en el resultado
        resultCurrencyFlag.src = countryData.flag;
        resultCurrencyText.textContent = countryData.currency;
        
        // Actualizar tasa de cambio
        updateRateDisplay(countryData);
        
        // Recalcular monto si hay un valor
        calculateAmount();
    });

    // Función para calcular el monto
    function calculateAmount() {
        const amount = parseFloat(document.getElementById('amount').value) || 0;
        const country = countrySelect.value;
        const rate = countries[country].rate;
        
        // Cálculo del monto final
        const fee = 2.99;
        const finalAmount = (amount - fee) * rate;
        
        // Actualizar la interfaz
        finalAmountDisplay.textContent = finalAmount.toFixed(2);
    }

    // Manejar cambios en el monto
    document.getElementById('amount').addEventListener('input', calculateAmount);

    // Manejar envío del formulario
    calculatorForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir envío del formulario
        
        // Verificar si todos los campos requeridos están completos
        const requiredFields = this.querySelectorAll('[required]');
        let allFieldsValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value) {
                allFieldsValid = false;
            }
        });
        
        // Si todos los campos están completos, abrir WhatsApp
        if (allFieldsValid) {
            const phoneCode = document.getElementById('phone-country-code').textContent;
            const phoneNumber = this.querySelector('input[type="tel"]').value;
            const amount = document.getElementById('amount').value;
            const country = document.getElementById('country').value;
            
            // Construir mensaje personalizado
            const message = `Hola quiero enviar ${amount} USD a ${country}`;
            
            // Abrir WhatsApp
            window.open(`https://wa.me/573332332518?text=${encodeURIComponent(message)}`, '_blank');
        }
    });

    // Actualizar la bandera cuando cambie el país seleccionado
    function updateFlag() {
        const countryCode = countrySelect.value.toLowerCase();
        countryFlag.src = `assets/flags/${countryCode}.svg`;
    }
    
    // Actualizar la bandera al cargar la página
    updateFlag();
    
    // Actualizar la bandera cuando cambie la selección
    countrySelect.addEventListener('change', updateFlag);

    // Reemplazar cualquier texto que mencione "tipo de cambio"
    function updateRateDisplay(countryData) {
        // Actualizar el texto de la tasa de cambio
        rateDisplay.textContent = `${countryData.rate} ${countryData.currency}`;
    }
}); 