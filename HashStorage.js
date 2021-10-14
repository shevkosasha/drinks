class HashStorage {
    constructor() {
            this.storage = {}; 
        }
        add(key, value) {
            this.storage[key] = value; 
            //console.log("addValue() - added");
        }
        getValue(key) {
            if(!(key in this.storage)) {
                //console.log("getValue() - No matches");
                return undefined;
            } else {
                //console.log("getValue() - got it");
                return this.storage[key]; 
            } 
        }
        deleteValue(key) {
            if(!(key in this.storage)) {
                //console.log("deleteValue(key) -No matches");
                return false;
            } else {
                //console.log("deleteValue(key) - deleted");
                return delete this.storage[key];
            }            
        }
        getKeys() {
            return Object.keys(this.storage);
        }
    }