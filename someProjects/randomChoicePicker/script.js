const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value);

    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = '';
        }, 10);

        randomSelect()
    }
});

function createTags(input){
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());
    //remove old tags
    tagsEl.innerHTML = "";
    //create tag elements again
    tags.forEach(tagText => {
        const tagEl = document.createElement('span');

        tagEl.classList.add('tag');

        tagEl.innerText = tagText;
        tagsEl.appendChild(tagEl);
    })
}

function randomSelect(){
    const times = 30;
    
    //каждые 100мс вызываем случайный выбор тэга, окрашиваем его
    //и возвращаем цвет по умолчанию
    const interval = setInterval(() => {
        const randomTag = pickRandomTag();

        highlightTag(randomTag);

        setTimeout(() => {
            unhighlightTag(randomTag);
        }, 100);
    }, 100);
    //через 30 100-миллисекундных тиков очистить интервал
    //и под конец через 100мс перекрасить последний тэг
    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => {
            const randomTag = pickRandomTag();
            highlightTag(randomTag);
        }, 100);
    }, times * 100);
}

function pickRandomTag(){
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag){
    tag.classList.add('highlight');
}

function unhighlightTag(tag){
    tag.classList.remove('highlight');
}