var Cat = /** @class */ (function () {
    function Cat(name, type) {
        this.name = name;
        this.type = type;
    }
    return Cat;
}());
var cats = [];
var cat1 = new Cat("Michi", "Siamees");
var cat2 = new Cat("Pelusa", "Pers");
cats.push(cat1);
cats.push(cat2);
for (var _i = 0, cats_1 = cats; _i < cats_1.length; _i++) {
    var cat = cats_1[_i];
    console.log("De kat ".concat(cat.name, " is een ").concat(cat.type));
    console.log("De kat " + cat.name + " is een " + cat.type);
}
