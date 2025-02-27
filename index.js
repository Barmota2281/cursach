document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('.form__input--tel');

    const formatPhoneNumber = (value) => {
        let phoneNumber = value.replace(/\D/g, '');
        if (!phoneNumber) return '';

        if (phoneNumber.length > 11) {
            phoneNumber = phoneNumber.substr(0, 11);
        }

        if (phoneNumber[0] === '7' || phoneNumber[0] === '8') {
            let formatted = '+7 ';
            if (phoneNumber.length > 1) {
                formatted += '(' + phoneNumber.substr(1, 3);
            }
            if (phoneNumber.length > 4) {
                formatted += ') ' + phoneNumber.substr(4, 3);
            }
            if (phoneNumber.length > 7) {
                formatted += '-' + phoneNumber.substr(7, 2);
            }
            if (phoneNumber.length > 9) {
                formatted += '-' + phoneNumber.substr(9, 2);
            }
            return formatted;
        }
        return phoneNumber;
    };

    phoneInput.addEventListener('input', function(e) {
        const formatted = formatPhoneNumber(e.target.value);
        e.target.value = formatted;
    });
});