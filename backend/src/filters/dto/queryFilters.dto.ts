/* IMPORTACIONES DE CLASS VALIDATOR */
import { IsOptional, Min } from 'class-validator';

export class QueryFiltersDTO {
    @IsOptional()
    @Min(0)
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @Min(0)
    page: number;
}
