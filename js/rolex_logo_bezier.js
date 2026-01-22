let canvas;
let context;
let currentColor = "#CDB400";

window.onload = () => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    draw();

    const colorPicker = document.getElementById("colorPicker");
    colorPicker.addEventListener("input", (e) => {
        currentColor = e.target.value;
        draw();
        updateSVGColor();
    });
};

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    context.lineWidth = 3;
    context.strokeStyle = currentColor;
    context.fillStyle = currentColor;

    context.beginPath();
    context.moveTo(459, 430);
    context.bezierCurveTo(431, 478, 310, 475, 277, 426);
    context.lineTo(202, 173);
    context.lineTo(292, 348);
    context.lineTo(277, 111);
    context.lineTo(340, 339);
    context.lineTo(365, 85);
    context.lineTo(398, 342);
    context.lineTo(455, 110);
    context.lineTo(448, 345);
    context.lineTo(531, 172);
    context.lineTo(458, 430);
    context.stroke();
    context.closePath();
    context.fill();

    drawCircleWithBezier(context, 196, 159, 26);
    drawCircleWithBezier(context, 276, 95, 26);
    drawCircleWithBezier(context, 365, 71, 26);
    drawCircleWithBezier(context, 461, 95, 26);
    drawCircleWithBezier(context, 541, 161, 26);

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.moveTo(290, 425);
    context.bezierCurveTo(286, 462, 457, 463, 443, 426);
    context.bezierCurveTo(426, 397, 302, 397, 290, 425);
    context.closePath();
    context.fill();
    context.globalCompositeOperation = 'source-over';
}

function drawCircleWithBezier(ctx, cx, cy, r) {
    const k = 0.5522847498307936;
    const ox = r * k;
    const oy = r * k;

    ctx.beginPath();
    ctx.moveTo(cx + r, cy);
    ctx.bezierCurveTo(cx + r, cy - oy, cx + ox, cy - r, cx, cy - r);
    ctx.bezierCurveTo(cx - ox, cy - r, cx - r, cy - oy, cx - r, cy);
    ctx.bezierCurveTo(cx - r, cy + oy, cx - ox, cy + r, cx, cy + r);
    ctx.bezierCurveTo(cx + ox, cy + r, cx + r, cy + oy, cx + r, cy);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function updateSVGColor() {
    const svgElements = document.querySelectorAll("#svg path, #svg circle");
    svgElements.forEach(el => {
        el.setAttribute("fill", currentColor);
        el.setAttribute("stroke", currentColor);
    });
}
const hourHand = document.getElementById('hour');
        const minHand = document.getElementById('minute');
        const secHand = document.getElementById('second');
        const overlay = document.getElementById('clock-overlay');

        // Funkcija za prikaz/skrivanje ure
        function toggleClock(show) {
            overlay.style.display = show ? 'flex' : 'none';
        }

        function updateClock() {
            const now = new Date();
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours();

            const secondsDegrees = (seconds * 6);
            const minutesDegrees = (minutes * 6) + (seconds / 10);
            const hoursDegrees = ((hours % 12) * 30) + (minutes / 2);

            secHand.style.transform = `rotate(${secondsDegrees}deg)`;
            minHand.style.transform = `rotate(${minutesDegrees}deg)`;
            hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
        }

        setInterval(updateClock, 1000);
        updateClock();