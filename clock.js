const analog = document.querySelector('svg#analog');

const hourLines = [...document.querySelectorAll('line.hour')];
const minuteLines = [...document.querySelectorAll('line.minute')];
const secondLine = document.querySelector('line.second');
const smoothSecondLine = document.querySelector('line.smooth');

const icon = document.querySelector('svg#icon');

const hourTexts = document.querySelectorAll('span.hour span');
const minuteTexts = document.querySelectorAll('span.minute span');


const rendering = () => {
    const now = new Date();

    if (400 <= now.getMilliseconds() && now.getMilliseconds() <= 600) {
        analog.classList.add('stop-motion');
    } else {
        analog.classList.remove('stop-motion');
    }

    let second = now.getSeconds()/60;
    if (now.getSeconds() === 0 && now.getMilliseconds() < 500) second = 1;
    secondLine.setAttribute('transform', `rotate(${second * 360})`);

    let minute = now.getMinutes()/60;
    if (now.getMinutes() === 0 && now.getSeconds() === 0 && now.getMilliseconds() < 500) minute = 1;
    minuteLines.map(elm => elm.setAttribute('transform', `rotate(${minute * 360})`));

    let hour = now.getHours()%12 / 12 + now.getMinutes()/60/12;
    if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0 && now.getMilliseconds() < 500) hour = 1;
    hourLines.map(elm => elm.setAttribute('transform', `rotate(${hour * 360})`));

    const smoothSecond = now.getSeconds()/60 + now.getMilliseconds()/1000/60;
    smoothSecondLine.setAttribute('transform', `rotate(${smoothSecond * 360})`);

    [hourTexts[0].innerHTML, hourTexts[1].innerHTML] = String(now.getHours()).padStart(2, ' ');
    [minuteTexts[0].innerHTML, minuteTexts[1].innerHTML] = String(now.getMinutes()).padStart(2, '0');

    requestAnimationFrame(rendering);
};

setTimeout(rendering, 10);


const updateIcon = () => {
    document.querySelector('link[rel="icon"][type="image/svg+xml"]').href = 'data:image/svg+xml,' + encodeURIComponent(icon.outerHTML);
};

setTimeout(updateIcon, 100);
setInterval(updateIcon, 10*1000);
