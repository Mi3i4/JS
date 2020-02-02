const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        cart: [],
        counter: 0,
    },
    computed: {
        cartCount: function () {
            return this.cart.length;
        },
    },
    methods: {
         async getGoods() {
             let response = await fetch("https://raw.githubusercontent.com/Mi3i4/JS/master/goods.json");
             this.goods = await response.json();
        },
        addGood: function (event) {
            const button_id = event.target.id;
            const item = this.goods.filter(i => i.id == button_id)[0];
            if(item) {
                const id = item.id;
                const item_in_cart = this.cart.filter(i => i.id == id)[0];
                if(item_in_cart) {
                    item_in_cart.counter++;
                    return;
                }
                 this.cart.push(item);
            }else {
                alert('нет такого товара');
            }
        },
        cleanCart: function() {
            this.cart = [];
        },
        deleteGood: function(event) {
            const button_id = event.target.id;
            this.cart = this.cart.filter((i) => i.id != button_id);
        },
    },
    mounted() {
        try {
            this.getGoods();
        }catch (e) {
            console.log(e);
        }
        // console.log(this.data);
    }
});

