import PersistentStorage from "./session-manager";

export const PostDataService = async (
    url,
    data,
    config = {}
) => {
    const app_details = (PersistentStorage.fetch('app'));
    const headers = {
        ...{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ app_details ? app_details['token'] : ""}`
        },
        ...config.headers
    }

    
    data = JSON.stringify(data);

    try {
        const response = await fetch(url, {
            method: "post",
            body: data,
            mode: "cors",
            headers: headers
        })
        
        const result = await response.json();

        return {data:result, statusCode: response.status};
        
    } catch (error) {
        error.statusCode = error.status ?? 404;
        error.message = "Failed to make request";
        throw error;
    }
};

export const PutDataService = async (
    url,
    data,
    config = {}
) => {
    const app_details = (PersistentStorage.fetch('app'));
    const headers = {
        ...{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ app_details ? app_details['token'] : ""}`
        },
        ...config.headers
    }

    
    data = JSON.stringify(data);

    try {
        const response = await fetch(url, {
            method: "put",
            body: data,
            mode: "cors",
            headers: headers
        })
        
        const result = await response.json();

        return {data:result, statusCode: response.status};
        
    } catch (error) {
        error.statusCode = error.status ?? 404;
        error.message = "Failed to make request";
        throw error;
    }
};


export const DeleteDataService = async (
    url,
    data,
    config = {}
) => {
    const app_details = (PersistentStorage.fetch('app'));
    const headers = {
        ...{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ app_details ? app_details['token'] : ""}`
        },
        ...config.headers
    }

    
    data = JSON.stringify(data);

    try {
        const response = await fetch(url, {
            method: "delete",
            body: data,
            mode: "cors",
            headers: headers
        })
        
        const result = await response.json();

        return {data:result, statusCode: response.status};
        
    } catch (error) {
        error.statusCode = error.status ?? 404;
        error.message = "Failed to make request";
        throw error;
    }
};

export const GetDataService = async (
    url,
    data,
    config = {}
) => {
    const app_details = (PersistentStorage.fetch('app'));
    const headers = {
        ...{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ app_details ? app_details['token'] : ""}`
        },
        ...config.headers
    }

    
    let params = [];
    for(let key in data){
        params.push(`${key}=${data[key]}`)
    }

    try {
        
        const response = await fetch(`${url}?${params.join("&")}`, {
            method: "get",
            mode: "cors",
            headers: headers
        })
        
        const result = await response.json();

        return {data:result, statusCode: response.status};
        
    } catch (error) {
        error.statusCode = error.status ?? 404;
        error.message = "Failed to make request";
        throw error;
    }
};

export function authRole(role) {
    switch (role) {
        case "ADMIN":
        case "SUPERVISOR":
        case "USER":
        case "OWNER":
            return true;

        default:
            return false;
    }
}
