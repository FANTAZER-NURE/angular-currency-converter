export interface Currency {
  code: string;
  value: number;
}

export interface HttpResponse {
  meta: {
    last_updated_at: string;
  };
  data: Currency;
}
