const getAllEmployees = async () => {
    try {
        const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/employees`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        return (await response).json();
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw new Error("Failed to fetch employees. Please try again later.");
    }
};

const EmployeeService = {
    getAllEmployees,
};

export default EmployeeService;
