import productEventEmitter from "./product-event-emitter.js";

(() => { 
    document.getElementById('filters')
        .querySelectorAll('input')
        .forEach(inputElement => { 
            inputElement.addEventListener('change', (event) => { 
                const {filterKey, filterValue} = event.target.dataset;
                const filter = {
                    [filterKey]: [filterValue]
                }
                console.log(filter, 'emitting')
                productEventEmitter.emitFilterChange(filter)
            })
        })
})();