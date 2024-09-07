const canvas = document.getElementById('orbitCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        const particles = [];
        const numParticles = 100;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;


        class Particle {
            constructor(angle, radius, speed) {
                this.angle = angle;
                this.radius = radius;
                this.speed = speed;
                this.x = centerX + this.radius * Math.cos(this.angle);
                this.y = centerY + this.radius * Math.sin(this.angle);
                this.glow = Math.random() * 10 + 10;
            }


            update() {
                this.angle += this.speed;
                this.x = centerX + this.radius * Math.cos(this.angle);
                this.y = centerY + this.radius * Math.sin(this.angle);
            }


            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, 0.7)`;
                ctx.shadowBlur = this.glow;
                ctx.shadowColor = '#00ffff';
                ctx.fill();
            }
        }


        function createParticles() {
            for (let i = 0; i < numParticles; i++) {
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.random() * canvas.width * 0.4 + 50;
                const speed = Math.random() * 0.01 + 0.001;
                particles.push(new Particle(angle, radius, speed));
            }
        }


        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }


        createParticles();
        animate();


        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });