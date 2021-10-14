const coctailsStorage = new HashStorage();
//add def coctails
function Coctail (name, isAlcoholic, ingredients, textRecipe){
    this.name = name;
    this.isAlcoholic = isAlcoholic;
    //this.isAlcoholicStr =  (isAlcoholic)?"Да":"Нет";
    this.ingredients = ingredients;
    this.textRecipe = textRecipe;
    coctailsStorage.add(this.name, {name:this.name, 
                                    isAlcoholic:this.isAlcoholic,
                                    //isAlcoholicStr: this.isAlcoholicStr, 
                                    ingredients:this.ingredients, 
                                    textRecipe:this.textRecipe});
}
const Margo = new Coctail("Margo",
                          true,
                          ["Водка Finlandia 50мл","Кофейный ликер 25мл","Лед в кубиках 120 г"],
                          "Наполни стакан кубиками льда доверху, затем налей кофейный ликер 25 мл, водку 50 мл и размешай коктейльной ложкой.",
                          "dfgf"
                          );

const PinaColada = new Coctail("PinaColada",
                          true,
                          ["50 мл светлого рома","30 мл кокосового молока","50 мл ананасового сока"],
                          "Ингредиенты вместе с дробленым льдом перемешиваются в блендере (метод «бленд»). Коктейль подается в большом стакане типа гоблет или харрикейн с соломинкой и украшается долькой ананаса и коктейльной вишней.");

const Mohito = new Coctail("Mohito",
                          false,
                          ["45 мл светлого рома","6 веток перечной мяты","20 мл свежевыжатого сока лайма","2 чайные ложки белого сахара","газированная вода"],
                          "Листья мяты разминаются с сахаром и соком лайма, наполняют стакан дроблёным льдом, перемешивают, добавляют ром и содовую. Коктейль подается в бокале хайбол (высокий стакан) с соломинкой, украшается долькой лайма и листками мяты");

//console.log(coctailsStorage.getValue(name.autor)); 
console.log("---------");

