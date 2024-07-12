function searchNav() {
    // Crear el elemento <nav> y asignar estilo
    const nav = document.createElement('nav');
    nav.id = 'PageNavBar';
    nav.style.transition = 'margin-top 0.3s ease-in-out 0.1s';

    

    // Crear contenedor principal
    const container = document.createElement('div');
    container.className = 'nav-container sections';
    

    // Crear sección del logo
    const logoSection = document.createElement('div');
    logoSection.id = 'PageNavBarSectionLogo';
    

    const logoLink = document.createElement('a');
    logoLink.href = 'index.html';
    logoLink.title = 'Vuelos';
    logoLink.setAttribute('aria-current', 'page');
    logoLink.className = 'router-link-exact-active router-link-active';

    const logoImg = document.createElement('img');
    logoImg.src = './img/icono2.png';
    logoImg.alt = 'Travel Project';
    logoImg.className = 'site-logo';

    logoLink.appendChild(logoImg);
    logoSection.appendChild(logoLink);
    container.appendChild(logoSection);

    // Crear lista de enlaces
    const navList = document.createElement('ul');
    navList.id = 'PageNavBarSectionList';

    const navItems = [
        { href: 'simulador.html', title: 'Prestamos', icon: 'icon-vuelos', text: 'Prestamos' },
        
        { href: 'https://www.paxassistance.com/es-ar', title: 'Asistencia al viajero', icon: '', text: 'Asistencia al viajero' },
        { href: 'https://www.hertz.com/rentacar/reservation/', title: 'Autos', icon: 'icon-autos', text: 'Alquiler de autos' },             
        
    ];

    navItems.forEach(item => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.className = 'HeaderLink';

        const a = document.createElement('a');
        a.href = item.href;
        a.title = item.title;
        if (item.external) {
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
        }

        const icon = document.createElement('i');
        icon.className = item.icon;
        if (item.customStyle) {
            icon.style = item.customStyle;
        }

        const span = document.createElement('span');
        span.className = 'hidden-xs hidden-md hidden-sm';
        span.textContent = item.text;

        a.appendChild(icon);
        a.appendChild(span);
        div.appendChild(a);
        li.appendChild(div);
        navList.appendChild(li);
    });

    container.appendChild(navList);

    // Crear opciones de usuario
    const userOptions = document.createElement('ul');
    userOptions.id = 'PageNavBarUserOptions';

    const userOptionItems = `
    <li class="dropdown">
        <a role="button" class="navbar-button" id="countryButton">
            <span id="actualCountryImage" class="icon-country sf-ar"></span>
            <span class="country-code hidden-xs" style="margin-right: 3px;">AR</span>
            <span class="hidden-xs">(ARS)</span>
        </a>
        <div id="countryDropDown" class="nav-container modal-shadow" style="display: none;">
            <ul class="currency-list">
                <li data-country="AR" data-currency="ARS">Argentina (ARS)</li>
                <li data-country="US" data-currency="USD">USA (USD)</li>
                <li data-country="EU" data-currency="EUR">Europe (EUR)</li>
            </ul>
        </div>
    </li>
    <li id="user-status" class="userBadge">
        <a role="button" class="navbar-button">
            <i class="icon-cuenta loggin"></i>
        </a>
    </li>
    `;

    userOptions.innerHTML = userOptionItems;
    container.appendChild(userOptions);

    nav.appendChild(container);

    // Agregar el nav al contenedor principal
    document.getElementById('nav-container').appendChild(nav);

    // Manejar el clic en el botón de país para mostrar/ocultar el menú desplegable
    document.getElementById('countryButton').addEventListener('click', () => {
        const dropdown = document.getElementById('countryDropDown');
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Manejar el cambio de moneda
    document.querySelectorAll('.currency-list li').forEach(item => {
        item.addEventListener('click', (event) => {
            const country = event.target.getAttribute('data-country');
            const currency = event.target.getAttribute('data-currency');
            document.querySelector('.country-code').textContent = country;
            document.querySelector('.country-code + span').textContent = `(${currency})`;

            // Ocultar el menú desplegable después de seleccionar una opción
            document.getElementById('countryDropDown').style.display = 'none';

            // Aquí puedes agregar la lógica para manejar el cambio de moneda en tu aplicación
            console.log(`Moneda cambiada a: ${currency} (${country})`);
        });
    });

   }

document.addEventListener('DOMContentLoaded', () => {
    searchNav();
    
});