type DeliveryStatus = "Pending" | "In Transit" | "Delivered";
export interface IDeliveryObject {
  hospital: string;
  deviceName: string;
  status: DeliveryStatus;
  createdAt?: Date;
  updatedAt?: Date;
  lastUpdated: string; // ISO date string
}