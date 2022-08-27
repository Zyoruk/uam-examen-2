import api from "./adapters/products.api.js"
import productEventEmitter from "./product-event-emitter.js";

(() => { 

    const getCardElement = (item) => {
        const cardContainer = document.createElement('div')
        cardContainer.classList.add('card--container')
        cardContainer.dataset.categories = item.cat;
        cardContainer.dataset.materials = item.material;
        cardContainer.dataset.subfilters = item.filter;
        const cardContent = document.createElement('div')
        cardContainer.classList.add('card--content')
        const cardFront = document.createElement('div')
        cardFront.classList.add('card--front')
        const cardImg = document.createElement('img')
        cardImg.height = 220;
        cardImg.width = 220;
        cardImg.src = item.img;
        const cardBack = document.createElement('div')
        cardBack.classList.add('card--back')
        const title = document.createElement('h3')
        title.innerText = item.title;
        const price = document.createElement('div')
        const strong = document.createElement('strong')
        strong.innerHTML = `&#8353;${item.price}` 
        price.append(strong)
        const description = document.createElement('p')
        description.innerText = item.description;
        
        cardFront.append(cardImg);
        cardBack.append(title, price, description)
        cardContent.append(cardBack, cardFront)
        cardContainer.append(cardContent)
        return cardContainer
    }

    const buildCards = (cards) =>  {
        const cardList = document.querySelector('.card--list');
        const cardItems = cards.map(getCardElement);
        cardList.append(...cardItems);
    }

    const clear = () => { 
        document.querySelector('.card--list').innerHTML = '';
    }

    buildCards(api.getData());

    const loadMore = () => { 
        buildCards(api.loadNext());
    }

    document.querySelector('.show-more').addEventListener('click', loadMore);
    
    productEventEmitter.onFilterChange((filters) => { 
        console.log(filters, 'received');
        const entries = Object.entries(filters);
        entries.forEach(([key, value]) =>  {
            if (api.isFilterSet(key, value[0])) {
                api.removeFilter(key, value[0])
            } else { 
                api.setFilters({[key]: value})
            }
        })
        api.refreshData();
        clear();
        buildCards(api.getData())
    })
})();