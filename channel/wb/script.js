document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.getElementById('video-container');

    // Función para cargar el archivo JSON
    function loadJSON(callback) {
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'videos.json', true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState === 4 && xobj.status === 200) {
                callback(JSON.parse(xobj.responseText));
            }
        };
        xobj.send(null);
    }

    // Función para mostrar el video según el día y la hora
    function showVideo(data) {
        const now = new Date();
        const day = now.toLocaleString('es-ES', { weekday: 'long' }).toLowerCase();
        const hour = now.getHours();

        if (data[day]) {
            const videos = data[day];
            for (const video of videos) {
                if (parseInt(video.hora) === hour) {
                    const videoElement = document.createElement('div');
                    videoElement.innerHTML = `
                        <h2>${video.titulo}</h2>
                        <p>${video.descripcion}</p>
                        <video width="320" height="240" controls>
                            <source src="${video.url}" type="video/mp4">
                            Tu navegador no soporta el elemento de video.
                        </video>
                    `;
                    videoContainer.appendChild(videoElement);
                }
            }
        }
    }

    // Cargar el JSON y mostrar el video
    loadJSON(showVideo);
});
