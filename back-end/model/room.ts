import { Employee } from "./employee";
import { House } from "./house";
import { Material } from "./material";
import { Tool } from "./tool";

export class Room {
    private id: number;
    private house!: House; // Use definite assignment assertion
    private name: string;
    private workDescription: string;
    private employees: Array<Employee> = [];
    private tools: Array<Tool> = [];
    private materials: Array<Material> = [];

    constructor(id: number, house: House, name: string, workDescription: string) {
        this.id = id;
        this.setHouse(house); // Assign house in constructor via setHouse
        this.name = name;
        this.workDescription = workDescription;
    }

    public getId(): number {
        return this.id;
    }

    public getHouse(): House {
        return this.house;
    }

    public getName(): string {
        return this.name;
    }

    public getWorkDescription(): string {
        return this.workDescription;
    }

    public getEmployees(): Array<Employee> {
        return this.employees;
    }

    public getTools(): Array<Tool> {
        return this.tools;
    }

    public getMaterials(): Array<Material> {
        return this.materials;
    }

    public addEmployee(employee: Employee) {
        this.employees.push(employee);
    }

    public addTool(tool: Tool) {
        this.tools.push(tool);
    }

    public addMaterial(material: Material) {
        this.materials.push(material);
    }

    public removeEmployee(employee: Employee) {
        this.employees = this.employees.filter(e => e.getId() !== employee.getId());
    }

    public removeTool(tool: Tool) {
        this.tools = this.tools.filter(t => t.getId() !== tool.getId());
    }

    public removeMaterial(material: Material) {
        this.materials = this.materials.filter(m => m.getId() !== material.getId());
    }

    public setId(id: number) {
        this.id = id;
    }

    public setHouse(house: House) {
        this.house = house;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setWorkDescription(workDescription: string) {
        this.workDescription = workDescription;
    }

    public setEmployees(employees: Array<Employee>) {
        this.employees = employees;
    }

    public setTools(tools: Array<Tool>) {
        this.tools = tools;
    }

    public setMaterials(materials: Array<Material>) {
        this.materials = materials;
    }
    
    public toString(): string {
        return `Room [id=${this.id}, house=${this.house}, name=${this.name}, workDescription=${this.workDescription}]`;
    }
}
