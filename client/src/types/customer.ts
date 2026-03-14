// This is same as user
export interface ICustomer {
  /**
   * @info primary key
   */
  id: number;

  /**
   * @info personal
   */
  name?: string;
  password?: string;
  phone?: string;
  image?: string;
  cc?: string; // country code
  email?: string;
  district?: string;
  presentaddress?: string;
  role?: string;

  age?: number;
  gender: string;
  id_proof?: string; // R2 object

  /**
   * @profession (teacher / student)
   */
  profession?: string;
  institution?: string;
  experience?: string;

  /**
   * @auth data fields
   */
  otp?: string;
  isActive: string;
  isVerified: boolean;

  /**
   * @additional
   */
  tutionplace?: string;
  tuitionmedium?: string;
  isAvailable?: boolean;

  /**
   * rates
   */
  tl_rate?: number; // tuition location
  sl_rate?: number; // student location
  ol_rate?: number; // online

  totalHours?: number;

  ref?: number;
}