export interface User {
  uid: string;
  name: string;
  email: string; // Assuming you want to include the email
  profilePic: string;
  currentBalance: number;
  numberOfNFTs: number; // Add this field for the number of NFTs a user holds
  // Add any additional fields you want to include
  // For example:
  // age?: number;
  // address?: string;
}

