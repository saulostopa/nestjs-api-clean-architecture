export class Delivery {
  constructor(
    public readonly id: string,
    public readonly hospital: string,
    public readonly deviceName: string,
    public readonly status: string,
    public readonly lastUpdated: string, // ISO date string 
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
