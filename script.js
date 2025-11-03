// ===================================
// Confetti Animation
// ===================================
class ConfettiCannon {
    constructor() {
        this.canvas = document.getElementById('confetti-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#ff6b9d', '#c44569', '#ffa4c8', '#ffd700', '#ff69b4', '#ff1493'];
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10 - 5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            size: Math.random() * 10 + 5,
            gravity: 0.3,
            opacity: 1
        };
    }

    burst(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            this.particles.push(this.createParticle(x, y));
        }
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(particle => {
            particle.vy += particle.gravity;
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            particle.opacity -= 0.01;

            if (particle.opacity > 0) {
                this.ctx.save();
                this.ctx.translate(particle.x, particle.y);
                this.ctx.rotate(particle.rotation * Math.PI / 180);
                this.ctx.globalAlpha = particle.opacity;
                this.ctx.fillStyle = particle.color;
                this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                this.ctx.restore();
                return true;
            }
            return false;
        });

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        }
    }

    celebrate() {
        // Create multiple bursts across the screen
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height * 0.5;
                this.burst(x, y, 80);
            }, i * 200);
        }
    }
}

// ===================================
// Initialize Confetti
// ===================================
const confetti = new ConfettiCannon();

// Trigger confetti on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        confetti.celebrate();
    }, 500);
});

// ===================================
// Smooth Scroll for Navigation
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Interactive Gift Box
// ===================================
class GiftBox {
    constructor() {
        this.giftBox = document.getElementById('giftBox');
        this.ribbonVertical = document.getElementById('ribbonVertical');
        this.ribbonHorizontal = document.getElementById('ribbonHorizontal');
        this.bow = document.getElementById('bow');
        this.hiddenPhoto = document.getElementById('hiddenPhoto');
        this.instructions = document.getElementById('giftInstructions');
        
        this.clickCount = 0;
        this.maxClicks = 3; // Vertical ribbon, horizontal ribbon, bow
        
        this.init();
    }

    init() {
        // Add click events to each part
        // Use pointer events for improved cross-device reliability
        this.ribbonVertical.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            this.removeRibbon(this.ribbonVertical, 'vertical');
        });

        this.ribbonHorizontal.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            this.removeRibbon(this.ribbonHorizontal, 'horizontal');
        });

        this.bow.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            this.removeRibbon(this.bow, 'bow');
        });
    }

    removeRibbon(element, type) {
        if (!element.classList.contains('clicked')) {
            element.classList.add('clicked');
            this.clickCount++;
            
            // Create small confetti burst at click location
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            confetti.burst(x, y, 30);

            // Check if all parts are removed
            if (this.clickCount >= this.maxClicks) {
                this.revealPhoto();
            }
        }
    }

    revealPhoto() {
        setTimeout(() => {
            // Reveal the play-card instead of a static photo
            this.hiddenPhoto.classList.add('revealed');
            this.instructions.classList.add('hidden');

            // Attach handler for the play button (if present)
            const playBtn = this.hiddenPhoto.querySelector('#playButton');
            if (playBtn) {
                playBtn.addEventListener('pointerup', (e) => {
                    e.stopPropagation();
                    this.openVideoOverlay();
                });
            }

            // Big celebration when gift is fully unwrapped
            setTimeout(() => {
                confetti.celebrate();
                this.createHeartExplosion();
            }, 500);
        }, 800);
    }

    openVideoOverlay() {
        // Create overlay and video element
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'video-close';
        closeBtn.textContent = '✕';

        const video = document.createElement('video');
        video.setAttribute('controls', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.style.maxWidth = '1200px';

        // Use a default filename; user can replace with videos/surprise.mp4
        const src = document.createElement('source');
        src.src = 'videos/surprise.mp4';
        src.type = 'video/mp4';
        video.appendChild(src);

        overlay.appendChild(video);
        document.body.appendChild(overlay);
        document.body.appendChild(closeBtn);

        // Play and prevent background scroll
        document.body.style.overflow = 'hidden';
        video.play().catch(() => {
            // autoplay with sound may be blocked; user can press play
        });

        const teardown = () => {
            video.pause();
            video.currentTime = 0;
            document.body.style.overflow = '';
            overlay.remove();
            closeBtn.remove();
        };

        // Close handlers
        closeBtn.addEventListener('pointerup', (e) => {
            e.stopPropagation();
            teardown();
        });

        overlay.addEventListener('pointerup', (e) => {
            // if clicked outside video element, close
            if (e.target === overlay) teardown();
        });
    }

    createHeartExplosion() {
        const giftRect = this.giftBox.getBoundingClientRect();
        const centerX = giftRect.left + giftRect.width / 2;
        const centerY = giftRect.top + giftRect.height / 2;

        // Create floating hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createFloatingHeart(centerX, centerY);
            }, i * 100);
        }
    }

    createFloatingHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10000';
        heart.style.transition = 'all 2s ease-out';
        document.body.appendChild(heart);

        // Animate heart
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 200;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            heart.style.transform = `translate(${tx}px, ${ty}px) scale(2)`;
            heart.style.opacity = '0';
        }, 10);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

// Initialize gift box when DOM is loaded
let giftBox;
document.addEventListener('DOMContentLoaded', () => {
    giftBox = new GiftBox();
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
window.addEventListener('load', () => {
    const animatedElements = document.querySelectorAll(
        '.message-card, .gallery-item, .video-item, .reason-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Photo Gallery Modal (Optional Enhancement)
// ===================================
function setupPhotoModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            // Create modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', () => {
                modal.remove();
            });
        });
    });
}

// ===================================
// Add Photos and Videos Helper Functions
// ===================================

// Example function to add a photo to the gallery
function addPhotoToGallery(imagePath, index) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[index]) {
        galleryItems[index].innerHTML = `<img src="${imagePath}" alt="Special Memory ${index + 1}">`;
    }
}

// Example function to add a video
function addVideoToSection(videoPath, index) {
    const videoItems = document.querySelectorAll('.video-item');
    if (videoItems[index]) {
        videoItems[index].innerHTML = `
            <video controls>
                <source src="${videoPath}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    }
}

// ===================================
// Floating Hearts on Scroll
// ===================================
let lastScrollTop = 0;
let scrollTimer;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    
    scrollTimer = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only create hearts when scrolling down
        if (scrollTop > lastScrollTop && Math.random() > 0.7) {
            createRandomHeart();
        }
        
        lastScrollTop = scrollTop;
    }, 100);
});

function createRandomHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.opacity = '0.7';
    heart.style.transition = 'all 3s ease-out';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.top = '-100px';
        heart.style.opacity = '0';
    }, 10);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// ===================================
// Instructions Message
// ===================================
console.log(`
🎉 Birthday Website Ready! 🎉

To add your photos:
1. Create a 'photos' folder in the same directory as index.html
2. Add your images to the photos folder
3. Update the gallery items in index.html:
   Replace: <div class="placeholder-card">...</div>
   With: <img src="photos/your-image.jpg" alt="Description">

To add videos:
1. Create a 'videos' folder in the same directory as index.html
2. Add your video files to the videos folder
3. Update the video items in index.html:
   Replace: <div class="placeholder-card video-placeholder">...</div>
   With: <video controls><source src="videos/your-video.mp4" type="video/mp4"></video>

Special Gift Box:
- Don't forget to add your special surprise photo at: photos/surprise.jpg
- The gift box will reveal this photo when all ribbons are clicked!

Enjoy creating beautiful memories! ❤️
`);

// ===================================
// Envelope / Letter Reveal
// ===================================
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    if (!envelope || !letter) return;
    // Use pointer events for better mobile/touch support
    const toggleOpen = (e) => {
        // ignore right-clicks / secondary buttons
        if (e && e.button && e.button !== 0) return;
        e && e.stopPropagation();

        const opening = !envelope.classList.contains('open');
        envelope.classList.toggle('open');
        letter.classList.toggle('revealed', opening);
        letter.setAttribute('aria-hidden', opening ? 'false' : 'true');

        // prevent background scroll when letter is open
        document.body.style.overflow = opening ? 'hidden' : '';

        if (opening) {
            // Small confetti burst centered on envelope
            const rect = envelope.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            confetti.burst(x, y, 60);
        }
    };

    envelope.addEventListener('pointerup', toggleOpen);

    // Close button inside the letter (added in HTML)
    const closeBtn = letter.querySelector('.letter-close');
    if (closeBtn) {
        closeBtn.addEventListener('pointerup', (evt) => {
            evt.stopPropagation();
            envelope.classList.remove('open');
            letter.classList.remove('revealed');
            letter.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    }

    // Click / tap outside the inner content (on overlay) to close
    letter.addEventListener('pointerup', (evt) => {
        if (evt.target === letter) {
            envelope.classList.remove('open');
            letter.classList.remove('revealed');
            letter.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });
}

// Initialize envelope when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initEnvelope();
});
