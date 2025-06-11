const LISTA_RESPUESTAS = [
    `<p>¡Hola! 😄 Soy la rece de <strong>Martí Beauty Salon</strong> 💅<br>¿En qué te puedo ayudar?</p>`,
    `<p>¡Hola bonita! 😄 Qué gusto leerte 💖 Aquí te dejo un vistazo a los servicios que ofrecemos en <strong>Martí Beauty Salon: </strong>:</p> <h3>💅 Manicura</h3> <ul> <li>Retirada gel + Manicura higiénica: 23,00 €</li> <li>Manicura semipermanente con nivelación/refuerzo: 26,00 €</li> <li>Puesta Gel color liso: 36,00 €</li> <li>Puesta gel con francesa o deco sencilla: 40,00 €</li> </ul> <h3>💆‍♀️ Tratamientos Corporales</h3> <ul> <li>Presoterapia: 15,00 €</li> <li>Espalda Zen: 36,00 €</li> <li>Ritual de Serenidad: 48,00 €</li> </ul> <h3>🌿 Faciales</h3> <ul> <li>Vitamina C esencial by MONTIBELLO: 65,00 €</li> <li>Hyalufeel esencial by MONTIBELLO: 60,00 €</li> <li>Retiderma Esencial by MONTIBELLO: 75,00 €</li> </ul> <p>Esto es solo una muestra✨ Puedes encontrar más detalles y servicios en nuestro enlace para reservar, y siempre puedes preguntarme si hay algo específico que necesitas 😊</p>
<em>¿Te ayudo con algo más?</em>`,
`<p>Tenemos un equipo maravilloso:</p> <ul> <li><strong>Carla</strong> trabaja los martes a sábados, de 10:00 a 19:00 (con descanso de 14:00 a 15:00). Y los sábados de 10:00 a 14:00.</li> <li><strong>Lucia</strong> está los martes, jueves, viernes y sábados, con horario igual al de Carla.</li> <li><strong>Laura</strong> trabaja los jueves y viernes, de 10:00 a 19:00 también con su merecido descanso de 14:00 a 15:00.</li> </ul> <p>¡Estamos listas para cuidarte y ofrecerte la mejor experiencia! 💅✨</p>
<em>¿Te ayudo con algo más?</em>`,
`<p>¡Genial! 😍 Puedes reservar tu cita cuando quieras desde aquí:</p> <p>👉 <a href="https://nailsbeauty.booksy.com/" target="_blank">https://jennifersorianonailsbeauty.booksy.com/</a></p> <p>Si necesitas ayuda para elegir servicio o algo más, estoy por aquí 😊</p>`,


]
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('setting');
    const buttonSender = document.getElementById('send-button');
    const dropdown = document.getElementById('dropdown-content');


    buttonSender.addEventListener('click', function () {
        const input = document.getElementById('input-text');
        const text = input.value;
        if (text) {
            new_mensaje_cliente(text);
            // peticion_respuesta(text);
            peticion_respuesta_fake();
            input.value = ''; 
        } 
    })

});
function peticion_respuesta_fake() {
    const messagesContainer = document.getElementById("messages-container");

    // 1. Mostrar animación de "escribiendo..."
    const typingDiv = document.createElement("div");
    typingDiv.className = "flex";
    typingDiv.innerHTML = `
        <div id="typing-indicator" class="bg-gray-300 text-black p-2 rounded-lg max-w-xs animate-pulse">
            Escribiendo...
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    if (LISTA_RESPUESTAS.length > 0) {
        const respuesta = LISTA_RESPUESTAS[0]; // Obtener el primer valor
        
        setTimeout(() => {
            new_mensaje_asistente(respuesta); // Enviarlo después de 2 segundos
            messagesContainer.removeChild(typingDiv);
            LISTA_RESPUESTAS.shift();         // Eliminar el primer valor
        }, 2000); // Pausa de 2 segundos
    }
}


function new_mensaje_cliente(text) {
    // Crear el contenedor del mensaje alineado a la derecha
    const outerDiv = document.createElement('div');
    outerDiv.className = 'flex justify-end';

    // Crear el mensaje con fondo azul claro y estilo de burbuja
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-[#fdf6e3] text-black p-2 rounded-lg max-w-xs';
    messageDiv.textContent = text;

    // Añadir el mensaje al contenedor
    outerDiv.appendChild(messageDiv);

    // Insertar en el contenedor principal de mensajes
    const container = document.getElementById('messages-container');
    if (container) {
        container.appendChild(outerDiv);
        // Scroll automático al final
        scrollToBottom();
    }
}
async function peticion_respuesta(text) {
    const messagesContainer = document.getElementById("messages-container");

    // 1. Mostrar animación de "escribiendo..."
    const typingDiv = document.createElement("div");
    typingDiv.className = "flex";
    typingDiv.innerHTML = `
        <div id="typing-indicator" class="bg-gray-300 text-black p-2 rounded-lg max-w-xs animate-pulse">
            Escribiendo...
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        // 2. Enviar petición a la API
        const response = await fetch("https://hook.eu2.make.com/dsa3s0n461vpntgrnm5mn4vg2kqzgz12", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensaje: text })
        });

        // 3. Esperar la respuesta
        const data = await response.text();


        // 4. Eliminar animación y mostrar respuesta
        messagesContainer.removeChild(typingDiv);
        new_mensaje_asistente(data);
    } catch (error) {
        // En caso de error, eliminar animación y mostrar error
        messagesContainer.removeChild(typingDiv);
        new_mensaje_asistente("Ha ocurrido un error. Inténtalo de nuevo.");
        console.error("Error en la petición:", error);
    }
}

function new_mensaje_asistente(text) {
    // Crear el contenedor del mensaje alineado a la izquierda
    const outerDiv = document.createElement('div');
    outerDiv.className = 'flex';

    // Crear el mensaje con fondo gris claro y estilo de burbuja
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-gray-300 text-black p-2 rounded-lg max-w-xs';
    messageDiv.innerHTML = text; // ← Permite insertar HTML

    // Añadir el mensaje al contenedor
    outerDiv.appendChild(messageDiv);

    // Insertar en el contenedor principal de mensajes
    const container = document.getElementById('messages-container');
    if (container) {
        container.appendChild(outerDiv);
        // Scroll automático al final
        scrollToBottom();
    }
}

function scrollToBottom() {
    // Para desarrollar en otro momento, no es esencial para el MVP
}

