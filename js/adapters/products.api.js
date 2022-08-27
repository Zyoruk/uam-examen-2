const MATERIALS = ['gold', 'silver', 'steel']
const CATS = ['bracelet', 'necklace', 'pack']
const FILTERS = ['new', 'sale']

const getRandom = (limit) => Math.floor(Math.random() * limit);
const getRandomFromArr = (arr) => () =>  arr[getRandom(arr.length)]
const getRandomCat = getRandomFromArr(CATS)
const getRandomFilter = getRandomFromArr(FILTERS)
const getRandomMaterial = getRandomFromArr(MATERIALS)

const getProd = (id, filters) => { 
    const base = { 
        id,
        title: 'Pulsera de Cristales',
        description: 'Pulsera de cristales hecha a mano, cada uno de los cristales fue pegado a mano.',
        price: '15.000',
        img: '../images/Product-placeholder.png'
    }
    const {materials, subfilters, categories} = filters;
    return { 
        ...base,
        cat: categories.length === 0 ? getRandomCat() : getRandomFromArr(categories)(),
        filter: subfilters.length === 0 ? getRandomFilter() : getRandomFromArr(subfilters)(),
        material: materials.length === 0 ? getRandomMaterial() : getRandomFromArr(materials)(),
    }
}

class ProductData {
    static #MAX_DATA_O = 8;
    /**
     * @type ProductData
     */
    static #instance
    #data = [];
    #filters;

    constructor() { 
        this.#filters = {
            materials: [],
            categories: [],
            subfilters: []
        };
        this.#data = this.#getMoreData();
    }

    static getInstance() { 
        if (!ProductData.#instance)
            ProductData.#instance = new ProductData();
        return ProductData.#instance;
    }

    #getMoreData() {
        const data = [];
        for(let i = 0; i < ProductData.#MAX_DATA_O; i++) {
            data.push(getProd(i, this.#filters));
        }
        return data;
    }

    getData() { 
        return this.#data;
    }

    loadNext(){ 
        this.#data = [...this.#data, ...this.#getMoreData()];
        return this.#data;
    }

    removeFilter(filter, fValue) { 
        console.log({filter, fValue}, 'removing');
        this.#filters[filter] = this.#filters[filter].filter(value => value != fValue);
    }

    isFilterSet(filter, fValue) { 
        console.log({filter, fValue}, 'searching');
        return this.#filters[filter].some(value => value === fValue)
    }

    refreshData() { 
        this.#data = this.#getMoreData();
    }

    setFilters({materials = [], categories = [], subfilters = []}) {
        const {
            materials: _mats,
            categories: _cats,
            subfilters: _subs
        } = this.#filters;

        this.#filters = { 
            materials: [
                ..._mats,
                ...materials
            ],
            categories: [
                ..._cats,
                ...categories
            ],
            subfilters: [
                ..._subs,
                ...subfilters
            ]
        }
        console.log({
            incoming: {
                materials,
                categories,
                subfilters
            },
            prev: {
                materials: _mats,
                categories: _cats,
                subfilters: _subs
            },
            result: this.#filters
        }, 'adding')
    }
}

export default ProductData.getInstance();