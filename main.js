// Función para cargar los eventos desde el archivo JSON
const loadEvents = () => {
    fetch('events.json')
        .then(response => response.json())
        .then(events => {
            const eventList = document.getElementById('event-list');
            const eventSelect = document.getElementById('event-id');
            eventList.innerHTML = '';
            eventSelect.innerHTML = '<option value="" disabled selected>Seleccione un evento</option>'; // Limpiar y agregar la opción por defecto

            events.forEach(event => {
                const eventItem = document.createElement('li');
                eventItem.className = 'event-item';
                eventItem.innerHTML = `
                    <h3>${event.name}</h3>
                    <p>Fecha: ${event.date}</p>
                    <p>Lugar: ${event.location}</p>
                    <button class="details-btn" data-id="${event.id}">Ver Detalles</button>
                `;
                eventList.appendChild(eventItem);

                const eventOption = document.createElement('option');
                eventOption.value = event.id;
                eventOption.textContent = event.name;
                eventSelect.appendChild(eventOption);
            });

            const detailButtons = document.querySelectorAll('.details-btn');
            detailButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const eventId = e.target.getAttribute('data-id');
                    const event = events.find(event => event.id == eventId);
                    showEventDetails(event);
                    const seccionDestino = document.getElementById('event-details-container');
                    seccionDestino.scrollIntoView({ behavior: 'smooth' });
                });
            });
        })
        .catch(error => console.error('Error al cargar los eventos:', error));
};

const showEventDetails = (event) => {
    const detailsContainer = document.getElementById('event-details');
    detailsContainer.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Descripción:</strong> ${event.description}</p>
        <p><strong>Fecha y horas:</strong> ${event.date} ${event.time}</p>
        <p><strong>Precio:</strong> ${event.price} ${event.currency}</p>
        <p><strong>Lugar:</strong> ${event.location}</p>
        <p><strong>Organizador:</strong> ${event.organizer}</p>
        <br>
        <p><strong>Contacto:</strong></p>
        <strong>Teléfono:</strong> ${event.contact.phone}
        <br>
        <strong>Email:</strong> ${event.contact.email}
    `;
};

document.addEventListener('DOMContentLoaded', loadEvents);


