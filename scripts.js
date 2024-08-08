ocument.addEventListener('DOMContentLoaded', function() {
    const videoPlayer = document.getElementById('videoPlayer');

    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            data.videos.forEach(video => {
                const iframe = document.createElement('iframe');
                iframe.width = '560';
                iframe.height = '315';
                iframe.src = `https://www.youtube.com/embed/${video.id}`;
                iframe.frameBorder = '0';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                videoPlayer.appendChild(iframe);
            });
        })
        .catch(error => console.error('Error loading videos:', error));
});
