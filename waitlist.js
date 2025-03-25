document.addEventListener('DOMContentLoaded', function() {
    // Manejar el cambio de país de destino
    const destinationCountry = document.getElementById('destination-country');
    const destinationFlag = document.getElementById('destination-flag');
    
    if (destinationCountry && destinationFlag) {
        destinationCountry.addEventListener('change', function() {
            const countryCode = this.value.toLowerCase();
            destinationFlag.src = `assets/flags/${countryCode}.svg`;
        });
    }
    
    // Manejar el envío del formulario
    const waitlistForm = document.getElementById('waitlist-form');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obtener los valores del formulario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phoneCode = document.getElementById('phone-country-code').textContent;
            const phoneNumber = this.querySelector('input[type="tel"]').value;
            const country = document.getElementById('destination-country').value;
            
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora, mostraremos un mensaje de éxito
            
            // Crear un elemento para mostrar el mensaje de éxito
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" fill="#0052FF" fill-opacity="0.1"/>
                    <circle cx="24" cy="24" r="18" stroke="#0052FF" stroke-width="2.5" fill="none"/>
                    <path d="M16 24L22 30L32 18" stroke="#0052FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h3>¡Gracias por unirte a nuestra lista de espera!</h3>
                <p>Te notificaremos cuando el servicio Send Now Pay Later esté disponible.</p>
                <a href="index.html" class="back-button">Volver al inicio</a>
            `;
            
            // Reemplazar el formulario con el mensaje de éxito
            waitlistForm.parentNode.replaceChild(successMessage, waitlistForm);
            
            // Desplazarse hacia arriba para mostrar el mensaje
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 