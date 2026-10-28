let passLength = document.querySelector('.password-length input');
let options = document.querySelectorAll('.checkboxes-box div input');
let generateBtn = document.querySelector('.generate-btn');
let password = document.querySelector('.password');
let copyBtn = document.querySelector('#copy-btn');
let copiedMsg = document.querySelector('.container .copy-btn span');
let copiedIcon = document.querySelector('.container .copy-btn i');

const characters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-="
};

const getPassLengthValue = () => {
    document.querySelector('.length-value').textContent = passLength.value;
};

const generatePassword = () => {
    const selectedCharacters = Array.from(options)
        .filter(option => option.checked)
        .map(option => characters[option.id])
        .join('');

    if (!selectedCharacters) {
        password.value = '';
        alert('Select at least one character set.');
        return;
    }

    const length = Number(passLength.value);
    const maxUnbiasedValue = Math.floor(0x100000000 / selectedCharacters.length) * selectedCharacters.length;
    let generatedPassword = '';

    while (generatedPassword.length < length) {
        const randomValue = new Uint32Array(1);
        crypto.getRandomValues(randomValue);

        if (randomValue[0] < maxUnbiasedValue) {
            generatedPassword += selectedCharacters[randomValue[0] % selectedCharacters.length];
        }
    }

    password.value = generatedPassword;
};

passLength.addEventListener('input', getPassLengthValue);
generateBtn.addEventListener('click', generatePassword);