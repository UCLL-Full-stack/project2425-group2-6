import { Employee } from "./employee";
import { Material } from "./material";
import { Room } from "./room";

export class Tool{
    private id : number;
    private name : string;
    private employees : Array<Employee> = [];
    private material : Array<Material> = [];
    private rooms : Array<Room> = [];

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

    public getEmployees() : Array<Employee> {
        return this.employees;
    }

    public getMaterial() : Array<Material> {
        return this.material;
    }

    public getRooms() : Array<Room> {
        return this.rooms;
    }

    public addEmployee(employee : Employee) {
        this.employees.push(employee);
    }

    public addMaterial(material : Material) {
        this.material.push(material);
    }

    public addRoom(room : Room) {
        this.rooms.push(room);
    }

    public removeEmployee(employee : Employee) {
        this.employees.splice(this.employees.indexOf(employee), 1);
    }

    public removeMaterial(material : Material) {
        this.material.splice(this.material.indexOf(material), 1);
    }

    public removeRoom(room : Room) {
        this.rooms.splice(this.rooms.indexOf(room), 1);
    }

    public setId(id : number) {
        this.id = id;
    }

    public setName(name : string) {
        this.name = name;
    }

    public setEmployees(employees : Array<Employee>) {
        this.employees = employees;
    }

    public setMaterial(material : Array<Material>) {
        this.material = material;
    }

    public setRooms(rooms : Array<Room>) {
        this.rooms = rooms;
    }

    public toString() : string {
        return "Tool [id=" + this.id + ", name=" + this.name + "]";
    }
}