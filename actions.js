
// show/hide modal div & set btns.onclick functions
let modalBtns = document.querySelectorAll(".btn");
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");
modalBtns.forEach(item => {
    item.onclick = ()  => {       
        modal.style.display = "block";
        if (item.id == "modal_add") addRecipe();
        if (item.id == "modal_change") changeRecipe();
        if (item.id == "modal_del") delRecipe();
        if (item.id == "modal_getOne") showRecipe(); 
        if (item.id == "modal_getList") showAll();         
    };
});
closeBtn.onclick = function(){    
    document.getElementById("queries").style.display = "none";
    document.getElementById("add_recipe_div").style.display = "none";
    document.getElementById("del_recipe_div").style.display = "none";
    document.getElementById("show_recipe_div").style.display = "none";
    modal.style.display = "none";     
};

//add button
function addRecipe(){    
    //console.log("Hi from addRecipe fun");    
    document.getElementById("add_recipe_div").style.display = "block"; 
    
    let btn = document.getElementById("add_recipe_button");
    btn.innerText = "Добавить";
    btn.onclick = function() {            
        const name = document.getElementById("coctailName").value;
        if (!name)  {alert("Введите хотя бы назание напитка");}
        else {
            if (coctailsStorage.getValue(name)) {alert("Такой напиток в базе уже имеется"); }
            else {
                const isAlcoholic = document.getElementById("isAlcoholic").checked;
                const ingredients = document.getElementById("ingredients").value.split(",");
                const textRecipe = document.getElementById("recipe").value;

                //add to coctail storage
                coctailsStorage.add(name, {name, isAlcoholic, ingredients, textRecipe});                    
                //hide add_recipe_div & modal       
                document.getElementById("add_recipe_div").style.display = "none"; 
                modal.style.display = "none";
                //refresh list of coctails if it is on
                if (document.getElementById("all_recipes")) {showAll();}
            }
        }  
    };  
}
//change button
function changeRecipe(){
    document.getElementById("show_recipe_div").style.display = "block";
    // Show coctail
    let showBtn = document.getElementById("show_recipe_button");
    showBtn.onclick = function() {        
        
        //get typed value and object from CoctailStorage   
        let o = document.getElementById("showCoctailName").value;
        //show alert if there is no matches in DB, else make description block        
        if (!coctailsStorage.getValue(o)) {alert("Такого напитка в базе нет"); } 
        else {
            //hide input field for showRecipe
            document.getElementById("show_recipe_div").style.display = "none"; 
            
            let obj = coctailsStorage.getValue(o);  
            
            document.getElementById("coctailName").value = obj.name;
            document.getElementById("isAlcoholic").checked = obj.isAlcoholic;
            document.getElementById("ingredients").value = obj.ingredients.join(",\n");
            document.getElementById("recipe").value = obj.textRecipe;
            let btn = document.getElementById("add_recipe_button");
            btn.innerText = "Изменить";
            document.getElementById("add_recipe_div").style.display = "block";

            btn.onclick = function(){
                if (!document.getElementById("coctailName").value) {alert("Название напитка удалять не стоило");}
                else {
                    obj.name = document.getElementById("coctailName").value;
                    obj.isAlcoholic =  document.getElementById("isAlcoholic").checked;
                    obj.ingredients = document.getElementById("ingredients").value.split(",");
                    obj.textRecipe = document.getElementById("recipe").value;
                    //hide add_recipe_div & modal       
                    document.getElementById("add_recipe_div").style.display = "none"; 
                    modal.style.display = "none";
                    //refresh list of coctails if it is on
                    if (document.getElementById("all_recipes")) {showAll();}  
                }                               
            }
        }    
    };
}

//delete button
function delRecipe(){
    //console.log("Hi from delRecipe fun");
    document.getElementById("del_recipe_div").style.display = "block"; 
    // Delete coctail
    let delbtn = document.getElementById("del_recipe_button");
    delbtn.onclick = function() {               
        let name = document.getElementById("delCoctailName").value;
        // if there is no matches show alert about it, else go on
        if (!coctailsStorage.getValue(name)) {
            alert("Такого напитка в базе нет");
        } 
        else { 
            coctailsStorage.deleteValue(name);                    
            //refresh list of coctails if it is on
            document.getElementById("del_recipe_div").style.display = "none"; 
            modal.style.display = "none"; 
            if (document.getElementById("all_recipes")) {showAll();}
        }      
    }; 
}
//show button
function showRecipe(){
    //console.log("Hi from showRecipe fun");
    document.getElementById("show_recipe_div").style.display = "block";
    // Show coctail
    let showBtn = document.getElementById("show_recipe_button");
    showBtn.onclick = function() {        
        //get typed value and object from CoctailStorage   
        let o = document.getElementById("showCoctailName").value;
        //show alert if there is no matches in DB, else make description block        
        if (!coctailsStorage.getValue(o)) {alert("Такого напитка в базе нет"); } 
        else {
            //remove all_recipes block if it exists for demonstrate only one recipe
            if (document.getElementById("all_recipes")){
                document.getElementById("all_recipes").remove();
            } 
            //hide input field for showRecipe
            document.getElementById("show_recipe_div").style.display = "none"; 
            modal.style.display = "none"; 

            let obj = coctailsStorage.getValue(o);        
            //build html & output result
            if (document.getElementById("description")){
                document.getElementById("description").innerHTML = "";
            } else {
                let recipeDiv = document.createElement('div'); 
                recipeDiv.id = "description";  
                document.getElementById("root").appendChild(recipeDiv);
            }
          
            //make recipe block
            let caption = document.createElement('h1');
            caption.id = "caption_recipe";
            caption.innerText = `${obj.name}`;
            document.getElementById("description").appendChild(caption);

            let p = document.createElement('p');
            p.className = "recipe";
            let isAlc = (obj.isAlcoholic)?`<span style='font-style: italic; color: red;'>да</span>`:
                                        `<span style='font-style: italic; color: green'>нет</span>`;
            let firstStr = `Коктейль <span style='font-weight: bold'>${obj.name}</span>, алкогольный (${isAlc})`;               
            let ingredientsStr = "<ol><li>" + obj.ingredients.join(',</li><li>') + "</li></ol>";////ingrs.join(',<br>');       
            p.innerHTML = `${firstStr}` + "<br><br><span style='font-style: italic'>Ингредиенты:</span><br>" + ingredientsStr + "<p>Рецепт приготовления:<br>" + obj.textRecipe + "</p>";
            document.getElementById("description").appendChild(p); 
        }    
    };
} 

function showAll(){
    modal.style.display = "none";
    //remove one recipe div
    if (document.getElementById("description")){
        document.getElementById("description").remove();
    }  
    // refresh all recipe div if it exists or create it 
    if (document.getElementById("all_recipes")){
        document.getElementById("all_recipes").innerHTML = "";
    } else {
        let allrecipeDiv = document.createElement('div'); 
        allrecipeDiv.id = "all_recipes";  
        document.getElementById("root").appendChild(allrecipeDiv);
    }
    //make a table of result
    let divAll = document.createElement('div');
    divAll.id = "allCoctails";
    document.getElementById("all_recipes").appendChild(divAll);
    //make a caption of the table    
    let table = "<table id='allCoctails_table'><caption><h1>List of coctails</h1>";
    table += "<h4 id='summary'>В базе имеются рецепты следующих коктейлей: " + coctailsStorage.getKeys().join(', ') + ". </h4></caption>";
    table += "<tr id='thRow'><th>#</th><th>Наименование</th><th>Напиток содержит алкоголь</th><th>Ингредиенты</th><th>Рецепт</th</tr>";
    document.getElementById("all_recipes").innerHTML = table;
    //fill the table with coctail properties
    let i = 1;
    for (let item in coctailsStorage.storage) {        
        let tr = document.createElement('tr');
        tr.id = `${item}`;        
        document.getElementById("allCoctails_table").appendChild(tr);
        let td = document.createElement('td');
        td.id = `${item}_${i}`; 
        td.innerText = `${i}`;
        document.getElementById(`${item}`).appendChild(td);
        var obj = coctailsStorage.getValue(item);
        for (let key in obj) {            
            let tdkey = document.createElement('td');
            tdkey.id = `${item}_${key}`;
            if (key == "isAlcoholic") {tdkey.innerHTML = (obj[key])?"<span style='color: red;'>Да</span>":"<span style='color: green;'>Нет</span>";}
            else if (key == "ingredients") {tdkey.innerHTML = obj[key].join(',<br>');}            
            else {tdkey.innerText = `${obj[key]}`;}
            document.getElementById(`${item}`).appendChild(tdkey);
        }       
        i++;
    }
}