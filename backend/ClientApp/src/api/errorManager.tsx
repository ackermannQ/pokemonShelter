import { toast } from "react-toastify";

const errorCodes = [400, 401, 403, 404, 500];


export function manageError(error: any) {
    const responseData = error.response.data;

    if (responseData.status === 400) {
        const errors = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [key, value] of Object.entries(responseData.errors)) {
            errors.push(value);
        }

        console.error(errors.flat());
    }

    errorCodes.forEach(code => {
        if (code === responseData.status) {
            toast.error(responseData.title);
        }
    });
}
