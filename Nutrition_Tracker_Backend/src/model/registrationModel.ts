class UserInformation {
    id?: number; // ✅ เพิ่ม id (อาจยังไม่มีตอนสร้าง object ใหม่)
    firstname: string;
    lastname: string;
    gender: "male" | "female";
    birthday: string; // ISO string เช่น "1995-07-14"
    email: string;
    password: string;
    weight: number; // kg
    height: number; // cm
    activity: "none" | "light" | "moderate" | "daily";

    constructor(data?: Partial<UserInformation>) {
        this.id = data?.id;
        this.firstname = data?.firstname ?? "";
        this.lastname = data?.lastname ?? "";
        this.gender = data?.gender ?? "male";
        this.birthday = data?.birthday ?? "";
        this.email = data?.email ?? "";
        this.password = data?.password ?? "";
        this.weight = Number(data?.weight ?? 0);
        this.height = Number(data?.height ?? 0);
        this.activity = data?.activity ?? "none";
    }
}

export default UserInformation;
