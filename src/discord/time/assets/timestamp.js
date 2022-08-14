let timeElement = document.getElementById("time")

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function relativeTime(time = new Date()) {
    var now = new Date()
    var diff = now.getTime() - time.getTime()
    var seconds = Math.floor(diff / 1000)
    var minutes = Math.floor(diff / 60000)
    var hours = Math.floor(diff / 3600000)
    var days = Math.floor(diff / 86400000)
    var weeks = Math.floor(diff / 604800000)
    var months = Math.floor(diff / 2678400000)
    var format = new Intl.RelativeTimeFormat(navigator.language || navigator.userLanguage || "en-US", {numeric: "auto",style: "long"})
    if (seconds < 60 && seconds > -60) {
        return format.format(time.getSeconds()-now.getSeconds(), "seconds")
    } else if (minutes < 60 && minutes > -60) {
        return format.format(time.getMinutes()-now.getMinutes(), "minutes")
    } else if (hours < 24 && hours > -24) {
        return format.format(time.getHours()-now.getHours(), "hours")
    } else if (days < 7 && days > -7) {
        return format.format(time.getDay()-now.getDay(), "days")
    } else if (weeks < 4 && weeks > -4) {
        return format.format(Math.floor(time.getDate()/7), "weeks")
    } else if (months < 12 && months > -12) {
        return format.format(time.getMonth()-now.getMonth(), "months")
    } else {
        return format.format(time.getFullYear()-now.getFullYear(), "years")
    }
}


function updateTime(ev) {
    let time = new Date(ev.target.value);
    if(!isFinite(time)){
        document.getElementById("results").setAttribute("hidden", "true")
        return
    }
    let epoch = Math.round(time.getTime() / 1000)
    document.getElementById("results").removeAttribute("hidden")
    document.querySelector("span[id=d]").innerText = `Result: ${String(time.getMonth()+1).padStart(2, "0")}/${String(time.getDate()).padStart(2, "0")}/${time.getFullYear()}`
    document.querySelector("span[id=dd]").innerText = `Result: ${monthNames[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`
    document.querySelector("span[id=t]").innerText = `Result: ${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`
    document.querySelector("span[id=tt]").innerText = `Result: ${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}:${String(time.getSeconds()).padStart(2,"0")}`
    document.querySelector("span[id=f]").innerText = `Result: ${monthNames[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()} ${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`
    document.querySelector("span[id=nf]").innerText = `Result: ${monthNames[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()} ${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`
    document.querySelector("span[id=ff]").innerText = `Result: ${weekdays[time.getDay()]}, ${monthNames[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()} ${time.getHours()}:${String(time.getMinutes()).padStart(2, "0")}`
    document.querySelector("span[id=r]").innerText = `Result: ${relativeTime(time)}`

    document.querySelector("input[id=d]").value = `<t:${epoch}:d>`
    document.querySelector("input[id=dd]").value = `<t:${epoch}:D>`
    document.querySelector("input[id=t]").value = `<t:${epoch}:t>`
    document.querySelector("input[id=tt]").value = `<t:${epoch}:T>`
    document.querySelector("input[id=f]").value = `<t:${epoch}:f>`
    document.querySelector("input[id=nf]").value = `<t:${epoch}>`
    document.querySelector("input[id=ff]").value = `<t:${epoch}:F>`
    document.querySelector("input[id=r]").value = `<t:${epoch}:R>`
}

timeElement.addEventListener("change", updateTime)

document.querySelectorAll('input[readonly]').forEach(el => {
    el.addEventListener("click", async (ev) => {
        ev.target.select()
        if(typeof navigator.clipboard.writeText == "undefined"){
            document.execCommand("copy");
        }else{
            navigator.clipboard.writeText(ev.target.value);
        }
        await new Promise(resolve => setTimeout(resolve, 100))
        alert("Copied to clipboard")
    })
})
