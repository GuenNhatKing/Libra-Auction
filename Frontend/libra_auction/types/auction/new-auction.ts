export interface NewAuction {
  productId: string;
  startTime: string | Date;
  duration: number;
  depositAmount: number;
  startingPrice: number;
  minimumBidIncrement: number;
}
