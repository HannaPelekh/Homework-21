import axios from "axios";

export default class Http {
    #API_URL = "http://nestapi-env.eba-9kgvuxij.eu-central-1.elasticbeanstalk.com/todos/";

    get() {
        return axios(this.#API_URL).then((r) => r.data);
    }
    create(item){
        return axios.post(this.#API_URL, item).then((r) => r.data);
    }        
    update(id, item) {
        return axios.put(this.#API_URL + id, item).then((r) => r.data);
    }    
    delete(id){        
        return axios.delete(this.#API_URL + id).then((r) => r.data);
    }
 
}