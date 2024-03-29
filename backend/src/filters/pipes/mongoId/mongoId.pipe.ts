import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class MongoIdPipe
    implements PipeTransform<any, mongoose.Types.ObjectId>
{
    transform(value: any): mongoose.Types.ObjectId {
        const validObjectId: boolean = mongoose.isObjectIdOrHexString(value);
        if (!validObjectId) throw new BadRequestException('Invalid ObjectId');
        return value;
    }
}
