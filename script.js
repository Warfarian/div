const methods = document.querySelectorAll('.method');
        
methods.forEach(method => {
    method.addEventListener('click', () => {
        method.style.transform = 'scale(1.05)';
        setTimeout(() => {
            method.style.transform = 'scale(1)';
        }, 200);
    });
});