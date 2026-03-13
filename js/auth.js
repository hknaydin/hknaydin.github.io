document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('login-modal');
    const authBtn = document.getElementById('auth-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const userInput = document.getElementById('admin-user');
    const passInput = document.getElementById('admin-pass');
    const togglePassBtn = document.getElementById('toggle-pass');
    const toggleIcon = document.getElementById('toggle-icon');
    const errorMsg = document.getElementById('login-error');
    const secureLinks = document.querySelectorAll('.secure-link');

    // SHA-256 hash of 'devlethep18yasindadir'
    const validHash = 'ecfeac19c2231a227e5b91e1459b62961367dad9ea7da64ce2f60a6f923ec59b';
    const validUser = 'hakanaydin';

    let currentTargetUrl = '';

    // Modalı aç ve hedef URL'yi sakla
    secureLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentTargetUrl = link.getAttribute('data-target');

            // Modali goster ve inputlari temizle
            loginModal.style.display = 'flex';
            userInput.value = '';
            passInput.value = '';
            errorMsg.style.display = 'none';
            userInput.focus();
        });
    });

    // Modalı kapat
    function closeModal() {
        loginModal.style.display = 'none';
        currentTargetUrl = '';
    }

    cancelBtn.addEventListener('click', closeModal);

    // Kapatmak için arka plana tıklama
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeModal();
        }
    });

    // Doğrulama işlemi
    function authenticate() {
        const user = userInput.value;
        const pass = passInput.value;

        // İstemci tarafında hash kontrolü
        if (user === validUser && sha256(pass) === validHash) {
            // Başarılı giriş, hedefe yönlendir
            window.location.href = currentTargetUrl;
        } else {
            // Hatalı giriş
            errorMsg.style.display = 'block';
            passInput.value = ''; // Şifreyi temizle
            passInput.focus();
        }
    }

    authBtn.addEventListener('click', authenticate);

    // Göz ikonuna tıklandığında şifre görünürlüğünü değiştir
    togglePassBtn.addEventListener('click', () => {
        if (passInput.type === 'password') {
            passInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    });

    // Enter tuşu desteği
    passInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            authenticate();
        }
    });
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            authenticate();
        }
    });
});
