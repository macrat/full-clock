const analog = document.querySelector('svg#analog');

const hourLines = [...document.querySelectorAll('line.hour')];
const minuteLines = [...document.querySelectorAll('line.minute')];
const secondLine = document.querySelector('line.second');
const smoothSecondLine = document.querySelector('line.smooth');

const icon = document.querySelector('svg#icon');

const hourText = document.querySelector('tspan.hour');
const minuteText = document.querySelector('tspan.minute');


const rendering = () => {
    const now = new Date();

    if (400 <= now.getMilliseconds() && now.getMilliseconds() <= 600) {
        analog.classList.add('stop-motion');
    } else {
        analog.classList.remove('stop-motion');
    }

    let hour = now.getHours()%12 / 12;
    if (hour === 0 && now.getMilliseconds() < 500) hour = 1;
    hourLines.map(elm => elm.setAttribute('transform', `rotate(${hour * 360})`));

    let minute = now.getMinutes()/60;
    if (minute === 0 && now.getMilliseconds() < 500) minute = 1;
    minuteLines.map(elm => elm.setAttribute('transform', `rotate(${minute * 360})`));

    let second = now.getSeconds()/60;
    if (second === 0 && now.getMilliseconds() < 500) second = 1;
    secondLine.setAttribute('transform', `rotate(${second * 360})`);

    const smoothSecond = now.getSeconds()/60 + now.getMilliseconds()/1000/60;
    if (smoothSecond === 0 && now.getMilliseconds() < 500) smoothSecond = 1;
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
