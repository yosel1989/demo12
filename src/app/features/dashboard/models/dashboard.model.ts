export interface DashboardCountsResponseDto {
  wallet_top_ups: number;                       
  wallet_with_drawals: number;                  
  customer_sessions_success: number;            
  sessions_success: number;                     
  new_customers: number;                        
  customer_balance: number;                     
  profile: number;                              
  customer_wallet_top_ups: number;              
  customer_wallet_with_drawals: number;
  bono_balance: number;
  increase: number;                             
  decrease: number;                             
}


export interface DashboardCountsRequestDto{
  date_start: string;
  date_end: string;
}
