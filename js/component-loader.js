(() => { 
    const loadPage = (href) =>
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", href, false);
        xmlhttp.send();
        return xmlhttp.responseText;
    }
    ["footer", "header"].forEach((href) => { 
        const target = document.getElementById(href)
        target.insertAdjacentHTML('beforeBegin', loadPage(`/components/${href}.html`))
    })
})()
