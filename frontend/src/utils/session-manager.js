class PersistentStorage {

    static store(key, data = {}){
        if(!key)
            throw new Error("Storage key required");
        
        sessionStorage.setItem(key, JSON.stringify(data));
        
    }

    static fetch(key){
        if (!key)
            throw new Error("Storage key required");

        const result = sessionStorage.getItem(key);
        
        return result ? JSON.parse(result) : undefined;
    }
    
    static delete(key){
        if (!key)
            throw new Error("Storage key required");

        sessionStorage.removeItem(key);
    }

}

export default PersistentStorage;