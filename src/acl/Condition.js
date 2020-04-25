export class Condition {
    constructor(name) {
        this.name = name;
    }
    addCondition (func){
        this.currentCondition = func;
    }
    when = this.addCondition
}