// const API_URL = 'https://raw.githubusercontent.com/Mi3i4/JS/master';
// function makeGetRequest(url, cb) {
//     let xhr;
//     if(window.XMLHttpRequest){
//         xhr = new window.XMLHttpRequest();
//     }else {
//         xhr = new ActiveXObject('Micrisoft.XMLHTTP');
//     }
//     xhr.onreadystatechange = function () {
//         if(xhr.readyState === 4 && xhr.status === 200){
//             const body = JSON.parse(xhr.responseText);
//             console.log(xhr)
//             cb(body);
//         }
//     };
//     xhr.open('GET', url);
//     xhr.send();
// }

class GoodsItem {
    constructor(title = 'Без имени', price = '', id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }
    render() {
        return `<div class="goods-item">
                    <h2 class="title">${this.title}</h2>
                    <p>${this.price} $</p>
                    <button id="${this.id}" class="item-button">Add</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    // fetchGoods(cb) {
    //     makeGetRequest(`${API_URL}/goods.json`, (goods) => {
    //         this.goods = goods;
    //         cb();
    //     })
    // }

    async getGoods() {
        let response = await fetch(`https://raw.githubusercontent.com/Mi3i4/JS/master/goods.json`); // завершается с заголовками ответа
        let result = await response.json(); // читать тело ответа в формате JSON
        console.log(result);
        result.forEach(i => {this.goods.push(i)});
        this.render();
    }
        // fetch('https://raw.githubusercontent.com/Mi3i4/JS/master/goods.json')
        //     .then(response => response.json())
        //     .then(
        //         function(response) {
        //             // if (response.status !== 200) {
        //             //     console.log('Looks like there was a problem. Status Code: ' +
        //             //         response.status);
        //             //     return;
        //             // }
        //             response.json().then(function(data) {
        //                 console.log(data);
        //                 // console.log(response);
        //                 // let a = this.goods;
        //                 // a.concat(data);
        //                 // console.log(this.goods);
        //             });
        //         }
        //     )
        //     .catch(function(err) {
        //         console.log('Error', err);
        //     });



    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

}

class Cart extends GoodsList {
    cart = [];
    addListenerDeleteButton(){
        document.querySelectorAll('.delete-item-button').forEach(i => {
            i.addEventListener("click", this.deleteGood);
        });
    }

    addListenerAddButton(){
        document.querySelectorAll('.add-item-button').forEach(i => {
            i.addEventListener("click", this.increaseGood);
        });
    }

    addListenerRemoveButton(){
        document.querySelectorAll('.remove-item-button').forEach(i => {
            i.addEventListener("click", this.decreaseGood);
        });
    }

    constructor() {
        super();
        document.querySelectorAll('.item-button').forEach(i => {
            i.addEventListener("click", this.addGood);
        });
        this.render();
        document.querySelector('.clean-cart-button').addEventListener("click", this.cleanCart);
        this.getGoods();
    }
    addGood = (event) => {
       const button_id = event.target.id;
       const item = this.goods.filter((i) => i.id == button_id)[0];
       if(item) {
           const {title, price, id} = item;
           //проверяем есть ли такой товар в корзине
           const item_in_cart = this.cart.filter(i => i.id == id)[0];
           if(item_in_cart){
               item_in_cart.count++;
               this.render();
               return;
           }
           const cart_item = new CartItem(title, price, id);
           this.cart.push(cart_item);
           this.render();
           return;
       }
       else {
           alert('нет такого товара');
       }
    };

    increaseGood = (event) => {
        const button_id = event.target.id;
        const item = this.goods.filter((i) => i.id == button_id)[0];
        if(item) {
            const {title, price, id} = item;
            //проверяем есть ли такой товар в корзине
            const item_in_cart = this.cart.filter(i => i.id == id)[0];
            if(item_in_cart){
                item_in_cart.count++;
                this.render();
                return;
            }
        }
        else {
            alert('нет такого товара');
        }
    };

    decreaseGood = (event) => {
        const button_id = event.target.id;
        const item = this.goods.filter((i) => i.id == button_id)[0];
        if(item) {
            const {title, price, id} = item;
            //проверяем есть ли такой товар в корзине
            const item_in_cart = this.cart.filter(i => i.id == id)[0];
            if(item_in_cart){
                if(item_in_cart.count == 0){
                    this.cart.splice(0,1);
                    this.render();
                    return;
                } else {
                    item_in_cart.count--;
                    this.render();
                    return;
                }
            }
        }
        else {
            alert('нет такого товара');
        }
    };

    deleteGood = (event) => {
        const button_id = event.target.id;
        this.cart = this.cart.filter((i) => i.id != button_id);
        this.render();
    };

    cleanCart = () => {
        this.cart = [];
        this.render();
        return;
    };

    totalPrice() {
        let html = '';
        const sum = this.cart.reduce((accum, item) => {
                if(item.price) accum +=item.price * item.count;
                return accum;
            },0);
        html += sum;
        document.querySelector('.total-sum').innerHTML = html;
    }

    render() {
        let html = '';
        this.cart.forEach(i => html += i.render());
        document.querySelector('.cart').innerHTML = html;
        this.addListenerDeleteButton();
        this.addListenerAddButton();
        this.addListenerRemoveButton();
        this.totalPrice();
    }
}

class CartItem extends GoodsItem {
    count = 0;
    constructor(title, price, id) {
        super(title, price, id);
        this.count = 1;
    }
    render() {
        return `<div class="cart-item">
                    <div>
                        <button id="${this.id}" class="add-item-button">+</button>
                        <button id="${this.id}" class="remove-item-button">-</button>
                    </div>
                    <h2 class="cart-title">${this.title}</h2>
                    <p>${this.price}</p><h2 class="cart-title">Quantity</h2><p>${this.count}</p>
                    <button id="${this.id}" class="delete-item-button">Delete</button>
                </div>`;
    }
}

const list = new GoodsList();
list.getGoods(() => {
    list.render();
});
const item_cart = new Cart();
