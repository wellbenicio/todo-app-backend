import { ApiProperty } from "@nestjs/swagger";

export default class BadrequestSwagger {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string[];
    
    @ApiProperty()
    error: string;

};
