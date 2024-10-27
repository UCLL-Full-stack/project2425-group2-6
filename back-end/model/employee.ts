import { Room } from "./room";
import { Tool } from "./tool";
import { Vehicle } from "./vehicle";

export class Employee {
    private id : number;
    private firstName: string;  
    private lastName: string;
    private email: string;
    private experience: number;
    private domain : string;
    private licenseType : string;
    private tools : Array<Tool> = [];
    private vehicles : Array<Vehicle> = [];
    private rooms : Array<Room> = [];

    constructor(id: number, firstName: string, lastName: string, email: string, experience: number, domain: string, licenseType: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.experience = experience;
        this.domain = domain;
        this.licenseType = licenseType;
    }

    public getId() : number {
        return this.id;
    }

    public getFirstName() : string {
        return this.firstName;
    }

    public getLastName() : string {
        return this.lastName;
    }

    public getEmail() : string {
        return this.email;
    }

    public getExperience() : number {
        return this.experience;
    }

    public getDomain() : string {
        return this.domain;
    }

    public getLicenseType() : string {
        return this.licenseType;
    }

    public getTools() : Array<Tool> {
        return this.tools;
    }

    public getVehicles() : Array<Vehicle> {
        return this.vehicles;
    }

    public getRooms() : Array<Room> {
        return this.rooms;
    }

    public setId(id: number) {
        this.id = id;
    }

    public setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    public setLastName(lastName: string) {
        this.lastName = lastName;
    }   

    public setEmail(email: string) {
        this.email = email;
    }

    public setExperience(experience: number) {
        this.experience = experience;
    }

    public setDomain(domain: string) {
        this.domain = domain;
    }

    public setLicenseType(licenseType: string) {
        this.licenseType = licenseType;
    }

    public setTools(tool : Array<Tool>){
        this.tools = tool;
    }

    public setVehicles(vehicle : Array<Vehicle>){
        this.vehicles = vehicle;
    }

    public setRooms(room : Array<Room>){
        this.rooms = room;
    }

    public addTool(tool : Tool){    
        this.tools.push(tool);
    }

    public addVehicle(vehicle : Vehicle){
        this.vehicles.push(vehicle);
    }

    public addRoom(room : Room){
        this.rooms.push(room);
    }

    public toString() : string {
        return "Employee [id=" + this.id + ", name=" + `${this.firstName} ${this.lastName} ` + ", email=" + this.email + ", experience=" + this.experience + ", domain=" + this.domain + ", licenseType=" + this.licenseType + "]";
    }

}