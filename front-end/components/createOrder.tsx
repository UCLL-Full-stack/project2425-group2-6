import { useState, useRef, useEffect } from "react";
import styles from "@/styles/CreateOrder.module.css";
import { orderInput, houseInput, roomInput } from "@/types/orderTypes"; // Importing the types
import addressInput from "@/types/addressType";

type Props = {
    customerId: number;
};

const CreateOrder: React.FC<Props> = ({ customerId }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [houseNumber, setHouseNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [houseType, setHouseType] = useState("");
    const [budget, setBudget] = useState("");
    const [startDate, setStartDate] = useState("");
    const [rooms, setRooms] = useState<roomInput[]>([
        { houseId: 0, name: "", workDescription: "" }, // Default to one room
    ]);
    const formRef = useRef<HTMLFormElement | null>(null);
    const [formHeight, setFormHeight] = useState("0px");

    useEffect(() => {
        if (formRef.current) {
            setFormHeight(isExpanded ? `${formRef.current.scrollHeight}px` : "0px");
        }
    }, [isExpanded, rooms]);

    const toggleForm = () => {
        setIsExpanded(!isExpanded);
    };

    const handleAddRoom = () => {
        setRooms([...rooms, { houseId: 0, name: "", workDescription: "" }]);
    };

    const handleRemoveRoom = (index: number) => {
        const updatedRooms = rooms.filter((_, roomIndex) => roomIndex !== index);
        setRooms(updatedRooms);
    };

    const handleRoomChange = (index: number, field: keyof roomInput, value: string) => {
        const updatedRooms = [...rooms];
        updatedRooms[index][field] = value;
        setRooms(updatedRooms);
    };

    const submitOrder = async () => {

        // Map the form data to addressInput DTO
        const addressData: addressInput = {
            houseNumber: houseNumber,
            street: street,
            city: city,
            state: state,
            zip: zip,
        };
    
        // Assuming the house type and budget are part of the form data, map them to houseInput DTO
        const houseData: houseInput = {
            addressId: 0, // You would need to assign this based on your data model, here it's a placeholder
            type: houseType,
        };
    
        // Map the order data to orderInput DTO
        const orderData: orderInput = {
            customerId: customerId,
            orderDate: new Date(), // current date as the order date
            startDate: new Date(startDate), // start date from the form
            price: parseFloat(budget), // assuming budget is the price
            houseId: 0, // You will need to replace this with the actual houseId
        };
    
        // Map the room data to roomInput DTO
        const roomData: roomInput[] = rooms.map((room) => ({
            houseId: 0, // You will need to replace this with the actual houseId
            name: room.name,
            workDescription: room.workDescription,
        }));
    
        // Send the data to your backend or API
        try {
            const response = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address: addressData,
                    rooms: roomData,
                    house: houseData,
                    order: orderData,
                }),
            });
    
            if (response.ok) {
                // Handle success (e.g., show a success message or reset the form)
            } else {
                // Handle error (e.g., show an error message)
            }
        } catch (error) {
            // Handle network or other errors
            console.error("Error submitting order:", error);
        }
    };
    
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitOrder();
    };

    return (
        <div className={styles.createOrderContainer}>
            <h2 className={styles.createHeading} onClick={toggleForm}>
                {isExpanded ? "Order in progress" : "I want to make an order"}
            </h2>
            <div
                className={styles.formWrapper}
                style={{
                    maxHeight: formHeight,
                    opacity: isExpanded ? 1 : 0,
                    transition: "max-height 0.3s ease, opacity 0.3s ease",
                    overflow: "hidden",
                }}
            >
                <form onSubmit={handleSubmit} className={styles.orderForm} ref={formRef}>
                    <div className={styles.formGroup}>
                        <label htmlFor="houseNumber">House Number:</label>
                        <input
                            type="number"
                            id="houseNumber"
                            value={houseNumber}
                            onChange={(e) => setHouseNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="street">Street:</label>
                        <input
                            type="text"
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="zip">Zip:</label>
                        <input
                            type="text"
                            id="zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="houseType">House Type:</label>
                        <input
                            type="text"
                            id="houseType"
                            value={houseType}
                            onChange={(e) => setHouseType(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="budget">Budget:</label>
                        <input
                            type="number"
                            id="budget"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    <h3>Rooms</h3>
                    {rooms.map((room, index) => (
                        <div key={index} className={styles.roomGroup}>
                            <div className={styles.roomHeader}>
                                <div className={styles.formGroup}>
                                    <label htmlFor={`roomName-${index}`}>Room Name:</label>
                                    <input
                                        type="text"
                                        id={`roomName-${index}`}
                                        value={room.name}
                                        onChange={(e) => handleRoomChange(index, "name", e.target.value)}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                                {index > 0 && (
                                    <button
                                        type="button"
                                        className={styles.removeButton}
                                        onClick={() => handleRemoveRoom(index)}
                                    >
                                        Remove Room
                                    </button>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor={`workDescription-${index}`}>Work Description:</label>
                                <input
                                    type="text"
                                    id={`workDescription-${index}`}
                                    value={room.workDescription}
                                    onChange={(e) =>
                                        handleRoomChange(index, "workDescription", e.target.value)
                                    }
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>
                    ))}

                    <button type="button" className={styles.addRoomButton} onClick={handleAddRoom}>
                        Add Room
                    </button>

                    <button type="submit" className={styles.submitButton}>
                        Submit Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateOrder;
