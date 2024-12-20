const getAccessToken = (): { message: string, token: string, email: string, fullname: string, role: string } | null => {
    try {
        
        const message = sessionStorage.getItem('message');
        const token = sessionStorage.getItem('token');
        const email = sessionStorage.getItem('email');
        const fullname = sessionStorage.getItem('fullname');
        const role = sessionStorage.getItem('role');
        
        if (!message || !token || !email || !fullname || !role) {
            throw new Error("No user data found in session storage");
        }
  
  
            return {
                message: message,
                token: token,
                email: email,
                fullname: fullname,
                role: role
        }
        } catch (error) {
        console.error('Error retrieving user data from session storage:', error);
        throw new Error("Failed to retrieve user data from session storage");
    }
  };

const getAllEmployees = async () => {
    const token = getAccessToken();
    try {
        const response = fetch(process.env.NEXT_PUBLIC_API_URL + `/employees`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token?.token}`,
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
