export interface IContact {
    _id?: string;
    name: string;
    email: string;
    imageUrl: string;
    mobile: string;
    company: string;
    title: string;
    groupId: number | string;
    created_at?: string;
    updated_at?: string;
}