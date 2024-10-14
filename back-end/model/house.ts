export class House{
    private id : number;
    private address : string;
    private type : string;

    constructor(id : number, address : string, type : string){
        this.id = id;
        this.address = address;
        this.type = type;
    }

    public getId() : number {
        return this.id;
    }

    public getAddress() : string {
        return this.address;
    }

    public getType() : string {
        return this.type;
    }

    public setId(id : number) {
        this.id = id;
    }

    public setAddress(address : string) {
        this.address = address;
    }

    public setType(type : string) {
        this.type = type;
    }

    public toString() : string {
        return "House [id=" + this.id + ", address=" + this.address + ", type=" + this.type + "]";
    }
}