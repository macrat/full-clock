const hourLines = [...document.querySelectorAll('line.hour')];
const minuteLines = [...document.querySelectorAll('line.minute')];
const secondLine = document.querySelector('line.second');
const smoothSecondLine = document.querySelector('line.smooth');

const icon = document.querySelector('#icon');

const hourText = document.querySelector('tspan.hour');
const minuteText = document.querySelector('tspan.minute');


const rendering = () => {
    const now = new Date();

    const hour = now.getHours()%12 / 12;
    hourLines.map(elm => elm.setAttribute('transform', `rotate(${hour * 360})`));
    hourLines[0].dataset['isZero']= hour === 0;

    const minute = now.getMinutes()/60;
    minuteLines.map(elm => elm.setAttribute('transform', `rotate(${minute * 360})`));
    minuteLines[0].dataset['isZero']= minute === 0;

    const second = now.getSeconds()/60;
    secondLine.setAttribute('transform', `rotate(${second * 360})`);
    secondLine.dataset['isZero']= second === 0;

    const smoothSecond = now.getSeconds()/60 + now.getMilliseconds()/1000/60;
    smoothSecondLine.setAttribute('transform', `rotate(${smoothSecond * 360})`);

    hourText.innerHTML = String(now.getHours()).padStart(2, ' ');
    minuteText.innerHTML = String(now.getMinutes()).padStart(2, '0');

    requestAnimationFrame(rendering);
};

setTimeout(rendering, 10);


const updateIcon = () => {
    document.querySelector('link[rel="icon"]').href = 'data:image/svg+xml,' + encodeURIComponent(icon.outerHTML);
};

updateIcon();
setInterval(updateIcon, 10*1000);
