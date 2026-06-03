export type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
    factory_id?: number;

    factory?: {
        factory_name: string;
    };
};
