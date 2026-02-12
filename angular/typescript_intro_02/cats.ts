class Cat{
    name:string;
    type:string;
    
    constructor(name:string, type:string){
        this.name = name;
        this.type = type;
    }
}

const cats: Cat[] = [];

const cat1 = new Cat("Michi", "Siamees");
const cat2 = new Cat("Pelusa", "Pers");
cats.push(cat1);
cats.push(cat2);

for(const cat of cats){
    console.log(`De kat ${cat.name} is een ${cat.type}`);
    console.log("De kat " + cat.name + " is een " + cat.type);
}
