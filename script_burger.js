const Ham = [
    {name: 'small', price: '50', calories: '20'},
    {name: 'big', price: '100', calories: '40'},
    {add_name: 'paprika', add_price: '15', add_calories: '0'},
    {add_name: 'sauce', add_price: '20', add_calories: '5'},
];

const Models = [
    {model_name: 'cheese', model_price: '10', model_calories: '20'},
    {model_name: 'salad', model_price: '20', model_calories: '5'},
    {model_name: 'potato', model_price: '15', model_calories: '10'},
];
class HamMain {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class HamModels extends HamMain {
    constructor (name, price, calories, model_name, model_price, model_calories) {
        super(name, price, calories);
        this.model_name = model_name;
        this.model_price = model_price;
        this.model_calories = model_calories;
    }
    totalName() {
        return this.full_name = this.name + ' with ' + this.model_name;
    }
    totalPrice() {
        return this.full_price = parseInt(this.price) + parseInt(this.model_price);
    }
    totalCalc() {
        return this.total_calories = parseInt(this.calories) + parseInt(this.model_calories);
    }
}

const burg = new HamModels(Ham[0].name, Ham[0].price, Ham[0].calories, Models[2].model_name, Models[2].model_price, Models[2].model_calories);

burg.totalName();
burg.totalPrice();
burg.totalCalc();
console.log(burg);

// class HamAdds extends HamMain {
//     constructor(name, price, calories) {
//         super(name, price, calories);
//     }
// }
//
//
// const Hamburger = [];

