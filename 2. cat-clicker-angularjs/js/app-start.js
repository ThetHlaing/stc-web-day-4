angular.module('catClickerApp', [])
    .controller('catClickerController', function () {
        const controller = this;

        //model
        controller.cats = [
            {
                clickCount: 0,
                name: 'Tabby',
                imgSrc: 'img/434164568_fea0ad4013_z.jpg',
            },
            {
                clickCount: 0,
                name: 'Tiger',
                imgSrc: 'img/4154543904_6e2428c421_z.jpg',
            },
            {
                clickCount: 0,
                name: 'Scaredy',
                imgSrc: 'img/22252709_010df3379e_z.jpg',
            },
            {
                clickCount: 0,
                name: 'Shadow',
                imgSrc: 'img/1413379559_412a540d29_z.jpg',
            },
            {
                clickCount: 0,
                name: 'Sleepy',
                imgSrc: 'img/9648464288_2516b35537_z.jpg',
            }];
        controller.currentCat = {};        

    });