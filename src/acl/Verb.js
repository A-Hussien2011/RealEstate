import {Condition} from "./Condition";

export class Verb {
    constructor(name) {
        this.name = name;
        this.endpoints = {};
    }

    addEndPoint(endpoint){
        let parameters = this.extractParams(endpoint);
        //TODO check if already found endpoint
        this.endpoints[endpoint] = new Condition(parameters);
        return this.endpoints[endpoint];
    }
    extractParams(endpoint){
        let params = endpoint.split(':');
        params.splice(0,1);
        for(let i = 0; i < params.length; i++){
            if(params[i].charAt(params[i].length - 1) === '/'){
                params[i] = params[i].substring(0, params[i].length - 1)
            }
        }
        this.params = params
    }
    checkEndpoint (newEndpoint) {
        let endpoints = this.endpoints;
        function equalityCheck (endpoint1, endpoint2) {
            let condition = endpoints[endpoint1];
            endpoint1 = endpoint1.split('/');
            endpoint2 = endpoint2.split('/');
            let params = {};
            if(endpoint1.length !== endpoint2.length){
                return {isValid: false, params:{}}
            }
            for(let i = 0; i < endpoint1.length; i++){
                if(endpoint1[i].charAt(0) === ':'){
                    params[endpoint1[i].substring(1, endpoint1[i].length)] = endpoint2[i];
                } else if(endpoint2[i] !== endpoint1[i]){
                    return {isValid: false, params:{}};
                }
            }
            return {isValid: true, params, condition};
        };

        for(let endpoint in this.endpoints){
            let checker = equalityCheck(endpoint, newEndpoint);
            if (checker.isValid){
                return checker;
            }
        }
        return {isValid: false, params: {}};
    }

    from = this.addEndPoint;
    to = this.addEndPoint;
    containsEndpoint = this.checkEndpoint;
}