declare module 'africastalking' {
  interface AfricasTalkingOptions {
    apiKey: string;
    username: string;
  }

  interface SMSOptions {
    to: string | string[];
    message: string;
    from?: string;
  }

  interface SMSResponse {
    SMSMessageData: {
      Message: string;
      Recipients: Array<{
        statusCode: number;
        number: string;
        status: string;
        cost: string;
        messageId: string;
      }>;
    };
  }

  interface AfricasTalking {
    SMS: {
      send: (options: SMSOptions) => Promise<SMSResponse>;
    };
  }

  function africastalking(options: AfricasTalkingOptions): AfricasTalking;
  export = africastalking;
}
