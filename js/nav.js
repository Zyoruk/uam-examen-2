(() => { 
    document.querySelectorAll('button.nav-btn')
        .forEach(a => { 
            a.addEventListener('click', () => { 
                window.location.assign(`/${a.dataset.nav}.html?${new URLSearchParams({
                    filter: a.dataset.navFilter
                }).toString()}`)
            })
        })
})();