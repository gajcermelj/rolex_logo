const canvas = document.getElementById('logoCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let currentColor = '#d32027';
    
    function drawLogo(color) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        
        // Center and scale the logo
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(3.5, 3.5);
        ctx.translate(-17, -16);
        
        // Call draw function from seat_logo.js with color override
        if (typeof SVGIcons !== 'undefined' && SVGIcons['seat-s-logo.svg']) {
            // Store original fillStyle setter
            const originalFillStyleDescriptor = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'fillStyle');
            
            // Override fillStyle to always use our custom color
            Object.defineProperty(ctx, 'fillStyle', {
                set: function(value) {
                    originalFillStyleDescriptor.set.call(this, color);
                },
                get: function() {
                    return originalFillStyleDescriptor.get.call(this);
                },
                configurable: true
            });
            
            // Draw the logo
            SVGIcons['seat-s-logo.svg'].draw(ctx);
            
            // Restore original fillStyle property
            delete ctx.fillStyle;
        }
        
        ctx.restore();
    }
    
    // Initial draw
    drawLogo(currentColor);
const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            currentColor = e.target.value;
            drawLogo(currentColor);
        });
    }