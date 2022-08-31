window.onload = () => {
    "use strict";
  
    if ("serviceWorker" in navigator && document.URL.split(":")[0] !== "file") {
      navigator.serviceWorker.register("./sw.js");
    }
  }

let emojis = localStorage.getItem('emojis')
emojis = JSON.parse(emojis || '[]')

const copyToClipboard = (text) => {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.display = 'none'
    document.body.appendChild(textArea)
    textArea.select()
    textArea.setSelectionRange(0, textArea.value.length)
    navigator.clipboard.writeText(textArea.value)
    textArea.remove()
}

function cleanURL(url) {
    return url.replace(/\?.*$/, "");
}


let emoji_container = document.getElementById('emojis'),
    loadedCount = 0;
for(const emoji of emojis){
    let [name, url] = emoji;
    //use template from id emojitemplate
    let template = document.getElementById('emojitemplate').content.cloneNode(true);
    let emojiElement = template.querySelector('img')
    let emojiDelete = template.querySelector('.emoji-delete');
    emojiElement.src = url;
    emojiElement.alt = name;
    emojiElement.title = name;
    emojiElement.onclick = function(e){
        copyToClipboard(e.target.src);
        alert("Copied to clipboard");
    }
    emojiDelete.onclick = function(e){
        if(confirm("Are you sure you want to delete this emoji?")){
            emojis.splice(emojis.indexOf(emoji), 1);
            localStorage.setItem('emojis', JSON.stringify(emojis));
            location.reload();
        }
    }
    emoji_container.appendChild(template);
    loadedCount++;
}

let loadingcheck = setInterval(() => {
    if(loadedCount == Object.keys(emojis).length){
        document.querySelector('#emojis > .loading').remove();
        clearInterval(loadingcheck);
    }
}, 10);

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
document.getElementById('addemoji').onclick = function(e){
    e.preventDefault();
    let url = prompt('Enter the url of the emoji').trim();
    if(url == "" || urlRegex.test(url) == false || !url.includes("/emojis/")){
        alert("You must enter a valid url");
        return;
    }
    let name = prompt('Enter the name of the emoji (default is emoji\'s id)');
    if(name.trim() == "") name = cleanURL(url).split('/').pop().replace(/\.[^.]*$/, '');
    emojis.push([name, url]);
    localStorage.setItem('emojis', JSON.stringify(emojis));
    alert(`${name} has been added`);
    location.reload();
}