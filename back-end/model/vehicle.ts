export class Vehicle {
    private id : number;
    private domain : string;
    private name : string;

    constructor(id : number, domain : string, name : string){
        this.id = id;
        this.domain = domain;
        this.name = name;
    }

    public getId() : number {
        return this.id;
    }

    public getDomain() : string {
        return this.domain;
    }

    public getName() : string {
        return this.name;
    }

    public setId(id : number) {
        this.id = id;
    }

    public setDomain(domain : string) {
        this.domain = domain;
    }

    public setName(name : string) {
        this.name = name;
    }

    public toString() : string {
        return "Vehicle [id=" + this.id + ", domain=" + this.domain + ", name=" + this.name + "]";
    }
}