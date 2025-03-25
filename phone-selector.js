// Funcionalidad mejorada para el selector de código de país
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing phone selector");
    
    const selectedCountry = document.getElementById('selected-country');
    const countryDropdown = document.getElementById('country-dropdown');
    const countryOptions = document.querySelectorAll('.country-option');
    const phoneCountryFlag = document.getElementById('phone-country-flag');
    const phoneCountryCode = document.getElementById('phone-country-code');
    
    console.log("Elements found:", {
        selectedCountry: !!selectedCountry,
        countryDropdown: !!countryDropdown,
        countryOptions: countryOptions.length,
        phoneCountryFlag: !!phoneCountryFlag,
        phoneCountryCode: !!phoneCountryCode
    });
    
    // Mostrar/ocultar el dropdown al hacer clic en el país seleccionado
    selectedCountry.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log("Selected country clicked");
        countryDropdown.classList.toggle('show');
    });
    
    // Cerrar el dropdown al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!selectedCountry.contains(e.target) && !countryDropdown.contains(e.target)) {
            countryDropdown.classList.remove('show');
        }
    });
    
    // Manejar la selección de un país
    countryOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague
            const code = this.getAttribute('data-code');
            const country = this.getAttribute('data-country');
            
            console.log('Country selected:', country, code); // Para depuración
            
            // Actualizar la bandera y el código
            phoneCountryFlag.src = `assets/flags/${country}.svg`;
            phoneCountryCode.textContent = code;
            
            // Cerrar el dropdown
            countryDropdown.classList.remove('show');
        });
    });
    
    // Inicializar con Estados Unidos
    phoneCountryFlag.src = 'assets/flags/us.svg';
    phoneCountryCode.textContent = '+1';
}); 