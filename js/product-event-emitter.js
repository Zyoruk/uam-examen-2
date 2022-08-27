import CustomEventEmitter from "./event-emitter.js";

class ProductEventEmitter { 
    #eventEmitter; // Class Composition
    static #instance;

    constructor() { 
        this.#eventEmitter = new CustomEventEmitter();
    }

    static getInstance() { 
        if(!ProductEventEmitter.#instance) ProductEventEmitter.#instance = new ProductEventEmitter();
        return ProductEventEmitter.#instance;
    }

    onFilterChange(handler) { 
        this.#eventEmitter.on('filter-change',  handler);
    }

    emitFilterChange(filters) {
        this.#eventEmitter.emit('filter-change', filters);
    }
}

export default ProductEventEmitter.getInstance();