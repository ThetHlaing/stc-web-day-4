
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
        adminView.init();
    },
    setCurrentCat : function(cat){
        model.currentCat = cat;
        catView.render();
    },
    getCats : function(){
        return model.cats;
    },
    updateCurrentCat : function(cat){
        model.currentCat.name = cat.name;
        model.currentCat.imgSrc = cat.imgSrc;
        model.currentCat.clickCount = cat.clickCount;
        
        catView.render();
        catListView.render();
    },
    getCurrentCat: function(){
        return model.currentCat;
    },
    inreaseClickCount: function(){
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

        this.catImageElem.addEventListener('click',function(){
            octopus.inreaseClickCount();
        });

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
        this.render();
    },

    render: function () {        
        const cats = octopus.getCats();
        this.catListElem.innerHtml = '';
        //loops
        for(let i = 0 ; i < cats.length; i++ ){
            const newLiElement = this.buildLiElement(cats[i]);
            this.catListElem.appendChild(newLiElement);
        }

            
    },

    buildLiElement: function (cat) {
        // make a new cat list item and set its text
        //Create a click event to change the current cat        
        const newLi = document.createElement('li');
        newLi.textContent = cat.name;
        /// add content and attach function
        newLi.addEventListener('click',function(){
            octopus.setCurrentCat(cat);
        });
        return newLi;
    }
};

const adminView = {
    init: function(){
        
        this.adminButton = document.getElementById("btnadmin");
        this.adminPanel = document.getElementById("admin-panel");
        this.nameInput = document.getElementById("input-cat-name");
        this.imageInput = document.getElementById("input-cat-image");
        this.clickCountInput = document.getElementById("input-click-count");                
        this.saveButton = document.getElementById("btnsave");
        this.cancelButton = document.getElementById("btncancel");

        this.adminButton.addEventListener("click",function(){
            adminView.render();
        });
        this.cancelButton.addEventListener("click",function(){
            adminView.hide();
        });
        this.saveButton.addEventListener("click",function(){
            adminView.saveCatInformation();
            adminView.hide();
        });

        this.hide();
    },
    render:function(){        
        console.log("render admin view");
        var cat = octopus.getCurrentCat();
        this.nameInput.value = cat.name;
        this.imageInput.value = cat.imgSrc;
        this.clickCountInput.value = cat.clickCount;
        this.adminPanel.style.display = "block";
    },
    hide:function(){
        this.adminPanel.style.display = "none";
    },
    saveCatInformation: function(){
        const updatedCat = {};
        updatedCat.name = this.nameInput.value;
        updatedCat.imgSrc = this.imageInput.value;
        updatedCat.clickCount = this.clickCountInput.value;
        octopus.updateCurrentCat(updatedCat);        
    }

}

// make it go!
octopus.init();
