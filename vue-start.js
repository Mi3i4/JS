const app = new Vue({
    el: '#app',
    data: {
        name: 'Ivan',
        motorName: ['Honda', 'BMW', 'Ducati', 'Kawasaki']
    },
    computed: {
        upperName() {
            return this.name.toUpperCase();
        }
    },
    methods: {
        clickHandler(name) {
            console.log(name);
        }
    },
    mounted() {
        this.clickHandler(this.name);
    }
});

