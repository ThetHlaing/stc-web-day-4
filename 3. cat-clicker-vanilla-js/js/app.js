
/* ======= Model ======= */

const model = {
    currentCat: null,
    cats: [
        {
            clickCount: 0,
            name: 'Tabby',
            imgSrc: 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount: 0,
            name: 'Tiger',
            imgSrc: 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount: 0,
            name: 'Scaredy',
            imgSrc: 'img/22252709_010df3379e_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount: 0,
            name: 'Shadow',
            imgSrc: 'img/1413379559_412a540d29_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount: 0,
            name: 'Sleepy',
            imgSrc: 'img/9648464288_2516b35537_z.jpg',
            imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

const octopus = {

    init: function () {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat: function () {
        return model.currentCat;
    },

    getCats: function () {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function () {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View ======= */

const catView = {

    init: function () {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function () {
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function () {
        // update the DOM elements with values from the current cat
        const currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

const catListView = {

    init: function () {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function () {        
        // get the cats we'll be rendering from the octopus
        const cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (let i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            const cat = cats[i];

            //create li element with cat obj
            const elem = this.buildLiElement(cat);
            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    },

    buildLiElement: function (cat) {
        // make a new cat list item and set its text
        elem = document.createElement('li');
        elem.textContent = cat.name;

        elem.addEventListener('click', (function () {
                octopus.setCurrentCat(cat);
                catView.render();
        }));

        return elem;
    }
};

// make it go!
octopus.init();
