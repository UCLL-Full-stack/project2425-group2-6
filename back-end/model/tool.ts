export class Tool{
    private id : number;
    private name : string;

    constructor(id : number, name : string){
        this.id = id;
        this.name = name;
    }

    public getId() : number {
        return this.id;
    }

    public getName() : string {
        return this.name;
    }

    public setId(id : number) {
        this.id = id;
    }

    public setName(name : string) {
        this.name = name;
    }

    public toString() : string {
        return "Tool [id=" + this.id + ", name=" + this.name + "]";
    }
}