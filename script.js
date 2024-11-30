document.addEventListener('DOMContentLoaded', () => {
    const playgroundBtn = document.querySelector('.playground-btn');
    const playgroundSection = document.querySelector('.playground-section');
    const backBtn = document.querySelector('.back-btn');
    const heroContent = document.querySelector('.hero-content');
    const elementItems = document.querySelectorAll('.element-item');
    const playgroundArea = document.querySelector('.playground-area');
    const controlBtns = document.querySelectorAll('.control-btn');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.querySelector('.image-preview img');

    playgroundBtn.addEventListener('click', () => {
        heroContent.classList.add('fade-out');
        setTimeout(() => {
            playgroundSection.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 300);
    });

    backBtn.addEventListener('click', () => {
        playgroundSection.classList.remove('active');
        setTimeout(() => {
            heroContent.classList.remove('fade-out');
            document.body.style.overflow = 'auto';
        }, 300);
    });

    elementItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    playgroundArea.addEventListener('dragover', handleDragOver);
    playgroundArea.addEventListener('drop', handleDrop);

    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                localStorage.setItem('lastUploadedImage', imageUrl);
                imagePreview.src = imageUrl;
            };
            reader.readAsDataURL(file);
        }
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.type);
        e.target.classList.add('dragging');
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const type = e.dataTransfer.getData('text/plain');
        const rect = playgroundArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        createNewElement(type, x, y);
    }

    function createNewElement(type, x, y) {
        let element;
        
        switch(type) {
            case 'div':
                element = document.createElement('div');
                element.className = 'target-div';
                element.textContent = 'New Div';
                break;
            case 'image':
                element = document.createElement('div');
                element.className = 'target-div image-div';
                const imageUrl = localStorage.getItem('lastUploadedImage') || 'images/chillguy.png';
                element.style.backgroundImage = `url(${imageUrl})`;
                element.style.backgroundSize = 'cover';
                element.style.backgroundPosition = 'center';
                element.textContent = '';
                break;
            case 'button':
                element = document.createElement('button');
                element.className = 'target-div button-element';
                element.textContent = 'Click Me';
                break;
        }
        
        element.style.position = 'absolute';
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.transform = 'translate(-50%, -50%)';
        
        makeDraggable(element);
        playgroundArea.appendChild(element);
    }

    function makeDraggable(element) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        element.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === element) {
                isDragging = true;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                xOffset = currentX;
                yOffset = currentY;
                setTranslate(currentX, currentY, element);
            }
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
    }

    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const method = btn.dataset.method;
            const elements = playgroundArea.querySelectorAll('.target-div');
            
            playgroundArea.style = '';
            elements.forEach(el => {
                const backgroundImage = el.style.backgroundImage;
                const backgroundSize = el.style.backgroundSize;
                const backgroundPosition = el.style.backgroundPosition;
                
                el.style = '';
                
                if (backgroundImage) {
                    el.style.backgroundImage = backgroundImage;
                    el.style.backgroundSize = backgroundSize;
                    el.style.backgroundPosition = backgroundPosition;
                }
            });
            
            switch(method) {
                case 'flex':
                    playgroundArea.style.display = 'flex';
                    playgroundArea.style.justifyContent = 'center';
                    playgroundArea.style.alignItems = 'center';
                    playgroundArea.style.flexWrap = 'wrap';
                    playgroundArea.style.gap = '20px';
                    playgroundArea.style.padding = '20px';
                    break;
                case 'grid':
                    playgroundArea.style.display = 'grid';
                    playgroundArea.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
                    playgroundArea.style.gap = '20px';
                    playgroundArea.style.padding = '20px';
                    playgroundArea.style.placeItems = 'center';
                    break;
                case 'position':
                    playgroundArea.style.position = 'relative';
                    elements.forEach(el => {
                        const backgroundImage = el.style.backgroundImage;
                        const backgroundSize = el.style.backgroundSize;
                        const backgroundPosition = el.style.backgroundPosition;
                        
                        el.style.position = 'absolute';
                        el.style.top = '50%';
                        el.style.left = '50%';
                        el.style.transform = 'translate(-50%, -50%)';
                        
                        if (backgroundImage) {
                            el.style.backgroundImage = backgroundImage;
                            el.style.backgroundSize = backgroundSize;
                            el.style.backgroundPosition = backgroundPosition;
                        }
                    });
                    break;
            }
        });
    });

    if (!localStorage.getItem('lastUploadedImage')) {
        localStorage.setItem('lastUploadedImage', 'images/chillguy.png');
    }
});