(() => { 
    document.querySelectorAll('h5.accordion')
        .forEach(el =>  {
            el.addEventListener('click', () => { 
                const contentId = el.dataset.accordionContent;
                
                const content = document.getElementById(contentId);
                const isOpen = content.style.maxHeight !== '0px';

                if (isOpen){
                    console.log({isOpen, mh: content.style.maxHeight, sh: content.scrollHeight})
                    content.style.maxHeight = '0px';
                } else {
                    console.log({isOpen, mh: content.style.maxHeight, sh: content.scrollHeight})
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                el.classList.toggle("closed")
            })
        })
})();