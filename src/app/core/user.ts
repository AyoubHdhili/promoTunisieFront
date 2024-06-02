export class User {
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;
    role!: 'Client' | 'Admin';
    address!: string;
    phone!: number;
    verificationCode?: string; // Optional property
  }
  