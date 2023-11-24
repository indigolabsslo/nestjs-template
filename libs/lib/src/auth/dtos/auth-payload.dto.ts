export class AuthPayloadDto {
  aud: string;
  exp: number;
  iat: number;
  sub: string;
  email?: string;
  phone?: string;
  app_metadata: {
    provider: string;
    providers: string[];
    [key: string]: any;
  };
  user_metadata: {
    [key: string]: any;
  };
  role: string;
  aal: string;
  amr: {
    method: string;
    timestamp: number;
    [key: string]: any;
  }[];
  session_id: string;
  [key: string]: any;
}
