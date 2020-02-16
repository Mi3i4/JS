Vue.component('cart-item', {
    methods: {
        increaseGood(item) {
            const item_in_cart = this.cart.filter(i => i.id === item.id)[0];
            if (item_in_cart) {
                item_in_cart.counter++;
            } else {
                return alert('нет такого товара');
            }
        },
        decreaseGood(item) {
            const item_in_cart = this.cart.filter(i => i.id === item.id)[0];
            if (item_in_cart) {
                if (item_in_cart.counter === 0) {
                    this.cart.slice(0, 1);
                } else {
                    item_in_cart.counter--;
                }
            }
        },
    },
    props: [
        'item',
        'goods',
        'cart',
    ],
    template: `
        <div>
            <div>
                <button class="add-item-button" @click="increaseGood(item)">+</button>
                <button class="remove-item-button" @click="decreaseGood(item)">-</button>
            </div>
            <div>
                <h2 class="cart-title">{{ item.title }}</h2>
                <p>{{ item.price }}</p><h2 class="cart-title">Quantity</h2><p>{{ item.counter }}</p>
                <button class="delete-item-button" @click="$emit('delete', item)">Delete</button>
            </div>
        </div>
    `,
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        cart: [],
        counter: 0
    },
    computed: {
        cartCount() {
            return this.cart.reduce((acc, item) => acc + item.counter, 0);
        },
    },
    methods: {
         async getGoods() {
             let response = await fetch("https://raw.githubusercontent.com/Mi3i4/JS/master/goods.json");
             this.goods = await response.json();
        },
        addInCart(item) {
             const item_in_cart = this.cart.filter(i => i.id === item.id)[0];
             if (item_in_cart) {
                 item_in_cart.counter++;
                 return;
             }
             const item_cart = Object.assign({
                 counter: 1,
             }, item);
             this.cart.push(item_cart);
        },
        cleanCart() {
            this.cart = [];
        },
        deleteGood(item) {
            this.cart = this.cart.filter((i) => i.id !== item.id);
        },
    },
    mounted() {
        try {
            this.getGoods();
        }catch (e) {
            console.log(e);
        }
    }
});

